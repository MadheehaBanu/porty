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
    const lines = ref.current.querySelectorAll(".heading-line");
    gsap.fromTo(
      lines,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className="mb-16 md:mb-24">
      <div className="overflow-hidden">
        <div className="heading-line font-mono text-accent-indigo text-sm mb-3 opacity-0">
          {number} ——
        </div>
      </div>
      <div className="overflow-hidden">
        <h2 className="heading-line font-heading font-black text-4xl md:text-6xl text-white opacity-0">
          {title}
        </h2>
      </div>
      {subtitle && (
        <div className="overflow-hidden mt-4">
          <p className="heading-line text-zinc-400 text-lg opacity-0">{subtitle}</p>
        </div>
      )}
    </div>
  );
}
