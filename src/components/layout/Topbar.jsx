import { LogOut } from "lucide-react";
import { NAV_ITEMS } from "./Sidebar.jsx";

export default function Topbar({ page, user, onLogout }) {
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
      {/* Logo */}
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800, fontSize: "1.05rem",
        color: "var(--accent)",
      }}>
        Steady<span style={{ color: "var(--logo-sub)" }}>Rise</span>
      </span>

      {/* Page label */}
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600, fontSize: "0.88rem",
        color: "var(--text3)",
      }}>
        {label}
      </span>

      {/* Avatar + Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {user?.avatar ? (
          <img src={user.avatar} width={28} height={28}
            style={{ borderRadius: 8, objectFit: "cover" }} alt="avatar" />
        ) : (
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg, var(--accent2), var(--accent))",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--bg)", fontWeight: 700, fontSize: "0.78rem",
          }}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}
        <button
          onClick={onLogout}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text3)", display: "flex", padding: 4,
            borderRadius: 8, transition: "color 0.15s",
          }}
          onTouchStart={(e) => e.currentTarget.style.color = "var(--highlight)"}
          onTouchEnd={(e) => e.currentTarget.style.color = "var(--text3)"}
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}