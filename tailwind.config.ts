import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
            'black': '#121212',
        },
    },
  },
  plugins: [],
} satisfies Config;
