import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { coverletter, job, userId } = req.body;

    if (!coverletter) {
      return res
        .status(400)
        .json({ message: 'missing required parameter coverletter' });
    }

    if (!job) {
      return res
        .status(400)
        .json({ message: 'missing required parameter job' });
    }

    await prisma.application.create({
      data: {
        coverletter,
        job: {
          connect: { id: job },
        },
        author: {
          connect: { id: userId },
        },
      },
    });

    return res.status(201).json({ message: 'Application successful!' });
  }

  return res.status(401).end();
}
