"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const features = [
  {
    num: "01",
    title: "Smart Contract Escrow",
    desc: "Funds are locked in self-executing contracts. Payment releases the moment milestones are verified on-chain — no disputes, zero delays.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Global Talent Pool",
    desc: "Access 50,000+ vetted freelancers across 120 countries. No geographic restrictions, no currency nightmares — pure talent, borderless.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Instant Crypto Payments",
    desc: "Get paid in ETH, USDC, MATIC, or 20+ tokens. Settle in seconds, not business days. Your earnings, your wallet, your rules.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "NFT Reputation System",
    desc: "Your work history is minted as soul-bound NFTs — portable, verifiable, and tamper-proof. Build a reputation that follows you everywhere.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "DAO Governance",
    desc: "Token holders vote on fees, dispute resolution, and protocol upgrades. This platform is owned by its community — including you.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Zero Platform Fees",
    desc: "Keep 100% of what you earn. Gas fees only — no subscription, no service charge, no hidden cuts. What you negotiate is exactly what you get.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateY: x * 6,
        rotateX: -y * 6,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="feat-card reveal" ref={cardRef}>
      <span className="feat-num">{feature.num}</span>
      <div className="feat-icon">{feature.icon}</div>
      <h3 className="feat-title">{feature.title}</h3>
      <p className="feat-desc">{feature.desc}</p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="section">
      <div className="feat-header">
        <div>
          <div className="sec-label reveal">Platform Features</div>
          <h2 className="sec-title reveal">
            Built for the
            <br />
            decentralized
            <br />
            economy.
          </h2>
        </div>
        <p className="sec-sub reveal">
          Everything you need to freelance or hire globally — without banks,
          borders, or middlemen taking their cut.
        </p>
      </div>
      <div className="feat-grid">
        {features.map((feature, i) => (
          <FeatureCard key={feature.num} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
