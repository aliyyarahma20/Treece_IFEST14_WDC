import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, CheckSquare, Target, BarChart2,
  BookOpen, Timer, ArrowRight, ChevronRight, Zap,
} from "lucide-react";
import Button from "../components/ui/Button.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";


function FeatureTab({ f, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", textAlign: "left",
        padding: "14px 16px", borderRadius: 14,
        border: `1px solid ${active ? "var(--accent)" : hovered ? "var(--border)" : "transparent"}`,
        cursor: "pointer",
        background: active ? "var(--mute)" : hovered ? "var(--surface2)" : "transparent",
        transition: "all 0.2s",
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 2,
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: active ? "var(--accent)" : "var(--surface2)",
        border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: active ? "var(--bg)" : "var(--text3)",
        transition: "all 0.2s",
      }}>
        {f.icon}
      </div>
      <div className="hide-mobile" style={{ minWidth: 0 }}>
        <div style={{ fontSize: "0.88rem", fontWeight: active ? 700 : 500, color: active ? "var(--accent)" : "var(--text2)", marginBottom: 2 }}>
          {f.title}
        </div>
        <div style={{ fontSize: "0.68rem", color: "var(--text3)", fontWeight: 500 }}>
          {f.tag}
        </div>
      </div>
      {active && (
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <ArrowRight size={14} color="var(--accent)" />
        </div>
      )}
    </button>
  );
}

