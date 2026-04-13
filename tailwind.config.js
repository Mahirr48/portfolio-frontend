export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        base: "#05070a",
        surface: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.08)",

        accent: {
          green: "#22c55e",
          purple: "#a855f7",
        },
      },

      backdropBlur: {
        glass: "20px",
      },

      boxShadow: {
        glow: "0 0 40px rgba(168,85,247,0.25)",
        soft: "0 10px 40px rgba(0,0,0,0.3)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },

  plugins: [],
};