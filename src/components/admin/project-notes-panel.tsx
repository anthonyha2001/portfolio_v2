'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Note {
  id: string;
  content: string;
  timestamp: string;
}

interface ProjectNotesPanelProps {
  notes?: Note[];
  onNoteAdd?: (note: string) => void;
}

export function ProjectNotesPanel({ notes: initialNotes = [], onNoteAdd }: ProjectNotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote,
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
      };
      setNotes([note, ...notes]);
      if (onNoteAdd) {
        onNoteAdd(newNote);
      }
      setNewNote('');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-display font-bold text-dark mb-4">Project Notes</h2>
      
      <div className="space-y-4">
        <div>
          <textarea
            rows={3}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent resize-y"
          />
          <div className="mt-2">
            <Button variant="primary" size="sm" onClick={handleAddNote}>
              Add Note
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="border border-gray-200 rounded-md p-3">
              <p className="font-body text-dark mb-1">{note.content}</p>
              <p className="text-xs font-body text-gray">{note.timestamp}</p>
            </div>
          ))}
          {notes.length === 0 && (
            <p className="text-sm font-body text-gray italic">No notes yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

