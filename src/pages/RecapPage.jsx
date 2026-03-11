import { TrendingUp, Flame, Star, BarChart2 } from "lucide-react";
import { Card, Badge } from "../components/ui/index.jsx";

const DATA = { tasks: 23, hours: 41, days: 12, prevTasks: 19, prevHours: 35, prevDays: 10 };
const WEEK  = [{ l: "Mgg 1", v: 5 }, { l: "Mgg 2", v: 8 }, { l: "Mgg 3", v: 6 }, { l: "Mgg 4", v: 4 }];
const MAX_V = Math.max(...WEEK.map((d) => d.v));
const PRODUCTIVE_DAYS = [3, 5, 6, 10, 11, 12, 17, 18, 19, 22, 23, 24, 26];

export default function RecapPage() {
  const improvePct = Math.round(((DATA.tasks - DATA.prevTasks) / DATA.prevTasks) * 100);

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text)", letterSpacing: "-0.5px" }}>Monthly Recap</h1>
        <div style={{ fontSize: "0.85rem", color: "var(--text3)" }}>Ringkasan produktivitas Februari 2026</div>
      </div>

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #415111 0%, #2e3a16 60%, #1a2608 100%)",
          borderRadius: 20,
          padding: "32px 36px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -20, bottom: -20, opacity: 0.05 }}><BarChart2 size={200} /></div>
        <div style={{ position: "absolute", top: 20, right: 24 }}>
          <Badge color="lime">+{improvePct}% vs bulan lalu</Badge>
        </div>

        <div style={{ fontSize: "0.8rem", color: "rgba(252,191,147,0.8)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>
          Recap · Februari 2026
        </div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#D2E186", marginBottom: 20, lineHeight: 1.2 }}>
          Kerja bagus! Kamu lebih<br />produktif bulan ini.
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {[
            { num: DATA.tasks,        label: "Tugas Selesai"  },
            { num: `${DATA.hours}h`,  label: "Jam Belajar"    },
            { num: DATA.days,         label: "Hari Produktif" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "2rem", color: "#FEFEFE" }}>{s.num}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(242,232,223,0.55)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 20,
            background: "rgba(210,225,134,0.1)",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: "0.83rem",
            color: "rgba(210,225,134,0.85)",
            borderLeft: "2px solid #D2E186",
            display: "inline-flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Flame size={14} />
          Hari paling produktif: <strong>Rabu</strong>
          &nbsp;·&nbsp;
          <Star size={14} />
          Paling produktif di <strong>malam hari</strong>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Bar chart */}
        <Card>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16 }}>
            Tugas Selesai per Minggu
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130 }}>
            {WEEK.map((w, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text3)" }}>{w.v}</span>
                <div
                  style={{
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: i === 1 ? "var(--orange)" : "var(--lime-mute)",
                    border: `1px solid ${i === 1 ? "transparent" : "var(--border)"}`,
                    height: `${(w.v / MAX_V) * 90}%`,
                    minHeight: 8,
                    transition: "height 0.8s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
                <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{w.l}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Comparison */}
        <Card>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16 }}>
            Perbandingan Bulan Lalu
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Tugas Selesai", cur: DATA.tasks,  prev: DATA.prevTasks  },
              { label: "Jam Belajar",   cur: DATA.hours,  prev: DATA.prevHours  },
              { label: "Hari Produktif",cur: DATA.days,   prev: DATA.prevDays   },
            ].map((c, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text2)" }}>{c.label}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ color: "var(--text3)", fontSize: "0.75rem" }}>{c.prev}</span>
                    <TrendingUp size={12} color="var(--accent)" />
                    <span style={{ fontWeight: 700, color: "var(--accent)" }}>{c.cur}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 3, height: 6, borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ flex: c.prev, background: "var(--border)" }} />
                  <div style={{ flex: c.cur - c.prev, background: "var(--accent)" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Day Badges */}
      <Card>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          Hari Produktif Februari
          <div style={{ display: "flex", gap: 14, fontSize: "0.75rem", color: "var(--text3)" }}>
            <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: "var(--lime)" }} /> Produktif
            </span>
            <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: "var(--border)" }} /> Normal
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Array(28).fill(null).map((_, i) => {
            const d    = i + 1;
            const prod = PRODUCTIVE_DAYS.includes(d);
            return (
              <div
                key={d}
                style={{
                  width: 36, height: 36,
                  borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: prod ? "var(--lime-mute)" : "var(--surface2)",
                  border: `1px solid ${prod ? "var(--lime)" : "var(--border)"}`,
                  color: prod ? "var(--accent)" : "var(--text3)",
                  fontSize: "0.78rem",
                  fontWeight: prod ? 700 : 400,
                }}
              >
                {d}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
