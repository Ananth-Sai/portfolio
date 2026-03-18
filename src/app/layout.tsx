import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import CustomCursor from "../components/CustomCursor";
import CommandPalette from "@/components/CommandPalette";
import EasterEgg from "@/components/EasterEgg";
import GlobalEffects from "@/components/GlobalEffects";
import KillFeed from "@/components/KillFeed";

const bebas = Bebas_Neue({ 
  weight: '400', 
  subsets: ["latin"] 
});

export const metadata = {
  // UPDATED: Your new professional Vercel subdomain
  metadataBase: new URL('https://asv-dev.vercel.app'), 
  title: "Anantha Sai Valluru | Full-Stack Developer",
  description: "Anantha Sai Valluru | Master of Computer Science Graduate from Illinois Tech | Full-Stack Developer specializing in AI-integrated web architectures and interactive UI.",
  keywords: [
    "Anantha Sai Valluru", 
    "Ananth Valluru",
    "Full-Stack Developer", 
    "Illinois Institute of Technology", 
    "Web Development", 
    "React Developer", 
    "Utica NY", 
    "Master of Computer Science",
    "AI Integration"
  ],
  openGraph: {
    title: "Anantha Sai Valluru | Full-Stack Portfolio",
    description: "Master of Computer Science graduate from Illinois Tech specializing in high-performance web applications and tactical UI design.",
    url: "https://asv-dev.vercel.app", 
    siteName: "Ananth Valluru Portfolio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Anantha Sai Valluru Portfolio Tactical HUD Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anantha Sai Valluru | Portfolio",
    description: "Master of Computer Science graduate and Full-Stack Developer.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico", 
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${bebas.className} bg-[#0F1923] text-white cursor-none selection:bg-[#FF4655] selection:text-white overflow-x-hidden w-full relative`}>
        <GlobalEffects />
        <CustomCursor />
        <KillFeed /> 
        <CommandPalette />
        <EasterEgg />
        {children}
      </body>
    </html>
  );
}