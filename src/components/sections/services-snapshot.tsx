import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { servicesSnapshot } from '@/lib/constants';

type IconName = 'code' | 'search' | 'shield' | 'server' | 'zap' | 'plus';

function ServiceIcon({ name }: { name: IconName }) {
  const base = 'w-6 h-6 md:w-7 md:h-7 text-accent';

  switch (name) {
    case 'code':
      return (
        <svg className={base} viewBox="0 0 24 24" aria-hidden="true">
          <polyline
            points="16 18 22 12 16 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="8 6 2 12 8 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'search':
      return (
        <svg className={base} viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="11"
            cy="11"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="16"
            y1="16"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg className={base} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3L5 6v6c0 4.418 2.686 6.955 7 9 4.314-2.045 7-4.582 7-9V6l-7-3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'server':
      return (
        <svg className={base} viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="16"
            height="6"
            rx="1"
            ry="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="4"
            y="14"
            width="16"
            height="6"
            rx="1"
            ry="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="7" r="0.75" fill="currentColor" />
          <circle cx="8" cy="17" r="0.75" fill="currentColor" />
        </svg>
      );
    case 'zap':
      return (
        <svg className={base} viewBox="0 0 24 24" aria-hidden="true">
          <polyline
            points="13 2 4 14 11 14 10 22 20 9 13 9 13 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'plus':
    default:
      return (
        <svg className={base} viewBox="0 0 24 24" aria-hidden="true">
          <line
            x1="12"
            y1="5"
            x2="12"
            y2="19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function ServicesSnapshot() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesSnapshot.map((service, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-6 md:p-7 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <ServiceIcon name={service.icon as IconName} />
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-dark">
                  {service.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray font-body leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

