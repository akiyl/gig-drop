"use client";

import { useState } from "react";
import { useAccount, useDeployContract } from "wagmi";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { GIG_DROP_ABI, GIG_DROP_BYTECODE, setContractAddress } from "@/lib/contract";

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export default function DeployPage() {
  const { address, isConnected } = useAccount();
  const { deployContractAsync } = useDeployContract();
  const [deploying, setDeploying] = useState(false);
  const [contractAddr, setContractAddr_] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleDeploy() {
    if (!address) return;
    setDeploying(true);
    setError("");

    try {
      const hash = await deployContractAsync({
        abi: GIG_DROP_ABI,
        bytecode: GIG_DROP_BYTECODE as `0x${string}`,
        args: [],
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      if (receipt.contractAddress) {
        setContractAddress(receipt.contractAddress);
        setContractAddr_(receipt.contractAddress);
      }
    } catch (e: any) {
      setError(e.message ?? "Deployment failed");
    } finally {
      setDeploying(false);
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Connect your wallet to deploy the contract.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Deploy GigDrop Contract</h1>
        <p className="text-zinc-500 mb-8">
          Deploy the GigDrop smart contract to Sepolia. This will cost a small gas fee.
        </p>

        {contractAddr ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-xl">
            <p className="text-emerald-400 font-semibold mb-2">Deployed!</p>
            <p className="text-sm text-zinc-300 break-all">{contractAddr}</p>
            <p className="text-xs text-zinc-500 mt-2">Saved locally. You can now post jobs.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400 mb-4">
              Connected as{" "}
              <span className="text-white font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </p>
            <button
              onClick={handleDeploy}
              disabled={deploying}
              className="w-full rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-500 transition disabled:opacity-50"
            >
              {deploying ? "Deploying..." : "Deploy Contract"}
            </button>
            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-sm font-semibold text-zinc-300 mb-2">What this does</h2>
          <ul className="text-sm text-zinc-500 space-y-1 list-disc list-inside">
            <li>
              Deploys a <span className="text-zinc-300">GigDrop</span> contract to Sepolia
            </li>
            <li>
              Job posters must pay <span className="text-zinc-300">0.00001 ETH</span> to create a
              job
            </li>
            <li>Contract owner can withdraw accumulated fees</li>
            <li>All fees go to the contract, not to any wallet</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
