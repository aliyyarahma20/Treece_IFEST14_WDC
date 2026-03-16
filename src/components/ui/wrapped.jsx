// WrappedSwipeCards.jsx
import { useState, useRef, useCallback, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= bp);
    useEffect(() => {
      const fn = () => setIsMobile(window.innerWidth <= bp);
      window.addEventListener("resize", fn);
      return () => window.removeEventListener("resize", fn);
    }, [bp]);
    return isMobile;
  }


const TOTAL = 6;

const FAN = [
  { tx: 0,   ty: 0,  rot: 0,  scale: 1,    opacity: 1,    z: TOTAL },
  { tx: 18,  ty: 14, rot: 6,  scale: 0.94, opacity: 0.85, z: TOTAL-1 },
  { tx: -14, ty: 20, rot: -5, scale: 0.88, opacity: 0.7,  z: TOTAL-2 },
  { tx: 22,  ty: 28, rot: 9,  scale: 0.82, opacity: 0.5,  z: TOTAL-3 },
  { tx: -20, ty: 34, rot: -8, scale: 0.76, opacity: 0.3,  z: TOTAL-4 },
  { tx: 16,  ty: 40, rot: 6,  scale: 0.70, opacity: 0.15, z: TOTAL-5 },
];

function getStyle(offset, dragDelta, isDragging) {
  if (offset < 0) return { tx: -340, ty: -20, rot: -18, scale: 0.85, opacity: 0, z: 0 };
  const f = FAN[Math.min(Math.abs(offset), FAN.length - 1)];
  if (offset === 0) {
    return { tx: dragDelta, ty: Math.abs(dragDelta) * 0.04, rot: dragDelta * 0.05, scale: 1, opacity: 1, z: TOTAL };
  }
  if (offset === 1 && isDragging && Math.abs(dragDelta) > 10) {
    const p = Math.min(Math.abs(dragDelta) / 120, 1);
    return { tx: f.tx*(1-p*0.3), ty: f.ty*(1-p*0.5), rot: f.rot*(1-p*0.4), scale: f.scale+p*0.04, opacity: f.opacity+p*0.1, z: f.z };
  }
  return f;
}

