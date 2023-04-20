import React from 'react';
import { getJob } from '@/lib/getData';

import Layout from '@/components/Layout';
import Job from '@/components/Job';
import Link from 'next/link';
import { Button } from '@tremor/react';

export default function JobDetail({ job }) {
  return (
    <Layout>
      <section className='px-8'>
        <Link href='/' className='mb-2 font-bold underline'>
          back
        </Link>
        <Job job={job} />

        <Link href={`/jobs/${job.id}/apply`}>
          <Button>Apply for This Job</Button>
        </Link>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let job = await getJob(context.params.id, prisma);
  job = JSON.parse(JSON.stringify(job));

  return {
    props: {
      job: job,
    },
  };
}
