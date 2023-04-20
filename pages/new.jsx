import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button, TextInput } from '@tremor/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function New() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data) {
    setLoading(true);
    await axios.post('/api/jobs', { ...data, userId: session.user.id });
    setLoading(false);

    router.push('/dashboard');
  }

  return (
    <Layout>
      <section className='max-w-lg mx-auto'>
        <h2>Post new job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
          <TextInput
            {...register('title', { required: true })}
            className='mt-1'
            placeholder='Job title'
          ></TextInput>

          <TextInput
            {...register('salary', { required: true })}
            className='mt-4'
            placeholder='salary'
          ></TextInput>

          <TextInput
            {...register('location', { required: true })}
            className='mt-4'
            placeholder='Location'
          ></TextInput>

          <textarea
            {...register('description', { required: true })}
            className='w-full px-4 py-2 mt-4 text-sm font-medium bg-transparent border rounded outline-none focus:ring-blue-200 focus:ring'
            placeholder='Job description'
          ></textarea>

          <Button loading={loading} color='indigo' className='mt-4'>
            Save
          </Button>
        </form>
      </section>
    </Layout>
  );
}
