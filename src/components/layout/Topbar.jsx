import { NAV_ITEMS } from "./Sidebar.jsx";

export default function Topbar({ page }) {
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
        justifyContent: "space-between",
        padding: "0 16px",
      }}
    >
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800, fontSize: "1.05rem",
        color: "var(--accent)",
      }}>
        Steady<span style={{ color: "var(--logo-sub)" }}>Rise</span>
      </span>
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600, fontSize: "0.88rem",
        color: "var(--text3)",
      }}>
        {label}
      </span>
    </div>
  );
}