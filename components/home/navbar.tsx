"use client";

import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeNavbar() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav) return;

    ScrollTrigger.create({
      start: "top -60px",
      onEnter: () => nav.classList.add("solid"),
      onLeaveBack: () => nav.classList.remove("solid"),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav id="nav">
      <a href="#" className="nav-logo">
        Decntrl<em>ance</em>
      </a>
      <ul className="nav-links">
        <li>
          <a href="#features" onClick={scrollTo("#features")}>
            Features
          </a>
        </li>
        <li>
          <a href="#how-it-works" onClick={scrollTo("#how-it-works")}>
            How It Works
          </a>
        </li>
        <li>
          <a href="#ecosystem" onClick={scrollTo("#ecosystem")}>
            Ecosystem
          </a>
        </li>
        <li>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/wallet">
            Wallet
          </Link>
        </li>
      </ul>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
}
