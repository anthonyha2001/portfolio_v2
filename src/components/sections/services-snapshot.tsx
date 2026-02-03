import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { servicesSnapshot } from '@/lib/constants';

export function ServicesSnapshot() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {servicesSnapshot.map((service, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl md:text-2xl font-display font-bold text-dark mb-2">
                {service.title}
              </h3>
              <div className="text-2xl md:text-3xl font-display font-bold text-accent mb-4">
                {service.price}
              </div>
              <p className="text-gray font-body">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

