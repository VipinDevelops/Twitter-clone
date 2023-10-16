"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./components/Provider";
import { Toaster } from "react-hot-toast";
import Login from "./components/Modal/Login";
import Register from "./components/Modal/Register";
import Layout from "./components/Layout/Layout";
import EditModal from "./components/Modal/EditModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "A Twitter clone created in NextJS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Toaster />
          <EditModal />
          <Login />
          <Register />

          <Layout>{children}</Layout>
        </body>
      </Provider>
    </html>
  );
}
