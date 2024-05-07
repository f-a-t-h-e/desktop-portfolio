/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        primary: "#00752cff",
        "primary-light": "#0eb34bff",
        "primary-dark": "#004d1dff",
        "primary-txt": "#ffff",
        "base-100": "#4d4c58ff",
        "base-200": "#2B2A33ff",
        "base-300": "#868686ff",
        "base-txt": "#ffff",
      }
    },
  },
  plugins: [],
}

