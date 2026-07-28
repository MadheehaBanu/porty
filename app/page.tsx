"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/layout/Preloader";
import CustomCursor from "@/components/layout/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");
    if (visited) {
      setLoading(false);
      setHasVisited(true);
    } else {
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && !hasVisited && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <CustomCursor />
      <SmoothScroll>
        <div className={`transition-opacity duration-500 ${loading && !hasVisited ? "opacity-0" : "opacity-100"}`}>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
