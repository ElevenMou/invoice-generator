"use client";

import Loading from "@/components/UI/Loading";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(() => {
    // Retrieve and apply the saved theme from localStorage, or default to "light"
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme) {
        return savedTheme;
      }
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }
    return "light"; // Default value for server-side rendering
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Apply the theme to localStorage and document
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
    setLoading(false);
  }, [theme]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
