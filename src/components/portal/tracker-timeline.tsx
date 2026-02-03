interface Stage {
  id: number;
  name: string;
  status: string;
  completedDate?: string;
  startedDate?: string;
  note?: string | null;
}

interface TrackerTimelineProps {
  stages: Stage[];
}

export function TrackerTimeline({ stages }: TrackerTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
      
      <div className="space-y-6">
        {stages.map((stage) => {
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isUpcoming = stage.status === 'upcoming';

          return (
            <div
              key={stage.id}
              className={`relative flex items-start gap-6 p-4 rounded-lg ${
                isCurrent ? 'bg-accent/10' : ''
              }`}
            >
              {/* Stage circle */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-accent'
                      : isCurrent
                      ? 'bg-white border-4 border-accent'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-white text-lg font-bold">✓</span>
                  ) : isCurrent ? (
                    <span className="text-accent text-lg font-bold">{stage.id}</span>
                  ) : (
                    <span className="text-gray-400 text-lg font-bold">{stage.id}</span>
                  )}
                </div>
              </div>

              {/* Stage content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3
                    className={`text-xl font-display font-bold ${
                      isCurrent ? 'text-accent' : isUpcoming ? 'text-gray-400' : 'text-dark'
                    }`}
                  >
                    {stage.name}
                  </h3>
                  {isCurrent && (
                    <span className="px-2 py-1 bg-accent text-white text-xs font-body font-medium rounded">
                      In Progress
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-green-600 text-sm font-body font-medium">
                      Completed
                    </span>
                  )}
                </div>

                {(stage.completedDate || stage.startedDate) && (
                  <p className="text-sm text-gray font-body mt-1">
                    {stage.completedDate || stage.startedDate}
                  </p>
                )}

                {stage.note && (
                  <p className={`text-sm font-body mt-2 ${
                    isUpcoming ? 'text-gray-400' : 'text-gray'
                  }`}>
                    {stage.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

