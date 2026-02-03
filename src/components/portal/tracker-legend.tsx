export function TrackerLegend() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm font-body text-gray mt-8 pt-6 border-t border-gray-200">
      <span className="font-medium text-dark">Legend:</span>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-accent border-4 border-accent"></div>
        <span>Current</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
        <span>Completed</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300"></div>
        <span>Upcoming</span>
      </div>
    </div>
  );
}

