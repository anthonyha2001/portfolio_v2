import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { PricingTiers } from '@/components/sections/pricing-tiers';
import { Addons } from '@/components/sections/addons';
import { PricingCTA } from '@/components/sections/pricing-cta';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Services & Pricing | Anthony Hasrouny',
  description: 'Affordable website packages starting at $150. Starter Site, Business Site, and Custom Build options. All delivered in 72 hours.',
};

export default function ServicesPage() {
  return (
    <main>
      <Section>
        <Container>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark text-center mb-8">
            Services & Pricing
          </h1>
        </Container>
      </Section>
      <PricingTiers />
      <Addons />
      <PricingCTA />
    </main>
  );
}

