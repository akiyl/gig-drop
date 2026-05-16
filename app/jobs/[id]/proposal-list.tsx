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
    return <p style={{ color: "#6B6774" }}>No proposals yet.</p>;
  }

  return (
    <div>
      {error && (
        <p className="mb-4 text-sm" style={{ color: "#fb2c36" }}>{error}</p>
      )}
      <div className="space-y-4">
        {proposals.map((proposal: ProposalWithFreelancer) => (
          <div
            key={proposal.id}
            className="rounded-xl p-6"
            style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "#fe6e00", color: "#ffffff" }}>
                    {proposal.freelancer.name?.charAt(0) ?? "F"}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {proposal.freelancer.name ?? proposal.freelancer.username ?? "Anonymous"}
                    </p>
                    {proposal.freelancer.hourlyRate && (
                      <p className="text-sm" style={{ color: "#6B6774" }}>
                        ${proposal.freelancer.hourlyRate}/hr
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm" style={{ color: "#EAE6DF" }}>{proposal.coverLetter}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold" style={{ color: "#0AFFB5" }}>
                  ${proposal.bidAmount.toLocaleString()}
                </p>
                {proposal.timeframe && (
                  <p className="text-sm" style={{ color: "#6B6774" }}>{proposal.timeframe} days</p>
                )}
                <span className="mt-2 inline-block rounded-full px-3 py-1 text-xs"
                  style={{
                    backgroundColor: proposal.status === "PENDING"
                      ? "rgba(234, 179, 8, 0.2)"
                    : proposal.status === "ACCEPTED"
                    ? "rgba(10, 255, 181, 0.2)"
                    : proposal.status === "REJECTED"
                    ? "rgba(251, 44, 54, 0.2)"
                    : "rgba(121, 112, 103, 0.2)",
                  color: proposal.status === "PENDING"
                    ? "#ca8a04"
                    : proposal.status === "ACCEPTED"
                    ? "#0AFFB5"
                    : proposal.status === "REJECTED"
                    ? "#fb2c36"
                    : "#6B6774",
                  }}
                >
                  {proposal.status}
                </span>
                {isOwner && proposal.status === "PENDING" && (
                  <button
                    onClick={() => handleAccept(proposal.id)}
                    disabled={accepting === proposal.id}
                    className="mt-3 block w-full rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50"
                    style={{ backgroundColor: "#0AFFB5", color: "#ffffff" }}
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
