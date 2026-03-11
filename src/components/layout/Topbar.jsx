import { Menu } from "lucide-react";
import { NAV_ITEMS } from "./Sidebar.jsx";

export default function Topbar({ page, onMenuClick }) {
  const label = NAV_ITEMS.find((n) => n.id === page)?.label || "";

  return (
    <div
      className="show-mobile"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 56,
        zIndex: 90,
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
      }}
    >
      <button
        onClick={onMenuClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text2)",
          display: "flex",
        }}
      >
        <Menu size={22} />
      </button>
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--text)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
