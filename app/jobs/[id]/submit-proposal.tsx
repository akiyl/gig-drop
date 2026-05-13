"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { submitProposal } from "../../actions/proposal";

export default function SubmitProposal({ jobId }: { jobId: string }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected || !address) {
      setMessage("Connect your wallet first");
      return;
    }

    setLoading(true);
    setMessage("");

    const form = new FormData(e.currentTarget);
    try {
      await submitProposal({
        walletAddress: address,
        jobId,
        coverLetter: form.get("coverLetter") as string,
        bidAmount: Number(form.get("bidAmount")),
        timeframe: Number(form.get("timeframe")),
      });
      setMessage("Proposal submitted!");
      router.refresh();
    } catch (err: any) {
      setMessage(err.message ?? "Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Cover Letter</label>
        <textarea
          name="coverLetter"
          required
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          placeholder="Why are you the best fit for this job?"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Bid Amount ($)</label>
          <input
            name="bidAmount"
            type="number"
            required
            min={1}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            placeholder="5000"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Timeframe (days)</label>
          <input
            name="timeframe"
            type="number"
            required
            min={1}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            placeholder="30"
          />
        </div>
      </div>
      {message && (
        <p className={`text-sm ${message === "Proposal submitted!" ? "text-emerald-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Proposal"}
      </button>
    </form>
  );
}
