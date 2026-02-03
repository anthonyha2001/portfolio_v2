'use client';

import { useState, useMemo } from 'react';
import { InvoiceActions } from './invoice-actions';

interface Invoice {
  id: string;
  clientName: string;
  projectName: string;
  description: string;
  amount: number;
  status: string;
  dueDate: string;
  paidDate: string | null;
}

interface InvoicesTableProps {
  invoices: Invoice[];
  statusFilter?: string;
  onMarkPaid?: (invoiceId: string, paidDate: string) => void;
  onEdit?: (invoiceId: string) => void;
  onDelete?: (invoiceId: string) => void;
}

type SortField = 'id' | 'clientName' | 'projectName' | 'description' | 'amount' | 'status' | 'dueDate' | 'paidDate';
type SortDirection = 'asc' | 'desc';

export function InvoicesTable({
  invoices,
  onMarkPaid,
  onEdit,
  onDelete,
}: InvoicesTableProps) {
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

  const sortedInvoices = useMemo(() => {
    if (!sortField) return invoices;
    
    return [...invoices].sort((a, b) => {
      let aValue = String(a[sortField] ?? '');
      let bValue = String(b[sortField] ?? '');
      
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });
  }, [invoices, sortField, sortDirection]);

  const getStatusBadge = (status: string, dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const isOverdue = status === 'unpaid' && due < today;

    if (status === 'paid') {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-body font-medium bg-green-100 text-green-800">
          Paid
        </span>
      );
    } else if (isOverdue) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-body font-medium bg-red-100 text-red-800">
          Overdue
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-body font-medium bg-orange-100 text-orange-800">
          Unpaid
        </span>
      );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full min-w-[1000px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('id')}
              >
                Invoice ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('clientName')}
              >
                Client {sortField === 'clientName' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('projectName')}
              >
                Project {sortField === 'projectName' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('description')}
              >
                Description {sortField === 'description' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount')}
              >
                Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('dueDate')}
              >
                Due Date {sortField === 'dueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('paidDate')}
              >
                Paid Date {sortField === 'paidDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-body font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-body text-dark font-medium">{invoice.id}</td>
                <td className="px-4 py-3 font-body text-gray">{invoice.clientName}</td>
                <td className="px-4 py-3 font-body text-gray">{invoice.projectName}</td>
                <td className="px-4 py-3 font-body text-gray">{invoice.description}</td>
                <td className="px-4 py-3 font-body text-dark font-medium">
                  {formatCurrency(invoice.amount)}
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(invoice.status, invoice.dueDate)}
                </td>
                <td className="px-4 py-3 font-body text-gray text-sm">{invoice.dueDate}</td>
                <td className="px-4 py-3 font-body text-gray text-sm">
                  {invoice.paidDate || '—'}
                </td>
                <td className="px-4 py-3">
                  <InvoiceActions
                    invoiceId={invoice.id}
                    status={invoice.status}
                    onMarkPaid={onMarkPaid}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
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

