import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, isCompany, userId } = req.body;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        isCompany,
      },
    });

    res.status(200).json({ message: 'Setup successful' });
  }
}
