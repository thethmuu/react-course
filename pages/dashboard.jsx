import React from 'react';
import { Badge, Title } from '@tremor/react';
import { getServerSession } from 'next-auth/next';

import Layout from '@/components/Layout';

import { getUser } from '@/lib/getData';
import { authOptions } from './api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default function Dashboard({ user }) {
  return (
    <Layout>
      <section className='mt-4 text-center'>
        <Title>Dashboard</Title>
        {user.isCompany ? <Badge color='indigo'>Company</Badge> : null}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  let user = await getUser(session.user.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  let jobs = [];
  let applications = [];

  if (user.isCompany) {
    jobs = await getJobsPosted(user.id, prisma);
    jobs = JSON.parse(JSON.stringify(jobs));
  } else {
    applications = await getUserApplications(user.id, prisma);
    applications = JSON.parse(JSON.stringify(applications));
  }

  return {
    props: {
      user,
      jobs,
      applications,
    },
  };
}