export default function Landing({ onEnter }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const { t, lang, toggleLang } = useLanguage();

  const FEATURES = [
    { id: "dashboard", icon: <LayoutDashboard size={22} />, tag: t.landing.tags[0], preview: <img src="/images/preview-dashboard.png" alt="Dashboard" style={{ width: "100%", borderRadius: 10, display: "block" }} />, ...t.features.items[0] },
    { id: "todo",      icon: <CheckSquare size={22} />,     tag: t.landing.tags[1], preview: <img src="/images/preview-todo.png" alt="Task Manager" style={{ width: "100%", borderRadius: 10, display: "block" }} />, ...t.features.items[1] },
    { id: "target",    icon: <Target size={22} />,          tag: t.landing.tags[2], preview: <img src="/images/preview-target.png" alt="Target" style={{ width: "100%", borderRadius: 10, display: "block" }} />, ...t.features.items[2] },
    { id: "recap",     icon: <BarChart2 size={22} />,       tag: t.landing.tags[3], preview: <img src="/images/preview-recap.png" alt="Monthly Recap" style={{ width: "100%", borderRadius: 10, display: "block" }} />, ...t.features.items[3] },
    { id: "notes",     icon: <BookOpen size={22} />,        tag: t.landing.tags[4], preview: <img src="/images/preview-notes.png" alt="Catatan Belajar" style={{ width: "100%", borderRadius: 10, display: "block" }} />, ...t.features.items[4] },
  ];

  const heroRef = useRef();
  const featRef = useRef();
  const ctaRef  = useRef();

  // Force morning-mist theme untuk landing page
  useEffect(() => {
    const prev = document.body.getAttribute("data-theme");
    document.body.setAttribute("data-theme", "morning-mist");
    return () => {
      // Restore tema user waktu keluar landing
      const saved = localStorage.getItem("sr_theme") || "morning-mist";
      document.body.setAttribute("data-theme", saved);
    };
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = [heroRef, featRef, ctaRef];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.findIndex((r) => r.current === e.target);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((r) => { if (r.current) obs.observe(r.current); });
    return () => obs.disconnect();
  }, []);

  // Auto-rotate fitur
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveFeature((p) => (p + 1) % FEATURES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Navbar scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        background: scrolled ? "rgba(242,232,223,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "var(--accent)" }}>
          Steady<span style={{ color: "var(--highlight)" }}>Rise</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {[
              { label: t.landing.fitur,   ref: featRef },
              { label: t.landing.tentang, ref: ctaRef  },
            ].map((l, i) => (
              <button
                key={i}
                onClick={() => l.ref.current?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "0.88rem", fontWeight: 500, color: "var(--text2)",
                  fontFamily: "'Outfit',sans-serif", transition: "color 0.15s", padding: 0,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text2)"}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div
            onClick={toggleLang}
            style={{
              position: "relative",
              display: "flex", alignItems: "center",
              background: "var(--accent)", border: "1px solid var(--border)",
              borderRadius: 99, padding: "3px",
              cursor: "pointer", width: 76, height: 32,
              flexShrink: 0,
            }}
          >
            {/* Sliding knob */}
            <div style={{
              position: "absolute",
              width: 34, height: 26,
              background: "var(--bg)",
              borderRadius: 99,
              left: 3,
              transform: lang === "en" ? `translateX(34px)` : "translateX(0px)",
              transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            }} />

            {/* Labels */}
            {[["id", "ID"], ["en", "EN"]].map(([val, label]) => (
              <div key={val} style={{
                flex: 1, textAlign: "center",
                fontSize: "0.72rem", fontWeight: 800,
                color: lang === val ? "var(--accent)" : "var(--bg)",
                position: "relative", zIndex: 1,
                transition: "color 0.2s",
              }}>
                {label}
              </div>
            ))}
          </div>

          <Button onClick={onEnter} size="sm">
            <span className="hide-mobile">{t.landing.mulai}</span>
            <span className="show-mobile">{t.landing.mulai}</span>
            <ChevronRight size={15} />
          </Button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "100px 6% 60px",
          position: "relative", overflow: "hidden",
        }}
      >
        <div className="hero-blob" style={{ width: 500, height: 500, background: "rgba(210,225,134,0.35)", top: -100, right: -100 }} />
        <div className="hero-blob" style={{ width: 350, height: 350, background: "rgba(251,129,89,0.15)", bottom: 0, left: -80 }} />

        {/* Top row */}
        <div className="fade-up hero-top-row" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 40, flexWrap: "wrap", position: "relative", zIndex: 1, marginBottom: 40 }}>

          {/* KIRI */}
          <div className="hero-left" style={{ flex: "1 1 480px", maxWidth: 620 }}>
            <h1 className="hero-headline" style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              lineHeight: 1.08, letterSpacing: "-2px",
              marginBottom: 28, color: "var(--text)",
            }}>
              {t.landing.headline1.split(" ").map((word, i) => (
                <span key={i} style={{ display: "block" }}>{word}</span>
              ))}
              {t.landing.headline2}<br />
              <span style={{
                background: "linear-gradient(135deg, var(--highlight), var(--highlight2))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                display: "inline",
                whiteSpace: "nowrap",
              }}>
                {t.landing.headline3}
              </span>
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
              <Button onClick={onEnter} size="lg">
                {t.landing.cta_btn} <ArrowRight size={18} />
              </Button>
            </div>
          </div>

          {/* KANAN */}
          <div className="hero-right" style={{ flex: "0 1 380px", display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--mute2)", border: "1px solid rgba(251,129,89,0.35)",
              borderRadius: 99, padding: "6px 14px", fontSize: "0.75rem",
              fontWeight: 700, color: "var(--highlight)", width: "fit-content",
            }}>
              <Zap size={12} /> {t.landing.tagline}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 8 }}>
              {t.landing.checklist.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 99,
                    background: "var(--mute)", border: "1px solid var(--accent)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: "0.88rem", color: "var(--text2)" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Theme Showcase — Scattered */}
            <div style={{ position: "relative", height: 220, marginTop: 35 }}>
              {[
                { name: "Morning Mist", bg: "#F2E8DF", accent: "#415111", accent2: "#FB8159",
                  style: { top: 0,   left: 0,   rotate: "-4deg",  zIndex: 6, width: "48%" } },
                { name: "Lavender Sky", bg: "#EEE9F5", accent: "#7B5EA7", accent2: "#A8D4E6",
                  style: { top: 0,   right: 0,  rotate: "3deg",   zIndex: 5, width: "48%" } },
                { name: "Rose Petal",   bg: "#FAE8EC", accent: "#A0284A", accent2: "#D4909F",
                  style: { top: 60,  left: "22%", rotate: "1deg", zIndex: 7, width: "54%" } },
                { name: "Midnight",     bg: "#0D1B2A", accent: "#38BDF8", accent2: "#1E6FA3",
                  style: { top: 160, left: "22%",  rotate: "-2deg",  zIndex: 4, width: "50%" } },
                { name: "Blush Dusk",   bg: "#2A1F1A", accent: "#D4A574", accent2: "#8B5E4A",
                  style: { bottom: 10, right: 10, rotate: "4deg", zIndex: 3, width: "48%" } },
                { name: "Slate",        bg: "#1A1F2E", accent: "#94A3B8", accent2: "#475569",
                  style: { top: 110, left: 0,    rotate: "2deg",   zIndex: 2, width: "46%" } },
              ].map((t) => (
                <div
                  key={t.name}
                  style={{
                    position: "absolute",
                    width: t.style.width,
                    top: t.style.top,
                    bottom: t.style.bottom,
                    left: t.style.left,
                    right: t.style.right,
                    zIndex: t.style.zIndex,
                    transform: `rotate(${t.style.rotate})`,
                    borderRadius: 12,
                    border: `1px solid ${t.bg === "#F2E8DF" || t.bg === "#EEE9F5" || t.bg === "#FAE8EC" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)"}`,
                    background: t.bg,
                    padding: "10px 12px",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", gap: 5 }}>
                      <div style={{ width: "55%", height: 6, borderRadius: 99, background: t.accent, opacity: 0.85 }} />
                      <div style={{ width: "28%", height: 6, borderRadius: 99, background: t.accent2, opacity: 0.7 }} />
                    </div>
                    <div style={{ display: "flex", gap: 5 }}>
                      <div style={{ width: "35%", height: 5, borderRadius: 99, background: t.accent, opacity: 0.35 }} />
                      <div style={{ width: "45%", height: 5, borderRadius: 99, background: t.accent, opacity: 0.2 }} />
                    </div>
                    <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
                      <div style={{ flex: 1, height: 16, borderRadius: 6, background: t.accent, opacity: 0.12 }} />
                      <div style={{ flex: 1, height: 16, borderRadius: 6, background: t.accent2, opacity: 0.18 }} />
                      <div style={{ flex: 1, height: 16, borderRadius: 6, background: t.accent, opacity: 0.08 }} />
                    </div>
                  </div>
                  <div style={{ marginTop: 7, fontSize: "0.62rem", fontWeight: 700, color: t.accent }}>
                    {t.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App Mockup */}
        <div className="float-anim hero-mockup" style={{
          background: "var(--bg)", borderRadius: 16,
          padding: "16px", border: "1px solid var(--border)", marginTop: 50,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: 99, background: "var(--highlight)" }} />
            <div style={{ width: 8, height: 8, borderRadius: 99, background: "var(--highlight)" }} />
            <div style={{ width: 8, height: 8, borderRadius: 99, background: "var(--accent)" }} />
            <div style={{ flex: 1, height: 6, background: "var(--surface2)", borderRadius: 99, marginLeft: 4 }} />
          </div>
          <div style={{ lineHeight: 0 }}>
            <img src="/images/mockup-hero.png" alt="SteadyRise App" style={{ width: "100%", display: "block", borderRadius: 8 }} />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featRef} style={{ padding: "30px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.5px", marginBottom: 12, whiteSpace: "nowrap" }}>
            {t.landing.feat_heading}<br />{t.landing.feat_sub_heading}
          </h2>
          <p style={{ color: "var(--text2)", fontSize: "1rem", maxWidth: 480, margin: "0 auto", whiteSpace: "nowrap" }}>
            {t.landing.feat_desc}
          </p>
        </div>

        <div
          className="section-reveal feature-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 0, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}
        >
          {/* Tab list kiri */}
          <div
            className="feature-tabs"
            style={{ borderRight: "1px solid var(--border)", padding: "8px" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {FEATURES.map((f, i) => (
              <FeatureTab
                key={f.id}
                f={f}
                active={activeFeature === i}
                onClick={() => setActiveFeature(i)}
              />
            ))}
          </div>

          {/* Preview kanan */}
          <div className="feature-preview" style={{ padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="fade-in" key={activeFeature}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "var(--mute)", border: "1px solid var(--border)",
                borderRadius: 99, padding: "4px 12px", marginBottom: 14,
                fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)",
              }}>
                {FEATURES[activeFeature].tag}
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "var(--text)", marginBottom: 10, letterSpacing: "-0.3px" }}>
                {FEATURES[activeFeature].title}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text2)", lineHeight: 1.7, marginBottom: 24 }}>
                {FEATURES[activeFeature].desc}
              </p>

              <div style={{ background: "var(--bg)", borderRadius: 16, padding: "16px", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 99, background: "var(--highlight)" }} />
                  <div style={{ width: 8, height: 8, borderRadius: 99, background: "var(--highlight)" }} />
                  <div style={{ width: 8, height: 8, borderRadius: 99, background: "var(--accent)" }} />
                  <div style={{ flex: 1, height: 6, background: "var(--surface2)", borderRadius: 99, marginLeft: 4 }} />
                </div>
                {FEATURES[activeFeature].preview}
              </div>

              <button
                onClick={onEnter}
                style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--accent)", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", padding: 0, fontFamily: "'Outfit',sans-serif" }}
              >
                {t.landing.coba} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        ref={ctaRef}
        className="section-reveal"
        style={{ padding: "0 5% 100px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          className="landing-cta-banner"
          style={{
            background: "linear-gradient(135deg, #415111 0%, #2e3a16 100%)",
            borderRadius: 24, padding: "56px 48px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 28,
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", right: 40, bottom: -20, opacity: 0.07 }}>
          </div>
          {/* Ganti bagian dalam landing-cta-banner jadi ini */}
        <div style={{ flex: "1 1 0", minWidth: 0, maxWidth: "60%" }}>  {/* ← tambahin ini */}
          <h3 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: "#D2E186", marginBottom: 8,
            // whiteSpace: "nowrap",  ← HAPUS INI
          }}>
            {t.landing.cta_title}
          </h3>
          <p style={{
            color: "rgba(252,191,147,0.8)", fontSize: "0.95rem",
            whiteSpace: "nowrap",
          }}>
            {t.landing.cta_desc}
          </p>
        </div>

        <Button onClick={onEnter} size="lg" style={{ background: "#D2E186", color: "#415111", flexShrink: 0 }}>
          {t.landing.cta_btn} <ArrowRight size={18} />
        </Button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--border)", padding: "24px 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12, color: "var(--text3)", fontSize: "0.8rem",
      }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "var(--accent)" }}>
          SteadyRise
        </span>
        <span>{t.landing.footer}</span>
      </footer>

      {/* ── SCROLL INDICATOR ── */}
      <div className="scroll-indicator" style={{
        position: "fixed", right: 24, top: "50%",
        transform: "translateY(-50%)", zIndex: 90,
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {[
          { label: "Hero",  ref: heroRef },
          { label: t.landing.fitur, ref: featRef },
          { label: "CTA",   ref: ctaRef  },
        ].map((s, i) => (
          <button
            key={i}
            onClick={() => s.ref.current?.scrollIntoView({ behavior: "smooth" })}
            title={s.label}
            style={{
              width: activeSection === i ? 8 : 6,
              height: activeSection === i ? 24 : 6,
              borderRadius: 99, border: "none",
              background: activeSection === i ? "var(--accent)" : "var(--border)",
              cursor: "pointer", padding: 0,
              transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          />
        ))}
      </div>

    </div>
  );
}