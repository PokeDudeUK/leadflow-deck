import type { SlideProps } from '../slides';
import { useEffect, useState, useMemo } from 'react';

// ── Rotating taglines ─────────────────────────────────────
const TAGLINES = [
  'Lead intelligence.',
  'Pipeline operations.',
  'Domain-aware AI.',
];

// ── Live ticker stats ─────────────────────────────────────
const TICKER_STATS: { label: string; target: number; suffix?: string }[] = [
  { label: 'LEADS INDEXED',    target: 2847 },
  { label: 'STRONG (≥70)',     target: 412 },
  { label: 'TENDERS LIVE',     target: 23 },
  { label: 'BUILD',            target: 244, suffix: '' }, // shows as v2.44 below
];

// Count-up
function useCountUp(target: number, isActive: boolean, delayMs: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!isActive) {
      setVal(0);
      return;
    }
    setVal(0);
    const startDelay = setTimeout(() => {
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delayMs);
    return () => clearTimeout(startDelay);
  }, [target, isActive, delayMs]);
  return val;
}

// Rotating tagline state
function useRotatingIndex(length: number, isActive: boolean, intervalMs: number, startDelay: number) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!isActive) {
      setIdx(0);
      return;
    }
    setIdx(0);
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setIdx((i) => (i + 1) % length);
      }, intervalMs);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [length, isActive, intervalMs, startDelay]);
  return idx;
}

