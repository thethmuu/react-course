import { Badge, Button, Card, List, ListItem, Title } from '@tremor/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';

import { getCategories, getJobs, getUser } from '@/lib/getData';
import prisma from '@/lib/prisma';
import { authOptions } from './api/auth/[...nextauth]';

import Layout from '@/components/Layout';
import Jobs from '@/components/Jobs';

export default function Home({ jobs, user, categories }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && !session.user.name) {
    router.push('/setup');
  }

  return (
    <Layout>
      <section className='text-center'>
        <h2 className='text-3xl font-bold sm:text-5xl'>
          Software Developer Jobs
        </h2>

        {session ? (
          <section className='mx-auto my-8 text-center'>
            <h3>
              Welcome, {user.name}{' '}
              {user.isCompany ? <Badge>Company</Badge> : null}
            </h3>
            <div className='flex items-center justify-center gap-4 mt-4'>
              {user.isCompany ? (
                <>
                  <Link href='/new'>
                    <Button color='indigo'>Post a New Job</Button>
                  </Link>
                  <Link href='/dashboard'>
                    <Button color='indigo'>View Jobs You Posted</Button>
                  </Link>
                </>
              ) : (
                <Link href='/dashboard'>
                  <Button color='indigo'>View Jobs You Applied To</Button>
                </Link>
              )}
            </div>
          </section>
        ) : null}
      </section>

      <section className='flex flex-col-reverse gap-6 mt-6 sm:flex-row'>
        <Jobs jobs={jobs} />
        <aside className='w-full sm:w-96'>
          <Card>
            <Title>Browse by Category</Title>
            <List>
              {categories.map((category) => (
                <ListItem key={category.id}>
                  <Link href={`/jobs/category/${category.id}`}>
                    {category.name}
                  </Link>
                  <span>{category.jobs.length}</span>
                </ListItem>
              ))}
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

  let categories = await getCategories(prisma);
  categories = JSON.parse(JSON.stringify(categories));

  if (!session) {
    return {
      props: {
        jobs,
        categories,
      },
    };
  }

  let user = await getUser(session.user.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  return {
    props: {
      jobs,
      user,
      categories,
    },
  };
}
