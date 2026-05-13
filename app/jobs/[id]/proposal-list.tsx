"use client";

import type { ProposalWithFreelancer } from "@/app/types";

export default function ProposalList({
  proposals,
}: {
  proposals: ProposalWithFreelancer[];
}) {
  if (proposals.length === 0) {
    return <p className="text-zinc-500">No proposals yet.</p>;
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
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
              <span className="mt-2 inline-block rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400">
                {proposal.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
