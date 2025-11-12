import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}', './index.html'],
  theme: {
    extend: {
      // Custom theme extensions can be added here
      // Colors, fonts, spacing, etc. are defined in index.css via CSS variables
    },
  },
  plugins: [],
}

export default config
