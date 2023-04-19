import Link from 'next/link';
import { getJobs } from '@/lib/getData';
import prisma from '@/lib/prisma';

import Layout from '@/components/Layout';
import Jobs from '@/components/Jobs';
import { Button } from '@tremor/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home({ jobs }) {
  const { data: session, status } = useSession();
  const router = useRouter()

  if (session && !session.user.name) {
    router.push('/setup')
  }

  

  return (
    <Layout>
      <section className='text-center'>
        {!session ? (
          <Link href='/api/auth/signin'>
            <Button color='green'>Login</Button>
          </Link>
        ) : null}
        <h2 className='text-5xl font-bold'>Software Developer Jobs</h2>
        <Jobs jobs={jobs} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      jobs: jobs,
    },
  };
}
