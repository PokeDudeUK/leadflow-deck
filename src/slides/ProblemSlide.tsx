import type { SlideProps } from '../slides';
import { useEffect, useState } from 'react';

const PROBLEMS = [
  {
    n: '01',
    title: 'Discovery',
    body: 'Companies House, FHRS, council sites, tender portals — searched manually, separately, repeatedly. Two reps could spend a morning finding the same lead.',
    metric: { value: 10, suffix: ' hrs', decimals: 0, label: 'per rep, per week — lost to manual hunting' },
  },
  {
    n: '02',
    title: 'Qualification',
    body: 'No shared scoring. "Is this Leeds logistics depot a strong gritting prospect?" answered by feel, not data. Reps disagreed on what "good" looked like.',
    metric: { value: 30, suffix: '%', decimals: 0, label: 'of worked leads were Weak or Possible — wrong list, wrong day' },
  },
  {
    n: '03',
    title: 'Follow-through',
    body: 'Promised callbacks lived in heads, sticky notes, and Outlook flags. Tenders closed without quotes. Strong leads went cold while reps chased weak ones.',
    metric: { value: 1, suffix: ' in 5', decimals: 0, label: 'strong leads went cold without contact' },
  },
];

// Count-up hook (matches deck pattern)
function useCountUp(target: number, isActive: boolean, delayMs: number, decimals = 0) {
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
        const next = target * eased;
        setVal(decimals > 0 ? parseFloat(next.toFixed(decimals)) : Math.round(next));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delayMs);
    return () => clearTimeout(startDelay);
  }, [target, isActive, delayMs, decimals]);
  return val;
}

function MetricNum({
  value,
  suffix,
  decimals,
  isActive,
  delay,
}: {
  value: number;
  suffix: string;
  decimals: number;
  isActive: boolean;
  delay: number;
}) {
  const v = useCountUp(value, isActive, delay, decimals);
  const display = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
  return (
    <span
      className="font-display"
      style={{
        fontSize: '2.4vw',
        fontWeight: 800,
        color: '#fbbf24',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}
    >
      {display}
      <span style={{ fontSize: '1.6vw', color: '#fbbf24' }}>{suffix}</span>
    </span>
  );
}

export default function ProblemSlide({ isActive }: SlideProps) {
  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '8vh 6vw 6vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Eyebrow */}
        <div
          className="slide-eyebrow"
          style={{ fontSize: '0.95vw', marginBottom: '2vh', color: '#fbbf24' }}
        >
          The Problem We Identified
        </div>

        {/* Title */}
        <h2
          className="font-display"
          style={{
            fontSize: '3.6vw',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#eef3f0',
            marginBottom: '2.5vh',
            maxWidth: '92vw',
          }}
        >
          Three services. Three broken<br />
          prospect-hunting workflows.
        </h2>

        {/* Lede */}
        <p
          className="font-body"
          style={{
            fontSize: '1.15vw',
            lineHeight: 1.55,
            color: 'rgba(238, 243, 240, 0.65)',
            maxWidth: '78vw',
            marginBottom: '4.5vh',
          }}
        >
          Reps were stitching leads together from spreadsheets, browser tabs, and gut instinct — a different
          process for each service line. Hours per week, easily duplicated, with no shared view of what was
          already in motion.
        </p>

        {/* Cards */}
        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5vw',
            alignItems: 'stretch',
          }}
        >
          {PROBLEMS.map((p, i) => (
            <div
              key={p.n}
              className={isActive ? 'anim-card' : ''}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '0.6vw',
                padding: '3vh 2.2vw 2.5vh 2.2vw',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Side accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '3px',
                  height: '100%',
                  background: '#16a34a',
                }}
              />
              {/* Big number ghost */}
              <div
                className="font-display"
                style={{
                  position: 'absolute',
                  top: '2vh',
                  right: '2vw',
                  fontSize: '4vw',
                  fontWeight: 700,
                  color: 'rgba(22, 163, 74, 0.10)',
                  fontStyle: 'italic',
                  lineHeight: 1,
                }}
              >
                {p.n}
              </div>

              {/* Top rule */}
              <div
                style={{
                  width: '2.5vw',
                  height: '2px',
                  background: '#16a34a',
                  marginBottom: '2.5vh',
                }}
              />

              <h3
                className="font-display"
                style={{
                  fontSize: '1.9vw',
                  fontWeight: 700,
                  color: '#eef3f0',
                  marginBottom: '1.5vh',
                  letterSpacing: '-0.01em',
                }}
              >
                {p.title}
              </h3>

              <p
                className="font-body"
                style={{
                  fontSize: '1.0vw',
                  lineHeight: 1.6,
                  color: 'rgba(238, 243, 240, 0.75)',
                  maxWidth: '20vw',
                  marginBottom: '2.5vh',
                  flex: 1,
                }}
              >
                {p.body}
              </p>

              {/* Cost block */}
              <div
                style={{
                  borderTop: '1px solid rgba(251, 191, 36, 0.20)',
                  paddingTop: '1.8vh',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6vh',
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: '0.7vw',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    color: '#fbbf24',
                    opacity: 0.85,
                  }}
                >
                  ESTIMATED COST
                </div>
                <MetricNum
                  value={p.metric.value}
                  suffix={p.metric.suffix}
                  decimals={p.metric.decimals}
                  isActive={isActive}
                  delay={500 + i * 200}
                />
                <div
                  className="font-body"
                  style={{
                    fontSize: '0.85vw',
                    color: 'rgba(238, 243, 240, 0.6)',
                    lineHeight: 1.4,
                    maxWidth: '20vw',
                  }}
                >
                  {p.metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>02 / 17</span>
      </div>
    </div>
  );
}
