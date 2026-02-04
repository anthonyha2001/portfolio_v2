import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../../lib/auth';
import { getSupabase } from '../../../../lib/supabase';
import { projectStages } from '@/lib/constants';
import { WaitingIndicator } from '@/components/portal/waiting-indicator';
import { TrackerTimeline } from '@/components/portal/tracker-timeline';
import { TrackerLegend } from '@/components/portal/tracker-legend';
import { StageDetailCard } from '@/components/portal/stage-detail-card';

export const metadata: Metadata = {
  title: 'Project Tracker | Client Portal',
  description: 'Follow your project from intake to launch. Track progress at every stage.',
};

export default async function TrackerPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  // Fetch user from Supabase
  let user: { id?: string } | null = null;
  try {
    const supabase = getSupabase();
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .maybeSingle();
    user = userData as { id?: string } | null;
  } catch {
    // Supabase not configured
  }

  // Fetch user's project
  let project: { id?: string; current_stage?: number } | null = null;
  if (user?.id) {
    try {
      const supabase = getSupabase();
      const { data: projectData } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      project = projectData as { id?: string; current_stage?: number } | null;
    } catch {
      // Continue without project
    }
  }

  // Build stages array from project data
  const currentStage = project?.current_stage ?? 0;
  const stages: Array<{
    id: number;
    name: string;
    status: 'completed' | 'current' | 'upcoming';
    completedDate?: string;
    startedDate?: string;
    note: string | null;
  }> = projectStages.map((stage) => {
    if (stage.id < currentStage) {
      return {
        id: stage.id,
        name: stage.name,
        status: 'completed' as const,
        completedDate: new Date().toLocaleDateString(),
        note: null,
      };
    } else if (stage.id === currentStage) {
      return {
        id: stage.id,
        name: stage.name,
        status: 'current' as const,
        startedDate: new Date().toLocaleDateString(),
        note: null,
      };
    } else {
      return {
        id: stage.id,
        name: stage.name,
        status: 'upcoming' as const,
        note: null,
      };
    }
  });

  // Fetch latest project note for current stage
  if (project?.id && currentStage > 0) {
    try {
      const supabase = getSupabase();
      const { data: noteData } = await supabase
        .from('project_notes')
        .select('*')
        .eq('project_id', project.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (noteData) {
        const note = noteData as { content?: string; created_at?: string } | null;
        const stageIndex = stages.findIndex((s) => s.id === currentStage);
        if (stageIndex >= 0) {
          stages[stageIndex].note = note?.content || null;
        }
      }
    } catch {
      // Continue without note
    }
  }

  const currentStageData = stages.find((stage) => stage.id === currentStage);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">
            Project Tracker
          </h1>
          <p className="text-gray font-body">
            Follow your project from intake to launch.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray font-body">
            No active project found. Contact us to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">
          Project Tracker
        </h1>
        <p className="text-gray font-body">
          Follow your project from intake to launch.
        </p>
      </div>

      <WaitingIndicator
        waitingOnClient={false}
        waitingReason={null}
      />

      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
        <TrackerTimeline stages={stages} />
        <TrackerLegend />
      </div>

      {currentStageData && (
        <StageDetailCard currentStage={currentStageData} />
      )}
    </div>
  );
}
