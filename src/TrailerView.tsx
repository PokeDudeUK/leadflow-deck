import { useEffect, useState, useRef } from 'react';

/**
 * xsellio — Trailer
 *
 * A purpose-built cinematic 60-second sequence at /trailer
 *
 * Designed to be screen-recorded in a 1920×1080 viewport for export to MP4.
 * Plays once on click; black before, holds final frame after.
 *
 * Timeline (60s total):
 *  0.0–4.0s   Black hold → faint particle field appears
 *  4.0–9.0s   Three hammer-blow lines: "10 HOURS LOST" / "30% WRONG" / "1 IN 5 COLD"
 *  9.0–13.0s  Hard cut to black → green light bar sweeps across
 *  13.0–18.0s "WHAT IF" reveals + question
 *  18.0–24.0s XSELLIO wordmark — full hero reveal
 *  24.0–32.0s "FIND. SCORE. WIN." with each word punching in
 *  32.0–40.0s Big number reveal: +£945,000
 *  40.0–48.0s Subtitle: "Built. Live. Ready."
 *  48.0–58.0s Final hero card — XSELLIO with tagline
 *  58.0–60.0s Hold final frame
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

  // Animation loop
  useEffect(() => {
    if (!playing) return;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startRef.current) / 1000;
      // Determine phase
      let phase = 0;
      if (elapsed < 4) phase = 0;
      else if (elapsed < 9) phase = 1;
      else if (elapsed < 13) phase = 2;
      else if (elapsed < 18) phase = 3;
      else if (elapsed < 24) phase = 4;
      else if (elapsed < 32) phase = 5;
      else if (elapsed < 40) phase = 6;
      else if (elapsed < 48) phase = 7;
      else if (elapsed < 58) phase = 8;
      else phase = 9;

      setScene({ phase, t: elapsed });

      if (elapsed < 60) {
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
      {/* Persistent background particles */}
      <ParticleField active={playing && scene.t >= 1.5} t={scene.t} />

      {/* SCENE 0 — opening hold + particle field rise (0–4s) */}
      <Scene active={scene.phase === 0 && playing}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: Math.min(1, Math.max(0, (scene.t - 2.5) / 1.0)),
          }}
        >
          <div
            style={{
              fontFamily: 'Barlow, system-ui, sans-serif',
              fontSize: '1.6vw',
              fontWeight: 600,
              letterSpacing: '0.6em',
              textTransform: 'uppercase',
              color: 'rgba(134, 239, 172, 0.55)',
            }}
          >
            Every Day · In Every Service Business
          </div>
        </div>
      </Scene>

      {/* SCENE 1 — three hammer-blow problem stats (4–9s) */}
      <Scene active={scene.phase === 1 && playing}>
        <HammerStat
          t={scene.t}
          startAt={4.0}
          big="10 HOURS"
          small="LOST PER REP, PER WEEK"
          color="#ef4444"
          position="left"
        />
        <HammerStat
          t={scene.t}
          startAt={5.5}
          big="30%"
          small="OF LEADS WORKED ARE THE WRONG ONES"
          color="#fbbf24"
          position="center"
        />
        <HammerStat
          t={scene.t}
          startAt={7.0}
          big="1 IN 5"
          small="STRONG LEADS GO COLD"
          color="#ef4444"
          position="right"
        />
      </Scene>

      {/* SCENE 2 — green sweep transition (9–13s) */}
      <Scene active={scene.phase === 2 && playing}>
        <GreenSweep t={scene.t - 9} />
      </Scene>

      {/* SCENE 3 — "WHAT IF" question (13–18s) */}
      <Scene active={scene.phase === 3 && playing}>
        <WhatIfReveal t={scene.t - 13} />
      </Scene>

      {/* SCENE 4 — XSELLIO wordmark hero (18–24s) */}
      <Scene active={scene.phase === 4 && playing}>
        <XsellioReveal t={scene.t - 18} />
      </Scene>

      {/* SCENE 5 — "FIND. SCORE. WIN." (24–32s) */}
      <Scene active={scene.phase === 5 && playing}>
        <FindScoreWin t={scene.t - 24} />
      </Scene>

      {/* SCENE 6 — +£945,000 reveal (32–40s) */}
      <Scene active={scene.phase === 6 && playing}>
        <NumberReveal t={scene.t - 32} />
      </Scene>

      {/* SCENE 7 — "Built. Live. Ready." (40–48s) */}
      <Scene active={scene.phase === 7 && playing}>
        <BuiltLiveReady t={scene.t - 40} />
      </Scene>

      {/* SCENE 8/9 — Final hero card with tagline (48–60s) */}
      <Scene active={(scene.phase === 8 || scene.phase === 9) && playing}>
        <FinalHero t={scene.t - 48} />
      </Scene>

      {/* Persistent gradient accent stripe at top */}
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

      {/* Play screen (before trailer starts) */}
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
            xsellio — Trailer · 60 seconds
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
            For best results, switch your browser to fullscreen (F11) before recording.
            Screen-record at 1920×1080 resolution.
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

// ─── Particle field (persistent background) ─────────────────
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

