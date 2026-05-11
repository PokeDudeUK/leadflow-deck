import { useEffect, useState, useRef } from 'react';

/**
 * xsellio — Feature-Rich Trailer
 *
 * A 110-second cinematic walkthrough at /trailer
 *
 * Designed to be screen-recorded in a 1920×1080 viewport for export to MP4.
 * Plays once on click; black before, holds final frame after.
 *
 * Timeline:
 *  00.0–05.0s   Opening — particle field rises, eyebrow text
 *  05.0–13.0s   Three problem stats hammer in
 *  13.0–20.0s   "What if..." → XSELLIO wordmark
 *  20.0–30.0s   FEATURE 1 — Discovery (search + 6 data sources)
 *  30.0–40.0s   FEATURE 2 — Sector Scoring (3 scores per lead)
 *  40.0–50.0s   FEATURE 3 — Tender Monitoring (£185k Leeds, countdown)
 *  50.0–60.0s   FEATURE 4 — AI Copilot (chat conversation)
 *  60.0–70.0s   FEATURE 5 — Pipeline + Action Centre
 *  70.0–80.0s   FIND. SCORE. WIN. (the summary)
 *  80.0–90.0s   +£945k counts up — modelled annual uplift
 *  90.0–100.0s  "No one else does this combination"
 *  100.0–108.0s BUILT. LIVE. READY.
 *  108.0–110.0s Final hero card
 */

interface SceneState {
  phase: number;
  t: number;
}

