export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fcfaf7", color: "#423d38" }}>
      {/* Hero Section */}
      <section className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div
          className="inline-flex items-center rounded-full px-4 py-2 text-sm"
          style={{
            backgroundColor: "#f3f4f6",
            color: "#797067",
          }}
        >
          Web3 Freelancing Marketplace
        </div>

        <h1 className="mt-8 max-w-5xl text-5xl font-bold leading-tight tracking-tight md:text-7xl" style={{ color: "#423d38" }}>
          Hire & Work{" "}
          <span style={{ color: "#fe6e00" }}>
            Securely On-Chain
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "#797067" }}>
          A decentralized freelance marketplace powered by smart contracts,
          crypto escrow, and transparent reputation systems.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/jobs"
            className="inline-block rounded-lg px-8 py-4 font-semibold text-center transition hover:opacity-90"
            style={{ backgroundColor: "#fe6e00", color: "#ffffff" }}
          >
            Explore Jobs
          </a>

          <a
            href="/dashboard/profile"
            className="inline-block rounded-lg px-8 py-4 font-semibold text-center transition hover:opacity-90"
            style={{
              backgroundColor: "#ffffff",
              color: "#423d38",
              border: "1px solid #e3e0dd",
            }}
          >
            Become a Freelancer
          </a>
        </div>

        {/* Dashboard Preview */}
        <div
          className="mt-20 w-full max-w-6xl rounded-xl p-4"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e3e0dd",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          <div
            className="rounded-lg p-6"
            style={{ backgroundColor: "#f3f4f6" }}
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <div
                className="rounded-lg p-6"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e3e0dd",
                }}
              >
                <p className="text-sm" style={{ color: "#797067" }}>Escrow Balance</p>
                <h3 className="mt-3 text-4xl font-bold" style={{ color: "#fe6e00" }}>4.2 ETH</h3>
                <div className="mt-6 h-2 rounded-full" style={{ backgroundColor: "#edebe9" }}>
                  <div
                    className="h-2 w-2/3 rounded-full"
                    style={{ backgroundColor: "#fe6e00" }}
                  />
                </div>
              </div>

              <div
                className="rounded-lg p-6"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e3e0dd",
                }}
              >
                <p className="text-sm" style={{ color: "#797067" }}>Completed Projects</p>
                <h3 className="mt-3 text-4xl font-bold" style={{ color: "#423d38" }}>126</h3>
                <p className="mt-4 text-sm" style={{ color: "#00c758" }}>+18% this month</p>
              </div>

              <div
                className="rounded-lg p-6"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e3e0dd",
                }}
              >
                <p className="text-sm" style={{ color: "#797067" }}>Reputation Score</p>
                <h3 className="mt-3 text-4xl font-bold" style={{ color: "#423d38" }}>98%</h3>
                <div className="mt-4 flex gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#fe6e00" }} />
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ffb74d" }} />
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#fe6e00" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-28">
        <div className="text-center">
          <p
            className="text-sm uppercase tracking-[0.3em] font-semibold"
            style={{ color: "#fe6e00" }}
          >
            Features
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl" style={{ color: "#423d38" }}>
            Built For The Future Of Work
          </h2>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Smart Contract Escrow",
              desc: "Payments stay locked securely until work gets approved.",
            },
            {
              title: "On-Chain Reputation",
              desc: "Transparent reviews and decentralized trust system.",
            },
            {
              title: "Instant Payments",
              desc: "Receive crypto payouts instantly without middlemen.",
            },
            {
              title: "Decentralized Storage",
              desc: "Store project files securely using IPFS.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg p-8 transition hover:-translate-y-1"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e3e0dd",
                boxShadow: "0 1px 3px rgba(0,0,0,0.10)",
              }}
            >
              <div
                className="h-12 w-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#fe6e00" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-semibold" style={{ color: "#423d38" }}>{feature.title}</h3>

              <p className="mt-4 leading-relaxed" style={{ color: "#797067" }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p
              className="text-sm uppercase tracking-[0.3em] font-semibold"
              style={{ color: "#fe6e00" }}
            >
              Workflow
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl" style={{ color: "#423d38" }}>
              Simple & Transparent
            </h2>

            <div className="mt-12 space-y-8">
              {[
                "Connect your crypto wallet",
                "Post jobs or submit proposals",
                "Fund escrow through smart contracts",
                "Approve work & release payments",
              ].map((step, index) => (
                <div key={step} className="flex gap-5">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold"
                    style={{ backgroundColor: "#fe6e00", color: "#ffffff" }}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: "#423d38" }}>{step}</h3>
                    <p className="mt-2" style={{ color: "#797067" }}>
                      Secure, decentralized and trustless workflow powered by
                      blockchain technology.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-lg p-8"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e3e0dd",
              boxShadow: "0 1px 3px rgba(0,0,0,0.10)",
            }}
          >
            <div className="space-y-4">
              <div
                className="rounded-lg p-6"
                style={{
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #e3e0dd",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm" style={{ color: "#797067" }}>Frontend Project</p>
                    <h3 className="mt-2 text-2xl font-semibold" style={{ color: "#423d38" }}>
                      Landing Page Redesign
                    </h3>
                  </div>

                  <div
                    className="rounded-full px-4 py-2 text-sm"
                    style={{ backgroundColor: "rgba(0, 199, 88, 0.15)", color: "#00c758" }}
                  >
                    Active
                  </div>
                </div>

                <div className="mt-6 h-3 rounded-full" style={{ backgroundColor: "#edebe9" }}>
                  <div
                    className="h-3 w-3/4 rounded-full"
                    style={{ backgroundColor: "#fe6e00" }}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div
                  className="rounded-lg p-6"
                  style={{
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #e3e0dd",
                  }}
                >
                  <p className="text-sm" style={{ color: "#797067" }}>Budget</p>
                  <h3 className="mt-2 text-3xl font-bold" style={{ color: "#fe6e00" }}>2 ETH</h3>
                </div>

                <div
                  className="rounded-lg p-6"
                  style={{
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #e3e0dd",
                  }}
                >
                  <p className="text-sm" style={{ color: "#797067" }}>Deadline</p>
                  <h3 className="mt-2 text-3xl font-bold" style={{ color: "#423d38" }}>14 Days</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div
          className="relative overflow-hidden rounded-xl p-12 text-center"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e3e0dd",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          <h2 className="text-4xl font-bold md:text-6xl" style={{ color: "#423d38" }}>
            Start Building Your{" "}
            <span style={{ color: "#fe6e00" }}>Web3 Career</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "#797067" }}>
            Join a decentralized marketplace where talent meets opportunity
            without intermediaries.
          </p>

          <a
            href="/dashboard"
            className="mt-10 inline-block rounded-lg px-8 py-4 font-semibold transition hover:opacity-90"
            style={{ backgroundColor: "#fe6e00", color: "#ffffff" }}
          >
            Launch App
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ borderTop: "1px solid #e3e0dd" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm md:flex-row" style={{ color: "#797067" }}>
          <p>© 2026 DecentraLance. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" style={{ color: "#797067" }} className="hover:text-[#423d38] transition">
              Privacy
            </a>
            <a href="#" style={{ color: "#797067" }} className="hover:text-[#423d38] transition">
              Terms
            </a>
            <a href="#" style={{ color: "#797067" }} className="hover:text-[#423d38] transition">
              Docs
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