// ─── HammerStat — bold stat that punches in ─────────────────
function HammerStat({ t, startAt, big, small, color, position }: {
  t: number; startAt: number; big: string; small: string; color: string;
  position: 'left' | 'center' | 'right';
}) {
  const dt = t - startAt;
  const visible = dt > 0 && dt < 3.5;
  const scale = dt < 0 ? 0.7 : dt < 0.3 ? 0.7 + (dt / 0.3) * 0.4 : dt < 0.5 ? 1.1 - ((dt - 0.3) / 0.2) * 0.1 : 1.0;
  const opacity = dt < 0 ? 0 : dt < 0.3 ? dt / 0.3 : dt < 3.0 ? 1 : Math.max(0, 1 - (dt - 3.0) / 0.5);

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
        display: visible || dt < 4 ? 'block' : 'none',
      }}
    >
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '6vw',
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
          fontSize: '0.9vw',
          fontWeight: 700,
          color: 'rgba(238, 243, 240, 0.85)',
          letterSpacing: '0.25em',
          marginTop: '1.5vh',
          textTransform: 'uppercase',
        }}
      >
        {small}
      </div>
    </div>
  );
}

// ─── GreenSweep — transition bar (9–13s) ────────────────────
function GreenSweep({ t }: { t: number }) {
  // Bar sweeps from left to right over 1.2s, then "WHAT IF" begins
  const sweepProgress = Math.min(1, t / 1.2);
  const x = sweepProgress * 110 - 5; // -5% to 105%
  const flashOpacity = t < 1.2 ? 1 : Math.max(0, 1 - (t - 1.2) * 2);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${x}%`,
          width: '10vw',
          background: 'linear-gradient(90deg, transparent 0%, #22c55e 50%, transparent 100%)',
          opacity: flashOpacity,
          filter: 'blur(2px)',
        }}
      />
      {t > 0.6 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(22, 163, 74, 0.15)',
            opacity: Math.max(0, 1 - Math.abs(t - 1.0) * 2),
          }}
        />
      )}
    </div>
  );
}

// ─── WhatIfReveal — question (13–18s) ───────────────────────
function WhatIfReveal({ t }: { t: number }) {
  const whatIfOpacity = Math.min(1, Math.max(0, t / 0.5));
  const questionOpacity = Math.min(1, Math.max(0, (t - 0.8) / 0.6));
  const ifReps = Math.min(1, Math.max(0, (t - 1.4) / 0.6));

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
          opacity: whatIfOpacity,
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
          opacity: questionOpacity,
        }}
      >
        the leads found <span style={{ color: '#22c55e' }}>you?</span>
      </div>
      <div
        style={{
          fontFamily: 'Barlow, system-ui, sans-serif',
          fontSize: '1vw',
          fontWeight: 600,
          color: 'rgba(134, 239, 172, 0.6)',
          letterSpacing: '0.2em',
          marginTop: '2vh',
          textTransform: 'uppercase',
          opacity: ifReps,
        }}
      >
        Scored. Sorted. Waiting.
      </div>
    </div>
  );
}

// ─── XsellioReveal — wordmark hero (18–24s) ────────────────
function XsellioReveal({ t }: { t: number }) {
  const eyebrowOp = Math.min(1, Math.max(0, t / 0.4));
  const wordmarkScale = t < 0.8 ? 0.6 + (t / 0.8) * 0.6 : 1.2 - Math.min(0.2, (t - 0.8) / 0.3 * 0.2);
  const wordmarkOp = Math.min(1, Math.max(0, (t - 0.3) / 0.4));
  const glowIntensity = Math.min(1, Math.max(0, (t - 0.7) / 0.6));
  const sweepX = ((t - 0.9) / 1.2) * 100;

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
          transform: `scale(${wordmarkScale})`,
          opacity: wordmarkOp,
          transition: 'transform 0.2s ease',
        }}
      >
        <div
          style={{
            fontFamily: 'Barlow, system-ui, sans-serif',
            fontSize: '14vw',
            fontWeight: 900,
            color: '#22c55e',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            textShadow: `0 0 ${glowIntensity * 80}px rgba(34, 197, 94, ${glowIntensity * 0.6})`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          XSELLIO
        </div>
        {/* Sweep highlight */}
        {t > 0.9 && t < 2.2 && (
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

// ─── FindScoreWin — three words punch in (24–32s) ──────────
function FindScoreWin({ t }: { t: number }) {
  // Three words land at t=0.3, 1.6, 2.9
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

// ─── NumberReveal — +£945,000 (32–40s) ──────────────────────
function NumberReveal({ t }: { t: number }) {
  // Number counts up
  const startNum = 0;
  const endNum = 945;
  const progress = Math.min(1, t / 2.0);
  // Ease out cubic
  const eased = 1 - Math.pow(1 - progress, 3);
  const currentNum = Math.floor(startNum + (endNum - startNum) * eased);

  const eyebrowOp = Math.min(1, Math.max(0, t / 0.5));
  const numberOp = Math.min(1, Math.max(0, (t - 0.3) / 0.4));
  const subtitleOp = Math.min(1, Math.max(0, (t - 2.5) / 0.6));

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
        Modelled Annual Uplift
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
        Per year · 10-rep pilot · Modest case
      </div>
    </div>
  );
}

// ─── BuiltLiveReady — three words stamp in (40–48s) ────────
function BuiltLiveReady({ t }: { t: number }) {
  const words = [
    { word: 'BUILT.', startAt: 0.2 },
    { word: 'LIVE.', startAt: 1.6 },
    { word: 'READY.', startAt: 3.0 },
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

// ─── FinalHero — closing card (48–60s) ──────────────────────
function FinalHero({ t }: { t: number }) {
  const wordmarkOp = Math.min(1, Math.max(0, t / 0.8));
  const taglineOp = Math.min(1, Math.max(0, (t - 1.0) / 0.8));
  const urlOp = Math.min(1, Math.max(0, (t - 2.2) / 0.8));

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
      {/* Live indicator */}
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
