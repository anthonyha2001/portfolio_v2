'use client';

import { useState, useMemo } from 'react';
// Mock data removed - will fetch from Supabase via API
const adminClientsMockData: never[] = [];
import { ClientsStats } from '@/components/admin/clients-stats';
import { ClientFilters } from '@/components/admin/client-filters';
import { AddClientButton } from '@/components/admin/add-client-button';
import { ClientsTable } from '@/components/admin/clients-table';

export default function AdminPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = useMemo(() => {
    // TODO: Fetch from Supabase API
    return (adminClientsMockData as Array<{
      id: string;
      name: string;
      email: string;
      projectName: string | null;
      status: string;
      currentStage: number;
      createdAt: string;
      intakeComplete: boolean;
    }>).filter((client) => {
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesSearch =
        searchQuery === '' ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">
          Client Management
        </h1>
      </div>

      <ClientsStats clients={adminClientsMockData as Array<{
        id: string;
        name: string;
        email: string;
        projectName: string | null;
        status: string;
        currentStage: number;
        createdAt: string;
        intakeComplete: boolean;
      }>} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <ClientFilters
          statusFilter={statusFilter}
          searchQuery={searchQuery}
          onStatusChange={setStatusFilter}
          onSearchChange={setSearchQuery}
        />
        <div className="flex justify-end">
          <AddClientButton />
        </div>
      </div>

      <ClientsTable clients={filteredClients} />
    </div>
  );
}

