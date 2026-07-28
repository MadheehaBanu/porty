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
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card group grid md:grid-cols-2 gap-8 md:gap-16 items-center py-16 border-b border-white/5 opacity-0"
    >
      {/* Text — alternates side */}
      <div className={`space-y-6 ${!isEven ? "md:order-2" : ""}`}>
        <div className="flex items-center gap-4">
          <span
            className="section-number text-6xl md:text-8xl"
            style={{ fontSize: "clamp(60px, 8vw, 100px)" }}
          >
            {project.number}
          </span>
        </div>
        <h3 className="font-heading font-black text-3xl md:text-4xl text-white group-hover:gradient-text transition-all duration-300">
          {project.name}
        </h3>
        <p className="text-zinc-400 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <TechBadge key={tech} label={tech} color={i % 2 === 0 ? "indigo" : "cyan"} />
          ))}
        </div>
        <div className="flex gap-4 pt-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-white border border-white/20 px-4 py-2 rounded-lg hover:border-accent-indigo hover:text-accent-indigo transition-all duration-200"
          >
            Live Demo <ExternalLink size={14} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Source Code <Code2 size={14} />
          </a>
        </div>
      </div>

      {/* Mockup */}
      <div className={`${!isEven ? "md:order-1" : ""}`}>
        <div
          className="relative rounded-xl overflow-hidden glow-border group-hover:shadow-2xl transition-all duration-500"
          style={{
            boxShadow: `0 0 40px ${project.color}20`,
          }}
        >
          {/* Browser chrome */}
          <div className="bg-dark-300 px-4 py-3 flex items-center gap-2 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <div className="flex-1 mx-4 bg-dark-400 rounded px-3 py-1">
              <span className="font-mono text-xs text-zinc-600">
                {project.name.toLowerCase().replace(" ", "")}.vercel.app
              </span>
            </div>
          </div>
          {/* Screenshot placeholder */}
          <div
            className="aspect-video flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700"
            style={{
              background: `linear-gradient(135deg, ${project.color}15, #050505, ${project.color}08)`,
            }}
          >
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative z-10 text-center">
              <div
                className="text-6xl font-heading font-black mb-2"
                style={{ color: project.color, opacity: 0.4 }}
              >
                {project.number}
              </div>
              <p className="font-heading font-bold text-xl text-white/60">{project.name}</p>
              <p className="font-mono text-xs text-zinc-600 mt-2">// add screenshot here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 grid-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="03"
          title="Featured Work"
          subtitle="A selection of projects I've built recently"
        />

        <div>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/madheeha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-zinc-400 hover:text-accent-indigo transition-colors border border-white/10 hover:border-accent-indigo/40 px-6 py-3 rounded-lg"
          >
            View All Projects on GitHub <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
