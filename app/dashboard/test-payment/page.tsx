"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { testDeposit, testWithdraw } from "../../actions/test-payment";

export default function TestPaymentPage() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  async function handleDeposit() {
    if (!address || !amount) return;
    setLoading(true);
    setResult(null);
    try {
      await testDeposit(address, Number(amount));
      setResult({ ok: true, msg: `Deposited $${amount} successfully` });
      setAmount("");
    } catch (e: any) {
      setResult({ ok: false, msg: e.message ?? "Failed" });
    } finally {
      setLoading(false);
    }
  }

  async function handleWithdraw() {
    if (!address || !amount) return;
    setLoading(true);
    setResult(null);
    try {
      await testWithdraw(address, Number(amount));
      setResult({ ok: true, msg: `Withdrew $${amount} successfully` });
      setAmount("");
    } catch (e: any) {
      setResult({ ok: false, msg: e.message ?? "Failed" });
    } finally {
      setLoading(false);
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Connect your wallet to test payments.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Test Payments</h1>
        <p className="text-zinc-500 mb-8">
          Simulate deposits and withdrawals to test the wallet flow.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <label className="block text-sm text-zinc-400 mb-2">Amount ($)</label>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className="w-full rounded-xl border border-white/10 bg-black p-4 text-white focus:outline-none focus:border-purple-500 mb-4"
          />

          <div className="flex gap-3">
            <button
              onClick={handleDeposit}
              disabled={loading || !amount}
              className="flex-1 rounded-xl bg-emerald-600 px-6 py-3 font-semibold hover:bg-emerald-500 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Deposit"}
            </button>
            <button
              onClick={handleWithdraw}
              disabled={loading || !amount}
              className="flex-1 rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-500 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          </div>

          {result && (
            <p
              className={`mt-4 text-sm ${
                result.ok ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {result.msg}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-sm font-semibold text-zinc-300 mb-3">Quick Fill</h2>
          <div className="flex flex-wrap gap-2">
            {[100, 500, 1000, 5000].map((n: number) => (
              <button
                key={n}
                onClick={() => setAmount(String(n))}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/10 transition"
              >
                ${n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
