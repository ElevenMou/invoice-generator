"use client";

import { useEffect, useState } from "react";
import { Theme, useTheme } from "@/contexts/ThemeContext";
import { twMerge } from "tailwind-merge";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState<Theme>(theme);

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    setSelected(theme);
  };

  useEffect(() => {
    setSelected(theme);
  }, [theme]);

  return (
    <div className={twMerge("flex border-primary_3 border rounded-lg h-8")}>
      <SelectButton
        onClick={() => handleThemeChange("light")}
        selected={theme === "light"}
      >
        <span>Light</span>
      </SelectButton>
      <SelectButton
        onClick={() => handleThemeChange("dark")}
        selected={theme === "dark"}
      >
        <span>Dark</span>
      </SelectButton>
    </div>
  );
};

type SelectButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
};

const SelectButton: React.FC<SelectButtonProps> = ({
  children,
  onClick,
  selected,
}) => {
  return (
    <button
      className={twMerge(
        "flex items-center justify-between w-full px-3 py-2 text-left rounded-lg",
        selected ? "bg-primary_5 text-neutral_0" : "bg-card text-text"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
