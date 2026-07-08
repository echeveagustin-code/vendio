/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#00256F",
          paper: "#F1F2EB",
          accent: "#816C61",
          ink: "#0D1B3E",
          mist: "#E4E5DC",
        },
      },
      fontFamily: {
        display: ["Lufga", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        sora: ["Sora", "Lufga", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 55px rgba(0, 37, 111, 0.13)",
        lift: "0 22px 65px rgba(0, 37, 111, 0.18)",
        accent: "0 16px 35px rgba(129, 108, 97, 0.18)",
      },
      opacity: {
        6: "0.06",
        8: "0.08",
        12: "0.12",
        15: "0.15",
        32: "0.32",
        38: "0.38",
        42: "0.42",
        52: "0.52",
        56: "0.56",
        58: "0.58",
        60: "0.6",
        62: "0.62",
        64: "0.64",
        66: "0.66",
        68: "0.68",
        72: "0.72",
      },
    },
  },
  plugins: [],
};
