import { useState, useEffect } from "react";
import { useTheme, THEMES } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { Check, Type, Globe, Palette, AlignLeft, ChevronLeft } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const THEME_META = {
  "morning-mist": { en: "Morning Mist",  id: "Kabut Pagi",      type: "light", bg: "#F2E8DF", surface: "#FEFEFE", accent: "#415111", highlight: "#FB8159" },
  "lavender-sky": { en: "Lavender Sky",  id: "Langit Lavender", type: "light", bg: "#F8F6F5", surface: "#CBCEEA", accent: "#5D5D5A", highlight: "#CDEBF1" },
  "rose-petal":   { en: "Rose Petal",    id: "Mawar Senja",     type: "light", bg: "#FEDEE9", surface: "#F7C5D5", accent: "#7D1C35", highlight: "#C4727E" },
  "midnight":     { en: "Midnight",      id: "Tengah Malam",    type: "dark",  bg: "#132436", surface: "#1C3448", accent: "#4A9EBF", highlight: "#E8EDF2" },
  "blush-dusk":   { en: "Blush Dusk",    id: "Senja Blush",     type: "dark",  bg: "#363230", surface: "#4A3F3A", accent: "#C4956A", highlight: "#FFECCD" },
  "slate":        { en: "Slate",         id: "Abu Elegan",      type: "dark",  bg: "#383838", surface: "#4A4A4A", accent: "#8FAEC2", highlight: "#E8EAEB" },
};

const FONTS = [
  { id: "Outfit",        label: "Outfit",        sample: "Aa Bb Cc" },
  { id: "Poppins",       label: "Poppins",       sample: "Aa Bb Cc" },
  { id: "Space Grotesk", label: "Space Grotesk", sample: "Aa Bb Cc" },
  { id: "Lora",          label: "Lora",          sample: "Aa Bb Cc" },
  { id: "Caveat",        label: "Caveat",        sample: "Aa Bb Cc" },
  { id: "Nunito",        label: "Nunito",        sample: "Aa Bb Cc" },
];

const FONT_SIZE_MIN = 12;
const FONT_SIZE_MAX = 20;

