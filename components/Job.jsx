import { Card } from '@tremor/react';
import Link from 'next/link';
import React from 'react';

export default function Job({ job }) {
  return (
    <Card decoration='top' decorationColor='indigo'>
      <Link
        href={`/jobs/${job.id}`}
        className='text-xl font-semibold underline'
      >
        {job.title}
      </Link>
      <h2 className='mt-3 font-normal text-gray-600'>
        {job.description.substring(0, 100)}...
      </h2>
      <p className='mt-2'>
        Posted by{' '}
        <Link
          className='text-base font-medium underline'
          href={`/companies/${job.author.id}`}
        >
          {job.author.name}
        </Link>
      </p>
    </Card>
  );
}
