import bcrypt from "bcrypt";
import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, username, name, password } = await request.json();

    const existingUser = await prismadb.user.findUnique({ where: { email } });
    if (existingUser) return NextResponse.json({ message: "Email taken" }, { status: 422 });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
