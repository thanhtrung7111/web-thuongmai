/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
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
      transitionProperty: {
        rightOpacityVisibility: "right, opacity,visibility",
        opacityVisibility: "opacity, visibility",
        transformColor: "transform, color",
      },
    },
  },
  plugins: [],
};
