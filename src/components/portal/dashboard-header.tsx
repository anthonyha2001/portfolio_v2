import { Session } from 'next-auth';

interface DashboardHeaderProps {
  session: Session | null;
  projectName: string;
  status: 'active' | 'paused' | 'completed';
}

export function DashboardHeader({ session, projectName, status }: DashboardHeaderProps) {
  const firstName = session?.user?.name?.split(' ')[0] || 'there';
  
  const statusConfig = {
    active: { label: 'Active', className: 'bg-green-100 text-green-800' },
    paused: { label: 'Paused', className: 'bg-yellow-100 text-yellow-800' },
    completed: { label: 'Completed', className: 'bg-gray-100 text-gray-800' },
  };

  const statusInfo = statusConfig[status];

  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-body text-dark mb-2">
        Welcome back{firstName !== 'there' ? `, ${firstName}` : ''}
      </h1>
      <div className="flex items-center gap-4 flex-wrap">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-dark">
          {projectName}
        </h2>
        <span className={`px-3 py-1 rounded-full text-sm font-body font-medium ${statusInfo.className}`}>
          {statusInfo.label}
        </span>
      </div>
    </div>
  );
}

