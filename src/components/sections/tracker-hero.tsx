import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { intakeTracker } from '@/lib/constants';

export function TrackerHero() {
  return (
    <Section>
      <Container>
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark">
            {intakeTracker.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray font-body">
            {intakeTracker.subheadline}
          </p>
        </div>
      </Container>
    </Section>
  );
}

