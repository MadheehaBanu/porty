"use client";

export default function TechBadge({ label, color = "indigo" }: { label: string; color?: "indigo" | "cyan" }) {
  const isIndigo = color === "indigo";
  const accent = isIndigo ? "#6366f1" : "#06b6d4";
  const bg     = isIndigo ? "rgba(99,102,241,0.05)"  : "rgba(6,182,212,0.05)";
  const border = isIndigo ? "rgba(99,102,241,0.3)"   : "rgba(6,182,212,0.3)";
  const hoverBg     = isIndigo ? "rgba(99,102,241,0.15)"  : "rgba(6,182,212,0.15)";
  const hoverBorder = isIndigo ? "rgba(99,102,241,0.6)"   : "rgba(6,182,212,0.6)";

  return (
    <span
      className="font-mono"
      style={{
        display: "inline-flex", alignItems: "center",
        padding: "0.25rem 0.75rem", borderRadius: "9999px",
        fontSize: "0.75rem", fontWeight: 500,
        color: accent, background: bg,
        border: `1px solid ${border}`,
        transition: "all 0.2s ease", cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLSpanElement;
        el.style.background = hoverBg;
        el.style.borderColor = hoverBorder;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLSpanElement;
        el.style.background = bg;
        el.style.borderColor = border;
      }}
    >
      {label}
    </span>
  );
}
