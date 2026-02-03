interface StageDetailCardProps {
  currentStage: {
    id: number;
    name: string;
    status: string;
    startedDate?: string;
    note?: string | null;
  };
}

export function StageDetailCard({ currentStage }: StageDetailCardProps) {
  if (currentStage.status !== 'current') {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
      <h3 className="text-2xl font-display font-bold text-dark mb-4">
        Current: {currentStage.name}
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-display font-bold text-dark mb-2">What&apos;s happening</h4>
          <p className="font-body text-gray">
            {currentStage.note || 'Work is in progress on this stage.'}
          </p>
        </div>

        {currentStage.startedDate && (
          <div>
            <h4 className="font-display font-bold text-dark mb-2">Started</h4>
            <p className="font-body text-gray">{currentStage.startedDate}</p>
          </div>
        )}

        <div>
          <h4 className="font-display font-bold text-dark mb-2">Estimated completion</h4>
          <p className="font-body text-gray">Within 24-48 hours</p>
        </div>

        <div>
          <h4 className="font-display font-bold text-dark mb-2">Preview & Deliverables</h4>
          <div className="space-y-2">
            <div className="p-3 bg-light border border-gray-200 rounded-md">
              <p className="font-body text-sm text-gray">Design preview will be available here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

