import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export function PricingCTA() {
  return (
    <Section>
      <Container>
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark">
            Not sure which plan?
          </h2>
          <p className="text-lg md:text-xl text-gray font-body">
            Reach out and I&apos;ll help you decide.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

