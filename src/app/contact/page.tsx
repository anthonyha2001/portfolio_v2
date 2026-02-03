import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ContactHero } from '@/components/sections/contact-hero';
import { ContactForm } from '@/components/forms/contact-form';
import { ContactExpectation } from '@/components/sections/contact-expectation';

export const metadata: Metadata = {
  title: 'Contact | Anthony Hasrouny',
  description: 'Get in touch to start your website project. Fill out the form and receive access to your client portal within 24 hours.',
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Form - takes 2/3 width on desktop */}
            <div className="md:col-span-2">
              <ContactForm />
            </div>
            
            {/* Expectation - takes 1/3 width on desktop */}
            <div className="md:col-span-1">
              <ContactExpectation />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

