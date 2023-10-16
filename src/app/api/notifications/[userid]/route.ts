

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prismadb from "@/libs/prismadb";

export async function GET(request: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const { userid } = params;

    if (!userid || typeof userid !== "string") {
      throw new Error("Invalid ID");
    }

    const notifications = await prismadb.notification.findMany({
      where: {
        userId: parseInt(userid),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prismadb.user.update({
      where: {
        id: parseInt(userid),
      },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
