import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { Hero } from '@/components/sections/hero';
import { LocalBusinessJsonLd } from '@/components/seo/json-ld';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Lazy load below-the-fold sections
const WhoItsFor = nextDynamic(() => import('@/components/sections/who-its-for').then(mod => ({ default: mod.WhoItsFor })), {
  loading: () => <div className="py-16" />,
});
const ServicesSnapshot = nextDynamic(() => import('@/components/sections/services-snapshot').then(mod => ({ default: mod.ServicesSnapshot })), {
  loading: () => <div className="py-16" />,
});
const ProcessOverview = nextDynamic(() => import('@/components/sections/process-overview').then(mod => ({ default: mod.ProcessOverview })), {
  loading: () => <div className="py-16" />,
});
const HomeCTA = nextDynamic(() => import('@/components/sections/home-cta').then(mod => ({ default: mod.HomeCTA })), {
  loading: () => <div className="py-16" />,
});

export const metadata: Metadata = {
  title: 'Premium Websites. $150. 72 Hours. | Anthony Hasrouny',
  description: 'Fast, affordable, no-nonsense web development for businesses that need to launch now. Premium websites delivered in 72 hours.',
};

export default function Home() {
  return (
    <main>
      <LocalBusinessJsonLd />
      <Hero />
      <WhoItsFor />
      <ServicesSnapshot />
      <ProcessOverview />
      <HomeCTA />
    </main>
  );
}
