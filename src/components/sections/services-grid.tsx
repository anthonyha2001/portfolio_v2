import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { serviceTiers } from '@/lib/constants';

export function ServicesGrid() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {serviceTiers.map((tier, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-6 md:p-7 bg-white/80 backdrop-blur-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-dark mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray font-body">
                    {tier.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-semibold text-dark mb-2 text-sm md:text-base">
                    Includes
                  </h4>
                  <ul className="space-y-1.5">
                    {tier.includes.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 text-sm md:text-[0.95rem]"
                      >
                        <span className="text-green-600 text-lg font-bold mt-0.5">
                          ✓
                        </span>
                        <span className="font-body text-dark">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/contact"
                  className="text-sm md:text-[0.95rem] font-body text-accent hover:text-accent/80 underline-offset-4 hover:underline"
                >
                  Contact for quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}


