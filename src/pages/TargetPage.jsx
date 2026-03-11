import { useState } from "react";
import { Plus, Trash2, Clock, CheckSquare, Calendar } from "lucide-react";
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
          <Button onClick={() => setShowForm((p) => !p)}>
            <Plus size={16} /> Target Baru
          </Button>
        }
      />

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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <Select
                label="Tipe"
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={[
                  { value: "hours", label: "Jam Belajar"    },
                  { value: "tasks", label: "Tugas Selesai"  },
                  { value: "days",  label: "Hari Produktif" },
                ]}
              />
              <Input label="Target"         value={goal}    onChange={(e) => setGoal(e.target.value)}    placeholder="30" type="number" />
              <Input label="Progress Awal"  value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="0"  type="number" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
            <Button onClick={add}><Plus size={15} /> Tambah</Button>
          </div>
        </Card>
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
                <button
                  onClick={() => del(t.id)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 2, transition: "color 0.15s" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text2)" }}>{t.current} / {t.goal}</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: done ? "var(--accent)" : onTrack ? "var(--text)" : "var(--orange)" }}>
                  {pct}%
                </span>
              </div>
              <ProgressBar
                value={t.current}
                max={t.goal}
                color={done ? "var(--accent)" : onTrack ? "var(--peach)" : "var(--orange)"}
                height={10}
              />

              <div style={{ display: "flex", gap: 8, marginTop: 14, alignItems: "center" }}>
                <Badge color={done || onTrack ? "lime" : "orange"}>
                  {done ? "Tercapai!" : onTrack ? "On Track" : "Perlu Dikejar"}
                </Badge>
                <div style={{ flex: 1 }} />
                <button
                  onClick={() => updateProgress(t.id, -1)}
                  style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--border)", background: "var(--surface2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)", fontSize: "1rem" }}
                >−</button>
                <button
                  onClick={() => updateProgress(t.id, 1)}
                  style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--border)", background: "var(--lime-mute)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontSize: "1rem" }}
                >+</button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
