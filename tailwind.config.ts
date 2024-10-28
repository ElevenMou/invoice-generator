import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_1: "var(--color-primary-1)",
        primary_2: "var(--color-primary-2)",
        primary_3: "var(--color-primary-3)",
        primary_4: "var(--color-primary-4)",
        primary_5: "var(--color-primary-5)",
        primary_6: "var(--color-primary-6)",
        primary_7: "var(--color-primary-7)",
        primary_8: "var(--color-primary-8)",
        primary_9: "var(--color-primary-9)",
        neutral_0: "var(--color-neutral-0)",
        neutral_1: "var(--color-neutral-1)",
        neutral_2: "var(--color-neutral-2)",
        neutral_3: "var(--color-neutral-3)",
        neutral_4: "var(--color-neutral-4)",
        neutral_5: "var(--color-neutral-5)",
        neutral_6: "var(--color-neutral-6)",
        neutral_7: "var(--color-neutral-7)",
        neutral_8: "var(--color-neutral-8)",
        neutral_9: "var(--color-neutral-9)",
        neutral_10: "var(--color-neutral-10)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        textLight: "var(--color-text-light)",
        textDark: "var(--color-text-dark)",
        card: "var(--color-card)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
      },
      width: {
        "side-menu": "var(--side-menu-width)",
      },
      height: {
        main: "var(--main-height)",
      },
      screens: {
        xs: "300px",
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fit, 16rem);",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
