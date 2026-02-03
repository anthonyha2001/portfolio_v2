'use client';

import { useRouter } from 'next/navigation';
import { adminClientsMockData } from '@/lib/constants';
import { projectStages } from '@/lib/constants';

export default function ProjectsPage() {
  const router = useRouter();

  // Convert clients to projects (using clients that have projects)
  const projects = adminClientsMockData
    .filter((client) => client.projectName)
    .map((client) => ({
      id: client.id,
      projectName: client.projectName!,
      clientName: client.name,
      currentStage: client.currentStage,
      status: client.status,
      lastUpdated: client.createdAt, // Using createdAt as placeholder
    }));

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: 'Active', className: 'bg-blue-100 text-blue-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' },
    };
    const statusConfig = config[status as keyof typeof config] || config.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-body font-medium ${statusConfig.className}`}>
        {statusConfig.label}
      </span>
    );
  };

  const getStageName = (stageId: number) => {
    if (stageId === 0) return 'Not Started';
    const stage = projectStages.find((s) => s.id === stageId);
    return stage ? stage.name : `Stage ${stageId}`;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">
          Projects
        </h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700">
                  Project Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700">
                  Stage
                </th>
                <th className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700">
                  Last Updated
                </th>
                <th className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => router.push(`/admin/projects/${project.id}`)}
                >
                  <td className="px-4 py-3 font-body text-dark">{project.projectName}</td>
                  <td className="px-4 py-3 font-body text-gray">{project.clientName}</td>
                  <td className="px-4 py-3 font-body text-gray">
                    {getStageName(project.currentStage)}
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(project.status)}</td>
                  <td className="px-4 py-3 font-body text-gray text-sm">{project.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/projects/${project.id}`);
                      }}
                      className="text-accent hover:text-accent/80 font-body text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

