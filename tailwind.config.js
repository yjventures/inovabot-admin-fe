/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        publicSans: ['Public Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        light: {
          sidebar: '#F7F8FA',
          panel: '#FFFFFF',
          gradientButton: '#2778FD',
          headingText: '#19213D',
          normalText: '#666F8D',
          loginButtonBackground: '#000000',
          loginButtonText: '#FFFFFF',
        },
        dark: {
          sidebar: '#23283D',
          panel: '#141828',
          gradientButton: '#071952',
          headingText: '#EBEEF3',
          normalText: '#ACB4C0',
          loginButtonBackground: '#CCCCCC',
          loginButtonText: '#000000',
        },
      },
    },
  },
  plugins: [],
}