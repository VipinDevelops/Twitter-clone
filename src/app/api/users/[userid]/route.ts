import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import prismadb from '@/libs/prismadb';
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { message: 'You are not logged in.' },
        { status: 401 }
      );

    const userId = new URL(request.url).pathname.split('/').at(-1);

    if (userId === undefined) {
      return NextResponse.json({ message: 'Missing ID' }, { status: 404 });
    }

    const userIdNumber = parseInt(userId, 10);

    if (isNaN(userIdNumber)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        id: userIdNumber,
      },
    });

    const followerCount = await prismadb.user.count({
      where: {
        followingIds: {
          has: userIdNumber,
        },
      },
    });

    return NextResponse.json(
      { ...existingUser, followerCount },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An Error occurred' }, { status: 500 });
  }
}
