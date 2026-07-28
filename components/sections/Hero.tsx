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
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { positionRef } = useMousePosition();
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });
  const [titleIdx,  setTitleIdx]  = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const update = () => {
      const { x, y } = positionRef.current;
      setMouseNorm({
        x: (x / window.innerWidth  - 0.5) * 2,
        y: (y / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [positionRef]);

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

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    if (nameRef.current) {
      const lines = ["MADHEEHA", "BANU"];
      nameRef.current.innerHTML = lines
        .map((word) =>
          `<div style="display:block">${word
            .split("")
            .map((c) => `<span class="hero-char">${c}</span>`)
            .join("")}</div>`
        )
        .join("");
      tl.fromTo(
        ".hero-char",
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, stagger: { amount: 0.8, from: "random" }, duration: 1, ease: "back.out(1.7)" }
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
    <section
      className="grid-bg"
      style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
    >
      {/* 3D Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <HeroScene mouseX={mouseNorm.x} mouseY={mouseNorm.y} />
      </div>

      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8rem", background: "linear-gradient(to top, #050505, transparent)", zIndex: 1 }} />

      {/* Content */}
      <div ref={contentRef} style={{ position: "relative", zIndex: 10, maxWidth: "72rem", margin: "0 auto", padding: "6rem 1.5rem 0", width: "100%" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>

          <p className="hero-sub font-mono" style={{ color: "#06b6d4", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
            Hi, I&apos;m
          </p>

          <h1
            ref={nameRef}
            className="font-heading"
            style={{
              fontWeight: 900,
              fontSize: "clamp(2.75rem, 10vw, 6rem)",
              color: "#fff",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              perspective: "1000px",
            }}
          >
            MADHEEHA<br />BANU
          </h1>

          <div
            className="hero-sub"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.5rem", height: "2.5rem" }}
          >
            <span className="font-mono" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "#6366f1" }}>
              {displayed}
            </span>
            <span className="typewriter-cursor" />
          </div>

          <p
            className="hero-sub"
            style={{ color: "#a1a1aa", fontSize: "clamp(0.9rem, 2vw, 1.0625rem)", lineHeight: 1.75, maxWidth: "36rem", margin: "0 auto 2.5rem" }}
          >
            I build scalable web applications and craft impactful digital solutions. Currently
            interning as a Full Stack Developer while pursuing BICT Honours at University of
            Vavuniya.
          </p>

          <div
            className="hero-sub"
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginBottom: "2.5rem" }}
          >
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

          <div
            className="hero-sub"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem" }}
          >
            {[
              { href: personalInfo.github,            icon: <Code2 size={20} /> },
              { href: personalInfo.linkedin,          icon: <Link  size={20} /> },
              { href: `mailto:${personalInfo.email}`, icon: <Mail  size={20} /> },
            ].map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ color: "#71717a", transition: "color 0.2s ease, transform 0.2s ease", display: "flex" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#6366f1";
                  el.style.transform = "scale(1.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#71717a";
                  el.style.transform = "scale(1)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        }}
      >
        <span className="font-mono" style={{ fontSize: "0.75rem", color: "#52525b" }}>scroll</span>
        <ChevronDown size={16} color="#52525b" />
      </div>
    </section>
  );
}
