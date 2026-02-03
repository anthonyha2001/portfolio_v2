'use client';

import { useState, useMemo } from 'react';
import { projectStages } from '@/lib/constants';

interface Client {
  id: string;
  name: string;
  email: string;
  projectName: string | null;
  status: string;
  currentStage: number;
  createdAt: string;
  intakeComplete: boolean;
}

interface ClientsTableProps {
  clients: Client[];
}

type SortField = 'name' | 'email' | 'projectName' | 'status' | 'currentStage' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export function ClientsTable({ clients }: ClientsTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedClients = useMemo(() => {
    if (!sortField) return clients;
    
    return [...clients].sort((a, b) => {
      let aValue = String(a[sortField] ?? '');
      let bValue = String(b[sortField] ?? '');
      
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });
  }, [clients, sortField, sortDirection]);

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
    return stage ? `${stageId}: ${stage.name}` : `Stage ${stageId}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Client Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('email')}
              >
                Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('projectName')}
              >
                Project {sortField === 'projectName' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('currentStage')}
              >
                Stage {sortField === 'currentStage' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700">
                Intake
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('createdAt')}
              >
                Created {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => console.log('View client:', client.id)}
              >
                <td className="px-4 py-3 font-body text-dark">{client.name}</td>
                <td className="px-4 py-3 font-body text-gray">{client.email}</td>
                <td className="px-4 py-3 font-body text-gray">
                  {client.projectName || '—'}
                </td>
                <td className="px-4 py-3">{getStatusBadge(client.status)}</td>
                <td className="px-4 py-3 font-body text-gray">
                  {getStageName(client.currentStage)}
                </td>
                <td className="px-4 py-3">
                  {client.intakeComplete ? (
                    <span className="text-green-600 text-lg">✓</span>
                  ) : (
                    <span className="text-red-600 text-lg">✗</span>
                  )}
                </td>
                <td className="px-4 py-3 font-body text-gray text-sm">{client.createdAt}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Actions for:', client.id);
                    }}
                    className="text-accent hover:text-accent/80 font-body text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

