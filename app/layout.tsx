import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/layout/PageTransition";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madheeha Banu — Full Stack Developer",
  description:
    "Full Stack Developer crafting digital experiences that matter. BICT Honours student at University of Vavuniya, Sri Lanka.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Sri Lanka", "Madheeha Banu"],
  openGraph: {
    title: "Madheeha Banu — Full Stack Developer",
    description: "Crafting digital experiences that matter",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} ${rajdhani.variable} noise-overlay antialiased`}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
