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
  { icon: Briefcase, label: "Developer Intern", sub: "Full Stack" },
  { icon: MapPin, label: "Sri Lanka", sub: "Available Remotely" },
  { icon: FlaskConical, label: "Researcher", sub: "Academic Weekends" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      photoRef.current,
      { x: -60, opacity: 0, rotate: -3 },
      {
        x: 0,
        opacity: 1,
        rotate: -2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );

    gsap.fromTo(
      ".about-para",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      }
    );

    gsap.fromTo(
      ".fact-card",
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".facts-grid", start: "top 80%" },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 dot-grid"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="01" title="About Me" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Photo / Abstract shape */}
          <div ref={photoRef} className="relative opacity-0">
            <div className="photo-frame rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0">
              {/* Abstract gradient avatar */}
              <div className="w-full h-full bg-dark-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/20 via-transparent to-accent-cyan/20" />
                <div className="relative z-10 text-center">
                  <div
                    className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl font-heading font-black gradient-text"
                    style={{
                      background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))",
                      border: "1px solid rgba(99,102,241,0.3)",
                    }}
                  >
                    MB
                  </div>
                  <p className="font-mono text-xs text-zinc-500">profile.jpg</p>
                  <p className="font-mono text-xs text-zinc-600">// add your photo here</p>
                </div>
                {/* Decorative grid lines */}
                <div className="absolute inset-0 grid-bg opacity-50" />
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:right-4 glow-border rounded-xl px-4 py-3 bg-dark-200">
              <p className="font-mono text-xs text-accent-cyan">Currently</p>
              <p className="font-heading font-bold text-sm text-white">@ Intern</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            {personalInfo.bio.map((para, i) => (
              <p key={i} className="about-para text-zinc-300 leading-relaxed text-base opacity-0">
                {para}
              </p>
            ))}

            <div className="facts-grid grid grid-cols-2 gap-4 mt-8">
              {facts.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="fact-card glow-border rounded-xl p-4 bg-dark-100 opacity-0"
                >
                  <Icon size={18} className="text-accent-indigo mb-2" />
                  <p className="font-heading font-semibold text-sm text-white">{label}</p>
                  <p className="font-mono text-xs text-zinc-500 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
