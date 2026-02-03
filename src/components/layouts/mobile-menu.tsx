'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ href: string; label: string }>;
  session: any;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

export function MobileMenu({ isOpen, onClose, navLinks, session, status }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 bg-dark z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Menu panel */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-2xl font-bold hover:opacity-70 transition-opacity"
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Navigation links */}
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-white text-2xl font-body hover:opacity-100 opacity-90 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Client Login/Logout button */}
        <div className="mt-8">
          {status === 'authenticated' ? (
            <Button 
              variant="outline" 
              size="md"
              onClick={() => {
                onClose();
                signOut({ callbackUrl: '/' });
              }}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login" onClick={onClose}>
              <Button variant="outline" size="md">
                Client Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

