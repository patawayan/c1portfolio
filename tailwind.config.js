/** @type {import('tailwindcss').Config} */
import settings from "./src/assets/settings.json";

/**
 * Function to convert 6 digit color hex codes to rgba() string.
 * @param {string} hex
 * @param {string} alpha
 * @returns
 */
const hexToRGB = (hex, alpha) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  let end = alpha ? `, ${alpha})` : ")";
  return `rgba(${r}, ${g}, ${b}${end}`;
};

const primary = settings.meta.colors.primary ?? "#FF8C01";
const dark = settings.meta.colors.dark ?? "#000000";
const light = settings.meta.colors.light ?? "#EEEEEE";

const backgroundImage = settings.routes.reduce((agg, route) => {
  return {
    ...agg,
    [`${route.title.toLowerCase().replaceAll(" ", "")}-image`]: `url('${
      route.background ?? route.thumbnail
    }')`,
  };
}, {});

console.log("ahaha", backgroundImage);

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      backgroundImage,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        80: hexToRGB(dark, 0.8),
        DEFAULT: dark,
      },
      white: {
        10: hexToRGB(light, 0.1),
        60: hexToRGB(light, 0.6),
        DEFAULT: light,
      },
      primary: {
        20: hexToRGB(primary, 0.2),
        50: hexToRGB(primary, 0.5),
        DEFAULT: primary,
      },
    },
  },
  plugins: [],
};
