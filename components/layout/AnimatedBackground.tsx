"use client";
import { useEffect, useRef, useState } from "react";

const ORBS = [
  { size: 500, x: "10%",  y: "15%",  color: "rgba(99,102,241,0.07)",  dur: 18 },
  { size: 350, x: "75%",  y: "60%",  color: "rgba(6,182,212,0.06)",   dur: 22 },
  { size: 280, x: "55%",  y: "10%",  color: "rgba(139,92,246,0.05)",  dur: 15 },
  { size: 220, x: "20%",  y: "70%",  color: "rgba(6,182,212,0.05)",   dur: 26 },
  { size: 180, x: "85%",  y: "20%",  color: "rgba(99,102,241,0.06)",  dur: 20 },
];

const makeParticles = () => Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  dur: Math.random() * 20 + 15,
  delay: Math.random() * -20,
  color: i % 3 === 0 ? "rgba(99,102,241,0.5)" : i % 3 === 1 ? "rgba(6,182,212,0.4)" : "rgba(139,92,246,0.4)",
}));

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<ReturnType<typeof makeParticles>>([]);

  useEffect(() => { setParticles(makeParticles()); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Thin grid lines
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const step = 60;
      ctx.strokeStyle = "rgba(99,102,241,0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      {/* Grid canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animation: `bgOrbFloat${i % 3} ${orb.dur}s ease-in-out infinite`,
            animationDelay: `${-i * 3}s`,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Drifting particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            animation: `bgParticleDrift ${p.dur}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes bgOrbFloat0 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(40px,-30px) scale(1.05); }
          66%      { transform: translate(-20px,40px) scale(0.97); }
        }
        @keyframes bgOrbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-50px,25px) scale(1.08); }
          70%      { transform: translate(30px,-40px) scale(0.95); }
        }
        @keyframes bgOrbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(35px,35px) scale(1.06); }
        }
        @keyframes bgParticleDrift {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-120px) translateX(30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
