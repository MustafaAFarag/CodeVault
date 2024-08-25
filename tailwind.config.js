/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Keep this as it is
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      heading: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#002e5d', // Deep Blue
        secondary: '#f2f2f2', // Soft Gray
        background: '#ffffff', // White
        'background-secondary': '#dcdcdc', // Light Gray
        text: '#333333', // Charcoal Gray
        'text-secondary': '#6b7280', // Text secondary
        accent: '#1abc9c', // Vibrant Teal
        border: '#dcdcdc', // Light Gray for borders
        error: '#e74c3c', // Error Red
        success: '#2ecc71', // Success Green
      },
    },
  },
  plugins: [],
};
