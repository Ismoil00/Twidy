/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand_white: "#FFFFFF",
        brand_gray: "#F2F2FE",
        brand_blue: "#615DFA",
        brand_orange: "#FFA012",
        brand_green: "#57BB34",
        brand_red: "#FF3B30",
        brand_text_primary: "#4E3F6F",
        brand_text_secondary: "#8C8CB6",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      borderRadius: {
        "50px": "3.125rem",
        "20px": "1.25rem",
        "16px": "1rem",
        "12px": "0.75rem",
      },
    },
  },
  plugins: [],
};
