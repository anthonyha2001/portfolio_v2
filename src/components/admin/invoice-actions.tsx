'use client';

import { useState } from 'react';
import { MarkPaidModal } from './mark-paid-modal';

interface InvoiceActionsProps {
  invoiceId: string;
  status: string;
  onMarkPaid?: (invoiceId: string, paidDate: string) => void;
  onEdit?: (invoiceId: string) => void;
  onDelete?: (invoiceId: string) => void;
}

export function InvoiceActions({
  invoiceId,
  status,
  onMarkPaid,
  onEdit,
  onDelete,
}: InvoiceActionsProps) {
  const [isMarkPaidOpen, setIsMarkPaidOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleMarkPaid = (paidDate: string) => {
    if (onMarkPaid) {
      onMarkPaid(invoiceId, paidDate);
    }
    setIsMarkPaidOpen(false);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(invoiceId);
    }
    console.log('Edit invoice:', invoiceId);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(invoiceId);
    }
    console.log('Delete invoice:', invoiceId);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {status === 'unpaid' && (
          <button
            onClick={() => setIsMarkPaidOpen(true)}
            className="text-accent hover:text-accent/80 font-body text-sm"
          >
            Mark as Paid
          </button>
        )}
        <button
          onClick={handleEdit}
          className="text-gray hover:text-dark font-body text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => setIsDeleteConfirmOpen(true)}
          className="text-red-600 hover:text-red-700 font-body text-sm"
        >
          Delete
        </button>
      </div>

      <MarkPaidModal
        isOpen={isMarkPaidOpen}
        invoiceId={invoiceId}
        onClose={() => setIsMarkPaidOpen(false)}
        onConfirm={handleMarkPaid}
      />

      {isDeleteConfirmOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsDeleteConfirmOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-display font-bold text-dark mb-4">
                Delete Invoice?
              </h2>
              <p className="font-body text-gray mb-6">
                Are you sure you want to delete invoice <strong>{invoiceId}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md font-body text-dark hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md font-body hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

