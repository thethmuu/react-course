import { Button } from '@tremor/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  if (status === 'loading') return <p>Loading...</p>;

  return (
    <nav>
      <div className='container flex justify-between p-4 mx-auto text-white bg-neutral-900 sm:px-8'>
        <Link href='/'>
          <h1 className='text-2xl font-bold w-fit hover:text-gray-400'>
            TokyoDev
          </h1>
        </Link>
        {session && status === 'authenticated' ? (
          <div className='flex items-center gap-4'>
            <p className='hidden md:block'>
              {session.user ? session.user.email : null}
            </p>
            <Button
              color='indigo'
              variant='secondary'
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Link href='/api/auth/signin'>
            <Button color='indigo' size='sm'>
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
