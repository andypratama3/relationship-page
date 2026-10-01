/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rose-petal': '#FFB6C1',
        'rose-gold': '#E8B4B8',
        'deep-blush': '#C9184A',
        'burgundy': '#800F2F',
        'wine': '#590D22',
        'cream': '#FFF0F3',
        'lavender': '#E6B8D9',
        'peach': '#FFD6C9',
        'champagne': '#F7E7CE',
        'bg-deep': '#1a0a10',
        'bg-mid': '#3d1a2b',
        'bg-soft': '#2a0f1a',
      },
      fontFamily: {
        'great-vibes': ['"Great Vibes"', 'cursive'],
        'dancing-script': ['"Dancing Script"', 'cursive'],
        'playfair': ['"Playfair Display"', 'serif'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
