import { useState } from "react";

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  hint,
  style = {},
  onKeyDown,
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "var(--text2)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {icon && (
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text3)",
              pointerEvents: "none",
              display: "flex",
            }}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={onKeyDown}
          style={{
            width: "100%",
            padding: icon ? "11px 14px 11px 40px" : "11px 14px",
            border: `1.5px solid ${focus ? "var(--accent)" : "var(--border)"}`,
            borderRadius: 10,
            background: "var(--surface2)",
            color: "var(--text)",
            fontSize: "0.9rem",
            outline: "none",
            transition: "border-color 0.2s",
            ...style,
          }}
        />
      </div>
      {hint && (
        <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{hint}</div>
      )}
    </div>
  );
}
