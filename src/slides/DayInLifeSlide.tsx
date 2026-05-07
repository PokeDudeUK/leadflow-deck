import type { SlideProps } from '../slides';
import { useEffect, useRef, useState } from 'react';

interface Moment {
  time: string;
  title: string;
  body: string;
  icon: string;
  tag: 'ALERT' | 'TENDER' | 'COPILOT' | 'CALL' | 'PIPELINE' | 'ASSIGN' | 'WIN';
}

const TIMELINE: Moment[] = [
  {
    time: '8:30',
    icon: '☕',
    tag: 'ALERT',
    title: 'Logs in. Action Centre is already loaded.',
    body: '3 overdue follow-ups · 1 tender closing in 71h · 6 new Strong leads since yesterday — all sorted, all hers.',
  },
  {
    time: '8:45',
    icon: '⚡',
    tag: 'TENDER',
    title: 'Spots the £185k Leeds gritting tender.',
    body: 'Surfaced overnight from Contracts Finder. Opens it, drafts a quote — competitors won\'t see it for days.',
  },
  {
    time: '9:00',
    icon: '✓',
    tag: 'WIN',
    title: 'Clears yesterday\'s 3 follow-ups.',
    body: 'Each lead opens with full context — last call notes, score, history. No "wait, who am I calling?"',
  },
  {
    time: '9:20',
    icon: '🤖',
    tag: 'COPILOT',
    title: '"Show me my strongest cold-chain leads in LS postcodes."',
    body: 'Copilot returns 5 leads, scored ≥80. She assigns 3 to herself, routes 2 to a colleague — one chat, no menus.',
  },
  {
    time: '9:35',
    icon: '👥',
    tag: 'ASSIGN',
    title: 'Reviews her queue. Strong leads on top.',
    body: 'No prioritising by gut. The score has done it. She picks the top 4 to call before lunch.',
  },
  {
    time: '9:50',
    icon: '📞',
    tag: 'CALL',
    title: 'On her first call.',
    body: 'Yorkshire Cold Chain Ltd. She\'s read the brief, knows the SIC code, has the score breakdown open.',
  },
  {
    time: '10:30',
    icon: '📊',
    tag: 'PIPELINE',
    title: 'Three calls in. Pipeline moved 2 stages.',
    body: 'Notes captured against each lead. Manager sees it live in the dashboard. No end-of-day catch-up email.',
  },
];

const TAG_COLORS: Record<Moment['tag'], { fg: string; bg: string; border: string }> = {
  ALERT:    { fg: '#fca5a5', bg: 'rgba(239, 68, 68, 0.10)',  border: 'rgba(239, 68, 68, 0.35)' },
  TENDER:   { fg: '#fbbf24', bg: 'rgba(251, 191, 36, 0.10)', border: 'rgba(251, 191, 36, 0.40)' },
  COPILOT:  { fg: '#a5b4fc', bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.40)' },
  CALL:     { fg: '#86efac', bg: 'rgba(22, 163, 74, 0.12)',  border: 'rgba(22, 163, 74, 0.40)' },
  PIPELINE: { fg: '#7dd3fc', bg: 'rgba(14, 165, 233, 0.10)', border: 'rgba(14, 165, 233, 0.35)' },
  ASSIGN:   { fg: '#86efac', bg: 'rgba(22, 163, 74, 0.10)',  border: 'rgba(22, 163, 74, 0.35)' },
  WIN:      { fg: '#22c55e', bg: 'rgba(22, 163, 74, 0.12)',  border: 'rgba(22, 163, 74, 0.40)' },
};

