"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/shared/SectionHeading";
import { skillCategories, terminalCode } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, string> = {
  frontend: "⬡",
  backend: "⚙",
  database: "◈",
  languages: "</>",
  tools: "⚒",
};

const categoryColors: Record<string, { accent: string; glow: string; bg: string }> = {
  frontend:  { accent: "#6366f1", glow: "rgba(99,102,241,0.25)",  bg: "rgba(99,102,241,0.08)"  },
  backend:   { accent: "#06b6d4", glow: "rgba(6,182,212,0.25)",   bg: "rgba(6,182,212,0.08)"   },
  database:  { accent: "#8b5cf6", glow: "rgba(139,92,246,0.25)",  bg: "rgba(139,92,246,0.08)"  },
  languages: { accent: "#f59e0b", glow: "rgba(245,158,11,0.25)",  bg: "rgba(245,158,11,0.08)"  },
  tools:     { accent: "#10b981", glow: "rgba(16,185,129,0.25)",  bg: "rgba(16,185,129,0.08)"  },
};

function RadialProgress({ level, color }: { level: number; color: string }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (level / 100) * circ;
  return (
    <svg width="52" height="52" className="shrink-0">
      <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      <circle
        cx="26" cy="26" r={r} fill="none"
        stroke={color} strokeWidth="3"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 26 26)"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      <text x="26" y="31" textAnchor="middle" fontSize="10" fill={color} fontFamily="monospace" fontWeight="700">
        {level}%
      </text>
    </svg>
  );
}

function Terminal() {
  const termRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const lines = terminalCode.split("\n");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!termRef.current) return;
    gsap.fromTo(
      termRef.current.querySelectorAll(".code-line"),
      { opacity: 0, x: -16 },
      {
        opacity: 1, x: 0, stagger: 0.1, duration: 0.35, ease: "power2.out",
        scrollTrigger: { trigger: termRef.current, start: "top 80%" },
      }
    );
  }, []);

  const colorize = (line: string) =>
    line
      .replace(/const|=>/g, (m) => `<span style="color:#c792ea">${m}</span>`)
      .replace(/madheeha/g, `<span style="color:#82aaff">madheeha</span>`)
      .replace(/"([^"]+)"/g, `<span style="color:#c3e88d">"$1"</span>`)
      .replace(/(frontend|backend|databases|languages|tools|passion):/g, (m) =>
        `<span style="color:#f78c6c">${m}</span>`
      )
      .replace(/\/\/.+/g, (m) => `<span style="color:#546e7a">${m}</span>`);

  return (
    <div ref={termRef} className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="font-mono text-xs text-zinc-500 ml-3">skills.ts</span>
        <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(99,102,241,0.15)", color: "#6366f1" }}>TypeScript</span>
      </div>
      <div className="font-mono overflow-x-auto" style={{ padding: "1.25rem", fontSize: "0.875rem", lineHeight: "1.75rem" }}>
        {lines.map((line, i) => (
          <div key={i} className="code-line" style={{ display: "flex", gap: "1.25rem" }}>
            <span className="text-zinc-700 select-none" style={{ width: "1.25rem", textAlign: "right", flexShrink: 0, fontSize: "0.75rem", marginTop: "0.125rem" }}>{i + 1}</span>
            <span
              dangerouslySetInnerHTML={{ __html: mounted ? (colorize(line) || "&nbsp;") : (line || "&nbsp;") }}
              className="text-zinc-300"
              suppressHydrationWarning
            />
          </div>
        ))}
        <div className="code-line" style={{ display: "flex", gap: "1.25rem" }}>
          <span className="text-zinc-700 select-none" style={{ width: "1.25rem", textAlign: "right", flexShrink: 0, fontSize: "0.75rem" }}>{lines.length + 1}</span>
          <span className="typewriter-cursor" />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const gridRef = useRef<HTMLDivElement>(null);
  const activeCategory = skillCategories.find((c) => c.key === activeTab)!;
  const colors = categoryColors[activeTab];

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".skill-badge"),
      { y: 24, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.4, ease: "back.out(1.5)" }
    );
  }, [activeTab]);

  return (
    <section id="skills" style={{ padding: "8rem 1.5rem" }} className="bg-dark-100">
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <SectionHeading number="02" title="What I Work With" subtitle="Tools and technologies I work with" />

        {/* Terminal */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
          <div style={{ width: "100%", maxWidth: "42rem" }}>
            <Terminal />
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ marginTop: "4rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
          {skillCategories.map((cat) => {
            const c = categoryColors[cat.key];
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className="font-mono"
                style={{
                  position: "relative",
                  fontSize: "0.875rem",
                  padding: "0.625rem 1.25rem",
                  borderRadius: "0.75rem",
                  border: `1px solid ${isActive ? c.accent : "rgba(255,255,255,0.08)"}`,
                  background: isActive ? c.bg : "transparent",
                  color: isActive ? c.accent : "#71717a",
                  boxShadow: isActive ? `0 0 20px ${c.glow}` : "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s ease",
                }}
              >
                <span style={{ fontSize: "1rem", lineHeight: 1 }}>{categoryIcons[cat.key]}</span>
                {cat.label}
                {isActive && (
                  <span style={{
                    position: "absolute", top: "-4px", right: "-4px",
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: c.accent, boxShadow: `0 0 6px ${c.accent}`
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Skill Badges Grid */}
        <div
          ref={gridRef}
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {activeCategory.skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-badge card-lift"
              style={{
                borderRadius: "1rem",
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                cursor: "default",
                transition: "all 0.3s ease",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = colors.accent + "55";
                el.style.background = colors.bg;
                el.style.boxShadow = `0 0 24px ${colors.glow}`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.background = "rgba(255,255,255,0.02)";
                el.style.boxShadow = "none";
              }}
            >
              <RadialProgress level={skill.level} color={colors.accent} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="font-heading" style={{ fontWeight: 600, color: "#fff", fontSize: "1rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {skill.name}
                </p>
                <div style={{ marginTop: "0.5rem", height: "4px", borderRadius: "9999px", overflow: "hidden", background: "rgba(255,255,255,0.06)" }}>
                  <div style={{
                    height: "100%",
                    borderRadius: "9999px",
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent}99)`,
                    boxShadow: `0 0 8px ${colors.glow}`,
                    transition: "width 0.7s ease",
                  }} />
                </div>
                <p className="font-mono" style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: colors.accent + "99" }}>
                  {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : skill.level >= 70 ? "Proficient" : "Familiar"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Technologies", value: "20+" },
            { label: "Languages", value: "6" },
            { label: "Frameworks", value: "10+" },
            { label: "Years Learning", value: "3+" },
          ].map((stat) => (
            <div key={stat.label} style={{
              borderRadius: "0.75rem",
              padding: "1rem",
              textAlign: "center",
              background: "rgba(99,102,241,0.05)",
              border: "1px solid rgba(99,102,241,0.12)",
            }}>
              <p className="font-heading gradient-text" style={{ fontWeight: 700, fontSize: "1.5rem" }}>{stat.value}</p>
              <p className="font-mono" style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.25rem" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
