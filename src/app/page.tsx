"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header";
import Register from "./components/Modal/Register";
import Login from "./components/Modal/Login";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // redirect("/");
    },
  });

  return (
    <>
      <Toaster />
      <Login />
      <Register />

      <Layout>
        <Header label="Home" />
      </Layout>
    </>
  );
}

