import { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Card } from "../components/ui/index.jsx";

const MODES = {
  focus: { label: "Fokus",            duration: 25 * 60 },
  short: { label: "Istirahat Pendek", duration:  5 * 60 },
  long:  { label: "Istirahat Panjang",duration: 15 * 60 },
};

export default function PomodoroPage() {
  const toast = useToast();
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

  const total  = MODES[mode].duration;
  const pct    = ((total - seconds) / total) * 100;
  const mm     = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss     = String(seconds % 60).padStart(2, "0");
  const radius = 80;
  const circ   = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;

  const strokeColor =
    mode === "focus" ? "var(--accent)" :
    mode === "short" ? "var(--peach)"  : "var(--orange)";

  return (
    <div className="fade-up" style={{ maxWidth: 520, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text)", letterSpacing: "-0.5px" }}>
          Pomodoro Timer
        </h1>
        <div style={{ fontSize: "0.85rem", color: "var(--text3)" }}>
          Teknik Pomodoro untuk fokus maksimal
        </div>
      </div>

      {/* Mode Tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 36,
          background: "var(--surface)",
          padding: 4,
          borderRadius: 12,
          border: "1px solid var(--border)",
        }}
      >
        {Object.entries(MODES).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            style={{
              flex: 1,
              padding: "9px",
              borderRadius: 9,
              border: "none",
              background: mode === k ? "var(--accent)" : "transparent",
              color: mode === k ? "var(--bg)" : "var(--text2)",
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.83rem",
              fontWeight: mode === k ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Circle Timer */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36, position: "relative" }}>
        <svg width={200} height={200} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={100} cy={100} r={radius} fill="none" stroke="var(--border)" strokeWidth={10} />
          <circle
            cx={100} cy={100} r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.3s" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "2.8rem", color: "var(--text)", lineHeight: 1 }}>
            {mm}:{ss}
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text3)", marginTop: 6 }}>
            {MODES[mode].label}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32 }}>
        <Button
          onClick={() => { setRunning(false); setSeconds(MODES[mode].duration); }}
          variant="ghost"
          size="lg"
        >
          Reset
        </Button>
        <Button onClick={() => setRunning((p) => !p)} size="lg" style={{ minWidth: 130 }}>
          {running
            ? "Pause"
            : seconds === MODES[mode].duration
              ? "Mulai"
              : "Lanjut"}
        </Button>
      </div>

      {/* Info Card */}
      <Card>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: 14 }}>
          Sedang mengerjakan apa?
        </div>
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="cth: Bab 3 Pemrograman Web..."
          icon={<Brain size={15} />}
        />
        <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "var(--accent)" }}>
              {sessions}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Sesi Selesai</div>
          </div>
          <div style={{ width: 1, background: "var(--border)" }} />
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "var(--orange)" }}>
              {sessions * 25}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Menit Fokus</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
