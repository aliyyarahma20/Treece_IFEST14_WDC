import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  LayoutDashboard, CheckSquare, Target, Bell, BarChart2,
  Sun, Moon, Menu, X, Plus, Trash2, ChevronRight,
  BookOpen, Clock, Flame, TrendingUp, Calendar, Zap,
  LogIn, Eye, EyeOff, Award, Coffee, Brain, Bookmark,
  CheckCircle2, Circle, AlertCircle, ArrowRight, Star,
  Timer, ListTodo, Activity, Sparkles, ChevronDown,
  MoreHorizontal, Edit3, Filter, Search, User, LogOut
} from "lucide-react";

// ─── THEME CONTEXT ────────────────────────────────────────
const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

// ─── PALETTE ──────────────────────────────────────────────
const palette = {
  lime:   "#D2E186",
  cream:  "#F2E8DF",
  orange: "#FB8159",
  peach:  "#FCBF93",
  forest: "#415111",
  white:  "#FEFEFE",
};

// ─── GLOBAL STYLES ────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      font-family: 'Outfit', sans-serif;
      transition: background 0.35s ease, color 0.35s ease;
      overflow-x: hidden;
    }

    /* Light */
    body.light {
      --bg:        #F2E8DF;
      --bg2:       #FEFEFE;
      --bg3:       #ede3d8;
      --surface:   #FEFEFE;
      --surface2:  #f8f2eb;
      --border:    rgba(65,81,17,0.12);
      --border2:   rgba(65,81,17,0.06);
      --text:      #2a3508;
      --text2:     rgba(42,53,8,0.6);
      --text3:     rgba(42,53,8,0.38);
      --accent:    #415111;
      --accent2:   #5a6e18;
      --lime:      #D2E186;
      --orange:    #FB8159;
      --peach:     #FCBF93;
      --lime-mute: rgba(210,225,134,0.35);
      --orange-mute: rgba(251,129,89,0.15);
      --shadow:    0 2px 16px rgba(65,81,17,0.08);
      --shadow-lg: 0 8px 40px rgba(65,81,17,0.12);
    }

    /* Dark */
    body.dark {
      --bg:        #111a05;
      --bg2:       #1a2608;
      --bg3:       #222f0c;
      --surface:   #1f2d09;
      --surface2:  #263510;
      --border:    rgba(210,225,134,0.1);
      --border2:   rgba(210,225,134,0.05);
      --text:      #eef3d4;
      --text2:     rgba(238,243,212,0.6);
      --text3:     rgba(238,243,212,0.35);
      --accent:    #D2E186;
      --accent2:   #b8cc60;
      --lime:      #D2E186;
      --orange:    #FB8159;
      --peach:     #FCBF93;
      --lime-mute: rgba(210,225,134,0.12);
      --orange-mute: rgba(251,129,89,0.12);
      --shadow:    0 2px 16px rgba(0,0,0,0.3);
      --shadow-lg: 0 8px 40px rgba(0,0,0,0.4);
    }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

    ::selection { background: var(--lime); color: var(--accent); }

    input, select, textarea {
      font-family: 'Outfit', sans-serif;
    }

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    @keyframes scaleIn {
      from { opacity:0; transform:scale(0.92); }
      to   { opacity:1; transform:scale(1); }
    }
    @keyframes slideRight {
      from { opacity:0; transform:translateX(-20px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes pulse {
      0%,100% { opacity:1; }
      50%      { opacity:0.5; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-12px); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position:  200% 0; }
    }
    @keyframes progressFill {
      from { width: 0%; }
    }

    .fade-up { animation: fadeUp 0.5s ease forwards; }
    .fade-in { animation: fadeIn 0.3s ease forwards; }
    .scale-in { animation: scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }

    /* Landing hero blob */
    .hero-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }

    /* Progress bar animation */
    .progress-animated {
      animation: progressFill 1.2s cubic-bezier(0.22,1,0.36,1) forwards;
    }

    /* Tooltip */
    [data-tip] { position: relative; }
    [data-tip]::after {
      content: attr(data-tip);
      position: absolute; bottom: calc(100% + 8px); left: 50%;
      transform: translateX(-50%) scale(0.8);
      background: var(--accent); color: var(--bg);
      padding: 4px 10px; border-radius: 6px;
      font-size: 0.72rem; font-weight: 500; white-space: nowrap;
      pointer-events: none; opacity: 0;
      transition: all 0.2s; transform-origin: bottom center;
    }
    [data-tip]:hover::after {
      opacity: 1; transform: translateX(-50%) scale(1);
    }

    /* Nav active indicator */
    .nav-indicator {
      position: absolute; left: 0; top: 50%; transform: translateY(-50%);
      width: 3px; height: 60%; background: var(--lime);
      border-radius: 0 3px 3px 0;
      transition: all 0.3s;
    }

    /* Card hover lift */
    .lift {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .lift:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg) !important;
    }

    /* Checkbox custom */
    .custom-check {
      appearance: none; -webkit-appearance: none;
      width: 18px; height: 18px; border-radius: 5px;
      border: 1.5px solid var(--border);
      background: var(--surface);
      cursor: pointer; transition: all 0.15s;
      position: relative; flex-shrink: 0;
    }
    .custom-check:checked {
      background: var(--accent); border-color: var(--accent);
    }
    .custom-check:checked::after {
      content: '';
      position: absolute; left: 5px; top: 2px;
      width: 5px; height: 9px;
      border: 2px solid var(--bg); border-top: none; border-left: none;
      transform: rotate(45deg);
    }

    /* Landing section fade */
    .section-reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .section-reveal.visible {
      opacity: 1; transform: translateY(0);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
    }
    @media (min-width: 769px) {
      .show-mobile { display: none !important; }
    }
  `}</style>
);

// ─── HELPERS ──────────────────────────────────────────────
const cls = (...args) => args.filter(Boolean).join(" ");
const fmt = (n, dec = 0) => n.toFixed(dec);

function useLocalStorage(key, init) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

// ─── TOAST ────────────────────────────────────────────────
const ToastCtx = createContext();
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = (msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200);
  };
  return (
    <ToastCtx.Provider value={add}>
      {children}
      <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, display:"flex", flexDirection:"column", gap:8 }}>
        {toasts.map(t => (
          <div key={t.id} className="scale-in" style={{
            background: t.type === "error" ? "var(--orange)" : "var(--accent)",
            color: t.type === "error" ? "#fff" : "var(--bg)",
            padding: "12px 18px", borderRadius: 12, fontSize: "0.875rem",
            fontWeight: 500, boxShadow: "var(--shadow-lg)",
            display: "flex", alignItems: "center", gap: 8,
            maxWidth: 300,
          }}>
            {t.type === "error" ? <AlertCircle size={16}/> : <CheckCircle2 size={16}/>}
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
const useToast = () => useContext(ToastCtx);

// ─── MODAL ────────────────────────────────────────────────
function Modal({ open, onClose, children, maxW = 480 }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fade-in" onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
      backdropFilter:"blur(8px)", zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:16,
    }}>
      <div className="scale-in" onClick={e => e.stopPropagation()} style={{
        background:"var(--surface)", borderRadius:20, padding:"32px 28px",
        width:"100%", maxWidth:maxW, boxShadow:"var(--shadow-lg)",
        border:"1px solid var(--border)",
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── BUTTON ───────────────────────────────────────────────
function Btn({ children, onClick, variant="primary", size="md", style={}, disabled=false, type="button" }) {
  const base = {
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    gap:8, border:"none", cursor: disabled ? "not-allowed" : "pointer",
    fontFamily:"'Outfit',sans-serif", fontWeight:600, borderRadius:10,
    transition:"all 0.2s", opacity: disabled ? 0.5 : 1,
    ...{
      sm: { padding:"8px 14px", fontSize:"0.8rem" },
      md: { padding:"11px 20px", fontSize:"0.875rem" },
      lg: { padding:"14px 28px", fontSize:"0.95rem" },
    }[size],
    ...{
      primary: { background:"var(--accent)", color:"var(--bg)" },
      secondary: { background:"var(--lime-mute)", color:"var(--accent)", border:"1px solid var(--border)" },
      ghost: { background:"transparent", color:"var(--text2)", border:"1px solid var(--border)" },
      danger: { background:"var(--orange-mute)", color:"var(--orange)" },
    }[variant],
    ...style,
  };
  const hoverMap = {
    primary:   { filter:"brightness(0.9)", transform:"translateY(-1px)" },
    secondary: { background:"var(--lime-mute)", filter:"brightness(0.95)" },
    ghost:     { background:"var(--surface2)" },
    danger:    { filter:"brightness(0.95)" },
  };
  const [hover, setHover] = useState(false);
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...base, ...(hover && !disabled ? hoverMap[variant] : {}) }}>
      {children}
    </button>
  );
}

// ─── INPUT ────────────────────────────────────────────────
function Input({ label, value, onChange, placeholder, type="text", icon, hint, style={} }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      {label && <label style={{ fontSize:"0.78rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</label>}
      <div style={{ position:"relative" }}>
        {icon && <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--text3)", pointerEvents:"none" }}>{icon}</div>}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            width:"100%", padding: icon ? "11px 14px 11px 40px" : "11px 14px",
            border: `1.5px solid ${focus ? "var(--accent)" : "var(--border)"}`,
            borderRadius:10, background:"var(--surface2)",
            color:"var(--text)", fontSize:"0.9rem",
            outline:"none", transition:"border-color 0.2s",
            ...style,
          }}/>
      </div>
      {hint && <div style={{ fontSize:"0.75rem", color:"var(--text3)" }}>{hint}</div>}
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────
function Card({ children, style={}, className="" }) {
  return (
    <div className={className} style={{
      background:"var(--surface)", borderRadius:16, padding:"20px 22px",
      border:"1px solid var(--border)", boxShadow:"var(--shadow)",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── BADGE ────────────────────────────────────────────────
function Badge({ children, color="lime" }) {
  const colors = {
    lime:   { bg:"var(--lime-mute)", color:"var(--forest)" },
    orange: { bg:"var(--orange-mute)", color:"var(--orange)" },
    muted:  { bg:"var(--surface2)", color:"var(--text3)" },
  };
  return (
    <span style={{
      padding:"3px 10px", borderRadius:99, fontSize:"0.72rem", fontWeight:600,
      background: colors[color].bg, color: colors[color].color,
    }}>
      {children}
    </span>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────
function ProgressBar({ value, max, color = "var(--accent)", height = 8 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ height, background:"var(--border2)", borderRadius:99, overflow:"hidden" }}>
      <div className="progress-animated" style={{
        height:"100%", width:`${pct}%`, background: color, borderRadius:99,
      }}/>
    </div>
  );
}

// ─── DIVIDER ──────────────────────────────────────────────
const Divider = ({ style={} }) => (
  <div style={{ height:1, background:"var(--border)", ...style }}/>
);

// ══════════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════════
function Landing({ onEnter, theme }) {
  const [scrolled, setScrolled] = useState(false);
  const featRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".section-reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const features = [
    { icon: <LayoutDashboard size={24}/>, title:"Dashboard Produktivitas", desc:"Visualisasi real-time progress harianmu lewat grafik, streak, dan kalender aktivitas yang informatif." },
    { icon: <ListTodo size={24}/>, title:"Task Manager Canggih", desc:"Kelola tugas dengan deadline, prioritas, dan label kategori. Filter cepat untuk fokus pada hal yang penting." },
    { icon: <Target size={24}/>, title:"Target & Goal Setting", desc:"Set target belajar mingguan atau bulanan dan pantau pencapaianmu dengan progress bar yang memotivasi." },
    { icon: <Bell size={24}/>, title:"Smart Reminder", desc:"Pengingat yang tidak bisa langsung di-dismiss — kamu harus menjawab pertanyaan verifikasi untuk memastikan fokus." },
    { icon: <BarChart2 size={24}/>, title:"Monthly Recap", desc:"Rekap bulanan lengkap: tugas selesai, jam belajar, hari produktif, dan insight kapan kamu paling produktif." },
    { icon: <Brain size={24}/>, title:"Catatan Belajar", desc:"Note-taking terstruktur per mata kuliah dengan tag dan pencarian cepat untuk manajemen pengetahuan." },
    { icon: <Timer size={24}/>, title:"Pomodoro Timer", desc:"Teknik Pomodoro built-in — fokus 25 menit, istirahat 5 menit. Bantu jaga konsentrasi belajarmu." },
    { icon: <Activity size={24}/>, title:"Habit Tracker", desc:"Bangun kebiasaan baik dengan tracker harian. Lihat streak-mu tumbuh dan jaga konsistensi." },
  ];

  const isDark = theme === "dark";

  return (
    <div style={{ background:"var(--bg)", color:"var(--text)", minHeight:"100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        padding:"0 5%",
        background: scrolled ? (isDark ? "rgba(17,26,5,0.9)" : "rgba(242,232,223,0.9)") : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition:"all 0.3s",
        display:"flex", alignItems:"center", justifyContent:"space-between", height:64,
      }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.2rem", color:"var(--accent)" }}>
          Steady<span style={{ color:"var(--orange)" }}>Rise</span>
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <ThemeToggle />
          <Btn onClick={onEnter} size="sm">
            Mulai Sekarang <ChevronRight size={15}/>
          </Btn>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        justifyContent:"center", padding:"80px 5% 60px",
        position:"relative", overflow:"hidden",
        flexDirection:"column", textAlign:"center",
      }}>
        {/* Blobs */}
        <div className="hero-blob" style={{ width:500, height:500, background: isDark ? "rgba(210,225,134,0.06)" : "rgba(210,225,134,0.4)", top:-120, right:-120 }}/>
        <div className="hero-blob" style={{ width:400, height:400, background: isDark ? "rgba(251,129,89,0.05)" : "rgba(251,129,89,0.2)", bottom:-80, left:-80 }}/>
        <div className="hero-blob" style={{ width:300, height:300, background: isDark ? "rgba(65,81,17,0.15)" : "rgba(65,81,17,0.08)", top:"40%", left:"30%" }}/>

        <div className="fade-up" style={{ position:"relative", zIndex:1, maxWidth:760 }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"var(--lime-mute)", border:"1px solid var(--border)",
            borderRadius:99, padding:"6px 16px", marginBottom:28,
            fontSize:"0.8rem", fontWeight:600, color:"var(--accent)",
          }}>
            <Sparkles size={14}/>
            Platform Produktivitas untuk Mahasiswa Indonesia
          </div>

          <h1 style={{
            fontFamily:"'Syne',sans-serif", fontWeight:800,
            fontSize:"clamp(2.5rem, 6vw, 4.2rem)",
            lineHeight:1.1, marginBottom:20,
            letterSpacing:"-1.5px",
          }}>
            Kendalikan Waktu,{" "}
            <span style={{
              background:`linear-gradient(135deg, var(--orange), var(--peach))`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>Capai Target</span>
            <br/>Studimu.
          </h1>

          <p style={{
            fontSize:"clamp(1rem, 2vw, 1.15rem)", color:"var(--text2)",
            maxWidth:560, margin:"0 auto 36px", lineHeight:1.7,
          }}>
            SteadyRise adalah ruang kendali produktivitasmu — dari manajemen tugas, tracking target belajar, hingga insight bulanan yang memotivasi.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <Btn onClick={onEnter} size="lg">
              Mulai Gratis <ArrowRight size={18}/>
            </Btn>
            <Btn onClick={() => featRef.current?.scrollIntoView({ behavior:"smooth" })} variant="ghost" size="lg">
              Lihat Fitur
            </Btn>
          </div>

          {/* Mini stats */}
          <div style={{
            display:"flex", gap:32, justifyContent:"center",
            marginTop:52, flexWrap:"wrap",
          }}>
            {[
              { num:"8", label:"Fitur Produktivitas" },
              { num:"100%", label:"Gratis untuk Mahasiswa" },
              { num:"Dark & Light", label:"Mode Tampilan" },
            ].map((s,i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"var(--accent)" }}>{s.num}</div>
                <div style={{ fontSize:"0.78rem", color:"var(--text3)", marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featRef} style={{ padding:"80px 5%", maxWidth:1100, margin:"0 auto" }}>
        <div className="section-reveal" style={{ textAlign:"center", marginBottom:56 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 4vw, 2.6rem)", letterSpacing:"-0.5px", marginBottom:12 }}>
            Semua yang kamu butuhkan,<br/>dalam satu tempat.
          </h2>
          <p style={{ color:"var(--text2)", fontSize:"1rem", maxWidth:480, margin:"0 auto" }}>
            Dirancang khusus untuk ritme kehidupan mahasiswa yang dinamis dan penuh tantangan.
          </p>
        </div>

        <div className="section-reveal" style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",
          gap:16,
        }}>
          {features.map((f, i) => (
            <FeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} delay={i * 60}/>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-reveal" style={{ padding:"0 5% 100px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{
          background: isDark
            ? "linear-gradient(135deg, #263510 0%, #1a2608 100%)"
            : "linear-gradient(135deg, var(--forest) 0%, #2e3a16 100%)",
          borderRadius:24, padding:"56px 48px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:28, position:"relative", overflow:"hidden",
        }}>
          <div style={{ position:"absolute", right:40, bottom:-20, opacity:0.07 }}>
            <Zap size={180}/>
          </div>
          <div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.8rem", color:"#D2E186", marginBottom:8 }}>
              Siap jadi lebih produktif?
            </h3>
            <p style={{ color:"rgba(252,191,147,0.8)", fontSize:"0.95rem" }}>
              Bergabung sekarang dan mulai kendalikan waktu belajarmu.
            </p>
          </div>
          <Btn onClick={onEnter} size="lg" style={{ background:"#D2E186", color:"#415111", flexShrink:0 }}>
            Mulai Sekarang <ArrowRight size={18}/>
          </Btn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop:"1px solid var(--border)", padding:"24px 5%",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:12, color:"var(--text3)", fontSize:"0.8rem",
      }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color:"var(--accent)" }}>SteadyRise</span>
        <span>IFest WDC 2026 — Empowering Students Through Innovative Productivity Tools</span>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "var(--surface)" : "var(--surface2)",
        border:`1.5px solid ${hover ? "var(--accent)" : "var(--border)"}`,
        borderRadius:16, padding:"22px 20px",
        transition:"all 0.25s", cursor:"default",
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover ? "var(--shadow-lg)" : "none",
      }}>
      <div style={{
        width:44, height:44, borderRadius:12, background:"var(--lime-mute)",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"var(--accent)", marginBottom:14,
        transition:"all 0.2s",
        transform: hover ? "scale(1.1)" : "none",
      }}>
        {icon}
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:"var(--text)", marginBottom:8 }}>{title}</div>
      <div style={{ fontSize:"0.83rem", color:"var(--text2)", lineHeight:1.6 }}>{desc}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// LOGIN MODAL
// ══════════════════════════════════════════════════════════
function LoginModal({ open, onClose, onLogin }) {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !pass) { toast("Lengkapi email dan password!", "error"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    onLogin({ name: email.split("@")[0] || "Pengguna", email });
    toast("Selamat datang kembali!");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxW={420}>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.6rem", color:"var(--accent)", marginBottom:6 }}>
          Steady<span style={{ color:"var(--orange)" }}>Rise</span>
        </div>
        <div style={{ fontSize:"0.88rem", color:"var(--text2)" }}>Masuk untuk melanjutkan</div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <Input label="Email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="nama@email.com" type="email" icon={<User size={16}/>}/>

        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <label style={{ fontSize:"0.78rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.5px" }}>Password</label>
          <div style={{ position:"relative" }}>
            <input type={showPass ? "text" : "password"} value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="Masukkan password"
              onKeyDown={e => e.key === "Enter" && submit()}
              style={{
                width:"100%", padding:"11px 40px 11px 14px",
                border:"1.5px solid var(--border)", borderRadius:10,
                background:"var(--surface2)", color:"var(--text)",
                fontSize:"0.9rem", outline:"none",
              }}/>
            <button onClick={() => setShowPass(p => !p)} style={{
              position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
              background:"none", border:"none", cursor:"pointer", color:"var(--text3)",
              display:"flex",
            }}>
              {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
        </div>

        <Btn onClick={submit} size="md" style={{ width:"100%", marginTop:4 }} disabled={loading}>
          {loading ? <span style={{ animation:"spin 0.8s linear infinite", display:"inline-block" }}>◌</span> : <LogIn size={16}/>}
          {loading ? "Masuk..." : "Masuk"}
        </Btn>

        <div style={{ textAlign:"center", fontSize:"0.78rem", color:"var(--text3)" }}>
          Belum punya akun?{" "}
          <span style={{ color:"var(--accent)", cursor:"pointer", fontWeight:600 }}>Daftar gratis</span>
        </div>
      </div>
    </Modal>
  );
}

// ══════════════════════════════════════════════════════════
// THEME TOGGLE
// ══════════════════════════════════════════════════════════
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [hover, setHover] = useState(false);
  return (
    <button onClick={toggle}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width:38, height:38, borderRadius:10, border:"1px solid var(--border)",
        background: hover ? "var(--surface2)" : "transparent",
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        color:"var(--text2)", transition:"all 0.2s",
      }}>
      {theme === "light" ? <Moon size={16}/> : <Sun size={16}/>}
    </button>
  );
}

// ══════════════════════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════════════════════
const NAV_ITEMS = [
  { id:"dashboard", label:"Dashboard", icon: LayoutDashboard },
  { id:"todo",      label:"Task Manager", icon: CheckSquare },
  { id:"target",    label:"Target", icon: Target },
  { id:"reminder",  label:"Smart Reminder", icon: Bell },
  { id:"recap",     label:"Monthly Recap", icon: BarChart2 },
  { id:"notes",     label:"Catatan Belajar", icon: BookOpen },
  { id:"pomodoro",  label:"Pomodoro Timer", icon: Timer },
  { id:"habit",     label:"Habit Tracker", icon: Activity },
];

function Sidebar({ activePage, setPage, open, onClose, user, onLogout }) {
  return (
    <>
      {/* Backdrop mobile */}
      {open && (
        <div className="fade-in show-mobile" onClick={onClose} style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.4)",
          backdropFilter:"blur(4px)", zIndex:198,
        }}/>
      )}

      <aside style={{
        position:"fixed", left:0, top:0, bottom:0, width:220,
        background:"var(--bg2)", borderRight:"1px solid var(--border)",
        display:"flex", flexDirection:"column", zIndex:199,
        transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        transform: open ? "none" : "translateX(-100%)",
        // On desktop always visible
      }} className="sidebar-el">
        <style>{`
          @media (min-width: 769px) {
            .sidebar-el { transform: none !important; }
          }
        `}</style>

        {/* Logo */}
        <div style={{ padding:"22px 20px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.15rem", color:"var(--accent)" }}>
            Steady<span style={{ color:"var(--orange)" }}>Rise</span>
          </span>
          <button className="show-mobile" onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text3)", display:"flex" }}>
            <X size={18}/>
          </button>
        </div>

        <Divider/>

        {/* Nav */}
        <nav style={{ flex:1, padding:"12px 10px", overflowY:"auto", display:"flex", flexDirection:"column", gap:2 }}>
          {NAV_ITEMS.map(item => {
            const active = activePage === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => { setPage(item.id); onClose(); }}
                style={{
                  width:"100%", padding:"9px 12px",
                  background: active ? "var(--lime-mute)" : "transparent",
                  border: active ? "1px solid var(--border)" : "1px solid transparent",
                  borderRadius:10, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:10,
                  color: active ? "var(--accent)" : "var(--text2)",
                  fontFamily:"'Outfit',sans-serif", fontSize:"0.86rem",
                  fontWeight: active ? 600 : 400,
                  transition:"all 0.15s", textAlign:"left",
                  position:"relative",
                }}>
                {active && <div className="nav-indicator"/>}
                <Icon size={16} strokeWidth={active ? 2.5 : 1.8}/>
                {item.label}
              </button>
            );
          })}
        </nav>

        <Divider/>

        {/* User */}
        <div style={{ padding:"12px 10px" }}>
          <div style={{
            background:"var(--surface2)", borderRadius:12, padding:"10px 12px",
            display:"flex", alignItems:"center", gap:10,
          }}>
            <div style={{
              width:32, height:32, borderRadius:10,
              background:"linear-gradient(135deg, var(--forest), var(--accent))",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"var(--bg)", fontWeight:700, fontSize:"0.85rem", flexShrink:0,
            }}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:"0.82rem", fontWeight:600, color:"var(--text)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {user?.name || "Pengguna"}
              </div>
              <div style={{ fontSize:"0.71rem", color:"var(--text3)" }}>Mahasiswa Aktif</div>
            </div>
            <button onClick={onLogout} data-tip="Keluar" style={{
              background:"none", border:"none", cursor:"pointer",
              color:"var(--text3)", display:"flex", padding:2,
              transition:"color 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text3)"}
            >
              <LogOut size={14}/>
            </button>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10, padding:"0 2px" }}>
            <span style={{ fontSize:"0.75rem", color:"var(--text3)" }}>Tema</span>
            <ThemeToggle/>
          </div>
        </div>
      </aside>
    </>
  );
}

// ══════════════════════════════════════════════════════════
// TOPBAR (mobile)
// ══════════════════════════════════════════════════════════
function Topbar({ page, onMenuClick }) {
  const label = NAV_ITEMS.find(n => n.id === page)?.label || "";
  return (
    <div className="show-mobile" style={{
      position:"fixed", top:0, left:0, right:0, height:56, zIndex:90,
      background:"var(--bg2)", borderBottom:"1px solid var(--border)",
      display:"flex", alignItems:"center", padding:"0 16px", gap:12,
    }}>
      <button onClick={onMenuClick} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text2)", display:"flex" }}>
        <Menu size={22}/>
      </button>
      <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:"var(--text)" }}>{label}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PAGE: DASHBOARD
// ══════════════════════════════════════════════════════════
function DashboardPage({ tasks }) {
  const done = tasks.filter(t => t.done).length;
  const high = tasks.filter(t => t.priority === "high" && !t.done).length;
  const today = new Date();
  const weekDays = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];

  const activityData = [3,5,2,7,4,6,8,3,5,4,7,5,6,4];
  const weekActivity = [
    { d:"Sen", h:2.5 }, { d:"Sel", h:4 }, { d:"Rab", h:6 },
    { d:"Kam", h:3 }, { d:"Jum", h:5 }, { d:"Sab", h:1.5 }, { d:"Min", h:2 },
  ];
  const maxH = Math.max(...weekActivity.map(w => w.h));

  // Calendar
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const productive = [2,4,5,7,9,10,11,14,16,17,18,21,23];

  return (
    <div className="fade-up">
      {/* Greeting */}
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.6rem", color:"var(--text)", letterSpacing:"-0.5px", marginBottom:4 }}>
          Selamat datang kembali!
        </h1>
        <div style={{ fontSize:"0.88rem", color:"var(--text3)" }}>
          {weekDays[today.getDay()]}, {today.getDate()} {months[today.getMonth()]} {today.getFullYear()}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:14, marginBottom:24 }}>
        {[
          { label:"Tugas Selesai", value: done, sub:`dari ${tasks.length} total`, icon:<CheckCircle2 size={20}/>, accent:"var(--accent)" },
          { label:"Prioritas Tinggi", value: high, sub:"perlu segera dikerjakan", icon:<AlertCircle size={20}/>, accent:"var(--orange)" },
          { label:"Streak Hari Ini", value:"5", sub:"hari berturut-turut", icon:<Flame size={20}/>, accent:"var(--peach)" },
          { label:"Jam Belajar", value:"3.5h", sub:"hari ini", icon:<Clock size={20}/>, accent:"var(--lime)" },
        ].map((s,i) => (
          <StatCard key={i} {...s} delay={i * 80}/>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>

        {/* Weekly Activity Chart */}
        <Card>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            Aktivitas Minggu Ini
            <Badge>Jam Belajar</Badge>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:100 }}>
            {weekActivity.map((w,i) => {
              const isToday = i === ((today.getDay() + 6) % 7);
              return (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <div style={{
                    width:"100%", height:`${(w.h/maxH)*90}%`, minHeight:4,
                    background: isToday ? "var(--orange)" : "var(--lime-mute)",
                    border: isToday ? "none" : "1px solid var(--border)",
                    borderRadius:"6px 6px 0 0",
                    transition:"height 0.6s cubic-bezier(0.22,1,0.36,1)",
                  }}/>
                  <span style={{ fontSize:"0.68rem", color: isToday ? "var(--accent)" : "var(--text3)", fontWeight: isToday ? 700 : 400 }}>{w.d}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Calendar */}
        <Card>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            {months[today.getMonth()]} {today.getFullYear()}
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:"0.72rem", color:"var(--text3)" }}>
              <div style={{ width:8, height:8, borderRadius:2, background:"var(--lime)" }}/> Produktif
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
            {["M","S","R","K","J","S","M"].map(d => (
              <div key={d} style={{ textAlign:"center", fontSize:"0.68rem", color:"var(--text3)", fontWeight:600, paddingBottom:4 }}>{d}</div>
            ))}
            {Array(firstDay).fill(null).map((_,i) => <div key={`e${i}`}/>)}
            {Array(daysInMonth).fill(null).map((_,i) => {
              const d = i + 1;
              const isToday = d === today.getDate();
              const isProd = productive.includes(d);
              return (
                <div key={d} style={{
                  aspectRatio:"1", borderRadius:6, display:"flex",
                  alignItems:"center", justifyContent:"center",
                  fontSize:"0.73rem",
                  background: isToday ? "var(--orange)" : isProd ? "var(--lime-mute)" : "transparent",
                  color: isToday ? "#fff" : isProd ? "var(--accent)" : "var(--text3)",
                  fontWeight: isToday ? 700 : 400,
                  border: isToday ? "none" : "1px solid transparent",
                }}>{d}</div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:16 }}>
        {/* Recent Tasks */}
        <Card>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", marginBottom:14, display:"flex", justifyContent:"space-between" }}>
            Tugas Terkini
            <span style={{ fontSize:"0.78rem", color:"var(--text3)", fontFamily:"'Outfit',sans-serif", fontWeight:400 }}>{tasks.filter(t=>!t.done).length} belum selesai</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {tasks.slice(0,4).map(t => (
              <div key={t.id} style={{
                display:"flex", alignItems:"center", gap:10, padding:"8px 10px",
                background: t.done ? "var(--surface2)" : "transparent",
                borderRadius:8, opacity: t.done ? 0.5 : 1,
              }}>
                {t.done ? <CheckCircle2 size={16} color="var(--accent)"/> : <Circle size={16} color="var(--text3)"/>}
                <span style={{ flex:1, fontSize:"0.85rem", color:"var(--text)", textDecoration: t.done ? "line-through" : "none" }}>{t.name}</span>
                <div style={{ width:6, height:6, borderRadius:99, flexShrink:0,
                  background: t.priority === "high" ? "var(--orange)" : t.priority === "medium" ? "var(--peach)" : "var(--lime)" }}/>
              </div>
            ))}
            {!tasks.length && <div style={{ textAlign:"center", color:"var(--text3)", fontSize:"0.85rem", padding:"16px 0" }}>Belum ada tugas</div>}
          </div>
        </Card>

        {/* Target Progress */}
        <Card>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", marginBottom:14 }}>Progress Target</div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              { label:"Jam Belajar", current:24, goal:30, color:"var(--accent)" },
              { label:"Tugas Selesai", current:done, goal:20, color:"var(--orange)" },
              { label:"Hari Produktif", current:12, goal:20, color:"var(--peach)" },
            ].map((t,i) => (
              <div key={i}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:"0.82rem" }}>
                  <span style={{ color:"var(--text2)" }}>{t.label}</span>
                  <span style={{ fontWeight:600, color:"var(--text)" }}>{t.current}/{t.goal}</span>
                </div>
                <ProgressBar value={t.current} max={t.goal} color={t.color}/>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon, accent, delay=0 }) {
  return (
    <Card className="lift fade-up" style={{ animationDelay:`${delay}ms` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
        <div style={{ color:"var(--text2)", fontSize:"0.78rem", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.4px" }}>{label}</div>
        <div style={{ color:accent, opacity:0.7 }}>{icon}</div>
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.8rem", color:"var(--text)", lineHeight:1, marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:"0.75rem", color:"var(--text3)" }}>{sub}</div>
    </Card>
  );
}

// ══════════════════════════════════════════════════════════
// PAGE: TODO
// ══════════════════════════════════════════════════════════
function TodoPage({ tasks, setTasks }) {
  const toast = useToast();
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("tugas");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const add = () => {
    if (!name.trim()) { toast("Nama tugas tidak boleh kosong!", "error"); return; }
    setTasks(p => [{ id:Date.now(), name:name.trim(), deadline, priority, category, done:false, createdAt: new Date().toISOString() }, ...p]);
    setName(""); setDeadline(""); setShowForm(false);
    toast("Tugas berhasil ditambahkan!");
  };

  const toggle = id => setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const del = id => { setTasks(p => p.filter(t => t.id !== id)); toast("Tugas dihapus"); };

  const filtered = tasks.filter(t => {
    const matchFilter = filter === "all" ? true : filter === "done" ? t.done : filter === "pending" ? !t.done : t.priority === filter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const prioColors = { high:"var(--orange)", medium:"var(--peach)", low:"var(--lime)" };
  const prioLabel = { high:"Tinggi", medium:"Sedang", low:"Rendah" };
  const catLabel = { tugas:"Tugas", kuliah:"Kuliah", proyek:"Proyek", pribadi:"Pribadi" };

  return (
    <div className="fade-up">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"var(--text)", letterSpacing:"-0.5px" }}>Task Manager</h1>
          <div style={{ fontSize:"0.85rem", color:"var(--text3)" }}>{tasks.filter(t=>!t.done).length} tugas belum selesai</div>
        </div>
        <Btn onClick={() => setShowForm(p=>!p)}>
          <Plus size={16}/> Tambah Tugas
        </Btn>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="scale-in" style={{ marginBottom:20, border:"1.5px solid var(--accent)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            <div style={{ gridColumn:"1 / -1" }}>
              <Input label="Nama Tugas" value={name} onChange={e=>setName(e.target.value)}
                placeholder="cth: Kerjakan laporan Pemweb..." icon={<Edit3 size={15}/>}/>
            </div>
            <div>
              <label style={{ fontSize:"0.78rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>Deadline</label>
              <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)}
                style={{ width:"100%", padding:"11px 14px", border:"1.5px solid var(--border)", borderRadius:10, background:"var(--surface2)", color:"var(--text)", fontSize:"0.9rem", outline:"none" }}/>
            </div>
            <div>
              <label style={{ fontSize:"0.78rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>Prioritas</label>
              <select value={priority} onChange={e=>setPriority(e.target.value)}
                style={{ width:"100%", padding:"11px 14px", border:"1.5px solid var(--border)", borderRadius:10, background:"var(--surface2)", color:"var(--text)", fontSize:"0.9rem", outline:"none" }}>
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize:"0.78rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>Kategori</label>
              <select value={category} onChange={e=>setCategory(e.target.value)}
                style={{ width:"100%", padding:"11px 14px", border:"1.5px solid var(--border)", borderRadius:10, background:"var(--surface2)", color:"var(--text)", fontSize:"0.9rem", outline:"none" }}>
                <option value="tugas">Tugas</option>
                <option value="kuliah">Kuliah</option>
                <option value="proyek">Proyek</option>
                <option value="pribadi">Pribadi</option>
              </select>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={() => setShowForm(false)}>Batal</Btn>
            <Btn onClick={add}><Plus size={15}/> Tambah</Btn>
          </div>
        </Card>
      )}

      {/* Controls */}
      <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:200, position:"relative" }}>
          <Search size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--text3)" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari tugas..."
            style={{ width:"100%", padding:"9px 14px 9px 36px", border:"1.5px solid var(--border)", borderRadius:10, background:"var(--surface)", color:"var(--text)", fontSize:"0.875rem", outline:"none" }}/>
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {[
            { k:"all", l:"Semua" }, { k:"pending", l:"Belum" }, { k:"done", l:"Selesai" },
            { k:"high", l:"Urgent" },
          ].map(f => (
            <button key={f.k} onClick={() => setFilter(f.k)} style={{
              padding:"8px 14px", borderRadius:8, fontSize:"0.8rem", fontWeight: filter===f.k ? 600 : 400,
              background: filter===f.k ? "var(--accent)" : "var(--surface)",
              color: filter===f.k ? "var(--bg)" : "var(--text2)",
              border: `1.5px solid ${filter===f.k ? "var(--accent)" : "var(--border)"}`,
              cursor:"pointer", transition:"all 0.15s",
            }}>{f.l}</button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {!filtered.length ? (
          <div style={{ textAlign:"center", padding:"48px 20px", color:"var(--text3)" }}>
            <CheckSquare size={32} style={{ margin:"0 auto 12px", opacity:0.4 }}/>
            <div>Tidak ada tugas ditemukan</div>
          </div>
        ) : filtered.map((t,i) => (
          <div key={t.id} className="fade-up lift" style={{
            animationDelay:`${i*30}ms`,
            background:"var(--surface)", border:"1px solid var(--border)",
            borderLeft:`3px solid ${prioColors[t.priority]}`,
            borderRadius:12, padding:"14px 16px",
            display:"flex", alignItems:"center", gap:12,
            opacity: t.done ? 0.55 : 1,
          }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} className="custom-check"/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:"0.9rem", fontWeight:500, color:"var(--text)", textDecoration: t.done ? "line-through" : "none", marginBottom:4 }}>{t.name}</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                <Badge color={t.priority==="high"?"orange":"lime"}>{prioLabel[t.priority]}</Badge>
                <Badge color="muted">{catLabel[t.category]}</Badge>
                {t.deadline && <Badge color="muted">{t.deadline}</Badge>}
              </div>
            </div>
            <button onClick={() => del(t.id)} style={{
              background:"none", border:"none", cursor:"pointer",
              color:"var(--text3)", display:"flex", padding:4, borderRadius:6,
              transition:"all 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text3)"}
            >
              <Trash2 size={15}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PAGE: TARGET
// ══════════════════════════════════════════════════════════
function TargetPage() {
  const toast = useToast();
  const [targets, setTargets] = useLocalStorage("sr_targets", [
    { id:1, name:"Belajar 30 jam bulan ini", type:"hours", goal:30, current:22 },
    { id:2, name:"Selesaikan 20 tugas", type:"tasks", goal:20, current:12 },
    { id:3, name:"15 hari produktif", type:"days", goal:15, current:9 },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState("hours");
  const [goal, setGoal] = useState("");
  const [current, setCurrent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const add = () => {
    if (!name.trim() || !goal) { toast("Lengkapi semua field!", "error"); return; }
    setTargets(p => [{ id:Date.now(), name:name.trim(), type, goal:+goal, current:+(current||0) }, ...p]);
    setName(""); setGoal(""); setCurrent(""); setShowForm(false);
    toast("Target berhasil ditambahkan!");
  };

  const del = id => { setTargets(p => p.filter(t => t.id !== id)); toast("Target dihapus"); };

  const updateProgress = (id, delta) => {
    setTargets(p => p.map(t => t.id===id ? { ...t, current: Math.max(0, Math.min(t.goal, t.current + delta)) } : t));
  };

  const typeLabel = { hours:"Jam Belajar", tasks:"Tugas Selesai", days:"Hari Produktif" };
  const typeIcon = { hours:<Clock size={16}/>, tasks:<CheckSquare size={16}/>, days:<Calendar size={16}/> };

  return (
    <div className="fade-up">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"var(--text)", letterSpacing:"-0.5px" }}>Target Produktivitas</h1>
          <div style={{ fontSize:"0.85rem", color:"var(--text3)" }}>{targets.filter(t=>t.current>=t.goal).length} dari {targets.length} target tercapai</div>
        </div>
        <Btn onClick={() => setShowForm(p=>!p)}><Plus size={16}/> Target Baru</Btn>
      </div>

      {showForm && (
        <Card className="scale-in" style={{ marginBottom:20, border:"1.5px solid var(--accent)" }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:16 }}>Target Baru</div>
          <div style={{ display:"grid", gap:12 }}>
            <Input label="Nama Target" value={name} onChange={e=>setName(e.target.value)} placeholder="cth: Belajar 3 jam sehari..."/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>Tipe</label>
                <select value={type} onChange={e=>setType(e.target.value)}
                  style={{ width:"100%", padding:"11px 14px", border:"1.5px solid var(--border)", borderRadius:10, background:"var(--surface2)", color:"var(--text)", fontSize:"0.9rem", outline:"none" }}>
                  <option value="hours">Jam Belajar</option>
                  <option value="tasks">Tugas</option>
                  <option value="days">Hari</option>
                </select>
              </div>
              <Input label="Target" value={goal} onChange={e=>setGoal(e.target.value)} placeholder="cth: 30" type="number"/>
              <Input label="Progress Awal" value={current} onChange={e=>setCurrent(e.target.value)} placeholder="cth: 0" type="number"/>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:14 }}>
            <Btn variant="ghost" onClick={() => setShowForm(false)}>Batal</Btn>
            <Btn onClick={add}><Plus size={15}/> Tambah</Btn>
          </div>
        </Card>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:16 }}>
        {targets.map((t,i) => {
          const pct = Math.min(100, Math.round((t.current/t.goal)*100));
          const done = pct >= 100;
          const onTrack = pct >= 50;
          return (
            <Card key={t.id} className="lift fade-up" style={{ animationDelay:`${i*80}ms` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"var(--lime-mute)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)" }}>
                    {typeIcon[t.type]}
                  </div>
                  <div>
                    <div style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--text)" }}>{t.name}</div>
                    <div style={{ fontSize:"0.75rem", color:"var(--text3)" }}>{typeLabel[t.type]}</div>
                  </div>
                </div>
                <button onClick={() => del(t.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text3)", display:"flex", padding:2 }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text3)"}
                ><Trash2 size={14}/></button>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, alignItems:"center" }}>
                <span style={{ fontSize:"0.82rem", color:"var(--text2)" }}>{t.current} / {t.goal}</span>
                <span style={{
                  fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.2rem",
                  color: done ? "var(--accent)" : onTrack ? "var(--text)" : "var(--orange)"
                }}>{pct}%</span>
              </div>
              <ProgressBar value={t.current} max={t.goal} color={ done ? "var(--accent)" : onTrack ? "var(--peach)" : "var(--orange)"} height={10}/>

              <div style={{ display:"flex", gap:8, marginTop:14, alignItems:"center" }}>
                <Badge color={done ? "lime" : onTrack ? "lime" : "orange"}>
                  {done ? "Tercapai!" : onTrack ? "On Track" : "Perlu Dikejar"}
                </Badge>
                <div style={{ flex:1 }}/>
                <button onClick={() => updateProgress(t.id, -1)} style={{ width:28, height:28, borderRadius:7, border:"1px solid var(--border)", background:"var(--surface2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text2)", fontSize:"1rem" }}>−</button>
                <button onClick={() => updateProgress(t.id, 1)} style={{ width:28, height:28, borderRadius:7, border:"1px solid var(--border)", background:"var(--lime-mute)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)", fontSize:"1rem" }}>+</button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PAGE: SMART REMINDER
// ══════════════════════════════════════════════════════════
function ReminderPage() {
  const toast = useToast();
  const [reminders, setReminders] = useLocalStorage("sr_reminders", [
    { id:1, task:"Kerjakan Laporan Alpro", time:"09:00", question:"Sudah berapa persen kamu mengerjakannya?", active:true },
    { id:2, task:"Review Materi Kalkulus", time:"14:30", question:"Topik apa yang akan kamu review hari ini?", active:true },
  ]);
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [question, setQuestion] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [answer, setAnswer] = useState("");

  const add = () => {
    if (!task.trim() || !question.trim()) { toast("Lengkapi semua field!", "error"); return; }
    setReminders(p => [...p, { id:Date.now(), task:task.trim(), time, question:question.trim(), active:true }]);
    setTask(""); setTime(""); setQuestion(""); setShowForm(false);
    toast("Reminder berhasil dibuat!");
  };

  const dismiss = (rem) => { setActiveModal(rem); setAnswer(""); };

  const confirm = () => {
    if (!answer.trim()) { toast("Jawab dulu pertanyaannya!", "error"); return; }
    setReminders(p => p.filter(r => r.id !== activeModal.id));
    setActiveModal(null);
    toast("Reminder selesai! Tetap semangat!");
  };

  const snooze = (id) => { toast("Reminder di-snooze 15 menit"); };

  return (
    <div className="fade-up">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"var(--text)", letterSpacing:"-0.5px" }}>Smart Reminder</h1>
          <div style={{ fontSize:"0.85rem", color:"var(--text3)" }}>{reminders.length} reminder aktif</div>
        </div>
        <Btn onClick={() => setShowForm(p=>!p)}><Plus size={16}/> Buat Reminder</Btn>
      </div>

      {/* How it works banner */}
      <div style={{
        background:"linear-gradient(135deg, var(--forest) 0%, var(--accent2, #5a6e18) 100%)",
        borderRadius:16, padding:"20px 24px", marginBottom:24,
        display:"flex", alignItems:"center", gap:16, position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", right:20, opacity:0.07 }}><Zap size={100}/></div>
        <div style={{ width:44, height:44, borderRadius:12, background:"rgba(210,225,134,0.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#D2E186", flexShrink:0 }}>
          <Bell size={22}/>
        </div>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color:"#D2E186", marginBottom:4 }}>Tidak bisa asal dismiss!</div>
          <div style={{ fontSize:"0.83rem", color:"rgba(210,225,134,0.7)", maxWidth:500 }}>
            Setiap reminder memerlukan jawaban atas pertanyaan verifikasi sebelum bisa ditutup — memastikan kamu benar-benar aware dengan tugasmu.
          </div>
        </div>
      </div>

      {showForm && (
        <Card className="scale-in" style={{ marginBottom:20, border:"1.5px solid var(--accent)" }}>
          <div style={{ display:"grid", gap:12 }}>
            <Input label="Nama Tugas/Kegiatan" value={task} onChange={e=>setTask(e.target.value)} placeholder="cth: Kerjakan laporan Pemweb" icon={<Bell size={15}/>}/>
            <Input label="Waktu Pengingat" value={time} onChange={e=>setTime(e.target.value)} type="time" icon={<Clock size={15}/>}/>
            <Input label="Pertanyaan Verifikasi (harus dijawab sebelum dismiss)" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="cth: Sudah berapa persen progress tugasmu?" icon={<Brain size={15}/>}/>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:14 }}>
            <Btn variant="ghost" onClick={() => setShowForm(false)}>Batal</Btn>
            <Btn onClick={add}><Plus size={15}/> Buat</Btn>
          </div>
        </Card>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14 }}>
        {!reminders.length ? (
          <div style={{ textAlign:"center", padding:"48px 20px", color:"var(--text3)", gridColumn:"1/-1" }}>
            <Bell size={32} style={{ margin:"0 auto 12px", opacity:0.4 }}/>
            <div>Belum ada reminder aktif</div>
          </div>
        ) : reminders.map((r,i) => (
          <Card key={r.id} className="lift fade-up" style={{ animationDelay:`${i*80}ms` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ fontWeight:600, fontSize:"0.92rem", color:"var(--text)" }}>{r.task}</div>
              {r.time && <Badge color="lime">{r.time}</Badge>}
            </div>
            <div style={{
              background:"var(--lime-mute)", borderRadius:8, padding:"10px 12px",
              fontSize:"0.82rem", color:"var(--text2)", fontStyle:"italic",
              borderLeft:"2px solid var(--accent)", marginBottom:14,
            }}>
              "{r.question}"
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn onClick={() => dismiss(r)} size="sm" style={{ flex:1 }}>
                <Bell size={13}/> Jawab & Selesai
              </Btn>
              <Btn onClick={() => snooze(r.id)} variant="ghost" size="sm">
                Snooze
              </Btn>
            </div>
          </Card>
        ))}
      </div>

      {/* Dismiss Modal */}
      <Modal open={!!activeModal} onClose={() => setActiveModal(null)} maxW={420}>
        {activeModal && (
          <div>
            <div style={{ width:48, height:48, borderRadius:14, background:"var(--lime-mute)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)", marginBottom:16 }}>
              <Bell size={22}/>
            </div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.25rem", color:"var(--text)", marginBottom:6 }}>
              {activeModal.task}
            </div>
            <div style={{ fontSize:"0.85rem", color:"var(--text2)", marginBottom:18 }}>
              Untuk menyelesaikan reminder ini, jawab pertanyaan berikut:
            </div>
            <div style={{
              background:"var(--lime-mute)", borderRadius:10, padding:"12px 16px",
              fontSize:"0.9rem", fontWeight:500, color:"var(--text)",
              borderLeft:"3px solid var(--orange)", marginBottom:16,
            }}>
              {activeModal.question}
            </div>
            <Input label="Jawabanmu" value={answer} onChange={e=>setAnswer(e.target.value)}
              placeholder="Ketik jawabanmu di sini..."/>
            <div style={{ display:"flex", gap:10, marginTop:16 }}>
              <Btn variant="ghost" onClick={() => setActiveModal(null)} style={{ flex:1 }}>Batal</Btn>
              <Btn onClick={confirm} style={{ flex:2 }}><CheckCircle2 size={15}/> Konfirmasi</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PAGE: MONTHLY RECAP
// ══════════════════════════════════════════════════════════
function RecapPage() {
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];
  const data = { tasks:23, hours:41, days:12, prev_tasks:19, prev_hours:35, prev_days:10 };
  const weekData = [{ l:"Mgg 1",v:5 },{ l:"Mgg 2",v:8 },{ l:"Mgg 3",v:6 },{ l:"Mgg 4",v:4 }];
  const maxV = Math.max(...weekData.map(d=>d.v));
  const dayData = Array(28).fill(0).map((_,i) => ({ d:i+1, prod:[3,5,6,10,11,12,17,18,19,22,23,24,26].includes(i+1) }));

  return (
    <div className="fade-up">
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"var(--text)", letterSpacing:"-0.5px" }}>Monthly Recap</h1>
        <div style={{ fontSize:"0.85rem", color:"var(--text3)" }}>Ringkasan produktivitas Februari 2026</div>
      </div>

      {/* Hero */}
      <div style={{
        background:"linear-gradient(135deg, var(--forest) 0%, #2e3a16 60%, #1a2608 100%)",
        borderRadius:20, padding:"32px 36px", marginBottom:24,
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", right:-20, bottom:-20, opacity:0.05 }}><BarChart2 size={200}/></div>
        <div style={{ position:"absolute", top:20, right:24, opacity:0.6 }}>
          <Badge color="lime">+{Math.round((data.tasks-data.prev_tasks)/data.prev_tasks*100)}% vs bulan lalu</Badge>
        </div>
        <div style={{ fontSize:"0.8rem", color:"rgba(252,191,147,0.8)", fontWeight:600, textTransform:"uppercase", letterSpacing:"1px", marginBottom:8 }}>Recap • Februari 2026</div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.6rem", color:"#D2E186", marginBottom:20, lineHeight:1.2 }}>
          Kerja bagus! Kamu lebih<br/>produktif bulan ini.
        </div>
        <div style={{ display:"flex", gap:32, flexWrap:"wrap" }}>
          {[
            { num:data.tasks, label:"Tugas Selesai" },
            { num:`${data.hours}h`, label:"Jam Belajar" },
            { num:data.days, label:"Hari Produktif" },
          ].map((s,i) => (
            <div key={i}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"2rem", color:"#FEFEFE" }}>{s.num}</div>
              <div style={{ fontSize:"0.78rem", color:"rgba(242,232,223,0.55)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop:20, background:"rgba(210,225,134,0.1)", borderRadius:10,
          padding:"10px 14px", fontSize:"0.83rem", color:"rgba(210,225,134,0.85)",
          borderLeft:"2px solid #D2E186", display:"inline-flex", gap:8, alignItems:"center",
        }}>
          <Flame size={14}/> Hari paling produktif: <strong>Rabu</strong> &nbsp;·&nbsp; <Star size={14}/> Paling produktif di <strong>malam hari</strong>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        {/* Bar chart */}
        <Card>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:16 }}>Tugas Selesai per Minggu</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:130 }}>
            {weekData.map((w,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:"0.72rem", fontWeight:600, color:"var(--text3)" }}>{w.v}</span>
                <div style={{
                  width:"100%", borderRadius:"6px 6px 0 0",
                  background: i===1 ? "var(--orange)" : "var(--lime-mute)",
                  border: `1px solid ${i===1 ? "transparent" : "var(--border)"}`,
                  height:`${(w.v/maxV)*90}%`, minHeight:8,
                  transition:"height 0.8s cubic-bezier(0.22,1,0.36,1)",
                }}/>
                <span style={{ fontSize:"0.72rem", color:"var(--text3)" }}>{w.l}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* vs Last month */}
        <Card>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:16 }}>Perbandingan Bulan Lalu</div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              { label:"Tugas Selesai", cur:data.tasks, prev:data.prev_tasks },
              { label:"Jam Belajar", cur:data.hours, prev:data.prev_hours },
              { label:"Hari Produktif", cur:data.days, prev:data.prev_days },
            ].map((c,i) => (
              <div key={i}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, fontSize:"0.82rem" }}>
                  <span style={{ color:"var(--text2)" }}>{c.label}</span>
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    <span style={{ color:"var(--text3)", fontSize:"0.75rem" }}>{c.prev}</span>
                    <TrendingUp size={12} color="var(--accent)"/>
                    <span style={{ fontWeight:700, color:"var(--accent)" }}>{c.cur}</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:4 }}>
                  <div style={{ flex:c.prev, height:6, background:"var(--border)", borderRadius:"99px 0 0 99px" }}/>
                  <div style={{ flex:c.cur-c.prev, height:6, background:"var(--accent)", borderRadius:"0 99px 99px 0" }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Day badges */}
      <Card>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          Hari Produktif Februari
          <div style={{ display:"flex", gap:12, fontSize:"0.75rem", color:"var(--text3)" }}>
            <span style={{ display:"flex", gap:4, alignItems:"center" }}><div style={{ width:10, height:10, borderRadius:3, background:"var(--lime)" }}/> Produktif</span>
            <span style={{ display:"flex", gap:4, alignItems:"center" }}><div style={{ width:10, height:10, borderRadius:3, background:"var(--border)" }}/> Normal</span>
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {dayData.map(d => (
            <div key={d.d} style={{
              width:36, height:36, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center",
              background: d.prod ? "var(--lime-mute)" : "var(--surface2)",
              border:`1px solid ${d.prod ? "var(--lime)" : "var(--border)"}`,
              color: d.prod ? "var(--accent)" : "var(--text3)",
              fontSize:"0.78rem", fontWeight: d.prod ? 700 : 400,
            }}>{d.d}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PAGE: NOTES
// ══════════════════════════════════════════════════════════
function NotesPage() {
  const toast = useToast();
  const [notes, setNotes] = useLocalStorage("sr_notes", [
    { id:1, title:"Kalkulus — Turunan Fungsi", content:"Turunan mengukur laju perubahan fungsi. Rumus dasar: f'(x) = lim (f(x+h)-f(x))/h...", tag:"Kuliah", color:"lime", createdAt:"2026-03-08" },
    { id:2, title:"Tips Manajemen Waktu", content:"1. Gunakan teknik Pomodoro\n2. Prioritaskan dengan matrix Eisenhower\n3. Block time untuk deep work...", tag:"Tips", color:"peach", createdAt:"2026-03-09" },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Kuliah");
  const [noteColor, setNoteColor] = useState("lime");
  const [showForm, setShowForm] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [search, setSearch] = useState("");

  const add = () => {
    if (!title.trim()) { toast("Judul catatan wajib diisi!", "error"); return; }
    const newNote = { id:Date.now(), title:title.trim(), content, tag, color:noteColor, createdAt: new Date().toISOString().slice(0,10) };
    setNotes(p => [newNote, ...p]);
    setTitle(""); setContent(""); setShowForm(false);
    toast("Catatan berhasil disimpan!");
  };

  const del = id => { setNotes(p => p.filter(n => n.id !== id)); toast("Catatan dihapus"); };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  const colorMap = { lime:"var(--lime-mute)", peach:"rgba(252,191,147,0.2)", orange:"var(--orange-mute)" };
  const borderMap = { lime:"var(--lime)", peach:"var(--peach)", orange:"var(--orange)" };

  return (
    <div className="fade-up">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"var(--text)", letterSpacing:"-0.5px" }}>Catatan Belajar</h1>
          <div style={{ fontSize:"0.85rem", color:"var(--text3)" }}>{notes.length} catatan tersimpan</div>
        </div>
        <Btn onClick={() => setShowForm(p=>!p)}><Plus size={16}/> Catatan Baru</Btn>
      </div>

      <div style={{ position:"relative", marginBottom:16 }}>
        <Search size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--text3)" }}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari catatan..."
          style={{ width:"100%", padding:"10px 14px 10px 36px", border:"1.5px solid var(--border)", borderRadius:10, background:"var(--surface)", color:"var(--text)", fontSize:"0.875rem", outline:"none" }}/>
      </div>

      {showForm && (
        <Card className="scale-in" style={{ marginBottom:20, border:"1.5px solid var(--accent)" }}>
          <div style={{ display:"grid", gap:12 }}>
            <Input label="Judul Catatan" value={title} onChange={e=>setTitle(e.target.value)} placeholder="cth: Ringkasan Basis Data Bab 3" icon={<Bookmark size={15}/>}/>
            <div>
              <label style={{ fontSize:"0.78rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>Isi Catatan</label>
              <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Tulis catatanmu di sini..." rows={4}
                style={{ width:"100%", padding:"11px 14px", border:"1.5px solid var(--border)", borderRadius:10, background:"var(--surface2)", color:"var(--text)", fontSize:"0.9rem", outline:"none", resize:"vertical", fontFamily:"'Outfit',sans-serif", lineHeight:1.6 }}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>Tag</label>
                <select value={tag} onChange={e=>setTag(e.target.value)}
                  style={{ width:"100%", padding:"11px 14px", border:"1.5px solid var(--border)", borderRadius:10, background:"var(--surface2)", color:"var(--text)", fontSize:"0.9rem", outline:"none" }}>
                  {["Kuliah","Tips","Proyek","Riset","Pribadi"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>Warna</label>
                <div style={{ display:"flex", gap:8, paddingTop:10 }}>
                  {["lime","peach","orange"].map(c => (
                    <button key={c} onClick={() => setNoteColor(c)} style={{
                      width:28, height:28, borderRadius:8,
                      background: colorMap[c], border:`2px solid ${noteColor===c ? borderMap[c] : "transparent"}`,
                      cursor:"pointer", transition:"all 0.15s",
                    }}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:14 }}>
            <Btn variant="ghost" onClick={() => setShowForm(false)}>Batal</Btn>
            <Btn onClick={add}><Plus size={15}/> Simpan</Btn>
          </div>
        </Card>
      )}

      <div style={{ columns:"2 280px", gap:14 }}>
        {filtered.map((n,i) => (
          <div key={n.id} className="lift fade-up" style={{
            breakInside:"avoid", marginBottom:14,
            background:colorMap[n.color], border:`1.5px solid ${borderMap[n.color]}`,
            borderRadius:14, padding:"18px 18px",
            animationDelay:`${i*60}ms`, cursor:"pointer",
          }} onClick={() => setActiveNote(n)}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.92rem", color:"var(--text)" }}>{n.title}</div>
              <button onClick={e => { e.stopPropagation(); del(n.id); }} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text3)", display:"flex", padding:2 }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text3)"}
              ><Trash2 size={13}/></button>
            </div>
            <div style={{ fontSize:"0.82rem", color:"var(--text2)", lineHeight:1.6, marginBottom:12, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical" }}>
              {n.content || "Tidak ada isi catatan."}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <Badge color="muted">{n.tag}</Badge>
              <span style={{ fontSize:"0.72rem", color:"var(--text3)" }}>{n.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Note Detail Modal */}
      <Modal open={!!activeNote} onClose={() => setActiveNote(null)} maxW={520}>
        {activeNote && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.25rem", color:"var(--text)" }}>{activeNote.title}</div>
              <button onClick={() => setActiveNote(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text3)", display:"flex" }}><X size={18}/></button>
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              <Badge color="lime">{activeNote.tag}</Badge>
              <Badge color="muted">{activeNote.createdAt}</Badge>
            </div>
            <Divider style={{ marginBottom:16 }}/>
            <div style={{ fontSize:"0.9rem", color:"var(--text2)", lineHeight:1.8, whiteSpace:"pre-wrap" }}>
              {activeNote.content || "Belum ada isi catatan."}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PAGE: POMODORO TIMER
// ══════════════════════════════════════════════════════════
function PomodoroPage() {
  const toast = useToast();
  const MODES = { focus:{ label:"Fokus", duration:25*60 }, short:{ label:"Istirahat Pendek", duration:5*60 }, long:{ label:"Istirahat Panjang", duration:15*60 } };
  const [mode, setMode] = useState("focus");
  const [seconds, setSeconds] = useState(MODES.focus.duration);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [task, setTask] = useState("");

  useEffect(() => {
    setSeconds(MODES[mode].duration);
    setRunning(false);
  }, [mode]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          if (mode === "focus") { setSessions(p => p+1); toast("Sesi fokus selesai! Saatnya istirahat."); }
          else toast("Istirahat selesai! Siap kembali fokus?");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode]);

  const total = MODES[mode].duration;
  const pct = ((total - seconds) / total) * 100;
  const mm = String(Math.floor(seconds/60)).padStart(2,"0");
  const ss = String(seconds%60).padStart(2,"0");
  const radius = 80;
  const circ = 2 * Math.PI * radius;

  return (
    <div className="fade-up" style={{ maxWidth:560, margin:"0 auto" }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"var(--text)", letterSpacing:"-0.5px" }}>Pomodoro Timer</h1>
        <div style={{ fontSize:"0.85rem", color:"var(--text3)" }}>Teknik Pomodoro untuk fokus maksimal</div>
      </div>

      {/* Mode Tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:32, background:"var(--surface)", padding:4, borderRadius:12, border:"1px solid var(--border)" }}>
        {Object.entries(MODES).map(([k,v]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex:1, padding:"9px", borderRadius:9, border:"none",
            background: mode===k ? "var(--accent)" : "transparent",
            color: mode===k ? "var(--bg)" : "var(--text2)",
            fontFamily:"'Outfit',sans-serif", fontSize:"0.83rem", fontWeight: mode===k ? 600 : 400,
            cursor:"pointer", transition:"all 0.2s",
          }}>{v.label}</button>
        ))}
      </div>

      {/* Circle */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:32 }}>
        <svg width={200} height={200} style={{ transform:"rotate(-90deg)" }}>
          <circle cx={100} cy={100} r={radius} fill="none" stroke="var(--border)" strokeWidth={10}/>
          <circle cx={100} cy={100} r={radius} fill="none"
            stroke={mode==="focus" ? "var(--accent)" : mode==="short" ? "var(--peach)" : "var(--orange)"}
            strokeWidth={10} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={circ - (pct/100)*circ}
            style={{ transition:"stroke-dashoffset 0.5s ease" }}/>
        </svg>
        <div style={{ marginTop:-120, textAlign:"center", position:"relative", zIndex:1, marginBottom:100 }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"2.8rem", color:"var(--text)", lineHeight:1 }}>{mm}:{ss}</div>
          <div style={{ fontSize:"0.82rem", color:"var(--text3)", marginTop:6 }}>{MODES[mode].label}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:28 }}>
        <Btn onClick={() => { setRunning(false); setSeconds(MODES[mode].duration); }} variant="ghost" size="lg">Reset</Btn>
        <Btn onClick={() => setRunning(p=>!p)} size="lg" style={{ minWidth:120 }}>
          {running ? "Pause" : seconds === MODES[mode].duration ? "Mulai" : "Lanjut"}
        </Btn>
      </div>

      {/* Task input */}
      <Card>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.9rem", marginBottom:12 }}>Sedang mengerjakan apa?</div>
        <Input value={task} onChange={e=>setTask(e.target.value)} placeholder="cth: Bab 3 Pemrograman Web..." icon={<Brain size={15}/>}/>
        <div style={{ display:"flex", gap:16, marginTop:16 }}>
          <div style={{ textAlign:"center", flex:1 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.6rem", color:"var(--accent)" }}>{sessions}</div>
            <div style={{ fontSize:"0.75rem", color:"var(--text3)" }}>Sesi Selesai</div>
          </div>
          <Divider style={{ width:1, height:"auto" }}/>
          <div style={{ textAlign:"center", flex:1 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.6rem", color:"var(--orange)" }}>{sessions * 25}</div>
            <div style={{ fontSize:"0.75rem", color:"var(--text3)" }}>Menit Fokus</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PAGE: HABIT TRACKER
// ══════════════════════════════════════════════════════════
function HabitPage() {
  const toast = useToast();
  const today = new Date();
  const todayStr = today.toISOString().slice(0,10);
  const [habits, setHabits] = useLocalStorage("sr_habits", [
    { id:1, name:"Baca 30 Menit", icon:"BookOpen", completions:["2026-03-07","2026-03-08","2026-03-09","2026-03-10","2026-03-11"], color:"lime" },
    { id:2, name:"Review Catatan", icon:"Brain", completions:["2026-03-08","2026-03-09","2026-03-11"], color:"peach" },
    { id:3, name:"Olahraga Ringan", icon:"Activity", completions:["2026-03-07","2026-03-10","2026-03-11"], color:"orange" },
  ]);
  const [newHabit, setNewHabit] = useState("");
  const [showForm, setShowForm] = useState(false);

  const toggleToday = id => {
    setHabits(p => p.map(h => {
      if (h.id !== id) return h;
      const done = h.completions.includes(todayStr);
      return { ...h, completions: done ? h.completions.filter(d=>d!==todayStr) : [...h.completions, todayStr] };
    }));
  };

  const del = id => { setHabits(p => p.filter(h=>h.id!==id)); toast("Habit dihapus"); };

  const add = () => {
    if (!newHabit.trim()) { toast("Nama habit wajib diisi!", "error"); return; }
    setHabits(p => [...p, { id:Date.now(), name:newHabit.trim(), completions:[], color:"lime" }]);
    setNewHabit(""); setShowForm(false);
    toast("Habit baru ditambahkan!");
  };

  // Last 7 days
  const last7 = Array(7).fill(0).map((_,i) => {
    const d = new Date(today); d.setDate(d.getDate() - 6 + i);
    return d.toISOString().slice(0,10);
  });
  const dayLabels = last7.map(d => new Date(d).toLocaleDateString("id-ID", { weekday:"short" }).slice(0,3));

  const colorMap = { lime:"var(--lime)", peach:"var(--peach)", orange:"var(--orange)" };

  const getStreak = (completions) => {
    let streak = 0;
    const d = new Date(today);
    while (true) {
      const s = d.toISOString().slice(0,10);
      if (completions.includes(s)) { streak++; d.setDate(d.getDate()-1); }
      else break;
    }
    return streak;
  };

  return (
    <div className="fade-up">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"var(--text)", letterSpacing:"-0.5px" }}>Habit Tracker</h1>
          <div style={{ fontSize:"0.85rem", color:"var(--text3)" }}>Bangun konsistensi satu hari per hari</div>
        </div>
        <Btn onClick={() => setShowForm(p=>!p)}><Plus size={16}/> Habit Baru</Btn>
      </div>

      {showForm && (
        <Card className="scale-in" style={{ marginBottom:20, border:"1.5px solid var(--accent)" }}>
          <div style={{ display:"flex", gap:10 }}>
            <Input label="Nama Habit" value={newHabit} onChange={e=>setNewHabit(e.target.value)} placeholder="cth: Baca 30 menit setiap hari" icon={<Star size={15}/>} style={{ flex:1 }}/>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:12 }}>
            <Btn variant="ghost" onClick={() => setShowForm(false)}>Batal</Btn>
            <Btn onClick={add}><Plus size={15}/> Tambah</Btn>
          </div>
        </Card>
      )}

      {/* Header row */}
      <div style={{ display:"flex", gap:0, marginBottom:12, paddingLeft:8 }}>
        <div style={{ flex:1 }}/>
        <div style={{ display:"flex", gap:0, width:196 }}>
          {dayLabels.map((d,i) => (
            <div key={i} style={{ width:28, textAlign:"center", fontSize:"0.68rem", fontWeight:600, color: last7[i]===todayStr ? "var(--accent)" : "var(--text3)" }}>{d}</div>
          ))}
        </div>
        <div style={{ width:80 }}/>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {habits.map((h,idx) => {
          const streak = getStreak(h.completions);
          const doneToday = h.completions.includes(todayStr);
          return (
            <Card key={h.id} className="lift fade-up" style={{ animationDelay:`${idx*60}ms`, padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                {/* Name & streak */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--text)", marginBottom:2 }}>{h.name}</div>
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    <Flame size={12} color="var(--orange)"/>
                    <span style={{ fontSize:"0.75rem", color:"var(--text3)" }}>{streak} hari streak</span>
                  </div>
                </div>

                {/* 7-day grid */}
                <div style={{ display:"flex", gap:2 }}>
                  {last7.map((d,i) => {
                    const done = h.completions.includes(d);
                    const isToday = d === todayStr;
                    return (
                      <div key={i}
                        onClick={() => isToday && toggleToday(h.id)}
                        style={{
                          width:26, height:26, borderRadius:6, cursor: isToday ? "pointer" : "default",
                          background: done ? colorMap[h.color||"lime"] : "var(--surface2)",
                          border:`1.5px solid ${isToday ? "var(--accent)" : "transparent"}`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          transition:"all 0.15s",
                          transform: isToday && done ? "scale(1.1)" : "none",
                        }}>
                        {done && <CheckCircle2 size={13} color={h.color==="orange"?"#fff":"var(--forest)"}/>}
                      </div>
                    );
                  })}
                </div>

                {/* Today button */}
                <button onClick={() => toggleToday(h.id)} style={{
                  width:80, padding:"7px", borderRadius:8, border:`1.5px solid ${doneToday ? "var(--accent)" : "var(--border)"}`,
                  background: doneToday ? "var(--lime-mute)" : "transparent",
                  color: doneToday ? "var(--accent)" : "var(--text2)",
                  cursor:"pointer", fontSize:"0.78rem", fontWeight:600,
                  fontFamily:"'Outfit',sans-serif", transition:"all 0.2s",
                }}>
                  {doneToday ? "Selesai" : "Tandai"}
                </button>

                <button onClick={() => del(h.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text3)", display:"flex", padding:4 }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text3)"}
                ><Trash2 size={14}/></button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════
function App() {
  const [theme, setTheme] = useLocalStorage("sr_theme", "light");
  const [user, setUser] = useLocalStorage("sr_user", null);
  const [view, setView] = useState("landing"); // landing | app
  const [page, setPage] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [tasks, setTasks] = useLocalStorage("sr_tasks", [
    { id:1, name:"Kerjakan laporan Pemweb", priority:"high", deadline:"2026-03-12", category:"tugas", done:false, createdAt:"2026-03-09T00:00:00Z" },
    { id:2, name:"Baca materi Kalkulus Bab 4", priority:"medium", deadline:"2026-03-14", category:"kuliah", done:false, createdAt:"2026-03-09T00:00:00Z" },
    { id:3, name:"Review slide Basis Data", priority:"low", deadline:"2026-03-15", category:"kuliah", done:true, createdAt:"2026-03-08T00:00:00Z" },
    { id:4, name:"Buat PPT presentasi Alpro", priority:"high", deadline:"2026-03-11", category:"tugas", done:false, createdAt:"2026-03-07T00:00:00Z" },
  ]);

  // Apply theme
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    // Auto show light on init
    document.body.classList.add("light");
  }, []);

  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");

  const handleEnter = () => {
    if (user) { setView("app"); }
    else { setShowLogin(true); }
  };

  const handleLogin = (u) => {
    setUser(u);
    setView("app");
  };

  const handleLogout = () => {
    setUser(null);
    setView("landing");
  };

  // Navigate from feature access without login
  const tryPage = (p) => {
    if (!user) { setShowLogin(true); return; }
    setPage(p); setView("app");
  };

  const pages = {
    dashboard: <DashboardPage tasks={tasks}/>,
    todo: <TodoPage tasks={tasks} setTasks={setTasks}/>,
    target: <TargetPage/>,
    reminder: <ReminderPage/>,
    recap: <RecapPage/>,
    notes: <NotesPage/>,
    pomodoro: <PomodoroPage/>,
    habit: <HabitPage/>,
  };

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <ToastProvider>
        <GlobalStyle/>

        {view === "landing" ? (
          <Landing onEnter={handleEnter} theme={theme}/>
        ) : (
          <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
            <Sidebar activePage={page} setPage={setPage} open={sideOpen}
              onClose={() => setSideOpen(false)} user={user} onLogout={handleLogout}/>
            <Topbar page={page} onMenuClick={() => setSideOpen(true)}/>
            <main style={{
              marginLeft:220, padding:"28px 32px",
              minHeight:"100vh",
            }}>
              <style>{`
                @media (max-width: 768px) {
                  main { margin-left: 0 !important; padding: 72px 16px 24px !important; }
                }
              `}</style>
              {pages[page]}
            </main>
          </div>
        )}

        <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin}/>
      </ToastProvider>
    </ThemeCtx.Provider>
  );
}

export default App;
