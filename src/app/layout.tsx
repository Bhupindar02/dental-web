import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0284c7',
};

export const metadata: Metadata = {
  title: 'AURORA DENTAL | We Design Smiles • Precision Cosmetic & Restorative Dentistry',
  description:
    'Experience premier aesthetic smile makeovers, dental implants, and gentle preventative dentistry at Aurora Dental. Interactive virtual clinic walkthrough in Vadodara, Gujarat.',
  keywords: [
    'Aurora Dental',
    'We Design Smiles',
    'Cosmetic Dentist Vadodara',
    'Porcelain Veneers Gujarat',
    'Dental Implants',
    'Invisalign Diamond Provider',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-white selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

