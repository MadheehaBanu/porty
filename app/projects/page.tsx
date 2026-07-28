"use client";
import Projects from "@/components/sections/Projects";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/layout/ScrollReveal";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <ScrollReveal />
      <main style={{ paddingTop: "0" }}>
        <Projects />
      </main>
      <Footer />
    </>
  );
}
