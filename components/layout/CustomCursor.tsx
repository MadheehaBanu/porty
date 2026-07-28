"use client";
import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { positionRef } = useMousePosition();
  const [hovering, setHovering] = useState(false);
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const animate = () => {
      const { x, y } = positionRef.current;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      ringPos.current.x += (x - ringPos.current.x) * 0.12;
      ringPos.current.y += (y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [positionRef]);

  useEffect(() => {
    const enter = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-cursor]")) setHovering(true);
    };
    const leave = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-cursor]")) setHovering(false);
    };
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    return () => {
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className={`cursor-ring hidden md:block ${hovering ? "hovering" : ""}`} />
    </>
  );
}
