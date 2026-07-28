"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Link, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { personalInfo } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Link, label: "LinkedIn", value: "linkedin.com/in/madheeha", href: personalInfo.linkedin },
  { icon: Code2, label: "GitHub", value: "github.com/madheeha", href: personalInfo.github },
  { icon: MapPin, label: "Location", value: "Sri Lanka", href: null },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      ".contact-item",
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );
    gsap.fromTo(
      ".contact-form",
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-12 grid-bg relative overflow-hidden">
      {/* Decorative large text */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center font-heading font-black pointer-events-none select-none"
        style={{
          fontSize: "clamp(60px, 15vw, 200px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          lineHeight: 1,
        }}
      >
        SAY HELLO
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading number="05" title="Get In Touch" />

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading font-bold text-2xl text-white mb-3">
                Have a project in mind?
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                I&apos;m always open to discussing new opportunities, creative ideas, or just having
                a chat about tech.
              </p>
            </div>

            <div className="space-y-4">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="contact-item opacity-0">
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-accent-indigo/30 hover:bg-accent-indigo/5 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-dark-300 flex items-center justify-center group-hover:bg-accent-indigo/10 transition-colors">
                        <Icon size={18} className="text-accent-indigo" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-zinc-500">{label}</p>
                        <p className="font-heading font-medium text-white text-sm">{value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-dark-300 flex items-center justify-center">
                        <Icon size={18} className="text-accent-indigo" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-zinc-500">{label}</p>
                        <p className="font-heading font-medium text-white text-sm">{value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-form space-y-4 opacity-0">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs text-zinc-500 mb-2 block">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input w-full rounded-lg px-4 py-3 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-zinc-500 mb-2 block">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="form-input w-full rounded-lg px-4 py-3 text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs text-zinc-500 mb-2 block">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="form-input w-full rounded-lg px-4 py-3 text-sm"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-zinc-500 mb-2 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="form-input w-full rounded-lg px-4 py-3 text-sm resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={sending || sent}
              className="w-full flex items-center justify-center gap-2 bg-accent-indigo hover:bg-indigo-500 disabled:opacity-70 text-white font-mono text-sm py-3 rounded-lg transition-all duration-200 animate-pulse-glow"
            >
              {sent ? (
                <>
                  <CheckCircle size={16} /> Message Sent!
                </>
              ) : sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
