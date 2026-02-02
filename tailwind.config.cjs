// tailwind.config.cjs
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          500: "rgb(var(--beige-500) / <alpha-value>)",
          100: "rgb(var(--beige-100) / <alpha-value>)",
        },
        grey: {
          900: "rgb(var(--grey-900) / <alpha-value>)",
          500: "rgb(var(--grey-500) / <alpha-value>)",
          300: "rgb(var(--grey-300) / <alpha-value>)",
          100: "rgb(var(--grey-100) / <alpha-value>)",
        },
        green: "rgb(var(--green) / <alpha-value>)",
        yellow: "rgb(var(--yellow) / <alpha-value>)",
        cyan: "rgb(var(--cyan) / <alpha-value>)",
        navy: "rgb(var(--navy) / <alpha-value>)",
        red: "rgb(var(--red) / <alpha-value>)",
        purple: "rgb(var(--purple) / <alpha-value>)",
        turquoise: "rgb(var(--turquoise) / <alpha-value>)",
        brown: "rgb(var(--brown) / <alpha-value>)",
        magenta: "rgb(var(--magenta) / <alpha-value>)",
        blue: "rgb(var(--blue) / <alpha-value>)",
        "navy-grey": "rgb(var(--navy-grey) / <alpha-value>)",
        "purple-2": "rgb(var(--purple-2) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
