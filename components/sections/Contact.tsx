"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Link, Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { personalInfo } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { icon: Mail,    label: "Email",    value: personalInfo.email,              href: `mailto:${personalInfo.email}` },
  { icon: Phone,   label: "Phone",    value: personalInfo.phone,              href: `tel:${personalInfo.phone}` },
  { icon: Link,    label: "LinkedIn", value: "linkedin.com/in/madheeha-banu", href: personalInfo.linkedin },
  { icon: Code2,   label: "GitHub",   value: "github.com/MadheehaBanu",       href: personalInfo.github },
  { icon: MapPin,  label: "Location", value: "Sri Lanka",                     href: null },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(".contact-item",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
    gsap.fromTo(".contact-form",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
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
    <section
      id="contact"
      ref={sectionRef}
      className="grid-bg"
      style={{ padding: "8rem 1.5rem 12rem", position: "relative", overflow: "hidden" }}
    >
      {/* Decorative large text */}
      <div
        className="font-heading"
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          textAlign: "center", fontWeight: 900, pointerEvents: "none", userSelect: "none",
          fontSize: "clamp(60px, 15vw, 200px)", color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.03)", lineHeight: 1,
        }}
      >
        SAY HELLO
      </div>

      <div style={{ maxWidth: "72rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <SectionHeading number="05" title="Get In Touch" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", marginTop: "4rem" }}>

          {/* Left */}
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <h3 className="font-heading" style={{ fontWeight: 700, fontSize: "1.5rem", color: "#fff", marginBottom: "1rem" }}>
                Have a project in mind?
              </h3>
              <p style={{ color: "#a1a1aa", lineHeight: 1.7 }}>
                I&apos;m always open to discussing new opportunities, creative ideas, or just having
                a chat about tech.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {contactLinks.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <div style={{
                      width: "2.5rem", height: "2.5rem", borderRadius: "0.5rem",
                      background: "#1a1a1a", display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon size={18} color="#6366f1" />
                    </div>
                    <div>
                      <p className="font-mono" style={{ fontSize: "0.75rem", color: "#71717a" }}>{label}</p>
                      <p className="font-heading" style={{ fontWeight: 500, color: "#fff", fontSize: "0.875rem" }}>{value}</p>
                    </div>
                  </>
                );

                const sharedStyle: React.CSSProperties = {
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1.25rem", borderRadius: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.2s ease",
                };

                return (
                  <div key={label} className="contact-item">
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        style={sharedStyle}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.3)";
                          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(99,102,241,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.05)";
                          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                        }}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div style={sharedStyle}>{inner}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-form" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label className="font-mono" style={{ fontSize: "0.75rem", color: "#71717a", display: "block", marginBottom: "0.625rem" }}>Name</label>
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input"
                  style={{ width: "100%", borderRadius: "0.5rem", padding: "0.75rem 1rem", fontSize: "0.875rem" }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono" style={{ fontSize: "0.75rem", color: "#71717a", display: "block", marginBottom: "0.625rem" }}>Email</label>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="form-input"
                  style={{ width: "100%", borderRadius: "0.5rem", padding: "0.75rem 1rem", fontSize: "0.875rem" }}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="font-mono" style={{ fontSize: "0.75rem", color: "#71717a", display: "block", marginBottom: "0.625rem" }}>Subject</label>
              <input
                type="text" required value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="form-input"
                style={{ width: "100%", borderRadius: "0.5rem", padding: "0.75rem 1rem", fontSize: "0.875rem" }}
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="font-mono" style={{ fontSize: "0.75rem", color: "#71717a", display: "block", marginBottom: "0.625rem" }}>Message</label>
              <textarea
                required rows={5} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="form-input"
                style={{ width: "100%", borderRadius: "0.5rem", padding: "0.75rem 1rem", fontSize: "0.875rem", resize: "none" }}
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={sending || sent}
              className="font-mono"
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                gap: "0.5rem", background: sending || sent ? "rgba(99,102,241,0.7)" : "#6366f1",
                color: "#fff", fontSize: "0.875rem", padding: "0.875rem",
                borderRadius: "0.5rem", border: "none", cursor: sending || sent ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { if (!sending && !sent) (e.currentTarget as HTMLButtonElement).style.background = "#818cf8"; }}
              onMouseLeave={(e) => { if (!sending && !sent) (e.currentTarget as HTMLButtonElement).style.background = "#6366f1"; }}
            >
              {sent ? (
                <><CheckCircle size={16} /> Message Sent!</>
              ) : sending ? (
                <><div style={{ width: "1rem", height: "1rem", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Sending...</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
