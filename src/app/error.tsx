'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <Container>
        <Section>
          <div className="text-center space-y-6 max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark">
              Something went wrong
            </h1>
            <p className="text-lg font-body text-gray">
              An unexpected error occurred. Please try again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={reset}>
                Try again
              </Button>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Go home
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}

