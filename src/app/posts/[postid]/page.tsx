'use client';

import { useParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import usePost from '@/hooks/usePost';
import Header from '@/src/app/components/Header';
import Form from '@/src/app/components/Form';
import PostItem from '@/src/app/components/Posts/PostItem';
import CommentFeed from '@/src/app/components/Posts/CommentFeed';

const PostView = () => {
  const { postid } = useParams();
  const { data: fetchedPost, isLoading } = usePost(postid as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form
        postId={postid as string}
        isComment
        placeholder="Tweet your reply!"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
