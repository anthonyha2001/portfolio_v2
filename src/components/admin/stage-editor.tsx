'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Stage {
  id: number;
  name: string;
  status: string;
  completedDate?: string;
  startedDate?: string;
  note?: string | null;
}

interface StageEditorProps {
  stages: Stage[];
  onStagesChange?: (stages: Stage[]) => void;
}

export function StageEditor({ stages: initialStages, onStagesChange }: StageEditorProps) {
  const [stages, setStages] = useState<Stage[]>(initialStages);

  const handleStatusChange = (stageId: number, newStatus: 'upcoming' | 'current' | 'completed') => {
    const updatedStages = stages.map((stage) => {
      if (stage.id === stageId) {
        if (newStatus === 'current') {
          // Set this stage to current
          return {
            ...stage,
            status: 'current',
            startedDate: stage.startedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          };
        } else if (newStatus === 'completed') {
          // Set this stage to completed
          return {
            ...stage,
            status: 'completed',
            completedDate: stage.completedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          };
        } else {
          // Set to upcoming
          return {
            ...stage,
            status: 'upcoming',
            completedDate: undefined,
            startedDate: undefined,
          };
        }
      } else if (newStatus === 'current') {
        // If setting a stage to current, update others accordingly
        if (stage.id < stageId) {
          // Previous stages become completed
          return {
            ...stage,
            status: 'completed',
            completedDate: stage.completedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          };
        } else {
          // Following stages become upcoming
          return {
            ...stage,
            status: 'upcoming',
            completedDate: undefined,
            startedDate: undefined,
          };
        }
      }
      return stage;
    });

    setStages(updatedStages);
  };

  const handleDateChange = (stageId: number, date: string) => {
    const updatedStages = stages.map((stage) => {
      if (stage.id === stageId) {
        if (stage.status === 'completed') {
          return { ...stage, completedDate: date };
        } else if (stage.status === 'current') {
          return { ...stage, startedDate: date };
        }
      }
      return stage;
    });
    setStages(updatedStages);
  };

  const handleNoteChange = (stageId: number, note: string) => {
    const updatedStages = stages.map((stage) => {
      if (stage.id === stageId) {
        return { ...stage, note: note || null };
      }
      return stage;
    });
    setStages(updatedStages);
  };

  const handleSave = () => {
    if (onStagesChange) {
      onStagesChange(stages);
    }
    console.log('Stages saved:', stages);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-display font-bold text-dark mb-6">Stage Editor</h2>
      
      <div className="space-y-6">
        {stages.map((stage) => (
          <div key={stage.id} className="border border-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <h3 className="text-lg font-display font-bold text-dark mb-3">
                {stage.id}. {stage.name}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-body font-medium text-dark mb-1">
                    Status
                  </label>
                  <select
                    value={stage.status}
                    onChange={(e) => handleStatusChange(stage.id, e.target.value as 'upcoming' | 'current' | 'completed')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="current">Current</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {(stage.status === 'completed' || stage.status === 'current') && (
                  <div>
                    <label className="block text-sm font-body font-medium text-dark mb-1">
                      {stage.status === 'completed' ? 'Completion Date' : 'Start Date'}
                    </label>
                    <input
                      type="text"
                      value={stage.status === 'completed' ? (stage.completedDate || '') : (stage.startedDate || '')}
                      onChange={(e) => handleDateChange(stage.id, e.target.value)}
                      placeholder="Jan 15, 2024"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-body font-medium text-dark mb-1">
                    Note
                  </label>
                  <textarea
                    rows={2}
                    value={stage.note || ''}
                    onChange={(e) => handleNoteChange(stage.id, e.target.value)}
                    placeholder="Add a note..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <Button variant="primary" size="md" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

