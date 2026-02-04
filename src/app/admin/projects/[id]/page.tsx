'use client';

// Mock data removed - will fetch from Supabase via API
const adminProjectDetailMockData: {
  projectName: string;
  clientName: string;
  clientEmail: string;
  status: string;
  stages: Array<{ id: number; name: string; status: string; completedDate?: string; startedDate?: string; note?: string | null }>;
  waitingOnClient: boolean;
  waitingReason: string;
  intakeData: Record<string, unknown>;
} | null = null;
import { ProjectHeader } from '@/components/admin/project-header';
import { StageEditor } from '@/components/admin/stage-editor';
import { WaitingToggle } from '@/components/admin/waiting-toggle';
import { IntakeViewer } from '@/components/admin/intake-viewer';
import { ProjectNotesPanel } from '@/components/admin/project-notes-panel';

export default function ProjectDetailPage() {
  // TODO: Fetch project by ID from Supabase using params.id
  const project = adminProjectDetailMockData;

  if (!project) {
    return (
      <div>
        <p className="text-gray font-body">Project not found.</p>
      </div>
    );
  }

  const handleProjectNameChange = (newName: string) => {
    console.log('Project name changed to:', newName);
  };

  const handleStagesChange = (stages: Array<{ id: number; name: string; status: string; completedDate?: string; startedDate?: string; note?: string | null }>) => {
    console.log('Stages changed:', stages);
  };

  const handleWaitingChange = (waiting: boolean, reason: string) => {
    console.log('Waiting status changed:', waiting, reason);
  };

  const handleNoteAdd = (note: string) => {
    console.log('Note added:', note);
  };

  return (
    <div>
      <ProjectHeader
        projectName={project.projectName}
        clientName={project.clientName}
        clientEmail={project.clientEmail}
        status={project.status}
        onProjectNameChange={handleProjectNameChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <StageEditor
            stages={project.stages}
            onStagesChange={handleStagesChange}
          />
          <WaitingToggle
            waitingOnClient={project.waitingOnClient}
            waitingReason={project.waitingReason || ''}
            onWaitingChange={handleWaitingChange}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <IntakeViewer intakeData={project.intakeData} />
          <ProjectNotesPanel onNoteAdd={handleNoteAdd} />
        </div>
      </div>
    </div>
  );
}