function TopographBg({ id }) {
  return (
    <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <ellipse cx="40" cy="40" rx="36" ry="28" fill="none" stroke="var(--border)" strokeWidth="0.7"/>
          <ellipse cx="40" cy="40" rx="24" ry="18" fill="none" stroke="var(--border)" strokeWidth="0.7" strokeOpacity="0.8"/>
          <ellipse cx="40" cy="40" rx="12"  ry="8"  fill="none" stroke="var(--border)" strokeWidth="0.7" strokeOpacity="0.6"/>
          <ellipse cx="0"  cy="0"  rx="10" ry="16" fill="none" stroke="var(--border)" strokeWidth="0.7" strokeOpacity="0.7"/>
          <ellipse cx="80" cy="80" rx="14" ry="10" fill="none" stroke="var(--border)" strokeWidth="0.7" strokeOpacity="0.7"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`}/>
    </svg>
  );
}

function Deco({ size, bg, top, right, bottom, left }) {
  return <div style={{ position:"absolute",borderRadius:"50%",pointerEvents:"none",width:size,height:size,background:bg,top,right,bottom,left }}/>;
}

function CardFooter({ index, light }) {
  const col    = light ? "var(--text3)"  : "rgba(255,255,255,0.35)";
  const iconBg = light ? "var(--border)" : "rgba(255,255,255,0.15)";
  const stroke = light ? "var(--accent)" : "white";
  return (
    <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between" }}>
      <div style={{ display:"flex",alignItems:"center",gap:6 }}>
        <div style={{ width:20,height:20,borderRadius:6,background:iconBg,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polyline points="1,8 3,5 5,6 7,3 9,3" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontSize:11,fontWeight:600,color:col }}>SteadyRise</span>
      </div>
      <span style={{ fontSize:11,color:col,opacity:0.7 }}>{index} / {TOTAL}</span>
    </div>
  );
}

function CardIntro({ data, t }) {
  return (
    <div style={{ ...S.inner, background:"var(--bg3)",color:"var(--text)" }}>
      <TopographBg id="topo-intro"/>
      <Deco size={200} bg="var(--mute2)"  top={-60}  right={-60}/>
      <Deco size={110} bg="var(--mute)"   bottom={40} left={-30}/>
      <div style={{ position:"relative",zIndex:1 }}>
        <div style={S.tag("var(--highlight)")}>{data.monthLabel} · {t.wrapped.label}</div>
        <div style={{ marginTop:14,fontSize:22,fontWeight:800,lineHeight:1.25,color:"var(--text)" }}>
          {t.wrapped.tagline}
        </div>
        <div style={{ marginTop:10,fontSize:13,color:"var(--text3)",lineHeight:1.6 }}>
          {t.wrapped.intro(data.monthLabel)}
        </div>
      </div>
      <CardFooter index={1} light/>
    </div>
  );
}

function CardTasks({ data, t }) {
  const bars = [{ v:18,l:"W1" },{ v:22,l:"W2" },{ v:19,l:"W3" },{ v:25,l:"W4" }];
  return (
    <div style={{ ...S.inner, background:"var(--highlight)",color:"white" }}>
      <Deco size={220} bg="rgba(255,255,255,0.12)" top={-80} right={-80}/>
      <div style={{ position:"relative",zIndex:1 }}>
        <div style={S.tag("rgba(255,255,255,0.7)")}>{t.wrapped.tasksTag}</div>
        <div style={{ marginTop:8 }}>
          <span style={S.bigNum}>{data.stats.tasksDone.value}</span>
          <span style={S.bigUnit}>{t.wrapped.taskUnit}</span>
        </div>
        <div style={S.bigLabel}>{t.wrapped.tasksDoneThisMonth}</div>
        <div style={S.bigSub}>↑ {data.stats.tasksDone.delta}</div>
        <div style={{ display:"flex",alignItems:"flex-end",gap:5,height:50,marginTop:12 }}>
          {bars.map((b,i) => (
            <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center" }}>
              <div style={{ width:"100%",height:Math.round((b.v/25)*52),borderRadius:"4px 4px 0 0",background:i===3?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.38)" }}/>
              <div style={{ fontSize:9,marginTop:4,color:"rgba(255,255,255,0.55)" }}>{b.l}</div>
            </div>
          ))}
        </div>
      </div>
      <CardFooter index={2}/>
    </div>
  );
}

function CardFocus({ data, t }) {
  return (
    <div style={{ ...S.inner, background:"var(--accent)",color:"white" }}>
      <Deco size={180} bg="rgba(255,255,255,0.08)" bottom={-50} left={-50}/>
      <div style={{ position:"relative",zIndex:1 }}>
        <div style={S.tag("rgba(255,255,255,0.65)")}>{t.wrapped.focusTag}</div>
        <div style={{ marginTop:8 }}>
          <span style={S.bigNum}>{data.stats.focusTime.value}</span>
          <span style={S.bigUnit}>{t.wrapped.hourUnit}</span>
        </div>
        <div style={S.bigLabel}>{t.wrapped.totalFocusThisMonth}</div>
        <div style={S.bigSub}>{t.wrapped.avgPerDay}</div>
        <div style={{ marginTop:10,background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"10px 12px" }}>
          <div style={{ fontSize:9,color:"rgba(255,255,255,0.5)",marginBottom:7,letterSpacing:1,textTransform:"uppercase" }}>{t.wrapped.distribution}</div>
          {data.categories.map(c => (
            <div key={c.label} style={{ marginBottom:6 }}>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,0.7)",marginBottom:3 }}>
                <span>{c.label}</span><span>{c.pct}%</span>
              </div>
              <div style={{ height:4,background:"rgba(255,255,255,0.15)",borderRadius:99,overflow:"hidden" }}>
                <div style={{ height:"100%",width:`${c.pct}%`,background:"rgba(255,255,255,0.75)",borderRadius:99 }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CardFooter index={3}/>
    </div>
  );
}

function CardStreak({ data, t }) {
  return (
    <div style={{ ...S.inner, background:"var(--bg)",color:"var(--text)" }}>
      <TopographBg id="topo-streak"/>
      <div style={{ position:"relative",zIndex:1 }}>
        <div style={S.tag("var(--highlight)")}>{t.wrapped.streakTag}</div>
        <div style={{ marginTop:8 }}>
          <span style={{ ...S.bigNum,color:"var(--highlight)" }}>{data.stats.bestStreak.value}</span>
          <span style={{ ...S.bigUnit,color:"var(--text3)" }}>{t.wrapped.dayUnit}</span>
        </div>
        <div style={{ ...S.bigLabel,color:"var(--text)" }}>{t.wrapped.longestStreak}</div>
        <div style={{ ...S.bigSub,color:"var(--text3)" }}>{t.wrapped.personalBest}</div>
        <div style={{ marginTop:14 }}>
          <div style={{ fontSize:9,color:"var(--text3)",marginBottom:6,letterSpacing:1,textTransform:"uppercase" }}>{t.wrapped.checkinThisMonth}</div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4 }}>
            {data.streakDays.map((v,i) => (
              <div key={i} style={{ aspectRatio:"1",borderRadius:5,background:v?"var(--highlight)":"var(--border)" }}/>
            ))}
          </div>
        </div>
      </div>
      <CardFooter index={4} light/>
    </div>
  );
}

function CardCategories({ data, t }) {
  return (
    <div style={{ ...S.inner, background:"var(--surface2)",color:"var(--text)" }}>
      <Deco size={160} bg="var(--mute)"  top={-40}  right={-40}/>
      <Deco size={100} bg="var(--mute2)" bottom={20} left={-20}/>
      <TopographBg id="topo-cat"/>
      <div style={{ position:"relative",zIndex:1 }}>
        <div style={S.tag("var(--accent)")}>{t.wrapped.categoriesTag}</div>
        <div style={{ marginTop:12,fontSize:18,fontWeight:800,lineHeight:1.3,color:"var(--text)" }}>
          {t.wrapped.mostProductiveIn}
          <span style={{ color:"var(--highlight)" }}>{data.topTags[0]} & {data.topTags[1]}</span>
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginTop:12 }}>
          {data.topTags.map(t => <span key={t} style={{ ...S.pillBase,color:"var(--highlight)",background:"var(--mute2)",border:"0.5px solid var(--highlight2)" }}>{t}</span>)}
          {data.allTags.map(t  => <span key={t} style={{ ...S.pillBase,color:"var(--text2)",background:"var(--border2)",border:"0.5px solid var(--border)" }}>{t}</span>)}
        </div>
        <div style={{ marginTop:16,fontSize:12,color:"var(--text3)",lineHeight:1.6 }}>
          {`${data.stats.notes.value} ${t.wrapped.notesUnit} · ${data.stats.bestStreak.value} ${t.wrapped.dayUnit} ${t.wrapped.streakLabel}`}
        </div>
      </div>
      <CardFooter index={5} light/>
    </div>
  );
}

function CardProjection({ data, t }) {
  const targets = [
    { label:t.wrapped.targetTasks,  value:`${Math.round(data.stats.tasksDone.value*1.2)} ${t.wrapped.taskUnit}`,  color:"var(--highlight)" },
    { label:t.wrapped.targetStreak, value:`${Math.round(data.stats.bestStreak.value*1.2)} ${t.wrapped.dayUnit}`,  color:"var(--accent)"    },
    { label:t.wrapped.targetFocus,  value:`${Math.round(data.stats.focusTime.value*1.2)} ${t.wrapped.hourUnit}`,    color:"var(--accent2)"   },
  ];
  return (
    <div style={{ ...S.inner, background:"var(--surface)",color:"var(--text)" }}>
      <Deco size={200} bg="var(--mute2)" top={-60} right={-60}/>
      <TopographBg id="topo-proj"/>
      <div style={{ position:"relative",zIndex:1 }}>
        <div style={S.tag("var(--highlight)")}>{t.wrapped.nextMonthTag}</div>
        <div style={{ marginTop:12,fontSize:16,fontWeight:800,color:"var(--text)",lineHeight:1.35 }}>
          {t.wrapped.nextMonthDesc(Math.round(data.stats.tasksDone.value*1.2))}
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:6,marginTop:12 }}>
          {targets.map(t => (
            <div key={t.label} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 13px",background:"var(--surface2)",borderRadius:10,border:"0.5px solid var(--border)" }}>
              <span style={{ fontSize:12,color:"var(--text2)" }}>{t.label}</span>
              <span style={{ fontSize:13,fontWeight:700,color:t.color }}>{t.value}</span>
            </div>
          ))}
        </div>
      </div>
      <CardFooter index={6} light/>
    </div>
  );
}

const CARD_COMPONENTS = [CardIntro, CardTasks, CardFocus, CardStreak, CardCategories, CardProjection];


// ── Inject styles once ──
if (typeof document !== "undefined" && !document.getElementById("wrapped-style")) {
  const s = document.createElement("style");
  s.id = "wrapped-style";
  s.textContent = `
    @keyframes wrappedCollapse {
      0%   { max-height: 900px; opacity: 1; margin-bottom: 28px; }
      30%  { opacity: 0; }
      100% { max-height: 0;     opacity: 0; margin-bottom: 0;    }
    }
    .wrapped-collapsing {
      overflow: hidden;
      animation: wrappedCollapse 0.55s cubic-bezier(0.4,0,0.2,1) forwards;
    }

    /* ── TABLET (≤ 768px): stack jadi 1 kolom ── */
    @media (max-width: 768px) {
      .wrapped-grid {
        gap: 24px !important;
      }
      .wrapped-left {
        order: 2;
        height: auto !important;
        min-height: unset !important;
      }
      .wrapped-right {
        order: 1;
      }
      .wrapped-headline {
        font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
      }
      /* deck wrap: kasih ruang cukup untuk fan effect (+50px) */
      .wrapped-deck-wrap {
        width: 240px !important;
        height: 390px !important;
      }
      .wrapped-deck-card {
        width: 240px !important;
        height: 340px !important;
      }
    }

    /* ── MOBILE (≤ 480px): lebih kecil lagi ── */
    @media (max-width: 480px) {
      .wrapped-grid {
        gap: 20px !important;
      }
      .wrapped-headline {
        font-size: clamp(1.6rem, 8vw, 2rem) !important;
        letter-spacing: -0.5px !important;
      }
      .wrapped-body-text {
        font-size: 1rem !important;
      }
      .wrapped-deck-wrap {
        width: 210px !important;
        height: 350px !important;
      }
      .wrapped-deck-card {
        width: 210px !important;
        height: 300px !important;
      }
      .wrapped-stats-row {
        font-size: 15px !important;
      }
      .wrapped-quote-text {
        font-size: 16px !important;
      }
    }
  `;
  document.head.appendChild(s);
}

// ══ MAIN COMPONENT ══
export default function WrappedSwipeCards({ month, year, data }) {

  const isMobile = useIsMobile(900);
  const { t } = useLanguage();

  const [current,    setCurrent]    = useState(0);
  const [dismissed,  setDismissed]  = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const [dragDelta,  setDragDelta]  = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const dismiss = () => {
    if (collapsing) return;
    setCollapsing(true);
    setTimeout(() => setDismissed(true), 560);
  };

  const goTo = useCallback((idx) => {
    setCurrent(((idx % TOTAL) + TOTAL) % TOTAL);
    setDragDelta(0);
    setIsDragging(false);
  }, []);

  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  const onPointerDown = (e) => {
    startX.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isDragging) return;
    setDragDelta(e.clientX - startX.current);
  };
  const onPointerUp = () => {
    if (!isDragging) return;
    if      (dragDelta < -70) goNext();
    else if (dragDelta >  70) goPrev();
    else { setDragDelta(0); setIsDragging(false); }
  };

  if (dismissed) return null;

  return (
    <div
      className={collapsing ? "wrapped-collapsing" : ""}
      style={{ width:"100%", marginBottom:28 }}
    >
      {/* ── Responsive 2-col grid ── */}
      <div
        className="wrapped-grid"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1fr) 360px",
          gap: 32,
          alignItems: "center",
        }}
      >

        {/* LEFT */}
        <div
          className="wrapped-left"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: 0,
            overflow: "hidden",
            minHeight: isMobile ? "auto" : 460, // ← ubah
            height: "auto",
            order: isMobile ? 2 : 0,           // ← ubah, biar deck tampil duluan di mobile
            paddingRight: isMobile ? 0 : 8,    // ← ubah
            gap: 24,
          }}
        >
          {/* Judul */}
          <div>
            <div style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "var(--text3)",
              marginBottom: 12,
            }}>
              {t.wrapped.label}
            </div>
            <div
              className="wrapped-headline"
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(1.6rem, 6vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
                marginBottom: 16,
              }}
            >
              <span style={{ color: "var(--text)" }}>{data.monthLabel} </span>
              <span style={{ color: "var(--highlight)" }}>Wrapped.</span>
            </div>
            <div
              className="wrapped-body-text"
              style={{ fontSize: "1.2rem", color: "var(--text2)", lineHeight: 1.7 }}
            >
              {t.wrapped.bodyText}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: t.wrapped.tasksDoneLabel, value: `${data.stats.tasksDone.value} ${t.wrapped.taskUnit}` },
              { label: t.wrapped.focusTimeLabel, value: `${data.stats.focusTime.value} ${t.wrapped.hourUnit}` },
              { label: t.wrapped.bestStreakLabel, value: `${data.stats.bestStreak.value} ${t.wrapped.dayUnit}` },
            ].map((s, i) => (
              <div
                key={i}
                className="wrapped-stats-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "0.5px solid var(--border)",
                  fontSize: 18,
                }}
              >
                <span style={{ color: "var(--text3)" }}>{s.label}</span>
                <span style={{ fontWeight: 700, color: "var(--text)" }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Quote + Tutup */}
          <div>
            <div style={{ borderLeft: "2px solid var(--highlight)", paddingLeft: 14, marginBottom: 16 }}>
              <div
                className="wrapped-quote-text"
                style={{ fontSize: 20, color: "var(--text2)", fontStyle: "italic", lineHeight: 1.6 }}
              >
                {t.wrapped.quotes[current % t.wrapped.quotes.length]}
              </div>
            </div>
            <button onClick={dismiss} style={{
              background: "transparent",
              border: "0.5px solid var(--border)",
              borderRadius: 99,
              padding: "5px 14px",
              fontSize: 12,
              color: "var(--text3)",
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
              {t.wrapped.closeBtn}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="wrapped-right"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            order: isMobile ? 1 : 0,           // ← deck tampil di atas di mobile
            paddingLeft: isMobile ? 0 : 16,    // ← ubah
            paddingRight: isMobile ? 0 : 16,
          }}
        >
          {/* Deck wrapper — overflow visible biar fan effect ga ke-clip */}
          <div
            className="wrapped-deck-wrap"
            style={{
              position: "relative",
              width: 280,
              // height harus = tinggi kartu + ruang fan (kartu paling belakang ty ~40px)
              height: 430,
            }}
          >
            {CARD_COMPONENTS.map((CardComp, i) => {
              let offset = i - current;
              if (offset > TOTAL / 2)  offset -= TOTAL;
              if (offset < -TOTAL / 2) offset += TOTAL;
              const { tx, ty, rot, scale, opacity, z } = getStyle(offset, dragDelta, isDragging);
              const isActive    = offset === 0;
              const isClickable = offset === 1 || offset === 2;
              return (
                <div
                  key={i}
                  className="wrapped-deck-card"
                  // ── Pointer handlers di tiap kartu, bukan di wrapper ──
                  // Kartu non-aktif punya pointerEvents:none jadi swipe
                  // selalu ditangkap oleh kartu teratas (isActive)
                  onPointerDown={isActive ? onPointerDown : undefined}
                  onPointerMove={isActive ? onPointerMove : undefined}
                  onPointerUp={isActive ? onPointerUp : undefined}
                  onPointerLeave={isActive ? onPointerUp : undefined}
                  onClick={() => { if (!isDragging && Math.abs(dragDelta) < 5 && isClickable) goTo(i); }}
                  style={{
                    position: "absolute",
                    width: 280,
                    height: 390,
                    borderRadius: 24,
                    overflow: "hidden",
                    transformOrigin: "center 110%",
                    transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg) scale(${scale})`,
                    opacity,
                    zIndex: z,
                    transition: isDragging ? "none" : "transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease",
                    willChange: "transform",
                    pointerEvents: isActive ? "auto" : isClickable ? "auto" : "none",
                    cursor: isActive ? (isDragging ? "grabbing" : "grab") : isClickable ? "pointer" : "default",
                    boxShadow: isActive ? "var(--shadow-lg)" : "none",
                    touchAction: "none", // penting buat mobile swipe
                  }}
                >
                  <CardComp data={data} t={t}/>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {Array.from({ length: TOTAL }).map((_, i) => (
                <div key={i} onClick={() => goTo(i)} style={{
                  height: 6,
                  width: i === current ? 22 : 6,
                  borderRadius: 99,
                  background: i === current ? "var(--highlight)" : "var(--border)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}/>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button onClick={goPrev} style={S.navBtn}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span style={{ fontSize: 12, color: "var(--text3)", minWidth: 48, textAlign: "center" }}>
                {current + 1} / {TOTAL}
              </span>
              <button onClick={goNext} style={S.navBtn}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <span style={{ fontSize: 11, color: "var(--text3)" }}>{t.wrapped.swipeHint}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

const S = {
  inner: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 18px 16px",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  tag: (color) => ({ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color }),
  bigNum:   { fontSize: 52, fontWeight: 800, lineHeight: 1, letterSpacing: -2, color: "white" },
  bigUnit:  { fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.6)", marginLeft: 3 },
  bigLabel: { fontSize: 13, fontWeight: 600, color: "white", marginTop: 4, opacity: 0.85 },
  bigSub:   { fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3, lineHeight: 1.4 },
  pillBase: { fontSize: 10, padding: "4px 9px", borderRadius: 99, fontWeight: 500 },
  navBtn: {
    width: 38, height: 38, borderRadius: "50%",
    border: "0.5px solid var(--border)",
    background: "var(--surface2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "background 0.2s",
    flexShrink: 0,
  },
};