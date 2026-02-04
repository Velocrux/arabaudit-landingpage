/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        base: 'var(--color-base)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
