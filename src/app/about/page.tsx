import type { Metadata } from 'next';
import { AboutHero } from '@/components/sections/about-hero';
import { AboutIntro } from '@/components/sections/about-intro';
import { Philosophy } from '@/components/sections/philosophy';
import { WhyItWorks } from '@/components/sections/why-it-works';
import { AboutCTA } from '@/components/sections/about-cta';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'About | Anthony Hasrouny',
  description: 'Built for speed, priced for reality. Learn about the philosophy behind fast, affordable web development.',
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutIntro />
      <Philosophy />
      <WhyItWorks />
      <AboutCTA />
    </main>
  );
}

