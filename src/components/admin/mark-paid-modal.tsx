'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MarkPaidModalProps {
  isOpen: boolean;
  invoiceId: string;
  onClose: () => void;
  onConfirm?: (paidDate: string) => void;
}

export function MarkPaidModal({
  isOpen,
  invoiceId,
  onClose,
  onConfirm,
}: MarkPaidModalProps) {
  const [paidDate, setPaidDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(paidDate);
    }
    console.log('Invoice marked as paid:', invoiceId, paidDate);
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
          className="bg-white rounded-lg p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-display font-bold text-dark mb-4">
            Mark Invoice as Paid?
          </h2>
          <p className="font-body text-gray mb-4">
            Mark invoice <strong>{invoiceId}</strong> as paid?
          </p>

          <div className="mb-6">
            <label className="block text-sm font-body font-medium text-dark mb-2">
              Payment Date
            </label>
            <input
              type="date"
              value={paidDate}
              onChange={(e) => setPaidDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleConfirm}
              className="flex-1"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

