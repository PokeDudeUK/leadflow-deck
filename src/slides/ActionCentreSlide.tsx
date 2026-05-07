import type { SlideProps } from '../slides';
import { useState, useEffect, useRef } from 'react';

type Severity = 'critical' | 'warning' | 'info';

interface Alert {
  severity: Severity;
  type: string;          // e.g. "Tender closing"
  title: string;         // e.g. "Leeds City Council — gritting framework"
  meta: string;          // e.g. "closes in 2 days · £185k"
  rep: string;           // e.g. "Unassigned"
}

const ALERTS: Alert[] = [
  { severity: 'critical', type: 'Quote due',         title: 'Birmingham Logistics Ltd',         meta: 'follow-up scheduled today · LD-000001',     rep: 'Unassigned' },
  { severity: 'critical', type: 'Quote due',         title: 'Test Facilities PLC',              meta: 'follow-up scheduled today · LD-000004',     rep: 'Sarah Jones' },
  { severity: 'warning',  type: 'Overdue follow-up', title: 'Test Manual Entry',                meta: 'due 2026-03-26 · LD-000025',                rep: 'Christos P.' },
  { severity: 'warning',  type: 'Stale lead',        title: 'Birmingham Facilities Maintenance', meta: 'no action for 14+ days · LD-000017',        rep: 'Unassigned' },
  { severity: 'warning',  type: 'Tender closing',    title: 'Leeds City Council — gritting framework', meta: 'closes in 4 days · £185k',           rep: 'Unassigned' },
  { severity: 'info',     type: 'Duplicate',         title: 'Yorkshire Cold Chain Ltd (×2)',    meta: 'merge candidates · LD-000038, LD-000041',   rep: '—' },
  { severity: 'info',     type: 'No owner',          title: 'Northern Logistics Group',         meta: 'imported 2 days ago · LD-000056',           rep: '—' },
];

const SEV_STYLE: Record<Severity, { col: string; bg: string; label: string; icon: string }> = {
  critical: { col: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)',  label: 'CRITICAL', icon: '🔴' },
  warning:  { col: '#fbbf24', bg: 'rgba(251, 191, 36, 0.10)', label: 'WARNING',  icon: '⚠️' },
  info:     { col: '#86efac', bg: 'rgba(134, 239, 172, 0.08)', label: 'INFO',     icon: 'ℹ️' },
};

const REVEAL_DELAY = 280;   // ms between each alert appearing
const HOLD_MS = 4500;       // how long all alerts stay visible
const FADE_MS = 400;        // fade between cycles

