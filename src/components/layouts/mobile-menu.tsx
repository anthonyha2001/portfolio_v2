'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ href: string; label: string }>;
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 bg-dark/95 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Menu panel */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark animate-slide-in-top"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-3xl font-bold hover:opacity-70 transition-all duration-200 hover:rotate-90 animate-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Navigation links */}
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-white text-2xl font-body hover:opacity-100 opacity-90 transition-all duration-300 hover:scale-105 transform animate-fade-in-up"
              style={{ 
                animationDelay: `${0.3 + index * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Start Project button */}
        <div
          className="mt-8 flex flex-col items-center gap-3 animate-fade-in-up"
          style={{
            animationDelay: `${0.3 + navLinks.length * 0.1}s`,
            animationFillMode: 'both',
          }}
        >
          <Link href="/start-project" onClick={onClose}>
            <Button
              variant="primary"
              size="sm"
              className="w-40 bg-accent text-white hover:bg-accent/90"
            >
              Start Project
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

