'use client';

import { useState } from 'react';

interface WaitingToggleProps {
  waitingOnClient: boolean;
  waitingReason: string;
  onWaitingChange?: (waiting: boolean, reason: string) => void;
}

export function WaitingToggle({
  waitingOnClient: initialWaiting,
  waitingReason: initialReason,
  onWaitingChange,
}: WaitingToggleProps) {
  const [waitingOnClient, setWaitingOnClient] = useState(initialWaiting);
  const [waitingReason, setWaitingReason] = useState(initialReason);

  const handleToggle = (checked: boolean) => {
    setWaitingOnClient(checked);
    if (onWaitingChange) {
      onWaitingChange(checked, waitingReason);
    }
  };

  const handleReasonChange = (reason: string) => {
    setWaitingReason(reason);
    if (onWaitingChange) {
      onWaitingChange(waitingOnClient, reason);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
      <h2 className="text-xl font-display font-bold text-dark mb-4">Client Status</h2>
      
      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={waitingOnClient}
            onChange={(e) => handleToggle(e.target.checked)}
            className="w-5 h-5 text-accent rounded focus:ring-2 focus:ring-accent"
          />
          <span className="font-body text-dark">Waiting on Client</span>
        </label>

        {waitingOnClient && (
          <div>
            <label className="block text-sm font-body font-medium text-dark mb-2">
              Waiting Reason
            </label>
            <input
              type="text"
              value={waitingReason}
              onChange={(e) => handleReasonChange(e.target.value)}
              placeholder="What are you waiting for?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        )}
      </div>
    </div>
  );
}

