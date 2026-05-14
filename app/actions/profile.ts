"use server";

import { prisma } from "@/lib/prisma";
import type { UserProfile } from "@/app/types";

type Role = "CLIENT" | "FREELANCER";

export async function getProfile(walletAddress: string): Promise<UserProfile | null> {
  const user = await prisma.user.findUnique({
    where: { walletAddress },
  });
  return user;
}

export async function createOrUpdateProfile(data: {
  walletAddress: string;
  username: string;
  name: string;
  bio: string;
  role: Role;
  skills: string;
  hourlyRate: number;
}) {
  const existing = await prisma.user.findUnique({
    where: { walletAddress: data.walletAddress },
  });

  if (existing) {
    return prisma.user.update({
      where: { walletAddress: data.walletAddress },
      data: {
        username: data.username,
        name: data.name,
        bio: data.bio,
        role: data.role,
        skills: data.skills,
        hourlyRate: data.hourlyRate,
      },
    });
  }

  return prisma.user.create({
    data: {
      walletAddress: data.walletAddress,
      username: data.username,
      name: data.name,
      bio: data.bio,
      role: data.role,
      skills: data.skills,
      hourlyRate: data.hourlyRate,
    },
  });
}

export async function getProfileById(id: string): Promise<UserProfile | null> {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}
