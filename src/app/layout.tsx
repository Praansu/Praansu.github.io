import type { Metadata, Viewport } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Praansu Karmacharya — AI/ML Engineer & Full-Stack Developer',
  description: 'CS student at Islington College, Kathmandu. Building ML models & AI products — PyTorch, RAG, agent tool-calling, Next.js, TypeScript.',
  keywords: ['AI Engineer', 'ML Engineer', 'Full-Stack Developer', 'PyTorch', 'RAG', 'Next.js', 'TypeScript', 'Freelance'],
  authors: [{ name: 'Praansu Karmacharya' }],
  creator: 'Praansu Karmacharya',
  publisher: 'Praansu Karmacharya',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://praansu.github.io',
    title: 'Praansu Karmacharya — AI/ML Engineer & Full-Stack Developer',
    description: 'CS student at Islington College, Kathmandu. Building ML models & AI products.',
    siteName: 'Praansu Karmacharya Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Praansu Karmacharya — AI/ML Engineer & Full-Stack Developer',
    description: 'CS student at Islington College, Kathmandu. Building ML models & AI products.',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
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
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} ${merriweather.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}