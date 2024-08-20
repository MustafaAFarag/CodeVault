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
        primary: '#4B5563', // Darker shade for primary text
        secondary: '#1F2937', // Darker background and highlight color
        background: '#F9FAFB', // Light background for main content
        'background-secondary': '#E5E7EB', // New lighter background for active nav links
        accent: '#4B9CD3', // Calmer blue for interactive elements
        text: '#374151', // Standard text color
        sidebarBg: '#F3F4F6', // Light gray for sidebar background
        border: '#E5E7EB', // Light border color
      },
    },
  },
  plugins: [],
};
