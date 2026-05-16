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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#04040A", color: "#EAE6DF" }}>
        <p style={{ color: "#6B6774" }}>Connect your wallet to test payments.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#04040A", color: "#EAE6DF" }}>
      <div className="mx-auto max-w-xl px-6 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-2">Test Payments</h1>
        <p className="mb-8" style={{ color: "#6B6774" }}>
          Simulate deposits and withdrawals to test the wallet flow.
        </p>

        <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}>
          <label className="block text-sm mb-2" style={{ color: "#6B6774" }}>Amount ($)</label>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00] mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#EAE6DF", border: "1px solid rgba(255,255,255,0.055)" }}
          />

          <div className="flex gap-3">
            <button
              onClick={handleDeposit}
              disabled={loading || !amount}
              className="flex-1 rounded-xl px-6 py-3 font-semibold transition disabled:opacity-50"
              style={{ backgroundColor: "#0AFFB5", color: "#04040A" }}
            >
              {loading ? "Processing..." : "Deposit"}
            </button>
            <button
              onClick={handleWithdraw}
              disabled={loading || !amount}
              className="flex-1 rounded-xl px-6 py-3 font-semibold transition disabled:opacity-50"
              style={{ backgroundColor: "#fb2c36", color: "#ffffff" }}
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          </div>

          {result && (
            <p
              className="mt-4 text-sm"
              style={{ color: result.ok ? "#0AFFB5" : "#fb2c36" }}
            >
              {result.msg}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "#EAE6DF" }}>Quick Fill</h2>
          <div className="flex flex-wrap gap-2">
            {[100, 500, 1000, 5000].map((n: number) => (
              <button
                key={n}
                onClick={() => setAmount(String(n))}
                className="rounded-lg px-4 py-2 text-sm transition"
                style={{ backgroundColor: "#04040A", color: "#6B6774", border: "1px solid rgba(255,255,255,0.055)" }}
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
