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
      setMessage("Profile saved!");
      router.refresh();
    } catch (err: any) {
      setMessage(err.message ?? "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Connect your wallet to create a profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">
          {profile ? "Edit Profile" : "Create Profile"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Username</label>
              <input
                name="username"
                defaultValue={profile?.username ?? ""}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Display Name</label>
              <input
                name="name"
                defaultValue={profile?.name ?? ""}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Bio</label>
            <textarea
              name="bio"
              defaultValue={profile?.bio ?? ""}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              placeholder="Tell clients about yourself..."
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">I want to</label>
            <select
              name="role"
              defaultValue={profile?.role ?? "FREELANCER"}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="FREELANCER">Find Work (Freelancer)</option>
              <option value="CLIENT">Hire Talent (Client)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Skills (comma-separated)</label>
            <input
              name="skills"
              defaultValue={profile?.skills ?? ""}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:outline-none focus:border-purple-500"
              placeholder="Solidity, React, TypeScript"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Hourly Rate ($)</label>
            <input
              name="hourlyRate"
              type="number"
              defaultValue={profile?.hourlyRate ?? ""}
              min={0}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:outline-none focus:border-purple-500"
              placeholder="50"
            />
          </div>
          {message && (
            <p className={`text-sm ${message === "Profile saved!" ? "text-emerald-400" : "text-red-400"}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : profile ? "Update Profile" : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
