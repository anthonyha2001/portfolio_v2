import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export function HomeCTA() {
  return (
    <Section className="bg-[#1C2343] text-white">
      <Container>
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            Ready to launch?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-body">
            Get your website in 72 hours.
          </p>
          <div>
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

