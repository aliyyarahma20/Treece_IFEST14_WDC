import { CheckCircle2, Circle, Clock, Flame, AlertCircle } from "lucide-react";
import { Card, ProgressBar } from "../components/ui/index.jsx";
import { MONTHS, WEEKDAYS } from "../utils/helpers.js";
import { useWrappedVisibility } from "../utils/wrappedVisibility.js";
import WrappedSwipeCards from "../components/ui/wrapped.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

function StatCard({ label, value, sub, icon, accent, delay = 0 }) {
  return (
    <Card
      className="lift fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ color: "var(--accent)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px" }}>
          {label}
        </div>
        <div style={{ color: accent, opacity: 0.75 }}>{icon}</div>
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "var(--text)", lineHeight: 1, marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{sub}</div>
    </Card>
  );
}

export default function Dashboard({ tasks, setTasks }) {
  const today = new Date();
  const done  = tasks.filter((t) => t.done).length;
  const high  = tasks.filter((t) => t.priority === "high" && !t.done).length;
  const { isVisible, prevMonth, prevYear, monthLabel } = useWrappedVisibility();
  const toggleDone = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const { t } = useLanguage();

  const wrappedData = {
    monthLabel,
    stats: {
      tasksDone:  { value: 84,   delta: "↑ 12 dari bulan lalu" },
      focusTime:  { value: 42,   unit: "hrs",  delta: "↑ 6hrs" },
      notes:      { value: 31,   unit: "baru", delta: "+7 minggu ini" },
      bestStreak: { value: 18,   unit: "hari", delta: "Personal best!" },
    },
    categories: [
      { label: "Work",     pct: 48, color: "#fb8159" },
      { label: "Learning", pct: 30, color: "#1D9E75" },
      { label: "Personal", pct: 22, color: "rgba(255,255,255,0.2)" },
    ],
    streakDays: [1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0],
    topTags: ["Design", "Deep work"],
    allTags: ["Reading", "Meetings", "Planning"]
  };

  const weekActivity = [
    { d: t.dashboard.weekDays[0], h: 2.5 },
    { d: t.dashboard.weekDays[1], h: 4   },
    { d: t.dashboard.weekDays[2], h: 6   },
    { d: t.dashboard.weekDays[3], h: 3   },
    { d: t.dashboard.weekDays[4], h: 5   },
    { d: t.dashboard.weekDays[5], h: 1.5 },
    { d: t.dashboard.weekDays[6], h: 2   },
  ];
  const maxH = Math.max(...weekActivity.map((w) => w.h));

  const firstDay     = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth  = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const productive   = [2, 4, 5, 7, 9, 10, 11, 14, 16, 17, 18, 21, 23];

  return (
    <div className="fade-up">
      {/* Greeting */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "var(--text)", letterSpacing: "-0.5px", marginBottom: 4 }}>
          {t.dashboard.welcomeBack}
        </h1>
        <div style={{ fontSize: "0.88rem", color: "var(--text3)" }}>
          {t.dashboard.weekdays[today.getDay()]}, {today.getDate()} {t.dashboard.months[today.getMonth()]} {today.getFullYear()}
        </div>
      </div>

      {/* ── Wrapped — muncul 3 hari pertama tiap bulan ── */}
      {isVisible && (
        <div style={{
          marginBottom: 28,
          display: "flex",
          justifyContent: "center",   // kartu 300px centered di dashboard
        }}>
          <WrappedSwipeCards
            month={prevMonth}
            year={prevYear}
            data={wrappedData}
          />
        </div>
      )}

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard label={t.dashboard.tasksDone}    value={done}   sub={t.dashboard.tasksDoneSub(tasks.length)}  icon={<CheckCircle2 size={20}/>} accent="var(--highlight)" delay={0}  />
        <StatCard label={t.dashboard.highPriority} value={high}   sub={t.dashboard.highPrioritySub}             icon={<AlertCircle  size={20}/>} accent="var(--highlight)" delay={80} />
        <StatCard label={t.dashboard.streak}       value="5"      sub={t.dashboard.streakSub}                   icon={<Flame        size={20}/>} accent="red"  delay={160}/>
        <StatCard label={t.dashboard.studyHours}   value="3.5h"   sub={t.dashboard.studyHoursSub}               icon={<Clock        size={20}/>} accent="var(--highlight)"   delay={240}/>
      </div>

      {/* Charts */}
      <div className="grid-2col" style={{ gap: 16, marginBottom: 16 }}>
        {/* Weekly bar chart */}
        <Card>
          <div style={{fontWeight: 700, fontSize: "0.95rem", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", color:"var(--accent)" }}>
            {t.dashboard.weeklyActivity}
            <span style={{ fontSize: "0.75rem", color: "var(--text3)", fontWeight: 400 }}>{t.dashboard.studyHoursLabel}</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
            {weekActivity.map((w, i) => {
              const isToday = i === ((today.getDay() + 6) % 7);
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${(w.h / maxH) * 90}%`,
                      minHeight: 4,
                      background: isToday ? "var(--highlight)" : "var(--mute)",
                      border: isToday ? "none" : "1px solid var(--border)",
                      borderRadius: "6px 6px 0 0",
                      transition: "height 0.6s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                  <span style={{ fontSize: "0.68rem", color: isToday ? "var(--accent)" : "var(--text3)", fontWeight: isToday ? 700 : 400 }}>
                    {w.d}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Mini calendar */}
        <Card>
          <div style={{fontWeight: 700, fontSize: "0.95rem", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--accent)" }}>
            {t.dashboard.months[today.getMonth()]} {today.getFullYear()}
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", color: "var(--text3)"}}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: "var(--accent)" }} />
              {t.dashboard.productive}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
            {t.dashboard.calendarDays.map((d, i) => (
              <div key={i} style={{ textAlign: "center", fontSize: "0.68rem", color: "var(--text3)", fontWeight: 600, paddingBottom: 4 }}>{d}</div>
            ))}
            {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const d = i + 1;
              const isToday = d === today.getDate();
              const isProd  = productive.includes(d);
              return (
                <div
                  key={d}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.73rem",
                    background: isToday ? "var(--highlight)" : isProd ? "var(--mute)" : "transparent",
                    color: isToday ? "#fff" : isProd ? "var(--accent)" : "var(--text3)",
                    fontWeight: isToday ? 700 : 400,
                  }}
                >
                  {d}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent + Targets */}
      <div className="grid-2col" style={{ gap: 16 }}>
        <Card>
          <div style={{fontWeight: 700, fontSize: "0.95rem", marginBottom: 14, display: "flex", justifyContent: "space-between", color: "var(--accent)"}}>
            {t.dashboard.recentTasks}
            <span style={{ fontSize: "0.78rem", color: "var(--text3)", fontWeight: 400 }}>
              {t.dashboard.pendingTasks(tasks.filter((task) => !task.done).length)}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tasks.slice(0, 5).map((t) => (
              <div
                key={t.id}
                onClick={() => toggleDone(t.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 10px",
                  background: t.done ? "var(--surface2)" : "transparent",
                  borderRadius: 8, opacity: t.done ? 0.5 : 1,
                  cursor: "pointer"
                }}
              >
                {t.done
                  ? <CheckCircle2 size={15} color="var(--accent)" />
                  : <Circle size={15} color="var(--text3)" />}
                <span style={{ flex: 1, fontSize: "0.85rem", color: "var(--text)", textDecoration: t.done ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t.name}
                </span>
                <div style={{ width: 6, height: 6, borderRadius: 99, flexShrink: 0, background: t.priority === "high" ? "var(--highlight)" : t.priority === "medium" ? "var(--highlight2)" : "var(--lime)" }} />
              </div>
            ))}
            {!tasks.length && (
              <div style={{ textAlign: "center", color: "var(--text3)", fontSize: "0.85rem", padding: "16px 0" }}>
                {t.dashboard.noTasks}
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div style={{fontWeight: 700, fontSize: "0.95rem", marginBottom: 14, color: "var(--accent)" }}>
            {t.dashboard.targetProgress}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontWeight: 700 }}>
            {[
              { label: t.dashboard.studyHoursTarget, current: 24,   goal: 30, color: "var(--accent)"    },
              { label: t.dashboard.tasksDoneTarget,  current: done, goal: 20, color: "var(--highlight)"  },
              { label: t.dashboard.productiveDays,   current: 12,   goal: 20, color: "var(--highlight2)" },
            ].map((t, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text2)" }}>{t.label}</span>
                  <span style={{ fontWeight: 600, color: "var(--text)" }}>{t.current}/{t.goal}</span>
                </div>
                <ProgressBar value={t.current} max={t.goal} color={t.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
