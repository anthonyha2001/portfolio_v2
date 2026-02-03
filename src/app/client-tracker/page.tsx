import type { Metadata } from 'next';
import { TrackerHero } from '@/components/sections/tracker-hero';
import { WhatHappensNext } from '@/components/sections/what-happens-next';
import { IntakePreview } from '@/components/sections/intake-preview';
import { TrackerStages } from '@/components/sections/tracker-stages';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Client Intake & Tracker | Anthony Hasrouny',
  description: 'Learn about the client intake process and project tracking system. Know exactly where your project stands at every step.',
};

export default function ClientTrackerPage() {
  return (
    <main>
      <TrackerHero />
      <WhatHappensNext />
      <IntakePreview />
      <TrackerStages />
    </main>
  );
}

