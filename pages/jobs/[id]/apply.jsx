import Layout from '@/components/Layout';
import { getJob } from '@/lib/getData';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';

export default function Apply({ job }) {
  console.log(job);

  return (
    <Layout>
      <section className='max-w-lg px-8 mx-auto'>
        <Link href='/' className='mb-2 font-bold underline'>
          back
        </Link>

        <h2 className='mt-3 text-2xl font-bold text-center'>{job.title}</h2>

        <p className='mt-3 font-normal'>{job.description}</p>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let job = await getJob(context.params.id, prisma);
  job = JSON.parse(JSON.stringify(job));

  return {
    props: {
      job,
    },
  };
}
