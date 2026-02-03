import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { portfolioProjects } from '@/lib/constants';

export function PortfolioGrid() {
  return (
    <Section className="bg-light">
      <Container>
        <div className="space-y-12 md:space-y-16">
          {portfolioProjects.map((project, index) => {
            const isEven = index % 2 === 1;
            const imageOrder = isEven ? 'md:order-2' : 'md:order-1';
            const contentOrder = isEven ? 'md:order-1' : 'md:order-2';

            return (
              <div
                key={project.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                {/* Image placeholder */}
                <div className={`${imageOrder}`}>
                  <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${contentOrder}`}>
                  <div>
                    <div className="text-sm text-gray font-body mb-2">
                      {project.category}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-6">
                      {project.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-dark mb-2">Problem</h3>
                      <p className="font-body text-gray">{project.problem}</p>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-dark mb-2">Solution</h3>
                      <p className="font-body text-gray">{project.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-dark mb-2">Result</h3>
                      <p className="font-body text-gray">{project.result}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-100 text-dark text-sm font-body rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

