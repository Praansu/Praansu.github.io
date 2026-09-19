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
        // Light: drafting paper. Dark: blueprint.
        sheet: {
          DEFAULT: '#F2EFE6',
          dim: '#E9E4D5',
        },
        ink: {
          DEFAULT: '#191512',
          soft: '#4A443B',
          faint: '#8A8175',
        },
        grid: {
          light: '#DCD4BF',
          dark: '#22344F',
        },
        night: {
          DEFAULT: '#0C1B2E',
          raised: '#12263F',
        },
        chalk: {
          DEFAULT: '#EDF2F7',
          dim: '#9FB2C8',
          faint: '#5F7391',
        },
        signal: {
          DEFAULT: '#FF4D00',
          deep: '#C73A00',
        },
        brass: {
          DEFAULT: '#8A6D1B',
          pale: '#E4C65B',
        },
        stamp: {
          DEFAULT: '#1E40AF',
          pale: '#7FA6F5',
        },
      },
      fontFamily: {
        display: ['Anton', '"Arial Narrow"', 'sans-serif'],
        serifit: ['"Instrument Serif"', 'Georgia', 'serif'],
        grotesk: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
