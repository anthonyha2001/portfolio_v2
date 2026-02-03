import type { Metadata } from 'next';
import { PortfolioHero } from '@/components/sections/portfolio-hero';
import { PortfolioGrid } from '@/components/sections/portfolio-grid';
import { PortfolioCTA } from '@/components/sections/portfolio-cta';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Portfolio | Anthony Hasrouny',
  description: 'Real projects, real results. See websites delivered in 72 hours or less for cafés, gyms, and local businesses.',
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioCTA />
    </main>
  );
}

