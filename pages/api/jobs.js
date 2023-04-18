import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  // const session = await getServerSession(req, res, authOptions);

  // if (!session?.user?.email) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }

  // console.log(session);

  if (req.method === 'POST') {
    const { title, description, location, salary } = req.body;
    await prisma.job.create({
      data: {
        title,
        description,
        location,
        salary,
        author: {
          connect: { id: 'clgm8thco0000gppk3otghmex' },
        },
      },
    });

    return res.status(201).end();
  }

  return res.status(501).json({ message: 'Method not allowed!' });
}
