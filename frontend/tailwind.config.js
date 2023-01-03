/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Prompt: ['Prompt', 'sans-serif'],
        Lucky: ['Luckiest Guy', 'cursive'],
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
};
