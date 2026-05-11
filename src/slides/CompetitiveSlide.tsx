import type { SlideProps } from '../slides';
import { useEffect, useState, useRef } from 'react';

// ─── Competitor matrix data ─────────────────────────────
type Cell = 'yes' | 'partial' | 'no';

interface Competitor {
  name: string;
  cat: string;
  cells: Cell[]; // 6 cells, one per capability
}

const CAPABILITIES = [
  'UK B2B discovery',
  'Sector scoring',
  'Tender monitoring',
  'Pipeline + alerts',
  'Domain-aware AI',
  'Geospatial / quoting',
];

const COMPETITORS: Competitor[] = [
  // Contact data platforms
  { name: 'ZoomInfo',     cat: 'Contact data',     cells: ['partial', 'no', 'no',      'no',      'partial', 'no'] },
  { name: 'Cognism',      cat: 'Contact data',     cells: ['yes',     'no', 'no',      'no',      'partial', 'no'] },
  { name: 'Apollo',       cat: 'Contact data',     cells: ['partial', 'no', 'no',      'partial', 'partial', 'no'] },
  // Tender platforms
  { name: 'Glenigan',     cat: 'UK tenders',       cells: ['no',      'no', 'yes',     'no',      'no',      'no'] },
  { name: 'Barbour ABI',  cat: 'UK tenders',       cells: ['no',      'no', 'yes',     'no',      'no',      'no'] },
  // FSM
  { name: 'FieldRoutes',  cat: 'Field service',    cells: ['no',      'no', 'no',      'partial', 'no',      'no'] },
  { name: 'ServiceTitan', cat: 'Field service',    cells: ['no',      'no', 'no',      'partial', 'partial', 'no'] },
  // Generic CRM
  { name: 'HubSpot',      cat: 'Generic CRM',      cells: ['no',      'no', 'no',      'yes',     'partial', 'no'] },
  { name: 'Salesforce',   cat: 'Generic CRM',      cells: ['no',      'no', 'no',      'yes',     'partial', 'no'] },
  // Us
  { name: 'xsellio',      cat: 'Lead intelligence', cells: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes'] },
];

// Streaming animation
function useStream(isActive: boolean, count: number, baseDelay: number, gap: number) {
  const [shown, setShown] = useState(0);
  const timers = useRef<number[]>([]);
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!isActive) {
      setShown(0);
      return;
    }
    setShown(0);
    for (let i = 0; i < count; i++) {
      const id = window.setTimeout(() => setShown((s) => Math.max(s, i + 1)), baseDelay + i * gap);
      timers.current.push(id);
    }
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, [isActive, count, baseDelay, gap]);
  return shown;
}

function cellSymbol(c: Cell) {
  if (c === 'yes') return '✓';
  if (c === 'partial') return '~';
  return '—';
}

function cellColor(c: Cell, isUs: boolean) {
  if (c === 'yes') return isUs ? '#22c55e' : 'rgba(134, 239, 172, 0.85)';
  if (c === 'partial') return '#fbbf24';
  return 'rgba(255, 255, 255, 0.20)';
}

function cellBg(c: Cell, isUs: boolean) {
  if (c === 'yes') return isUs ? 'rgba(34, 197, 94, 0.18)' : 'rgba(22, 163, 74, 0.10)';
  if (c === 'partial') return 'rgba(251, 191, 36, 0.10)';
  return 'transparent';
}

