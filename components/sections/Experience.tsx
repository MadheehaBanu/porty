"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline, personalInfo } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 12h20" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const iconMap = {
  briefcase: BriefcaseIcon,
  graduation: GraduationIcon,
  book: BookIcon,
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      ".exp-card",
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.18, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } }
    );
    gsap.fromTo(
      ".exp-vline",
      { scaleY: 0 },
      { scaleY: 1, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", end: "bottom 85%", scrub: true } }
    );
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-dark-100"
      style={{ padding: "6rem 1.5rem" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <SectionHeading number="04" title="Experience" subtitle="My professional journey and the impact I've created so far." />

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "3rem" }}>
          {timeline.map((entry, i) => {
            const Icon = iconMap[entry.icon];
            const isLast = i === timeline.length - 1;

            return (
              <div key={entry.id} className="exp-card" style={{ display: "flex", gap: 0 }}>

                {/* Left: icon + vertical line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "1.25rem", paddingTop: "4px" }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    border: "1px solid rgba(99,102,241,0.4)",
                    background: "rgba(99,102,241,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#6366f1", flexShrink: 0,
                  }}>
                    <Icon />
                  </div>
                  {!isLast && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "0.5rem", flex: 1 }}>
                      <div
                        className="exp-vline"
                        style={{
                          width: "1px", flex: 1, minHeight: "32px", transformOrigin: "top",
                          background: "linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(99,102,241,0.1))",
                        }}
                      />
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(255,255,255,0.4)", margin: "4px 0" }} />
                    </div>
                  )}
                </div>

                {/* Card */}
                <div
                  className="exp-card-inner card-lift"
                  style={{
                    flex: 1, borderRadius: "1rem",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "#0d0d14", padding: "1.75rem",
                    marginBottom: "4px", transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(99,102,241,0.35)";
                    el.style.boxShadow = "0 0 28px rgba(99,102,241,0.08)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {/* Top row: title + date badge */}
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <h3 className="font-heading" style={{ fontWeight: 700, fontSize: "1.25rem", color: "#fff", lineHeight: 1.3 }}>
                      {entry.role}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem", flexShrink: 0 }}>
                      <span
                        className="font-mono"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "0.375rem",
                          fontSize: "0.75rem", color: "#e4e4e7",
                          border: "1px solid rgba(255,255,255,0.12)",
                          background: "rgba(255,255,255,0.04)",
                          padding: "0.375rem 0.75rem", borderRadius: "9999px", whiteSpace: "nowrap",
                        }}
                      >
                        <CalendarIcon />
                        {entry.period}
                      </span>
                      <span className="font-mono" style={{ fontSize: "0.75rem", color: "#71717a", paddingRight: "0.25rem" }}>{entry.location}</span>
                    </div>
                  </div>

                  {/* Company */}
                  <a
                    href="#"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.375rem",
                      color: "#6366f1", fontWeight: 500, fontSize: "0.875rem",
                      marginBottom: "1.25rem", textDecoration: "none", transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                  >
                    {entry.company}
                    <ExternalLinkIcon />
                  </a>

                  {/* Bullets */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem", padding: 0, listStyle: "none" }}>
                    {entry.description.map((desc, j) => (
                      <li key={j} style={{ display: "flex", gap: "0.625rem", color: "#a1a1aa", fontSize: "0.875rem", lineHeight: 1.6 }}>
                        <span style={{ marginTop: "7px", width: "6px", height: "6px", borderRadius: "50%", background: "#52525b", flexShrink: 0 }} />
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {entry.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono"
                        style={{
                          display: "inline-flex", alignItems: "center",
                          padding: "0.25rem 0.75rem", borderRadius: "0.375rem",
                          fontSize: "0.75rem", color: "#d4d4d8",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.03)",
                          transition: "all 0.2s ease", cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLSpanElement;
                          el.style.borderColor = "rgba(255,255,255,0.2)";
                          el.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLSpanElement;
                          el.style.borderColor = "rgba(255,255,255,0.1)";
                          el.style.color = "#d4d4d8";
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom GitHub link */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "center" }}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.625rem",
              color: "#6366f1", fontSize: "0.875rem", fontWeight: 500,
              textDecoration: "none", transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6366f1"; }}
          >
            <GitHubIcon />
            View All Projects on GitHub
            <ExternalLinkIcon />
          </a>
        </div>

      </div>
    </section>
  );
}
