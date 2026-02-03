'use client';

import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { detailedTimeline } from '@/lib/constants';

export function TimelineDetailed() {
  return (
    <Section className="bg-light">
      <Container>
        {/* Desktop: Horizontal layout */}
        <div className="hidden md:flex items-start justify-between relative max-w-5xl mx-auto">
          {detailedTimeline.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1 relative">
              {/* Connecting dashed line */}
              {index < detailedTimeline.length - 1 && (
                <div className="absolute top-6 left-1/2 right-0 h-0.5 border-t-2 border-dashed border-accent/30" style={{ width: 'calc(100% - 80px)' }}></div>
              )}
              
              {/* Day label */}
              <div className="text-accent font-display font-bold text-sm mb-3">
                {item.day}
              </div>
              
              {/* Card */}
              <div className="border border-gray-200 rounded-lg p-6 bg-white w-full max-w-xs">
                <h3 className="text-xl font-display font-bold text-dark mb-4">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-2">
                      <span className="text-accent text-sm mt-1">•</span>
                      <span className="text-sm font-body text-dark">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical layout */}
        <div className="md:hidden space-y-6 relative pl-8">
          {/* Vertical connecting line */}
          <div className="absolute left-4 top-6 bottom-6 w-0.5 border-l-2 border-dashed border-accent/30"></div>
          
          {detailedTimeline.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4">
              {/* Day label circle */}
              <div className="w-8 h-8 rounded-full border-2 border-accent bg-transparent flex items-center justify-center text-xs font-display font-bold text-accent relative z-10 flex-shrink-0">
                {index + 1}
              </div>
              
              {/* Card */}
              <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-white">
                <div className="text-accent font-display font-bold text-sm mb-2">
                  {item.day}
                </div>
                <h3 className="text-lg font-display font-bold text-dark mb-3">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-2">
                      <span className="text-accent text-sm mt-1">•</span>
                      <span className="text-sm font-body text-dark">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
