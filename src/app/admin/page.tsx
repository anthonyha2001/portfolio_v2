'use client';

import { useState, useMemo } from 'react';
import { adminClientsMockData } from '@/lib/constants';
import { ClientsStats } from '@/components/admin/clients-stats';
import { ClientFilters } from '@/components/admin/client-filters';
import { AddClientButton } from '@/components/admin/add-client-button';
import { ClientsTable } from '@/components/admin/clients-table';

export default function AdminPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = useMemo(() => {
    return adminClientsMockData.filter((client) => {
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

      <ClientsStats clients={adminClientsMockData} />

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

