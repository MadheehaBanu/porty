"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/shared/SectionHeading";
import TechBadge from "@/components/ui/TechBadge";
import { timeline } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".timeline-entry",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      }
    );
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-6 md:px-12 bg-dark-100">
      <div className="max-w-4xl mx-auto">
        <SectionHeading number="04" title="Experience" />

        <div className="relative pl-8 md:pl-12">
          {/* Timeline line */}
          <div
            ref={lineRef}
            className="timeline-line"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-12">
            {timeline.map((entry, i) => (
              <div key={entry.id} className="timeline-entry relative opacity-0">
                {/* Dot */}
                <div
                  className="absolute -left-8 md:-left-12 top-1 w-3 h-3 rounded-full border-2 border-accent-indigo"
                  style={{
                    background: i === 0 ? "#6366f1" : "transparent",
                    boxShadow: i === 0 ? "0 0 12px rgba(99,102,241,0.6)" : "none",
                  }}
                />

                <div className="glow-border rounded-xl p-6 bg-dark-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-white">{entry.role}</h3>
                      <p className="text-accent-indigo font-mono text-sm">{entry.company}</p>
                    </div>
                    <span className="font-mono text-xs text-zinc-500 bg-dark-300 px-3 py-1 rounded-full whitespace-nowrap">
                      {entry.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {entry.description.map((desc, j) => (
                      <li key={j} className="flex gap-3 text-zinc-400 text-sm">
                        <span className="text-accent-cyan mt-1 shrink-0">▸</span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {entry.tech.map((t, j) => (
                      <TechBadge key={t} label={t} color={j % 2 === 0 ? "indigo" : "cyan"} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
