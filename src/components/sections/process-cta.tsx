import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export function ProcessCTA() {
  return (
    <Section className="bg-dark text-white">
      <Container>
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            Ready to start the clock?
          </h2>
          <div className="pt-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Begin Your Project
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

