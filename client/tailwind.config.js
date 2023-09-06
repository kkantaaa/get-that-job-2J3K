/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        Pink: { DEFAULT: "hsl(var(--Pink))" },
        LightPink: { DEFAULT: "hsl(var(--LightPink))" },
        DarkPink: { DEFAULT: "hsl(var(--DarkPink))" },

        Gray: { DEFAULT: "hsl(var(--Gray))" },
        LightGray: { DEFAULT: "hsl(var(--LightGray))" },
        DarkGray: { DEFAULT: "hsl(var(--DarkGray))" },

        Content: { DEFAULT: "hsl(var(--Content))" },
        ContentSecondary: { DEFAULT: "hsl(var(--ContentSecondary))" },
        White: { DEFAULT: "hsl(var(--White))" },

        Background: {
          DEFAULT: "hsl(var(--Background))",
          foreground: "hsl(var(--Background-foreground))",
        },
        BackgroundDark: { DEFAULT: "hsl(var(--BackgroundDark))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontFamily: {
      Inter: ["Inter", "sans-serif"],
      Montserrat: ["Montserrat", "sans-serif"],
    },
    fontSize: {
      Headline1: ["97px", "118.24px"],
      Headline2: ["61px", "74.36px"],
      Headline3: ["48px", "58.51px"],
      Headline4: ["34px", "41.45px"],
      Headline5: ["24px", "29.26px"],
      Headline6: ["20px", "28px"],
      Subtitle1: ["16px", "19.5px"],
      Subtitle2: ["14px", "18px"],
      Body1: ["16px", "24px"],
      Body2: ["14px", "20px"],
      Button: ["14px", "24px"],
      Caption: ["12px", "16px"],
      Overline: ["10px", "12.1px"],
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
};
