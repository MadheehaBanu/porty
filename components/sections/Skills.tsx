"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/shared/SectionHeading";
import { skillCategories, terminalCode } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function SkillBar({ level, delay = 0 }: { level: number; delay?: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.to(barRef.current, {
      scaleX: level / 100,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: barRef.current, start: "top 90%" },
    });
  }, [level, delay]);

  return (
    <div className="h-1 bg-dark-400 rounded-full overflow-hidden">
      <div
        ref={barRef}
        className="skill-bar-fill h-full rounded-full"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
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
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.12,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: { trigger: termRef.current, start: "top 75%" },
      }
    );
  }, []);

  const colorize = (line: string) => {
    return line
      .replace(/const|=>/g, (m) => `<span style="color:#c792ea">${m}</span>`)
      .replace(/madheeha/g, `<span style="color:#82aaff">madheeha</span>`)
      .replace(/"([^"]+)"/g, `<span style="color:#c3e88d">"$1"</span>`)
      .replace(/(frontend|backend|databases|languages|tools|passion):/g, (m) =>
        `<span style="color:#f78c6c">${m}</span>`
      )
      .replace(/\/\/.+/g, (m) => `<span style="color:#546e7a">${m}</span>`);
  };

  return (
    <div ref={termRef} className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="font-mono text-xs text-zinc-500 ml-3">skills.ts</span>
      </div>
      <div className="p-6 font-mono text-sm leading-7 overflow-x-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            className="code-line flex gap-4 opacity-0"
          >
            <span className="text-zinc-600 select-none w-5 text-right shrink-0">{i + 1}</span>
            <span
              dangerouslySetInnerHTML={{ __html: mounted ? (colorize(line) || "&nbsp;") : (line || "&nbsp;") }}
              className="text-zinc-300"
              suppressHydrationWarning
            />
          </div>
        ))}
        <div className="code-line flex gap-4 opacity-0">
          <span className="text-zinc-600 select-none w-5 text-right shrink-0">{lines.length + 1}</span>
          <span className="typewriter-cursor" />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const cardsRef = useRef<HTMLDivElement>(null);

  const activeCategory = skillCategories.find((c) => c.key === activeTab)!;

  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.fromTo(
      cardsRef.current.querySelectorAll(".skill-card"),
      { y: 20, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.07,
        duration: 0.4,
        ease: "back.out(1.4)",
      }
    );
  }, [activeTab]);

  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-dark-100">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="02" title="Tech Arsenal" subtitle="Tools and technologies I work with" />

        <Terminal />

        <div className="mt-16">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {skillCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`font-mono text-sm px-4 py-2 rounded-lg border transition-all duration-200 ${
                  activeTab === cat.key
                    ? "border-accent-indigo bg-accent-indigo/10 text-accent-indigo"
                    : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skill cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.skills.map((skill, i) => (
              <div
                key={skill.name}
                className="skill-card glow-border rounded-xl p-5 bg-dark-200 opacity-0"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-heading font-semibold text-white">{skill.name}</span>
                  <span className="font-mono text-xs text-accent-indigo">{skill.level}%</span>
                </div>
                <SkillBar level={skill.level} delay={i * 0.05} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
