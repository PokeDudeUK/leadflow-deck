import type { SlideProps } from '../slides';

const FACTORS = [
  {
    label: 'Sector match',
    max: 35,
    col: '#16a34a',
    bg: 'rgba(22, 163, 74, 0.08)',
    border: 'rgba(22, 163, 74, 0.30)',
    body: 'SIC code and company name matched against a per-service keyword list. The foundation of every score — does this business type inherently need the service?',
    code: 'GRITTING_SECTORS',
  },
  {
    label: 'Location value',
    max: 25,
    col: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.08)',
    border: 'rgba(34, 197, 94, 0.30)',
    body: 'Postcode resolved to lat/lng and checked against climate and cold-region lists. Northern postcodes lift gritting scores; not landscaping.',
    code: 'COLD_POSTCODE_AREAS',
  },
  {
    label: 'Keyword signals',
    max: 30,
    col: '#86efac',
    bg: 'rgba(134, 239, 172, 0.06)',
    border: 'rgba(134, 239, 172, 0.30)',
    body: 'Notes, tender descriptions, and place-type tags scanned for operational language: "loading bay", "kitchen", "green space".',
    code: 'KEYWORD_SIGNALS',
  },
  {
    label: 'Tender source bonus',
    max: 45,
    col: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.06)',
    border: 'rgba(251, 191, 36, 0.35)',
    body: 'Imported from a public procurement notice with a matching keyword in the title — confirms a real, budgeted, time-bound need. Strongest single factor.',
    code: 'TENDER_BONUS',
  },
];

const TIERS = [
  { label: 'Strong', range: '≥ 70', col: '#16a34a' },
  { label: 'Good', range: '55–69', col: '#22c55e' },
  { label: 'Possible', range: '40–54', col: '#eab308' },
  { label: 'Weak', range: '< 40', col: '#6b7280' },
];

export default function ScoringSlide({ isActive }: SlideProps) {
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
        <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '1.5vh' }}>
          How leads get scored
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: '3.6vw',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#eef3f0',
            marginBottom: '1.5vh',
          }}
        >
          Four factors. Three services. No black box.
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: '1.05vw',
            lineHeight: 1.55,
            color: 'rgba(238, 243, 240, 0.65)',
            maxWidth: '70vw',
            marginBottom: '4vh',
          }}
        >
          Scoring is rule-based and deterministic — no machine learning, no adaptive weights, no surprises.
          Every signal is documented and every breakdown is visible on the lead profile.
        </p>

        <div style={{ display: 'flex', gap: '2vw', flex: 1, overflow: 'hidden' }}>
          {/* Left: factors with animated bars */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '0.8vw',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#16a34a',
                marginBottom: '0.5vh',
              }}
            >
              FOUR SCORING FACTORS — UP TO 135 POINTS RAW · CAPPED AT 100
            </div>

            {FACTORS.map((f, i) => (
              <div
                key={f.label}
                className={isActive ? 'anim-card' : ''}
                style={{
                  background: f.bg,
                  border: `1px solid ${f.border}`,
                  borderRadius: '0.4vw',
                  padding: '1.4vh 1.4vw',
                  animationDelay: `${i * 0.09}s`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw', marginBottom: '0.8vh' }}>
                  <div
                    className="font-display"
                    style={{
                      fontSize: '1.4vw',
                      fontWeight: 700,
                      color: f.col,
                      flexShrink: 0,
                      minWidth: '12vw',
                    }}
                  >
                    {f.label}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '0.5vh',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      className={isActive ? 'anim-bar' : ''}
                      style={{
                        height: '100%',
                        width: `${(f.max / 45) * 100}%`,
                        background: f.col,
                        borderRadius: '999px',
                        animationDelay: `${0.25 + i * 0.09}s`,
                      }}
                    />
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: '1.7vw',
                      fontWeight: 800,
                      color: f.col,
                      flexShrink: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    +{f.max} max
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1vw',
                    paddingLeft: '0.2vw',
                  }}
                >
                  <span
                    className="font-body"
                    style={{
                      fontSize: '0.92vw',
                      color: 'rgba(238, 243, 240, 0.75)',
                      lineHeight: 1.45,
                      flex: 1,
                    }}
                  >
                    {f.body}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.78vw',
                      fontWeight: 600,
                      color: f.col,
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '0.3vh 0.6vw',
                      borderRadius: '0.2vw',
                      flexShrink: 0,
                    }}
                  >
                    {f.code}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: score tiers */}
          <div style={{ width: '24vw', display: 'flex', flexDirection: 'column' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '0.8vw',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#fbbf24',
                marginBottom: '1.5vh',
              }}
            >
              SCORE TIERS — PER SERVICE
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
              {TIERS.map((t, i) => (
                <div
                  key={t.label}
                  className={isActive ? 'anim-card' : ''}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '0.35vw',
                    padding: '1.4vh 1.2vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    animationDelay: `${0.5 + i * 0.08}s`,
                    borderLeft: `3px solid ${t.col}`,
                  }}
                >
                  <div className="font-display" style={{ fontSize: '1.3vw', fontWeight: 700, color: t.col }}>
                    {t.label}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '1.1vw',
                      fontWeight: 600,
                      color: '#eef3f0',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t.range}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '2vh',
                background: 'rgba(22, 163, 74, 0.06)',
                border: '1px solid rgba(22, 163, 74, 0.18)',
                borderRadius: '0.35vw',
                padding: '1.4vh 1.2vw',
              }}
            >
              <div className="font-body" style={{ fontSize: '0.85vw', color: 'rgba(238, 243, 240, 0.7)', lineHeight: 1.5 }}>
                Raw totals can exceed 100. The score is capped — the cap prevents over-scoring while the
                additive model rewards compound signals naturally.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>XSELLIO</strong> · CCO + IT BRIEFING</span>
        <span>08 / 18</span>
      </div>
    </div>
  );
}
