"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState("");
  const fullText = "MADHEEHA.DEV";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 80);

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(progressRef.current, { width: "100%", duration: 1.8, ease: "power2.inOut" })
      .to(
        textRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(containerRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete,
      });

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="preloader"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div ref={textRef} className="flex flex-col items-center gap-8">
        <div
          className="font-heading font-black text-4xl md:text-6xl tracking-widest gradient-text"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {displayed}
          <span className="typewriter-cursor" />
        </div>
        <div className="w-48 h-px bg-dark-400 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full w-0"
            style={{ background: "linear-gradient(90deg, #6366f1, #06b6d4)" }}
          />
        </div>
      </div>
    </div>
  );
}
