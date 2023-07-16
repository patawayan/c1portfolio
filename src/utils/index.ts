import data from "../assets/data.json";

/**
 * Function to convert 6 digit color hex codes to rgba() string.
 * @param {string} hex
 * @param {string} alpha
 * @returns
 */
export const hexToRGB = (hex: string, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const end = alpha ? `, ${alpha})` : ")";
  return `rgba(${r}, ${g}, ${b}${end}`;
};

/**
 * Returns linearGradient string for CSS
 * @param {string} rgba
 * @returns
 */
export const createLinearGradent = (rgba: string, alpha = 1) =>
  `linear-gradient(to bottom, ${hexToRGB(rgba, alpha)}, ${hexToRGB(
    rgba,
    alpha
  )})`;

export const primaryColor = data.meta.colors.primary ?? "#FF8C01";
export const darkColor = data.meta.colors.dark ?? "#000000";
export const lightColor = data.meta.colors.light ?? "#EEEEEE";
