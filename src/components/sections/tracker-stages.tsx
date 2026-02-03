import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { trackerStages } from '@/lib/constants';

export function TrackerStages() {
  return (
    <Section className="bg-light">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-8 text-center">
            Project Tracker
          </h2>
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            <div className="space-y-8">
              {trackerStages.map((stage) => {
                const isCurrent = stage.current;
                const isPast = stage.stage < 3;
                
                return (
                  <div key={stage.stage} className="relative flex items-start gap-6">
                    {/* Stage number circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-display font-bold flex-shrink-0 relative z-10 ${
                        isCurrent
                          ? 'bg-accent text-white'
                          : isPast
                          ? 'bg-gray-300 text-dark'
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                      }`}
                    >
                      {stage.stage}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3
                        className={`text-xl font-display font-bold mb-1 ${
                          isCurrent ? 'text-accent' : 'text-dark'
                        }`}
                      >
                        {stage.name}
                      </h3>
                      <p className="text-gray font-body">{stage.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

