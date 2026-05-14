"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats(walletAddress: string) {
  const user = await prisma.user.findUnique({ where: { walletAddress } });
  if (!user) return null;

  if (user.role === "CLIENT") {
    const [activeJobs, totalProposals, completedContracts] = await Promise.all([
      prisma.job.count({ where: { clientId: user.id, status: "OPEN" } }),
      prisma.proposal.count({
        where: { job: { clientId: user.id } },
      }),
      prisma.contract.count({
        where: { clientId: user.id, status: "COMPLETED" },
      }),
    ]);

    return { activeJobs, totalProposals, completedContracts, totalEarned: 0 };
  }

  const [activeBids, wonContracts, completedContracts, contracts] =
    await Promise.all([
      prisma.proposal.count({
        where: { freelancerId: user.id, status: "PENDING" },
      }),
      prisma.contract.count({
        where: { freelancerId: user.id, status: "ACTIVE" },
      }),
      prisma.contract.count({
        where: { freelancerId: user.id, status: "COMPLETED" },
      }),
      prisma.contract.findMany({
        where: { freelancerId: user.id, status: "COMPLETED" },
        select: { amount: true },
      }),
    ]);

  const totalEarned = contracts.reduce(
    (sum: number, c: { amount: number }) => sum + c.amount,
    0,
  );

  return {
    activeJobs: activeBids,
    totalProposals: wonContracts,
    completedContracts,
    totalEarned,
  };
}

export async function getProfileByWallet(walletAddress: string) {
  return prisma.user.findUnique({ where: { walletAddress } });
}

export async function getWalletData(walletAddress: string) {
  const user = await prisma.user.findUnique({
    where: { walletAddress },
    include: {
      transactions: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  if (!user) return null;

  const [activeFreelancerContracts, activeClientContracts] = await Promise.all([
    prisma.contract.findMany({
      where: { freelancerId: user.id, status: "ACTIVE" },
      select: { amount: true },
    }),
    prisma.contract.findMany({
      where: { clientId: user.id, status: "ACTIVE" },
      select: { amount: true },
    }),
  ]);

  const escrowBalance = activeFreelancerContracts.reduce(
    (s: number, c: { amount: number }) => s + c.amount,
    0,
  );
  const pendingPayouts = activeClientContracts.reduce(
    (s: number, c: { amount: number }) => s + c.amount,
    0,
  );

  return {
    balance: user.balance,
    escrowBalance,
    pendingPayouts,
    totalAssets: user.balance + escrowBalance,
    transactions: user.transactions.map((t) => ({
      id: t.id,
      type: t.type,
      amount: t.amount,
      description: t.description,
      createdAt: t.createdAt,
    })),
  };
}
