import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { AnimationShowcase } from "@/components/AnimationShowcase";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="section-divider" />
      <WorkGrid />
      <div className="section-divider" />
      <AnimationShowcase />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
