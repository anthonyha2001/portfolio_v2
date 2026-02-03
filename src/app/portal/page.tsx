import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { dashboardMockData } from '@/lib/constants';
import { DashboardHeader } from '@/components/portal/dashboard-header';
import { StageProgress } from '@/components/portal/stage-progress';
import { NextActionCard } from '@/components/portal/next-action-card';
import { LatestUpdateCard } from '@/components/portal/latest-update-card';
import { QuickLinks } from '@/components/portal/quick-links';

export const metadata: Metadata = {
  title: 'Client Portal Dashboard | Anthony Hasrouny',
  description: 'View your project status, track progress, and manage your website project.',
};

export default async function PortalPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8">
      <DashboardHeader
        session={session}
        projectName={dashboardMockData.projectName}
        status={dashboardMockData.status as 'active' | 'paused' | 'completed'}
      />
      
      <StageProgress currentStage={dashboardMockData.currentStage} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NextActionCard nextAction={dashboardMockData.nextAction} />
        <LatestUpdateCard
          lastUpdate={dashboardMockData.lastUpdate}
          lastUpdateDate={dashboardMockData.lastUpdateDate}
        />
      </div>
      
      <div>
        <h2 className="text-2xl font-display font-bold text-dark mb-4">
          Quick Links
        </h2>
        <QuickLinks
          intakeComplete={dashboardMockData.intakeComplete}
          invoicesPending={dashboardMockData.invoicesPending}
        />
      </div>
    </div>
  );
}

