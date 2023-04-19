import Layout from '@/components/Layout';
import { Button, Card, TextInput, Title } from '@tremor/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';

export default function Setup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    await axios.post('/api/setup', { ...data, userId: session.user.id });
    setLoading(false);

    session.user.name = data.name;
    session.user.isCompany = data.isCompany;
    router.push('/');
  }

  return (
    <Layout>
      <Card className='max-w-md mx-auto'>
        <Title>Setup your profile</Title>
        <form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register('name', { required: true })}
            className='mt-1'
            placeholder='Add your name'
            error={errors.name}
          ></TextInput>

          <div className='mt-4'>
            <label htmlFor='isCompany'>Are you a company?</label>
            <input
              className='block p-1 mt-1'
              type='checkbox'
              id='isCompany'
              {...register('isCompany', { required: false })}
            />
          </div>

          <Button
            // loading={loading}
            type='submit'
            className='mt-4'
            color='green'
          >
            Save
          </Button>
        </form>
      </Card>
    </Layout>
  );
}
