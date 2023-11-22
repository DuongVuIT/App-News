/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        top: "top",
      },
      width: { "device-width": "360px" },
      height: { "device-height": "640px" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
