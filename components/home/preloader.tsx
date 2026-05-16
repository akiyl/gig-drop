"use client";

import { useEffect, useRef } from "react";

export default function Preloader() {
  const logoRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.default;

      const prog = { v: 0 };
      const tl = gsap.timeline();

      tl.to(
        logoRef.current,
        { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" }
      )
        .to(
          prog,
          {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate() {
              if (fillRef.current)
                fillRef.current.style.width = prog.v + "%";
              if (pctRef.current)
                pctRef.current.textContent = Math.floor(prog.v) + "%";
            },
          },
          "-=0.3"
        )
        .to(
          wrapRef.current,
          {
            yPercent: -100,
            duration: 0.85,
            ease: "power3.inOut",
            onComplete() {
              if (wrapRef.current) wrapRef.current.style.display = "none";
            },
          },
          "+=0.25"
        );
    };

    loadGsap();
  }, []);

  return (
    <div id="pl" ref={wrapRef}>
      <div id="pl-logo" ref={logoRef}>
        DECENTRLANCE
      </div>
      <div id="pl-track">
        <div id="pl-fill" ref={fillRef} />
      </div>
      <div id="pl-pct" ref={pctRef}>
        0%
      </div>
    </div>
  );
}
