"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { createJob } from "../../actions/job";

export default function PostJobPage() {
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
      await createJob({
        walletAddress: address,
        title: form.get("title") as string,
        description: form.get("description") as string,
        skills: form.get("skills") as string,
        budget: Number(form.get("budget")),
        deadline: form.get("deadline") as string,
      });
      setMessage("Job posted!");
      router.push("/jobs");
    } catch (err: any) {
      setMessage(err.message ?? "Failed to post job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input
              name="title"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g. Build a DeFi Dashboard"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows={6}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              placeholder="Describe the project in detail..."
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Skills (comma-separated)</label>
            <input
              name="skills"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:outline-none focus:border-purple-500"
              placeholder="React, TypeScript, Solidity"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Budget ($)</label>
              <input
                name="budget"
                type="number"
                required
                min={1}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:outline-none focus:border-purple-500"
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Deadline</label>
              <input
                name="deadline"
                type="date"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          {message && (
            <p className={`text-sm ${message === "Job posted!" ? "text-emerald-400" : "text-red-400"}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
