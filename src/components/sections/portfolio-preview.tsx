import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { portfolioPreview } from '@/lib/constants';

export function PortfolioPreview() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioPreview.map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-dark/5 min-h-[250px] flex items-end transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                <div className="relative p-6 text-white w-full">
                  <p className="text-sm opacity-80 mb-1 font-body">{item.category}</p>
                  <h3 className="text-xl font-display font-bold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

