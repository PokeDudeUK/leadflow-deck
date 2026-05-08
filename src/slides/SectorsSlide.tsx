import type { SlideProps } from '../slides';
import { useState, useEffect, useRef } from 'react';

// ─── Service packs (top row) ───────────────────────────────
const SERVICE_PACKS = [
  { label: 'Gritting',      icon: '❄️', tag: 'Live',     col: '#22c55e' },
  { label: 'Landscaping',   icon: '🌿', tag: 'Live',     col: '#22c55e' },
  { label: 'Pest',          icon: '🐀', tag: 'Live',     col: '#22c55e' },
];

const TENDERS = [
  { label: 'Find a Tender', icon: '⚡', tag: 'Live',     col: '#22c55e' },
  { label: 'NHS Tenders',   icon: '🏥', tag: 'Live',     col: '#22c55e' },
  { label: 'In-Tend',       icon: '📑', tag: 'Gateway',  col: '#fbbf24' },
];

const REGISTERS = [
  { label: 'Food Hygiene',  icon: '🍽️', tag: 'Live',     col: '#22c55e' },
  { label: 'CQC',           icon: '💊', tag: 'Live',     col: '#22c55e' },
];

// ─── Sector categories with chips ──────────────────────────
const CATEGORIES = [
  {
    label: 'Property & FM',
    icon: '🏢',
    chips: ['Block Management', 'Facilities Management', 'Housing Associations', 'Business Parks', 'Industrial Estates', 'Property Developers'],
  },
  {
    label: 'Logistics',
    icon: '🚚',
    chips: ['Distribution Centres', 'Cold Storage & Refrigerated', 'Haulage & Road Freight', 'General Warehousing', 'Parcels, Couriers & Last Mile'],
  },
  {
    label: 'Education',
    icon: '🎓',
    chips: ['Academy Trusts & MATs', 'Universities & Higher Ed', 'Further Education Colleges', 'Independent & Private Schools', 'State Primary & Secondary'],
  },
  {
    label: 'Healthcare & Care',
    icon: '🏥',
    chips: ['NHS & Private Hospitals', 'Care Groups & Residential', 'Hospices & Palliative', 'Specialist & Mental Health', 'Home Care & Domiciliary'],
  },
  {
    label: 'Hospitality & Leisure',
    icon: '🏨',
    chips: ['Hotel Groups & Chains', 'Restaurant Groups & Chains', 'Pub Companies & Bar Groups', 'Leisure Centres & Sports', 'Event & Conference Venues'],
  },
  {
    label: 'Retail & Footfall',
    icon: '🛒',
    chips: ['Shopping Centres & Malls', 'Retail Parks & Out-of-Town', 'Supermarkets & Grocery', 'High Street & Multi-site'],
  },
  {
    label: 'Manufacturing',
    icon: '🏭',
    chips: ['Food Manufacturing', 'Engineering & Advanced', 'Aggregates, Quarrying', 'Packaging & Container', 'Chemicals & Pharma', 'General Manufacturing'],
  },
  {
    label: 'Transport & Infra',
    icon: '🚆',
    chips: ['Transport Depots & Bus', 'Train Operators & Rail', 'Airports & Aviation', 'Ports & Marine', 'Utilities & Infrastructure'],
  },
];

const STAGE_DELAY = 320;     // ms between each category appearing
const HOLD_MS = 5000;        // hold before looping
const FADE_MS = 400;

