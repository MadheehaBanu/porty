"use client";
import { Code2, Link, Mail, ArrowUp, Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useEffect, useState } from "react";

const socials = [
  { icon: Code2, href: personalInfo.github,            label: "GitHub" },
  { icon: Link,  href: personalInfo.linkedin,          label: "LinkedIn" },
  { icon: Mail,  href: `mailto:${personalInfo.email}`, label: "Email" },
];

const navLinks = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Footer() {
  const [showEgg, setShowEgg] = useState(false);

  useEffect(() => {
    const sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === sequence[idx]) { idx++; }
      else { idx = 0; }
      if (idx === sequence.length) {
        setShowEgg(true);
        idx = 0;
        setTimeout(() => setShowEgg(false), 4000);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0a0a0a" }}>

      {/* Main footer body */}
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "4rem 1.5rem 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", alignItems: "start" }}>

          {/* Brand */}
          <div>
            <p className="font-heading" style={{ fontWeight: 700, fontSize: "1.25rem", color: "#fff", marginBottom: "0.75rem" }}>
              Madheeha<span style={{ color: "#6366f1" }}>.</span>
            </p>
            <p className="font-mono" style={{ fontSize: "0.8rem", color: "#52525b", lineHeight: 1.7, maxWidth: "220px" }}>
              Full Stack Developer crafting digital experiences that matter.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#71717a", transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(99,102,241,0.5)";
                    el.style.color = "#6366f1";
                    el.style.background = "rgba(99,102,241,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.color = "#71717a";
                    el.style.background = "transparent";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-mono" style={{ fontSize: "0.75rem", color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Navigation
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-mono"
                    style={{ fontSize: "0.875rem", color: "#71717a", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71717a"; }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div>
            <p className="font-mono" style={{ fontSize: "0.75rem", color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a href={`mailto:${personalInfo.email}`} className="font-mono"
                style={{ fontSize: "0.8rem", color: "#71717a", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71717a"; }}
              >
                {personalInfo.email}
              </a>
              <a href={`tel:${personalInfo.phone}`} className="font-mono"
                style={{ fontSize: "0.8rem", color: "#71717a", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71717a"; }}
              >
                {personalInfo.phone}
              </a>
              <p className="font-mono" style={{ fontSize: "0.8rem", color: "#52525b" }}>Sri Lanka 🇱🇰</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "1.5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p className="font-mono" style={{ fontSize: "0.75rem", color: "#3f3f46", display: "flex", alignItems: "center", gap: "0.375rem" }}>
            Designed & Built with <Heart size={12} color="#6366f1" fill="#6366f1" /> by{" "}
            <span style={{ color: "#6366f1" }}>Madheeha Banu</span>
            <span style={{ margin: "0 0.25rem", color: "#27272a" }}>·</span>
            © 2026. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 1rem", borderRadius: "9999px",
              border: "1px solid rgba(99,102,241,0.3)",
              background: "rgba(99,102,241,0.08)", color: "#6366f1",
              fontSize: "0.75rem", cursor: "pointer", transition: "all 0.2s ease",
            }}
            className="font-mono"
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "rgba(99,102,241,0.18)";
              el.style.borderColor = "rgba(99,102,241,0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "rgba(99,102,241,0.08)";
              el.style.borderColor = "rgba(99,102,241,0.3)";
            }}
          >
            <ArrowUp size={13} /> Back to top
          </button>
        </div>
      </div>

      {/* Easter egg */}
      {showEgg && (
        <div
          className="font-mono animate-float glow-border"
          style={{
            position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
            background: "#111", borderRadius: "0.75rem", padding: "1rem 1.5rem",
            fontSize: "0.875rem", color: "#6366f1", zIndex: 50, whiteSpace: "nowrap",
          }}
        >
          🎮 Konami Code! You found the easter egg! Keep building amazing things ✨
        </div>
      )}
    </footer>
  );
}
