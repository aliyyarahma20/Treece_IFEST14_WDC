import { X, LogOut } from "lucide-react";
import {
  LayoutDashboard, CheckSquare, Target, Bell,
  BarChart2, BookOpen, Timer, Activity,
} from "lucide-react";
import { Divider } from "../ui/index.jsx";
import ThemeToggle from "../ThemeToggle.jsx";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",        icon: LayoutDashboard },
  { id: "todo",      label: "Task Manager",     icon: CheckSquare     },
  { id: "target",    label: "Target",           icon: Target          },
  { id: "reminder",  label: "Smart Reminder",   icon: Bell            },
  { id: "recap",     label: "Monthly Recap",    icon: BarChart2       },
  { id: "notes",     label: "Catatan Belajar",  icon: BookOpen        },
  { id: "pomodoro",  label: "Pomodoro Timer",   icon: Timer           },
  { id: "habit",     label: "Habit Tracker",    icon: Activity        },
];

export default function Sidebar({ activePage, setPage, open, onClose, user, onLogout }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fade-in show-mobile"
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 198,
          }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          left: 0, top: 0, bottom: 0,
          width: 220,
          background: "var(--bg2)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          zIndex: 199,
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            aside {
              transform: ${open ? "translateX(0)" : "translateX(-100%)"};
            }
          }
        `}</style>

        {/* Logo */}
        <div
          style={{
            padding: "22px 20px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.15rem",
              color: "var(--accent)",
            }}
          >
            Steady<span style={{ color: "var(--orange)" }}>Rise</span>
          </span>
          <button
            className="show-mobile"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text3)",
              display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <Divider />

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            padding: "12px 10px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = activePage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); onClose(); }}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  background: active ? "var(--lime-mute)" : "transparent",
                  border: `1px solid ${active ? "var(--border)" : "transparent"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: active ? "var(--accent)" : "var(--text2)",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.86rem",
                  fontWeight: active ? 600 : 400,
                  transition: "all 0.15s",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                {active && <div className="nav-indicator" />}
                <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <Divider />

        {/* User + Theme */}
        <div style={{ padding: "12px 10px" }}>
          <div
            style={{
              background: "var(--surface2)",
              borderRadius: 12,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 32, height: 32,
                borderRadius: 10,
                background: "linear-gradient(135deg, var(--forest, #415111), var(--accent))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--bg)",
                fontWeight: 700,
                fontSize: "0.85rem",
                flexShrink: 0,
              }}
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.name || "Pengguna"}
              </div>
              <div style={{ fontSize: "0.71rem", color: "var(--text3)" }}>
                Mahasiswa Aktif
              </div>
            </div>
            <button
              onClick={onLogout}
              data-tip="Keluar"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text3)",
                display: "flex",
                padding: 2,
                transition: "color 0.15s",
              }}
            >
              <LogOut size={14} />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              padding: "0 2px",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Tema</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}
