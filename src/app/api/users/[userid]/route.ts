import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const userId = new URL(request.url).pathname.split("/").at(-1);
    if (typeof userId !== "string") return NextResponse.json({ message: "Invalid ID" }, { status: 404 });
    if (!userId) return NextResponse.json({ message: "Missing ID" }, { status: 404 });

    const existingUser = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followerCount = await prismadb.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    const postCount = await prismadb.post.count({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ ...existingUser, followerCount, postCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
