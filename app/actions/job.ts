"use server";

import { prisma } from "@/lib/prisma";

export async function getJobs(filters?: {
  search?: string;
  skill?: string;
}) {
  const where: any = { status: "OPEN" };

  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }
  if (filters?.skill) {
    where.skills = { contains: filters.skill, mode: "insensitive" };
  }

  return prisma.job.findMany({
    where,
    include: {
      client: { select: { id: true, name: true, username: true, avatarUrl: true } },
      _count: { select: { proposals: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJobById(id: string) {
  return prisma.job.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, username: true, avatarUrl: true } },
      _count: { select: { proposals: true } },
    },
  });
}

export async function getMyJobs(walletAddress: string) {
  const user = await prisma.user.findUnique({ where: { walletAddress } });
  if (!user) return [];

  return prisma.job.findMany({
    where: { clientId: user.id },
    include: {
      _count: { select: { proposals: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createJob(data: {
  walletAddress: string;
  title: string;
  description: string;
  skills: string;
  budget: number;
  deadline: string;
}) {
  const user = await prisma.user.findUnique({
    where: { walletAddress: data.walletAddress },
  });
  if (!user || user.role !== "CLIENT") throw new Error("Only clients can post jobs");

  return prisma.job.create({
    data: {
      clientId: user.id,
      title: data.title,
      description: data.description,
      skills: data.skills,
      budget: data.budget,
      deadline: new Date(data.deadline),
    },
  });
}
