interface WaitingIndicatorProps {
  waitingOnClient: boolean;
  waitingReason: string | null;
}

export function WaitingIndicator({ waitingOnClient, waitingReason }: WaitingIndicatorProps) {
  if (!waitingOnClient) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center flex-shrink-0">
          <span className="text-yellow-800 font-bold">!</span>
        </div>
        <div className="flex-1">
          <p className="font-body text-dark mb-3">
            {waitingReason || 'Action required from you'}
          </p>
          <button className="px-4 py-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 rounded-md transition-colors font-body text-sm font-medium">
            Complete Required Action
          </button>
        </div>
      </div>
    </div>
  );
}

