import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Flame, Star } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Card, PageHeader } from "../components/ui/index.jsx";
import { todayStr, getStreak } from "../utils/helpers.js";

const INITIAL = [
  { id: 1, name: "Baca 30 Menit",    completions: ["2026-03-07","2026-03-08","2026-03-09","2026-03-10","2026-03-11"], color: "lime"   },
  { id: 2, name: "Review Catatan",   completions: ["2026-03-08","2026-03-09","2026-03-11"],                            color: "peach"  },
  { id: 3, name: "Olahraga Ringan",  completions: ["2026-03-07","2026-03-10","2026-03-11"],                            color: "orange" },
];

const COLOR_DOT  = { lime: "var(--lime)", peach: "var(--peach)", orange: "var(--orange)" };
const COLOR_TEXT = { lime: "var(--forest)", peach: "#c96a2a", orange: "#fff" };

export default function HabitPage() {
  const toast   = useToast();
  const TODAY   = todayStr();
  const [habits, setHabits] = useLocalStorage("sr_habits", INITIAL);
  const [newHabit, setNewHabit] = useState("");
  const [showForm, setShowForm]  = useState(false);

  // Last 7 days
  const last7 = Array(7).fill(0).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return d.toISOString().slice(0, 10);
  });
  const dayLabels = last7.map((d) =>
    new Date(d).toLocaleDateString("id-ID", { weekday: "short" }).slice(0, 3)
  );

  const toggleToday = (id) => {
    setHabits((p) =>
      p.map((h) => {
        if (h.id !== id) return h;
        const done = h.completions.includes(TODAY);
        return {
          ...h,
          completions: done
            ? h.completions.filter((d) => d !== TODAY)
            : [...h.completions, TODAY],
        };
      })
    );
  };

  const del = (id) => { setHabits((p) => p.filter((h) => h.id !== id)); toast("Habit dihapus"); };

  const add = () => {
    if (!newHabit.trim()) { toast("Nama habit wajib diisi!", "error"); return; }
    setHabits((p) => [...p, { id: Date.now(), name: newHabit.trim(), completions: [], color: "lime" }]);
    setNewHabit(""); setShowForm(false);
    toast("Habit baru ditambahkan!");
  };

  return (
    <div className="fade-up">
      <PageHeader
        title="Habit Tracker"
        subtitle="Bangun konsistensi satu hari per hari"
        action={
          <Button onClick={() => setShowForm((p) => !p)}>
            <Plus size={16} /> Habit Baru
          </Button>
        }
      />

      {showForm && (
        <Card className="scale-in" style={{ marginBottom: 20, border: "1.5px solid var(--accent)" }}>
          <Input
            label="Nama Habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="cth: Baca 30 menit setiap hari"
            icon={<Star size={15} />}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
            <Button onClick={add}><Plus size={15} /> Tambah</Button>
          </div>
        </Card>
      )}

      {/* Day header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, paddingRight: 4 }}>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 2, width: 196 }}>
          {dayLabels.map((d, i) => (
            <div
              key={i}
              style={{
                width: 28,
                textAlign: "center",
                fontSize: "0.68rem",
                fontWeight: 600,
                color: last7[i] === TODAY ? "var(--accent)" : "var(--text3)",
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div style={{ width: 88 }} />
        <div style={{ width: 28 }} />
      </div>

      {/* Habits */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {habits.map((h, idx) => {
          const streak    = getStreak(h.completions);
          const doneToday = h.completions.includes(TODAY);
          return (
            <Card
              key={h.id}
              className="lift fade-up"
              style={{ animationDelay: `${idx * 60}ms`, padding: "14px 16px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                {/* Name + streak */}
                <div style={{ flex: 1, minWidth: 120 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)", marginBottom: 3 }}>
                    {h.name}
                  </div>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <Flame size={12} color="var(--orange)" />
                    <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>
                      {streak} hari streak
                    </span>
                  </div>
                </div>

                {/* 7-day dots */}
                <div style={{ display: "flex", gap: 2 }}>
                  {last7.map((d, i) => {
                    const done    = h.completions.includes(d);
                    const isToday = d === TODAY;
                    return (
                      <div
                        key={i}
                        onClick={() => isToday && toggleToday(h.id)}
                        style={{
                          width: 26, height: 26,
                          borderRadius: 6,
                          cursor: isToday ? "pointer" : "default",
                          background: done ? COLOR_DOT[h.color] : "var(--surface2)",
                          border: `1.5px solid ${isToday ? "var(--accent)" : "transparent"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.15s",
                          transform: isToday && done ? "scale(1.1)" : "none",
                        }}
                      >
                        {done && (
                          <CheckCircle2 size={13} color={COLOR_TEXT[h.color]} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Today button */}
                <button
                  onClick={() => toggleToday(h.id)}
                  style={{
                    width: 86,
                    padding: "7px",
                    borderRadius: 8,
                    border: `1.5px solid ${doneToday ? "var(--accent)" : "var(--border)"}`,
                    background: doneToday ? "var(--lime-mute)" : "transparent",
                    color: doneToday ? "var(--accent)" : "var(--text2)",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    fontFamily: "'Outfit',sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {doneToday ? "Selesai" : "Tandai"}
                </button>

                {/* Delete */}
                <button
                  onClick={() => del(h.id)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 4, transition: "color 0.15s" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </Card>
          );
        })}

        {!habits.length && (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text3)" }}>
            <Star size={32} style={{ margin: "0 auto 12px", opacity: 0.35 }} />
            <div>Belum ada habit. Tambahkan yang pertama!</div>
          </div>
        )}
      </div>
    </div>
  );
}
