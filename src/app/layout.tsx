import type { Metadata, Viewport } from 'next';
import { Anton, Instrument_Serif, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const anton = Anton({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serifit',
  weight: ['400'],
  style: ['normal', 'italic'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Praansu Karmacharya — AI/ML Engineer & Full-Stack Developer',
  description:
    'CS student at Islington College, Kathmandu. I build ML models and the products around them — PyTorch, RAG pipelines, agent tool-calling, full-stack deployment.',
  keywords: [
    'AI Engineer',
    'ML Engineer',
    'Full-Stack Developer',
    'PyTorch',
    'RAG',
    'Next.js',
    'TypeScript',
    'Freelance',
  ],
  authors: [{ name: 'Praansu Karmacharya' }],
  creator: 'Praansu Karmacharya',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://praansu.github.io',
    title: 'Praansu Karmacharya — AI/ML Engineer & Full-Stack Developer',
    description:
      'CS student at Islington College, Kathmandu. Building ML models & AI products from scratch.',
    siteName: 'Praansu Karmacharya',
  },
  twitter: {
    card: 'summary',
    title: 'Praansu Karmacharya — AI/ML Engineer & Full-Stack Developer',
    description:
      'CS student at Islington College, Kathmandu. Building ML models & AI products from scratch.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F2EFE6' },
    { media: '(prefers-color-scheme: dark)', color: '#0C1B2E' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
