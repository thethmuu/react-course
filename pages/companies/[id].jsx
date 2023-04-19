import Job from '@/components/Job';
import Layout from '@/components/Layout';
import { getCompany, getCompanyJobs } from '@/lib/getData';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';

export default function CompanyDetail({ company, jobs }) {
  return (
    <Layout>
      <section className='px-8'>
        <Link href='/' className='font-bold underline'>
          back
        </Link>
        <h1 className='mt-1 text-4xl font-bold text-center'>{company.name}</h1>

        <h2 className='mt-3 text-2xl font-semibold'>
          Opening jobs at {company.name}
        </h2>
        <div className='mt-3 space-y-4'>
          {jobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  let company = await getCompany(params.id, prisma);
  let jobs = await getCompanyJobs(params.id, prisma);

  company = JSON.parse(JSON.stringify(company));
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      company,
      jobs,
    },
  };
}
