import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { clientResponsibilities } from '@/lib/constants';

export function ClientResponsibilities() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-8 text-center">
            Your Part in This
          </h2>
          <ul className="space-y-4 mb-8">
            {clientResponsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent text-xl font-bold mt-0.5">→</span>
                <span className="font-body text-dark text-lg">{responsibility}</span>
              </li>
            ))}
          </ul>
          <div className="text-center p-4 bg-light rounded-lg border border-gray-200">
            <p className="text-gray font-body italic">
              Miss a deadline on your end? The 72-hour clock pauses.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

