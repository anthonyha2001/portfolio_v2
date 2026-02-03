'use client';

import { projectStages } from '@/lib/constants';

interface StageProgressProps {
  currentStage: number;
}

export function StageProgress({ currentStage }: StageProgressProps) {
  const currentStageData = projectStages.find((stage) => stage.id === currentStage);

  return (
    <div className="mb-8">
      {/* Desktop: Horizontal Progress */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300"></div>
          
          {/* Stages */}
          <div className="relative flex justify-between">
            {projectStages.map((stage) => {
              const isCompleted = stage.id < currentStage;
              const isCurrent = stage.id === currentStage;
              const isFuture = stage.id > currentStage;

              return (
                <div key={stage.id} className="flex flex-col items-center flex-1">
                  {/* Stage dot */}
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                      isCompleted
                        ? 'bg-accent'
                        : isCurrent
                        ? 'bg-white border-4 border-accent animate-pulse'
                        : 'bg-gray-300'
                    }`}
                  >
                    {isCompleted && (
                      <span className="text-white text-lg font-bold">✓</span>
                    )}
                    {isCurrent && (
                      <span className="text-accent text-lg font-bold">{stage.id}</span>
                    )}
                    {isFuture && (
                      <span className="text-gray-500 text-lg font-bold">{stage.id}</span>
                    )}
                  </div>
                  
                  {/* Stage label */}
                  <div className="mt-2 text-center">
                    <div
                      className={`text-xs font-body ${
                        isCurrent ? 'text-accent font-bold' : 'text-gray-500'
                      }`}
                    >
                      {stage.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Progress */}
      <div className="md:hidden">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          {/* Stages */}
          <div className="space-y-6">
            {projectStages.map((stage) => {
              const isCompleted = stage.id < currentStage;
              const isCurrent = stage.id === currentStage;
              const isFuture = stage.id > currentStage;

              return (
                <div key={stage.id} className="relative flex items-start gap-4">
                  {/* Stage dot */}
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      isCompleted
                        ? 'bg-accent'
                        : isCurrent
                        ? 'bg-white border-4 border-accent animate-pulse'
                        : 'bg-gray-300'
                    }`}
                  >
                    {isCompleted && (
                      <span className="text-white text-lg font-bold">✓</span>
                    )}
                    {isCurrent && (
                      <span className="text-accent text-lg font-bold">{stage.id}</span>
                    )}
                    {isFuture && (
                      <span className="text-gray-500 text-lg font-bold">{stage.id}</span>
                    )}
                  </div>
                  
                  {/* Stage label */}
                  <div className="pt-2">
                    <div
                      className={`font-body ${
                        isCurrent ? 'text-accent font-bold text-lg' : 'text-gray-500'
                      }`}
                    >
                      {stage.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Stage Name */}
      {currentStageData && (
        <div className="mt-6 text-center md:text-left">
          <p className="text-lg font-display font-bold text-accent">
            Current: {currentStageData.name}
          </p>
        </div>
      )}
    </div>
  );
}

