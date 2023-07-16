/** @type {import('tailwindcss').Config} */
import data from "./src/assets/data.json";

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

const primary = data.meta.colors.primary ?? "#FF8C01";
const dark = data.meta.colors.dark ?? "#000000";
const light = data.meta.colors.light ?? "#EEEEEE";

/**
 * Returns linearGradient string for CSS
 * @param {string} rgba
 * @returns
 */
const createLinearGradent = (rgba, alpha) =>
  `linear-gradient(to bottom, ${hexToRGB(rgba, alpha)}, ${hexToRGB(
    rgba,
    alpha
  )})`;

/**
 * Background Images for side bar buttons
 */
const backgroundImage = data.routes.reduce((agg, route) => {
  const name = route.title.toLowerCase().replaceAll(" ", "");
  const background = route.background ?? route.thumbnail;
  return {
    ...agg,
    [`${name}-image`]: `${createLinearGradent(
      dark,
      0.8
    )}, url('${background}')`,
    [`${name}-image-hover`]: `${createLinearGradent(
      primary,
      0.1
    )}, ${createLinearGradent(dark, 0.8)}, url('${background}')`,
    [`${name}-image-active`]: `${createLinearGradent(
      primary,
      0.3
    )}, ${createLinearGradent(dark, 0.8)}, url('${route.thumbnail}')`,
  };
}, {});

console.log("aahahaha", backgroundImage);

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      backgroundImage: data.routes.reduce((agg, route) => {
        const name = route.title.toLowerCase().replaceAll(" ", "");
        const background = route.background ?? route.thumbnail;
        return {
          ...agg,
          [`${name}-image`]: `${createLinearGradent(
            dark,
            0.8
          )}, url('${background}')`,
          [`${name}-image-hover`]: `${createLinearGradent(
            primary,
            0.1
          )}, ${createLinearGradent(dark, 0.8)}, url('${background}')`,
          [`${name}-image-active`]: `${createLinearGradent(
            primary,
            0.3
          )}, ${createLinearGradent(dark, 0.8)}, url('${route.thumbnail}')`,
        };
      }, {}),
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
    borderRadius: {
      none: "0",
      DEFAULT: "10px",
      child: "50px 10px 10px 50px",
      round: "50px",
    },
  },
  plugins: [],
};
