"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about", num: "01" },
  { label: "Skills", href: "#skills", num: "02" },
  { label: "Projects", href: "#projects", num: "03" },
  { label: "Experience", href: "#experience", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power4.inOut" }
      );
      gsap.fromTo(
        ".mobile-nav-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.3, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.4,
        ease: "power4.inOut",
      });
    }
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "nav-blur" : ""
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-heading font-black text-2xl gradient-text glow-text-indigo hover:scale-110 transition-transform"
        >
          M.
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href, num }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={`font-mono text-sm glitch-text transition-colors duration-200 ${
                activeSection === href.slice(1)
                  ? "text-accent-indigo"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="text-accent-indigo mr-1">{num}.</span>
              {label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="w-6 h-px bg-white block" />
          <span className="w-4 h-px bg-accent-indigo block" />
          <span className="w-6 h-px bg-white block" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="mobile-menu"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? ("" as unknown as boolean) : undefined}
      >
        <button
          className="absolute top-6 right-6 text-zinc-400 hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center gap-8">
          {navLinks.map(({ label, href, num }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="mobile-nav-item font-heading font-bold text-4xl text-white hover:text-accent-indigo transition-colors"
            >
              <span className="text-accent-indigo font-mono text-lg mr-3">{num}.</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
