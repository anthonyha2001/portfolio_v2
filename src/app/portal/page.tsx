import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../lib/auth';
import { getSupabase } from '../../../lib/supabase';
import { DashboardHeader } from '@/components/portal/dashboard-header';
import { StageProgress } from '@/components/portal/stage-progress';
import { NextActionCard } from '@/components/portal/next-action-card';
import { LatestUpdateCard } from '@/components/portal/latest-update-card';
import { QuickLinks } from '@/components/portal/quick-links';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Client Portal Dashboard | Anthony Hasrouny',
  description: 'View your project status, track progress, and manage your website project.',
};

export default async function PortalPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  // Fetch user from Supabase
  let user: { id?: string; email?: string } | null = null;
  try {
    const supabase = getSupabase();
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .maybeSingle();
    user = userData as { id?: string; email?: string } | null;
  } catch {
    // Supabase not configured, continue without user data
  }

  // Fetch user's project
  let project: { id?: string; name?: string; status?: string | null; current_stage?: number } | null = null;
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
      project = projectData as { id?: string; name?: string; status?: string | null; current_stage?: number } | null;
    } catch {
      // Continue without project
    }
  }

  // Fetch latest project note if project exists
  let latestNote: { content?: string; created_at?: string } | null = null;
  if (project?.id) {
    try {
      const supabase = getSupabase();
      const { data: note } = await supabase
        .from('project_notes')
        .select('*')
        .eq('project_id', project.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      latestNote = note as { content?: string; created_at?: string } | null;
    } catch {
      // Continue without note
    }
  }

  // Fetch pending invoices count
  let pendingInvoices = 0;
  if (project?.id) {
    try {
      const supabase = getSupabase();
      const { count } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', project.id)
        .eq('status', 'unpaid');
      pendingInvoices = count || 0;
    } catch {
      // Continue with 0
    }
  }

  // Check if intake form is complete
  let intakeComplete = false;
  if (project?.id) {
    try {
      const supabase = getSupabase();
      const { data: intakeData } = await supabase
        .from('intake_forms')
        .select('submitted_at')
        .eq('project_id', project.id)
        .maybeSingle();
      const intake = intakeData as { submitted_at?: string | null } | null;
      intakeComplete = !!intake?.submitted_at;
    } catch {
      // Continue with false
    }
  }

  // Default values if no project exists
  const dashboardData = {
    projectName: project?.name || 'No Active Project',
    status: (project?.status as 'active' | 'paused' | 'completed') || 'active',
    currentStage: project?.current_stage ?? 0,
    nextAction: project && project.current_stage !== undefined ? getNextAction(project.current_stage) : 'Contact us to start your project',
    lastUpdate: latestNote?.content || 'No updates yet',
    lastUpdateDate: latestNote?.created_at ? formatDate(latestNote.created_at) : '',
    intakeComplete,
    invoicesPending: pendingInvoices,
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        session={session}
        projectName={dashboardData.projectName}
        status={dashboardData.status}
      />
      
      {project ? (
        <>
          <StageProgress currentStage={dashboardData.currentStage} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NextActionCard nextAction={dashboardData.nextAction} />
            <LatestUpdateCard
              lastUpdate={dashboardData.lastUpdate}
              lastUpdateDate={dashboardData.lastUpdateDate}
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-display font-bold text-dark mb-4">
              Quick Links
            </h2>
            <QuickLinks
              intakeComplete={dashboardData.intakeComplete}
              invoicesPending={dashboardData.invoicesPending}
            />
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center">
          <h2 className="text-xl font-display font-bold text-dark mb-2">
            No Active Project
          </h2>
          <p className="text-gray mb-4">
            You don&apos;t have any projects yet. Contact us to get started.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition"
          >
            Start a Project
          </Link>
        </div>
      )}
    </div>
  );
}

function getNextAction(stage: number): string {
  const actions: Record<number, string> = {
    1: 'Complete your intake form to begin the project',
    2: 'Site structure is being planned',
    3: 'Design is in progress - preview coming soon',
    4: 'Content is being integrated',
    5: 'Your site is ready for review',
    6: 'Final delivery in progress',
    7: 'Project complete - reach out if you need anything',
  };
  return actions[stage] || 'Contact us for an update';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}
