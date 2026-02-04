import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ServicesGrid } from '@/components/sections/services-grid';
import { Addons } from '@/components/sections/addons';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Services | Anthony Hasrouny',
  description:
    'Web development, SEO optimization, hosting, maintenance, and more. Custom solutions for your business.',
};

export default function ServicesPage() {
  return (
    <main>
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">
              Services
            </h1>
            <p className="text-lg md:text-xl text-gray font-body">
              Everything you need to succeed online.
            </p>
          </div>
        </Container>
      </Section>

      <ServicesGrid />
      <Addons />

      <Section>
        <Container>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark">
              Not sure what you need? Let&apos;s talk.
            </h2>
            <p className="text-base md:text-lg text-gray font-body">
              Share a bit about your business and I&apos;ll recommend the right
              setup for your goals and budget.
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Contact me
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

