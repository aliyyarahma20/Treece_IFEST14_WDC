import { useEffect } from "react";

/* ── CARD ── */
export function Card({ children, style = {}, className = "" }) {
  return (
    <div
      className={className}
      style={{
        background: "var(--surface)",
        borderRadius: 16,
        padding: "20px 22px",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── BADGE ── */
const BADGE_COLORS = {
  lime:   { bg: "var(--lime-mute)",   color: "var(--accent)"  },
  orange: { bg: "var(--orange-mute)", color: "var(--orange)"  },
  muted:  { bg: "var(--surface2)",    color: "var(--text3)"   },
  peach:  { bg: "rgba(252,191,147,0.25)", color: "#c96a2a"    },
};

export function Badge({ children, color = "lime" }) {
  const c = BADGE_COLORS[color] || BADGE_COLORS.muted;
  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 99,
        fontSize: "0.72rem",
        fontWeight: 600,
        background: c.bg,
        color: c.color,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/* ── MODAL ── */
export function Modal({ open, onClose, children, maxW = 480 }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fade-in"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        className="scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          borderRadius: 20,
          padding: "32px 28px",
          width: "100%",
          maxWidth: maxW,
          boxShadow: "var(--shadow-lg)",
          border: "1px solid var(--border)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── PROGRESS BAR ── */
export function ProgressBar({ value, max, color = "var(--accent)", height = 8 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div
      style={{
        height,
        background: "var(--border2)",
        borderRadius: 99,
        overflow: "hidden",
      }}
    >
      <div
        className="progress-animated"
        style={{
          height: "100%",
          width: `${pct}%`,
          background: color,
          borderRadius: 99,
        }}
      />
    </div>
  );
}

/* ── DIVIDER ── */
export function Divider({ style = {} }) {
  return (
    <div style={{ height: 1, background: "var(--border)", ...style }} />
  );
}

/* ── SELECT ── */
export function Select({ label, value, onChange, options, style = {} }) {
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
      <select
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "11px 14px",
          border: "1.5px solid var(--border)",
          borderRadius: 10,
          background: "var(--surface2)",
          color: "var(--text)",
          fontSize: "0.9rem",
          outline: "none",
          cursor: "pointer",
          ...style,
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ── PAGE HEADER ── */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "var(--text)",
            letterSpacing: "-0.5px",
            marginBottom: 4,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <div style={{ fontSize: "0.85rem", color: "var(--text3)" }}>
            {subtitle}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}
