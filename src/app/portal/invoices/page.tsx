import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices | Client Portal',
  description: 'View and manage your project invoices.',
};

export default function InvoicesPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-4">
        Invoices
      </h1>
      <p className="text-gray font-body">
        Your invoices will appear here.
      </p>
    </div>
  );
}

