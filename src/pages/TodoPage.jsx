import { useState } from "react";
import { Plus, Trash2, Edit3, Search, CheckSquare, Bell } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { createCalendarEvent } from "../utils/calendarApi.js"; 
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Card, Badge, Select, PageHeader, Modal } from "../components/ui/index.jsx";

const PRIORITY_COLOR  = { high: "orange", medium: "peach", low: "lime" };
const PRIORITY_LABEL  = { high: "Tinggi", medium: "Sedang", low: "Rendah" };
const CATEGORY_LABEL  = { tugas: "Tugas", kuliah: "Kuliah", proyek: "Proyek", pribadi: "Pribadi" };

export default function TodoPage({ tasks, setTasks, user }) {
  const [remindTime, setRemindTime] = useState("");
  const [remindQuestion, setRemindQuestion] = useState("");
  const [activeReminder, setActiveReminder] = useState(null); // untuk modal verifikasi
  const [answer, setAnswer] = useState("");
  const toast = useToast();
  const [name,     setName]     = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("tugas");
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");
  const [showForm, setShowForm] = useState(false);

  const add = async () => {
    if (!name.trim()) { toast("Nama tugas tidak boleh kosong!", "error"); return; }

    setTasks((p) => [
      {
        id: Date.now(),
        name: name.trim(),
        deadline,
        priority,
        category,
        done: false,
        createdAt: new Date().toISOString(),
        remindTime: remindTime || null,
        remindQuestion: remindQuestion || null,
      },
      ...p,
    ]);
    console.log("user accessToken:", user?.accessToken);
    console.log("deadline:", deadline);
    // Sync ke Google Calendar jika ada deadline
    if (deadline && user?.accessToken) {
      try {
        await createCalendarEvent(user.accessToken, {
          summary: `📚 ${name.trim()}`,
          description: `Kategori: ${category} | Prioritas: ${PRIORITY_LABEL[priority]}`,
          date: deadline,
        });
        toast("Tugas ditambahkan + tersync ke Google Calendar! 🗓️");
      } catch {
        toast("Tugas ditambahkan, tapi gagal sync kalender.");
      }
    } else {
      toast("Tugas berhasil ditambahkan!");
    }

    setName(""); setDeadline(""); setRemindTime(""); setRemindQuestion("");
    setShowForm(false);
  };

  const confirmReminder = async () => {
    if (!answer.trim()) { toast("Jawab dulu pertanyaannya!", "error"); return; }

    // Buat event di kalender sebagai catatan
    if (user?.accessToken && activeReminder?.remindTime) {
      const today = new Date().toISOString().slice(0, 10);
      try {
        await createCalendarEvent(user.accessToken, {
          summary: `🔔 ${activeReminder.name}`,
          description: `Jawaban: ${answer}`,
          date: today,
          time: activeReminder.remindTime,
        });
      } catch {
        // silent fail, tidak perlu toast
      }
    }

    setActiveReminder(null);
    toast("Reminder selesai! Tetap semangat! 💪");
  };

  const toggle = (id) => setTasks((p) => p.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const del    = (id) => { setTasks((p) => p.filter((t) => t.id !== id)); toast("Tugas dihapus"); };

  const filtered = tasks.filter((t) => {
    const matchF = filter === "all" ? true : filter === "done" ? t.done : filter === "pending" ? !t.done : t.priority === filter;
    const matchS = t.name.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  const FILTERS = [
    { k: "all",     l: "Semua"    },
    { k: "pending", l: "Belum"    },
    { k: "done",    l: "Selesai"  },
    { k: "high",    l: "Urgent"   },
  ];

  return (
    <div className="fade-up">
      <PageHeader
        title="Task Manager"
        subtitle={`${tasks.filter((t) => !t.done).length} tugas belum selesai`}
        action={
          <Button onClick={() => setShowForm((p) => !p)}>
            <Plus size={16} /> Tambah Tugas
          </Button>
        }
      />

      {/* Add Form */}
      {showForm && (
        <Card className="scale-in" style={{ marginBottom: 20, border: "1.5px solid var(--accent)" }}>
        <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Input
                label="Nama Tugas"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth: Kerjakan laporan Pemweb..."
                icon={<Edit3 size={15} />}
                onKeyDown={(e) => e.key === "Enter" && add()}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface2)", color: "var(--text)", fontSize: "0.9rem", outline: "none" }}
              />
            </div>
            <Select
              label="Prioritas"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={[
                { value: "high",   label: "Tinggi"  },
                { value: "medium", label: "Sedang"  },
                { value: "low",    label: "Rendah"  },
              ]}
            />
            <Select
              label="Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "tugas",   label: "Tugas"   },
                { value: "kuliah",  label: "Kuliah"  },
                { value: "proyek",  label: "Proyek"  },
                { value: "pribadi", label: "Pribadi" },
              ]}
            />
            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>
                Reminder (opsional)
              </label>
              <input
                type="time"
                value={remindTime}
                onChange={(e) => setRemindTime(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface2)", color: "var(--text)", fontSize: "0.9rem", outline: "none" }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Input
                label="Pertanyaan Verifikasi (opsional)"
                value={remindQuestion}
                onChange={(e) => setRemindQuestion(e.target.value)}
                placeholder="cth: Sudah berapa persen kamu mengerjakannya?"
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
            <Button onClick={add}><Plus size={15} /> Tambah</Button>
          </div>
        </Card>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari tugas..."
            style={{ width: "100%", padding: "9px 14px 9px 36px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface)", color: "var(--text)", fontSize: "0.875rem", outline: "none" }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              style={{
                padding: "8px 14px", borderRadius: 8,
                fontSize: "0.8rem", fontWeight: filter === f.k ? 600 : 400,
                background: filter === f.k ? "var(--accent)" : "var(--surface)",
                color: filter === f.k ? "var(--bg)" : "var(--text2)",
                border: `1.5px solid ${filter === f.k ? "var(--accent)" : "var(--border)"}`,
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {!filtered.length ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text3)" }}>
            <CheckSquare size={32} style={{ margin: "0 auto 12px", opacity: 0.35 }} />
            <div>Tidak ada tugas ditemukan</div>
          </div>
        ) : (
          filtered.map((t, i) => (
            <div
              key={t.id}
              className="fade-up lift"
              style={{
                animationDelay: `${i * 30}ms`,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${t.priority === "high" ? "var(--orange)" : t.priority === "medium" ? "var(--peach)" : "var(--lime)"}`,
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity: t.done ? 0.55 : 1,
              }}
            >
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} className="custom-check" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text)", textDecoration: t.done ? "line-through" : "none", marginBottom: 5 }}>
                  {t.name}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Badge color={PRIORITY_COLOR[t.priority]}>{PRIORITY_LABEL[t.priority]}</Badge>
                  <Badge color="muted">{CATEGORY_LABEL[t.category]}</Badge>
                  {t.deadline && <Badge color="muted">{t.deadline}</Badge>}
                  {t.remindTime && (<Badge color="orange">🔔 {t.remindTime}</Badge>)}
                </div>
              </div>
              <button
                onClick={() => del(t.id)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 4, borderRadius: 6, transition: "color 0.15s" }}
              >
                <Trash2 size={15} />
              </button>
              {t.remindTime && !t.done && (
              <button
                onClick={() => { setActiveReminder(t); setAnswer(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--orange)", display: "flex", padding: 4, borderRadius: 6 }}
              >
                <Bell size={15} />
              </button>
            )}
            </div>
          ))
        )}
      </div>
      <Modal open={!!activeReminder} onClose={() => setActiveReminder(null)}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--text)", marginBottom: 6 }}>
            🔔 Reminder
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--text2)", marginBottom: 16 }}>
            <strong>{activeReminder?.name}</strong>
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--text3)", marginBottom: 12 }}>
            {activeReminder?.remindQuestion || "Sudah dikerjakan?"}
          </div>
          <Input
            label="Jawaban kamu"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Tulis jawabanmu dulu sebelum dismiss..."
            onKeyDown={(e) => e.key === "Enter" && confirmReminder()}
          />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Button onClick={confirmReminder}>Selesai ✓</Button>
        </div>
      </Modal>
    </div>
  );
}