const NAV_SECTIONS = [
  { id: "theme",    icon: Palette,   en: "Theme",     id_: "Tema"        },
  { id: "font",     icon: Type,      en: "Font",      id_: "Font"        },
  { id: "fontsize", icon: AlignLeft, en: "Text Size", id_: "Ukuran Teks" },
  { id: "language", icon: Globe,     en: "Language",  id_: "Bahasa"      },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { lang, setLanguage } = useLanguage();
  const [fontFamily, setFontFamily] = useLocalStorage("sr_font", "Outfit");
  const [fontSize,   setFontSize]   = useLocalStorage("sr_fontsize", 15);
  const [activeSection, setActiveSection] = useState("theme");
  const [mobileView, setMobileView] = useState(null);

  // Track window width for responsive theme grid
  const [winWidth, setWinWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    document.body.style.fontFamily = `'${fontFamily}', sans-serif`;
    document.documentElement.style.fontSize = `${fontSize}px`;
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const applyFont = (f) => {
    setFontFamily(f);
    document.body.style.fontFamily = `'${f}', sans-serif`;
  };

  const applySize = (val) => {
    setFontSize(val);
    document.documentElement.style.fontSize = `${val}px`;
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setMobileView(sectionId);
  };

  const lightThemes = THEMES.filter(id => THEME_META[id]?.type === "light");
  const darkThemes  = THEMES.filter(id => THEME_META[id]?.type === "dark");

  const isMobile = winWidth <= 768;

  // Theme grid columns:
  //   mobile panel (≤580px) → 1 col horizontal card
  //   tablet panel (581–768px) → 2 col
  //   desktop content area → 3 col
  const themeGridCols =
    winWidth <= 580 ? "1fr" :
    winWidth <= 768 ? "1fr 1fr" :
    "repeat(3, 1fr)";

  const subLabel = {
    fontSize: "0.7rem", fontWeight: 700,
    color: "var(--text3)", textTransform: "uppercase",
    letterSpacing: "0.1em", marginBottom: 12,
  };

  // ── Theme Card ──
  const ThemeCard = ({ id }) => {
    const m = THEME_META[id];
    const active = theme === id;
    const isHoriz = winWidth <= 580; // horizontal layout on small mobile

    return (
      <button onClick={() => setTheme(id)} style={{
        border: `2px solid ${active
          ? m.accent
          : m.type === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`,
        borderRadius: 14, padding: 0, cursor: "pointer",
        overflow: "hidden", background: m.bg, transition: "all 0.2s",
        transform: active ? "scale(1.02)" : "scale(1)",
        boxShadow: active
          ? `0 6px 20px ${m.accent}${m.type === "dark" ? "40" : "30"}`
          : m.type === "dark" ? "0 2px 8px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.06)",
        position: "relative",
        // horizontal card on small mobile
        display: isHoriz ? "flex" : "block",
        alignItems: isHoriz ? "center" : undefined,
        width: "100%",
      }}>
        {/* Preview area */}
        <div style={{
          padding: isHoriz ? "12px 14px" : "12px 12px 6px",
          flexShrink: isHoriz ? 0 : undefined,
          width: isHoriz ? 100 : undefined,
        }}>
          <div style={{ height: 7, borderRadius: 99, background: m.accent, marginBottom: 6, width: "55%" }} />
          <div style={{ display: "flex", gap: 5, marginBottom: isHoriz ? 0 : 5 }}>
            <div style={{ height: isHoriz ? 24 : 28, flex: 2, borderRadius: 7, background: m.surface }} />
            <div style={{ height: isHoriz ? 24 : 28, flex: 1, borderRadius: 7,
              background: m.type === "dark" ? m.accent + "55" : m.highlight + "88" }} />
          </div>
          {!isHoriz && <div style={{ height: 4, borderRadius: 99, background: m.accent + "22", width: "75%" }} />}
        </div>

        {/* Label */}
        <div style={{
          padding: isHoriz ? "0 14px" : "5px 12px 10px",
          flex: isHoriz ? 1 : undefined,
          textAlign: isHoriz ? "left" : undefined,
        }}>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: isHoriz ? "0.85rem" : "0.72rem",
            color: m.type === "dark" ? m.highlight : m.accent,
          }}>
            {lang === "id" ? m.id : m.en}
          </div>
          {isHoriz && (
            <div style={{ fontSize: "0.72rem", color: m.type === "dark" ? m.highlight + "99" : m.accent + "99", marginTop: 2 }}>
              {m.type === "dark" ? (lang === "id" ? "Gelap" : "Dark") : (lang === "id" ? "Terang" : "Light")}
            </div>
          )}
        </div>

        {active && (
          <div style={{
            position: isHoriz ? "relative" : "absolute",
            top: isHoriz ? undefined : 7,
            right: isHoriz ? undefined : 7,
            marginRight: isHoriz ? 14 : undefined,
            width: 20, height: 20, borderRadius: 99,
            background: m.accent, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Check size={11} color={m.type === "dark" ? m.bg : "#fff"} strokeWidth={3} />
          </div>
        )}
      </button>
    );
  };

  // ── Render section content ──
  const renderContent = () => {
    const section = mobileView || activeSection;

    if (section === "theme") return (
      <div>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: 4 }}>
            {lang === "id" ? "Pilih Tema" : "Choose Theme"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text2)" }}>
            {lang === "id" ? "Tema berlaku secara langsung." : "Theme applies instantly."}
          </div>
        </div>

        <div style={subLabel}>{lang === "id" ? "Terang" : "Light"}</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: themeGridCols,
          gap: winWidth <= 580 ? 8 : 10,
          marginBottom: 24,
        }}>
          {lightThemes.map(id => <ThemeCard key={id} id={id} />)}
        </div>

        <div style={subLabel}>{lang === "id" ? "Gelap" : "Dark"}</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: themeGridCols,
          gap: winWidth <= 580 ? 8 : 10,
        }}>
          {darkThemes.map(id => <ThemeCard key={id} id={id} />)}
        </div>
      </div>
    );

    if (section === "font") return (
      <div>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: 4 }}>
            {lang === "id" ? "Pilih Font" : "Choose Font"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text2)" }}>
            {lang === "id" ? "Font berlaku ke seluruh aplikasi." : "Font applies across the entire app."}
          </div>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: winWidth <= 480 ? "1fr" : "1fr 1fr",
          gap: 10,
        }}>
          {FONTS.map(f => {
            const active = fontFamily === f.id;
            return (
              <button key={f.id} onClick={() => applyFont(f.id)} style={{
                padding: "16px 18px",
                background: active ? "var(--mute)" : "var(--bg2)",
                border: `1.5px solid ${active ? "var(--accent)" : "var(--border)"}`,
                borderRadius: 12, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "space-between",
                transition: "all 0.15s", textAlign: "left",
              }}>
                <div>
                  <div style={{ fontFamily: `'${f.id}', sans-serif`, fontSize: "1.4rem", fontWeight: 600, color: active ? "var(--accent)" : "var(--text)", lineHeight: 1.2, marginBottom: 4 }}>{f.sample}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{f.label}</div>
                </div>
                {active && (
                  <div style={{ width: 22, height: 22, borderRadius: 99, background: "var(--accent)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={12} color="var(--bg)" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );

    if (section === "fontsize") return (
      <div>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: 4 }}>
            {lang === "id" ? "Ukuran Teks" : "Text Size"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text2)" }}>
            {lang === "id" ? "Sesuaikan ukuran teks seluruh aplikasi." : "Adjust the base text size across the app."}
          </div>
        </div>
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px", marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontFamily: `'${fontFamily}', sans-serif`, fontSize: `${fontSize}px`, fontWeight: 600, color: "var(--text)", transition: "font-size 0.2s" }}>
            {lang === "id" ? "Contoh teks ukuran ini" : "This is a preview of your text size"}
          </div>
        </div>
        <div style={{ padding: "0 4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{FONT_SIZE_MIN}px</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--accent)" }}>{fontSize}px</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{FONT_SIZE_MAX}px</span>
          </div>
          <input type="range" min={FONT_SIZE_MIN} max={FONT_SIZE_MAX} value={fontSize}
            onChange={(e) => applySize(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent)", height: 4, cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, flexWrap: "wrap", gap: 6 }}>
            {[12, 14, 15, 16, 18, 20].map(v => (
              <button key={v} onClick={() => applySize(v)} style={{
                padding: "5px 12px",
                background: fontSize === v ? "var(--mute)" : "transparent",
                border: `1px solid ${fontSize === v ? "var(--accent)" : "var(--border)"}`,
                borderRadius: 7, cursor: "pointer", fontSize: "0.72rem", fontWeight: 600,
                color: fontSize === v ? "var(--accent)" : "var(--text3)", transition: "all 0.15s",
                flex: "1 1 auto", minWidth: 40, textAlign: "center",
              }}>{v}</button>
            ))}
          </div>
        </div>
      </div>
    );

    if (section === "language") return (
      <div>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: 4 }}>
            {lang === "id" ? "Pilih Bahasa" : "Choose Language"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text2)" }}>
            {lang === "id" ? "Bahasa berlaku ke seluruh aplikasi." : "Language applies across the entire app."}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, color: "var(--text)" }}>
          {[
            { code: "en", label: { en: "English",   id: "Inggris"   }, sub: "English",          flag: "EN" },
            { code: "id", label: { en: "Indonesian", id: "Indonesia" }, sub: "Bahasa Indonesia", flag: "ID" },
          ].map(l => {
            const active = lang === l.code;
            return (
              <button key={l.code} onClick={() => setLanguage(l.code)} style={{
                padding: "18px 20px", background: active ? "var(--mute)" : "var(--bg2)",
                border: `1.5px solid ${active ? "var(--accent)" : "var(--border)"}`,
                borderRadius: 12, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "space-between", transition: "all 0.15s", color: active ? "var(--accent)" : "var(--text)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>{l.flag}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem", color: active ? "var(--accent)" : "var(--text)" }}>{l.label[lang]}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text3)", marginTop: 2 }}>{l.sub}</div>
                  </div>
                </div>
                {active && (
                  <div style={{ width: 22, height: 22, borderRadius: 99, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={12} color="var(--bg)" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fade-up" style={{ maxWidth: 860, margin: "0 auto", paddingBottom: 48 }}>

      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "var(--text)", marginBottom: 4 }}>
          {lang === "id" ? "Pengaturan" : "Settings"}
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--text2)" }}>
          {lang === "id" ? "Sesuaikan tampilan & pengalaman SteadyRise-mu." : "Personalize your SteadyRise experience."}
        </p>
      </div>

      {/* ── DESKTOP (>768px): side-by-side ── */}
      <div className="settings-desktop-panel" style={{
        display: "grid",
        gridTemplateColumns: "190px 1fr",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        overflow: "hidden",
        minHeight: 480,
      }}>
        <div style={{ borderRight: "1px solid var(--border)", background: "var(--bg2)", padding: "16px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 12px 10px" }}>
            {lang === "id" ? "Preferensi" : "Preferences"}
          </div>
          {NAV_SECTIONS.map(s => {
            const Icon = s.icon;
            const active = activeSection === s.id;
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                width: "100%", padding: "9px 12px",
                background: active ? "var(--mute)" : "transparent",
                border: `1px solid ${active ? "var(--border)" : "transparent"}`,
                borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 9,
                color: active ? "var(--accent)" : "var(--text2)",
                fontSize: "0.84rem", fontWeight: active ? 600 : 400,
                transition: "all 0.15s", textAlign: "left", position: "relative",
              }}>
                {active && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: "60%", background: "var(--accent)", borderRadius: "0 3px 3px 0" }} />}
                <Icon size={15} strokeWidth={active ? 2.5 : 1.8} />
                {lang === "id" ? s.id_ : s.en}
              </button>
            );
          })}
        </div>
        <div style={{ padding: "28px 32px", overflowY: "auto" }}>
          {renderContent()}
        </div>
      </div>

      {/* ── MOBILE/TABLET (≤768px): 2-step ── */}
      <div className="settings-mobile-panel">
        {mobileView === null ? (
          /* Step 1 — Menu list */
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px 10px", fontSize: "0.65rem", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
              {lang === "id" ? "Preferensi" : "Preferences"}
            </div>
            {NAV_SECTIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={() => handleNavClick(s.id)} style={{
                  width: "100%", padding: "15px 20px",
                  background: "transparent", border: "none",
                  borderBottom: i < NAV_SECTIONS.length - 1 ? "1px solid var(--border)" : "none",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "space-between", color: "var(--text)",
                  transition: "background 0.15s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--mute)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={17} color="var(--accent)" strokeWidth={1.8} />
                    </div>
                    <span style={{ fontWeight: 500, fontSize: "0.92rem" }}>
                      {lang === "id" ? s.id_ : s.en}
                    </span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              );
            })}
          </div>
        ) : (
          /* Step 2 — Content */
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", background: "var(--bg2)", display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setMobileView(null)} style={{
                background: "var(--mute)", border: "none", borderRadius: 8,
                width: 32, height: 32, display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer", flexShrink: 0,
              }}>
                <ChevronLeft size={16} color="var(--accent)" strokeWidth={2.5} />
              </button>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>
                {lang === "id"
                  ? NAV_SECTIONS.find(s => s.id === mobileView)?.id_
                  : NAV_SECTIONS.find(s => s.id === mobileView)?.en}
              </span>
            </div>
            <div style={{ padding: "24px 20px" }}>
              {renderContent()}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .settings-desktop-panel { display: grid; }
        .settings-mobile-panel  { display: none; }

        @media (max-width: 768px) {
          .settings-desktop-panel { display: none !important; }
          .settings-mobile-panel  { display: block !important; }
        }
      `}</style>

    </div>
  );
}