export default function TitleSlide({ isActive }: SlideProps) {
  const taglineIdx = useRotatingIndex(TAGLINES.length, isActive, 2800, 2200);

  // Pre-generate particle positions so they don't re-randomise on every render
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 12,
        opacity: 0.2 + Math.random() * 0.4,
      })),
    []
  );

  return (
    <div className="slide-content" style={{ background: '#0a1310', overflow: 'hidden' }}>
      {/* Hero photo with slow zoom */}
      <img
        src="./assets/hero-fields.jpg"
        alt=""
        className={isActive ? 'anim-zoom' : ''}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.32,
          filter: 'saturate(1.1) contrast(1.05)',
        }}
      />

      {/* Multi-layer gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(10,19,16,0.96) 0%, rgba(10,19,16,0.55) 50%, rgba(10,19,16,0.92) 100%)',
        }}
      />

      {/* Vignette — pulls eye to centre */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(10,19,16,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Animated grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(22,163,74,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.07) 1px, transparent 1px)',
          backgroundSize: '4vw 4vw',
          maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 78%)',
        }}
      />

      {/* Drifting particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: '#22c55e',
              opacity: isActive ? p.opacity : 0,
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
              animation: isActive ? `particle-drift ${p.duration}s ${p.delay}s linear infinite` : 'none',
              transition: 'opacity 1s ease',
            }}
          />
        ))}
      </div>

      {/* Soft green glow behind wordmark */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '46%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '40vh',
          background: 'radial-gradient(ellipse, rgba(34, 197, 94, 0.18) 0%, transparent 70%)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 1.4s ease 0.4s',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      {/* Top accent stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '0.5vh',
          background: 'linear-gradient(90deg, transparent, #16a34a 20%, #22c55e 50%, #16a34a 80%, transparent)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Bottom thin stripe */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '0.2vh',
          background: 'rgba(22, 163, 74, 0.4)',
        }}
      />

      {/* ─── Main content ────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 9vw',
          zIndex: 10,
        }}
      >
        {/* Eyebrow with live dot */}
        <div
          className="font-mono"
          style={{
            fontSize: '0.95vw',
            color: '#86efac',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '3.5vh',
            display: 'flex',
            alignItems: 'center',
            gap: '0.9vw',
            opacity: 0,
            animation: isActive ? 'card-up 0.8s 0.3s ease forwards' : 'none',
          }}
        >
          <span
            className="anim-pulse"
            style={{
              width: '0.6vw',
              height: '0.6vw',
              borderRadius: '50%',
              background: '#22c55e',
              display: 'inline-block',
              boxShadow: '0 0 12px #22c55e',
            }}
          />
          Nurture Group
          <span style={{ color: 'rgba(134, 239, 172, 0.4)' }}>·</span>
          CCO + IT Briefing
          <span style={{ color: 'rgba(134, 239, 172, 0.4)' }}>·</span>
          May 2026
        </div>

        {/* Wordmark with sweep light */}
        <div style={{ position: 'relative', marginBottom: '2vh' }}>
          <h1
            className="font-display"
            style={{
              fontSize: '9.5vw',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.035em',
              color: '#eef3f0',
              textWrap: 'balance' as const,
              opacity: 0,
              animation: isActive ? 'word-reveal 1s 0.5s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
              position: 'relative',
              zIndex: 2,
              textShadow: '0 0 60px rgba(0,0,0,0.5)',
            }}
          >
            Nurture{' '}
            <span
              style={{
                color: '#22c55e',
                position: 'relative',
                display: 'inline-block',
                opacity: 0,
                animation: isActive ? 'lead-flow-glow 1.2s 1.0s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
              }}
            >
              LeadFlow
            </span>
          </h1>

          {/* Sweep light streak */}
          <div
            className={isActive ? 'sweep-light' : ''}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              pointerEvents: 'none',
              zIndex: 3,
              overflow: 'hidden',
            }}
          />
        </div>

        {/* Accent rule */}
        <div
          style={{
            width: 0,
            height: '0.4vh',
            background: 'linear-gradient(90deg, #22c55e, rgba(34, 197, 94, 0))',
            marginBottom: '3vh',
            boxShadow: '0 0 12px rgba(34, 197, 94, 0.6)',
            animation: isActive ? 'rule-grow-hero 1s 1.6s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          }}
        />

        {/* Big tagline — Find. Score. Win. */}
        <div
          className="font-display"
          style={{
            fontSize: '3vw',
            fontWeight: 600,
            color: 'rgba(238, 243, 240, 0.92)',
            fontStyle: 'italic',
            letterSpacing: '-0.015em',
            marginBottom: '1.8vh',
            opacity: 0,
            animation: isActive ? 'card-up 0.8s 1.8s ease forwards' : 'none',
          }}
        >
          <span style={{ color: '#22c55e' }}>Find.</span>
          {' '}
          <span style={{ color: '#86efac' }}>Score.</span>
          {' '}
          <span style={{ color: '#fbbf24' }}>Win.</span>
        </div>

        {/* Rotating tagline */}
        <div
          style={{
            height: '2.8vh',
            opacity: 0,
            animation: isActive ? 'card-up 0.7s 2.2s ease forwards' : 'none',
            position: 'relative',
            marginBottom: '2.2vh',
          }}
        >
          {TAGLINES.map((tag, i) => (
            <div
              key={tag}
              className="font-body"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                fontSize: '1.5vw',
                fontWeight: 400,
                color: 'rgba(134, 239, 172, 0.85)',
                letterSpacing: '-0.005em',
                opacity: i === taglineIdx ? 1 : 0,
                transform: i === taglineIdx ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Service line */}
        <div
          className="font-mono"
          style={{
            fontSize: '1vw',
            fontWeight: 500,
            color: 'rgba(238, 243, 240, 0.55)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity: 0,
            animation: isActive ? 'card-up 0.7s 2.5s ease forwards' : 'none',
          }}
        >
          For Gritting · Landscaping · Pest Control
        </div>
      </div>

      {/* ─── Live ticker — bottom strip ────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '4vh',
          left: '9vw',
          right: '9vw',
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          paddingTop: '2.5vh',
          borderTop: '1px solid rgba(22, 163, 74, 0.22)',
          opacity: 0,
          animation: isActive ? 'card-up 0.8s 2.8s ease forwards' : 'none',
          zIndex: 10,
        }}
      >
        {/* LIVE indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', marginRight: '2.5vw' }}>
          <span
            className="anim-pulse"
            style={{
              width: '0.55vw',
              height: '0.55vw',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 10px #22c55e',
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: '0.78vw',
              fontWeight: 700,
              letterSpacing: '0.28em',
              color: '#22c55e',
            }}
          >
            LIVE · v2.44
          </span>
        </div>

        <Divider />

        {TICKER_STATS.slice(0, 3).map((stat, i) => (
          <TickerStat
            key={stat.label}
            label={stat.label}
            target={stat.target}
            isActive={isActive}
            delay={3000 + i * 180}
            withDivider={i < 2}
          />
        ))}

        <Divider />

        {/* URL on the right */}
        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4vh' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '0.7vw',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: 'rgba(134, 239, 172, 0.6)',
              textTransform: 'uppercase',
            }}
          >
            URL
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: '0.92vw',
              fontWeight: 500,
              color: '#eef3f0',
            }}
          >
            leadflow-python-production.up.railway.app
          </span>
        </div>
      </div>

      {/* All animations */}
      <style>{`
        @keyframes word-reveal {
          from { opacity: 0; transform: translateY(20px); filter: blur(8px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes lead-flow-glow {
          0%   { opacity: 0; transform: scale(0.96); text-shadow: 0 0 0 rgba(34, 197, 94, 0); }
          50%  { opacity: 1; transform: scale(1.02); text-shadow: 0 0 40px rgba(34, 197, 94, 0.8), 0 0 80px rgba(34, 197, 94, 0.4); }
          100% { opacity: 1; transform: scale(1); text-shadow: 0 0 24px rgba(34, 197, 94, 0.35); }
        }
        @keyframes rule-grow-hero {
          from { width: 0; opacity: 0; }
          to   { width: 8vw; opacity: 1; }
        }
        @keyframes sweep-light {
          0%   { transform: translateX(-100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .sweep-light::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 30%;
          background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.18) 50%, transparent);
          mix-blend-mode: screen;
          animation: sweep-light 2.2s 1.4s cubic-bezier(0.22,1,0.36,1) forwards;
          left: -30%;
        }
        @keyframes particle-drift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(20px, -30px); }
          50%  { transform: translate(-15px, -50px); }
          75%  { transform: translate(25px, -75px); }
          100% { transform: translate(0, -110px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Live ticker stat with count-up ───
function TickerStat({
  label,
  target,
  isActive,
  delay,
  withDivider,
}: {
  label: string;
  target: number;
  isActive: boolean;
  delay: number;
  withDivider: boolean;
}) {
  const v = useCountUp(target, isActive, delay);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh' }}>
        <span
          className="font-mono"
          style={{
            fontSize: '0.7vw',
            fontWeight: 600,
            letterSpacing: '0.22em',
            color: 'rgba(134, 239, 172, 0.6)',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        <span
          className="font-display"
          style={{
            fontSize: '1.3vw',
            fontWeight: 700,
            color: '#eef3f0',
            letterSpacing: '-0.01em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {v.toLocaleString()}
        </span>
      </div>
      {withDivider && <Divider />}
    </>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: '1px',
        height: '4vh',
        background: 'rgba(22, 163, 74, 0.22)',
        margin: '0 2vw',
      }}
    />
  );
}
