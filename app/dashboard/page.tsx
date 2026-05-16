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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#04040A" }}>
        <p style={{ color: "#6B6774" }}>Connect your wallet to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#04040A", color: "#EAE6DF" }}>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/deploy"
              className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-80"
              style={{ backgroundColor: "#0AFFB5", color: "#04040A" }}
            >
              Deploy Contract
            </Link>
            <Link
              href="/dashboard/test-payment"
              className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-80"
              style={{ backgroundColor: "rgba(255, 176, 32, 0.10)", color: "#FFB020", border: "1px solid rgba(255, 176, 32, 0.30)" }}
            >
              Test Payments
            </Link>
            <Link
              href="/dashboard/contracts"
              className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-80"
              style={{ backgroundColor: "rgba(48, 128, 255, 0.10)", color: "#3080ff", border: "1px solid rgba(48, 128, 255, 0.30)" }}
            >
              Contracts
            </Link>
            <Link
              href="/dashboard/wallet"
              className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-80"
              style={{ backgroundColor: "rgba(254, 110, 0, 0.10)", color: "#fe6e00", border: "1px solid rgba(254, 110, 0, 0.30)" }}
            >
              Wallet
            </Link>
            <Link
              href="/dashboard/profile"
              className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-80"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.06)", color: "#EAE6DF", border: "1px solid rgba(255, 255, 255, 0.12)" }}
            >
              {profile ? "Edit Profile" : "Create Profile"}
            </Link>
          </div>
        </div>

        {!profile && (
          <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: "rgba(254, 110, 0, 0.08)", border: "1px solid rgba(254, 110, 0, 0.25)" }}>
            <p style={{ color: "#fe6e00" }}>
              You haven&apos;t created a profile yet.{' '}
              <Link href="/dashboard/profile" className="underline font-semibold">
                Create one now
              </Link> to start posting jobs or submitting proposals.
            </p>
          </div>
        )}

        {profile && (
          <div
            className="rounded-lg p-6 mb-8"
            style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{profile.name ?? profile.username ?? "Unnamed"}</h2>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: profile.role === "CLIENT" ? "rgba(254, 110, 0, 0.15)" : "rgba(10, 255, 181, 0.15)",
                      color: profile.role === "CLIENT" ? "#fe6e00" : "#0AFFB5",
                    }}
                  >
                    {profile.role === "CLIENT" ? "Client" : "Freelancer"}
                  </span>
                </div>
                {profile.username && <p style={{ color: "#6B6774" }} className="mt-1">@{profile.username}</p>}
              </div>
              {profile.hourlyRate && (
                <div className="text-right">
                  <p className="text-3xl font-bold" style={{ color: "#0AFFB5" }}>${profile.hourlyRate}</p>
                  <p className="text-xs" style={{ color: "#6B6774" }}>/ hr</p>
                </div>
              )}
            </div>
            {profile.bio && (
              <p className="mt-4 line-clamp-2" style={{ color: "#EAE6DF" }}>{profile.bio}</p>
            )}
            {profile.skills && (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.split(",").map((skill: string) => (
                  <span
                    key={skill.trim()}
                    className="rounded-full px-3 py-1 text-xs"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#6B6774", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="rounded-lg p-6"
            style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}
          >
            <p className="text-sm" style={{ color: "#6B6774" }}>
              {profile?.role === "CLIENT" ? "Active Jobs" : "Active Bids"}
            </p>
            <h3 className="mt-3 text-4xl font-bold" style={{ color: "#fe6e00" }}>{stats?.activeJobs ?? 0}</h3>
          </div>
          <div
            className="rounded-lg p-6"
            style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}
          >
            <p className="text-sm" style={{ color: "#6B6774" }}>
              {profile?.role === "CLIENT" ? "Total Proposals" : "Active Contracts"}
            </p>
            <h3 className="mt-3 text-4xl font-bold" style={{ color: "#EAE6DF" }}>{stats?.totalProposals ?? 0}</h3>
          </div>
          <div
            className="rounded-lg p-6"
            style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}
          >
            <p className="text-sm" style={{ color: "#6B6774" }}>Completed</p>
            <h3 className="mt-3 text-4xl font-bold" style={{ color: "#0AFFB5" }}>{stats?.completedContracts ?? 0}</h3>
          </div>
          <div
            className="rounded-lg p-6"
            style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}
          >
            <p className="text-sm" style={{ color: "#6B6774" }}>Total Earned</p>
            <h3 className="mt-3 text-4xl font-bold" style={{ color: "#FFB020" }}>
              ${(stats?.totalEarned ?? 0).toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
