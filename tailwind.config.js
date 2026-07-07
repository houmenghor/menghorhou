/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00BBFF',
        secondary: '#020817',
        'light-mode-hover': '#1F2738',
        'footer-light': '#FBFCFE',
        'bg-light': '#FFFFFF',
        'muted-foreground' : '#94A3B8',
        'accent' : '#0A1121'
      },
      backgroundColor: {
        'darkMode' : '#1F2738',
        'lightMode' : '#212839',
      },
      borderColor: {
        'darkMode' : '#1F2738',
        'lightMode' : '#212839'
      }
    },
  },
  darkMode: "class",
  plugins: [],
}