import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { intakeFormPreviewSections } from '@/lib/constants';

export function IntakePreview() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-8 text-center">
            What You&apos;ll Answer
          </h2>
          <ul className="space-y-3 mb-8">
            {intakeFormPreviewSections.map((section, index) => (
              <li
                key={index}
                className="pl-4 border-l-4 border-accent py-2"
              >
                <span className="font-body text-dark">{section}</span>
              </li>
            ))}
          </ul>
          <div className="text-center p-4 bg-light rounded-lg border border-gray-200">
            <p className="text-gray font-body italic">
              Save progress anytime. Edit until you&apos;re ready to submit.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

