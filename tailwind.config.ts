import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: ['poppins-regular'],
        medium: ['poppins-medium'],
        bold: ['poppins-bold'],
        extrabold: ['poppins-extrabold'],
        italic: ['poppins-italic'],
      },
      colors: {
        primary: '#1928FB',
        secondary: '#EFEFEF',
        light: '#F6F6FF'
      }
    },
  },
  plugins: [],
}
export default config
