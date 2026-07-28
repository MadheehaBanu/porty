"use client";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/layout/ScrollReveal";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ScrollReveal />
      <main style={{ paddingTop: "0" }}>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
