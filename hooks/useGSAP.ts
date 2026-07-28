"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAP(
  callback: (gsapInstance: typeof gsap) => void | (() => void),
  deps: React.DependencyList = []
) {
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    const cleanup = callback(gsap);
    cleanupRef.current = cleanup;
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
