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

  useEffect(() => {
    const session = localStorage.getItem("sr_session");
    const hasValidSession = (() => {
      try {
        const parsed = JSON.parse(session);
        return Date.now() < parsed.expiresAt;
      } catch { return false; }
    })();
    document.body.setAttribute("data-theme", hasValidSession ? theme : "morning-mist");
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);