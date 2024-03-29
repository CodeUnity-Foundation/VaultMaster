import base from "@keyguard/tailwind-config/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}"],
  theme: base.theme,
  plugins: [base.plugins],
};
