"use client";
import { useRef } from "react";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "filled" | "outlined";
  onClick?: () => void;
  href?: string;
  download?: boolean;
}

export default function GlowButton({ children, variant = "filled", onClick, href, download }: GlowButtonProps) {
  const btnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0, 0)";
    if (variant === "filled") {
      (e.currentTarget as HTMLElement).style.background = "#6366f1";
    } else {
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)";
      (e.currentTarget as HTMLElement).style.background  = "transparent";
    }
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.75rem 1.5rem", borderRadius: "0.5rem",
    fontFamily: "var(--font-jetbrains), monospace",
    fontSize: "0.875rem", fontWeight: 500,
    cursor: "pointer", transition: "all 0.3s ease",
    textDecoration: "none",
    ...(variant === "filled"
      ? { background: "#6366f1", color: "#fff", border: "none" }
      : { background: "transparent", color: "#fff", border: "1px solid rgba(99,102,241,0.4)" }
    ),
  };

  if (href) {
    return (
      <a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        download={download}
        style={baseStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={(e) => {
          if (variant === "filled") {
            (e.currentTarget as HTMLElement).style.background = "#818cf8";
          } else {
            (e.currentTarget as HTMLElement).style.borderColor = "#6366f1";
            (e.currentTarget as HTMLElement).style.background  = "rgba(99,102,241,0.1)";
          }
        }}
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
      style={baseStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={(e) => {
        if (variant === "filled") {
          (e.currentTarget as HTMLElement).style.background = "#818cf8";
        } else {
          (e.currentTarget as HTMLElement).style.borderColor = "#6366f1";
          (e.currentTarget as HTMLElement).style.background  = "rgba(99,102,241,0.1)";
        }
      }}
    >
      {children}
    </button>
  );
}
