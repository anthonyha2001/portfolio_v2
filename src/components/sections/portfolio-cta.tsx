import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export function PortfolioCTA() {
  return (
    <Section>
      <Container>
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark">
            Want results like these?
          </h2>
          <p className="text-lg md:text-xl text-gray font-body">
            Let&apos;s build your website.
          </p>
          <div className="pt-4">
            <Link href="/start-project">
              <Button variant="primary" size="lg">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

