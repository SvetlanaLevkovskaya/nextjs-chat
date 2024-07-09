import plugin from 'tailwindcss/plugin'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm-400': '400px',
        'sm-500': '500px',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.clip-path-bot-triangle': {
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        },
        '.clip-path-triangle': {
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        },
      })
    }),
  ],
}
export default config
