"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase, MapPin, FlaskConical } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { personalInfo } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const facts = [
  { icon: GraduationCap, label: "University of Vavuniya", sub: "BICT (Hons) 2026" },
  { icon: Briefcase,     label: "Developer Intern",       sub: "Full Stack" },
  { icon: MapPin,        label: "Sri Lanka",              sub: "Available Remotely" },
  { icon: FlaskConical,  label: "Researcher",             sub: "Academic Weekends" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      photoRef.current,
      { x: -60, opacity: 0, rotate: -3 },
      { x: 0, opacity: 1, rotate: -2, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
    gsap.fromTo(
      ".about-para",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } }
    );
    gsap.fromTo(
      ".fact-card",
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".facts-grid", start: "top 80%" } }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="dot-grid"
      style={{ position: "relative", padding: "8rem 1.5rem" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <SectionHeading number="01" title="About Me" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          alignItems: "center",
          marginTop: "4rem",
        }}>

          {/* Photo */}
          <div ref={photoRef} style={{ position: "relative", display: "flex", justifyContent: "center", paddingBottom: "3.5rem" }}>
            <div
              className="photo-frame"
              style={{ borderRadius: "1rem", overflow: "hidden", aspectRatio: "4/5", maxWidth: "22rem", width: "100%" }}
            >
              <div style={{ width: "100%", height: "100%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2), transparent, rgba(6,182,212,0.2))",
                }} />
                <img
                  src="/images/madheeha.png"
                  alt="Madheeha Banu"
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative", zIndex: 10 }}
                />
                <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
              </div>
            </div>

            {/* Floating badge — sits outside the image, below it */}
            <div style={{ position: "absolute", bottom: "-3rem", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1rem", borderRadius: "9999px",
                background: "rgba(10,10,18,0.92)",
                border: "1px solid rgba(99,102,241,0.4)",
                boxShadow: "0 0 18px rgba(99,102,241,0.15)",
                backdropFilter: "blur(10px)",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ position: "absolute", width: "16px", height: "16px", borderRadius: "50%", background: "rgba(34,197,94,0.25)", animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }} />
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "block" }} />
              </span>
              <span className="font-mono" style={{ fontSize: "0.7rem", color: "#6366f1", letterSpacing: "0.06em", textTransform: "uppercase" }}>Currently</span>
              <span className="font-heading" style={{ fontWeight: 700, fontSize: "0.82rem", color: "#fff" }}>Full Stack Intern</span>
            </div>
            <style>{`@keyframes ping { 75%,100%{transform:scale(2);opacity:0} }`}</style>
          </div>

          {/* Bio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {personalInfo.bio.map((para, i) => (
              <p
                key={i}
                className="about-para"
                style={{ color: "#d4d4d8", lineHeight: 1.8, fontSize: "0.9375rem" }}
              >
                {para}
              </p>
            ))}

            {/* Facts grid */}
            <div
              className="facts-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {facts.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="fact-card glow-border card-lift"
                  style={{
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    background: "#0a0a0a",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(99,102,241,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "#0a0a0a";
                  }}
                >
                  <Icon size={18} color="#6366f1" style={{ marginBottom: "0.5rem" }} />
                  <p className="font-heading" style={{ fontWeight: 600, fontSize: "0.875rem", color: "#fff" }}>{label}</p>
                  <p className="font-mono" style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.25rem" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
