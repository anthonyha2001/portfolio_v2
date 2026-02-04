'use client';

import { useState, useMemo } from 'react';
// Mock data removed - will fetch from Supabase via API
const adminInvoicesMockData: never[] = [];
import { InvoiceStats } from '@/components/admin/invoice-stats';
import { InvoicesTable } from '@/components/admin/invoices-table';
import { CreateInvoiceModal } from '@/components/admin/create-invoice-modal';
import { Button } from '@/components/ui/button';

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredInvoices = useMemo(() => {
    // TODO: Fetch from Supabase API
    return (adminInvoicesMockData as Array<{
      id: string;
      clientId: string;
      clientName: string;
      projectId: string;
      projectName: string;
      description: string;
      amount: number;
      status: string;
      dueDate: string;
      paidDate: string | null;
      createdAt: string;
    }>).filter((invoice) => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'overdue') {
        const today = new Date();
        const dueDate = new Date(invoice.dueDate);
        return invoice.status === 'unpaid' && dueDate < today;
      }
      return invoice.status === statusFilter;
    });
  }, [statusFilter]);

  const handleCreateInvoice = (data: Record<string, unknown>) => {
    console.log('Creating invoice:', data);
    // In production, this would make an API call
    setIsCreateModalOpen(false);
    // Show success message
    alert('Invoice created successfully!');
  };

  const handleMarkPaid = (invoiceId: string, paidDate: string) => {
    console.log('Marking invoice as paid:', invoiceId, paidDate);
    // In production, this would make an API call
    alert(`Invoice ${invoiceId} marked as paid on ${paidDate}`);
  };

  const handleEdit = (invoiceId: string) => {
    console.log('Editing invoice:', invoiceId);
    // In production, this would open an edit modal
  };

  const handleDelete = (invoiceId: string) => {
    console.log('Deleting invoice:', invoiceId);
    // In production, this would make an API call
    alert(`Invoice ${invoiceId} deleted`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">
          Invoice Management
        </h1>
      </div>

      <InvoiceStats invoices={adminInvoicesMockData as Array<{
        id: string;
        clientId: string;
        clientName: string;
        projectId: string;
        projectName: string;
        description: string;
        amount: number;
        status: string;
        dueDate: string;
        paidDate: string | null;
        createdAt: string;
      }>} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="overdue">Overdue</option>
        </select>

        <Button variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
          Create Invoice
        </Button>
      </div>

      <InvoicesTable
        invoices={filteredInvoices}
        statusFilter={statusFilter}
        onMarkPaid={handleMarkPaid}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateInvoice={handleCreateInvoice}
      />
    </div>
  );
}

