import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { useSearchParams } from "next/navigation";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user?.email || "",
      },
    });
    if (!currentUser) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const { body } = await request.json();
    const post = await prismadb.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const userId = new URL(request.url).searchParams.get("userId");

    let _args = {
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    } as Prisma.UserArgs;

    if (userId && typeof userId === "string") {
      _args = {
        ..._args,
        where: {
          userId,
        },
      } as Prisma.UserArgs;
    }

    const posts = await prismadb.post.findMany(_args);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
