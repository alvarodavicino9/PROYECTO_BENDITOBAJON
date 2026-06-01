/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        orange: {
          DEFAULT: '#F97316',
          dark: '#C2410C',
          light: '#FED7AA',
        },
        brand: {
          dark: '#0A0A0A',
          card: '#111111',
          border: 'rgba(255,255,255,0.07)',
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        blob: 'blob 8s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        blob: {
          '0%,100%': { transform: 'scale(1) translate(0,0)' },
          '50%': { transform: 'scale(1.2) translate(15px,-15px)' },
        },
        pulseDot: {
          '0%,100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(1.6)' },
        },
      },
    },
  },
  plugins: [],
}
