"use client";

import CanvasNetwork from "./canvas-network";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />
      <CanvasNetwork />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Web3 Freelance Protocol · Mainnet Live
        </div>
        <h1 className="hero-title">
          <span className="line">
            <span className="word">Work</span>
          </span>
          <span className="line">
            <span className="word mint">Without</span>
          </span>
          <span className="line">
            <span className="word">Borders.</span>
          </span>
        </h1>
        <p className="hero-sub">
          The first truly decentralized freelance platform. Smart contracts,
          zero intermediaries, instant global payments — all on-chain.
        </p>
        <div className="hero-actions">
          <a href="#" className="btn-fill">
            Start Earning
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#features" className="btn-ghost">
            Explore Features
          </a>
        </div>
      </div>
      <div className="hero-scroll" id="heroScroll">
        <span>Scroll</span>
        <div className="scroll-bar" />
      </div>
    </section>
  );
}
