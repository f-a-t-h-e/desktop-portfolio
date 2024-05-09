/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        primary: "#5C9B0Dff",
        "primary-light": "#4B8501ff",
        "primary-dark": "#004d1dff",
        "primary-txt": "#ffff",
        "base-100": "#272727ff",
        "neutral": "#222f",
        // 
        "base-200": "#373737ff",
        "base-txt": "#F7F7F7ff",
        "base-200-dis": "#2A2A2Aff",
        "base-200-dis-txt": "#797979ff",
        "base-300": "#2C2C2Cff",
        "base-txt-sec" : "#8F8F8Fff",
        // 
        "brdr": "#181818ff",
        "hvr": "#4E4E4Eff",
        "ico": "#707070ff",
      }
    },
  },
  plugins: [],
}

