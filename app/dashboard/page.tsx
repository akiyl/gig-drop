"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getDashboardStats } from "../actions/dashboard";
import { getProfileByWallet } from "../actions/dashboard";
import type { DashboardStats, UserProfile } from "../types";
import Link from "next/link";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (!address) return;
    getProfileByWallet(address).then(setProfile);
    getDashboardStats(address).then(setStats);
  }, [address]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Connect your wallet to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex gap-3">
            <Link
              href="/dashboard/wallet"
              className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-6 py-3 font-semibold hover:bg-purple-500/20 transition"
            >
              Wallet
            </Link>
            <Link
              href="/dashboard/profile"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              {profile ? "Edit Profile" : "Create Profile"}
            </Link>
          </div>
        </div>

        {!profile && (
          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 mb-8">
            <p className="text-purple-300">
              You haven't created a profile yet.{' '}
              <Link href="/dashboard/profile" className="underline font-semibold">
                Create one now
              </Link> to start posting jobs or submitting proposals.
            </p>
          </div>
        )}

        {profile && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl mb-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{profile.name ?? profile.username ?? "Unnamed"}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${profile.role === "CLIENT" ? "bg-purple-500/20 text-purple-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                    {profile.role === "CLIENT" ? "Client" : "Freelancer"}
                  </span>
                </div>
                {profile.username && <p className="text-zinc-500 mt-1">@{profile.username}</p>}
              </div>
              {profile.hourlyRate && (
                <div className="text-right">
                  <p className="text-3xl font-bold text-emerald-400">${profile.hourlyRate}</p>
                  <p className="text-xs text-zinc-500">/ hr</p>
                </div>
              )}
            </div>
            {profile.bio && (
              <p className="mt-4 text-zinc-300 line-clamp-2">{profile.bio}</p>
            )}
            {profile.skills && (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.split(",").map((skill) => (
                  <span key={skill.trim()} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">
              {profile?.role === "CLIENT" ? "Active Jobs" : "Active Bids"}
            </p>
            <h3 className="mt-3 text-4xl font-bold">{stats?.activeJobs ?? 0}</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">
              {profile?.role === "CLIENT" ? "Total Proposals" : "Active Contracts"}
            </p>
            <h3 className="mt-3 text-4xl font-bold">{stats?.totalProposals ?? 0}</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Completed</p>
            <h3 className="mt-3 text-4xl font-bold">{stats?.completedContracts ?? 0}</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Total Earned</p>
            <h3 className="mt-3 text-4xl font-bold">
              ${(stats?.totalEarned ?? 0).toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
