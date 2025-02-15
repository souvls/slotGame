import { url } from "inspector";
const flowbite = require("flowbite-react/tailwind");
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg1': "url('/assets/bg/bg-game.webp')"
      }
    },
  },
  darkMode: "class",
  plugins: [
    require("flowbite/plugin"),
    flowbite.content(),
  ],
};
export default config;
