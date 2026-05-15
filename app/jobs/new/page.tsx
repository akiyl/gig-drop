"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { useRouter } from "next/navigation";
import { createJob } from "../../actions/job";
import {
  GIG_DROP_ABI,
  JOB_POST_FEE_WEI,
  JOB_POST_FEE_ETH,
  getContractAddress,
} from "@/lib/contract";

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export default function PostJobPage() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected || !address) {
      setMessage("Connect your wallet first");
      return;
    }

    const contractAddress = getContractAddress();
    if (!contractAddress) {
      setMessage("No contract deployed. Deploy it from the dashboard first.");
      return;
    }

    setLoading(true);
    setMessage("");

    const form = new FormData(e.currentTarget);
    try {
      setMessage(`Sending ${JOB_POST_FEE_ETH} ETH — confirm in your wallet...`);
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: GIG_DROP_ABI,
        functionName: "createJobPost",
        value: JOB_POST_FEE_WEI,
      });

      setMessage("Waiting for confirmation...");
      await publicClient.waitForTransactionReceipt({ hash });

      setMessage("Payment confirmed! Creating job post...");

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
    <div className="min-h-screen" style={{ backgroundColor: "#fcfaf7", color: "#423d38" }}>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1" style={{ color: "#797067" }}>Title</label>
            <input
              name="title"
              required
              className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00]"
              style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
              placeholder="e.g. Build a DeFi Dashboard"
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#797067" }}>Description</label>
            <textarea
              name="description"
              required
              rows={6}
              className="w-full rounded-xl p-4 placeholder-zinc-500 focus:outline-none focus:border-[#fe6e00]"
              style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
              placeholder="Describe the project in detail..."
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#797067" }}>Skills (comma-separated)</label>
            <input
              name="skills"
              required
              className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00]"
              style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
              placeholder="React, TypeScript, Solidity"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: "#797067" }}>Budget ($)</label>
              <input
                name="budget"
                type="number"
                required
                min={1}
                className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00]"
                style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: "#797067" }}>Deadline</label>
              <input
                name="deadline"
                type="date"
                required
                className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00]"
                style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
              />
            </div>
          </div>
          {message && (
            <p className="text-sm" style={{ color: message === "Job posted!" ? "#00c758" : "#fb2c36" }}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-6 py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
            style={{ backgroundColor: "#ffffff", color: "#423d38", border: "1px solid #e3e0dd" }}
          >
            {loading ? "Processing..." : `Post Job (${JOB_POST_FEE_ETH} ETH)`}
          </button>
        </form>
      </div>
    </div>
  );
}
