/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Keep this as it is
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#D2AF84', // A gold-ish color that stands out on dark backgrounds
        secondary: '#4B5563', // Dark gray for secondary elements
        accent: '#D97706', // A vibrant amber for accents
        background: '#1f2937', // Keeping your existing background color
        text: '#E5E7EB', // Light gray for text on dark backgrounds
        heading: '#F3F4F6', // Slightly lighter than text for headings
      },
    },
  },
  plugins: [],
};
