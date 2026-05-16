"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -999, my = -999;

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      ring.style.left = mx + "px";
      ring.style.top = my + "px";
    };

    document.addEventListener("mousemove", onMouse);

    const addHover = () => document.body.classList.add("hovered");
    const removeHover = () => document.body.classList.remove("hovered");
    const els = document.querySelectorAll(".decentrlance-home a, .decentrlance-home button, .decentrlance-home .feat-card, .decentrlance-home .tech-name");
    els.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", onMouse);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <>
      <div id="cd" ref={dotRef} />
      <div id="cr" ref={ringRef} />
    </>
  );
}
