import { useState } from "react";
import { Plus, Trash2, Bookmark, Search, X, Sparkles, Copy } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Badge, Modal, Select, PageHeader } from "../components/ui/index.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const INITIAL = [
  { id: 1, title: "Kalkulus — Turunan Fungsi",  content: "Turunan mengukur laju perubahan fungsi. Rumus dasar: f'(x) = lim (f(x+h)-f(x))/h saat h→0.\n\nContoh: jika f(x) = x², maka f'(x) = 2x.", tag: "Kuliah",  color: "lime",   createdAt: "2026-03-08" },
  { id: 2, title: "Tips Manajemen Waktu",        content: "1. Gunakan teknik Pomodoro\n2. Prioritaskan dengan Eisenhower Matrix\n3. Block time untuk deep work\n4. Review harian sebelum tidur",              tag: "Tips",    color: "peach",  createdAt: "2026-03-09" },
  { id: 3, title: "Basis Data — Normalisasi",    content: "Normalisasi bertujuan mengurangi redundansi:\n1NF: Setiap kolom atomik\n2NF: Tidak ada partial dependency\n3NF: Tidak ada transitive dependency", tag: "Kuliah",  color: "orange", createdAt: "2026-03-10" },
];

const COLOR_BG     = { lime: "var(--mute)",    peach: "var(--mute2)",    orange: "var(--border)" };
const COLOR_BORDER = { lime: "var(--accent)",  peach: "var(--highlight2)", orange: "var(--highlight)"   };

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

