import Jobs from '@/components/Jobs';
import Layout from '@/components/Layout';
import { getJobsByCategory } from '@/lib/getData';
import { useRouter } from 'next/router';
import React from 'react';

export default function Category({ jobs }) {
  const router = useRouter();
  console.log(router.query.id);
  return (
    <Layout>
      <h2 className='text-3xl font-bold text-center'>Jobs by Category</h2>
      {jobs.length > 0 ? <Jobs jobs={jobs} /> : <p className='mt-4 text-center'>No job for this category</p>}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let jobs = await getJobsByCategory(context.params.id, prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      jobs,
    },
  };
}
