import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "../Avatar";
import { BiMessageRounded } from "react-icons/bi";
import { LiaRetweetSolid } from "react-icons/lia";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const LikeIcon = AiOutlineHeart;

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p onClick={goToUser} className="font-semibold text-white cursor-pointer hover:underline">
              {data.user.name}
            </p>
            <span onClick={goToUser} className="hidden cursor-pointer text-neutral-500 hover:underline md:block">
              @{data.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="mt-1 text-white">{data.body}</div>

          <div className="flex flex-row items-center gap-10 mt-3">
            <div
              className={`flex flex-row items-center gap-1 px-2 text-neutral-500 transition cursor-pointer hover:text-sky-500 group`}
            >
              <div className="flex justify-center w-10 h-10 align-middle rounded-full group-hover:bg-sky-500/10">
                <BiMessageRounded className="m-auto" size={20} />
              </div>
              <p>{0}</p>
            </div>

            <div className="flex flex-row items-center gap-1 px-2 transition cursor-pointer text-neutral-500 hover:text-emerald-500 group">
              <div className="flex justify-center w-10 h-10 align-middle rounded-full group-hover:bg-emerald-500/10">
                <LiaRetweetSolid className="m-auto" size={20} strokeWidth={1} />
              </div>
              <p>{0}</p>
            </div>

            <div
              className={`flex flex-row items-center gap-1 px-2 transition cursor-pointer group hover:text-pink-600 text-neutral-500`}
            >
              <div className="flex justify-center w-10 h-10 align-middle rounded-full group-hover:bg-pink-500/10">
                <LikeIcon className="m-auto" size={20} />
              </div>
              <p>{0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
