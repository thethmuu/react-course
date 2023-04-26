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
  Button,
} from '@tremor/react';
import { getServerSession } from 'next-auth/next';

import Layout from '@/components/Layout';

import {
  getCategories,
  getJobsPosted,
  getUser,
  getUserApplications,
} from '@/lib/getData';
import { authOptions } from './api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

export default function Dashboard({ user, jobs, applications }) {
  console.log(jobs);

  const { data: session } = useSession();
  const router = useRouter();

  async function handleClick(task, jobId) {
    await axios.patch('/api/jobs', {
      id: jobId,
      task: task,
    });

    router.replace(router.asPath);
  }

  async function handleDelete(id) {
    const job = await axios.delete('/api/jobs/' + id);

    toast.success('Deleted');
  }

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
                  <TableHeaderCell>Applications</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
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
                        <Badge
                          className='cursor-pointer'
                          onClick={() => handleClick('unpublish', item.id)}
                          color='green'
                        >
                          Published
                        </Badge>
                      ) : (
                        <Badge
                          className='cursor-pointer'
                          onClick={() => handleClick('publish', item.id)}
                          color='red'
                        >
                          Unpublished
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.applications.length > 0 ? (
                        <p>{item.applications.length}applications</p>
                      ) : (
                        <p>No application so far </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <button onClick={() => handleDelete(item.id)}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                          />
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <>
            {applications.map((item, index) => (
              <div
                className='flex justify-center gap-6 mt-10 mb-4'
                key={item.id}
              >
                <Card className='w-full px-4 sm:w-1/2'>
                  <Link
                    className='text-xl font-bold underline'
                    href={`/jobs/${item.job.id}`}
                  >
                    {item.job.title}
                  </Link>
                  <p className='mt-3 text-base font-normal'>
                    {item.coverletter}
                  </p>
                </Card>
              </div>
            ))}
          </>
        )}
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
