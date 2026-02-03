import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { whyThisWorks } from '@/lib/constants';

export function WhyItWorks() {
  return (
    <Section className="bg-light">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark">
              {whyThisWorks.title}
            </h2>
          </div>
          <div>
            <ul className="space-y-4">
              {whyThisWorks.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-accent text-xl font-display font-bold mt-0.5">
                    {index + 1}.
                  </span>
                  <span className="font-body text-dark text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

