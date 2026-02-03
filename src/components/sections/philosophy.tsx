import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { philosophyPoints } from '@/lib/constants';

export function Philosophy() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl space-y-8">
          {philosophyPoints.map((point, index) => (
            <div
              key={index}
              className={`pt-8 ${
                index > 0 ? 'border-t border-gray-200' : ''
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-dark mb-3">
                {point.title}
              </h3>
              <p className="text-lg font-body text-gray leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

