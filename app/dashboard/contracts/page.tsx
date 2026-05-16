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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#04040A" }}>
        <p style={{ color: "#6B6774" }}>Connect your wallet to view contracts.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#04040A" }}>
        <p style={{ color: "#6B6774" }}>Loading contracts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#04040A", color: "#EAE6DF" }}>
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Contracts</h1>

        {contracts.length === 0 ? (
          <p style={{ color: "#6B6774" }}>No contracts yet. Accept a proposal to start one.</p>
        ) : (
          <div className="space-y-3">
            {contracts.map((contract) => {
              const isClient = contract.clientName !== null;
              const counterparty = isClient ? contract.freelancerName : contract.clientName;
              return (
                <div
                  key={contract.id}
                  className="rounded-lg p-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{contract.jobTitle}</h3>
                        <span className="rounded-full px-3 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: contract.status === "ACTIVE" ? "rgba(10, 255, 181, 0.15)" : contract.status === "COMPLETED" ? "rgba(48, 128, 255, 0.15)" : "rgba(251, 44, 54, 0.15)",
                            color: contract.status === "ACTIVE" ? "#0AFFB5" : contract.status === "COMPLETED" ? "#3080ff" : "#fb2c36",
                          }}
                        >
                          {contract.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm" style={{ color: "#6B6774" }}>
                        <span>
                          {isClient ? "Hired" : "Working for"}: {counterparty ?? "Unknown"}
                        </span>
                        <span>•</span>
                        <span>Started {new Date(contract.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold" style={{ color: "#0AFFB5" }}>
                        ${contract.amount.toLocaleString()}
                      </p>
                      {contract.status === "ACTIVE" && isClient && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => handleRelease(contract.id)}
                            disabled={actionId === contract.id}
                            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
                            style={{ backgroundColor: "#0AFFB5" }}
                          >
                            {actionId === contract.id ? "..." : "Release Payment"}
                          </button>
                          <button
                            onClick={() => handleRefund(contract.id)}
                            disabled={actionId === contract.id}
                            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
                            style={{ backgroundColor: "#fb2c36" }}
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
