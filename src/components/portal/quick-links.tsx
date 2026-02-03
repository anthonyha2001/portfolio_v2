import Link from 'next/link';

interface QuickLinksProps {
  intakeComplete: boolean;
  invoicesPending: number;
}

export function QuickLinks({ intakeComplete, invoicesPending }: QuickLinksProps) {
  const links = [
    {
      href: '/portal/intake',
      title: 'View Intake Form',
      icon: '📋',
      badge: intakeComplete ? '✓' : null,
    },
    {
      href: '/portal/tracker',
      title: 'Track Progress',
      icon: '📊',
      badge: null,
    },
    {
      href: '/portal/invoices',
      title: 'View Invoices',
      icon: '💰',
      badge: invoicesPending > 0 ? invoicesPending.toString() : null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="p-6 rounded-lg border border-gray-200 bg-white hover:border-accent hover:shadow-md transition-all group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="text-2xl">{link.icon}</div>
            {link.badge && (
              <span className={`px-2 py-1 rounded-full text-xs font-body font-medium ${
                link.badge === '✓'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-accent text-white'
              }`}>
                {link.badge}
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-dark group-hover:text-accent transition-colors">
            {link.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}

