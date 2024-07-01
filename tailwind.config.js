module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'sm': { 'max': '1023px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

     
    },
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode with a custom class
}