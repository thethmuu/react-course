import Link from 'next/link';
import { getJobs } from '@/lib/getData';
import prisma from '@/lib/prisma';

export default function Home({ jobs }) {
  return (
    <main className='text-center'>
      <section>
        <h2>Software Developer Jobs</h2>
        {jobs.map((job) => (
          <h3 key={job.id}>{job.title}</h3>
        ))}
      </section>

      {/* <h1>Home page</h1>
      <Link
        className='text-blue-600 hover:underline hover:text-blue-700'
        href='/api/auth/signin'
      >
        login
      </Link> */}
    </main>
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
