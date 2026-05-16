"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home/decentrlance.css";

import Preloader from "./home/preloader";
import HeroSection from "./home/hero-section";
import MarqueeStrip from "./home/marquee-strip";
import FeaturesSection from "./home/features-section";
import HowItWorksSection from "./home/how-it-works-section";
import StatsBar from "./home/stats-bar";
import EcosystemSection from "./home/ecosystem-section";
import TechBar from "./home/tech-bar";
import FooterSection from "./home/footer-section";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimReady(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!animReady) return;

    const heroTl = gsap.timeline({ delay: 0.1 });
    heroTl
      .to(".hero-badge", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(".word", { y: "0%", opacity: 1, stagger: 0.12, duration: 0.9, ease: "power4.out" }, "-=0.3")
      .to(".hero-sub", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.55")
      .to(".hero-actions", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.45")
      .to("#heroScroll", { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");

    const opts = { toggleActions: "play none none none" as const };

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "top 86%", ...opts },
        opacity: 1, y: 0, duration: 0.75, delay: (i % 3) * 0.1, ease: "power3.out",
      });
    });

    gsap.utils.toArray<HTMLElement>(".reveal-left").forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "top 86%", ...opts },
        opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
      });
    });

    gsap.utils.toArray<HTMLElement>(".reveal-right").forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "top 86%", ...opts },
        opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
      });
    });
  }, [animReady]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !a.getAttribute("href") || a.getAttribute("href") === "#") return;
      e.preventDefault();
      const id = a.getAttribute("href")!;
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="decentrlance-home">
      <Preloader />
      <div>
        <HeroSection />
        <MarqueeStrip />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsBar />
        <EcosystemSection />
        <TechBar />
        <FooterSection />
      </div>
    </div>
  );
}