// Count-up hook
function useCountUp(target: number, isActive: boolean, delayMs: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!isActive) {
      setVal(0);
      return;
    }
    setVal(0);
    const startDelay = setTimeout(() => {
      const duration = 1300;
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

export default function DayInLifeSlide({ isActive }: SlideProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  // Stream moments in one by one
  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (!isActive) {
      setVisibleCount(0);
      setShowFooter(false);
      return;
    }
    setVisibleCount(0);
    setShowFooter(false);
    TIMELINE.forEach((_, i) => {
      const id = window.setTimeout(() => {
        setVisibleCount((c) => Math.max(c, i + 1));
      }, 600 + i * 380);
      timeoutsRef.current.push(id);
    });
    const footerDelay = window.setTimeout(() => setShowFooter(true), 600 + TIMELINE.length * 380 + 200);
    timeoutsRef.current.push(footerDelay);
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [isActive]);

  // Old-way ~4 hours = 240 min, new-way 80 min (8:30 → 9:50, first call)
  const newMinutes = useCountUp(80, showFooter, 200);
  const oldMinutes = useCountUp(240, showFooter, 200);

  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '6.5vh 5vw 4vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '2.5vh' }}>
          <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '1vh' }}>
            Day in the life
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2vw', flexWrap: 'wrap' }}>
            <h2
              className="font-display"
              style={{
                fontSize: '3.2vw',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#eef3f0',
              }}
            >
              Sarah, Tuesday morning.
            </h2>
            <span
              className="font-body"
              style={{
                fontSize: '1.1vw',
                color: 'rgba(238, 243, 240, 0.55)',
                fontStyle: 'italic',
              }}
            >
              Yorkshire territory · Gritting + Landscaping
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1vh',
            position: 'relative',
            paddingLeft: '1.2vw',
            minHeight: 0,
          }}
        >
          {/* Vertical track */}
          <div
            style={{
              position: 'absolute',
              top: '0.5vh',
              bottom: '0.5vh',
              left: '5.5vw',
              width: '2px',
              background: 'rgba(22, 163, 74, 0.18)',
            }}
          />

          {TIMELINE.map((m, i) => {
            const visible = i < visibleCount;
            const colors = TAG_COLORS[m.tag];
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '5vw auto 1fr',
                  alignItems: 'center',
                  gap: '1.2vw',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                {/* Time */}
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.3vw',
                    fontWeight: 700,
                    color: '#86efac',
                    letterSpacing: '-0.01em',
                    fontVariantNumeric: 'tabular-nums',
                    textAlign: 'right',
                  }}
                >
                  {m.time}
                </div>

                {/* Icon node */}
                <div
                  style={{
                    width: '2.4vw',
                    height: '2.4vw',
                    minWidth: '2.4vw',
                    borderRadius: '50%',
                    background: colors.bg,
                    border: `1.5px solid ${colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1vw',
                    boxShadow: visible ? `0 0 0 4px rgba(14, 26, 18, 1), 0 0 14px ${colors.border}` : 'none',
                    transition: 'box-shadow 0.5s ease 0.2s',
                  }}
                >
                  {m.icon}
                </div>

                {/* Card */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '0.4vw',
                    padding: '1.1vh 1.2vw',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1vw',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', marginBottom: '0.3vh' }}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.65vw',
                          fontWeight: 700,
                          letterSpacing: '0.20em',
                          color: colors.fg,
                          background: colors.bg,
                          border: `1px solid ${colors.border}`,
                          padding: '0.15vh 0.5vw',
                          borderRadius: '0.2vw',
                        }}
                      >
                        {m.tag}
                      </span>
                      <span
                        className="font-display"
                        style={{
                          fontSize: '1vw',
                          fontWeight: 600,
                          color: '#eef3f0',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {m.title}
                      </span>
                    </div>
                    <div
                      className="font-body"
                      style={{
                        fontSize: '0.85vw',
                        color: 'rgba(238, 243, 240, 0.6)',
                        lineHeight: 1.45,
                      }}
                    >
                      {m.body}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom comparison strip */}
        <div
          style={{
            marginTop: '2.2vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1.5vw',
            opacity: showFooter ? 1 : 0,
            transform: showFooter ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            flexShrink: 0,
          }}
        >
          {/* Old way */}
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderLeft: '3px solid #ef4444',
              borderRadius: '0 0.4vw 0.4vw 0',
              padding: '1.2vh 1.4vw',
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.7vw',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#fca5a5',
                marginBottom: '0.5vh',
              }}
            >
              OLD WAY · BEFORE LEADFLOW
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5vw' }}>
              <span
                className="font-display hero-number-glow-red"
                style={{
                  fontSize: '2.2vw',
                  fontWeight: 800,
                  color: '#fca5a5',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                ~{oldMinutes}
              </span>
              <span
                className="font-body"
                style={{ fontSize: '0.95vw', color: 'rgba(238, 243, 240, 0.65)' }}
              >
                minutes prep before first call
              </span>
            </div>
          </div>

          {/* New way */}
          <div
            style={{
              background: 'rgba(22, 163, 74, 0.10)',
              border: '1px solid rgba(22, 163, 74, 0.35)',
              borderLeft: '3px solid #16a34a',
              borderRadius: '0 0.4vw 0.4vw 0',
              padding: '1.2vh 1.4vw',
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.7vw',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#86efac',
                marginBottom: '0.5vh',
              }}
            >
              WITH LEADFLOW
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5vw' }}>
              <span
                className="font-display hero-number-glow"
                style={{
                  fontSize: '2.2vw',
                  fontWeight: 800,
                  color: '#22c55e',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {newMinutes}
              </span>
              <span
                className="font-body"
                style={{ fontSize: '0.95vw', color: 'rgba(238, 243, 240, 0.65)' }}
              >
                minutes — first call before 10am
              </span>
            </div>
          </div>

          {/* The point */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.10), rgba(22, 163, 74, 0.08))',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              borderRadius: '0.4vw',
              padding: '1.2vh 1.4vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.7vw',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#fbbf24',
                marginBottom: '0.5vh',
              }}
            >
              THE POINT
            </div>
            <div
              className="font-body"
              style={{
                fontSize: '0.92vw',
                color: 'rgba(238, 243, 240, 0.85)',
                lineHeight: 1.45,
              }}
            >
              <strong style={{ color: '#fbbf24' }}>~2 hours/day</strong> back per rep —{' '}
              <strong style={{ color: '#22c55e' }}>selling time, not searching time.</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>13 / 17</span>
      </div>
    </div>
  );
}
