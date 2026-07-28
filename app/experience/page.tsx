"use client";
import Experience from "@/components/sections/Experience";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/layout/ScrollReveal";

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <ScrollReveal />
      <main style={{ paddingTop: "0" }}>
        <Experience />
      </main>
      <Footer />
    </>
  );
}
