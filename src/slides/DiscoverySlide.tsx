import type { SlideProps } from '../slides';
import { useState, useEffect, useRef } from 'react';

// ─── Three searches that cycle ──────────────────────────────
type Source = 'CH' | 'GP' | 'Yelp' | 'FHRS' | 'CQC' | 'Tender';

interface Result {
  name: string;
  city: string;
  postcode: string;
  source: Source;
  scores: { g: number; l: number; p: number };
  band: 'Strong' | 'Good' | 'Possible';
}

interface Search {
  query: string;
  durationMs: number;  // total time this search takes
  results: Result[];
}

const SEARCHES: Search[] = [
  {
    query: 'cold storage Leeds',
    durationMs: 1200,
    results: [
      { name: 'Yorkshire Cold Chain Ltd',    city: 'Leeds',     postcode: 'LS10', source: 'Tender', scores: { g: 92, l: 10, p: 45 }, band: 'Strong' },
      { name: 'Northern Frozen Logistics',   city: 'Leeds',     postcode: 'LS15', source: 'CH',     scores: { g: 85, l: 22, p: 38 }, band: 'Strong' },
      { name: 'Aire Valley Distribution',    city: 'Leeds',     postcode: 'LS11', source: 'CH',     scores: { g: 78, l: 18, p: 31 }, band: 'Strong' },
      { name: 'Leeds Refrigerated Transit',  city: 'Leeds',     postcode: 'LS12', source: 'GP',     scores: { g: 71, l: 14, p: 28 }, band: 'Strong' },
    ],
  },
  {
    query: 'care homes Birmingham',
    durationMs: 1400,
    results: [
      { name: 'Birmingham Care Centre',      city: 'Birmingham', postcode: 'B15',  source: 'CQC',  scores: { g: 35, l: 58, p: 88 }, band: 'Strong' },
      { name: 'Edgbaston Residential Care',  city: 'Birmingham', postcode: 'B17',  source: 'CQC',  scores: { g: 28, l: 64, p: 82 }, band: 'Strong' },
      { name: 'Solihull Nursing Group',      city: 'Solihull',   postcode: 'B91',  source: 'CQC',  scores: { g: 22, l: 71, p: 76 }, band: 'Strong' },
      { name: 'Aston Hall Care Home',        city: 'Birmingham', postcode: 'B6',   source: 'CH',   scores: { g: 31, l: 45, p: 67 }, band: 'Good' },
    ],
  },
  {
    query: 'hotels Manchester',
    durationMs: 1300,
    results: [
      { name: 'Manchester Grand Hotel',      city: 'Manchester', postcode: 'M1',   source: 'FHRS', scores: { g: 58, l: 79, p: 71 }, band: 'Strong' },
      { name: 'Spinningfields Boutique',     city: 'Manchester', postcode: 'M3',   source: 'Yelp', scores: { g: 52, l: 68, p: 64 }, band: 'Good' },
      { name: 'Salford Quays Inn',           city: 'Salford',    postcode: 'M50',  source: 'GP',   scores: { g: 48, l: 72, p: 58 }, band: 'Good' },
      { name: 'Northern Quarter Townhouse',  city: 'Manchester', postcode: 'M4',   source: 'FHRS', scores: { g: 42, l: 55, p: 61 }, band: 'Good' },
    ],
  },
];

// Source badge colours
const SOURCE_STYLE: Record<Source, { label: string; bg: string; col: string }> = {
  CH:     { label: 'Companies House', bg: 'rgba(96, 165, 250, 0.15)',  col: '#93c5fd' },
  GP:     { label: 'Google Places',   bg: 'rgba(34, 197, 94, 0.15)',   col: '#86efac' },
  Yelp:   { label: 'Yelp',            bg: 'rgba(248, 113, 113, 0.15)', col: '#fca5a5' },
  FHRS:   { label: 'FHRS',            bg: 'rgba(251, 191, 36, 0.15)',  col: '#fcd34d' },
  CQC:    { label: 'CQC',             bg: 'rgba(192, 132, 252, 0.15)', col: '#d8b4fe' },
  Tender: { label: 'Tender',          bg: 'rgba(251, 191, 36, 0.20)',  col: '#fbbf24' },
};

const BAND_COL = {
  Strong: '#22c55e',
  Good: '#86efac',
  Possible: '#eab308',
};

