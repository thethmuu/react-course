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

export async function getJobsByCategory(categoryId, prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
      categoryId: parseInt(categoryId),
    },
    include: {
      author: true,
      category: true,
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

export async function getUser(id, prisma) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
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

export async function getJobsPosted(id, prisma) {
  const jobs = await prisma.job.findMany({
    where: { authorId: id },
    include: {
      author: true,
      applications: true,
    },
    orderBy: [{ id: 'desc' }],
  });

  return jobs;
}

export async function getUserApplications(id, prisma) {
  const applications = await prisma.application.findMany({
    where: { authorId: id },
    include: {
      author: true,
      job: true,
    },
    orderBy: [{ id: 'desc' }],
  });

  return applications;
}

export async function checkAlreadyApplied(userId, jobId, prisma) {
  const applications = await prisma.application.findMany({
    where: { jobId: parseInt(jobId) },
    include: {
      author: true,
      job: true,
    },
  });

  if (applications.length > 0) {
    return true;
  }
  return false;
}

export async function getCategories(prisma) {
  const categories = await prisma.category.findMany({
    include: {
      jobs: true,
    },
  });

  return categories;
}
