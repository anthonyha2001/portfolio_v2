'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

interface AdminHeaderProps {
  session: Session | null;
}

export function AdminHeader({ session }: AdminHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <>
      {/* Top Bar */}
      <div className="bg-[#1C2343] text-white px-4 py-4 flex items-center justify-between">
        <h2 className="font-display font-bold text-xl text-white">
          Admin Panel
        </h2>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col justify-center gap-1.5 w-6 h-6"
          aria-label="Toggle menu"
        >
          <div className="w-full h-0.5 bg-white"></div>
          <div className="w-full h-0.5 bg-white"></div>
          <div className="w-full h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Slide-out Drawer */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-[#1C2343] text-white z-50 transform transition-transform">
            <div className="h-full flex flex-col">
              {/* Close button */}
              <div className="p-4 flex items-center justify-between border-b border-white/10">
                <h2 className="font-display font-bold text-xl text-white">
                  Admin Panel
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white text-2xl font-bold hover:opacity-70"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
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
          </div>
        </>
      )}
    </>
  );
}

