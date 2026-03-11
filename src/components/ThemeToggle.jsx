import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-tip={theme === "light" ? "Mode Gelap" : "Mode Terang"}
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        border: "1px solid var(--border)",
        background: hover ? "var(--surface2)" : "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text2)",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
