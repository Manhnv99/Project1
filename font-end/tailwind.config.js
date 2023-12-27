/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'primary-blue':'#1f92d9',
      'primary-red':'#fe4847',
      'primary-orange':'#da601a',
      'primary-green':'#72c573'
    },
  },
  plugins: [],
}

