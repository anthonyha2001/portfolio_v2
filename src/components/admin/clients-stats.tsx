interface Client {
  id: string;
  status: string;
  intakeComplete: boolean;
}

interface ClientsStatsProps {
  clients: Client[];
}

export function ClientsStats({ clients }: ClientsStatsProps) {
  const totalClients = clients.length;
  const activeProjects = clients.filter((c) => c.status === 'active').length;
  const pendingIntake = clients.filter((c) => !c.intakeComplete).length;
  const completed = clients.filter((c) => c.status === 'completed').length;

  const stats = [
    { label: 'Total Clients', value: totalClients, color: 'text-dark' },
    { label: 'Active Projects', value: activeProjects, color: 'text-accent' },
    { label: 'Pending Intake', value: pendingIntake, color: 'text-yellow-600' },
    { label: 'Completed', value: completed, color: 'text-green-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className={`text-3xl font-display font-bold ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm font-body text-gray">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

