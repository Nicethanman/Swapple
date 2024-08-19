/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
            primary: '#B4CDA5',
        }
    },
    fontFamily:{
      logo: "Fredoka-VariableFont_wdth,wght.ttf",
    }
  },
  plugins: [],
}

