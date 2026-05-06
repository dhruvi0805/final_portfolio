import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Playfair_Display } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { GlassNav } from "@/components/GlassNav";
import { StarryBackground } from "@/components/StarryBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { site } from "@/data/site";
import "./globals.css";

const sans = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400"],
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — UX Portfolio`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="min-h-screen bg-night-black font-sans text-star-cream antialiased">
        <StarryBackground />
        <AppProviders>
          <GlassNav />
          <div className="relative z-[2]">{children}</div>
          <CustomCursor />
        </AppProviders>
      </body>
    </html>
  );
}
