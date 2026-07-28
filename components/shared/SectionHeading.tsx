"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".heading-line"),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: "3.5rem", textAlign: "center" }}>
      <div style={{ overflow: "hidden" }}>
        <div
          className="heading-line font-mono"
          style={{ color: "#6366f1", fontSize: "0.875rem", marginBottom: "0.75rem" }}
        >
          {number} ——
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <h2
          className="heading-line font-heading"
          style={{ fontWeight: 900, fontSize: "clamp(2rem, 6vw, 3.75rem)", color: "#fff" }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <div style={{ overflow: "hidden", marginTop: "1rem" }}>
          <p className="heading-line" style={{ color: "#a1a1aa", fontSize: "1.0625rem" }}>{subtitle}</p>
        </div>
      )}
    </div>
  );
}
