"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Decentra<span className="text-purple-400">Lance</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
          {pathname === "/" && (
            <>
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#how" className="hover:text-white transition">How It Works</a>
            </>
          )}
          <Link href="/jobs" className="hover:text-white transition">Jobs</Link>
          <Link href="/freelancers" className="hover:text-white transition">Freelancers</Link>
          <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
          <Link href="/dashboard/wallet" className="hover:text-white transition">Wallet</Link>
        </div>

        <ConnectButton />
      </div>
    </nav>
  );
}
