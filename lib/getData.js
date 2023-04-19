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

export async function getJob(id, prisma) {
  const job = await prisma.job.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });

  return job;
}

export async function getCompany(id, prisma) {
  const job = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return job;
}

export async function getCompanyJobs(company_id, prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
      authorId: company_id,
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
