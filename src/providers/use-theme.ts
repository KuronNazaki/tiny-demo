import { createContext, useContext } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const INITIAL_STATE: ThemeState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeContext = createContext<ThemeState>(INITIAL_STATE);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
