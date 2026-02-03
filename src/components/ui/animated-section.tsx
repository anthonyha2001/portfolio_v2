'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/components/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className={`py-16 md:py-24 animate-on-scroll ${className}`}>
      {children}
    </section>
  );
}

