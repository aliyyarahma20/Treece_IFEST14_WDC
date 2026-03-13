import { useState } from "react";

const SIZES = {
  sm: { padding: "8px 14px",  fontSize: "0.8rem"   },
  md: { padding: "11px 20px", fontSize: "0.875rem" },
  lg: { padding: "14px 28px", fontSize: "0.95rem"  },
};

const VARIANTS = {
  primary:   { background: "var(--accent)",       color: "var(--bg)"    },
  secondary: { background: "var(--lime-mute)",    color: "var(--accent)", border: "1px solid var(--border)" },
  ghost:     { background: "transparent",         color: "var(--text2)", border: "1px solid var(--border)" },
  danger:    { background: "var(--orange-mute)",  color: "var(--orange)"  },
};

const HOVER = {
  primary:   { filter: "brightness(0.9)", transform: "translateY(-1px)" },
  secondary: { filter: "brightness(0.95)" },
  ghost:     { background: "var(--surface2)" },
  danger:    { filter: "brightness(0.95)" },
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  style = {},
  disabled = false,
  type = "button",
  className = "", 
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      className={className} 
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600,
        borderRadius: 10,
        transition: "all 0.2s",
        opacity: disabled ? 0.5 : 1,
        ...SIZES[size],
        ...VARIANTS[variant],
        ...(hover && !disabled ? HOVER[variant] : {}),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
