"use server";

import { prisma } from "@/lib/prisma";

export async function acceptProposal(walletAddress: string, proposalId: string) {
  const client = await prisma.user.findUnique({ where: { walletAddress } });
  if (!client || client.role !== "CLIENT") throw new Error("Only clients can accept proposals");

  const proposal = await prisma.proposal.findUnique({
    where: { id: proposalId },
    include: { job: true },
  });
  if (!proposal) throw new Error("Proposal not found");
  if (proposal.job.clientId !== client.id) throw new Error("This job is not yours");
  if (proposal.status !== "PENDING") throw new Error("Proposal is not pending");

  const existingContract = await prisma.contract.findUnique({
    where: { jobId: proposal.jobId },
  });
  if (existingContract) throw new Error("Job already has a contract");

  const [contract] = await prisma.$transaction([
    prisma.proposal.update({
      where: { id: proposalId },
      data: { status: "ACCEPTED" },
    }),
    prisma.job.update({
      where: { id: proposal.jobId },
      data: { status: "IN_PROGRESS" },
    }),
    prisma.contract.create({
      data: {
        jobId: proposal.jobId,
        clientId: client.id,
        freelancerId: proposal.freelancerId,
        proposalId: proposal.id,
        amount: proposal.bidAmount,
        status: "ACTIVE",
      },
    }),
  ]);

  return contract;
}

export async function releasePayment(contractId: string, walletAddress: string) {
  const client = await prisma.user.findUnique({ where: { walletAddress } });
  if (!client || client.role !== "CLIENT") throw new Error("Only clients can release payment");

  const contract = await prisma.contract.findUnique({
    where: { id: contractId },
    include: { job: true, freelancer: true },
  });
  if (!contract) throw new Error("Contract not found");
  if (contract.clientId !== client.id) throw new Error("This contract is not yours");
  if (contract.status !== "ACTIVE") throw new Error("Contract is not active");
  if (client.balance < contract.amount) throw new Error("Insufficient balance");

  await prisma.$transaction([
    prisma.user.update({
      where: { id: client.id },
      data: { balance: { decrement: contract.amount } },
    }),
    prisma.user.update({
      where: { id: contract.freelancerId },
      data: { balance: { increment: contract.amount } },
    }),
    prisma.contract.update({
      where: { id: contractId },
      data: { status: "COMPLETED", endDate: new Date() },
    }),
    prisma.job.update({
      where: { id: contract.jobId },
      data: { status: "COMPLETED" },
    }),
    prisma.transaction.create({
      data: {
        userId: client.id,
        type: "TRANSFER",
        amount: contract.amount,
        description: `Payment sent to ${contract.freelancer.name || contract.freelancer.walletAddress}`,
        referenceId: contractId,
        counterpartyId: contract.freelancerId,
        counterpartyName: contract.freelancer.name || contract.freelancer.walletAddress,
      },
    }),
    prisma.transaction.create({
      data: {
        userId: contract.freelancerId,
        type: "TRANSFER",
        amount: contract.amount,
        description: `Payment received from ${client.name || client.walletAddress}`,
        referenceId: contractId,
        counterpartyId: client.id,
        counterpartyName: client.name || client.walletAddress,
      },
    }),
  ]);

  return { success: true };
}

export async function refundPayment(contractId: string, walletAddress: string) {
  const client = await prisma.user.findUnique({ where: { walletAddress } });
  if (!client || client.role !== "CLIENT") throw new Error("Only clients can refund");

  const contract = await prisma.contract.findUnique({
    where: { id: contractId },
    include: { freelancer: true },
  });
  if (!contract) throw new Error("Contract not found");
  if (contract.clientId !== client.id) throw new Error("This contract is not yours");
  if (contract.status !== "ACTIVE") throw new Error("Contract is not active");

  await prisma.$transaction([
    prisma.contract.update({
      where: { id: contractId },
      data: { status: "CANCELLED", endDate: new Date() },
    }),
    prisma.job.update({
      where: { id: contract.jobId },
      data: { status: "OPEN" },
    }),
    prisma.transaction.create({
      data: {
        userId: client.id,
        type: "REFUND",
        amount: contract.amount,
        description: `Escrow refunded for contract with ${contract.freelancer.name || contract.freelancer.walletAddress}`,
        referenceId: contractId,
        counterpartyId: contract.freelancerId,
        counterpartyName: contract.freelancer.name || contract.freelancer.walletAddress,
      },
    }),
  ]);

  return { success: true };
}

export async function transferFunds(
  senderWallet: string,
  receiverWallet: string,
  amount: number,
) {
  if (amount <= 0) throw new Error("Amount must be positive");
  if (senderWallet === receiverWallet) throw new Error("Cannot send to yourself");

  const sender = await prisma.user.findUnique({ where: { walletAddress: senderWallet } });
  if (!sender) throw new Error("Sender not found");
  if (sender.balance < amount) throw new Error("Insufficient balance");

  const receiver = await prisma.user.findUnique({ where: { walletAddress: receiverWallet } });
  if (!receiver) throw new Error("Recipient has no profile on GigDrop. They must create a profile first.");

  await prisma.$transaction([
    prisma.user.update({
      where: { id: sender.id },
      data: { balance: { decrement: amount } },
    }),
    prisma.user.update({
      where: { id: receiver.id },
      data: { balance: { increment: amount } },
    }),
    prisma.transaction.create({
      data: {
        userId: sender.id,
        type: "TRANSFER",
        amount,
        description: `Sent to ${receiver.name || receiver.walletAddress}`,
        counterpartyId: receiver.id,
        counterpartyName: receiver.name || receiver.walletAddress,
      },
    }),
    prisma.transaction.create({
      data: {
        userId: receiver.id,
        type: "TRANSFER",
        amount,
        description: `Received from ${sender.name || sender.walletAddress}`,
        counterpartyId: sender.id,
        counterpartyName: sender.name || sender.walletAddress,
      },
    }),
  ]);

  return { success: true };
}

export async function getContractsForUser(walletAddress: string) {
  const user = await prisma.user.findUnique({ where: { walletAddress } });
  if (!user) return [];

  const [asClient, asFreelancer] = await Promise.all([
    prisma.contract.findMany({
      where: { clientId: user.id },
      include: {
        job: { select: { title: true } },
        freelancer: { select: { name: true, walletAddress: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.contract.findMany({
      where: { freelancerId: user.id },
      include: {
        job: { select: { title: true } },
        client: { select: { name: true, walletAddress: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const mapContract = (c: any, role: string) => ({
    id: c.id,
    jobId: c.jobId,
    jobTitle: c.job.title,
    clientId: c.clientId,
    clientName: role === "client" ? null : c.client.name || c.client.walletAddress,
    freelancerId: c.freelancerId,
    freelancerName: role === "freelancer" ? null : c.freelancer.name || c.freelancer.walletAddress,
    amount: c.amount,
    status: c.status,
    startDate: c.startDate,
    endDate: c.endDate,
  });

  return [
    ...asClient.map((c) => mapContract(c, "client")),
    ...asFreelancer.map((c) => mapContract(c, "freelancer")),
  ];
}