export default function NotesPage() {
  const toast = useToast();
  const { t, lang } = useLanguage();

  const [notes,      setNotes]      = useLocalStorage("sr_notes", INITIAL);
  const [customTags, setCustomTags] = useLocalStorage("sr_custom_tags", []);

  // ── Add form state ──
  const [title,         setTitle]         = useState("");
  const [content,       setContent]       = useState("");
  const [tag,           setTag]           = useState("Kuliah");
  const [noteColor,     setNoteColor]     = useState("lime");
  const [showForm,      setShowForm]      = useState(false);
  const [customTag,     setCustomTag]     = useState("");
  const [showCustomTag, setShowCustomTag] = useState(false);

  // ── Filter ──
  const [search,    setSearch]    = useState("");
  const [activeTag, setActiveTag] = useState("All");

  // ── Modal / edit state ──
  const [active,      setActive]      = useState(null);
  const [editMode,    setEditMode]    = useState(false);
  const [editTitle,   setEditTitle]   = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTag,     setEditTag]     = useState("");
  const [editColor,   setEditColor]   = useState("lime");

  // ── AI Summary state (per note id) ──
  const [summaries,      setSummaries]      = useState({});
  const [loadingSummary, setLoadingSummary] = useState(null);

  // ── CRUD ──
  const add = () => {
    if (!title.trim()) { toast(t.notes.titleRequired, "error"); return; }
    setNotes((p) => [
      { id: Date.now(), title: title.trim(), content, tag, color: noteColor, createdAt: new Date().toISOString().slice(0, 10) },
      ...p,
    ]);
    setTitle(""); setContent(""); setShowForm(false);
    toast(t.notes.noteSaved);
  };

  const del = (id) => {
    setNotes((p) => p.filter((n) => n.id !== id));
    setSummaries((p) => { const next = { ...p }; delete next[id]; return next; });
    toast(t.notes.noteDeleted);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) { toast(t.notes.titleRequired, "error"); return; }
    setNotes((p) => p.map((n) => n.id === active.id
      ? { ...n, title: editTitle.trim(), content: editContent, tag: editTag, color: editColor }
      : n
    ));
    setActive((prev) => ({ ...prev, title: editTitle.trim(), content: editContent, tag: editTag, color: editColor }));
    setEditMode(false);
    toast(t.notes.noteUpdated);
  };

  const closeModal = () => {
    setActive(null);
    setEditMode(false);
  };

  // ── AI Summarize (per card) ──
  const summarizeNote = async (noteId, content, e) => {
    e.stopPropagation();

    // Toggle off kalau sudah ada ringkasan
    if (summaries[noteId]) {
      setSummaries((p) => { const next = { ...p }; delete next[noteId]; return next; });
      return;
    }

    if (!content?.trim()) { toast(t.notes.noContent, "error"); return; }

    setLoadingSummary(noteId);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Rangkum catatan belajar berikut secara singkat dan padat dalam 3-5 poin utama. Gunakan bahasa yang sama dengan catatan (Indonesia atau Inggris). Format dengan bullet points (•).\n\nCatatan:\n${content}`,
            }],
          }],
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || "API Error");

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setSummaries((p) => ({ ...p, [noteId]: text }));
      } else {
        throw new Error("Respons AI kosong.");
      }
    } catch (err) {
      toast(lang === "id" ? `Gagal merangkum: ${err.message}` : `Failed to summarize: ${err.message}`, "error");
    } finally {
      setLoadingSummary(null);
    }
  };

  // ── Derived ──
  const allTags       = ["All", ...new Set(notes.map((n) => n.tag))];
  const allTagOptions = [...new Set([...t.notes.tags, ...customTags, ...notes.map((n) => n.tag)])].map((tg) => ({ value: tg, label: tg }));

  const filtered = notes.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    const matchTag    = activeTag === "All" || n.tag === activeTag;
    return matchSearch && matchTag;
  });

  return (
    <div className="fade-up">

      {/* ── HEADER ── */}
      <PageHeader
        title={t.notes.title}
        subtitle={t.notes.notesCount(notes.length)}
        action={
          <Button onClick={() => setShowForm((p) => !p)}>
            <Plus size={16} /> {t.notes.addNote}
          </Button>
        }
      />

      {/* ── SEARCH ── */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.notes.searchPlaceholder}
          style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface)", color: "var(--text)", fontSize: "0.875rem", outline: "none" }}
        />
      </div>

      {/* ── TAG FILTER ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {allTags.map((tg) => (
          <button key={tg} onClick={() => setActiveTag(tg)}
            style={{
              padding: "6px 14px", borderRadius: 99,
              border: `1.5px solid ${activeTag === tg ? "var(--accent)" : "var(--border)"}`,
              background: activeTag === tg ? "var(--mute)" : "transparent",
              color: activeTag === tg ? "var(--accent)" : "var(--text3)",
              fontSize: "0.78rem", fontWeight: activeTag === tg ? 700 : 500,
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s", flexShrink: 0,
            }}
          >
            {tg === "All" ? (lang === "id" ? "Semua" : "All") : tg}
          </button>
        ))}
      </div>

      {/* ── ADD FORM ── */}
      {showForm && (
        <div className="scale-in" style={{ background: "var(--surface)", borderRadius: 16, padding: "20px 22px", border: "1.5px solid var(--accent)", marginBottom: 20, boxShadow: "var(--shadow)" }}>
          <div style={{ display: "grid", gap: 12 }}>
            <Input label={t.notes.noteTitle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t.notes.titlePlaceholder} icon={<Bookmark size={15} />} />
            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>{t.notes.content}</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={t.notes.contentPlaceholder} rows={4}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface2)", color: "var(--text)", fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
              />
            </div>

            <div className="notes-form-bottom" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "end" }}>
              <div>
                <Select label="Tag" value={tag} onChange={(e) => setTag(e.target.value)} options={allTagOptions} />
                <div style={{ marginTop: 6 }}>
                  {!showCustomTag ? (
                    <button onClick={() => setShowCustomTag(true)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 600, padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
                      <Plus size={12} /> {t.notes.addCustomTag}
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: 6 }}>
                      <input value={customTag} onChange={(e) => setCustomTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && customTag.trim()) {
                            const newTag = customTag.trim();
                            setTag(newTag);
                            if (!customTags.includes(newTag) && !t.notes.tags.includes(newTag)) setCustomTags((p) => [...p, newTag]);
                            setShowCustomTag(false); setCustomTag("");
                          }
                        }}
                        placeholder={t.notes.newTagPlaceholder} autoFocus
                        style={{ flex: 1, padding: "7px 10px", border: "1.5px solid var(--accent)", borderRadius: 8, background: "var(--surface2)", color: "var(--text)", fontSize: "0.82rem", outline: "none" }}
                      />
                      <button
                        onClick={() => {
                          if (customTag.trim()) {
                            const newTag = customTag.trim();
                            setTag(newTag);
                            if (!customTags.includes(newTag) && !t.notes.tags.includes(newTag)) setCustomTags((p) => [...p, newTag]);
                            setShowCustomTag(false); setCustomTag("");
                          }
                        }}
                        style={{ padding: "7px 12px", background: "var(--accent)", color: "var(--bg)", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}>
                        OK
                      </button>
                      <button onClick={() => { setShowCustomTag(false); setCustomTag(""); }}
                        style={{ padding: "7px 10px", background: "none", border: "1.5px solid var(--border)", borderRadius: 8, cursor: "pointer", color: "var(--text3)" }}>
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 8 }}>{t.notes.colorLabel}</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["lime", "peach", "orange"].map((c) => (
                    <button key={c} onClick={() => setNoteColor(c)}
                      style={{ width: 28, height: 28, borderRadius: 8, background: COLOR_BG[c], border: `2px solid ${noteColor === c ? COLOR_BORDER[c] : "transparent"}`, cursor: "pointer", transition: "all 0.15s" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
            <Button variant="ghost" onClick={() => setShowForm(false)}>{t.notes.cancelBtn}</Button>
            <Button onClick={add}><Plus size={15} /> {t.notes.saveBtn}</Button>
          </div>
        </div>
      )}

      {/* ── MASONRY GRID ── */}
      <div className="notes-grid" style={{ filter: active ? "blur(3px)" : "none" }}>
        {filtered.map((n, i) => (
          <div key={n.id} className="lift fade-up"
            style={{
              breakInside: "avoid", marginBottom: 14,
              background: "var(--surface)", border: "1.5px solid var(--border)",
              borderLeft: `3px solid ${COLOR_BORDER[n.color]}`,
              borderRadius: 14, padding: "18px", cursor: "pointer",
              animationDelay: `${i * 60}ms`,
            }}
            onClick={() => setActive(n)}
          >
            {/* Card header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "var(--text)", flex: 1, marginRight: 8 }}>
                {n.title}
              </div>
              <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                {/* AI Summarize button */}
                <button
                  onClick={(e) => summarizeNote(n.id, n.content, e)}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = (summaries[n.id] || loadingSummary === n.id) ? "var(--accent)" : "var(--text3)"}
                  style={{
                    background: "none", border: "1px solid var(--border)",
                    borderRadius: 99, cursor: "pointer",
                    color: (summaries[n.id] || loadingSummary === n.id) ? "var(--accent)" : "var(--text3)",
                    display: "flex", alignItems: "center", gap: 4,
                    padding: "3px 8px", transition: "all 0.15s",
                    fontSize: "0.7rem", fontWeight: 600,
                    fontFamily: "inherit",
                  }}
                >
                  {loadingSummary === n.id
                    ? <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>✦</span>
                    : <Sparkles size={11} />
                  }
                  {loadingSummary === n.id
                    ? (lang === "id" ? "Merangkum..." : "Summarizing...")
                    : summaries[n.id]
                      ? (lang === "id" ? "Sembunyikan" : "Hide")
                      : (lang === "id" ? "Ringkas" : "Summarize")
                  }
                </button>

                {/* Delete button */}
                <button
                  onClick={(e) => { e.stopPropagation(); del(n.id); }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--highlight)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--text3)"}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", padding: 2, transition: "color 0.15s" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* AI Summary result */}
            {summaries[n.id] && (
              <div className="fade-in" style={{
                marginBottom: 10, padding: "10px 12px",
                background: "var(--mute)", borderRadius: 8,
                border: "1px solid var(--border)",
              }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header ringkasan + tombol copy */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <Sparkles size={10} />
                    <span>{lang === "id" ? "Ringkasan AI" : "AI Summary"}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(summaries[n.id]);
                      toast(lang === "id" ? "Ringkasan disalin!" : "Summary copied!");
                    }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "var(--text3)", display: "flex", alignItems: "center",
                      gap: 4, fontSize: "0.68rem", fontWeight: 600,
                      padding: "2px 6px", borderRadius: 6,
                      transition: "all 0.15s", fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "var(--surface2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text3)"; e.currentTarget.style.background = "none"; }}
                  >
                    <Copy size={11} /> {lang === "id" ? "Salin" : "Copy"}
                  </button>
                  </div>

                <div style={{ fontSize: "0.78rem", color: "var(--text2)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {summaries[n.id]}
                </div>
              </div>
            )}

            {/* Content preview */}
            <div style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6, marginBottom: 12, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
              {n.content || t.notes.noContent}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Badge color="muted">{n.tag}</Badge>
              <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{n.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── DETAIL MODAL ── */}
      <Modal open={!!active} onClose={closeModal} maxW={520}>
        {active && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)", flex: 1, marginRight: 12 }}>
                {editMode ? t.notes.editNote : active.title}
              </div>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", flexShrink: 0 }}>
                <X size={18} />
              </button>
            </div>

            {!editMode ? (
              <>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <Badge color="lime">{active.tag}</Badge>
                  <Badge color="muted">{active.createdAt}</Badge>
                </div>
                <div style={{ height: 1, background: "var(--border)", marginBottom: 12 }} />
                <div style={{ fontSize: "0.9rem", color: "var(--text2)", lineHeight: 1.8, whiteSpace: "pre-wrap", marginBottom: 16 }}>
                  {active.content || t.notes.noContent}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={() => {
                    setEditTitle(active.title);
                    setEditContent(active.content);
                    setEditTag(active.tag);
                    setEditColor(active.color);
                    setEditMode(true);
                  }}>
                    {t.notes.editBtn}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
                  <Input label={t.notes.noteTitle} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder={t.notes.titlePlaceholder} icon={<Bookmark size={15} />} />
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>{t.notes.content}</label>
                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={5}
                      style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface2)", color: "var(--text)", fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <Select label="Tag" value={editTag} onChange={(e) => setEditTag(e.target.value)} options={allTagOptions} style={{ flex: 1 }} />
                    <div>
                      <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 8 }}>{t.notes.colorLabel}</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        {["lime", "peach", "orange"].map((c) => (
                          <button key={c} onClick={() => setEditColor(c)}
                            style={{ width: 28, height: 28, borderRadius: 8, background: COLOR_BG[c], border: `2px solid ${editColor === c ? COLOR_BORDER[c] : "transparent"}`, cursor: "pointer", transition: "all 0.15s" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <Button variant="ghost" onClick={() => setEditMode(false)}>{t.notes.cancelBtn}</Button>
                  <Button onClick={saveEdit}>{t.notes.saveEditBtn}</Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}