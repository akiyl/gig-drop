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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#04040A", color: "#EAE6DF" }}>
        <p style={{ color: "#6B6774" }}>Connect your wallet to deploy the contract.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#04040A", color: "#EAE6DF" }}>
      <div className="mx-auto max-w-xl px-6 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-2">Deploy GigDrop Contract</h1>
        <p className="mb-8" style={{ color: "#6B6774" }}>
          Deploy the GigDrop smart contract to Sepolia. This will cost a small gas fee.
        </p>

        {contractAddr ? (
          <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(10, 255, 181, 0.1)", border: "1px solid rgba(10, 255, 181, 0.3)" }}>
            <p className="font-semibold mb-2" style={{ color: "#0AFFB5" }}>Deployed!</p>
            <p className="text-sm break-all" style={{ color: "#EAE6DF" }}>{contractAddr}</p>
            <p className="text-xs mt-2" style={{ color: "#6B6774" }}>Saved locally. You can now post jobs.</p>
          </div>
        ) : (
          <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}>
            <p className="text-sm mb-4" style={{ color: "#6B6774" }}>
              Connected as{" "}
              <span className="font-mono" style={{ color: "#EAE6DF" }}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </p>
            <button
              onClick={handleDeploy}
              disabled={deploying}
              className="w-full rounded-xl px-6 py-3 font-semibold transition disabled:opacity-50"
              style={{ backgroundColor: "#fe6e00", color: "#ffffff" }}
            >
              {deploying ? "Deploying..." : "Deploy Contract"}
            </button>
            {error && <p className="mt-4 text-sm" style={{ color: "#fb2c36" }}>{error}</p>}
          </div>
        )}

        <div className="mt-6 rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}>
          <h2 className="text-sm font-semibold mb-2" style={{ color: "#EAE6DF" }}>What this does</h2>
          <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: "#6B6774" }}>
            <li>
              Deploys a <span style={{ color: "#EAE6DF" }}>GigDrop</span> contract to Sepolia
            </li>
            <li>
              Job posters must pay <span style={{ color: "#EAE6DF" }}>0.00001 ETH</span> to create a
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
