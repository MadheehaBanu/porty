"use client";
import About from "@/components/sections/About";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/layout/ScrollReveal";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <ScrollReveal />
      <main style={{ paddingTop: "0" }}>
        <About />
      </main>
      <Footer />
    </>
  );
}
