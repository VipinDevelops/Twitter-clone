import prismadb from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request, { params, searchParams }: any) {
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

    const { body } = await request.json();
    const postid = new URL(request.url).searchParams.get('postId');

    if (!postid || typeof postid !== 'string')
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 });

    const comment = await prismadb.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId: parseInt(postid),
      },
    });

    try {
      const post = await prismadb.post.findUnique({
        where: {
          id: parseInt(postid),
        },
      });

      if (post?.userId) {
        await prismadb.notification.create({
          data: {
            body: 'Someone replied on your tweet!',
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
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An Error occurred' }, { status: 500 });
  }
}
