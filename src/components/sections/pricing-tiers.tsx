import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { serviceTiers } from '@/lib/constants';

export function PricingTiers() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {serviceTiers.map((tier, index) => (
            <div
              key={index}
              className={`border rounded-lg p-6 md:p-8 relative ${
                tier.popular
                  ? 'border-accent border-2'
                  : 'border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-body font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-dark mb-2">
                    {tier.name}
                  </h3>
                  <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                    {tier.price}
                  </div>
                  <p className="text-gray font-body">{tier.description}</p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-dark mb-3">Includes</h4>
                  <ul className="space-y-2 mb-6">
                    {tier.includes.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-green-600 text-lg font-bold mt-0.5">✓</span>
                        <span className="font-body text-dark">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-display font-bold text-dark mb-3">Not included</h4>
                  <ul className="space-y-2">
                    {tier.notIncluded.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-gray-400 text-lg font-bold mt-0.5">✗</span>
                        <span className="font-body text-gray">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact" className="block">
                  <Button variant={tier.popular ? 'primary' : 'outline'} size="md" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

