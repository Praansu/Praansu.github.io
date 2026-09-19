import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  style: ['normal', 'italic'],
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
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
    { media: '(prefers-color-scheme: light)', color: '#FAF7F1' },
    { media: '(prefers-color-scheme: dark)', color: '#14110D' },
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
      className={`${playfair.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
