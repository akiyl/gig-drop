"use server";

import { prisma } from "@/lib/prisma";

export async function testDeposit(walletAddress: string, amount: number) {
  const user = await prisma.user.findUnique({ where: { walletAddress } });
  if (!user) throw new Error("Profile not found");

  await prisma.$transaction([
    prisma.user.update({
      where: { walletAddress },
      data: { balance: { increment: amount } },
    }),
    prisma.transaction.create({
      data: {
        userId: user.id,
        type: "DEPOSIT",
        amount,
        description: `Test deposit — $${amount}`,
      },
    }),
  ]);

  return { success: true };
}

export async function testWithdraw(walletAddress: string, amount: number) {
  const user = await prisma.user.findUnique({ where: { walletAddress } });
  if (!user) throw new Error("Profile not found");
  if (user.balance < amount) throw new Error("Insufficient balance");

  await prisma.$transaction([
    prisma.user.update({
      where: { walletAddress },
      data: { balance: { decrement: amount } },
    }),
    prisma.transaction.create({
      data: {
        userId: user.id,
        type: "WITHDRAWAL",
        amount,
        description: `Test withdrawal — $${amount}`,
      },
    }),
  ]);

  return { success: true };
}
