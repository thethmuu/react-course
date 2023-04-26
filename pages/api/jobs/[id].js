import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    if (req.query) {
      await prisma.job.delete({
        where: {
          id: parseInt(req.query.id),
        },
      });
    }

    return res.status(200).json({ message: 'Deleted successfully!' });
  }

  return res.status(501).json({ message: 'Method not allowed!' });
}
