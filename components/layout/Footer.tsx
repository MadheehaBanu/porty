"use client";
import { Code2, Link, Mail, ArrowUp } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Footer() {
  const [konamiCount, setKonamiCount] = useState(0);
  const [showEgg, setShowEgg] = useState(false);

  useEffect(() => {
    const sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === sequence[idx]) {
        idx++;
        if (idx === sequence.length) {
          setShowEgg(true);
          idx = 0;
          setTimeout(() => setShowEgg(false), 4000);
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <footer className="border-t border-white/5 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-mono text-sm text-zinc-500">
            Designed & Built by{" "}
            <span className="text-accent-indigo">Madheeha Banu</span>
          </p>
          <p className="font-mono text-xs text-zinc-600 mt-1">© 2026. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-accent-indigo transition-colors"
          >
            <Code2 size={18} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-accent-indigo transition-colors"
          >
            <Link size={18} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-zinc-500 hover:text-accent-indigo transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glow-border rounded-full p-3 text-zinc-400 hover:text-white transition-colors animate-pulse-glow"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      {showEgg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-dark-200 glow-border rounded-xl px-6 py-4 font-mono text-sm text-accent-indigo z-50 animate-float">
          🎮 Konami Code! You found the easter egg! Keep building amazing things ✨
        </div>
      )}
    </footer>
  );
}