export default function SectorsSlide({ isActive }: SlideProps) {
  const [visibleStage, setVisibleStage] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  useEffect(() => {
    if (!isActive) {
      clearAll();
      setHeaderVisible(false);
      setVisibleStage(0);
      setFading(false);
      return;
    }

    const runCycle = () => {
      setFading(false);
      setHeaderVisible(false);
      setVisibleStage(0);

      // Header section appears first
      schedule(() => setHeaderVisible(true), 400);

      // Then each category cascades in
      CATEGORIES.forEach((_, i) => {
        schedule(() => setVisibleStage(i + 1), 1000 + i * STAGE_DELAY);
      });

      const allInTime = 1000 + CATEGORIES.length * STAGE_DELAY;

      schedule(() => setFading(true), allInTime + HOLD_MS);
      schedule(runCycle, allInTime + HOLD_MS + FADE_MS);
    };

    runCycle();
    return clearAll;
  }, [isActive]);

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
          Real product — Sector Sources
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
          Twelve service packs. Six live data sources.
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
          Tender feeds, food hygiene ratings, care registers, schools data — all browseable by service line and
          sector. Reps don't need to know which database holds what.
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
                leadflow-python-production.up.railway.app/discover?tab=sector_sources
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
              xsellio
            </div>
            {['Dashboard', 'Discover', 'Action Centre', 'My Leads'].map((n) => {
              const active = n === 'Discover';
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
                  }}
                >
                  {n}
                </div>
              );
            })}
          </div>

          {/* Content area */}
          <div
            style={{
              flex: 1,
              padding: '1.5vh 1.5vw',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
            }}
          >
            {/* Service packs row */}
            <div
              style={{
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6vw',
                flexWrap: 'wrap',
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: 'rgba(238, 243, 240, 0.5)',
                  minWidth: '7vw',
                }}
              >
                SERVICE PACKS
              </span>
              {SERVICE_PACKS.map((p) => (
                <SourcePill key={p.label} item={p} />
              ))}
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: 'rgba(238, 243, 240, 0.5)',
                  marginLeft: '0.8vw',
                }}
              >
                TENDERS
              </span>
              {TENDERS.map((p) => (
                <SourcePill key={p.label} item={p} />
              ))}
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: 'rgba(238, 243, 240, 0.5)',
                  marginLeft: '0.8vw',
                }}
              >
                REGISTERS
              </span>
              {REGISTERS.map((p) => (
                <SourcePill key={p.label} item={p} />
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                background: 'rgba(255, 255, 255, 0.08)',
                opacity: headerVisible ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            />

            {/* Categories streaming in */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8vh',
                overflow: 'hidden',
              }}
            >
              {CATEGORIES.map((cat, i) => {
                const visible = i < visibleStage;
                return (
                  <div
                    key={cat.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8vw',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(-8px)',
                      transition: 'opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    {/* Category label */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5vw',
                        minWidth: '11vw',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: '1.1vw' }}>{cat.icon}</span>
                      <span
                        className="font-display"
                        style={{
                          fontSize: '0.95vw',
                          fontWeight: 600,
                          color: '#eef3f0',
                        }}
                      >
                        {cat.label}
                      </span>
                    </div>

                    {/* Chips row */}
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        gap: '0.4vw',
                        flexWrap: 'wrap',
                      }}
                    >
                      {cat.chips.map((chip, ci) => (
                        <span
                          key={chip}
                          className="font-body"
                          style={{
                            fontSize: '0.75vw',
                            padding: '0.3vh 0.7vw',
                            background: 'rgba(22, 163, 74, 0.10)',
                            color: '#86efac',
                            border: '1px solid rgba(22, 163, 74, 0.25)',
                            borderRadius: '999px',
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'scale(1)' : 'scale(0.92)',
                            transition: `opacity 0.4s ${ci * 0.04}s ease, transform 0.4s ${ci * 0.04}s ease`,
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
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
                {visibleStage} / {CATEGORIES.length} categories loaded
              </span>
            </div>
            <span
              className="font-mono"
              style={{ fontSize: '0.7vw', color: 'rgba(238, 243, 240, 0.3)' }}
            >
              12 service packs · 6 live sources
            </span>
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>XSELLIO</strong> · CCO + IT BRIEFING</span>
        <span>06 / 18</span>
      </div>
    </div>
  );
}

// ═══════════ Source pill ═══════════
function SourcePill({ item }: { item: { label: string; icon: string; tag: string; col: string } }) {
  return (
    <span
      className="font-body"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3vw',
        fontSize: '0.78vw',
        padding: '0.3vh 0.6vw',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '0.25vw',
      }}
    >
      <span style={{ fontSize: '0.85vw' }}>{item.icon}</span>
      <span style={{ color: '#eef3f0', fontWeight: 500 }}>{item.label}</span>
      <span
        style={{
          fontSize: '0.62vw',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: item.col,
          background: `${item.col}22`,
          padding: '0.05vh 0.35vw',
          borderRadius: '0.2vw',
          textTransform: 'uppercase',
        }}
      >
        {item.tag}
      </span>
    </span>
  );
}
