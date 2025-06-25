// tailwind.config.js
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 16s ease-in-out infinite',
        'float-reverse': 'float-reverse 12s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        
        // --- NEW ANIMATION ADDED HERE ---
        'aurora': 'aurora 20s ease-in-out infinite', 
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.05)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(30px) scale(1.07)' },
        },
        // --- NEW KEYFRAMES ADDED HERE ---
        aurora: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      addUtilities({
        '.transform-style-3d': { 'transform-style': 'preserve-3d' },
        '.perspective-1000': { 'perspective': '1000px' },
        '.backface-hidden': { 'backface-visibility': 'hidden' },
        // Added the dotted pattern utility as well, since it's part of the full design
        '.bg-dotted-pattern': {
          'background-image': `radial-gradient(circle, ${theme('colors.gray.400 / 0.3')} 1px, transparent 1.5px)`,
          'background-size': '1rem 1rem'
        }
      });
    })
  ],
};