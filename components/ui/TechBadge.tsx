"use client";
import { cn } from "@/lib/utils";

export default function TechBadge({ label, color = "indigo" }: { label: string; color?: "indigo" | "cyan" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full font-mono text-xs font-medium border transition-all duration-200",
        color === "indigo"
          ? "border-accent-indigo/30 text-accent-indigo bg-accent-indigo/5 hover:bg-accent-indigo/15 hover:border-accent-indigo/60"
          : "border-accent-cyan/30 text-accent-cyan bg-accent-cyan/5 hover:bg-accent-cyan/15 hover:border-accent-cyan/60"
      )}
    >
      {label}
    </span>
  );
}
