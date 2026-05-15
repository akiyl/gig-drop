"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getContractsForUser, releasePayment, refundPayment } from "@/app/actions/payment";
import type { ContractWithDetails } from "@/app/types";

export default function ContractsPage() {
  const { address, isConnected } = useAccount();
  const [contracts, setContracts] = useState<ContractWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    if (!address) { setLoading(false); return; }
    getContractsForUser(address).then(setContracts).finally(() => setLoading(false));
  }, [address]);

  async function handleRelease(contractId: string) {
    if (!address) return;
    setActionId(contractId);
    try {
      await releasePayment(contractId, address);
      setContracts((prev) =>
        prev.map((c) => (c.id === contractId ? { ...c, status: "COMPLETED" } : c)),
      );
    } catch (e: any) {
      alert(e.message ?? "Failed");
    } finally {
      setActionId(null);
    }
  }

  async function handleRefund(contractId: string) {
    if (!address) return;
    setActionId(contractId);
    try {
      await refundPayment(contractId, address);
      setContracts((prev) =>
        prev.map((c) => (c.id === contractId ? { ...c, status: "CANCELLED" } : c)),
      );
    } catch (e: any) {
      alert(e.message ?? "Failed");
    } finally {
      setActionId(null);
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Connect your wallet to view contracts.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Loading contracts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">Contracts</h1>

        {contracts.length === 0 ? (
          <p className="text-zinc-500">No contracts yet. Accept a proposal to start one.</p>
        ) : (
          <div className="space-y-4">
            {contracts.map((contract) => {
              const isClient = contract.clientName !== null;
              const counterparty = isClient ? contract.freelancerName : contract.clientName;
              return (
                <div
                  key={contract.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{contract.jobTitle}</h3>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                          contract.status === "ACTIVE"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : contract.status === "COMPLETED"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {contract.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-zinc-500">
                        <span>
                          {isClient ? "Hired" : "Working for"}: {counterparty ?? "Unknown"}
                        </span>
                        <span>•</span>
                        <span>Started {new Date(contract.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold text-emerald-400">
                        ${contract.amount.toLocaleString()}
                      </p>
                      {contract.status === "ACTIVE" && isClient && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => handleRelease(contract.id)}
                            disabled={actionId === contract.id}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 transition disabled:opacity-50"
                          >
                            {actionId === contract.id ? "..." : "Release Payment"}
                          </button>
                          <button
                            onClick={() => handleRefund(contract.id)}
                            disabled={actionId === contract.id}
                            className="rounded-lg bg-red-600/50 px-4 py-2 text-sm font-semibold hover:bg-red-500/70 transition disabled:opacity-50"
                          >
                            Refund
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