export default function TrailerView() {
  const [playing, setPlaying] = useState(false);
  const [scene, setScene] = useState<SceneState>({ phase: 0, t: 0 });
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!playing) return;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startRef.current) / 1000;
      let phase = 0;
      if (elapsed < 5) phase = 0;
      else if (elapsed < 13) phase = 1;
      else if (elapsed < 20) phase = 2;
      else if (elapsed < 30) phase = 3;
      else if (elapsed < 40) phase = 4;
      else if (elapsed < 50) phase = 5;
      else if (elapsed < 60) phase = 6;
      else if (elapsed < 70) phase = 7;
      else if (elapsed < 80) phase = 8;
      else if (elapsed < 90) phase = 9;
      else if (elapsed < 100) phase = 10;
      else if (elapsed < 108) phase = 11;
      else phase = 12;

      setScene({ phase, t: elapsed });

      if (elapsed < 110) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        overflow: 'hidden',
        cursor: playing ? 'none' : 'default',
      }}
    >
      <ParticleField active={playing && scene.t >= 2} t={scene.t} />

      {/* Scene 0: opener */}
      <Scene active={scene.phase === 0 && playing}>
        <Opener t={scene.t} />
      </Scene>

      {/* Scene 1: problem stats */}
      <Scene active={scene.phase === 1 && playing}>
        <ProblemStats t={scene.t - 5} />
      </Scene>

      {/* Scene 2: WHAT IF + XSELLIO */}
      <Scene active={scene.phase === 2 && playing}>
        <WhatIfXsellio t={scene.t - 13} />
      </Scene>

      {/* Scene 3: DISCOVERY feature */}
      <Scene active={scene.phase === 3 && playing}>
        <DiscoveryFeature t={scene.t - 20} />
      </Scene>

      {/* Scene 4: SECTOR SCORING feature */}
      <Scene active={scene.phase === 4 && playing}>
        <ScoringFeature t={scene.t - 30} />
      </Scene>

      {/* Scene 5: TENDER MONITORING feature */}
      <Scene active={scene.phase === 5 && playing}>
        <TenderFeature t={scene.t - 40} />
      </Scene>

      {/* Scene 6: AI COPILOT feature */}
      <Scene active={scene.phase === 6 && playing}>
        <CopilotFeature t={scene.t - 50} />
      </Scene>

      {/* Scene 7: PIPELINE + ACTION CENTRE */}
      <Scene active={scene.phase === 7 && playing}>
        <PipelineFeature t={scene.t - 60} />
      </Scene>

      {/* Scene 8: FIND. SCORE. WIN. */}
      <Scene active={scene.phase === 8 && playing}>
        <FindScoreWin t={scene.t - 70} />
      </Scene>

      {/* Scene 9: +£945k */}
      <Scene active={scene.phase === 9 && playing}>
        <NumberReveal t={scene.t - 80} />
      </Scene>

      {/* Scene 10: No one else does this */}
      <Scene active={scene.phase === 10 && playing}>
        <Differentiator t={scene.t - 90} />
      </Scene>

      {/* Scene 11: BUILT. LIVE. READY. */}
      <Scene active={scene.phase === 11 && playing}>
        <BuiltLiveReady t={scene.t - 100} />
      </Scene>

      {/* Scene 12: Final hero */}
      <Scene active={scene.phase === 12 && playing}>
        <FinalHero t={scene.t - 108} />
      </Scene>

      {/* Top accent stripe */}
      {playing && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #22c55e 25%, #22c55e 75%, transparent 100%)',
            opacity: 0.5,
            zIndex: 50,
          }}
        />
      )}

      {/* Bottom progress bar */}
      {playing && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'rgba(255,255,255,0.08)',
            zIndex: 50,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, (scene.t / 110) * 100)}%`,
              background: 'linear-gradient(90deg, #16a34a, #22c55e)',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 10px #22c55e',
            }}
          />
        </div>
      )}

      {/* Play screen */}
      {!playing && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4vh',
          }}
        >
          <div
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '0.95vw',
              fontWeight: 600,
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'rgba(134, 239, 172, 0.55)',
            }}
          >
            xsellio — Trailer · 110 seconds
          </div>
          <button
            onClick={() => setPlaying(true)}
            style={{
              padding: '2.5vh 5vw',
              fontSize: '1.2vw',
              fontWeight: 700,
              letterSpacing: '0.15em',
              fontFamily: 'Barlow, system-ui, sans-serif',
              background: 'transparent',
              color: '#22c55e',
              border: '2px solid #22c55e',
              borderRadius: '0.4vw',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
              e.currentTarget.style.boxShadow = '0 0 60px rgba(34, 197, 94, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(34, 197, 94, 0.4)';
            }}
          >
            ▶ &nbsp; Play Trailer
          </button>
          <div
            style={{
              fontSize: '0.8vw',
              color: 'rgba(238, 243, 240, 0.4)',
              fontFamily: 'system-ui, sans-serif',
              maxWidth: '40vw',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            For best results: switch your browser to fullscreen (F11), set screen to 1920×1080,
            then record with Game Bar (Win+G) or OBS.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Scene wrapper ──────────────────────────────────────────
function Scene({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
}

// ─── Particle field ────────────────────────────────────────
function ParticleField({ active, t }: { active: boolean; t: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: active ? 1 : 0,
        transition: 'opacity 2s ease',
        background:
          'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(22, 163, 74, 0.18) 0%, rgba(14, 26, 18, 0.95) 70%, #000 100%)',
      }}
    >
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (Math.sin(i * 1.7) * 0.5 + 0.5) * 100;
          const y = (Math.cos(i * 2.3) * 0.5 + 0.5) * 100;
          const r = 0.5 + (i % 4) * 0.3;
          const o = 0.15 + ((Math.sin(t * 0.5 + i) * 0.5 + 0.5) * 0.3);
          return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill={`rgba(134, 239, 172, ${o})`} />;
        })}
      </svg>
    </div>
  );
}

// ─── SCENE 0: Opener (0-5s) ────────────────────────────────
function Opener({ t }: { t: number }) {
  const opacity = Math.min(1, Math.max(0, (t - 1.5) / 1.5));
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2vh',
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1.4vw',
          fontWeight: 600,
          letterSpacing: '0.6em',
          textTransform: 'uppercase',
          color: 'rgba(134, 239, 172, 0.55)',
        }}
      >
        For service contractors who hunt their own leads
      </div>
      <div
        style={{
          width: '30vw',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
          marginTop: '1vh',
        }}
      />
    </div>
  );
}

// ─── SCENE 1: Problem stats (5-13s) ────────────────────────
function ProblemStats({ t }: { t: number }) {
  return (
    <>
      <HammerStat t={t} startAt={0.2} big="10 HOURS" small="LOST PER REP, PER WEEK" color="#ef4444" position="left" />
      <HammerStat t={t} startAt={2.0} big="30%" small="OF LEADS WORKED ARE THE WRONG ONES" color="#fbbf24" position="center" />
      <HammerStat t={t} startAt={3.8} big="1 IN 5" small="STRONG LEADS GO COLD" color="#ef4444" position="right" />
    </>
  );
}

function HammerStat({ t, startAt, big, small, color, position }: {
  t: number; startAt: number; big: string; small: string; color: string;
  position: 'left' | 'center' | 'right';
}) {
  const dt = t - startAt;
  const visible = dt > -0.1;
  const scale = dt < 0 ? 0.7 : dt < 0.3 ? 0.7 + (dt / 0.3) * 0.4 : dt < 0.5 ? 1.1 - ((dt - 0.3) / 0.2) * 0.1 : 1.0;
  const opacity = dt < 0 ? 0 : dt < 0.3 ? dt / 0.3 : 1;

  const xOffset = position === 'left' ? '-28vw' : position === 'right' ? '28vw' : '0';

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(calc(-50% + ${xOffset}), -50%) scale(${scale})`,
        opacity,
        textAlign: 'center',
        display: visible ? 'block' : 'none',
      }}
    >
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '5.5vw',
          fontWeight: 900,
          color,
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          textShadow: `0 0 30px ${color}66`,
        }}
      >
        {big}
      </div>
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '0.85vw',
          fontWeight: 700,
          color: 'rgba(238, 243, 240, 0.85)',
          letterSpacing: '0.25em',
          marginTop: '1.5vh',
          textTransform: 'uppercase',
          maxWidth: '22vw',
          margin: '1.5vh auto 0',
        }}
      >
        {small}
      </div>
    </div>
  );
}

