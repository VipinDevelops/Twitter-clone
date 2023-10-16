'use client';

import React from 'react';
import { BsHouseFill, BsSearch, BsBookmark } from 'react-icons/bs';
import { SlEnvolope } from 'react-icons/sl';
import { PiBellBold, PiNotebook } from 'react-icons/pi';
import { HiOutlineUser } from 'react-icons/hi';

import SidebarLogo from './SideBarLogo';
import SidebarItem from './SidebarItem';
import TweetButton from './TweetButton';

export default function Sidebar() {
  const items = [
    {
      label: 'Home',
      href: '',
      icon: BsHouseFill,
    },
    {
      label: 'Explore',
      href: '/',
      icon: BsSearch,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: PiBellBold,
    },
    {
      label: 'Messages',
      href: '/messages',
      icon: SlEnvolope,
    },
    {
      label: 'Lists',
      href: '/lists',
      icon: PiNotebook,
    },
    {
      label: 'Bookmarks',
      href: '/bookmarks',
      icon: BsBookmark,
    },
    {
      label: 'Profile',
      href: '/users/132',
      icon: HiOutlineUser,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />

          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}

          <TweetButton />
        </div>
      </div>
    </div>
  );
}
