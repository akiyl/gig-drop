export default function CTASection() {
  return (
    <div className="cta-wrap" id="cta">
      <div className="cta-glow" />
      <div className="cta-inner">
        <div className="cta-label reveal">
          <span className="badge-dot" />
          Early Access Open
        </div>
        <h2 className="cta-title reveal">
          Ready to work on
          <br />
          your <span className="mint">own terms?</span>
        </h2>
        <p className="cta-sub reveal">
          Join 50,000+ freelancers and clients who&apos;ve taken control of
          their work and payments.
        </p>
        <div className="cta-form reveal">
          <div className="cta-input-wrap">
            <input
              className="cta-input"
              type="email"
              placeholder="Enter your email for early access"
            />
            <button className="cta-submit">Get Access →</button>
          </div>
        </div>
        <p className="cta-note reveal">
          No spam. Connect wallet anytime. Built in public.
        </p>
      </div>
    </div>
  );
}