// ─── SCENE 2: What If + XSELLIO (13-20s) ───────────────────
function WhatIfXsellio({ t }: { t: number }) {
  // 0-2s: WHAT IF reveal
  // 2-7s: XSELLIO wordmark hero
  if (t < 2.3) {
    const whatIfOp = Math.min(1, Math.max(0, t / 0.4));
    const questionOp = Math.min(1, Math.max(0, (t - 0.6) / 0.5));
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2vh',
        }}
      >
        <div
          style={{
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '1.4vw',
            fontWeight: 700,
            letterSpacing: '0.5em',
            color: 'rgba(134, 239, 172, 0.7)',
            opacity: whatIfOp,
            textTransform: 'uppercase',
          }}
        >
          What if
        </div>
        <div
          style={{
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '3.6vw',
            fontWeight: 800,
            color: '#eef3f0',
            letterSpacing: '-0.025em',
            textAlign: 'center',
            maxWidth: '70vw',
            lineHeight: 1.15,
            opacity: questionOp,
          }}
        >
          the leads found <span style={{ color: '#22c55e' }}>you?</span>
        </div>
      </div>
    );
  }

  // XSELLIO wordmark
  const dt = t - 2.3;
  const eyebrowOp = Math.min(1, Math.max(0, dt / 0.3));
  const scale = dt < 0.6 ? 0.6 + (dt / 0.6) * 0.6 : 1.2 - Math.min(0.2, (dt - 0.6) / 0.3 * 0.2);
  const op = Math.min(1, Math.max(0, (dt - 0.2) / 0.3));
  const glow = Math.min(1, Math.max(0, (dt - 0.5) / 0.5));
  const sweepX = ((dt - 0.7) / 1.0) * 100;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1.1vw',
          fontWeight: 600,
          letterSpacing: '0.5em',
          color: 'rgba(134, 239, 172, 0.65)',
          opacity: eyebrowOp,
          marginBottom: '3vh',
          textTransform: 'uppercase',
        }}
      >
        Introducing
      </div>
      <div
        style={{
          position: 'relative',
          transform: `scale(${scale})`,
          opacity: op,
        }}
      >
        <div
          style={{
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '13vw',
            fontWeight: 900,
            color: '#22c55e',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            textShadow: `0 0 ${glow * 80}px rgba(34, 197, 94, ${glow * 0.6})`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          XSELLIO
        </div>
        {dt > 0.7 && dt < 1.9 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sweepX}%`,
              width: '12vw',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
              filter: 'blur(2px)',
              mixBlendMode: 'overlay',
              transform: 'skewX(-15deg)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── FEATURE CARD WRAPPER ──────────────────────────────────
function FeatureCard({ t, label, title, children }: {
  t: number; label: string; title: string; children: React.ReactNode;
}) {
  const labelOp = Math.min(1, Math.max(0, t / 0.3));
  const titleOp = Math.min(1, Math.max(0, (t - 0.4) / 0.4));
  const exitOp = t > 8.5 ? Math.max(0, 1 - (t - 8.5) / 1.2) : 1;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: '6vh 6vw',
        opacity: exitOp,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.2vw',
          marginBottom: '1vh',
          opacity: labelOp,
        }}
      >
        <div
          style={{
            width: '0.5vw',
            height: '0.5vw',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 12px #22c55e',
          }}
        />
        <div
          style={{
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '0.95vw',
            fontWeight: 700,
            letterSpacing: '0.35em',
            color: '#22c55e',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '4.2vw',
          fontWeight: 800,
          color: '#eef3f0',
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          marginBottom: '4vh',
          opacity: titleOp,
          maxWidth: '70vw',
        }}
      >
        {title}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}

// ─── SCENE 3: DISCOVERY (20-30s) ───────────────────────────
function DiscoveryFeature({ t }: { t: number }) {
  const sources = [
    'Companies House', 'Google Places', 'Yelp',
    'Find a Tender', 'FHRS', 'CQC',
  ];

  // Type out "cold storage Yorkshire"
  const query = 'cold storage Yorkshire';
  const typeStart = 1.2;
  const charsRevealed = Math.max(0, Math.min(query.length, Math.floor((t - typeStart) * 14)));
  const typedText = query.slice(0, charsRevealed);
  const showCursor = t < typeStart + 2.5;

  return (
    <FeatureCard t={t} label="Feature · 01" title="Find the lead.">
      <div style={{ width: '100%', maxWidth: '80vw', display: 'flex', flexDirection: 'column', gap: '4vh' }}>
        {/* Search bar */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(22, 163, 74, 0.40)',
            borderRadius: '0.6vw',
            padding: '2vh 2vw',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2vw',
            boxShadow: '0 0 30px rgba(34, 197, 94, 0.15)',
          }}
        >
          <div
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '1vw',
              color: 'rgba(134, 239, 172, 0.7)',
              fontWeight: 600,
            }}
          >
            ⌕
          </div>
          <div
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '1.8vw',
              color: '#eef3f0',
              fontWeight: 500,
              flex: 1,
            }}
          >
            {typedText}
            {showCursor && (
              <span
                style={{
                  display: 'inline-block',
                  width: '0.15vw',
                  height: '2vw',
                  background: '#22c55e',
                  marginLeft: '0.3vw',
                  verticalAlign: 'middle',
                  animation: 'blink 1s steps(1) infinite',
                }}
              />
            )}
          </div>
        </div>

        {/* Sources grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1vw',
            opacity: Math.min(1, Math.max(0, (t - 3.5) / 0.6)),
          }}
        >
          {sources.map((s, i) => {
            const dt = t - (3.8 + i * 0.18);
            const visible = dt > 0;
            return (
              <div
                key={s}
                style={{
                  background: 'rgba(22, 163, 74, 0.10)',
                  border: '1px solid rgba(22, 163, 74, 0.35)',
                  borderRadius: '0.4vw',
                  padding: '2vh 1vw',
                  textAlign: 'center',
                  fontFamily: 'Barlow, system-ui, sans-serif',
                  fontSize: '0.9vw',
                  fontWeight: 700,
                  color: '#86efac',
                  letterSpacing: '0.05em',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.4s ease',
                }}
              >
                {s}
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: Math.min(1, Math.max(0, (t - 5.5) / 0.5)),
            textAlign: 'center',
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '1.3vw',
            color: 'rgba(238, 243, 240, 0.75)',
            fontWeight: 400,
            fontStyle: 'italic',
          }}
        >
          Six UK data sources. One query. <span style={{ color: '#22c55e', fontWeight: 700, fontStyle: 'normal' }}>Hundreds of leads.</span>
        </div>
      </div>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </FeatureCard>
  );
}

// ─── SCENE 4: SECTOR SCORING (30-40s) ──────────────────────
function ScoringFeature({ t }: { t: number }) {
  const scores = [
    { label: 'GRITTING', value: 92, color: '#22c55e' },
    { label: 'LANDSCAPING', value: 67, color: '#fbbf24' },
    { label: 'PEST CONTROL', value: 34, color: '#ef4444' },
  ];

  return (
    <FeatureCard t={t} label="Feature · 02" title="Score every lead — for every service line.">
      <div style={{ width: '100%', maxWidth: '70vw', display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        {/* Lead name */}
        <div
          style={{
            opacity: Math.min(1, Math.max(0, (t - 1.2) / 0.4)),
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '2vw',
            color: '#eef3f0',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          Yorkshire Cold Chain Ltd
          <span style={{ fontSize: '0.9vw', color: 'rgba(134, 239, 172, 0.7)', marginLeft: '1vw', fontWeight: 500 }}>
            · LS10, Leeds
          </span>
        </div>

        {/* Three score cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5vw' }}>
          {scores.map((s, i) => {
            const dt = t - (1.8 + i * 0.4);
            const visible = dt > 0;
            const animProgress = Math.min(1, Math.max(0, dt / 1.0));
            const displayValue = Math.floor(s.value * animProgress);
            return (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${s.color}55`,
                  borderTop: `3px solid ${s.color}`,
                  borderRadius: '0.4vw',
                  padding: '2.5vh 1.5vw',
                  textAlign: 'center',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.4s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Barlow, system-ui, sans-serif',
                    fontSize: '0.8vw',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    color: 'rgba(238, 243, 240, 0.55)',
                    marginBottom: '1vh',
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: 'Barlow, system-ui, sans-serif',
                    fontSize: '5vw',
                    fontWeight: 900,
                    color: s.color,
                    lineHeight: 1,
                    textShadow: `0 0 30px ${s.color}40`,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {displayValue}
                </div>
                <div
                  style={{
                    fontFamily: 'Barlow, system-ui, sans-serif',
                    fontSize: '0.7vw',
                    color: 'rgba(238, 243, 240, 0.4)',
                    marginTop: '0.5vh',
                  }}
                >
                  /100
                </div>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: Math.min(1, Math.max(0, (t - 5.0) / 0.5)),
            textAlign: 'center',
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '1.3vw',
            color: 'rgba(238, 243, 240, 0.75)',
            fontWeight: 400,
            fontStyle: 'italic',
            marginTop: '1vh',
          }}
        >
          Same lead. <span style={{ color: '#22c55e', fontWeight: 700, fontStyle: 'normal' }}>Three independent scores.</span> Reps know which line to lead with.
        </div>
      </div>
    </FeatureCard>
  );
}

