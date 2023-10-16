import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user?.email || "",
      },
    });
    if (!currentUser) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const { name, username, bio, profileImage, coverImage } = await request.json();
    if (!name || !username) throw new Error("Missing fields");

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
