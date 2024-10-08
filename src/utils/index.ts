import data from "../assets/data.json";

const getRGBValues = (hex: string) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
});

export const rgbToRGBA = (r: number, g: number, b: number, alpha = 1) => {
  const end = alpha ? `, ${alpha})` : ")";
  return `rgba(${r}, ${g}, ${b}${end}`;
};

/**
 * Function to convert 6 digit color hex codes to rgba() string.
 * @param {string} hex
 * @param {string} alpha
 * @returns
 */
export const hexToRGB = (hex: string, alpha = 1) => {
  const { r, g, b } = getRGBValues(hex);

  return rgbToRGBA(r, g, b, alpha);
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

const getMixColors = (hex1: string, hex2: string) => {
  const darkerColor = getRGBValues(hex1);
  const lighterColor = getRGBValues(hex2);

  const mixWithPercent = (
    higherNumber: number,
    lowerNumber: number,
    percent: number
  ) => lowerNumber + (higherNumber - lowerNumber) * percent;

  return {
    10: rgbToRGBA(
      Math.round(mixWithPercent(darkerColor.r, lighterColor.r, 0.1)),
      Math.round(mixWithPercent(darkerColor.g, lighterColor.g, 0.1)),
      Math.round(mixWithPercent(darkerColor.b, lighterColor.b, 0.1))
    ),
    20: rgbToRGBA(
      Math.round(mixWithPercent(darkerColor.r, lighterColor.r, 0.2)),
      Math.round(mixWithPercent(darkerColor.g, lighterColor.g, 0.2)),
      Math.round(mixWithPercent(darkerColor.b, lighterColor.b, 0.2))
    ),
    30: rgbToRGBA(
      Math.round(mixWithPercent(darkerColor.r, lighterColor.r, 0.3)),
      Math.round(mixWithPercent(darkerColor.g, lighterColor.g, 0.3)),
      Math.round(mixWithPercent(darkerColor.b, lighterColor.b, 0.3))
    ),
    40: rgbToRGBA(
      Math.round(mixWithPercent(darkerColor.r, lighterColor.r, 0.4)),
      Math.round(mixWithPercent(darkerColor.g, lighterColor.g, 0.4)),
      Math.round(mixWithPercent(darkerColor.b, lighterColor.b, 0.4))
    ),
    50: rgbToRGBA(
      Math.round(mixWithPercent(darkerColor.r, lighterColor.r, 0.5)),
      Math.round(mixWithPercent(darkerColor.g, lighterColor.g, 0.5)),
      Math.round(mixWithPercent(darkerColor.b, lighterColor.b, 0.5))
    ),
    60: rgbToRGBA(
      Math.round(mixWithPercent(darkerColor.r, lighterColor.r, 0.6)),
      Math.round(mixWithPercent(darkerColor.g, lighterColor.g, 0.6)),
      Math.round(mixWithPercent(darkerColor.b, lighterColor.b, 0.6))
    ),
    70: rgbToRGBA(
      Math.round(mixWithPercent(darkerColor.r, lighterColor.r, 0.7)),
      Math.round(mixWithPercent(darkerColor.g, lighterColor.g, 0.7)),
      Math.round(mixWithPercent(darkerColor.b, lighterColor.b, 0.7))
    ),
    80: rgbToRGBA(
      Math.round(mixWithPercent(darkerColor.r, lighterColor.r, 0.8)),
      Math.round(mixWithPercent(darkerColor.g, lighterColor.g, 0.8)),
      Math.round(mixWithPercent(darkerColor.b, lighterColor.b, 0.8))
    ),
    90: rgbToRGBA(
      Math.round(mixWithPercent(darkerColor.r, lighterColor.r, 0.9)),
      Math.round(mixWithPercent(darkerColor.g, lighterColor.g, 0.9)),
      Math.round(mixWithPercent(darkerColor.b, lighterColor.b, 0.9))
    ),
  };
};

export const darkToLightMix = getMixColors(lightColor, darkColor);
export const primaryToDarkMix = getMixColors(primaryColor, darkColor);
export const lightToPrimaryMix = getMixColors(lightColor, primaryColor);
