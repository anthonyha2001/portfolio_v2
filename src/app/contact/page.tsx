import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ContactForm } from '@/components/forms/contact-form';
import { SocialCards } from '@/components/sections/social-cards';

export const metadata: Metadata = {
  title: 'Contact | Anthony Hasrouny',
  description:
    'Get in touch to start your project. Follow me on social media or send a message.',
};

export default function ContactPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">
              Let&apos;s Work Together
            </h1>
            <p className="text-lg text-gray max-w-2xl mx-auto font-body">
              Have a project in mind? Get in touch and let&apos;s make it
              happen.
            </p>
          </div>

          {/* Social Cards */}
          <SocialCards />

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-dark text-center mb-8">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}

