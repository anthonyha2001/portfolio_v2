import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { hero, speedProofStats } from '@/lib/constants';
import { HeroParticles } from '@/components/hero/hero-particles';

export function Hero() {
  return (
    <section className="bg-light relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Mobile background image */}
      <div 
        className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat z-[1]"
        style={{ backgroundImage: "url('/background_hero_mobile_03.png')" }}
      />
      {/* Desktop background image */}
      <div 
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat z-[1]"
        style={{ backgroundImage: "url('/background_color_desktop.png')" }}
      />
      <div className="absolute inset-0 z-[2]">
        <HeroParticles />
      </div>
      <Container>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="backdrop-blur-md bg-white/20 md:bg-white/30 rounded-2xl md:rounded-3xl border border-white/30 shadow-xl p-6 md:p-8 lg:p-10 space-y-5">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-dark leading-tight">
              {hero.headline}
            </h1>
            <p className="text-base md:text-lg text-gray font-body max-w-2xl">
              {hero.subheadline}
            </p>
            <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Link href="/start-project">
                <Button variant="primary" size="lg" className="font-semibold px-7 py-3 rounded-lg">
                  {hero.cta}
                </Button>
              </Link>
              <div className="flex flex-row items-center gap-2 text-sm font-body text-gray-500">
                <Link
                  href="/services"
                  className="transition-colors hover:text-accent hover:underline underline-offset-4"
                >
                  Services
                </Link>
                <span className="hidden sm:inline text-gray-300">•</span>
                <Link
                  href="/portfolio"
                  className="transition-colors hover:text-accent hover:underline underline-offset-4"
                >
                  View portfolio
                </Link>
              </div>
            </div>

            {/* Metrics bullets */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4">
              {speedProofStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-sm"
                >
                  {index === 0 && (
                    <svg
                      className="w-3.5 h-3.5 md:w-5 md:h-5 text-accent mt-[1px] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 7h10M7 11h6M5 5h14a1 1 0 0 1 1 1v12.5a.5.5 0 0 1-.85.35L16 16H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg
                      className="w-3.5 h-3.5 md:w-5 md:h-5 text-accent mt-[1px] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg
                      className="w-3.5 h-3.5 md:w-5 md:h-5 text-accent mt-[1px] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l4 4 10-10" />
                      <path d="M5 5h5M5 19h5" />
                    </svg>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-[11px] tracking-[0.08em] uppercase font-body text-gray-500">
                      {stat.label}
                    </span>
                    <span className="text-sm font-semibold text-[#1C2343]">
                      {stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

