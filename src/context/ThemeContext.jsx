import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const THEMES = [
  "morning-mist",
  "lavender-sky",
  "rose-petal",
  "midnight",
  "blush-dusk",
  "slate",
];

const ThemeCtx = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("sr_theme", "morning-mist");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);