export default function ActionCentreSlide({ isActive }: SlideProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  // Animate alerts streaming in, then loop
  useEffect(() => {
    if (!isActive) {
      clearAllTimeouts();
      setVisibleCount(0);
      setFading(false);
      return;
    }

    const runCycle = () => {
      setFading(false);
      setVisibleCount(0);

      // Stream alerts in one by one
      ALERTS.forEach((_, i) => {
        schedule(() => setVisibleCount(i + 1), 600 + i * REVEAL_DELAY);
      });

      const allInTime = 600 + ALERTS.length * REVEAL_DELAY;

      // Hold, then fade
      schedule(() => setFading(true), allInTime + HOLD_MS);

      // Reset for next cycle
      schedule(runCycle, allInTime + HOLD_MS + FADE_MS);
    };

    runCycle();
    return clearAllTimeouts;
  }, [isActive]);

  // Counts for the summary cards (these tick up as alerts stream in)
  const visibleAlerts = ALERTS.slice(0, visibleCount);
  const counts = {
    critical: visibleAlerts.filter(a => a.severity === 'critical').length,
    warning: visibleAlerts.filter(a => a.severity === 'warning').length,
    info: visibleAlerts.filter(a => a.severity === 'info').length,
  };

  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '7vh 5vw 6vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '1.2vh' }}>
          Real product — Action Centre
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: '3.2vw',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#eef3f0',
            marginBottom: '1.2vh',
          }}
        >
          The team's morning to-do list, generated automatically.
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: '1.05vw',
            lineHeight: 1.5,
            color: 'rgba(238, 243, 240, 0.65)',
            maxWidth: '82vw',
            marginBottom: '2.5vh',
          }}
        >
          Every overdue follow-up, stale lead, and closing tender surfaces in one place — sorted by severity,
          grouped by rep. Reps don't have to remember; the system remembers for them.
        </p>

        {/* Browser frame */}
        <div
          style={{
            flex: 1,
            background: '#0a0f0b',
            border: '1px solid rgba(22, 163, 74, 0.18)',
            borderRadius: '0.6vw',
            overflow: 'hidden',
            boxShadow: '0 1.2vh 4vw rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            opacity: fading ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease`,
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8vw',
              padding: '0.9vh 1vw',
              background: '#141a15',
              borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', gap: '0.35vw' }}>
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', background: '#16a34a' }} />
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5vw',
                padding: '0.4vh 0.8vw',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '0.3vw',
                margin: '0 0.5vw',
              }}
            >
              <span style={{ fontSize: '0.85vw', color: '#16a34a' }}>🔒</span>
              <span
                className="font-mono"
                style={{ fontSize: '0.85vw', color: 'rgba(238, 243, 240, 0.7)' }}
              >
                leadflow-python-production.up.railway.app/action-centre
              </span>
            </div>
          </div>

          {/* App nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8vw',
              padding: '0.6vh 1.2vw',
              background: '#0b1510',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              flexShrink: 0,
            }}
          >
            <div className="font-display" style={{ fontSize: '1vw', fontWeight: 700, color: '#16a34a' }}>
              LeadFlow
            </div>
            {['Dashboard', 'Discover', 'Action Centre', 'My Leads'].map((n) => {
              const active = n === 'Action Centre';
              return (
                <div
                  key={n}
                  className="font-body"
                  style={{
                    fontSize: '0.85vw',
                    padding: '0.25vh 0.6vw',
                    color: active ? '#eef3f0' : 'rgba(238, 243, 240, 0.42)',
                    background: active ? 'rgba(22, 163, 74, 0.18)' : 'transparent',
                    borderRadius: '0.2vw',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3vw',
                  }}
                >
                  {n}
                  {active && (
                    <span
                      style={{
                        fontSize: '0.65vw',
                        color: '#fbbf24',
                        background: 'rgba(251, 191, 36, 0.15)',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        padding: '0 0.4vw',
                        borderRadius: '999px',
                        fontWeight: 600,
                      }}
                    >
                      {ALERTS.length}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Page header */}
          <div
            style={{
              padding: '1.5vh 1.5vw 1vh',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
              <span style={{ fontSize: '1.4vw' }}>⚡</span>
              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.5vw',
                    fontWeight: 700,
                    color: '#eef3f0',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Action Centre
                </div>
                <div
                  className="font-body"
                  style={{
                    fontSize: '0.78vw',
                    color: 'rgba(238, 243, 240, 0.55)',
                    marginTop: '0.2vh',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#eef3f0' }}>{visibleCount}</span> active alerts requiring attention ·{' '}
                  <span style={{ color: '#ef4444', fontWeight: 600 }}>{counts.critical} critical</span> ·{' '}
                  <span style={{ color: '#fbbf24', fontWeight: 600 }}>{counts.warning} warnings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Severity summary cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.7vw',
              padding: '0 1.5vw 1vh',
              flexShrink: 0,
            }}
          >
            {(['critical', 'warning', 'info'] as Severity[]).map((sev) => {
              const style = SEV_STYLE[sev];
              const count = counts[sev];
              return (
                <div
                  key={sev}
                  style={{
                    background: style.bg,
                    border: `1px solid ${style.col}55`,
                    borderLeft: `3px solid ${style.col}`,
                    borderRadius: '0.3vw',
                    padding: '0.9vh 1vw',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8vw',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: '1.8vw',
                      fontWeight: 800,
                      color: style.col,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      minWidth: '2vw',
                    }}
                  >
                    {count}
                  </span>
                  <div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: '0.7vw',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        color: style.col,
                      }}
                    >
                      {style.label}
                    </div>
                    <div
                      className="font-body"
                      style={{
                        fontSize: '0.75vw',
                        color: 'rgba(238, 243, 240, 0.6)',
                        marginTop: '0.2vh',
                      }}
                    >
                      {sev === 'critical' && 'Quotes due, tenders closing'}
                      {sev === 'warning' && 'Overdue follow-ups, stale leads'}
                      {sev === 'info' && 'Duplicates, missing owners'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alerts list */}
          <div
            style={{
              flex: 1,
              padding: '0 1.5vw 1vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5vh',
            }}
          >
            {ALERTS.map((alert, i) => {
              const style = SEV_STYLE[alert.severity];
              const visible = i < visibleCount;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8vw',
                    padding: '0.9vh 1vw',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderLeft: `3px solid ${style.col}`,
                    borderRadius: '0 0.25vw 0.25vw 0',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-12px)',
                    transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  {/* Severity tag */}
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.65vw',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: style.col,
                      background: style.bg,
                      padding: '0.25vh 0.5vw',
                      borderRadius: '0.2vw',
                      flexShrink: 0,
                      minWidth: '4.5vw',
                      textAlign: 'center',
                    }}
                  >
                    {alert.type.toUpperCase()}
                  </span>

                  {/* Title */}
                  <span
                    className="font-display"
                    style={{
                      fontSize: '0.95vw',
                      fontWeight: 600,
                      color: '#eef3f0',
                      flexShrink: 0,
                    }}
                  >
                    {alert.title}
                  </span>

                  {/* Meta */}
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.75vw',
                      color: 'rgba(238, 243, 240, 0.55)',
                      flex: 1,
                    }}
                  >
                    {alert.meta}
                  </span>

                  {/* Rep */}
                  <span
                    className="font-body"
                    style={{
                      fontSize: '0.78vw',
                      color: alert.rep === 'Unassigned' ? '#fbbf24' : alert.rep === '—' ? 'rgba(238, 243, 240, 0.4)' : '#86efac',
                      flexShrink: 0,
                      minWidth: '6vw',
                      textAlign: 'right',
                    }}
                  >
                    {alert.rep}
                  </span>

                  {/* Resolve button */}
                  <button
                    style={{
                      background: visible ? 'rgba(22, 163, 74, 0.15)' : 'transparent',
                      border: `1px solid ${visible ? 'rgba(22, 163, 74, 0.4)' : 'transparent'}`,
                      color: '#86efac',
                      borderRadius: '0.25vw',
                      padding: '0.35vh 0.7vw',
                      fontSize: '0.75vw',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    ✓ Resolve
                  </button>
                </div>
              );
            })}
          </div>

          {/* Status bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.4vh 1vw',
              background: '#141a15',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
              <span
                className="anim-pulse"
                style={{
                  width: '0.4vw',
                  height: '0.4vw',
                  borderRadius: '50%',
                  background: '#16a34a',
                  display: 'inline-block',
                }}
              />
              <span
                className="font-mono"
                style={{ fontSize: '0.7vw', color: 'rgba(238, 243, 240, 0.4)' }}
              >
                {visibleCount === ALERTS.length
                  ? `All ${ALERTS.length} alerts loaded · sorted by severity`
                  : `Loading alerts… ${visibleCount} / ${ALERTS.length}`}
              </span>
            </div>
            <span
              className="font-mono"
              style={{ fontSize: '0.7vw', color: 'rgba(238, 243, 240, 0.3)' }}
            >
              Refresh every 90s · v2.44
            </span>
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>11 / 15</span>
      </div>
    </div>
  );
}
