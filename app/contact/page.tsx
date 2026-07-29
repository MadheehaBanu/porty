"use client";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/layout/ScrollReveal";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

export default function ContactPage() {
  return (
    <div style={{ position: "relative" }}>
      <AnimatedBackground />
      <Navbar />
      <ScrollReveal />
      <main style={{ paddingTop: "0", position: "relative", zIndex: 1 }}>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
