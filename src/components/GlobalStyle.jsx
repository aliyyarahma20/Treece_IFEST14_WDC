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

    /* ── LIGHT MODE ── */
    body.light {
      --bg:           #F2E8DF;
      --bg2:          #FEFEFE;
      --bg3:          #ede3d8;
      --surface:      #FEFEFE;
      --surface2:     #f8f2eb;
      --border:       rgba(65,81,17,0.12);
      --border2:      rgba(65,81,17,0.06);
      --text:         #2a3508;
      --text2:        rgba(42,53,8,0.6);
      --text3:        rgba(42,53,8,0.38);
      --accent:       #415111;
      --accent2:      #5a6e18;
      --lime:         #D2E186;
      --orange:       #FB8159;
      --peach:        #FCBF93;
      --lime-mute:    rgba(210,225,134,0.35);
      --orange-mute:  rgba(251,129,89,0.15);
      --shadow:       0 2px 16px rgba(65,81,17,0.08);
      --shadow-lg:    0 8px 40px rgba(65,81,17,0.12);
    }

    /* ── DARK MODE ── */
    body.dark {
      --bg:           #111a05;
      --bg2:          #1a2608;
      --bg3:          #222f0c;
      --surface:      #1f2d09;
      --surface2:     #263510;
      --border:       rgba(210,225,134,0.1);
      --border2:      rgba(210,225,134,0.05);
      --text:         #eef3d4;
      --text2:        rgba(238,243,212,0.6);
      --text3:        rgba(238,243,212,0.35);
      --accent:       #D2E186;
      --accent2:      #b8cc60;
      --lime:         #D2E186;
      --orange:       #FB8159;
      --peach:        #FCBF93;
      --lime-mute:    rgba(210,225,134,0.12);
      --orange-mute:  rgba(251,129,89,0.12);
      --shadow:       0 2px 16px rgba(0,0,0,0.3);
      --shadow-lg:    0 8px 40px rgba(0,0,0,0.4);
    }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
    ::selection { background: var(--lime); color: var(--accent); }

    input, select, textarea { font-family: 'Outfit', sans-serif; }

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
    @keyframes progressFill {
      from { width: 0%; }
    }

    .fade-up   { animation: fadeUp  0.45s ease forwards; }
    .fade-in   { animation: fadeIn  0.3s  ease forwards; }
    .scale-in  { animation: scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }

    .lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .lift:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg) !important; }

    .progress-animated { animation: progressFill 1.2s cubic-bezier(0.22,1,0.36,1) forwards; }

    .hero-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }

    .section-reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .section-reveal.visible { opacity: 1; transform: translateY(0); }

    .nav-indicator {
      position: absolute; left: 0; top: 50%; transform: translateY(-50%);
      width: 3px; height: 60%; background: var(--lime);
      border-radius: 0 3px 3px 0;
    }

    [data-tip] { position: relative; }
    [data-tip]::after {
      content: attr(data-tip);
      position: absolute; bottom: calc(100% + 8px); left: 50%;
      transform: translateX(-50%) scale(0.85);
      background: var(--accent); color: var(--bg);
      padding: 4px 10px; border-radius: 6px;
      font-size: 0.72rem; font-weight: 500; white-space: nowrap;
      pointer-events: none; opacity: 0;
      transition: all 0.2s; transform-origin: bottom center;
    }
    [data-tip]:hover::after { opacity: 1; transform: translateX(-50%) scale(1); }

    .custom-check {
      appearance: none; -webkit-appearance: none;
      width: 18px; height: 18px; border-radius: 5px;
      border: 1.5px solid var(--border);
      background: var(--surface);
      cursor: pointer; transition: all 0.15s;
      position: relative; flex-shrink: 0;
    }
    .custom-check:checked { background: var(--accent); border-color: var(--accent); }
    .custom-check:checked::after {
      content: '';
      position: absolute; left: 5px; top: 2px;
      width: 5px; height: 9px;
      border: 2px solid var(--bg); border-top: none; border-left: none;
      transform: rotate(45deg);
    }

    @media (max-width: 768px) { .hide-mobile { display: none !important; } }
    @media (min-width: 769px) { .show-mobile { display: none !important; } }

    /* ── RESPONSIVE GRID UTILITIES ── */
    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 640px) {
      .grid-2col {
        grid-template-columns: 1fr;
      }
    }

    /* ── LANDING PAGE RESPONSIVE ── */
    @media (max-width: 480px) {
      .landing-cta-banner {
        flex-direction: column !important;
        padding: 32px 24px !important;
        text-align: center;
      }
      .landing-cta-banner button {
        width: 100%;
        justify-content: center;
      }
    }

    /* ── PAGE HEADER RESPONSIVE ── */
    @media (max-width: 480px) {
      .page-header-row {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 10px !important;
      }
      .page-header-row > button,
      .page-header-row > div > button {
        width: 100%;
        justify-content: center;
      }
    }

    /* ── FORM GRID RESPONSIVE ── */
    @media (max-width: 480px) {
      .form-grid-2 {
        grid-template-columns: 1fr !important;
      }
      .form-grid-2 > * {
        grid-column: auto !important;
      }
    }

    /* ── RECAP HERO STATS ── */
    @media (max-width: 480px) {
      .recap-hero-stats {
        gap: 16px !important;
      }
      .recap-hero-badge {
        position: static !important;
        display: inline-flex;
        margin-bottom: 12px;
      }
    }

    /* ── POMODORO CENTERED LAYOUT ── */
    @media (max-width: 480px) {
      .pomodoro-wrap {
        padding: 24px 16px !important;
      }
    }

    /* ── HABIT TRACKER ── */
    @media (max-width: 480px) {
      .habit-day-grid {
        gap: 4px !important;
      }
    }

    /* ── GENERAL SMALL SCREEN FIXES ── */
    @media (max-width: 480px) {
      .stat-grid {
        grid-template-columns: 1fr 1fr !important;
      }
    }
  `}</style>
);

export default GlobalStyle;
