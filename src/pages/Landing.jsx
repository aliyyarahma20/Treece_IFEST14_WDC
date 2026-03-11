import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, CheckSquare, Target, Bell, BarChart2,
  BookOpen, Timer, Activity, ArrowRight, ChevronRight,
  Sparkles, Zap,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle.jsx";
import Button from "../components/ui/Button.jsx";

const FEATURES = [
  { icon: <LayoutDashboard size={22} />, title: "Dashboard Produktivitas",   desc: "Visualisasi real-time progress harian lewat grafik, streak, dan kalender aktivitas." },
  { icon: <CheckSquare     size={22} />, title: "Task Manager Canggih",      desc: "Kelola tugas dengan deadline, prioritas, dan kategori. Filter cepat untuk fokus." },
  { icon: <Target          size={22} />, title: "Target & Goal Setting",     desc: "Set target belajar dan pantau pencapaian dengan progress bar yang memotivasi." },
  { icon: <Bell            size={22} />, title: "Smart Reminder",            desc: "Pengingat yang tidak bisa di-dismiss tanpa menjawab pertanyaan verifikasi." },
  { icon: <BarChart2       size={22} />, title: "Monthly Recap",             desc: "Rekap bulanan lengkap: tugas, jam belajar, hari produktif, dan insight waktu." },
  { icon: <BookOpen        size={22} />, title: "Catatan Belajar",           desc: "Note-taking terstruktur per mata kuliah dengan tag dan pencarian cepat." },
  { icon: <Timer           size={22} />, title: "Pomodoro Timer",            desc: "Teknik Pomodoro built-in — fokus 25 menit, istirahat 5 menit." },
  { icon: <Activity        size={22} />, title: "Habit Tracker",             desc: "Bangun kebiasaan baik dengan tracker harian dan streak counter." },
];

function FeatureCard({ icon, title, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "var(--surface)" : "var(--surface2)",
        border: `1.5px solid ${hover ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 16,
        padding: "22px 20px",
        transition: "all 0.25s",
        cursor: "default",
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover ? "var(--shadow-lg)" : "none",
      }}
    >
      <div
        style={{
          width: 44, height: 44,
          borderRadius: 12,
          background: "var(--lime-mute)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          marginBottom: 14,
          transition: "transform 0.2s",
          transform: hover ? "scale(1.1)" : "none",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "0.95rem",
          color: "var(--text)",
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "0.83rem", color: "var(--text2)", lineHeight: 1.65 }}>
        {desc}
      </div>
    </div>
  );
}

export default function Landing({ onEnter }) {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const featRef = useRef();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 5%",
          background: scrolled
            ? isDark ? "rgba(17,26,5,0.9)" : "rgba(242,232,223,0.9)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "all 0.3s",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 64,
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "var(--accent)",
          }}
        >
          Steady<span style={{ color: "var(--orange)" }}>Rise</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ThemeToggle />
          <Button onClick={onEnter} size="sm">
            Mulai Sekarang <ChevronRight size={15} />
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 5% 60px",
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <div className="hero-blob" style={{ width: 500, height: 500, background: isDark ? "rgba(210,225,134,0.06)" : "rgba(210,225,134,0.4)", top: -120, right: -120 }} />
        <div className="hero-blob" style={{ width: 400, height: 400, background: isDark ? "rgba(251,129,89,0.05)" : "rgba(251,129,89,0.2)", bottom: -80, left: -80 }} />
        <div className="hero-blob" style={{ width: 280, height: 280, background: isDark ? "rgba(65,81,17,0.15)" : "rgba(65,81,17,0.07)", top: "40%", left: "30%" }} />

        <div className="fade-up" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--lime-mute)", border: "1px solid var(--border)",
              borderRadius: 99, padding: "6px 16px", marginBottom: 28,
              fontSize: "0.8rem", fontWeight: 600, color: "var(--accent)",
            }}
          >
            <Sparkles size={14} />
            Platform Produktivitas untuk Mahasiswa Indonesia
          </div>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
              lineHeight: 1.1,
              marginBottom: 20,
              letterSpacing: "-1.5px",
            }}
          >
            Kendalikan Waktu,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--orange), var(--peach))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Capai Target
            </span>
            <br />Studimu.
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "var(--text2)",
              maxWidth: 540,
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            SteadyRise adalah ruang kendali produktivitasmu — dari manajemen tugas, tracking target belajar, hingga insight bulanan yang memotivasi.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button onClick={onEnter} size="lg">
              Mulai Gratis <ArrowRight size={18} />
            </Button>
            <Button
              onClick={() => featRef.current?.scrollIntoView({ behavior: "smooth" })}
              variant="ghost"
              size="lg"
            >
              Lihat Fitur
            </Button>
          </div>

          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 52, flexWrap: "wrap" }}>
            {[
              { num: "8",        label: "Fitur Produktivitas"  },
              { num: "100%",     label: "Gratis untuk Mahasiswa" },
              { num: "Dark & Light", label: "Mode Tampilan"   },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--accent)" }}>{s.num}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featRef} style={{ padding: "80px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              letterSpacing: "-0.5px",
              marginBottom: 12,
            }}
          >
            Semua yang kamu butuhkan,<br />dalam satu tempat.
          </h2>
          <p style={{ color: "var(--text2)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
            Dirancang khusus untuk ritme kehidupan mahasiswa yang dinamis dan penuh tantangan.
          </p>
        </div>

        <div
          className="section-reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="section-reveal"
        style={{ padding: "0 5% 100px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          className="landing-cta-banner"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #263510 0%, #1a2608 100%)"
              : "linear-gradient(135deg, #415111 0%, #2e3a16 100%)",
            borderRadius: 24,
            padding: "56px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 28,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", right: 40, bottom: -20, opacity: 0.07 }}>
            <Zap size={180} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "1.8rem",
                color: "#D2E186",
                marginBottom: 8,
              }}
            >
              Siap jadi lebih produktif?
            </h3>
            <p style={{ color: "rgba(252,191,147,0.8)", fontSize: "0.95rem" }}>
              Bergabung sekarang dan mulai kendalikan waktu belajarmu.
            </p>
          </div>
          <Button
            onClick={onEnter}
            size="lg"
            style={{ background: "#D2E186", color: "#415111", flexShrink: 0 }}
          >
            Mulai Sekarang <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "24px 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          color: "var(--text3)",
          fontSize: "0.8rem",
        }}
      >
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "var(--accent)" }}>
          SteadyRise
        </span>
        <span>IFest WDC 2026 — Empowering Students Through Innovative Productivity Tools</span>
      </footer>
    </div>
  );
}
