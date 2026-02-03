import type { Metadata } from 'next';
import { ProcessHero } from '@/components/sections/process-hero';
import { ClientResponsibilities } from '@/components/sections/client-responsibilities';
import { WhySpeed } from '@/components/sections/why-speed';
import { ProcessCTA } from '@/components/sections/process-cta';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: '72-Hour Process | Anthony Hasrouny',
  description: 'Learn how we deliver premium websites in 72 hours. Day-by-day breakdown of the fast, efficient development process.',
};

export default function ProcessPage() {
  return (
    <main>
      <ProcessHero />
      <ClientResponsibilities />
      <WhySpeed />
      <ProcessCTA />
    </main>
  );
}

