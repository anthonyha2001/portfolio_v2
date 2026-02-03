'use client';

import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { processSteps } from '@/lib/constants';

export function ProcessOverview() {
  return (
    <Section className="bg-[#F5FAFF]">
      <Container>
        {/* Desktop: Horizontal layout */}
        <div className="hidden md:flex items-center justify-between relative max-w-4xl mx-auto">
          {/* Dashed line behind circles */}
          <div className="absolute top-8 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] border-t-2 border-dashed border-gray-300 -z-10" />

          {processSteps.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1 relative">
              {/* Step circle */}
              <div
                className="w-16 h-16 rounded-full border-2 border-accent bg-[#FCFEF9] flex items-center justify-center text-2xl font-display font-bold text-accent mb-4"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {item.step}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray font-body">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical layout */}
        <div className="md:hidden space-y-8 relative pl-8">
          {/* Vertical dashed line */}
          <div className="absolute left-4 top-4 bottom-4 border-l-2 border-dashed border-gray-300 -z-10" />

          {processSteps.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4">
              {/* Step circle */}
              <div
                className="w-12 h-12 rounded-full border-2 border-accent bg-[#FCFEF9] flex items-center justify-center text-xl font-display font-bold text-accent flex-shrink-0"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {item.step}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-display font-bold text-dark mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray font-body">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
