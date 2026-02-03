import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { addons } from '@/lib/constants';

export function Addons() {
  return (
    <Section className="bg-light">
      <Container>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-8 text-center">
          Add-ons & Extras
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {addons.map((addon, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 text-center"
            >
              <div className="font-body text-dark mb-2">{addon.name}</div>
              <div className="text-xl font-display font-bold text-accent">
                {addon.price}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

