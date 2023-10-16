"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
  tweetCount?: number;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label, tweetCount }) => {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className={"border-b-[1px] border-neutral-800 " + (tweetCount != null ? "px-2 py-2" : " p-5")}>
      <div className="flex flex-row items-center gap-x-8">
        {showBackArrow && (
          <div className="flex justify-center w-12 h-12 transition rounded-full cursor-pointer hover:bg-gray-500/20">
            <BiArrowBack onClick={handleBack} color="white" size={20} className="my-auto" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold text-white">{label}</h1>
          {tweetCount != null && <p className="text-sm text-zinc-500">{`${tweetCount} Tweets`}</p>}
        </div>
      </div>
    </div>
  );
};

export default Header;
