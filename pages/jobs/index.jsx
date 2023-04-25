import { useRouter } from 'next/router';
import React from 'react';

export default function Index() {
  const router = useRouter();

  console.log(router.query.categories);
  return <div>Jobs by category</div>;
}
