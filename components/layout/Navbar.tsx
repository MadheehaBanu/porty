"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Skills",     href: "/skills" },
  { label: "Projects",   href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact",    href: "/contact" },
];

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power4.inOut" }
      );
      gsap.fromTo(".mobile-nav-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.3, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, { clipPath: "inset(0 0 100% 0)", duration: 0.4, ease: "power4.inOut" });
    }
  }, [menuOpen]);

  const navigate = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: "1rem 3rem", display: "flex", alignItems: "center",
          justifyContent: "space-between", transition: "all 0.5s ease",
          ...(scrolled ? {
            background: "rgba(10,10,20,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(99,102,241,0.15)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
          } : {}),
        }}
      >
        {/* Logo */}
        <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", cursor: "pointer" }}>
          <div style={{
            width: "2.75rem", height: "2.75rem", borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontFamily: "var(--font-space-grotesk)", fontWeight: 900, fontSize: "1rem",
          }}>
            M.
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.9375rem", letterSpacing: "0.02em" }}>Madheeha Banu</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.72rem", color: "#71717a" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399", display: "inline-block" }} />
              Available for work
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <button
                key={href}
                onClick={() => navigate(href)}
                style={{
                  position: "relative", padding: "0.5rem 1rem",
                  fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.02em",
                  color: isActive ? "#fff" : "#a1a1aa",
                  background: "none", border: "none", cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#a1a1aa"; }}
              >
                {label}
                <span style={{
                  position: "absolute", bottom: "2px", left: "1rem", right: "1rem",
                  height: "1.5px", borderRadius: "9999px",
                  background: "linear-gradient(90deg, #6366f1, #06b6d4)",
                  transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease",
                  display: "block",
                }} />
              </button>
            );
          })}
        </div>

        {/* Right: social + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {[
            { href: "https://github.com/MadheehaBanu", label: "GitHub", icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg> },
            { href: "https://www.linkedin.com/in/madheeha-banu/", label: "LinkedIn", icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
          ].map(({ href, label, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              style={{
                width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center",
                justifyContent: "center", borderRadius: "0.5rem", color: "#a1a1aa",
                border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#6366f1"; el.style.borderColor = "rgba(99,102,241,0.4)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#a1a1aa"; el.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              {icon}
            </a>
          ))}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{ display: "none", flexDirection: "column", gap: "5px", padding: "0.5rem", background: "none", border: "none", cursor: "pointer" }}
            className="mobile-hamburger"
          >
            <span style={{ width: "24px", height: "1px", background: "#fff", display: "block" }} />
            <span style={{ width: "16px", height: "1px", background: "#6366f1", display: "block" }} />
            <span style={{ width: "24px", height: "1px", background: "#fff", display: "block" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="mobile-menu"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-hidden={!menuOpen}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#a1a1aa" }}
        >
          <X size={24} />
        </button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => navigate(href)}
              className="mobile-nav-item font-heading"
              style={{
                fontWeight: 700, fontSize: "2.5rem", color: "#fff",
                background: "none", border: "none", cursor: "pointer",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#6366f1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav > div:last-child > a { display: none !important; }
        }
      `}</style>
    </>
  );
}
