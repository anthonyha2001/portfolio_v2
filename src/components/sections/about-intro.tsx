import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { aboutIntro } from '@/lib/constants';

export function AboutIntro() {
  return (
    <Section className="bg-light">
      <Container>
        <div className="max-w-3xl">
          <p className="text-lg md:text-xl font-body text-dark leading-relaxed">
            {aboutIntro}
          </p>
        </div>
      </Container>
    </Section>
  );
}

