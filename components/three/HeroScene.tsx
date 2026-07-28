"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function WireframeShape({
  geometry,
  position,
  color,
  speed = 0.003,
  floatOffset = 0,
}: {
  geometry: React.ReactNode;
  position: [number, number, number];
  color: string;
  speed?: number;
  floatOffset?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += speed;
    meshRef.current.rotation.y += speed * 0.7;
    meshRef.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.5 + floatOffset) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshBasicMaterial wireframe color={color} transparent opacity={0.25} />
    </mesh>
  );
}

function MouseReactiveGroup({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouseX * 0.3 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (mouseY * 0.2 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <WireframeShape
        geometry={<icosahedronGeometry args={[1.5, 0]} />}
        position={[2.5, 1, -3]}
        color="#6366f1"
        speed={0.004}
        floatOffset={0}
      />
      <WireframeShape
        geometry={<torusGeometry args={[1.2, 0.3, 16, 32]} />}
        position={[-3, -1, -5]}
        color="#06b6d4"
        speed={0.003}
        floatOffset={2}
      />
      <WireframeShape
        geometry={<octahedronGeometry args={[1, 0]} />}
        position={[0, -2, -4]}
        color="#8b5cf6"
        speed={0.005}
        floatOffset={4}
      />
      <WireframeShape
        geometry={<tetrahedronGeometry args={[0.8, 0]} />}
        position={[-1.5, 2, -3]}
        color="#06b6d4"
        speed={0.006}
        floatOffset={1}
      />
    </group>
  );
}

export default function HeroScene({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#6366f1" intensity={0.8} />
      <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={0.5} />
      <MouseReactiveGroup mouseX={mouseX} mouseY={mouseY} />
      <Stars radius={80} depth={50} count={2000} factor={2} fade speed={0.3} />
    </Canvas>
  );
}
