/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#009578",
        second: "#F6762D",
        white: "#FFFFFF",
        gray: {
          DEFAULT: "#838383",
          dark: "#676767",
          darked: "#3D3D3D",
          light: "#BABABA",
          lighter: "#DADADA",
        },
      },
    },
  },
  plugins: [],
};
