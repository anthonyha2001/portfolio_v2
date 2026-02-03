import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { whatHappensAfterContact } from '@/lib/constants';

export function WhatHappensNext() {
  return (
    <Section className="bg-light">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {whatHappensAfterContact.map((item, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-display font-bold mb-4 mx-auto md:mx-0">
                {item.step}
              </div>
              <h3 className="text-xl font-display font-bold text-dark mb-2">
                {item.title}
              </h3>
              <p className="text-gray font-body">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

