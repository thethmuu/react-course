import React from 'react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Software Developer Jobs</title>
      </Head>
      <Navbar />
      <main className='container px-4 py-10 mx-auto sm:px-32'>{children}</main>
    </>
  );
}
