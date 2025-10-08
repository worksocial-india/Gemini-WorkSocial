/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-text': 'gradientText 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        gradientText: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '25%': {
            'background-position': '100% 25%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          '75%': {
            'background-position': '25% 100%',
          },
        },
        gradientShift: {
          '0%': {
            'background-position': '0% 50%',
          },
          '25%': {
            'background-position': '100% 25%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          '75%': {
            'background-position': '25% 100%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}