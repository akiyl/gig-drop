const checks = [
  {
    title: "Non-custodial by design",
    sub: "We never hold your funds. Smart contracts do — provably and permissionlessly.",
  },
  {
    title: "Audited smart contracts",
    sub: "All contracts audited by Certik and Quantstamp. Reports published on-chain.",
  },
  {
    title: "Open source protocol",
    sub: "Full codebase lives on GitHub. Fork it, build on it, contribute to it.",
  },
];

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="section">
      <div className="eco-grid">
        <div>
          <div className="sec-label reveal-left">Ecosystem</div>
          <h2
            className="sec-title reveal-left"
            style={{ marginBottom: "1.25rem" }}
          >
            Trusted by
            <br />
            builders of
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#0AFFB5,#0CCBFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Web3.
            </span>
          </h2>
          <p className="sec-sub reveal-left" style={{ marginBottom: 0 }}>
            Join developers, designers, writers, and operators who&apos;ve moved
            from legacy platforms to a truly decentralized alternative.
          </p>
          <div className="eco-checks">
            {checks.map((check) => (
              <div key={check.title} className="eco-check reveal-left">
                <div className="check-icon">
                  <svg viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="check-title">{check.title}</div>
                  <div className="check-sub">{check.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="tcard-wrap reveal-right">
          <div className="tcard">
            <div className="tcard-header">
              <div className="tcard-avatar" />
              <div>
                <div className="tcard-name">Priya Sharma</div>
                <div className="tcard-role">
                  Smart Contract Dev · Mumbai, India
                </div>
              </div>
            </div>
            <p className="tcard-quote">
              &ldquo;Switched from Upwork last year.{" "}
              <strong>Kept 100% of my earnings</strong> and landed 3× the
              clients through Decentrlance&apos;s on-chain reputation system.
              I&apos;ll never go back.&rdquo;
            </p>
            <div className="stars">★★★★★</div>
          </div>
          <div className="float-pill top-right">
            <div className="pill-num">$12.4K</div>
            <div className="pill-lbl">Earned this month</div>
          </div>
          <div className="float-pill bot-left">
            <div className="pill-dot">
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                Contract verified
              </div>
              <div style={{ fontSize: "0.6875rem", color: "var(--ink2)" }}>
                On-chain · 2 mins ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
