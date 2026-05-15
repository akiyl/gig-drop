"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { acceptProposal } from "@/app/actions/payment";
import type { ProposalWithFreelancer, JobWithClient } from "@/app/types";

export default function ProposalList({
  proposals,
  job,
}: {
  proposals: ProposalWithFreelancer[];
  job: JobWithClient;
}) {
  const { address, isConnected } = useAccount();
  const [accepting, setAccepting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const isOwner = isConnected && address?.toLowerCase() === job.client.walletAddress?.toLowerCase();

  async function handleAccept(proposalId: string) {
    if (!address) return;
    setAccepting(proposalId);
    setError("");
    try {
      await acceptProposal(address, proposalId);
      window.location.reload();
    } catch (e: any) {
      setError(e.message ?? "Failed to accept");
    } finally {
      setAccepting(null);
    }
  }

  if (proposals.length === 0) {
    return <p className="text-zinc-500">No proposals yet.</p>;
  }

  return (
    <div>
      {error && (
        <p className="mb-4 text-sm text-red-400">{error}</p>
      )}
      <div className="space-y-4">
        {proposals.map((proposal: ProposalWithFreelancer) => (
          <div
            key={proposal.id}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    {proposal.freelancer.name?.charAt(0) ?? "F"}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {proposal.freelancer.name ?? proposal.freelancer.username ?? "Anonymous"}
                    </p>
                    {proposal.freelancer.hourlyRate && (
                      <p className="text-sm text-zinc-500">
                        ${proposal.freelancer.hourlyRate}/hr
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm text-zinc-300">{proposal.coverLetter}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-emerald-400">
                  ${proposal.bidAmount.toLocaleString()}
                </p>
                {proposal.timeframe && (
                  <p className="text-sm text-zinc-500">{proposal.timeframe} days</p>
                )}
                <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${
                  proposal.status === "PENDING"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : proposal.status === "ACCEPTED"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : proposal.status === "REJECTED"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-zinc-500/20 text-zinc-400"
                }`}>
                  {proposal.status}
                </span>
                {isOwner && proposal.status === "PENDING" && (
                  <button
                    onClick={() => handleAccept(proposal.id)}
                    disabled={accepting === proposal.id}
                    className="mt-3 block w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 transition disabled:opacity-50"
                  >
                    {accepting === proposal.id ? "Accepting..." : "Accept & Start Contract"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
