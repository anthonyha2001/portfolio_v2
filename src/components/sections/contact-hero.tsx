import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { contact } from '@/lib/constants';

export function ContactHero() {
  return (
    <Section>
      <Container>
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark mb-4">
            {contact.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray font-body">
            {contact.subheadline}
          </p>
        </div>
      </Container>
    </Section>
  );
}

