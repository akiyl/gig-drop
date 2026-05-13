export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-3xl" />
      </div>



      {/* Hero Section */}
      <section className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
          Web3 Freelancing Marketplace
        </div>

        <h1 className="mt-8 max-w-5xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Hire & Work
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            Securely On-Chain
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
          A decentralized freelance marketplace powered by smart contracts,
          crypto escrow, and transparent reputation systems.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="/jobs" className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-[1.02] inline-block text-center">
            Explore Jobs
          </a>

          <a href="/dashboard/profile" className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10 inline-block text-center">
            Become a Freelancer
          </a>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 w-full max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
          <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
                <p className="text-sm text-zinc-400">Escrow Balance</p>
                <h3 className="mt-3 text-4xl font-bold">4.2 ETH</h3>
                <div className="mt-6 h-2 rounded-full bg-zinc-800">
                  <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
                <p className="text-sm text-zinc-400">Completed Projects</p>
                <h3 className="mt-3 text-4xl font-bold">126</h3>
                <p className="mt-4 text-sm text-emerald-400">+18% this month</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
                <p className="text-sm text-zinc-400">Reputation Score</p>
                <h3 className="mt-3 text-4xl font-bold">98%</h3>
                <div className="mt-4 flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-400" />
                  <div className="h-3 w-3 rounded-full bg-blue-400" />
                  <div className="h-3 w-3 rounded-full bg-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-28">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400">
            Features
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Built For The Future Of Work
          </h2>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:border-purple-500/40"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500" />

              <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>

              <p className="mt-4 leading-relaxed text-zinc-400">
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
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
              Workflow
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-lg font-bold">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">{step}</h3>
                    <p className="mt-2 text-zinc-400">
                      Secure, decentralized and trustless workflow powered by
                      blockchain technology.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Frontend Project</p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      Landing Page Redesign
                    </h3>
                  </div>

                  <div className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
                    Active
                  </div>
                </div>

                <div className="mt-6 h-3 rounded-full bg-zinc-800">
                  <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                  <p className="text-sm text-zinc-400">Budget</p>
                  <h3 className="mt-2 text-3xl font-bold">2 ETH</h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                  <p className="text-sm text-zinc-400">Deadline</p>
                  <h3 className="mt-2 text-3xl font-bold">14 Days</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-12 text-center backdrop-blur-xl">
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold md:text-6xl">
              Start Building Your
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                Web3 Career
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
              Join a decentralized marketplace where talent meets opportunity
              without intermediaries.
            </p>

            <a href="/dashboard" className="mt-10 inline-block rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-[1.02]">
              Launch App
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 DecentraLance. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Docs
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
