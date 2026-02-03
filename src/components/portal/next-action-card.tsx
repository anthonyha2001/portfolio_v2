interface NextActionCardProps {
  nextAction: string;
  waitingOnClient?: boolean;
}

export function NextActionCard({ nextAction, waitingOnClient = false }: NextActionCardProps) {
  return (
    <div className={`p-6 rounded-lg border ${
      waitingOnClient
        ? 'bg-yellow-50 border-yellow-200'
        : 'bg-accent/10 border-accent/20'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          waitingOnClient
            ? 'bg-yellow-200 text-yellow-800'
            : 'bg-accent text-white'
        }`}>
          {waitingOnClient ? '!' : '→'}
        </div>
        <div className="flex-1">
          {waitingOnClient && (
            <span className="inline-block px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-body font-medium rounded mb-2">
              Action Required
            </span>
          )}
          <h3 className="text-lg font-display font-bold text-dark mb-2">
            Next Step
          </h3>
          <p className="font-body text-gray">
            {nextAction}
          </p>
        </div>
      </div>
    </div>
  );
}

