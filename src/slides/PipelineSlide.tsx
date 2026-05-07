import type { SlideProps } from '../slides';
import { useEffect, useState } from 'react';

const STAGES = [
  { label: 'Discovery', count: 847 },
  { label: 'Review', count: 204 },
  { label: 'Qualified', count: 118 },
  { label: 'Assigned', count: 63 },
  { label: 'Contacted', count: 41 },
  { label: 'Site Visit', count: 22 },
  { label: 'Quote', count: 17 },
  { label: 'Won', count: 34 },
];

function useCountUp(target: number, isActive: boolean, delayMs: number) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setVal(0);
      return;
    }
    setVal(0);
    const startDelay = setTimeout(() => {
      const duration = 1200;
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

function PipeStage({ label, count, isActive, delay, won }: { label: string; count: number; isActive: boolean; delay: number; won: boolean }) {
  const val = useCountUp(count, isActive, delay);
  return (
    <div
      className={isActive ? 'anim-card' : ''}
      style={{
        background: won ? 'linear-gradient(135deg, rgba(22, 163, 74, 0.20), rgba(251, 191, 36, 0.18))' : 'rgba(255, 255, 255, 0.04)',
        border: won ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '0.5vw',
        padding: '4.5vh 0.8vw',
        textAlign: 'center',
        position: 'relative',
        animationDelay: `${delay / 1000}s`,
        boxShadow: won ? '0 0 24px rgba(251, 191, 36, 0.22)' : 'none',
      }}
    >
      <div
        className="font-display"
        style={{
          fontSize: '3.2vw',
          fontWeight: 800,
          color: won ? '#fbbf24' : '#22c55e',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {val}
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: '0.8vw',
          fontWeight: 600,
          color: won ? '#fbbf24' : 'rgba(238, 243, 240, 0.6)',
          marginTop: '1.4vh',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function PipelineSlide({ isActive }: SlideProps) {
  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '8vh 5vw 6vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '2vh' }}>
          From cold to closed
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: '3.1vw',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#eef3f0',
            marginBottom: '2vh',
          }}
        >
          Eight stages. One pipeline. Every action logged.
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: '1.05vw',
            lineHeight: 1.55,
            color: 'rgba(238, 243, 240, 0.65)',
            maxWidth: '78vw',
            marginBottom: '5vh',
          }}
        >
          Every lead moves through the same pipeline regardless of service line. Each transition is timestamped,
          attributed to a rep, and audit-logged. Stale leads surface automatically.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '0.8vw',
            marginBottom: '5vh',
          }}
        >
          {STAGES.map((s, i) => (
            <PipeStage
              key={s.label}
              label={s.label}
              count={s.count}
              isActive={isActive}
              delay={200 + i * 90}
              won={i === STAGES.length - 1}
            />
          ))}
        </div>

        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.2vw',
            marginTop: '6vh',
          }}
        >
          {[
            { tag: 'TIMESTAMPED', body: 'Every stage transition recorded with rep, time, and reason.' },
            { tag: 'AUTOMATIC ALERTS', body: 'Stale leads (no activity 14+ days) surface in the Action Centre.' },
            { tag: 'SHARED OWNERSHIP', body: 'Cross-team visibility — no two reps cold-call the same prospect.' },
          ].map((c, i) => (
            <div
              key={i}
              className={isActive ? 'anim-card' : ''}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderLeft: '3px solid #fbbf24',
                padding: '1.4vh 1.2vw',
                borderRadius: '0 0.3vw 0.3vw 0',
                animationDelay: `${1.0 + i * 0.1}s`,
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '0.78vw',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: '#fbbf24',
                  marginBottom: '0.6vh',
                }}
              >
                {c.tag}
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: '0.92vw',
                  color: 'rgba(238, 243, 240, 0.78)',
                  lineHeight: 1.45,
                }}
              >
                {c.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>10 / 14</span>
      </div>
    </div>
  );
}
