// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#10B981', // Emerald Green
        'secondary-dark': '#0F172A', // Slate 900
        'card-dark': '#1E293B', // Slate 800
        'real-text': '#10B981', // Green for 'Real'
        'fake-text': '#EF4444', // Red for 'Fake'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}