"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getWalletData } from "../../actions/dashboard";
import { transferFunds } from "../../actions/payment";
import type { WalletData } from "../../types";

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSend, setShowSend] = useState(false);
  const [sendAddr, setSendAddr] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ ok: boolean; msg: string } | null>(null);

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

  async function handleSend() {
    if (!address || !sendAddr || !sendAmount) return;
    setSending(true);
    setSendResult(null);
    try {
      await transferFunds(address, sendAddr, Number(sendAmount));
      setSendResult({ ok: true, msg: `Sent $${sendAmount} successfully` });
      setSendAddr("");
      setSendAmount("");
      setShowSend(false);
      const refreshed = await getWalletData(address);
      setData(refreshed);
    } catch (e: any) {
      setSendResult({ ok: false, msg: e.message ?? "Failed" });
    } finally {
      setSending(false);
    }
  }

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

  function getTxStyles(type: string) {
    switch (type) {
      case "DEPOSIT":
        return { bg: "bg-emerald-500/20 text-emerald-400", prefix: "+" };
      case "WITHDRAWAL":
        return { bg: "bg-red-500/20 text-red-400", prefix: "-" };
      case "TRANSFER":
        return { bg: "bg-blue-500/20 text-blue-400", prefix: "~" };
      case "REFUND":
        return { bg: "bg-amber-500/20 text-amber-400", prefix: "+" };
      default:
        return { bg: "bg-zinc-500/20 text-zinc-400", prefix: "" };
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold">Wallet</h1>
          <button
            onClick={() => setShowSend(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition"
          >
            Send Funds
          </button>
        </div>

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
              {data.transactions.map((tx) => {
                const styles = getTxStyles(tx.type);
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold ${styles.bg}`}
                      >
                        {styles.prefix}
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {tx.type === "TRANSFER"
                            ? (Number(tx.amount) >= 0
                                ? tx.description?.startsWith("Sent")
                                  ? "Sent"
                                  : "Received"
                                : "Transfer")
                            : tx.type.toLowerCase()}
                        </p>
                        {tx.description && (
                          <p className="text-xs text-zinc-500">{tx.description}</p>
                        )}
                        {tx.counterpartyName && (
                          <p className="text-xs text-zinc-600 mt-0.5">
                            {tx.counterpartyName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${
                          tx.type === "DEPOSIT" || tx.type === "REFUND"
                            ? "text-emerald-400"
                            : tx.type === "WITHDRAWAL"
                            ? "text-red-400"
                            : tx.description?.startsWith("Sent")
                            ? "text-red-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {tx.type === "DEPOSIT" || tx.type === "REFUND"
                          ? "+"
                          : tx.type === "WITHDRAWAL"
                          ? "-"
                          : tx.description?.startsWith("Sent")
                          ? "-"
                          : "+"}$
                        {tx.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-zinc-600">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showSend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-2">Send Funds</h2>
            <p className="text-sm text-zinc-500 mb-4">Transfer to another user on GigDrop.</p>
            <p className="text-xs text-amber-400/80 mb-6">Recipient must have a profile on GigDrop to receive funds.</p>

            <label className="block text-sm text-zinc-400 mb-1">Recipient Wallet Address</label>
            <input
              value={sendAddr}
              onChange={(e) => setSendAddr(e.target.value)}
              placeholder="0x..."
              className="w-full rounded-xl border border-white/10 bg-black p-4 text-white focus:outline-none focus:border-blue-500 mb-4 font-mono text-sm"
            />

            <label className="block text-sm text-zinc-400 mb-1">Amount ($)</label>
            <input
              type="number"
              min={1}
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full rounded-xl border border-white/10 bg-black p-4 text-white focus:outline-none focus:border-blue-500 mb-4"
            />

            {sendResult && (
              <p className={`mb-4 text-sm ${sendResult.ok ? "text-emerald-400" : "text-red-400"}`}>
                {sendResult.msg}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowSend(false); setSendResult(null); }}
                className="flex-1 rounded-xl border border-white/10 px-6 py-3 font-semibold hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sending || !sendAddr || !sendAmount}
                className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
