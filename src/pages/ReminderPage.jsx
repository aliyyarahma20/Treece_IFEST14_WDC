import { useState } from "react";
import { Plus, Bell, Clock, Brain, X, CheckCircle2, Zap } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Card, Badge, Modal, PageHeader } from "../components/ui/index.jsx";

const INITIAL = [
  { id: 1, task: "Kerjakan Laporan Alpro",   time: "09:00", question: "Sudah berapa persen kamu mengerjakannya?", active: true },
  { id: 2, task: "Review Materi Kalkulus",   time: "14:30", question: "Topik apa yang akan kamu review hari ini?",  active: true },
];

export default function ReminderPage() {
  const toast = useToast();
  const [reminders, setReminders] = useLocalStorage("sr_reminders", INITIAL);
  const [task,     setTask]     = useState("");
  const [time,     setTime]     = useState("");
  const [question, setQuestion] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [answer, setAnswer] = useState("");

  const add = () => {
    if (!task.trim() || !question.trim()) { toast("Lengkapi semua field!", "error"); return; }
    setReminders((p) => [...p, { id: Date.now(), task: task.trim(), time, question: question.trim(), active: true }]);
    setTask(""); setTime(""); setQuestion(""); setShowForm(false);
    toast("Reminder berhasil dibuat!");
  };

  const openDismiss = (rem) => { setActiveModal(rem); setAnswer(""); };

  const confirm = () => {
    if (!answer.trim()) { toast("Jawab dulu pertanyaannya!", "error"); return; }
    setReminders((p) => p.filter((r) => r.id !== activeModal.id));
    setActiveModal(null);
    toast("Reminder selesai! Tetap semangat!");
  };

  const snooze = () => toast("Reminder di-snooze 15 menit");

  return (
    <div className="fade-up">
      <PageHeader
        title="Smart Reminder"
        subtitle={`${reminders.length} reminder aktif`}
        action={
          <Button onClick={() => setShowForm((p) => !p)}>
            <Plus size={16} /> Buat Reminder
          </Button>
        }
      />

      {/* Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #415111 0%, #2e3a16 100%)",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: 20, opacity: 0.07 }}><Zap size={100} /></div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(210,225,134,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D2E186", flexShrink: 0 }}>
          <Bell size={22} />
        </div>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#D2E186", marginBottom: 4 }}>
            Tidak bisa asal dismiss!
          </div>
          <div style={{ fontSize: "0.83rem", color: "rgba(210,225,134,0.65)", maxWidth: 480 }}>
            Setiap reminder memerlukan jawaban atas pertanyaan verifikasi sebelum bisa ditutup — memastikan kamu benar-benar aware dengan tugasmu.
          </div>
        </div>
      </div>

      {showForm && (
        <Card className="scale-in" style={{ marginBottom: 20, border: "1.5px solid var(--accent)" }}>
          <div style={{ display: "grid", gap: 12 }}>
            <Input label="Nama Tugas / Kegiatan"           value={task}     onChange={(e) => setTask(e.target.value)}     placeholder="cth: Kerjakan laporan Pemweb" icon={<Bell  size={15} />} />
            <Input label="Waktu Pengingat"                  value={time}     onChange={(e) => setTime(e.target.value)}     type="time"                                  icon={<Clock size={15} />} />
            <Input label="Pertanyaan Verifikasi (wajib dijawab sebelum dismiss)" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="cth: Sudah berapa persen progress tugasmu?" icon={<Brain size={15} />} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
            <Button onClick={add}><Plus size={15} /> Buat</Button>
          </div>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
        {!reminders.length ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text3)", gridColumn: "1/-1" }}>
            <Bell size={32} style={{ margin: "0 auto 12px", opacity: 0.35 }} />
            <div>Belum ada reminder aktif</div>
          </div>
        ) : (
          reminders.map((r, i) => (
            <Card key={r.id} className="lift fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text)" }}>{r.task}</div>
                {r.time && <Badge color="lime">{r.time}</Badge>}
              </div>
              <div
                style={{
                  background: "var(--lime-mute)",
                  borderRadius: 8,
                  padding: "10px 12px",
                  fontSize: "0.82rem",
                  color: "var(--text2)",
                  fontStyle: "italic",
                  borderLeft: "2px solid var(--accent)",
                  marginBottom: 14,
                }}
              >
                "{r.question}"
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={() => openDismiss(r)} size="sm" style={{ flex: 1 }}>
                  <Bell size={13} /> Jawab & Selesai
                </Button>
                <Button onClick={snooze} variant="ghost" size="sm">
                  Snooze
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Dismiss Modal */}
      <Modal open={!!activeModal} onClose={() => setActiveModal(null)} maxW={420}>
        {activeModal && (
          <div>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--lime-mute)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: 16 }}>
              <Bell size={22} />
            </div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "var(--text)", marginBottom: 6 }}>
              {activeModal.task}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text2)", marginBottom: 18 }}>
              Untuk menyelesaikan reminder ini, jawab pertanyaan berikut:
            </div>
            <div style={{ background: "var(--lime-mute)", borderRadius: 10, padding: "12px 16px", fontSize: "0.9rem", fontWeight: 500, color: "var(--text)", borderLeft: "3px solid var(--orange)", marginBottom: 16 }}>
              {activeModal.question}
            </div>
            <Input
              label="Jawabanmu"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Ketik jawabanmu di sini..."
              onKeyDown={(e) => e.key === "Enter" && confirm()}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Button variant="ghost" onClick={() => setActiveModal(null)} style={{ flex: 1 }}>Batal</Button>
              <Button onClick={confirm} style={{ flex: 2 }}><CheckCircle2 size={15} /> Konfirmasi</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
