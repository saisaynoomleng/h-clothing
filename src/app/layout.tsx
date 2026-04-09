import type { Metadata } from 'next';
import './globals.css';
import { karla, newsreader } from '@/lib/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s | H Clothing',
    default: 'H Clothing',
  },
  description: `Shop H Clothing: San Antonio's premier destination for curated fashion. Visit our Blanco Rd boutique or shop online for high-end apparel and exclusive styles.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${karla.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
