/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        dark: '#0f172a',
        light: '#f8fafc',
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
        slide: 'slideIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
