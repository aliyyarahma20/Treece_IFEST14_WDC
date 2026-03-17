import { TrendingUp, Flame, Star, BarChart2 } from "lucide-react";
import { Card, Badge } from "../components/ui/index.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const DATA = { tasks: 23, hours: 41, days: 12, prevTasks: 19, prevHours: 35, prevDays: 10 };
const PRODUCTIVE_DAYS = [3, 5, 6, 10, 11, 12, 17, 18, 19, 22, 23, 24, 26];

export default function RecapPage() {
  const improvePct = Math.round(((DATA.tasks - DATA.prevTasks) / DATA.prevTasks) * 100);
  const { t, lang } = useLanguage();
  const now = new Date();
  const monthName = now.toLocaleString(lang === "id" ? "id-ID" : "en-US", { month: "long" });
  const monthYear = `${monthName} ${now.getFullYear()}`;
  const WEEK = [
    { l: t.recap.week1, v: 5 },
    { l: t.recap.week2, v: 8 },
    { l: t.recap.week3, v: 6 },
    { l: t.recap.week4, v: 4 },
  ];
  const MAX_V = Math.max(...WEEK.map((d) => d.v));
  return (
    <div className="fade-up" style={{ paddingBottom: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text)", letterSpacing: "-0.5px" }}>{t.recap.title}</h1>
        <div style={{ fontSize: "0.85rem", color: "var(--text3)" }}>{t.recap.summaryPrefix} {monthYear}</div>
      </div>

      {/* Hero */}
      <div
        style={{
          background: "var(--hero-bg)",
          borderRadius: 20,
          padding: "clamp(20px, 5vw, 32px) clamp(18px, 5vw, 36px)",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: 24, bottom: -10, opacity: 0.08, color: "var(--hero-text)" }}><BarChart2 size={160} /></div>
        <div style={{ marginBottom: 12 }}>
          <Badge color="--text">+{improvePct}% {t.recap.vsLastMonth}</Badge>
        </div>

        <div style={{ fontSize: "0.8rem", color: "var(--hero-label)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>
          {t.recap.recapLabel} · {monthYear.toUpperCase()}
        </div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "var(--hero-text)", marginBottom: 20, lineHeight: 1.2 }}>
          {t.recap.greatWork}
        </div>
        <div style={{ display: "flex", gap: "clamp(16px, 5vw, 32px)", flexWrap: "wrap" }}>
          {[
            { num: DATA.tasks,        label: t.recap.completed      },
            { num: `${DATA.hours}h`,  label: t.recap.studyHours     },
            { num: DATA.days,         label: t.recap.productiveDays },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--hero-text)" }}>{s.num}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--hero-sub)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 20,
            background: "var(--mute)",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: "0.83rem",
            color: "var(--hero-sub)",
            borderLeft: "2px solid var(--accent)",
            display: "inline-flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          <Flame size={14} />
          {t.recap.mostProductiveDay} <strong>{t.recap.wednesday}</strong>
          &nbsp;·&nbsp;
          <Star size={14} />
          {t.recap.mostProductiveTime} <strong>{t.recap.night}</strong>
        </div>
      </div>

      <div className="grid-2col" style={{ gap: 16, marginBottom: 16 }}>
        {/* Bar chart */}
        <Card>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            {t.recap.weeklyTasks}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 200 }}>
            {WEEK.map((w, i) => (
              <div key={i} style={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "flex-end",
                gap: 6, 
                height: "100%"
              }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text3)" }}>{w.v}</span>
                <div
                  style={{
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: i === 1 ? "var(--highlight)" : "var(--mute)",
                    border: `1px solid var(--border)`,
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
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            {t.recap.lastMonthComparison}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: t.recap.completed,      cur: DATA.tasks,  prev: DATA.prevTasks  },
              { label: t.recap.studyHours,     cur: DATA.hours,  prev: DATA.prevHours  },
              { label: t.recap.productiveDays, cur: DATA.days,   prev: DATA.prevDays   },
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
                  <div style={{ flex: c.prev, background: "var(--accent)" }} />
                  <div style={{ flex: c.cur - c.prev, background: "var(--border)" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Day Badges */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 14, color: "var(--text)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          {t.recap.productiveDaysMonth} {monthName}
          <div style={{ display: "flex", gap: 14, fontSize: "0.75rem", color: "var(--text3)" }}>
            <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: "var(--accent)" }} /> {t.recap.productive}
            </span>
            <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: "var(--border)" }} /> {t.recap.regular}
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
                  width: "clamp(28px, 8vw, 36px)", height: "clamp(28px, 8vw, 36px)",
                  borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: prod ? "var(--mute)" : "var(--surface2)",
                  border: `1px solid ${prod ? "var(--accent)" : "var(--border)"}`,
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
