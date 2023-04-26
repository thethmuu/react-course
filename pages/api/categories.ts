import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const categories = await prisma.category.findMany({});

    return res.status(200).json(categories);
  }

  return res.status(501).json({ message: 'Method not allowed!' });
}
