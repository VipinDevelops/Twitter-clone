import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prismadb from "@/libs/prismadb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user?.email || "",
      },
    });
    if (!currentUser) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
