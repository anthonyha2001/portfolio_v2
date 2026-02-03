import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, DM_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1C2343',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://anthonyhasrouny.com'),
  title: {
    default: 'Anthony Hasrouny | Premium Websites in 72 Hours',
    template: '%s | Anthony Hasrouny',
  },
  description: 'Fast, affordable web development for businesses that need to launch now. Premium websites starting at $150, delivered in 72 hours.',
  keywords: ['web developer', 'affordable website', 'fast website', '72 hour website', 'small business website', 'freelance web developer'],
  authors: [{ name: 'Anthony Hasrouny' }],
  creator: 'Anthony Hasrouny',
  icons: {
    icon: '/logo_navybg.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Anthony Hasrouny',
    title: 'Premium Websites in 72 Hours | Anthony Hasrouny',
    description: 'Fast, affordable web development. Premium websites starting at $150, delivered in 72 hours.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Websites in 72 Hours | Anthony Hasrouny',
    description: 'Fast, affordable web development. Premium websites starting at $150, delivered in 72 hours.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://accounts.google.com" />
      </head>
      <body className="font-body bg-light text-dark antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