// ─── Phase machine ─────────────────────────────────────────
type Phase = 'idle' | 'typing' | 'searching' | 'results' | 'fading';

const TYPE_SPEED = 75;       // ms per character
const SEARCHING_MS = 700;    // "searching..." state
const RESULTS_HOLD = 4500;   // how long results stay visible
const FADE_MS = 350;

export default function DiscoverySlide({ isActive }: SlideProps) {
  const [searchIdx, setSearchIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [typed, setTyped] = useState('');
  const timeoutsRef = useRef<number[]>([]);

  const search = SEARCHES[searchIdx];

  // Clean up all pending timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  // Run the animation loop
  useEffect(() => {
    if (!isActive) {
      clearAllTimeouts();
      setPhase('idle');
      setTyped('');
      return;
    }

    // Start the cycle
    const runCycle = (s: Search, nextIdx: number) => {
      // Reset
      setTyped('');
      setPhase('typing');

      // Type each character
      const chars = s.query.split('');
      chars.forEach((char, i) => {
        schedule(() => {
          setTyped(s.query.slice(0, i + 1));
        }, (i + 1) * TYPE_SPEED);
      });

      const typingEnd = chars.length * TYPE_SPEED + 200;

      // Searching state
      schedule(() => setPhase('searching'), typingEnd);

      // Show results
      schedule(() => setPhase('results'), typingEnd + SEARCHING_MS);

      // Hold, then fade
      schedule(() => setPhase('fading'), typingEnd + SEARCHING_MS + RESULTS_HOLD);

      // Next search
      schedule(() => {
        setSearchIdx(nextIdx);
      }, typingEnd + SEARCHING_MS + RESULTS_HOLD + FADE_MS);
    };

    runCycle(search, (searchIdx + 1) % SEARCHES.length);

    return clearAllTimeouts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchIdx, isActive]);

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
          Real product — Lead Discovery
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: '3.4vw',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#eef3f0',
            marginBottom: '1.2vh',
          }}
        >
          Search once. Score everything.
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: '1.05vw',
            lineHeight: 1.5,
            color: 'rgba(238, 243, 240, 0.65)',
            maxWidth: '78vw',
            marginBottom: '2.5vh',
          }}
        >
          Type a company name, town, or sector. LeadFlow queries Companies House, Google Places, Yelp, and the
          tender feeds simultaneously — every result is scored for all three services before it lands.
        </p>

        {/* Browser frame with the live demo */}
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
                style={{
                  fontSize: '0.85vw',
                  color: 'rgba(238, 243, 240, 0.7)',
                  letterSpacing: '0.02em',
                }}
              >
                leadflow-python-production.up.railway.app/discover
              </span>
            </div>
          </div>

          {/* App nav bar */}
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

          {/* Search input area */}
          <div
            style={{
              padding: '2.2vh 1.5vw 1.5vh',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '0.6vw',
                alignItems: 'stretch',
              }}
            >
              {/* Input field with typed text */}
              <div
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(22, 163, 74, 0.30)',
                  borderRadius: '0.3vw',
                  padding: '1vh 1vw',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5vw',
                }}
              >
                <span style={{ fontSize: '1vw', color: '#16a34a' }}>🔍</span>
                <span
                  className="font-body"
                  style={{
                    fontSize: '1vw',
                    color: typed ? '#eef3f0' : 'rgba(238, 243, 240, 0.35)',
                  }}
                >
                  {typed || 'Company name, town, or sector…'}
                </span>
                {/* Blinking cursor */}
                {phase === 'typing' && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '0.1vw',
                      height: '1.4vh',
                      background: '#22c55e',
                      animation: 'cursor-blink 0.7s steps(2) infinite',
                    }}
                  />
                )}
              </div>

              {/* Auto-detect dropdown */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '0.3vw',
                  padding: '1vh 1vw',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4vw',
                }}
              >
                <span
                  className="font-body"
                  style={{
                    fontSize: '0.9vw',
                    color: 'rgba(238, 243, 240, 0.6)',
                  }}
                >
                  Auto-detect
                </span>
                <span style={{ fontSize: '0.7vw', color: 'rgba(238, 243, 240, 0.4)' }}>▾</span>
              </div>

              {/* Search button */}
              <button
                style={{
                  background: phase === 'typing' || phase === 'searching' ? '#16a34a' : 'rgba(22, 163, 74, 0.85)',
                  color: '#0e1a12',
                  border: 'none',
                  borderRadius: '0.3vw',
                  padding: '0 1.5vw',
                  fontSize: '0.9vw',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4vw',
                  transition: 'all 0.2s ease',
                  boxShadow: phase === 'typing' || phase === 'searching' ? '0 0 16px rgba(22, 163, 74, 0.5)' : 'none',
                }}
              >
                {phase === 'searching' ? (
                  <>
                    <span
                      style={{
                        width: '0.8vw',
                        height: '0.8vw',
                        border: '2px solid rgba(14, 26, 18, 0.3)',
                        borderTopColor: '#0e1a12',
                        borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite',
                      }}
                    />
                    Searching…
                  </>
                ) : (
                  'Search All Sources'
                )}
              </button>
            </div>

            {/* Source pills */}
            <div
              style={{
                display: 'flex',
                gap: '0.5vw',
                marginTop: '1.2vh',
              }}
            >
              {(['Companies House', 'Google Places', 'Yelp', 'FHRS', 'CQC', 'Tenders'] as const).map((s) => (
                <span
                  key={s}
                  className="font-body"
                  style={{
                    fontSize: '0.78vw',
                    padding: '0.3vh 0.6vw',
                    background: 'rgba(22, 163, 74, 0.10)',
                    color: '#86efac',
                    borderRadius: '999px',
                    border: '1px solid rgba(22, 163, 74, 0.25)',
                  }}
                >
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          {/* Results area */}
          <div
            style={{
              flex: 1,
              padding: '0 1.5vw 1.5vh',
              overflow: 'hidden',
              opacity: phase === 'fading' ? 0 : 1,
              transition: `opacity ${FADE_MS}ms ease`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {phase === 'results' ? (
              <ResultsList key={searchIdx} results={search.results} query={search.query} />
            ) : phase === 'searching' ? (
              <SearchingState />
            ) : (
              <EmptyState />
            )}
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
                {phase === 'searching' ? 'Querying 4 sources…' : phase === 'results' ? `${search.results.length} results · sorted by score` : 'Ready · enter a query'}
              </span>
            </div>
            <span
              className="font-mono"
              style={{ fontSize: '0.7vw', color: 'rgba(238, 243, 240, 0.3)' }}
            >
              Search {searchIdx + 1} / {SEARCHES.length}
            </span>
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>05 / 17</span>
      </div>

      {/* Scoped animations */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes result-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .result-row {
          opacity: 0;
          animation: result-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}

// ═══════════ Subcomponents ═══════════

function EmptyState() {
  return (
    <div
      style={{
        flex: 1,
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '0.4vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1vh',
      }}
    >
      <span style={{ fontSize: '2.5vw', opacity: 0.4 }}>🏢</span>
      <span
        className="font-body"
        style={{
          fontSize: '0.9vw',
          color: 'rgba(238, 243, 240, 0.4)',
        }}
      >
        Search the multi-source register
      </span>
    </div>
  );
}

function SearchingState() {
  return (
    <div
      style={{
        flex: 1,
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(22, 163, 74, 0.20)',
        borderRadius: '0.4vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1.5vh',
      }}
    >
      <div
        style={{
          width: '2.5vw',
          height: '2.5vw',
          border: '3px solid rgba(34, 197, 94, 0.20)',
          borderTopColor: '#22c55e',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span
        className="font-mono"
        style={{
          fontSize: '0.85vw',
          color: '#86efac',
          letterSpacing: '0.1em',
        }}
      >
        QUERYING 4 SOURCES IN PARALLEL
      </span>
      <div style={{ display: 'flex', gap: '0.5vw', marginTop: '0.5vh' }}>
        {['Companies House', 'Google Places', 'Yelp', 'Tenders'].map((s, i) => (
          <span
            key={s}
            className="font-mono"
            style={{
              fontSize: '0.7vw',
              color: 'rgba(238, 243, 240, 0.55)',
              padding: '0.25vh 0.6vw',
              background: 'rgba(22, 163, 74, 0.08)',
              border: '1px solid rgba(22, 163, 74, 0.20)',
              borderRadius: '999px',
              animation: `result-in 0.4s ${i * 0.1}s ease both`,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function ResultsList({ results, query }: { results: Result[]; query: string }) {
  return (
    <div
      style={{
        flex: 1,
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(22, 163, 74, 0.15)',
        borderRadius: '0.4vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Results header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.9vh 1vw',
          background: 'rgba(22, 163, 74, 0.06)',
          borderBottom: '1px solid rgba(22, 163, 74, 0.15)',
        }}
      >
        <span
          className="font-body"
          style={{ fontSize: '0.85vw', color: 'rgba(238, 243, 240, 0.85)' }}
        >
          <strong style={{ color: '#22c55e' }}>{results.length} results</strong> for{' '}
          <span className="font-mono" style={{ color: '#fbbf24' }}>"{query}"</span> · sorted by gritting score
        </span>
        <span
          className="font-mono"
          style={{ fontSize: '0.7vw', color: 'rgba(238, 243, 240, 0.45)', letterSpacing: '0.1em' }}
        >
          DEDUPED · SCORED · 0.6s
        </span>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2.4fr 1fr 1fr 1.6fr 0.8fr',
          gap: '0.8vw',
          padding: '0.6vh 1vw',
          fontSize: '0.65vw',
          color: 'rgba(238, 243, 240, 0.4)',
          letterSpacing: '0.16em',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          background: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <span>COMPANY</span>
        <span>LOCATION</span>
        <span>SOURCE</span>
        <span>G · L · P SCORES</span>
        <span style={{ textAlign: 'right' }}>BAND</span>
      </div>

      {/* Result rows */}
      {results.map((r, i) => (
        <ResultRow key={`${r.name}-${i}`} result={r} delayMs={i * 110} />
      ))}
    </div>
  );
}

function ResultRow({ result, delayMs }: { result: Result; delayMs: number }) {
  const src = SOURCE_STYLE[result.source];
  return (
    <div
      className="result-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '2.4fr 1fr 1fr 1.6fr 0.8fr',
        gap: '0.8vw',
        padding: '1vh 1vw',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        animationDelay: `${delayMs}ms`,
      }}
    >
      {/* Company */}
      <span
        className="font-display"
        style={{ fontSize: '0.95vw', fontWeight: 600, color: '#eef3f0' }}
      >
        {result.name}
      </span>

      {/* Location */}
      <span
        className="font-body"
        style={{ fontSize: '0.85vw', color: 'rgba(238, 243, 240, 0.65)' }}
      >
        {result.city} · <span className="font-mono" style={{ fontSize: '0.78vw' }}>{result.postcode}</span>
      </span>

      {/* Source pill */}
      <span>
        <span
          className="font-body"
          style={{
            fontSize: '0.72vw',
            padding: '0.2vh 0.5vw',
            background: src.bg,
            color: src.col,
            borderRadius: '0.2vw',
            fontWeight: 500,
          }}
        >
          {src.label}
        </span>
      </span>

      {/* Three scores with mini bars */}
      <div style={{ display: 'flex', gap: '0.4vw' }}>
        {(['g', 'l', 'p'] as const).map((k) => {
          const v = result.scores[k];
          const colour = v >= 70 ? '#22c55e' : v >= 55 ? '#86efac' : v >= 40 ? '#eab308' : '#6b7280';
          const label = k === 'g' ? 'G' : k === 'l' ? 'L' : 'P';
          return (
            <div
              key={k}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25vw',
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: '0.65vw',
                  color: 'rgba(238, 243, 240, 0.4)',
                  width: '0.6vw',
                }}
              >
                {label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '0.5vh',
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${v}%`,
                    background: colour,
                    borderRadius: '999px',
                  }}
                />
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  fontWeight: 600,
                  color: colour,
                  minWidth: '1.2vw',
                  textAlign: 'right',
                }}
              >
                {v}
              </span>
            </div>
          );
        })}
      </div>

      {/* Band */}
      <span style={{ textAlign: 'right' }}>
        <span
          className="font-body"
          style={{
            fontSize: '0.75vw',
            fontWeight: 600,
            padding: '0.2vh 0.5vw',
            background: `${BAND_COL[result.band]}22`,
            color: BAND_COL[result.band],
            border: `1px solid ${BAND_COL[result.band]}55`,
            borderRadius: '0.2vw',
          }}
        >
          {result.band}
        </span>
      </span>
    </div>
  );
}
