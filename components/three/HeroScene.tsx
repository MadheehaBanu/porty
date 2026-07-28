"use client";
if (typeof window !== "undefined") {
  const _warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    _warn(...args);
  };
}
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Particle network ─────────────────────────────────────────────────── */
function ParticleNetwork({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const pointsRef  = useRef<THREE.Points>(null);
  const linesRef   = useRef<THREE.LineSegments>(null);
  const groupRef   = useRef<THREE.Group>(null);
  const COUNT      = 90;
  const CONNECT_D  = 2.8;

  const { positions, velocities } = useMemo(() => {
    const positions  = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      velocities[i * 3]     = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions, velocities };
  }, []);

  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  const lineGeo = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    // Drift particles
    const pos = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      // Bounce
      if (Math.abs(positions[i * 3])     > 7)  velocities[i * 3]     *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 4)  velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 3)  velocities[i * 3 + 2] *= -1;
      pos.setXYZ(i, positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
    }
    pos.needsUpdate = true;

    // Build connection lines
    const linePositions: number[] = [];
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = positions[i * 3]     - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECT_D) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

    // Mouse parallax
    groupRef.current.rotation.y += (mouseX * 0.15 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (mouseY * 0.08 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial size={0.045} color="#6366f1" transparent opacity={0.85} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

/* ── Ambient glow orbs ────────────────────────────────────────────────── */
function GlowOrb({ position, color, radius, speed, offset }: {
  position: [number, number, number];
  color: string;
  radius: number;
  speed: number;
  offset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed + offset) * 0.6;
    meshRef.current.position.x = position[0] + Math.cos(clock.elapsedTime * speed * 0.7 + offset) * 0.3;
    const s = 1 + Math.sin(clock.elapsedTime * speed * 1.3 + offset) * 0.08;
    meshRef.current.scale.setScalar(s);
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} />
    </mesh>
  );
}

/* ── Subtle grid ──────────────────────────────────────────────────────── */
function SubtleGrid() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.04 + Math.sin(clock.elapsedTime * 0.3) * 0.015;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -4, -3]}>
      <planeGeometry args={[28, 20, 20, 14]} />
      <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

/* ── Depth particles (far background) ────────────────────────────────── */
function DepthParticles() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const count = 200;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = -8 - Math.random() * 10;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.008;
    ref.current.rotation.x = clock.elapsedTime * 0.004;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.025} color="#8b5cf6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ── Export ───────────────────────────────────────────────────────────── */
export default function HeroScene({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Particle network — main interactive layer */}
        <ParticleNetwork mouseX={mouseX} mouseY={mouseY} />

        {/* Deep background particles */}
        <DepthParticles />

        {/* Subtle perspective grid */}
        <SubtleGrid />

        {/* Large ambient glow orbs */}
        <GlowOrb position={[-5,  1, -4]} color="#6366f1" radius={3.5} speed={0.3} offset={0}   />
        <GlowOrb position={[ 5, -1, -5]} color="#06b6d4" radius={3.0} speed={0.25} offset={2}  />
        <GlowOrb position={[ 0,  3, -6]} color="#8b5cf6" radius={2.5} speed={0.2}  offset={4}  />
        <GlowOrb position={[-3, -3, -4]} color="#06b6d4" radius={2.0} speed={0.35} offset={1}  />
      </Canvas>
    </Suspense>
  );
}
