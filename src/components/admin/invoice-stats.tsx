interface Invoice {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  createdAt: string;
}

interface InvoiceStatsProps {
  invoices: Invoice[];
}

export function InvoiceStats({ invoices }: InvoiceStatsProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const totalOutstanding = invoices
    .filter((inv) => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const overdueCount = invoices.filter((inv) => {
    if (inv.status !== 'unpaid') return false;
    const dueDate = new Date(inv.dueDate);
    return dueDate < today;
  }).length;

  const invoicesThisMonth = invoices.filter((inv) => {
    const createdDate = new Date(inv.createdAt);
    return (
      createdDate.getMonth() === currentMonth &&
      createdDate.getFullYear() === currentYear
    );
  }).length;

  const stats = [
    {
      label: 'Total Outstanding',
      value: `$${totalOutstanding.toFixed(2)}`,
      color: 'text-orange-600',
    },
    {
      label: 'Total Paid',
      value: `$${totalPaid.toFixed(2)}`,
      color: 'text-green-600',
    },
    {
      label: 'Overdue Count',
      value: overdueCount.toString(),
      color: 'text-red-600',
    },
    {
      label: 'Invoices This Month',
      value: invoicesThisMonth.toString(),
      color: 'text-dark',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className={`text-3xl font-display font-bold ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm font-body text-gray">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

