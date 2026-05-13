"use server";

import { prisma } from "@/lib/prisma";

export async function getProposalsForJob(jobId: string) {
  return prisma.proposal.findMany({
    where: { jobId },
    include: {
      freelancer: {
        select: { id: true, name: true, username: true, avatarUrl: true, hourlyRate: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function submitProposal(data: {
  walletAddress: string;
  jobId: string;
  coverLetter: string;
  bidAmount: number;
  timeframe: number;
}) {
  const user = await prisma.user.findUnique({
    where: { walletAddress: data.walletAddress },
  });
  if (!user || user.role !== "FREELANCER") throw new Error("Only freelancers can submit proposals");

  const existing = await prisma.proposal.findFirst({
    where: { jobId: data.jobId, freelancerId: user.id },
  });
  if (existing) throw new Error("You already submitted a proposal for this job");

  return prisma.proposal.create({
    data: {
      jobId: data.jobId,
      freelancerId: user.id,
      coverLetter: data.coverLetter,
      bidAmount: data.bidAmount,
      timeframe: data.timeframe,
    },
  });
}

export async function getMyProposals(walletAddress: string) {
  const user = await prisma.user.findUnique({ where: { walletAddress } });
  if (!user) return [];

  return prisma.proposal.findMany({
    where: { freelancerId: user.id },
    include: {
      job: {
        select: { id: true, title: true, status: true, budget: true, skills: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
