"use client";

import { useEffect, useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { getWalletData } from "../../actions/dashboard";
import { getOnChainTransactions } from "../../actions/onchain";
import { transferFunds } from "../../actions/payment";
import type { WalletData, OnChainTransaction } from "../../types";

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSend, setShowSend] = useState(false);
  const [sendAddr, setSendAddr] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [sendMode, setSendMode] = useState<"internal" | "onchain">("internal");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txTab, setTxTab] = useState<"internal" | "onchain">("internal");
  const [onchainTxs, setOnchainTxs] = useState<OnChainTransaction[]>([]);
  const [onchainLoading, setOnchainLoading] = useState(false);
  const { sendTransactionAsync } = useSendTransaction();

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

  useEffect(() => {
    if (!address) return;
    setOnchainLoading(true);
    getOnChainTransactions(address).then((res) => {
      setOnchainTxs(res);
      setOnchainLoading(false);
    });
  }, [address]);

  async function handleSend() {
    if (!address || !sendAddr || !sendAmount) return;
    setSending(true);
    setSendResult(null);
    setTxHash(null);
    try {
      if (sendMode === "onchain") {
        const hash = await sendTransactionAsync({
          to: sendAddr as `0x${string}`,
          value: parseEther(sendAmount),
        });
        setTxHash(hash);
        setSendResult({ ok: true, msg: `Sent ${sendAmount} ETH successfully!` });
        setSendAddr("");
        setSendAmount("");
      } else {
        await transferFunds(address, sendAddr, Number(sendAmount));
        setSendResult({ ok: true, msg: `Sent $${sendAmount} successfully` });
        setSendAddr("");
        setSendAmount("");
        setShowSend(false);
        const refreshed = await getWalletData(address);
        setData(refreshed);
      }
    } catch (e: any) {
      setSendResult({ ok: false, msg: e.message ?? "Failed" });
    } finally {
      setSending(false);
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#04040A" }}>
        <p style={{ color: "#6B6774" }}>Connect your wallet to view your balance.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#04040A" }}>
        <p style={{ color: "#6B6774" }}>Loading wallet...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#04040A" }}>
        <p style={{ color: "#6B6774" }}>No wallet data found. Create a profile first.</p>
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
    <div className="min-h-screen" style={{ backgroundColor: "#04040A", color: "#EAE6DF" }}>
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">Wallet</h1>
          <button
            onClick={() => setShowSend(true)}
            className="rounded-md px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: "#fe6e00" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
            Send Funds
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-lg p-6" style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}>
            <p className="text-sm" style={{ color: "#6B6774" }}>Available Balance</p>
            <h3 className="mt-3 text-2xl md:text-4xl font-bold" style={{ color: "#0AFFB5" }}>
              ${data.balance.toLocaleString()}
            </h3>
            <p className="mt-2 text-xs" style={{ color: "#6B6774" }}>Transferable</p>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}>
            <p className="text-sm" style={{ color: "#6B6774" }}>In Escrow</p>
            <h3 className="mt-3 text-2xl md:text-4xl font-bold" style={{ color: "#3080ff" }}>
              ${data.escrowBalance.toLocaleString()}
            </h3>
            <p className="mt-2 text-xs" style={{ color: "#6B6774" }}>Locked in active contracts</p>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}>
            <p className="text-sm" style={{ color: "#6B6774" }}>Pending Payouts</p>
            <h3 className="mt-3 text-2xl md:text-4xl font-bold" style={{ color: "#FFB020" }}>
              ${data.pendingPayouts.toLocaleString()}
            </h3>
            <p className="mt-2 text-xs" style={{ color: "#6B6774" }}>You owe as client</p>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: "rgba(254, 110, 0, 0.08)" }}>
            <p className="text-sm" style={{ color: "#fe6e00" }}>Total Assets</p>
            <h3 className="mt-3 text-2xl md:text-4xl font-bold" style={{ color: "#EAE6DF" }}>
              ${data.totalAssets.toLocaleString()}
            </h3>
            <p className="mt-2 text-xs" style={{ color: "rgba(254, 110, 0, 0.60)" }}>Balance + Escrow</p>
          </div>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <div className="flex rounded-lg p-0.5" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => setTxTab("internal")}
                className="rounded-md px-3 py-1.5 text-xs font-semibold transition"
                style={{
                  backgroundColor: txTab === "internal" ? "#fe6e00" : "transparent",
                  color: txTab === "internal" ? "#ffffff" : "#6B6774",
                }}
              >
                Internal
              </button>
              <button
                onClick={() => setTxTab("onchain")}
                className="rounded-md px-3 py-1.5 text-xs font-semibold transition"
                style={{
                  backgroundColor: txTab === "onchain" ? "#fe6e00" : "transparent",
                  color: txTab === "onchain" ? "#ffffff" : "#6B6774",
                }}
              >
                On-Chain
              </button>
            </div>
          </div>

          {txTab === "internal" ? (
            <>
              {data.transactions.length === 0 ? (
                <p className="text-sm" style={{ color: "#6B6774" }}>No transactions yet.</p>
              ) : (
                <div className="space-y-2">
                  {data.transactions.map((tx) => {
                    const styles = getTxStyles(tx.type);
                    return (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between rounded-lg p-4"
                        style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold ${styles.bg}`}
                          >
                            {styles.prefix}
                          </div>
                          <div>
                            <p className="text-sm font-medium capitalize" style={{ color: "#EAE6DF" }}>
                              {tx.type === "TRANSFER"
                                ? (Number(tx.amount) >= 0
                                    ? tx.description?.startsWith("Sent")
                                      ? "Sent"
                                      : "Received"
                                    : "Transfer")
                                : tx.type.toLowerCase()}
                            </p>
                            {tx.description && (
                              <p className="text-xs" style={{ color: "#6B6774" }}>{tx.description}</p>
                            )}
                            {tx.counterpartyName && (
                              <p className="text-xs mt-0.5" style={{ color: "#6B6774" }}>
                                {tx.counterpartyName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold"
                            style={{
                              color: tx.type === "DEPOSIT" || tx.type === "REFUND"
                                ? "#0AFFB5"
                                : tx.type === "WITHDRAWAL"
                                ? "#fb2c36"
                                : tx.description?.startsWith("Sent")
                                ? "#fb2c36"
                                : "#0AFFB5"
                            }}
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
                          <p className="text-xs" style={{ color: "#6B6774" }}>
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <>
              {onchainLoading ? (
                <p className="text-sm" style={{ color: "#6B6774" }}>Loading on-chain transactions...</p>
              ) : onchainTxs.length === 0 ? (
                <p className="text-sm" style={{ color: "#6B6774" }}>No on-chain transactions found.</p>
              ) : (
                <div className="space-y-2">
                  {onchainTxs.map((tx) => {
                    const valueEth = (Number(tx.value) / 1e18).toFixed(6);
                    const isOutgoing = tx.from.toLowerCase() === address?.toLowerCase();
                    const date = new Date(Number(tx.timeStamp) * 1000);
                    return (
                      <div
                        key={tx.hash}
                        className="flex items-center justify-between rounded-lg p-4"
                        style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div
                            className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                            style={{
                              backgroundColor: isOutgoing ? "rgba(251, 44, 54, 0.15)" : "rgba(10, 255, 181, 0.15)",
                              color: isOutgoing ? "#fb2c36" : "#0AFFB5",
                            }}
                          >
                            {isOutgoing ? "↑" : "↓"}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium" style={{ color: "#EAE6DF" }}>
                              {isOutgoing ? "Sent" : "Received"}
                            </p>
                            <p className="text-xs truncate max-w-[200px] sm:max-w-xs" style={{ color: "#6B6774" }}>
                              {isOutgoing
                                ? `To: ${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`
                                : `From: ${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`}
                            </p>
                            <a
                              href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs underline"
                              style={{ color: "#fe6e00" }}
                            >
                              {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                            </a>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <p className="text-sm font-semibold" style={{ color: isOutgoing ? "#fb2c36" : "#0AFFB5" }}>
                            {isOutgoing ? "-" : "+"}{valueEth} ETH
                          </p>
                          <p className="text-xs" style={{ color: "#6B6774" }}>
                            {date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showSend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}>
          <div className="w-full max-w-md rounded-lg p-6 shadow-lg" style={{ backgroundColor: "#0D0D18", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 20px 25px rgba(0,0,0,0.40), 0 8px 10px rgba(0,0,0,0.20)" }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#EAE6DF" }}>Send Funds</h2>

            <div className="flex rounded-lg p-1 mb-6" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => { setSendMode("internal"); setSendResult(null); }}
                className="flex-1 rounded-md py-2 text-sm font-semibold transition"
                style={{
                  backgroundColor: sendMode === "internal" ? "#fe6e00" : "transparent",
                  color: sendMode === "internal" ? "#ffffff" : "#6B6774",
                }}
              >
                Internal
              </button>
              <button
                onClick={() => { setSendMode("onchain"); setSendResult(null); }}
                className="flex-1 rounded-md py-2 text-sm font-semibold transition"
                style={{
                  backgroundColor: sendMode === "onchain" ? "#fe6e00" : "transparent",
                  color: sendMode === "onchain" ? "#ffffff" : "#6B6774",
                }}
              >
                On-Chain ETH
              </button>
            </div>

            {sendMode === "internal" ? (
              <p className="text-xs mb-4" style={{ color: "#FFB020" }}>Recipient must have a profile on GigDrop to receive funds.</p>
            ) : (
              <p className="text-xs mb-4" style={{ color: "#FFB020" }}>Sends real ETH from your connected wallet. Gas fees apply.</p>
            )}

            <label className="block text-sm mb-1" style={{ color: "#6B6774" }}>Recipient Wallet Address</label>
            <input
              value={sendAddr}
              onChange={(e) => setSendAddr(e.target.value)}
              placeholder="0x..."
              className="w-full rounded-md p-4 text-sm font-mono focus:outline-none mb-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "#EAE6DF",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#fe6e00"; e.currentTarget.style.outline = "none" }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)" }}
            />

            <label className="block text-sm mb-1" style={{ color: "#6B6774" }}>
              Amount {sendMode === "onchain" ? "(ETH)" : "($)"}
            </label>
            <input
              type="number"
              min={0}
              step={sendMode === "onchain" ? "0.0001" : "1"}
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              placeholder={sendMode === "onchain" ? "0.00" : "Enter amount..."}
              className="w-full rounded-md p-4 text-sm focus:outline-none mb-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "#EAE6DF",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#fe6e00"; e.currentTarget.style.outline = "none" }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)" }}
            />

            {sendResult && (
              <div className="mb-4">
                <p className="text-sm" style={{ color: sendResult.ok ? "#0AFFB5" : "#fb2c36" }}>
                  {sendResult.msg}
                </p>
                {txHash && (
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs underline"
                    style={{ color: "#fe6e00" }}
                  >
                    View on Etherscan
                  </a>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowSend(false); setSendResult(null); setTxHash(null); setSendAddr(""); setSendAmount(""); }}
                className="flex-1 rounded-md px-6 py-3 font-semibold transition"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#EAE6DF",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sending || !sendAddr || !sendAmount}
                className="flex-1 rounded-md px-6 py-3 font-semibold text-white transition disabled:opacity-50"
                style={{ backgroundColor: "#fe6e00" }}
              >
                {sending ? "Sending..." : sendMode === "onchain" ? "Send ETH" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
