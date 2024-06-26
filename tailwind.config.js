/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        helv: ["Helvetica Neue", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      transitionProperty: {
        "h-w": "height, width",
      },
    },
  },
  plugins: [],
};
