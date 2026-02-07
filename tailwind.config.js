/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // RGB format so opacity modifiers (e.g. bg-primary/5, text-primary/80) work
        primary: 'rgb(11 70 52 / <alpha-value>)',   // #0B4634 Deep Forest Green
        accent: 'rgb(212 175 55 / <alpha-value>)',   // #D4AF37 Matte Gold
        base: 'rgb(255 255 255 / <alpha-value>)',    // #FFFFFF Crisp White
      },
      fontFamily: {
        ibm: ['var(--font-ibm)', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        sans: ['var(--font-ibm)', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['var(--text-hero)', { lineHeight: '1.2' }],
        section: ['var(--text-section)', { lineHeight: '1.3' }],
        body: ['var(--text-body)', { lineHeight: '1.6' }],
        cta: ['var(--text-cta)', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
}
