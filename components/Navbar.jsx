import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav>
      <div className='container p-4 mx-auto text-white bg-neutral-900 sm:px-8'>
        <Link href='/'>
          <h1 className='text-2xl font-bold w-fit hover:text-gray-400'>
            TokyoDev
          </h1>
        </Link>
      </div>
    </nav>
  );
}
