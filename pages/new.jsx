import React from 'react';
import Layout from '@/components/Layout';
import { Button, TextInput } from '@tremor/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function New() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    await axios.post('/api/jobs', data);
    console.log(data);
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
          <textarea
            {...register('description', { required: true })}
            className='mt-1'
            placeholder='Job title'
          ></textarea>
          <TextInput
            {...register('salary', { required: true })}
            className='mt-1'
            placeholder='Job title'
          ></TextInput>
          <TextInput
            {...register('location', { required: true })}
            className='mt-1'
            placeholder='Job title'
          ></TextInput>
          <Button>Save</Button>
        </form>
      </section>
    </Layout>
  );
}
