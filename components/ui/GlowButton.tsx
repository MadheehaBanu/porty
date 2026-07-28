"use client";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "filled" | "outlined";
  onClick?: () => void;
  href?: string;
  className?: string;
  download?: boolean;
}

export default function GlowButton({
  children,
  variant = "filled",
  onClick,
  href,
  className,
  download,
}: GlowButtonProps) {
  const btnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0, 0)";
  };

  const baseClass = cn(
    "magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-medium transition-all duration-300",
    variant === "filled"
      ? "bg-accent-indigo text-white hover:bg-indigo-500 animate-pulse-glow"
      : "border border-accent-indigo/40 text-white hover:border-accent-indigo hover:bg-accent-indigo/10",
    className
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        download={download}
        className={baseClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        target={download ? undefined : "_blank"}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={baseClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
