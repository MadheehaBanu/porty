"use client";
import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const [hovering, setHovering] = useState(false);
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.left = `${mouse.x}px`;
    dot.style.top = `${mouse.y}px`;

    const animate = () => {
      ringPos.current.x += (mouse.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouse]);

  useEffect(() => {
    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className={`cursor-ring hidden md:block ${hovering ? "hovering" : ""}`} />
    </>
  );
}
