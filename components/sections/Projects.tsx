"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Code2 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import TechBadge from "@/components/ui/TechBadge";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%" } }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        padding: "4rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Text */}
      <div style={{ order: isEven ? 1 : 2, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <span
          className="font-heading section-number"
          style={{ fontSize: "clamp(60px, 8vw, 100px)" }}
        >
          {project.number}
        </span>

        <h3
          className="font-heading"
          style={{ fontWeight: 900, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#fff", lineHeight: 1.15 }}
        >
          {project.name}
        </h3>

        <p style={{ color: "#a1a1aa", lineHeight: 1.7, fontSize: "0.9375rem" }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.stack.map((tech, i) => (
            <TechBadge key={tech} label={tech} color={i % 2 === 0 ? "indigo" : "cyan"} />
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem" }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.875rem", color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "0.5rem 1rem", borderRadius: "0.5rem",
              textDecoration: "none", transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "#6366f1";
              el.style.color = "#6366f1";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.2)";
              el.style.color = "#fff";
            }}
          >
            Live Demo <ExternalLink size={14} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.875rem", color: "#71717a",
              textDecoration: "none", transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71717a"; }}
          >
            Source Code <Code2 size={14} />
          </a>
        </div>
      </div>

      {/* Mockup */}
      <div style={{ order: isEven ? 2 : 1 }}>
        <div
          style={{
            position: "relative", borderRadius: "0.75rem", overflow: "hidden",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow: `0 0 40px ${project.color}20`,
            transition: "all 0.5s ease",
          }}
        >
          {/* Browser chrome */}
          <div style={{
            background: "#1a1a1a", padding: "0.75rem 1rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(239,68,68,0.7)" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(234,179,8,0.7)" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(34,197,94,0.7)" }} />
            <div style={{ flex: 1, margin: "0 1rem", background: "#262626", borderRadius: "0.25rem", padding: "0.25rem 0.75rem" }}>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "#52525b" }}>
                {project.name.toLowerCase().replace(" ", "")}.vercel.app
              </span>
            </div>
          </div>

          {/* Screenshot */}
          <div
            style={{
              aspectRatio: "16/9", display: "flex", alignItems: "center",
              justifyContent: "center", position: "relative", overflow: "hidden",
              background: `linear-gradient(135deg, ${project.color}15, #050505, ${project.color}08)`,
            }}
          >
            <div style={{ position: "absolute", inset: 0, opacity: 0.3 }} className="grid-bg" />
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative", zIndex: 10 }}
              />
            ) : (
              <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
                <div className="font-heading" style={{ fontSize: "3.75rem", fontWeight: 900, color: project.color, opacity: 0.4, marginBottom: "0.5rem" }}>
                  {project.number}
                </div>
                <p className="font-heading" style={{ fontWeight: 700, fontSize: "1.25rem", color: "rgba(255,255,255,0.6)" }}>{project.name}</p>
                <p className="font-mono" style={{ fontSize: "0.75rem", color: "#52525b", marginTop: "0.5rem" }}>// add screenshot here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="grid-bg" style={{ padding: "8rem 1.5rem" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <SectionHeading
          number="03"
          title="Featured Work"
          subtitle="A selection of projects I've built recently"
        />

        <div style={{ marginTop: "2rem" }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <a
            href="https://github.com/MadheehaBanu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.875rem", color: "#71717a",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "0.75rem 1.5rem", borderRadius: "0.5rem",
              textDecoration: "none", transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#6366f1";
              el.style.borderColor = "rgba(99,102,241,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#71717a";
              el.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            View All Projects on GitHub <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
