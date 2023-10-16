"use client";

import React from "react";
import { signOut } from "next-auth/react";

import { BsHouseFill, BsSearch, BsBookmark } from "react-icons/bs";
import { SlEnvolope } from "react-icons/sl";
import { PiBellBold, PiNotebook } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";

import SidebarLogo from "./SideBarLogo";
import SidebarItem from "./SidebarItem";
import TweetButton from "./TweetButton";

import useCurrentUser from "@/hooks/useCurrentUser";

export default function Sidebar() {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "",
      icon: BsHouseFill,
    },
    {
      label: "Explore",
      href: "/",
      icon: BsSearch,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: PiBellBold,
      auth: true,
    },
    {
      label: "Messages",
      href: "/messages",
      icon: SlEnvolope,
      auth: true,
    },
    {
      label: "Lists",
      href: "/lists",
      icon: PiNotebook,
      auth: true,
    },
    {
      label: "Bookmarks",
      href: "/bookmarks",
      icon: BsBookmark,
      auth: true,
    },
    {
      label: "Profile",
      href: "/users/132",
      icon: HiOutlineUser,
      auth: true,
    },
  ];

  return (
    <div className="h-full col-span-1 pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />

          {items.map((item) => (
            <SidebarItem key={item.href} href={item.href} icon={item.icon} label={item.label} auth={item.auth} />
          ))}

          {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
          <TweetButton />
        </div>
      </div>
    </div>
  );
}
