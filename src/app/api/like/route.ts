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

    const { postId: postid } = await request.json();
    if (!postid || typeof postid !== 'string')
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 });

    const post = await prismadb.post.findUnique({
      where: {
        id: parseInt(postid),
      },
    });
    if (!post) throw new Error('Invalid ID');

    let updatedLikedIds = [...(post.likedIds || [])];
    updatedLikedIds.push(currentUser.id);
    // updatedLikedIds = updatedLikedIds.filter((e) => e !== currentUser.id);

    try {
      const post = await prismadb.post.findUnique({
        where: {
          id: parseInt(postid),
        },
      });

      if (post?.userId) {
        await prismadb.notification.create({
          data: {
            body: 'Someone liked your tweet!',
            userId: post.userId,
          },
        });

        await prismadb.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }

    const updatedPost = await prismadb.post.update({
      where: {
        id: parseInt(postid),
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
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

    const { postId: postid } = await request.json();
    if (!postid || typeof postid !== 'string')
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 });

    const post = await prismadb.post.findUnique({
      where: {
        id: parseInt(postid),
      },
    });
    if (!post) throw new Error('Invalid ID');

    let updatedLikedIds = [...(post.likedIds || [])];
    updatedLikedIds = updatedLikedIds.filter(
      (likedId) => likedId !== currentUser?.id
    );

    const updatedPost = await prismadb.post.update({
      where: {
        id: parseInt(postid),
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An Error occurred' }, { status: 500 });
  }
}
