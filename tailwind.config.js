/** @type {import('tailwindcss').Config} */
import { darkColor, lightColor, primaryColor, hexToRGB } from "./src/utils";

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  content: [],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        80: hexToRGB(darkColor, 0.8),
        DEFAULT: darkColor,
      },
      white: {
        10: hexToRGB(lightColor, 0.1),
        60: hexToRGB(lightColor, 0.6),
        DEFAULT: lightColor,
      },
      primary: {
        20: hexToRGB(primaryColor, 0.2),
        50: hexToRGB(primaryColor, 0.5),
        DEFAULT: primaryColor,
      },
    },
    borderRadius: {
      none: "0",
      DEFAULT: "10px",
      child: "50px 10px 10px 50px",
      round: "50px",
    },
    extend: {},
  },
  plugins: [],
};
