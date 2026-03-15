import { useState } from "react";
import { Plus, Trash2, Edit3, Search, CheckSquare, Bell, Pencil, X } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { createCalendarEvent } from "../utils/calendarApi.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Card, Badge, Select, PageHeader, Modal } from "../components/ui/index.jsx";

const PRIORITY_COLOR = { high: "lime", medium: "orange", low: "peach" };

export default function TodoPage({ tasks, setTasks, user }) {
  const toast = useToast();
  const { t, lang } = useLanguage();

  // ── Form state ──
  const [name,           setName]           = useState("");
  const [deadline,       setDeadline]       = useState("");
  const [priority,       setPriority]       = useState("medium");
  const [category,       setCategory]       = useState("tugas");
  const [remindTime,     setRemindTime]     = useState("");
  const [remindQuestion, setRemindQuestion] = useState("");
  const [showForm,       setShowForm]       = useState(false);
  const [editingId,      setEditingId]      = useState(null);

  // ── Filter / search ──
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ── Reminder modal ──
  const [activeReminder, setActiveReminder] = useState(null);
  const [answer,         setAnswer]         = useState("");

  // ── Labels ──
  const PRIORITY_LABEL = {
    high:   t.todo.priorityHigh,
    medium: t.todo.priorityMed,
    low:    t.todo.priorityLow,
  };

  const CATEGORY_LABEL = {
    tugas:   t.todo.catAssignment,
    kuliah:  t.todo.catCourse,
    proyek:  t.todo.catProject,
    pribadi: t.todo.catPersonal,
  };

  const FILTERS = [
    { k: "all",     l: t.todo.statusAll     },
    { k: "pending", l: t.todo.pendingFilter },
    { k: "done",    l: t.todo.statusDone    },
    { k: "high",    l: "Urgent"             },
  ];

  // ── Open add form ──
  const openAdd = () => {
    setEditingId(null);
    setName(""); setDeadline(""); setPriority("medium");
    setCategory("tugas"); setRemindTime(""); setRemindQuestion("");
    setShowForm(true);
  };

  // ── Open edit form ──
  const openEdit = (task) => {
    setEditingId(task.id);
    setName(task.name);
    setDeadline(task.deadline || "");
    setPriority(task.priority);
    setCategory(task.category);
    setRemindTime(task.remindTime || "");
    setRemindQuestion(task.remindQuestion || "");
    setShowForm(true);
  };

  // ── Save (add or edit) ──
  const save = async () => {
    if (!name.trim()) { toast(t.todo.nameRequired, "error"); return; }

    if (editingId) {
      setTasks((p) => p.map((tk) =>
        tk.id === editingId
          ? { ...tk, name: name.trim(), deadline, priority, category, remindTime: remindTime || null, remindQuestion: remindQuestion || null }
          : tk
      ));
      toast(t.todo.updatedSuccess);
    } else {
      setTasks((p) => [{
        id: Date.now(),
        name: name.trim(),
        deadline,
        priority,
        category,
        done: false,
        createdAt: new Date().toISOString(),
        remindTime: remindTime || null,
        remindQuestion: remindQuestion || null,
      }, ...p]);

      if (deadline && user?.accessToken) {
        try {
          await createCalendarEvent(user.accessToken, {
            summary: `📚 ${name.trim()}`,
            description: `${t.todo.category}: ${category} | ${t.todo.priority}: ${PRIORITY_LABEL[priority]}`,
            date: deadline,
          });
          toast(t.todo.calendarSuccess);
        } catch {
          toast(t.todo.calendarFail);
        }
      } else {
        toast(t.todo.addedSuccess);
      }
    }

    setName(""); setDeadline(""); setRemindTime(""); setRemindQuestion("");
    setShowForm(false); setEditingId(null);
  };

  // ── Reminder confirm ──
  const confirmReminder = async () => {
    if (!answer.trim()) { toast(t.todo.answerRequired, "error"); return; }

    if (user?.accessToken && activeReminder?.remindTime) {
      const today = new Date().toISOString().slice(0, 10);
      try {
        await createCalendarEvent(user.accessToken, {
          summary: `🔔 ${activeReminder.name}`,
          description: `${lang === "id" ? "Jawaban" : "Answer"}: ${answer}`,
          date: today,
          time: activeReminder.remindTime,
        });
      } catch { /* silent */ }
    }

    setActiveReminder(null);
    toast(t.todo.reminderDone);
  };

  const toggle = (id) => setTasks((p) => p.map((tk) => tk.id === id ? { ...tk, done: !tk.done } : tk));
  const del    = (id) => { setTasks((p) => p.filter((tk) => tk.id !== id)); toast(t.todo.deletedSuccess); };

  const filtered = tasks.filter((tk) => {
    const matchF = filter === "all" ? true : filter === "done" ? tk.done : filter === "pending" ? !tk.done : tk.priority === filter;
    const matchS = tk.name.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  return (
    <div className="fade-up">
      <PageHeader
        title={t.todo.title}
        subtitle={`${tasks.filter((tk) => !tk.done).length} ${lang === "id" ? "tugas belum selesai" : "tasks pending"}`}
        action={
          <Button onClick={openAdd}>
            <Plus size={16} /> {t.todo.addTask}
          </Button>
        }
      />

      {/* ── Form ── */}
      {showForm && (
        <Card className="scale-in" style={{ marginBottom: 20, border: "1.5px solid var(--accent)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "var(--text)" }}>
              {editingId ? t.todo.editTask : t.todo.addTask}
            </div>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex" }}
            >
              <X size={16} />
            </button>
          </div>

          <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Input
                label={t.todo.taskName}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.todo.taskNamePlaceholder}
                icon={<Edit3 size={15} />}
                onKeyDown={(e) => e.key === "Enter" && save()}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>
                {t.todo.deadline}
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface2)", color: "var(--text)", fontSize: "0.9rem", outline: "none" }}
              />
            </div>

            <Select
              label={t.todo.priority}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={[
                { value: "high",   label: t.todo.priorityHigh },
                { value: "medium", label: t.todo.priorityMed  },
                { value: "low",    label: t.todo.priorityLow  },
              ]}
            />

            <Select
              label={t.todo.category}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "tugas",   label: t.todo.catAssignment },
                { value: "kuliah",  label: t.todo.catCourse     },
                { value: "proyek",  label: t.todo.catProject    },
                { value: "pribadi", label: t.todo.catPersonal   },
              ]}
            />

            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>
                {t.todo.reminderOptional}
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
                label={t.todo.verifyQuestion}
                value={remindQuestion}
                onChange={(e) => setRemindQuestion(e.target.value)}
                placeholder={t.todo.reminderPlaceholder}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); }}>
              {t.common.cancel}
            </Button>
            <Button onClick={save}>
              {editingId
                ? t.todo.saveChanges
                : <><Plus size={15} /> {t.common.add}</>
              }
            </Button>
          </div>
        </Card>
      )}

      {/* ── Controls ── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.common.search}
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

      {/* ── Task List ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {!filtered.length ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text3)" }}>
            <CheckSquare size={32} style={{ margin: "0 auto 12px", opacity: 0.35 }} />
            <div>{t.todo.noTasks}</div>
          </div>
        ) : (
          filtered.map((task, i) => (
            <div
              key={task.id}
              className="fade-up lift"
              style={{
                animationDelay: `${i * 30}ms`,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${task.priority === "high" ? "var(--highlight)" : task.priority === "medium" ? "var(--highlight2)" : "var(--accent)"}`,
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity: task.done ? 0.55 : 1,
              }}
            >
              <input type="checkbox" checked={task.done} onChange={() => toggle(task.id)} className="custom-check" />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text)", textDecoration: task.done ? "line-through" : "none", marginBottom: 5 }}>
                  {task.name}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Badge color={PRIORITY_COLOR[task.priority]}>{PRIORITY_LABEL[task.priority]}</Badge>
                  <Badge color="muted">{CATEGORY_LABEL[task.category]}</Badge>
                  {task.deadline   && <Badge color="muted">📅 {task.deadline}</Badge>}
                  {task.remindTime && <Badge color="orange">🔔 {task.remindTime}</Badge>}
                </div>
              </div>

              {/* Edit */}
              <button
                onClick={() => openEdit(task)}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text3)"}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 4, borderRadius: 6, transition: "color 0.15s" }}
              >
                <Pencil size={14} />
              </button>

              {/* Delete */}
              <button
                onClick={() => del(task.id)}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--highlight)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text3)"}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 4, borderRadius: 6, transition: "color 0.15s" }}
              >
                <Trash2 size={15} />
              </button>

              {/* Reminder bell */}
              {task.remindTime && !task.done && (
                <button
                  onClick={() => { setActiveReminder(task); setAnswer(""); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--highlight)", display: "flex", padding: 4, borderRadius: 6 }}
                >
                  <Bell size={15} />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* ── Reminder Modal ── */}
      <Modal open={!!activeReminder} onClose={() => setActiveReminder(null)}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--text)", marginBottom: 6 }}>
            🔔 Reminder
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--text2)", marginBottom: 16 }}>
            <strong>{activeReminder?.name}</strong>
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--text3)", marginBottom: 12 }}>
            {activeReminder?.remindQuestion || t.todo.alreadyDone}
          </div>
          <Input
            label={t.todo.answerLabel}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={t.todo.answerPlaceholder}
            onKeyDown={(e) => e.key === "Enter" && confirmReminder()}
          />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Button onClick={confirmReminder}>{t.common.done} ✓</Button>
        </div>
      </Modal>
    </div>
  );
}