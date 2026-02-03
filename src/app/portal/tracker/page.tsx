import type { Metadata } from 'next';
import { trackerMockData } from '@/lib/constants';
import { WaitingIndicator } from '@/components/portal/waiting-indicator';
import { TrackerTimeline } from '@/components/portal/tracker-timeline';
import { TrackerLegend } from '@/components/portal/tracker-legend';
import { StageDetailCard } from '@/components/portal/stage-detail-card';

export const metadata: Metadata = {
  title: 'Project Tracker | Client Portal',
  description: 'Follow your project from intake to launch. Track progress at every stage.',
};

export default function TrackerPage() {
  const currentStageData = trackerMockData.stages.find(
    (stage) => stage.id === trackerMockData.currentStage
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">
          Project Tracker
        </h1>
        <p className="text-gray font-body">
          Follow your project from intake to launch.
        </p>
      </div>

      <WaitingIndicator
        waitingOnClient={trackerMockData.waitingOnClient}
        waitingReason={trackerMockData.waitingReason}
      />

      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
        <TrackerTimeline stages={trackerMockData.stages} />
        <TrackerLegend />
      </div>

      {currentStageData && (
        <StageDetailCard currentStage={currentStageData} />
      )}
    </div>
  );
}

