import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { AnimationShowcase } from "@/components/AnimationShowcase";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WorkGrid />
      <AnimationShowcase />
      <ContactSection />
    </main>
  );
}
