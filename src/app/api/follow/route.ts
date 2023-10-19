import prismadb from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { message: 'You are not logged in.' },
        { status: 401 }
      );

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user?.email || '',
      },
    });
    if (!currentUser)
      return NextResponse.json(
        { message: 'You are not logged in.' },
        { status: 401 }
      );

    const { userId: userid } = await request.json();
    if (!userid || typeof userid !== 'string')
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 });

    const user = await prismadb.user.findUnique({
      where: {
        id: userid,
      },
    });
    if (!user) throw new Error('Invalid ID');

    let updatedFollowingIds = [...(user.followingIds || [])];
    updatedFollowingIds.push(userid);
    updatedFollowingIds = updatedFollowingIds.filter(
      (e) => e !== currentUser.id
    );

    try {
      await prismadb.notification.create({
        data: {
          body: 'Someone followed you!',
          userId: userid,
        },
      });

      await prismadb.user.update({
        where: {
          id: userid,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.error(error);
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An Error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { message: 'You are not logged in.' },
        { status: 401 }
      );

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user?.email || '',
      },
    });
    if (!currentUser)
      return NextResponse.json(
        { message: 'You are not logged in.' },
        { status: 401 }
      );

    const { userId: userid } = await request.json();
    if (!userid || typeof userid !== 'string')
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 });

    const user = await prismadb.user.findUnique({
      where: {
        id: userid,
      },
    });
    if (!user) throw new Error('Invalid ID');

    let updatedFollowingIds = [...(user.followingIds || [])];
    updatedFollowingIds = updatedFollowingIds.filter(
      (followingId) => followingId !== userid
    );
    updatedFollowingIds = updatedFollowingIds.filter(
      (e) => e !== currentUser.id
    );

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An Error occurred' }, { status: 500 });
  }
}
