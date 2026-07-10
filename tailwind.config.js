/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Surface / layout
        white:  'var(--color-white)',
        canvas: 'var(--color-canvas)',

        // Text
        ink: {
          DEFAULT:   'var(--color-ink)',
          secondary: 'var(--color-ink-secondary)',
          tertiary:  'var(--color-ink-tertiary)',
        },

        // Borders
        hairline: 'var(--color-hairline)',

        // Brand green
        forest: {
          DEFAULT: 'var(--color-forest)',
          hover:   'var(--color-forest-hover)',
          soft:    'var(--color-forest-soft)',
        },

        // Amber / warning
        amber: {
          DEFAULT: 'var(--color-amber)',
          soft:    'var(--color-amber-soft)',
        },

        // Rose / danger
        rose: {
          DEFAULT: 'var(--color-rose)',
          soft:    'var(--color-rose-soft)',
        },

        // Identity palette (static — no dark swap needed)
        identity: {
          blue:   { DEFAULT: '#185FA5', soft: '#E1EBF5' },
          forest: { DEFAULT: '#0F6E56', soft: '#E1F5EE' },
          rust:   { DEFAULT: '#993C1D', soft: '#F5E5DD' },
          plum:   { DEFAULT: '#72243E', soft: '#F1E1E8' },
          violet: { DEFAULT: '#534AB7', soft: '#E7E5F7' },
          ochre:  { DEFAULT: '#854F0B', soft: '#F3E8D6' },
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        card:    '0 1px 2px rgba(27, 32, 41, 0.04), 0 1px 8px rgba(27, 32, 41, 0.03)',
        popover: '0 4px 16px rgba(27, 32, 41, 0.10), 0 1px 4px rgba(27, 32, 41, 0.06)',
      },
      keyframes: {
        'fade-in':  { from: { opacity: 0 },                              to: { opacity: 1 } },
        'scale-in': { from: { opacity: 0, transform: 'scale(0.97)' },   to: { opacity: 1, transform: 'scale(1)' } },
      },
      animation: {
        'fade-in':  'fade-in 0.15s ease-out',
        'scale-in': 'scale-in 0.15s ease-out',
      },
    },
  },
  plugins: [],
};
