"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { getProfile, createOrUpdateProfile } from "../../actions/profile";
import type { UserProfile } from "@/app/types";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!address) return;
    getProfile(address).then(setProfile);
  }, [address]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    setMessage("");

    const form = new FormData(e.currentTarget);
    try {
      await createOrUpdateProfile({
        walletAddress: address,
        username: form.get("username") as string,
        name: form.get("name") as string,
        bio: form.get("bio") as string,
        role: form.get("role") as "CLIENT" | "FREELANCER",
        skills: form.get("skills") as string,
        hourlyRate: Number(form.get("hourlyRate")),
      });
      router.push("/dashboard");
    } catch (err: any) {
      setMessage(err.message ?? "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fcfaf7", color: "#423d38" }}>
        <p style={{ color: "#797067" }}>Connect your wallet to create a profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fcfaf7", color: "#423d38" }}>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">
          {profile ? "Edit Profile" : "Create Profile"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: "#797067" }}>Username</label>
              <input
                name="username"
                defaultValue={profile?.username ?? ""}
                required
                className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00]"
                style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: "#797067" }}>Display Name</label>
              <input
                name="name"
                defaultValue={profile?.name ?? ""}
                className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00]"
                style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#797067" }}>Bio</label>
            <textarea
              name="bio"
              defaultValue={profile?.bio ?? ""}
              rows={4}
              className="w-full rounded-xl p-4 placeholder-zinc-500 focus:outline-none focus:border-[#fe6e00]"
              style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
              placeholder="Tell clients about yourself..."
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#797067" }}>I want to</label>
            <select
              name="role"
              defaultValue={profile?.role ?? "FREELANCER"}
              className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00]"
              style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
            >
              <option value="FREELANCER" className="text-zinc-900">Find Work (Freelancer)</option>
              <option value="CLIENT" className="text-zinc-900">Hire Talent (Client)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#797067" }}>Skills (comma-separated)</label>
            <input
              name="skills"
              defaultValue={profile?.skills ?? ""}
              className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00]"
              style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
              placeholder="Solidity, React, TypeScript"
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#797067" }}>Hourly Rate ($)</label>
            <input
              name="hourlyRate"
              type="number"
              defaultValue={profile?.hourlyRate ?? ""}
              min={0}
              className="w-full rounded-xl p-4 focus:outline-none focus:border-[#fe6e00]"
              style={{ backgroundColor: "#f3f4f6", color: "#423d38", border: "1px solid #e3e0dd" }}
              placeholder="50"
            />
          </div>
          {message && (
            <p className="text-sm" style={{ color: message === "Profile saved!" ? "#00c758" : "#fb2c36" }}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-6 py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
            style={{ backgroundColor: "#ffffff", color: "#423d38", border: "1px solid #e3e0dd" }}
          >
            {loading ? "Saving..." : profile ? "Update Profile" : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
