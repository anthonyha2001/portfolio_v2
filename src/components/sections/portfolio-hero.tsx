import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export function PortfolioHero() {
  return (
    <Section>
      <Container>
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark">
            Work That Speaks
          </h1>
          <p className="text-lg md:text-xl text-gray font-body">
            Real projects. Real results. All delivered in 72 hours or less.
          </p>
        </div>
      </Container>
    </Section>
  );
}

