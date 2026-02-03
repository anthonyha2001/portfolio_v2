'use client';

interface ClientFiltersProps {
  statusFilter: string;
  searchQuery: string;
  onStatusChange: (status: string) => void;
  onSearchChange: (query: string) => void;
}

export function ClientFilters({
  statusFilter,
  searchQuery,
  onStatusChange,
  onSearchChange,
}: ClientFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or email..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}

