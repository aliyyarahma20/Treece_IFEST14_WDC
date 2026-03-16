import { useState, useEffect } from "react";
import { Plus, Trash2, Clock, CheckSquare, Calendar, Brain, Timer, Target as TargetIcon, Trophy, Flame, Zap, Rocket, Sparkles, ChevronDown, ChevronUp, Pencil, X } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Card, ProgressBar, Select, PageHeader } from "../components/ui/index.jsx";

const TYPE_ICON = {
  hours: <Clock       size={16} />,
  tasks: <CheckSquare size={16} />,
  days:  <Calendar    size={16} />,
};

const INITIAL = [
  { id: 1, name: "Belajar 30 jam bulan ini",   type: "hours", goal: 30, current: 22 },
  { id: 2, name: "Selesaikan 20 tugas",         type: "tasks", goal: 20, current: 12 },
  { id: 3, name: "15 hari produktif bulan ini", type: "days",  goal: 15, current: 9  },
];

export default function TargetPage() {
  const toast = useToast();
  const { t } = useLanguage();

  const TYPE_LABEL = {
    hours: t.target.typeHours,
    tasks: t.target.typeTasks,
    days:  t.target.typeDays,
  };

  const [targets,   setTargets]   = useLocalStorage("sr_targets", INITIAL);
  const [name,      setName]      = useState("");
  const [type,      setType]      = useState("hours");
  const [goal,      setGoal]      = useState("");
  const [current,   setCurrent]   = useState("");
  const [showForm,  setShowForm]  = useState(false);
  const [editingId, setEditingId] = useState(null); // null = add mode

  // ── Open add form ──
  const openAdd = () => {
    setEditingId(null);
    setName(""); setType("hours"); setGoal(""); setCurrent("");
    setShowForm(true);
  };

  // ── Open edit form ──
  const openEdit = (tgt) => {
    setEditingId(tgt.id);
    setName(tgt.name);
    setType(tgt.type);
    setGoal(String(tgt.goal));
    setCurrent(String(tgt.current));
    setShowForm(true);
  };

  // ── Save (add or edit) ──
  const save = () => {
    if (!name.trim() || !goal) { toast(t.common.noData, "error"); return; }

    if (editingId) {
      setTargets((p) => p.map((tgt) =>
        tgt.id === editingId
          ? { ...tgt, name: name.trim(), type, goal: +goal, current: Math.min(+goal, +(current || 0)) }
          : tgt
      ));
      toast("Target berhasil diperbarui!");
    } else {
      setTargets((p) => [
        { id: Date.now(), name: name.trim(), type, goal: +goal, current: +(current || 0) },
        ...p,
      ]);
      toast("Target berhasil ditambahkan!");
    }

    setName(""); setGoal(""); setCurrent(""); setShowForm(false); setEditingId(null);
  };

  const del = (id) => {
    setTargets((p) => p.filter((tgt) => tgt.id !== id));
    toast("Target dihapus");
  };

  const updateProgress = (id, delta) => {
    setTargets((p) =>
      p.map((tgt) => tgt.id === id
        ? { ...tgt, current: Math.max(0, Math.min(tgt.goal, tgt.current + delta)) }
        : tgt
      )
    );
  };

  // ── Pomodoro state ──
  const [showPomodoro, setShowPomodoro] = useState(false);
  const MODES = {
    focus: { label: t.pomodoro.focus,      duration: 25 * 60 },
    short: { label: t.pomodoro.shortBreak, duration:  5 * 60 },
    long:  { label: t.pomodoro.longBreak,  duration: 15 * 60 },
  };
  const [mode,     setMode]     = useState("focus");
  const [seconds,  setSeconds]  = useState(MODES.focus.duration);
  const [running,  setRunning]  = useState(false);
  const [sessions, setSessions] = useState(0);
  const [task,     setTask]     = useState("");
  const [quoteIdx, setQuoteIdx] = useState(0);



  useEffect(() => {
    setSeconds(MODES[mode].duration);
    setRunning(false);
  }, [mode]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          if (mode === "focus") {
            setSessions((p) => p + 1);
            setQuoteIdx((p) => (p + 1) % t.pomodoro.quotesFocus.length);
            toast("Sesi fokus selesai! Saatnya istirahat.");
          } else {
            toast("Istirahat selesai! Siap kembali fokus?");
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode]);

  const total       = MODES[mode].duration;
  const mm          = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss_str      = String(seconds % 60).padStart(2, "0");
  const radius      = 80;
  const circ        = 2 * Math.PI * radius;
  const offset      = circ - ((total - seconds) / total) * circ;
  const strokeColor = mode === "focus" ? "var(--accent)" : mode === "short" ? "var(--highlight2)" : "var(--highlight)";

  return (
    <div className="fade-up">
      <PageHeader
        title={t.target.title}
        subtitle={t.target.subtitleDone(
          targets.filter((tgt) => tgt.current >= tgt.goal).length,
          targets.length
        )}
        action={
          <div className="target-header-actions" style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" onClick={() => setShowPomodoro((p) => !p)}>
              <Timer size={15} />
              {showPomodoro ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
            <Button onClick={openAdd}>
              <Plus size={16} /> {t.target.addTarget}
            </Button>
          </div>
        }
      />

      {/* ── POMODORO PANEL ── */}
      {showPomodoro && (
        <Card className="scale-in" style={{ marginBottom: 24, border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Timer size={16} color="var(--accent)" />
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>
              Pomodoro Timer
            </span>
          </div>

          <div className="pomodoro-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
            {/* Kiri — timer */}
            <div>
              <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "var(--bg)", padding: 4, borderRadius: 10, border: "1px solid var(--border)" }}>
                {Object.entries(MODES).map(([k, v]) => (
                  <button key={k} onClick={() => setMode(k)}
                    style={{
                      flex: 1, padding: "7px", borderRadius: 7, border: "none",
                      background: mode === k ? "var(--accent)" : "transparent",
                      color: mode === k ? "var(--bg)" : "var(--text2)",
                      fontSize: "0.78rem", fontWeight: mode === k ? 600 : 400,
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, position: "relative" }}>
                <svg width={160} height={160} className={mode !== "focus" && running ? "breathe" : ""} style={{ transform: "rotate(-90deg)" }}>
                  <circle cx={80} cy={80} r={radius * 0.75} fill="none" stroke="var(--border)" strokeWidth={8} />
                  <circle cx={80} cy={80} r={radius * 0.75} fill="none" stroke={strokeColor} strokeWidth={8}
                    strokeLinecap="round"
                    strokeDasharray={circ * 0.75}
                    strokeDashoffset={offset * 0.75}
                    style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.3s" }}
                  />
                </svg>
                <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text)", lineHeight: 1 }}>
                    {mm}:{ss_str}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 4 }}>{MODES[mode].label}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <Button onClick={() => { setRunning(false); setSeconds(MODES[mode].duration); }} variant="ghost" size="sm">
                  {t.pomodoro.reset}
                </Button>
                <Button onClick={() => setRunning((p) => !p)} size="sm" style={{ minWidth: 100 }}>
                  {running ? t.pomodoro.pause : seconds === MODES[mode].duration ? t.pomodoro.start : t.common.next}
                </Button>
              </div>
            </div>

            {/* Kanan — info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {running && (
                <div className="fade-in" style={{
                  fontSize: "0.78rem", color: "var(--text2)", fontStyle: "italic",
                  padding: "10px 14px", background: "var(--mute)", borderRadius: 10,
                  border: "1px solid var(--border)",
                }}>
                  {mode === "focus" ? t.pomodoro.quotesFocus[quoteIdx] : t.pomodoro.quotesRest[quoteIdx]}
                </div>
              )}
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", marginBottom: 6 }}>
                  {t.target.workingOn}
                </div>
                <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder={t.target.workingPlaceholder} icon={<Brain size={14} />} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1, background: "var(--bg)", borderRadius: 10, padding: "10px", textAlign: "center", border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "var(--accent)" }}>{sessions}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text3)", marginTop: 2 }}>{t.target.sessionsDone}</div>
                </div>
                <div style={{ flex: 1, background: "var(--bg)", borderRadius: 10, padding: "10px", textAlign: "center", border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "var(--highlight)" }}>{sessions * 25}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text3)", marginTop: 2 }}>{t.target.focusMinutes}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ── ADD / EDIT FORM ── */}
      {showForm && (
        <Card className="scale-in" style={{ marginBottom: 20, border: "1.5px solid var(--accent)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "var(--text)" }}>
              {editingId ? "Edit Target" : t.target.formTitle}
            </div>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex" }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <Input
              label={t.target.targetName}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.target.namePlaceholder}
            />
            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <Select label={t.target.formType} value={type} onChange={(e) => setType(e.target.value)}
                options={[
                  { value: "hours", label: t.target.typeHours },
                  { value: "tasks", label: t.target.typeTasks },
                  { value: "days",  label: t.target.typeDays  },
                ]}
              />
              <Input label={t.target.goalVal}     value={goal}    onChange={(e) => setGoal(e.target.value)}    placeholder="30" type="number" />
              <Input label={t.target.formInitial} value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="0"  type="number" />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
            <Button variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); }}>
              {t.common.cancel}
            </Button>
            <Button onClick={save}>
              {editingId ? <><Pencil size={14} /> Simpan</> : <><Plus size={15} /> {t.common.add}</>}
            </Button>
          </div>
        </Card>
      )}

      {/* ── EMPTY STATE ── */}
      {targets.length === 0 && (
        <div className="fade-up" style={{ textAlign: "center", padding: "60px 20px", color: "var(--text3)" }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>🎯</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text)", marginBottom: 8 }}>
            {t.target.noTargets}
          </div>
          <div style={{ fontSize: "0.85rem", marginBottom: 20 }}>{t.target.noTargetDesc}</div>
          <Button onClick={openAdd}>
            <Plus size={16} /> {t.target.firstTarget}
          </Button>
        </div>
      )}

      {/* ── TARGET CARDS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
        {targets.map((tgt, i) => {
          const pct     = Math.min(100, Math.round((tgt.current / tgt.goal) * 100));
          const done    = pct >= 100;
          const onTrack = pct >= 50;

          return (
            <Card key={tgt.id} className="lift fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--mute)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                    {TYPE_ICON[tgt.type]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>{tgt.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{TYPE_LABEL[tgt.type]}</div>
                  </div>
                </div>

                {/* Edit + Delete */}
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => openEdit(tgt)}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text3)"}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 2, transition: "color 0.15s" }}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => del(tgt.id)}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--highlight)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text3)"}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 2, transition: "color 0.15s" }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text2)" }}>{tgt.current} / {tgt.goal}</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: done ? "var(--accent)" : onTrack ? "var(--highlight)" : "var(--highlight2)" }}>
                  {pct}%
                </span>
              </div>

              <ProgressBar
                value={tgt.current}
                max={tgt.goal}
                color={done ? "var(--accent)" : onTrack ? "var(--highlight)" : "var(--highlight2)"}
                height={10}
              />

              <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 6, textAlign: "right" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                  {done       ? <><Trophy size={11} /> {t.target.achieved}</>
                  : pct >= 80 ? <><Flame  size={11} /> {t.target.almostThere(tgt.goal - tgt.current)}</>
                  : pct >= 50 ? <><Zap    size={11} /> {t.target.halfWay}</>
                  :             <><Rocket size={11} /> {t.target.justStarted}</>}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 14, alignItems: "center" }}>
                {done ? (
                  <div className="scale-in" style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "4px 10px", borderRadius: 99,
                    background: "var(--mute)", border: "1px solid var(--accent)",
                    color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700,
                  }}>
                    <Sparkles size={12} /> {t.target.achieved}
                  </div>
                ) : (
                  <div style={{
                    padding: "3px 10px", borderRadius: 99,
                    fontSize: "0.72rem", fontWeight: 600,
                    background: onTrack ? "var(--mute)" : "var(--mute2)",
                    color: onTrack ? "var(--highlight)" : "var(--highlight2)",
                    border: `1px solid ${onTrack ? "var(--highlight)" : "var(--highlight2)"}`,
                    whiteSpace: "nowrap",
                  }}>
                    {onTrack ? t.target.onTrack : t.target.needCatchUp}
                  </div>
                )}

                <div style={{ flex: 1 }} />

                <button onClick={() => updateProgress(tgt.id, -1)}
                  style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--border)", background: "var(--surface2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)", fontSize: "1rem" }}>
                  −
                </button>
                <button onClick={() => updateProgress(tgt.id, 1)}
                  style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--border)", background: "var(--mute)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontSize: "1rem" }}>
                  +
                </button>

                <button
                  onClick={() => { setShowPomodoro(true); setTask(tgt.name); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text3)";  e.currentTarget.style.borderColor = "var(--border)"; }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "5px 10px", borderRadius: 7,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text3)", fontSize: "0.75rem",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  <Timer size={12} /> {t.target.focusNow}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}