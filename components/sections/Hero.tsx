"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { Code2, Link, Mail, Download, ArrowRight, ChevronDown } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { personalInfo } from "@/lib/data";
import { useMousePosition } from "@/hooks/useMousePosition";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const titles = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Creative Coder"];

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Normalize mouse for 3D
  useEffect(() => {
    setMouseNorm({
      x: (mouse.x / window.innerWidth - 0.5) * 2,
      y: (mouse.y / window.innerHeight - 0.5) * 2,
    });
  }, [mouse]);

  // Typewriter
  useEffect(() => {
    const target = titles[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIdx]);

  // GSAP hero animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Split name into chars
    if (nameRef.current) {
      const text = nameRef.current.textContent || "";
      nameRef.current.innerHTML = text
        .split("")
        .map((c) => `<span class="hero-char">${c === " " ? "&nbsp;" : c}</span>`)
        .join("");

      tl.fromTo(
        ".hero-char",
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: { amount: 0.8, from: "random" },
          duration: 1,
          ease: "back.out(1.7)",
        }
      );
    }

    tl.fromTo(
      ".hero-sub",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene mouseX={mouseNorm.x} mouseY={mouseNorm.y} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-[1]" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-24">
        <div className="max-w-3xl">
          <p className="hero-sub font-mono text-accent-cyan text-sm mb-4 opacity-0">
            Hi, I&apos;m
          </p>

          <h1
            ref={nameRef}
            className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6 perspective-1000"
            style={{ perspective: "1000px" }}
          >
            MADHEEHA BANU
          </h1>

          <div className="hero-sub flex items-center gap-3 mb-6 opacity-0 h-8">
            <span className="font-mono text-xl md:text-2xl text-accent-indigo">
              {displayed}
            </span>
            <span className="typewriter-cursor" />
          </div>

          <p className="hero-sub text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mb-10 opacity-0">
            I build scalable web applications and craft impactful digital solutions. Currently
            interning as a Full Stack Developer while pursuing BICT Honours at University of
            Vavuniya.
          </p>

          <div className="hero-sub flex flex-wrap gap-4 mb-10 opacity-0">
            <GlowButton
              variant="filled"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work <ArrowRight size={16} />
            </GlowButton>
            <GlowButton variant="outlined" href={personalInfo.resumeUrl} download>
              Download CV <Download size={16} />
            </GlowButton>
          </div>

          <div className="hero-sub flex items-center gap-5 opacity-0">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-accent-indigo transition-colors hover:scale-110 transform"
            >
              <Code2 size={20} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-accent-indigo transition-colors hover:scale-110 transform"
            >
              <Link size={20} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-zinc-500 hover:text-accent-indigo transition-colors hover:scale-110 transform"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 scroll-indicator">
        <span className="font-mono text-xs text-zinc-600">scroll</span>
        <ChevronDown size={16} className="text-zinc-600" />
      </div>
    </section>
  );
}
