"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    tag: "STEP ONE",
    title: "Connect & Create",
    desc: "Connect your wallet. Your on-chain address becomes your identity. Add skills, portfolio, and set your rates.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    num: "02",
    tag: "STEP TWO",
    title: "Find or Post Work",
    desc: "Browse thousands of projects or post your own job. Filter by skill, budget, and preferred chain.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: "03",
    tag: "STEP THREE",
    title: "Contract Deployed",
    desc: "Agree on scope and price. A smart contract is auto-deployed, funds escrowed. Both parties sign on-chain.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    num: "04",
    tag: "STEP FOUR",
    title: "Deliver & Get Paid",
    desc: "Submit work, client approves, payment releases instantly. NFT credential minted. All transparent on-chain.",
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const trigger = ScrollTrigger.create({
      trigger: "#how-it-works",
      start: "top 70%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(line, {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="how-it-works" className="section hiw-section">
      <div className="hiw-header">
        <div className="sec-label">Process</div>
        <h2 className="sec-title" style={{ marginBottom: "1rem" }}>
          Four steps to
          <br />
          getting paid.
        </h2>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--ink2)",
            lineHeight: 1.75,
          }}
        >
          From profile creation to crypto payout — the entire flow is on-chain,
          trustless, and transparent.
        </p>
      </div>
      <div className="hiw-steps">
        <div
          className="hiw-connector"
          ref={lineRef}
          style={{ transform: "scaleX(0)" }}
        />
        {steps.map((step) => (
          <div key={step.num} className="hiw-step reveal">
            <div className="step-disc">
              {step.num}
              <div className="step-dot">
                <svg viewBox="0 0 24 24">{step.icon.props.children}</svg>
              </div>
            </div>
            <div className="step-tag">{step.tag}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