// ─── SCENE 5: TENDER MONITORING (40-50s) ───────────────────
function TenderFeature({ t }: { t: number }) {
  const valueProgress = Math.min(1, Math.max(0, (t - 1.5) / 1.5));
  const easedValue = 1 - Math.pow(1 - valueProgress, 3);
  const currentValue = Math.floor(185 * easedValue);

  const hoursLeft = 71 - Math.floor(t * 0.3);

  return (
    <FeatureCard t={t} label="Feature · 03" title="Catch tenders the moment they go live.">
      <div style={{ width: '100%', maxWidth: '75vw', display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        {/* Tender card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.10), rgba(22, 163, 74, 0.06))',
            border: '1px solid rgba(251, 191, 36, 0.45)',
            borderRadius: '0.6vw',
            padding: '3vh 2.5vw',
            opacity: Math.min(1, Math.max(0, (t - 1.0) / 0.4)),
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2vh' }}>
            <div
              style={{
                fontFamily: 'Barlow, system-ui, sans-serif',
                fontSize: '0.75vw',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: '#fbbf24',
              }}
            >
              ⚠ TENDER · CLOSING SOON
            </div>
            <div
              style={{
                fontFamily: 'Barlow, system-ui, sans-serif',
                fontSize: '0.85vw',
                fontWeight: 700,
                color: '#ef4444',
                letterSpacing: '0.1em',
              }}
            >
              {Math.max(0, hoursLeft)}H REMAINING
            </div>
          </div>
          <div
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '2vw',
              fontWeight: 700,
              color: '#eef3f0',
              letterSpacing: '-0.01em',
              marginBottom: '1.5vh',
            }}
          >
            Leeds City Council — Winter Gritting Contract
          </div>
          <div style={{ display: 'flex', gap: '3vw', alignItems: 'baseline' }}>
            <div>
              <div
                style={{
                  fontFamily: 'Barlow, system-ui, sans-serif',
                  fontSize: '0.7vw',
                  letterSpacing: '0.2em',
                  color: 'rgba(238, 243, 240, 0.45)',
                  marginBottom: '0.4vh',
                }}
              >
                VALUE
              </div>
              <div
                style={{
                  fontFamily: 'Barlow, system-ui, sans-serif',
                  fontSize: '4vw',
                  fontWeight: 900,
                  color: '#fbbf24',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                £{currentValue}k
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'Barlow, system-ui, sans-serif',
                  fontSize: '0.7vw',
                  letterSpacing: '0.2em',
                  color: 'rgba(238, 243, 240, 0.45)',
                  marginBottom: '0.4vh',
                }}
              >
                SOURCE · PUBLISHED 2H AGO
              </div>
              <div
                style={{
                  fontFamily: 'Barlow, system-ui, sans-serif',
                  fontSize: '1vw',
                  color: '#86efac',
                  fontWeight: 600,
                }}
              >
                Contracts Finder
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: Math.min(1, Math.max(0, (t - 5.0) / 0.5)),
            textAlign: 'center',
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '1.3vw',
            color: 'rgba(238, 243, 240, 0.75)',
            fontWeight: 400,
            fontStyle: 'italic',
          }}
        >
          <span style={{ color: '#fbbf24', fontWeight: 700, fontStyle: 'normal' }}>Hours, not weeks.</span>{' '}
          Beat competitors who read about it in trade journals.
        </div>
      </div>
    </FeatureCard>
  );
}

// ─── SCENE 6: AI COPILOT (50-60s) ──────────────────────────
function CopilotFeature({ t }: { t: number }) {
  // Show a chat conversation
  const userQuery = "What's the highest-value lead in Yorkshire I haven't called?";
  const assistantReply = "Yorkshire Cold Chain Ltd, score 92, Leeds LS10. Strong gritting fit. Tendered Contracts Finder yesterday. Recommend opening today.";

  const userOp = Math.min(1, Math.max(0, (t - 1.0) / 0.4));
  const thinkingOp = t > 2.0 && t < 3.2 ? 1 : 0;
  const replyShown = Math.min(assistantReply.length, Math.floor(Math.max(0, t - 3.2) * 30));
  const replyText = assistantReply.slice(0, replyShown);

  return (
    <FeatureCard t={t} label="Feature · 04" title="Ask anything. Get a real answer.">
      <div style={{ width: '100%', maxWidth: '70vw', display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        {/* User bubble */}
        <div
          style={{
            alignSelf: 'flex-end',
            maxWidth: '70%',
            background: 'rgba(22, 163, 74, 0.18)',
            border: '1px solid rgba(22, 163, 74, 0.45)',
            borderRadius: '1.2vw 1.2vw 0.2vw 1.2vw',
            padding: '1.8vh 1.8vw',
            opacity: userOp,
            transform: userOp ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s ease',
          }}
        >
          <div
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '0.7vw',
              letterSpacing: '0.2em',
              color: 'rgba(134, 239, 172, 0.7)',
              marginBottom: '0.6vh',
              fontWeight: 700,
            }}
          >
            YOU
          </div>
          <div
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '1.2vw',
              color: '#eef3f0',
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {userQuery}
          </div>
        </div>

        {/* Thinking dots */}
        {thinkingOp > 0 && (
          <div
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              gap: '0.4vw',
              padding: '1.4vh 1.8vw',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              borderRadius: '1.2vw 1.2vw 1.2vw 0.2vw',
              opacity: thinkingOp,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '0.5vw',
                  height: '0.5vw',
                  borderRadius: '50%',
                  background: '#22c55e',
                  animation: `dotPulse 1.4s ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* Assistant reply */}
        {t > 3.2 && (
          <div
            style={{
              alignSelf: 'flex-start',
              maxWidth: '80%',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '1.2vw 1.2vw 1.2vw 0.2vw',
              padding: '1.8vh 1.8vw',
            }}
          >
            <div
              style={{
                fontFamily: 'Barlow, system-ui, sans-serif',
                fontSize: '0.7vw',
                letterSpacing: '0.2em',
                color: 'rgba(134, 239, 172, 0.7)',
                marginBottom: '0.6vh',
                fontWeight: 700,
              }}
            >
              XSELLIO ASSISTANT
            </div>
            <div
              style={{
                fontFamily: 'Barlow, system-ui, sans-serif',
                fontSize: '1.2vw',
                color: '#eef3f0',
                fontWeight: 500,
                lineHeight: 1.4,
                minHeight: '4vh',
              }}
            >
              {replyText}
              {replyShown < assistantReply.length && (
                <span style={{ color: '#22c55e' }}>▍</span>
              )}
            </div>
          </div>
        )}

        {/* Tagline */}
        {t > 8.2 && (
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '1.3vw',
              color: 'rgba(238, 243, 240, 0.75)',
              fontWeight: 400,
              fontStyle: 'italic',
              opacity: Math.min(1, (t - 8.2) / 0.5),
              marginTop: '1vh',
            }}
          >
            Grounded in your live data. <span style={{ color: '#22c55e', fontWeight: 700, fontStyle: 'normal' }}>No hallucinations.</span>
          </div>
        )}
      </div>
      <style>{`
        @keyframes dotPulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </FeatureCard>
  );
}

// ─── SCENE 7: PIPELINE + ACTION CENTRE (60-70s) ────────────
function PipelineFeature({ t }: { t: number }) {
  const stages = [
    { name: 'NEW', count: 247, color: '#86efac' },
    { name: 'CONTACTED', count: 89, color: '#22c55e' },
    { name: 'QUOTED', count: 34, color: '#fbbf24' },
    { name: 'WON', count: 12, color: '#22c55e' },
  ];

  const alerts = [
    { type: 'critical', text: 'Leeds tender closing in 71h', color: '#ef4444' },
    { type: 'warning', text: 'Yorkshire Cold Chain — overdue 2 days', color: '#fbbf24' },
    { type: 'info', text: '3 new strong leads since yesterday', color: '#22c55e' },
  ];

  return (
    <FeatureCard t={t} label="Feature · 05" title="Every morning, prioritised. Every action, logged.">
      <div style={{ width: '100%', maxWidth: '75vw', display: 'flex', flexDirection: 'column', gap: '3vh' }}>
        {/* Pipeline stages */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1vw' }}>
          {stages.map((s, i) => {
            const dt = t - (1.0 + i * 0.18);
            const visible = dt > 0;
            const animProgress = Math.min(1, Math.max(0, dt / 1.0));
            const display = Math.floor(s.count * animProgress);
            return (
              <div
                key={s.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${s.color}40`,
                  borderTop: `3px solid ${s.color}`,
                  borderRadius: '0.4vw',
                  padding: '2vh 1vw',
                  textAlign: 'center',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.4s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Barlow, system-ui, sans-serif',
                    fontSize: '0.75vw',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    color: 'rgba(238, 243, 240, 0.55)',
                    marginBottom: '0.8vh',
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{
                    fontFamily: 'Barlow, system-ui, sans-serif',
                    fontSize: '3.2vw',
                    fontWeight: 900,
                    color: s.color,
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {display}
                </div>
              </div>
            );
          })}
        </div>

        {/* Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
          <div
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '0.8vw',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#22c55e',
              textTransform: 'uppercase',
              opacity: Math.min(1, Math.max(0, (t - 2.5) / 0.4)),
            }}
          >
            ⚡ Action Centre · Auto-Prioritised
          </div>
          {alerts.map((a, i) => {
            const dt = t - (3.0 + i * 0.4);
            const visible = dt > 0;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1vw',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: `3px solid ${a.color}`,
                  borderRadius: '0 0.3vw 0.3vw 0',
                  padding: '1.5vh 1.5vw',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.4s ease',
                }}
              >
                <div
                  style={{
                    width: '0.5vw',
                    height: '0.5vw',
                    borderRadius: '50%',
                    background: a.color,
                    boxShadow: `0 0 10px ${a.color}`,
                  }}
                />
                <div
                  style={{
                    fontFamily: 'Barlow, system-ui, sans-serif',
                    fontSize: '1.1vw',
                    color: '#eef3f0',
                    fontWeight: 500,
                  }}
                >
                  {a.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        {t > 7.5 && (
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '1.3vw',
              color: 'rgba(238, 243, 240, 0.75)',
              fontWeight: 400,
              fontStyle: 'italic',
              opacity: Math.min(1, (t - 7.5) / 0.5),
            }}
          >
            <span style={{ color: '#22c55e', fontWeight: 700, fontStyle: 'normal' }}>The system decides what's urgent.</span> Reps just work the list.
          </div>
        )}
      </div>
    </FeatureCard>
  );
}

// ─── SCENE 8: FIND. SCORE. WIN. (70-80s) ───────────────────
function FindScoreWin({ t }: { t: number }) {
  const words = [
    { word: 'FIND', color: '#22c55e', startAt: 0.3 },
    { word: 'SCORE', color: '#22c55e', startAt: 1.6 },
    { word: 'WIN', color: '#fbbf24', startAt: 2.9 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1vh',
      }}
    >
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1vw',
          fontWeight: 600,
          letterSpacing: '0.4em',
          color: 'rgba(134, 239, 172, 0.55)',
          textTransform: 'uppercase',
          marginBottom: '2vh',
          opacity: t > 0.1 ? 1 : 0,
        }}
      >
        Lead intelligence, in one platform
      </div>
      {words.map((w) => {
        const dt = t - w.startAt;
        const visible = dt > 0;
        const scale = !visible ? 1.4 : dt < 0.2 ? 1.4 - (dt / 0.2) * 0.4 : dt < 0.35 ? 1.0 + ((dt - 0.2) / 0.15) * 0.05 : 1.0;
        const opacity = !visible ? 0 : dt < 0.15 ? dt / 0.15 : 1;
        return (
          <div
            key={w.word}
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '7vw',
              fontWeight: 900,
              color: w.color,
              letterSpacing: '-0.035em',
              lineHeight: 1,
              transform: `scale(${scale})`,
              opacity,
              textShadow: `0 0 50px ${w.color}40`,
            }}
          >
            {w.word}.
          </div>
        );
      })}
    </div>
  );
}

// ─── SCENE 9: +£945k (80-90s) ──────────────────────────────
function NumberReveal({ t }: { t: number }) {
  const progress = Math.min(1, t / 2.5);
  const eased = 1 - Math.pow(1 - progress, 3);
  const currentNum = Math.floor(945 * eased);

  const eyebrowOp = Math.min(1, Math.max(0, t / 0.5));
  const numberOp = Math.min(1, Math.max(0, (t - 0.3) / 0.4));
  const subtitleOp = Math.min(1, Math.max(0, (t - 3.0) / 0.6));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1.1vw',
          fontWeight: 600,
          letterSpacing: '0.4em',
          color: 'rgba(134, 239, 172, 0.65)',
          opacity: eyebrowOp,
          marginBottom: '3vh',
          textTransform: 'uppercase',
        }}
      >
        Modelled Annual Uplift · 10-Rep Pilot
      </div>
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '11vw',
          fontWeight: 900,
          color: '#22c55e',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          opacity: numberOp,
          textShadow: '0 0 80px rgba(34, 197, 94, 0.5)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        +£{currentNum}k
      </div>
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1.2vw',
          fontWeight: 500,
          letterSpacing: '0.25em',
          color: 'rgba(238, 243, 240, 0.7)',
          opacity: subtitleOp,
          marginTop: '3vh',
          textTransform: 'uppercase',
        }}
      >
        Per year · Modest case · Nurture's own benchmarks
      </div>
    </div>
  );
}

// ─── SCENE 10: Differentiator (90-100s) ────────────────────
function Differentiator({ t }: { t: number }) {
  const competitors = ['ZoomInfo', 'Cognism', 'Glenigan', 'Barbour ABI', 'FieldRoutes', 'HubSpot', 'Salesforce'];
  const op = Math.min(1, Math.max(0, t / 0.5));
  const lineOp = Math.min(1, Math.max(0, (t - 2.5) / 0.5));
  const finalOp = Math.min(1, Math.max(0, (t - 5.0) / 0.5));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8vw',
        gap: '4vh',
      }}
    >
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1vw',
          letterSpacing: '0.4em',
          color: 'rgba(134, 239, 172, 0.55)',
          textTransform: 'uppercase',
          opacity: op,
        }}
      >
        The competitive landscape
      </div>

      {/* Competitor names with strikethroughs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5vw',
          opacity: op,
        }}
      >
        {competitors.map((c, i) => {
          const dt = t - (0.5 + i * 0.18);
          const visible = dt > 0;
          const strikeProgress = Math.min(1, Math.max(0, dt - 0.3));
          return (
            <div
              key={c}
              style={{
                position: 'relative',
                fontFamily: 'Barlow, system-ui, sans-serif',
                fontSize: '2vw',
                fontWeight: 700,
                color: 'rgba(238, 243, 240, 0.4)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.3s ease',
                letterSpacing: '-0.01em',
              }}
            >
              {c}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: `${(1 - strikeProgress) * 100}%`,
                  top: '50%',
                  height: '2px',
                  background: '#ef4444',
                  transition: 'right 0.4s ease',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* The line */}
      <div
        style={{
          opacity: lineOp,
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '3vw',
          fontWeight: 800,
          color: '#eef3f0',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          lineHeight: 1.1,
          maxWidth: '70vw',
          marginTop: '2vh',
        }}
      >
        No one else does this combination.
      </div>

      <div
        style={{
          opacity: finalOp,
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1.3vw',
          fontWeight: 500,
          color: '#22c55e',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        Built for service contractors — by one.
      </div>
    </div>
  );
}

// ─── SCENE 11: BUILT. LIVE. READY. (100-108s) ──────────────
function BuiltLiveReady({ t }: { t: number }) {
  const words = [
    { word: 'BUILT.', startAt: 0.2 },
    { word: 'LIVE.', startAt: 1.4 },
    { word: 'READY.', startAt: 2.6 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3vw',
      }}
    >
      {words.map((w) => {
        const dt = t - w.startAt;
        const visible = dt > 0;
        const tx = !visible ? -20 : dt < 0.3 ? -20 + (dt / 0.3) * 20 : 0;
        const op = !visible ? 0 : dt < 0.2 ? dt / 0.2 : 1;
        return (
          <div
            key={w.word}
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '5.5vw',
              fontWeight: 900,
              color: '#eef3f0',
              letterSpacing: '-0.03em',
              opacity: op,
              transform: `translateY(${tx}px)`,
              borderBottom: visible ? '4px solid #22c55e' : 'none',
              paddingBottom: '0.5vh',
            }}
          >
            {w.word}
          </div>
        );
      })}
    </div>
  );
}

// ─── SCENE 12: Final hero (108-110s) ──────────────────────
function FinalHero({ t }: { t: number }) {
  const wordmarkOp = Math.min(1, Math.max(0, t / 0.6));
  const taglineOp = Math.min(1, Math.max(0, (t - 0.5) / 0.5));
  const urlOp = Math.min(1, Math.max(0, (t - 1.0) / 0.6));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8vw',
          opacity: wordmarkOp,
          marginBottom: '2vh',
        }}
      >
        <div
          style={{
            width: '0.6vw',
            height: '0.6vw',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 12px #22c55e',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '0.9vw',
            fontWeight: 700,
            letterSpacing: '0.35em',
            color: 'rgba(134, 239, 172, 0.85)',
            textTransform: 'uppercase',
          }}
        >
          Live · Production · v2.44
        </span>
      </div>
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '15vw',
          fontWeight: 900,
          color: '#22c55e',
          letterSpacing: '-0.045em',
          lineHeight: 0.9,
          opacity: wordmarkOp,
          textShadow: '0 0 100px rgba(34, 197, 94, 0.6)',
        }}
      >
        XSELLIO
      </div>
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1.8vw',
          fontWeight: 500,
          color: 'rgba(238, 243, 240, 0.85)',
          letterSpacing: '0.05em',
          marginTop: '1vh',
          opacity: taglineOp,
          fontStyle: 'italic',
        }}
      >
        Find. Score. Win.
      </div>
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1vw',
          fontWeight: 600,
          letterSpacing: '0.3em',
          color: 'rgba(134, 239, 172, 0.6)',
          marginTop: '4vh',
          opacity: urlOp,
          textTransform: 'uppercase',
        }}
      >
        xsellio.com
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
