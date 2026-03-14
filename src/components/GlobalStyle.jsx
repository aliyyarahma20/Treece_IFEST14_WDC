const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600&family=Lora:wght@400;500;600&family=Caveat:wght@400;500;600;700&family=Nunito:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      font-family: 'Outfit', sans-serif;
      transition: background 0.35s ease, color 0.35s ease;
      overflow-x: hidden;
    }

    /* ── MORNING MIST ── */
  [data-theme="morning-mist"] {
    --bg:          #F2E8DF;
    --bg2:         #FEFEFE;
    --bg3:         #ede3d8;
    --surface:     #FEFEFE;
    --surface2:    #f8f2eb;
    --border:      rgba(65,81,17,0.12);
    --border2:     rgba(65,81,17,0.06);
    --text:        #2a3508;
    --text2:       rgba(42,53,8,0.6);
    --text3:       rgba(42,53,8,0.38);
    --accent:      #415111;
    --accent2:     #5a6e18;
    --highlight:   #FB8159;
    --highlight2:  #FCBF93;
    --mute:        rgba(210,225,134,0.35);
    --mute2:       rgba(251,129,89,0.15);
    --shadow:      0 2px 16px rgba(65,81,17,0.08);
    --shadow-lg:   0 8px 40px rgba(65,81,17,0.12);
    --is-dark:     0;
    --logo-sub: #FB8159;
  }

  /* ── LAVENDER SKY ── */
  [data-theme="lavender-sky"] {
    --bg:          #F8F6F5;
    --bg2:         #FFFFFF;
    --bg3:         #EEECEA;
    --surface:     #FFFFFF;
    --surface2:    #CBCEEA;
    --border:      rgba(93,93,90,0.12);
    --border2:     rgba(93,93,90,0.06);
    --text:        #5D5D5A;
    --text2:       rgba(93,93,90,0.65);
    --text3:       rgba(93,93,90,0.38);
    --accent:      #5D5D5A;
    --accent2:     #3a3a38;
    --highlight:   #CDEBF1;
    --highlight2:  #CBCEEA;
    --mute:        rgba(205,235,241,0.4);
    --mute2:       rgba(203,206,234,0.3);
    --shadow:      0 2px 16px rgba(93,93,90,0.08);
    --shadow-lg:   0 8px 40px rgba(93,93,90,0.12);
    --is-dark:     0;
    --logo-sub: #CDEBF1;
  }

  /* ── ROSE PETAL ── */
  [data-theme="rose-petal"] {
    --bg:          #FEDEE9;
    --bg2:         #FFFFFF;
    --bg3:         #fccfde;
    --surface:     #FFFFFF;
    --surface2:    #F7C5D5;
    --border:      rgba(125,28,53,0.12);
    --border2:     rgba(125,28,53,0.06);
    --text:        #7D1C35;
    --text2:       rgba(125,28,53,0.65);
    --text3:       rgba(125,28,53,0.38);
    --accent:      #7D1C35;
    --accent2:     #9e2442;
    --highlight:   #C4727E;
    --highlight2:  #F7C5D5;
    --mute:        rgba(196,114,126,0.15);
    --mute2:       rgba(247,197,213,0.4);
    --shadow:      0 2px 16px rgba(125,28,53,0.08);
    --shadow-lg:   0 8px 40px rgba(125,28,53,0.12);
    --is-dark:     0;
    --logo-sub: #C4727E;
  }

  /* ── MIDNIGHT ── */
  [data-theme="midnight"] {
    --bg:          #132436;
    --bg2:         #1C3448;
    --bg3:         #0e1c2a;
    --surface:     #1C3448;
    --surface2:    #243d54;
    --border:      rgba(232,237,242,0.1);
    --border2:     rgba(232,237,242,0.05);
    --text:        #E8EDF2;
    --text2:       rgba(232,237,242,0.6);
    --text3:       rgba(232,237,242,0.35);
    --accent:      #4A9EBF;
    --accent2:     #6ab4d0;
    --highlight:   #4A9EBF;
    --highlight2:  #243d54;
    --mute:        rgba(74,158,191,0.15);
    --mute2:       rgba(74,158,191,0.08);
    --shadow:      0 2px 16px rgba(0,0,0,0.3);
    --shadow-lg:   0 8px 40px rgba(0,0,0,0.4);
    --is-dark:     1;
    --logo-sub: #E8EDF2;
  }

  /* ── BLUSH DUSK ── */
  [data-theme="blush-dusk"] {
    --bg:          #363230;
    --bg2:         #4A3F3A;
    --bg3:         #2a2624;
    --surface:     #4A3F3A;
    --surface2:    #574b45;
    --border:      rgba(255,236,205,0.1);
    --border2:     rgba(255,236,205,0.05);
    --text:        #FFECCD;
    --text2:       rgba(255,236,205,0.6);
    --text3:       rgba(255,236,205,0.35);
    --accent:      #C4956A;
    --accent2:     #d4a87a;
    --highlight:   #C4956A;
    --highlight2:  #574b45;
    --mute:        rgba(196,149,106,0.15);
    --mute2:       rgba(196,149,106,0.08);
    --shadow:      0 2px 16px rgba(0,0,0,0.3);
    --shadow-lg:   0 8px 40px rgba(0,0,0,0.4);
    --is-dark:     1;
    --logo-sub: #FFECCD;
  }

  /* ── SLATE ── */
  [data-theme="slate"] {
    --bg:          #383838;
    --bg2:         #4A4A4A;
    --bg3:         #2c2c2c;
    --surface:     #4A4A4A;
    --surface2:    #555555;
    --border:      rgba(232,234,235,0.1);
    --border2:     rgba(232,234,235,0.05);
    --text:        #E8EAEB;
    --text2:       rgba(232,234,235,0.6);
    --text3:       rgba(232,234,235,0.35);
    --accent:      #8FAEC2;
    --accent2:     #a5c2d4;
    --highlight:   #8FAEC2;
    --highlight2:  #555555;
    --mute:        rgba(143,174,194,0.15);
    --mute2:       rgba(143,174,194,0.08);
    --shadow:      0 2px 16px rgba(0,0,0,0.3);
    --shadow-lg:   0 8px 40px rgba(0,0,0,0.4);
    --is-dark:     1;
    --logo-sub: #E8EAEB;
  }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
    ::selection { background: var(--mute); color: var(--accent); }

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

    @keyframes breathe {
      0%, 100% { transform: scale(1);    opacity: 0.6; }
      50%       { transform: scale(1.08); opacity: 1;   }
    }

    @keyframes floatY {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-10px); }
    }

    .float-anim { animation: floatY 4s ease-in-out infinite; }

    .breathe { animation: breathe 4s ease-in-out infinite; }


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
      width: 3px; height: 60%; background: var(--accent);
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
      z-index: 9999;
    }
    [data-tip]:hover::after { opacity: 1; transform: translateX(-50%) scale(1); }

    /* Sidebar tooltip — muncul ke kanan */
    aside [data-tip]::after {
      bottom: auto;
      left: calc(100% + 12px);
      top: 50%;
      transform: translateY(-50%) scale(0.85);
      transform-origin: left center;
    }
    aside [data-tip]:hover::after {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }

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

    @media (max-width: 592px) { .hide-mobile { display: none !important; } }
    @media (min-width: 593px) { .show-mobile { display: none !important; } }

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

    @media (max-width: 768px) {
      .landing-nav-right {
        gap: 8px !important;
        flex-shrink: 0;        /* ← tambah */
      }
      .lang-toggle {
        width: 60px !important;
        height: 28px !important;
        flex-shrink: 0;
      }
      /* Pastikan nav tidak overflow */
      nav {
        overflow: hidden !important;
      }

      .feat-heading {
        white-space: normal !important;
        font-size: clamp(1.3rem, 5vw, 1.8rem) !important;
      }
      .feat-desc {
        white-space: normal !important;
        font-size: 0.77rem !important;
      }
    }

    @media (max-width: 480px) {
      .feat-heading {
        white-space: normal !important;
        font-size: 1.3rem !important;
        letter-spacing: -0.3px !important;
      }
      .feat-desc {
        white-space: normal !important;
        font-size: 0.82rem !important;
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

    /* ── NAVBAR RESPONSIVE ── */
    @media (max-width: 768px) {
      .navbar-cta span {
        display: none;
      }
      .navbar-cta {
        padding: 8px 14px !important;
        font-size: 0.8rem !important;
        min-width: unset !important;
      }
    }

    /* ── HERO RESPONSIVE ── */
    @media (max-width: 768px) {
      .hero-top-row {
        flex-direction: column !important;
        gap: 24px !important;
      }
      .hero-left {
        flex: 1 1 100% !important;
        max-width: 100% !important;
      }
      .hero-right {
        flex: 1 1 100% !important;
        width: 100% !important;
      }
      .hero-headline {
        font-size: clamp(1.8rem, 8vw, 2.8rem) !important;
        letter-spacing: -1px !important;
      }
    }

    /* ── LANDING FEATURE TABS ── */
    @media (max-width: 768px) {
      .feature-grid {
        grid-template-columns: 1fr !important;
      }
      .feature-tabs {
        border-right: none !important;
        border-bottom: 1px solid var(--border);
        display: flex !important;
        flex-direction: row !important;
        overflow-x: auto;
        padding: 8px !important;
        gap: 6px;
      }
      .feature-tabs button {
        flex-shrink: 0;
        width: auto !important;
        padding: 8px 12px !important;
      }
      .feature-preview {
        padding: 20px 16px !important;
      }
      .scroll-indicator {
        display: none !important;
      }
      .hero-mockup {
        margin-top: 24px;
      }
    } 


    /* ── GENERAL SMALL SCREEN FIXES ── */
    @media (max-width: 480px) {
      .stat-grid {
        grid-template-columns: 1fr 1fr !important;
      }
    }

    @media (max-width: 768px) {
      main {
        margin-left: 0 !important;
        padding: 64px 16px 80px !important; /* 64px topbar, 80px bottom nav */
      }
    }
  `}</style>
);

export default GlobalStyle;
