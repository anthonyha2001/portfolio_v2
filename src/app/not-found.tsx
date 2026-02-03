import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <Container>
        <Section>
          <div className="text-center space-y-6 max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark">
              Page Not Found
            </h1>
            <p className="text-lg font-body text-gray">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/">
              <Button variant="primary" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </Section>
      </Container>
    </div>
  );
}