export default function CompetitiveSlide({ isActive }: SlideProps) {
  const rowsShown = useStream(isActive, COMPETITORS.length, 600, 110);
  const summaryShown = useStream(isActive, 4, 600 + COMPETITORS.length * 110 + 200, 180);

  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '6vh 4vw 5vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '2.5vh' }}>
          <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '1.2vh', color: '#fbbf24' }}>
            Competitive Landscape
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '3vw' }}>
            <h2
              className="font-display"
              style={{
                fontSize: '3.2vw',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#eef3f0',
                maxWidth: '60vw',
              }}
            >
              No one else does this combination.
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: '0.95vw',
                color: 'rgba(238, 243, 240, 0.55)',
                lineHeight: 1.55,
                maxWidth: '26vw',
                textAlign: 'right',
                marginBottom: '0.8vh',
              }}
            >
              Each lane has a piece. None have all of it — and none focus on
              gritting, landscaping, or pest control specifically.
            </p>
          </div>
        </div>

        {/* Matrix */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '0.5vw',
            overflow: 'hidden',
            marginBottom: '2.2vh',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '11vw 9vw repeat(6, 1fr)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.10)',
              background: 'rgba(0, 0, 0, 0.25)',
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.72vw',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: 'rgba(238, 243, 240, 0.45)',
                padding: '1.2vh 1vw',
              }}
            >
              PLATFORM
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '0.72vw',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: 'rgba(238, 243, 240, 0.45)',
                padding: '1.2vh 0.6vw',
              }}
            >
              CATEGORY
            </div>
            {CAPABILITIES.map((cap, i) => (
              <div
                key={i}
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  fontWeight: 600,
                  letterSpacing: '0.10em',
                  color: 'rgba(238, 243, 240, 0.55)',
                  padding: '1.2vh 0.5vw',
                  textAlign: 'center',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
                  lineHeight: 1.25,
                }}
              >
                {cap}
              </div>
            ))}
          </div>

          {/* Body rows */}
          {COMPETITORS.map((comp, rowIdx) => {
            const isUs = comp.name === 'xsellio';
            const visible = rowIdx < rowsShown;
            const yesCount = comp.cells.filter((c) => c === 'yes').length;
            return (
              <div
                key={comp.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '11vw 9vw repeat(6, 1fr)',
                  background: isUs ? 'rgba(22, 163, 74, 0.10)' : 'transparent',
                  borderBottom: rowIdx < COMPETITORS.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                  borderTop: isUs ? '2px solid rgba(34, 197, 94, 0.50)' : 'none',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: '1vw',
                    fontWeight: isUs ? 800 : 600,
                    color: isUs ? '#22c55e' : '#eef3f0',
                    padding: '1.3vh 1vw',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4vw',
                    letterSpacing: isUs ? '0.02em' : '-0.01em',
                    textTransform: isUs ? 'uppercase' : 'none',
                  }}
                >
                  {isUs && (
                    <span
                      className="anim-pulse"
                      style={{
                        width: '0.4vw',
                        height: '0.4vw',
                        borderRadius: '50%',
                        background: '#22c55e',
                        display: 'inline-block',
                      }}
                    />
                  )}
                  {comp.name}
                </div>
                <div
                  className="font-body"
                  style={{
                    fontSize: '0.82vw',
                    color: isUs ? 'rgba(134, 239, 172, 0.95)' : 'rgba(238, 243, 240, 0.55)',
                    padding: '1.3vh 0.6vw',
                    display: 'flex',
                    alignItems: 'center',
                    fontStyle: 'italic',
                  }}
                >
                  {comp.cat}
                </div>
                {comp.cells.map((cell, colIdx) => (
                  <div
                    key={colIdx}
                    style={{
                      padding: '1.3vh 0.5vw',
                      textAlign: 'center',
                      borderLeft: '1px solid rgba(255, 255, 255, 0.04)',
                      background: cellBg(cell, isUs),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      className="font-display"
                      style={{
                        fontSize: cell === 'no' ? '1vw' : '1.3vw',
                        fontWeight: 800,
                        color: cellColor(cell, isUs),
                        lineHeight: 1,
                      }}
                    >
                      {cellSymbol(cell)}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom — "Only xsellio does this" */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2vw',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: '0.85vw',
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#22c55e',
              writingMode: 'horizontal-tb',
              lineHeight: 1.5,
            }}
          >
            ONLY <br />XSELLIO
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1vw',
            }}
          >
            {[
              { tag: 'Sector-specific', body: 'Scored separately for gritting, landscaping, pest control.' },
              { tag: 'UK tender + B2B', body: 'Procurement feed + Companies House + FHRS, in one query.' },
              { tag: 'Domain AI', body: 'Copilot grounded in live data — not a generic chatbot.' },
              { tag: 'Geospatial', body: 'AutoMapper boundaries → measurements → quote-ready.' },
            ].map((item, i) => {
              const visible = i < summaryShown;
              return (
                <div
                  key={item.tag}
                  style={{
                    background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.12), rgba(22, 163, 74, 0.04))',
                    border: '1px solid rgba(22, 163, 74, 0.35)',
                    borderTop: '2px solid #22c55e',
                    borderRadius: '0.3vw',
                    padding: '1.2vh 1vw',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.7vw',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      color: '#22c55e',
                      marginBottom: '0.5vh',
                    }}
                  >
                    {item.tag.toUpperCase()}
                  </div>
                  <div
                    className="font-body"
                    style={{
                      fontSize: '0.82vw',
                      color: 'rgba(238, 243, 240, 0.82)',
                      lineHeight: 1.45,
                    }}
                  >
                    {item.body}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            marginTop: '1.5vh',
            display: 'flex',
            gap: '1.5vw',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
            <span style={{ color: '#22c55e', fontSize: '0.9vw', fontWeight: 800 }}>✓</span>
            <span className="font-body" style={{ fontSize: '0.75vw', color: 'rgba(238, 243, 240, 0.5)' }}>full</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
            <span style={{ color: '#fbbf24', fontSize: '0.9vw', fontWeight: 800 }}>~</span>
            <span className="font-body" style={{ fontSize: '0.75vw', color: 'rgba(238, 243, 240, 0.5)' }}>partial / generic</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.30)', fontSize: '0.9vw', fontWeight: 800 }}>—</span>
            <span className="font-body" style={{ fontSize: '0.75vw', color: 'rgba(238, 243, 240, 0.5)' }}>not offered</span>
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>XSELLIO</strong> · CCO + IT BRIEFING</span>
        <span>17 / 19</span>
      </div>
    </div>
  );
}
