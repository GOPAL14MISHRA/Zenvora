/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F7F4EE',
          secondary: '#F1EFE9',
          tertiary: '#EBE7DF',
          dark: '#171717',
          'dark-secondary': '#222222',
        },
        charcoal: {
          950: '#0F0F0F',
          900: '#171717',
          800: '#262626',
          700: '#404040',
          600: '#5F5A52',
          500: '#787268',
        },
        card: {
          DEFAULT: '#FFFFFF',
          hover: '#FFFFFF',
          dark: '#171717',
        },
        accent: {
          coral: '#E85D3F',
          'coral-dark': '#D44C2F',
          'coral-light': '#FCE8E2',
        },
        border: {
          DEFAULT: '#DED9D0',
          subtle: '#E8E3DA',
          dark: 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'grid-pattern-light': 'linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)',
        'hero-gradient-light': 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37, 99, 235, 0.06), transparent 100%)',
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        'card-hover': '0 20px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
        'glow-blue': '0 4px 20px rgba(37, 99, 235, 0.25)',
        'elevated': '0 10px 40px -10px rgba(15, 23, 42, 0.05)',
      },
    },
  },
  plugins: [],
}

