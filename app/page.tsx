"use client";
import { useState, useEffect } from "react";
import Preloader from "@/components/layout/Preloader";
import CustomCursor from "@/components/layout/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/layout/ScrollReveal";
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
    if (visited) { setLoading(false); setHasVisited(true); }
    else { sessionStorage.setItem("visited", "true"); }
  }, []);

  return (
    <>
      {loading && !hasVisited && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <SmoothScroll>
        <div style={{ opacity: loading && !hasVisited ? 0 : 1, transition: "opacity 0.5s ease" }}>
          <Navbar />
          <ScrollReveal />
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
