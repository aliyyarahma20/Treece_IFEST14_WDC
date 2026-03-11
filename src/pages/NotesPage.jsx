import { useState } from "react";
import { Plus, Trash2, Bookmark, Search, X } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Badge, Modal, Select, PageHeader } from "../components/ui/index.jsx";

const INITIAL = [
  { id: 1, title: "Kalkulus — Turunan Fungsi",  content: "Turunan mengukur laju perubahan fungsi. Rumus dasar: f'(x) = lim (f(x+h)-f(x))/h saat h→0.\n\nContoh: jika f(x) = x², maka f'(x) = 2x.", tag: "Kuliah",  color: "lime",   createdAt: "2026-03-08" },
  { id: 2, title: "Tips Manajemen Waktu",        content: "1. Gunakan teknik Pomodoro\n2. Prioritaskan dengan Eisenhower Matrix\n3. Block time untuk deep work\n4. Review harian sebelum tidur",              tag: "Tips",    color: "peach",  createdAt: "2026-03-09" },
  { id: 3, title: "Basis Data — Normalisasi",    content: "Normalisasi bertujuan mengurangi redundansi:\n1NF: Setiap kolom atomik\n2NF: Tidak ada partial dependency\n3NF: Tidak ada transitive dependency", tag: "Kuliah",  color: "orange", createdAt: "2026-03-10" },
];

const COLOR_BG     = { lime: "var(--lime-mute)", peach: "rgba(252,191,147,0.2)", orange: "var(--orange-mute)" };
const COLOR_BORDER = { lime: "var(--lime)",      peach: "var(--peach)",          orange: "var(--orange)"      };

export default function NotesPage() {
  const toast = useToast();
  const [notes, setNotes] = useLocalStorage("sr_notes", INITIAL);
  const [title,    setTitle]    = useState("");
  const [content,  setContent]  = useState("");
  const [tag,      setTag]      = useState("Kuliah");
  const [noteColor,setNoteColor]= useState("lime");
  const [showForm, setShowForm] = useState(false);
  const [active,   setActive]   = useState(null);
  const [search,   setSearch]   = useState("");

  const add = () => {
    if (!title.trim()) { toast("Judul catatan wajib diisi!", "error"); return; }
    setNotes((p) => [
      { id: Date.now(), title: title.trim(), content, tag, color: noteColor, createdAt: new Date().toISOString().slice(0, 10) },
      ...p,
    ]);
    setTitle(""); setContent(""); setShowForm(false);
    toast("Catatan berhasil disimpan!");
  };

  const del = (id) => { setNotes((p) => p.filter((n) => n.id !== id)); toast("Catatan dihapus"); };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-up">
      <PageHeader
        title="Catatan Belajar"
        subtitle={`${notes.length} catatan tersimpan`}
        action={
          <Button onClick={() => setShowForm((p) => !p)}>
            <Plus size={16} /> Catatan Baru
          </Button>
        }
      />

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari catatan..."
          style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface)", color: "var(--text)", fontSize: "0.875rem", outline: "none" }}
        />
      </div>

      {/* Form */}
      {showForm && (
        <div
          className="scale-in"
          style={{ background: "var(--surface)", borderRadius: 16, padding: "20px 22px", border: "1.5px solid var(--accent)", marginBottom: 20, boxShadow: "var(--shadow)" }}
        >
          <div style={{ display: "grid", gap: 12 }}>
            <Input label="Judul Catatan" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="cth: Ringkasan Basis Data Bab 3" icon={<Bookmark size={15} />} />
            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Isi Catatan</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis catatanmu di sini..."
                rows={4}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface2)", color: "var(--text)", fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "'Outfit',sans-serif", lineHeight: 1.6 }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "end" }}>
              <Select
                label="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                options={["Kuliah", "Tips", "Proyek", "Riset", "Pribadi"].map((t) => ({ value: t, label: t }))}
              />
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 8 }}>Warna</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["lime", "peach", "orange"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setNoteColor(c)}
                      style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: COLOR_BG[c],
                        border: `2px solid ${noteColor === c ? COLOR_BORDER[c] : "transparent"}`,
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
            <Button onClick={add}><Plus size={15} /> Simpan</Button>
          </div>
        </div>
      )}

      {/* Masonry grid */}
      <div style={{ columns: "2 280px", gap: 14 }}>
        {filtered.map((n, i) => (
          <div
            key={n.id}
            className="lift fade-up"
            style={{
              breakInside: "avoid",
              marginBottom: 14,
              background: COLOR_BG[n.color],
              border: `1.5px solid ${COLOR_BORDER[n.color]}`,
              borderRadius: 14,
              padding: "18px",
              cursor: "pointer",
              animationDelay: `${i * 60}ms`,
            }}
            onClick={() => setActive(n)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "var(--text)", flex: 1, marginRight: 8 }}>
                {n.title}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); del(n.id); }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 2, flexShrink: 0, transition: "color 0.15s" }}
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6, marginBottom: 12, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
              {n.content || "Tidak ada isi catatan."}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Badge color="muted">{n.tag}</Badge>
              <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{n.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal open={!!active} onClose={() => setActive(null)} maxW={520}>
        {active && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "var(--text)" }}>
                {active.title}
              </div>
              <button onClick={() => setActive(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex" }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <Badge color="lime">{active.tag}</Badge>
              <Badge color="muted">{active.createdAt}</Badge>
            </div>
            <div style={{ height: 1, background: "var(--border)", marginBottom: 16 }} />
            <div style={{ fontSize: "0.9rem", color: "var(--text2)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {active.content || "Belum ada isi catatan."}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
