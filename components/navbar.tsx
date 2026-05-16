"use client";

import { useState, useEffect, useCallback } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const close = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen, close]);

  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add("solid");
      } else {
        nav.classList.remove("solid");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path === "/dashboard/wallet" && pathname.startsWith("/dashboard/wallet")) return true;
    return path !== "/dashboard" && pathname.startsWith(path);
  };

  const links = [
    { href: "/jobs", label: "Jobs" },
    { href: "/freelancers", label: "Freelancers" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/wallet", label: "Wallet" },
  ];

  return (
    <nav id="nav">
      <Link href="/" className="nav-logo">
        Decntrl<em>ance</em>
      </Link>

      <ul className="nav-links hidden md:flex">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={isActive(href) ? "active" : ""}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <div
          className="[&_.iekbcc0]:!bg-transparent [&_.iekbcc0]:!text-white [&_.iekbcc0]:!transition [&_.iekbcc0]:hover:!bg-white/10"
          style={{ borderColor: "rgba(255, 255, 255, 0.10)" }}
        >
          <ConnectButton />
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex items-center justify-center rounded-md p-2 text-white/70 hover:text-white hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={close} />
          <div
            className="md:hidden absolute left-0 right-0 top-full z-50 border-t px-4 pb-4 pt-2 backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(4, 4, 10, 0.95)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <div className="flex flex-col gap-1">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive(href) ? "text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                  style={{ backgroundColor: isActive(href) ? "#fe6e00" : "transparent" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
