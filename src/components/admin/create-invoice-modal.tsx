'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
// Mock data removed - will fetch from Supabase via API
const adminClientsMockData: never[] = [];

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateInvoice?: (data: Record<string, unknown>) => void;
}

export function CreateInvoiceModal({
  isOpen,
  onClose,
  onCreateInvoice,
}: CreateInvoiceModalProps) {
  const [formData, setFormData] = useState({
    clientId: '',
    projectName: '',
    description: '',
    amount: '',
    dueDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleClientChange = (clientId: string) => {
    const client = (adminClientsMockData as Array<{
      id: string;
      projectName: string | null;
    }>).find((c) => c.id === clientId);
    setFormData({
      ...formData,
      clientId,
      projectName: client?.projectName || '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.clientId) newErrors.clientId = 'Client is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else {
      const amountNum = parseFloat(formData.amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        newErrors.amount = 'Amount must be a positive number';
      }
    }
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const invoiceData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (onCreateInvoice) {
      onCreateInvoice(invoiceData);
    }
    console.log('Invoice created:', invoiceData);
    
    // Reset form
    setFormData({
      clientId: '',
      projectName: '',
      description: '',
      amount: '',
      dueDate: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-dark">
              Create Invoice
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Client <span className="text-accent">*</span>
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => handleClientChange(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.clientId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a client...</option>
                {(adminClientsMockData as Array<{ id: string; name: string }>).map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {errors.clientId && (
                <p className="mt-1 text-sm text-red-600">{errors.clientId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Project
              </label>
              <input
                type="text"
                value={formData.projectName}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-body text-dark bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Description <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Amount <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className={`w-full pl-7 pr-3 py-2 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Due Date <span className="text-accent">*</span>
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.dueDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                Create Invoice
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

