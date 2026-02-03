interface LatestUpdateCardProps {
  lastUpdate: string;
  lastUpdateDate: string;
}

export function LatestUpdateCard({ lastUpdate, lastUpdateDate }: LatestUpdateCardProps) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 bg-white border-l-4 border-l-accent">
      <h3 className="text-lg font-display font-bold text-dark mb-3">
        Latest Update
      </h3>
      <p className="font-body text-dark mb-2">
        {lastUpdate}
      </p>
      <p className="text-sm font-body text-gray">
        {lastUpdateDate}
      </p>
    </div>
  );
}

