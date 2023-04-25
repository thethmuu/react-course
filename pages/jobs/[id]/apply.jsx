import Layout from '@/components/Layout';
import { getJob } from '@/lib/getData';
import prisma from '@/lib/prisma';
import { Button } from '@tremor/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Apply({ job }) {
  const [coverletter, setCoverletter] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    await axios.post('/api/application', {
      coverletter,
      job: job.id,
      userId: session.user.id,
    });
    setLoading(false);

    router.push('/dashboard');
  }

  if (!session) return null;

  return (
    <Layout>
      <section className='max-w-lg px-8 mx-auto'>
        <div>
          <Link href='/' className='mb-2 font-bold underline'>
            back
          </Link>

          <h2 className='mt-3 text-2xl font-bold text-center'>{job.title}</h2>

          <p className='mt-3 font-normal'>{job.description}</p>
        </div>

        <form onSubmit={handleSubmit} className='mt-8'>
          <textarea
            className='w-full h-24 px-4 py-2 text-lg font-medium border rounded'
            row='10'
            placeholder='Cover letter'
            required
            value={coverletter}
            onChange={(e) => setCoverletter(e.target.value)}
          ></textarea>

          <div className='flex justify-end mt-6'>
            <Button loading={loading} type='submit' color='green'>
              Apply
            </Button>
          </div>
        </form>
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
