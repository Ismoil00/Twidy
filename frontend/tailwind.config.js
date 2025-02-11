/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand_white: "#FFFFFF",
        brand_gray: "#F2F2FE",
        brand_blue: "#615DFA",
        brand_light_blue: "#58AAFF",
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
      fontWeight: {
        600: "600",
        700: "700",
      },
      fontSize: {
        "36px": "2.25rem",
        "18px": "1.125rem",
        "16px": "1rem",
      },
      boxShadow: {
        error_red: "0 0px 10px rgba(255, 0, 0, 0.5)",
        "custom-sm": "0 0px 5px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        moveLeftKeyPoints_01: {
          "0%": { width: "0" },
          "100%": { width: "100px" },
        },
        moveLeftKeyPoints_02: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100px)" },
        },
        closeSidebar: {
          "0%": { left: "0" },
          "100%": { left: "-100%" },
        },
        openSidebar: {
          "0%": { left: "-100%" },
          "100%": { left: "0" },
        },
        closeSidebarIcon: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-75%)" },
        },
        openSidebarIcon: {
          "0%": { transform: "translateX(-75%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        moveLeft_01: "moveLeftKeyPoints_01 0.3s ease-out forwards",
        moveLeft_02: "moveLeftKeyPoints_02 0.3s ease-out forwards",
        closeSidebarAnimation: "closeSidebar 0.3s ease-out forwards",
        openSidebarAnimation: "openSidebar 0.3s ease-out forwards",
        closeSidebarIconAnimation: "closeSidebarIcon 0.3s ease-out forwards",
        openSidebarIconAnimation: "openSidebarIcon 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
