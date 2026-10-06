/** @type {import('tailwind.config').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        ai: {
          diagnost: '#10b981', // Emerald
          explainer: '#6366f1', // Indigo
          trainer: '#f59e0b',   // Amber
          analyst: '#8b5cf6',   // Purple
        },
        surface: {
          light: '#f8fafc',
          card: '#ffffff',
          dark: '#0f172a',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '3xl': '1.5rem',
        '2xl': '1.25rem',
        xl: '1rem',
        lg: '0.75rem',
      },
      boxShadow: {
        'soft-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'soft-sm': '0 2px 8px 0 rgba(15, 23, 42, 0.04)',
        'soft-md': '0 8px 24px -4px rgba(15, 23, 42, 0.06)',
        'soft-lg': '0 16px 32px -6px rgba(15, 23, 42, 0.08)',
        'glow-emerald': '0 0 24px -4px rgba(34, 197, 94, 0.25)',
        'glow-indigo': '0 0 24px -4px rgba(99, 102, 241, 0.25)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
