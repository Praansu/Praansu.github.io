import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF7F1',
          dim: '#F3EEE4',
        },
        ink: {
          DEFAULT: '#1C1917',
          soft: '#44403C',
          faint: '#78716C',
        },
        rule: {
          light: '#E3DACA',
          dark: '#2B261F',
        },
        night: {
          DEFAULT: '#14110D',
          raised: '#1D1913',
        },
        cream: {
          DEFAULT: '#EDE6D6',
          dim: '#A8A094',
        },
        accent: {
          DEFAULT: '#1D4ED8',
          deep: '#1E40AF',
          pale: '#93C5FD',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
