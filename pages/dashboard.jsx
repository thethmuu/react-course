import React from 'react';
import {
  Badge,
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
} from '@tremor/react';
import { getServerSession } from 'next-auth/next';

import Layout from '@/components/Layout';

import { getJobsPosted, getUser, getUserApplications } from '@/lib/getData';
import { authOptions } from './api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { useSession } from 'next-auth/react';

export default function Dashboard({ user, jobs, applications }) {
  console.log(applications);

  const { data: session } = useSession();

  return (
    <Layout>
      <section className='mt-4 text-center'>
        <Title className='text-4xl'>Dashboard</Title>
        {user.isCompany ? (
          <Badge className='mt-4' color='indigo'>
            Company
          </Badge>
        ) : null}

        {session ? (
          <h3 className='mt-4 text-2xl font-semibold'>
            {user.isCompany ? 'Jobs Your Posted' : 'Your Job Applications'}
          </h3>
        ) : null}

        {user.isCompany ? (
          <Card className='mt-4'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Title</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((item) => (
                  <TableRow key={item.title}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <Text>{item.description}</Text>
                    </TableCell>
                    <TableCell>
                      {item.published ? (
                        <Badge color='green'>Published</Badge>
                      ) : (
                        <Badge color='red'>Unpublished</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : null}
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
