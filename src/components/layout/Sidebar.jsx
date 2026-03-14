import { LogOut, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  LayoutDashboard, CheckSquare, Target,
  BarChart2, BookOpen,
} from "lucide-react";
import { Divider } from "../ui/index.jsx";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",       icon: LayoutDashboard },
  { id: "todo",      label: "Task Manager",    icon: CheckSquare     },
  { id: "target",    label: "Target",          icon: Target          },
  { id: "recap",     label: "Monthly Recap",   icon: BarChart2       },
  { id: "notes",     label: "Catatan Belajar", icon: BookOpen        },
  { id: "settings",  label: "Settings",        icon: Settings        },
];

export default function Sidebar({ activePage, setPage, collapsed, setCollapsed, user, onLogout }) {
  const W = collapsed ? 64 : 220;

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hide-mobile"
        style={{
          position: "fixed",
          left: 0, top: 0, bottom: 0,
          width: W,
          background: "var(--bg2)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          zIndex: 199,
          transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}
      >
        {/* Logo + Toggle */}
        <div style={{
          padding: "18px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          minHeight: 64,
        }}>
          {!collapsed && (
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "var(--accent)",
              whiteSpace: "nowrap",
            }}>
              Steady<span style={{ color: "var(--logo-sub)" }}>Rise</span>
            </span>
          )}
          <button
            onClick={() => setCollapsed((p) => !p)}
            style={{
              background: "none", border: "none",
              cursor: "pointer", color: "var(--text3)",
              display: "flex", padding: 4, borderRadius: 8,
              transition: "color 0.15s, background 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "var(--mute)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text3)"; e.currentTarget.style.background = "none"; }}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <Divider />

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: "12px 8px",
          overflowY: "auto",
          overflowX: "visible",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
        }}>
          {NAV_ITEMS.map((item) => {
            const active = activePage === item.id;
            const Icon = item.icon;
            return (
              <div key={item.id} style={{ position: "relative" }}>
                <button
                  onClick={() => setPage(item.id)}
                  className={`nav-btn ${active ? "active" : ""}`}
                  style={{
                    width: "100%",
                    padding: collapsed ? "10px" : "9px 12px",
                    background: active ? "var(--mute)" : "transparent",
                    border: `1px solid ${active ? "var(--border)" : "transparent"}`,
                    borderRadius: 10,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: collapsed ? 0 : 10,
                    color: active ? "var(--accent)" : "var(--text2)",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.86rem",
                    fontWeight: active ? 600 : 400,
                    transition: "all 0.15s",
                    position: "relative",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "var(--surface2)";
                      e.currentTarget.style.color = "var(--text)";
                    }
                    if (collapsed) {
                      const tip = e.currentTarget.parentElement.querySelector(".sidebar-tip");
                      if (tip) tip.style.opacity = "1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text2)";
                    }
                    if (collapsed) {
                      const tip = e.currentTarget.parentElement.querySelector(".sidebar-tip");
                      if (tip) tip.style.opacity = "0";
                    }
                  }}
                >
                  {active && !collapsed && <div className="nav-indicator" />}
                  <Icon size={17} strokeWidth={active ? 2.5 : 1.8} style={{ flexShrink: 0 }} />
                  {!collapsed && (
                    <span style={{ opacity: 1, transition: "opacity 0.2s" }}>
                      {item.label}
                    </span>
                  )}
                </button>

                {/* Custom tooltip */}
                {collapsed && (
                  <div
                    className="sidebar-tip"
                    style={{
                      position: "fixed",
                      left: 72,
                      opacity: 0,
                      pointerEvents: "none",
                      transition: "opacity 0.15s",
                      background: "var(--accent)",
                      color: "var(--bg)",
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      zIndex: 9999,
                      transform: "translateY(-50%)",
                      marginTop: -16,
                    }}
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <Divider />

        {/* User Card */}
        <div style={{ padding: "12px 8px" }}>
          {collapsed ? (
            // Collapsed: hanya avatar + logout di bawah
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              {user?.avatar ? (
                <img src={user.avatar} width={32} height={32}
                  style={{ borderRadius: 10, objectFit: "cover" }} alt="avatar" />
              ) : (
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "linear-gradient(135deg, var(--accent2), var(--accent))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--bg)", fontWeight: 700, fontSize: "0.85rem",
                }}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <button
                onClick={onLogout}
                data-tip="Keluar"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text3)", display: "flex", padding: 4,
                  borderRadius: 8, transition: "color 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--highlight)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text3)"}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            // Expanded: full user card
            <div style={{
              background: "var(--surface2)", borderRadius: 12,
              padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
            }}>
              {user?.avatar ? (
                <img src={user.avatar} width={32} height={32}
                  style={{ borderRadius: 10, objectFit: "cover", flexShrink: 0 }} alt="avatar" />
              ) : (
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: "linear-gradient(135deg, var(--accent2), var(--accent))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--bg)", fontWeight: 700, fontSize: "0.85rem",
                }}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: "0.82rem", fontWeight: 600, color: "var(--text)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {user?.name || "Pengguna"}
                </div>
                <div style={{ fontSize: "0.71rem", color: "var(--text3)" }}>Mahasiswa Aktif</div>
              </div>
              <button
                onClick={onLogout}
                data-tip="Keluar"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text3)", display: "flex", padding: 2, transition: "color 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--highlight)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text3)"}
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav
        className="show-mobile"
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          height: 64,
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          zIndex: 199,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const active = activePage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                flex: 1, height: "100%",
                background: "none", border: "none",
                cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 3,
                color: active ? "var(--accent)" : "var(--text3)",
                transition: "color 0.15s",
                position: "relative",
              }}
            >
              {active && (
                <div style={{
                  position: "absolute", top: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: 24, height: 2.5,
                  background: "var(--accent)",
                  borderRadius: "0 0 99px 99px",
                }} />
              )}
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span style={{
                fontSize: "0.58rem", fontWeight: active ? 700 : 400,
                fontFamily: "'Outfit', sans-serif",
                whiteSpace: "nowrap",
              }}>
                {item.label === "Catatan Belajar" ? "Catatan" :
                 item.label === "Monthly Recap"   ? "Recap"   :
                 item.label === "Task Manager"    ? "Tugas"   :
                 item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}