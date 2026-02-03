import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { whoItsFor } from '@/lib/constants';

export function WhoItsFor() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-50 border border-green-100 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-dark text-center">
              Who it&apos;s for
            </h2>
            <ul className="space-y-3">
              {whoItsFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-body text-dark">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
