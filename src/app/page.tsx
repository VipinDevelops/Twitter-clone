import React from 'react';
import Layout from './components/Layout/Layout';
import Header from './components/Header';
import Register from './components/Modal/Register';
import Login from './components/Modal/Login';

export default function Page() {
  return (
    <>
      <Login />
      <Register />

      <Layout>
        <Header label="Home" />
      </Layout>
    </>
  );
}
