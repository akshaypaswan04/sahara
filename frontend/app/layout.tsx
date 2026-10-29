import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Sahara — Public services that speak your language',
  description:
    'Sahara is a multilingual AI accessibility layer for public services. Understand emergency alerts and official forms in your preferred Indian language.',
  keywords: [
    'multilingual', 'India', 'government', 'emergency alerts', 'form assistant',
    'Hindi', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'accessibility',
  ],
  openGraph: {
    title: 'Sahara',
    description: 'Public services that speak your language.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
