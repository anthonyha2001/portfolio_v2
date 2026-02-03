'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface AdminSidebarProps {
  session: Session | null;
}

export function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Clients' },
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/invoices', label: 'Invoices' },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h2 className="font-display font-bold text-xl text-white">
          Admin Panel
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-accent/20 text-white border-l-4 border-accent'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Info and Sign Out */}
      <div className="p-4 border-t border-white/10 space-y-4">
        {session?.user?.email && (
          <p className="text-sm text-white/70 font-body px-4">
            {session.user.email}
          </p>
        )}
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors font-body text-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

