import React from 'react';
import Job from '@/components/Job'

export default function Jobs({ jobs }) {
  return (
    <section className='flex flex-col gap-4 mt-4'>
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </section>
  );
}
