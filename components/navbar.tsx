"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (
      path === "/dashboard/wallet" &&
      pathname.startsWith("/dashboard/wallet")
    )
      return true;
    return path !== "/dashboard" && pathname.startsWith(path);
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.70)",
        borderColor: "rgba(255, 255, 255, 0.10)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ backgroundColor: "#fe6e00" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Decentra<span style={{ color: "#fe6e00" }}>Lance</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm">
          {pathname === "/" && (
            <>
              <a
                href="#features"
                className="rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white transition"
              >
                Features
              </a>
              <a
                href="#how"
                className="rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white transition"
              >
                How It Works
              </a>
            </>
          )}
          {[
            { href: "/jobs", label: "Jobs" },
            { href: "/freelancers", label: "Freelancers" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/dashboard/wallet", label: "Wallet" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive(href)
                  ? "text-white"
                  : "text-white/70 hover:bg-primary/20 hover:text-white"
              }`}
              style={{
                backgroundColor: isActive(href) ? "#fe6e00" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center">
          <div
            className="[&_.iekbcc0]:!bg-transparent  [&_.iekbcc0]:!text-white [&_.iekbcc0]:!transition [&_.iekbcc0]:hover:!bg-white/10"
            style={{ borderColor: "rgba(255, 255, 255, 0.10)" }}
          >
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
