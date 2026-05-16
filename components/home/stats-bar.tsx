"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 50, suffix: "K+", label: "Active Freelancers" },
  { target: 10, prefix: "$", suffix: "M+", label: "Payments Processed" },
  { target: 120, suffix: "+", label: "Countries Represented" },
  { target: 4.9, suffix: "★", label: "Platform Rating" },
];

export default function StatsBar() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((el) => {
      if (!el) return;
      const tgt = parseFloat(el.dataset.target!);
      const pre = el.dataset.prefix || "";
      const suf = el.dataset.suffix || "";
      const isDec = tgt % 1 !== 0;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: tgt,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent =
                pre + (isDec ? obj.v.toFixed(1) : Math.floor(obj.v)) + suf;
            },
          });
        },
      });

      return () => trigger.kill();
    });
  }, []);

  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {stats.map((stat, i) => (
          <div key={stat.label} className="stat-block">
            <div
              className="stat-num"
              ref={(el) => { refs.current[i] = el; }}
              data-target={stat.target}
              data-prefix={stat.prefix || ""}
              data-suffix={stat.suffix}
            >
              0
            </div>
            <div className="stat-lbl">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
