/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s infinite',
        'slideInLeft': 'slideInLeft 0.6s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'scaleIn': 'scaleIn 0.5s ease-out forwards',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};
