"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const ease = [0.645, 0.045, 0.355, 1.0];

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 40%",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{
            opacity: 0,
            rotateX: 18,
            y: 80,
            scale: 0.92,
            filter: "blur(8px)",
            transformOrigin: "50% 0%",
          }}
          animate={{
            opacity: 1,
            rotateX: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transformOrigin: "50% 0%",
          }}
          exit={{
            opacity: 0,
            rotateX: -14,
            y: -60,
            scale: 0.94,
            filter: "blur(6px)",
            transformOrigin: "50% 100%",
          }}
          transition={{
            duration: 0.75,
            ease,
          }}
          style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
