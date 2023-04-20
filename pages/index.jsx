import { Badge, Button, Card, List, ListItem, Title } from '@tremor/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';

import { getJobs, getUser } from '@/lib/getData';
import prisma from '@/lib/prisma';
import { authOptions } from './api/auth/[...nextauth]';

import Layout from '@/components/Layout';
import Jobs from '@/components/Jobs';

export default function Home({ jobs, user }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(user);

  if (session && !session.user.name) {
    router.push('/setup');
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

        {session ? (
          <section className='mx-auto my-10 text-center'>
            <h3>
              Welcome, {user.name}{' '}
              {user.isCompany ? <Badge>Company</Badge> : null}
            </h3>
            <div className='flex items-center justify-center gap-4 mt-4'>
              {user.isCompany ? (
                <>
                  <Link href='/new'>
                    <Button>Post a New Job</Button>
                  </Link>
                  <Link href='/dashboard'>
                    <Button>View Jobs You Posted</Button>
                  </Link>
                </>
              ) : (
                <Link href='/dashboard'>
                  <Button>View Jobs You Applied To</Button>
                </Link>
              )}
            </div>
          </section>
        ) : null}
      </section>

      <section className='flex gap-4'>
        <Jobs jobs={jobs} />
        <aside className='w-80'>
          <Card>
            <Title>Browse by Category</Title>
            <List>
              <ListItem>
                <span>Front-end</span>
                <span>12</span>
              </ListItem>

              <ListItem>
                <span>Back-end</span>
                <span>8</span>
              </ListItem>

              <ListItem>
                <span>UI/UX Designer</span>
                <span>9</span>
              </ListItem>
            </List>
          </Card>
        </aside>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  let user = await getUser(session.user.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  if (!session) {
    return {
      props: {
        jobs,
      },
    };
  }

  return {
    props: {
      jobs,
      user,
    },
  };
}
