"use client";
import Skills from "@/components/sections/Skills";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/layout/ScrollReveal";

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <ScrollReveal />
      <main style={{ paddingTop: "0" }}>
        <Skills />
      </main>
      <Footer />
    </>
  );
}
