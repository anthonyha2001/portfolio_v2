import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { trustClosing } from '@/lib/constants';

export function AboutCTA() {
  return (
    <Section>
      <Container>
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl font-body text-dark leading-relaxed">
            {trustClosing}
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Let&apos;s Talk
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

