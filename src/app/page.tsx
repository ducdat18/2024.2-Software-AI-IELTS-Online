import AIFeaturesSection from '@/components/home/ai-feature-section';
import HeroSection from '@/components/home/hero-section';
import SkillsSection from '@/components/home/skill-section';
import TestimonialsSection from '@/components/home/testimonials-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <AIFeaturesSection />
      <TestimonialsSection />
    </>
  );
}
