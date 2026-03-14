import { useState, useEffect } from "react";
import { Plus, Trash2, Clock, CheckSquare, Calendar, Brain, Timer, Target as TargetIcon } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Card, Badge, ProgressBar, Select, PageHeader } from "../components/ui/index.jsx";

const TYPE_LABEL = { hours: "Jam Belajar", tasks: "Tugas Selesai", days: "Hari Produktif" };
const TYPE_ICON  = {
  hours: <Clock      size={16} />,
  tasks: <CheckSquare size={16} />,
  days:  <Calendar   size={16} />,
};

const INITIAL = [
  { id: 1, name: "Belajar 30 jam bulan ini",  type: "hours", goal: 30, current: 22 },
  { id: 2, name: "Selesaikan 20 tugas",        type: "tasks", goal: 20, current: 12 },
  { id: 3, name: "15 hari produktif bulan ini",type: "days",  goal: 15, current: 9  },
];

export default function TargetPage() {
  const toast = useToast();
  const [targets, setTargets] = useLocalStorage("sr_targets", INITIAL);
  const [name,    setName]    = useState("");
  const [type,    setType]    = useState("hours");
  const [goal,    setGoal]    = useState("");
  const [current, setCurrent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("target"); 

  // ── POMODORO STATE ──
  const MODES = {
    focus: { label: "Fokus",             duration: 25 * 60 },
    short: { label: "Istirahat Pendek",  duration:  5 * 60 },
    long:  { label: "Istirahat Panjang", duration: 15 * 60 },
  };
  const [mode,     setMode]     = useState("focus");
  const [seconds,  setSeconds]  = useState(MODES.focus.duration);
  const [running,  setRunning]  = useState(false);
  const [sessions, setSessions] = useState(0);
  const [task,     setTask]     = useState("");

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
            setQuoteIdx((p) => (p + 1) % QUOTES.length); // ← tambahkan ini
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

  const QUOTES_FOCUS = [
    "Fokus 25 menit, hasil seumur hidup. 💪",
    "Satu sesi lagi, semakin dekat ke tujuan. 🎯",
    "Matikan distraksi, nyalakan potensi. 🔥",
    "Mahasiswa hebat lahir dari kebiasaan kecil. ⚡",
    "Deep work beats busy work. 🧠",
  ];

  const QUOTES_REST = [
    "Istirahat sebentar, otak makin tajam. ☕",
    "Regangkan badan, siapkan pikiran. 🧘",
    "Napas dalam, kamu sudah kerja keras! 🌿",
    "Hydrate dulu, baru gas lagi. 💧",
    "5 menit ini investasi untuk sesi berikutnya. ✨",
  ];
  const [quoteIdx, setQuoteIdx] = useState(0);

  
  

  const total  = MODES[mode].duration;
  const mm     = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss_str = String(seconds % 60).padStart(2, "0");
  const radius = 80;
  const circ   = 2 * Math.PI * radius;
  const offset = circ - (((total - seconds) / total) * 100 / 100) * circ;
  const strokeColor = mode === "focus" ? "var(--accent)" : mode === "short" ? "var(--peach)" : "var(--orange)";

  const add = () => {
    if (!name.trim() || !goal) { toast("Lengkapi semua field!", "error"); return; }
    setTargets((p) => [
      { id: Date.now(), name: name.trim(), type, goal: +goal, current: +(current || 0) },
      ...p,
    ]);
    setName(""); setGoal(""); setCurrent(""); setShowForm(false);
    toast("Target berhasil ditambahkan!");
  };

  const del = (id) => { setTargets((p) => p.filter((t) => t.id !== id)); toast("Target dihapus"); };

  const updateProgress = (id, delta) => {
    setTargets((p) =>
      p.map((t) => t.id === id ? { ...t, current: Math.max(0, Math.min(t.goal, t.current + delta)) } : t)
    );
  };

  return (
    <div className="fade-up">
      <PageHeader
        title="Target Produktivitas"
        subtitle={`${targets.filter((t) => t.current >= t.goal).length} dari ${targets.length} target tercapai`}
        action={
          activeTab === "target" && (
            <Button onClick={() => setShowForm((p) => !p)}>
              <Plus size={16} /> Target Baru
            </Button>
          )
        }
      />

      {/* Tab Switch */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "var(--surface)", padding: 4, borderRadius: 12, border: "1px solid var(--border)", maxWidth: 320 }}>
      {[
          { k: "target",   l: "Target",        icon: <TargetIcon size={15} /> },
          { k: "pomodoro", l: "Fokus Sekarang", icon: <Timer size={15} />      },
        ].map((tab) => (
          <button
            key={tab.k}
            onClick={() => setActiveTab(tab.k)}
            style={{
              flex: 1, padding: "9px", borderRadius: 9, border: "none",
              background: activeTab === tab.k ? "var(--accent)" : "transparent",
              color: activeTab === tab.k ? "var(--bg)" : "var(--text2)",
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.85rem",
              fontWeight: activeTab === tab.k ? 600 : 400,
              cursor: "pointer", transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            {tab.icon} {tab.l}
          </button>
        ))}
      </div>

      {/* ── TARGET TAB ── */}
      {activeTab === "target" && (
        <>
          {showForm && (
            <Card className="scale-in" style={{ marginBottom: 20, border: "1.5px solid var(--accent)" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16 }}>Target Baru</div>
              <div style={{ display: "grid", gap: 12 }}>
                <Input
                  label="Nama Target"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="cth: Belajar 3 jam sehari..."
                />
                <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <Select label="Tipe" value={type} onChange={(e) => setType(e.target.value)}
                    options={[
                      { value: "hours", label: "Jam Belajar"    },
                      { value: "tasks", label: "Tugas Selesai"  },
                      { value: "days",  label: "Hari Produktif" },
                    ]}
                  />
                  <Input label="Target"        value={goal}    onChange={(e) => setGoal(e.target.value)}    placeholder="30" type="number" />
                  <Input label="Progress Awal" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="0"  type="number" />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
                <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
                <Button onClick={add}><Plus size={15} /> Tambah</Button>
              </div>
            </Card>
          )}

          {targets.length === 0 && (
            <div className="fade-up" style={{
              textAlign: "center", padding: "60px 20px",
              color: "var(--text3)",
            }}> 
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>🎯</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text)", marginBottom: 8 }}>
                Belum ada target
              </div>
              <div style={{ fontSize: "0.85rem", marginBottom: 20 }}>
                Mulai set target pertamamu dan raih bersama Pomodoro!
              </div>
              <Button onClick={() => setShowForm(true)}>
                <Plus size={16} /> Buat Target Pertama
              </Button>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {targets.map((t, i) => {
              const pct     = Math.min(100, Math.round((t.current / t.goal) * 100));
              const done    = pct >= 100;
              const onTrack = pct >= 50;
              return (
                <Card key={t.id} className="lift fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--lime-mute)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                        {TYPE_ICON[t.type]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>{t.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{TYPE_LABEL[t.type]}</div>
                      </div>
                    </div>
                    <button onClick={() => del(t.id)}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 2, transition: "color 0.15s" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text2)" }}>{t.current} / {t.goal}</span>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: done ? "var(--accent)" : onTrack ? "var(--text)" : "var(--orange)" }}>
                      {pct}%
                    </span>
                  </div>
                  <ProgressBar value={t.current} max={t.goal} color={done ? "var(--highlight)" : onTrack ? "var(--highlight)" : "var(--highlight2)"} height={10} />
                  <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 6, textAlign: "right" }}>
                    {done
                      ? "Luar biasa! Kamu berhasil 🏆"
                      : pct >= 80
                      ? `Hampir sampai! Tinggal ${t.goal - t.current} lagi 🔥`
                      : pct >= 50
                      ? `Setengah jalan, tetap semangat! 💪`
                      : `Baru mulai, yuk gas! 🚀`}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 14, alignItems: "center" }}>
                    {done ? (
                      <div className="scale-in" style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "4px 10px", borderRadius: 99,
                        background: "var(--lime-mute)",
                        border: "1px solid var(--lime)",
                        color: "var(--highlight)",
                        fontSize: "0.75rem", fontWeight: 700,
                      }}>
                        🎉 Tercapai!
                      </div>
                    ) : (
                    <div style={{
                      padding: "3px 10px", borderRadius: 99,
                      fontSize: "0.72rem", fontWeight: 600,
                      background: onTrack ? "var(--lime-mute)" : "var(--orange-mute)",
                      color: onTrack ? "var(--highlight2)" : "var(--highlight)",
                      border: `1px solid ${onTrack ? "var(--highlight2)" : "var(--highlight)"}`,
                      whiteSpace: "nowrap",
                    }}>
                      {onTrack ? "On Track" : "Perlu Dikejar"}
                    </div>
                    )}
                    <div style={{ flex: 1 }} />
                    <button onClick={() => updateProgress(t.id, -1)}
                      style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--border)", background: "var(--surface2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)", fontSize: "1rem" }}>−</button>
                    <button onClick={() => updateProgress(t.id, 1)}
                      style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--border)", background: "var(--lime-mute)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontSize: "1rem" }}>+</button>
                    <button
                      onClick={() => { setActiveTab("pomodoro"); setTask(t.name); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "5px 10px", borderRadius: 7,
                        border: "1px solid var(--border)",
                        background: "transparent",
                        color: "var(--text3)", fontSize: "0.75rem",
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text3)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                    >
                      <Timer size={12} /> Fokus sekarang
                  </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* ── POMODORO TAB ── */}
      {activeTab === "pomodoro" && (
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          {/* Mode Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 36, background: "var(--surface)", padding: 4, borderRadius: 12, border: "1px solid var(--border)" }}>
            {Object.entries(MODES).map(([k, v]) => (
              <button key={k} onClick={() => setMode(k)}
                style={{
                  flex: 1, padding: "9px", borderRadius: 9, border: "none",
                  background: mode === k ? "var(--accent)" : "transparent",
                  color: mode === k ? "var(--bg)" : "var(--text2)",
                  fontFamily: "'Outfit',sans-serif", fontSize: "0.83rem",
                  fontWeight: mode === k ? 600 : 400, cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Circle Timer */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36, position: "relative" }}>
            <svg width={200} height={200} className={mode !== "focus" && running ? "breathe" : ""} style={{ transform: "rotate(-90deg)" }}>
              <circle cx={100} cy={100} r={radius} fill="none" stroke="var(--border)" strokeWidth={10} />
              <circle cx={100} cy={100} r={radius} fill="none" stroke={strokeColor} strokeWidth={10}
                strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.3s" }}
              />
            </svg>
            <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "2.8rem", color: "var(--text)", lineHeight: 1 }}>
                {mm}:{ss_str}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text3)", marginTop: 6 }}>{MODES[mode].label}</div>
            </div>
          </div>
          {running && (
          <div className="fade-in" style={{
            textAlign: "center",
            fontSize: "0.85rem",
            color: "var(--text3)",
            fontStyle: "italic",
            marginBottom: 20,
            padding: "10px 20px",
            background: mode === "focus" ? "var(--accent)" : "var(--accent2)",
            borderRadius: 10,
            border: "1px solid var(--border)",
          }}>
            {mode === "focus" ? QUOTES_FOCUS[quoteIdx] : QUOTES_REST[quoteIdx]}
          </div>
        )}

          {/* Controls */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32 }}>
            <Button onClick={() => { setRunning(false); setSeconds(MODES[mode].duration); }} variant="ghost" size="lg">Reset</Button>
            <Button onClick={() => setRunning((p) => !p)} size="lg" style={{ minWidth: 130 }}>
              {running ? "Pause" : seconds === MODES[mode].duration ? "Mulai" : "Lanjut"}
            </Button>
          </div>

          {/* Info Card */}
          <Card>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: 14 }}>Sedang mengerjakan apa?</div>
            <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="cth: Bab 3 Pemrograman Web..." icon={<Brain size={15} />} />
            <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "var(--accent)" }}>{sessions}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Sesi Selesai</div>
              </div>
              <div style={{ width: 1, background: "var(--border)" }} />
              <div style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "var(--orange)" }}>{sessions * 25}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Menit Fokus</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
