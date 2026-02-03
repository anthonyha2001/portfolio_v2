import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { about } from '@/lib/constants';

export function AboutHero() {
  return (
    <Section>
      <Container>
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark mb-4">
            {about.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray font-body">
            {about.subheadline}
          </p>
        </div>
      </Container>
    </Section>
  );
}

