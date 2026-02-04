import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { PublicIntakeForm } from '@/components/forms/public-intake-form';

export const metadata: Metadata = {
  title: 'Start Your Project | Anthony Hasrouny',
  description:
    'Share your project details and get a custom website plan. No login required.',
};

export default function StartProjectPage() {
  return (
    <Section className="pt-24 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">
              Start Your Project
            </h1>
            <p className="text-gray font-body">
              Tell me about your business and what you need. I&apos;ll review
              your answers and get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <PublicIntakeForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}


