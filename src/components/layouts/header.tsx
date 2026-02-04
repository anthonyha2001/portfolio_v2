'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './mobile-menu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/process', label: 'Process' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#1C2343] text-white py-4 shadow-md shadow-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_nbg.png"
                alt="Anthony Hasrouny"
                width={48}
                height={48}
                className="drop-shadow-lg"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white opacity-70 hover:opacity-100 transition-opacity font-body"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

          {/* Desktop Start Project + Client Login */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/start-project">
              <Button
                variant="primary"
                size="sm"
                className="bg-accent text-white hover:bg-accent/90"
              >
                Start Project
              </Button>
            </Link>
            <Link href="/portal">
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:!text-[#1C2343]"
              >
                Client Login
              </Button>
            </Link>
          </div>

            {/* Mobile Hamburger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6"
              aria-label="Toggle menu"
            >
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}

