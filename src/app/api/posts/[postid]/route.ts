import prismadb from "@/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  try {
    const { postid } = params;
    if (!postid || typeof postid !== "string") return NextResponse.json({ message: "Invalid ID" }, { status: 404 });

    const post = await prismadb.post.findUnique({
      where: {
        id: postid,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error);
      return NextResponse.json({ message: "Invalid ID" }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
