"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getWalletData } from "../../actions/dashboard";
import type { WalletData } from "../../types";

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getWalletData(address).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [address]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Connect your wallet to view your balance.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Loading wallet...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">No wallet data found. Create a profile first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">Wallet</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Available Balance</p>
            <h3 className="mt-3 text-4xl font-bold text-emerald-400">
              ${data.balance.toLocaleString()}
            </h3>
            <p className="mt-2 text-xs text-zinc-500">Transferable</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">In Escrow</p>
            <h3 className="mt-3 text-4xl font-bold text-blue-400">
              ${data.escrowBalance.toLocaleString()}
            </h3>
            <p className="mt-2 text-xs text-zinc-500">Locked in active contracts</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Pending Payouts</p>
            <h3 className="mt-3 text-4xl font-bold text-amber-400">
              ${data.pendingPayouts.toLocaleString()}
            </h3>
            <p className="mt-2 text-xs text-zinc-500">You owe as client</p>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-purple-300">Total Assets</p>
            <h3 className="mt-3 text-4xl font-bold text-white">
              ${data.totalAssets.toLocaleString()}
            </h3>
            <p className="mt-2 text-xs text-purple-400/70">Balance + Escrow</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
          {data.transactions.length === 0 ? (
            <p className="text-zinc-500 text-sm">No transactions yet.</p>
          ) : (
            <div className="space-y-3">
              {data.transactions.map((tx: import("../../types").TransactionItem) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold ${
                        tx.type === "DEPOSIT"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : tx.type === "WITHDRAWAL"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {tx.type === "DEPOSIT" ? "+" : tx.type === "WITHDRAWAL" ? "-" : "~"}
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">{tx.type.toLowerCase()}</p>
                      {tx.description && (
                        <p className="text-xs text-zinc-500">{tx.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${
                        tx.type === "DEPOSIT"
                          ? "text-emerald-400"
                          : tx.type === "WITHDRAWAL"
                          ? "text-red-400"
                          : "text-zinc-300"
                      }`}
                    >
                      {tx.type === "DEPOSIT" ? "+" : tx.type === "WITHDRAWAL" ? "-" : ""}${" "}
                      {tx.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-600">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
