import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"

const emoji = "Segoe UI Emoji"
const mono = "IBM Plex Mono"
const sans = "IBM Plex Sans"
const condensed = "IBM Plex Sans Condensed"
const serif = "IBM Plex Serif"

const config: Config = {
  content: ["./**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        mono: [mono, emoji, "monospace"],
        sans: [sans, emoji, "sans-serif"],
        condensed: [condensed, emoji, "sans-serif"],
        serif: [serif, emoji, "serif"],
      },
      colors: {
        primary: colors.blue,
        neutral: colors.neutral,
        success: colors.green,
        warning: colors.orange,
        danger: colors.red,
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        text: "450",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      rotate: {
        "-30": "-30deg",
        "-15": "-15deg",
        15: "15deg",
        30: "30deg",
      },
    },
  },
}

export default config
