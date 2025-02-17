/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dgr: '#2C6E49',
        lgr: '#4C956C',
        bgr: '#4caf50',
        c: '#FEFEE3',
        p: '#FFC9B9',
        o: '#D68C45'
      }
    },
  },
  plugins: [],
}