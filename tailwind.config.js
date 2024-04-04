/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        "cream-header": "#FEFBE6",
        "header-border": "#C7BF85",
        "cream-body": "#FFFEF6",
      },
    },
  },
  plugins: [],
};
