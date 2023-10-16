import { useMemo } from "react";

import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";

const useComment = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);

  const hasCommented = useMemo(() => {
    const list = fetchedPost?.comments || [];
    return list.filter((item: any) => item?.userId === currentUser?.id).length > 0;
  }, [fetchedPost, currentUser]);

  return {
    hasCommented,
  };
};

export default useComment;
