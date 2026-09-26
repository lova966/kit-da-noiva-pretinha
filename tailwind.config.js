/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f5ebdc',
          300: '#ebd9bc',
          400: '#dfc08a',
          500: '#c5a059',
          600: '#b08845',
          700: '#8c6732',
          800: '#6c4e27',
          900: '#523a1e',
        },
        champagne: '#F8F5EE',
        silk: '#FAF8F5',
        bronze: '#9A7A4A',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
