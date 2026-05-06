import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { GlassNav } from "@/components/GlassNav";
import { BrushCursor } from "@/components/BrushCursor";
import { site } from "@/data/site";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
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
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-canvas font-sans text-canvas-ink antialiased">
        <AppProviders>
          <GlassNav />
          {children}
          <BrushCursor />
        </AppProviders>
      </body>
    </html>
  );
}
