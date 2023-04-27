import React from 'react';
import Job from '@/components/Job';

export default function Jobs({ jobs }) {
  return (
    <section className='flex flex-col w-full gap-4 mt-4 sm:mt-0'>
      {jobs.length > 0 ? (
        jobs.map((job) => <Job key={job.id} job={job} />)
      ) : (
        <p className='text-center'>No job currently</p>
      )}
    </section>
  );
}
