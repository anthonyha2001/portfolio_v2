import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { addons } from '@/lib/constants';

export function Addons() {
  return (
    <Section className="bg-light">
      <Container>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-8 text-center">
          Add-ons & Integrations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addons.map((addon, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-6 text-left bg-white/90 backdrop-blur-sm"
            >
              <div className="font-display text-base md:text-lg font-semibold text-dark mb-1.5">
                {addon.name}
              </div>
              <div className="text-sm md:text-[0.95rem] text-gray font-body">
                {addon.description}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

