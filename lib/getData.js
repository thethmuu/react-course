export async function getJobs(prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });

  return jobs;
}
