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
        // SAMA Authority Royal Palette - RGB format for opacity modifiers
        primary: 'rgb(11 70 52 / <alpha-value>)',     // #0B4634 Royal Deep Green
        secondary: 'rgb(0 108 53 / <alpha-value>)',   // #006C35 Saudi Flag Green
        accent: 'rgb(212 175 55 / <alpha-value>)',    // #D4AF37 Metallic Gold
        base: 'rgb(255 255 255 / <alpha-value>)',     // #FFFFFF Pure White
        text: 'rgb(31 41 55 / <alpha-value>)',        // #1F2937 Charcoal
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
      backgroundImage: {
        'royal-gradient': 'linear-gradient(135deg, rgb(11 70 52) 0%, rgb(15 95 70) 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
        'premium-card': 'linear-gradient(180deg, rgb(255 255 255) 0%, rgb(248 250 252) 100%)',
      },
      boxShadow: {
        'royal': '0 10px 40px -10px rgba(11, 70, 52, 0.25)',
        'gold': '0 0 20px rgba(212, 175, 55, 0.4)',
        'premium': '0 20px 60px -15px rgba(11, 70, 52, 0.2), 0 10px 20px -10px rgba(11, 70, 52, 0.1)',
      },
      letterSpacing: {
        'royal': '0.02em',
      },
    },
  },
  plugins: [],
}
