'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProjectHeaderProps {
  projectName: string;
  clientName: string;
  clientEmail: string;
  status: string;
  onProjectNameChange?: (newName: string) => void;
}

export function ProjectHeader({
  projectName,
  clientName,
  clientEmail,
  status,
  onProjectNameChange,
}: ProjectHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(projectName);

  const getStatusBadge = () => {
    const config = {
      active: { label: 'Active', className: 'bg-blue-100 text-blue-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' },
    };
    const statusConfig = config[status as keyof typeof config] || config.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-body font-medium ${statusConfig.className}`}>
        {statusConfig.label}
      </span>
    );
  };

  const handleSave = () => {
    if (onProjectNameChange) {
      onProjectNameChange(editedName);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(projectName);
    setIsEditing(false);
  };

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-3xl md:text-4xl font-display font-bold text-dark border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                autoFocus
              />
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">
              {projectName}
            </h1>
          )}
          <div className="text-gray font-body mb-2">
            {clientName} • {clientEmail}
          </div>
          {getStatusBadge()}
        </div>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit Project Name
          </Button>
        )}
      </div>
    </div>
  );
}

