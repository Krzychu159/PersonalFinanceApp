/** @type {import('tailwindcss').Config} */
export default {
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
      },
    },
  },
};
