import type { SlideProps } from '../slides';

const BREAKDOWN = [
  {
    factor: 'Sector match',
    reason: 'SIC 49410 (Road Haulage)',
    code: 'GRITTING_SECTORS',
    pts: '+35',
    col: '#16a34a',
  },
  {
    factor: 'Cold postcode',
    reason: 'LS10 → "LS" in',
    code: 'COLD_POSTCODE_AREAS',
    pts: '+25',
    col: '#22c55e',
  },
  {
    factor: 'Keyword signals',
    reason: '"loading bay", "outdoor areas", "hardstanding"',
    code: '',
    pts: '+25',
    col: '#86efac',
  },
  {
    factor: 'Tender source',
    reason: 'Contracts Finder + "gritting" in title',
    code: '',
    pts: '+45',
    col: '#fbbf24',
  },
];

export default function WorkedExampleSlide({ isActive }: SlideProps) {
  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '7vh 6vw 6vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '1.5vh', color: '#fbbf24' }}>
          Worked example
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
          How a real lead gets scored.
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: '1.05vw',
            lineHeight: 1.55,
            color: 'rgba(238, 243, 240, 0.65)',
            maxWidth: '78vw',
            marginBottom: '4vh',
          }}
        >
          Yorkshire Cold Chain Ltd — a logistics depot in LS10 — imported from a Contracts Finder notice. Here's
          exactly how it earns its 92/100 gritting score.
        </p>

        {/* Lead identity card */}
        <div
          className={isActive ? 'anim-card' : ''}
          style={{
            background: 'rgba(22, 163, 74, 0.06)',
            border: '1px solid rgba(22, 163, 74, 0.30)',
            borderRadius: '0.5vw',
            padding: '2.2vh 2vw',
            marginBottom: '3vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2vw',
            animationDelay: '0.15s',
          }}
        >
          <div>
            <div
              className="font-display"
              style={{
                fontSize: '1.9vw',
                fontWeight: 700,
                color: '#eef3f0',
                letterSpacing: '-0.01em',
                marginBottom: '0.5vh',
              }}
            >
              Yorkshire Cold Chain Ltd
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '0.85vw',
                color: 'rgba(107, 155, 122, 0.95)',
              }}
            >
              LS10 2JA · SIC 49410 (Road Haulage) · Source: Contracts Finder
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.7vw' }}>
            {[
              { label: 'GRITTING', val: '92', strong: true },
              { label: 'PEST', val: '45', strong: false },
              { label: 'LAND.', val: '10', strong: false },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: s.strong ? 'rgba(22, 163, 74, 0.20)' : 'rgba(255, 255, 255, 0.04)',
                  border: s.strong ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: '0.3vw',
                  padding: '1.2vh 1.2vw',
                  textAlign: 'center',
                  minWidth: '5vw',
                  boxShadow: s.strong ? '0 0 16px rgba(251, 191, 36, 0.18)' : 'none',
                }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.9vw',
                    fontWeight: 800,
                    color: s.strong ? '#fbbf24' : '#eef3f0',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {s.val}
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '0.65vw',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    color: s.strong ? '#fbbf24' : 'rgba(107, 155, 122, 0.95)',
                    marginTop: '0.4vh',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div
          className="font-mono"
          style={{
            fontSize: '0.85vw',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: '#fbbf24',
            marginBottom: '1.5vh',
          }}
        >
          GRITTING SCORE — ADDITIVE BREAKDOWN
        </div>

        <div className="stagger" style={{ display: 'flex', flexDirection: 'column' }}>
          {BREAKDOWN.map((b) => (
            <div
              key={b.factor}
              className={isActive ? 'anim-card' : ''}
              style={{
                display: 'grid',
                gridTemplateColumns: '14vw 1fr 6vw',
                alignItems: 'center',
                gap: '1.5vw',
                padding: '1.3vh 0.4vw',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: '1.15vw',
                  fontWeight: 700,
                  color: '#eef3f0',
                }}
              >
                {b.factor}
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: '0.95vw',
                  color: 'rgba(238, 243, 240, 0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6vw',
                  flexWrap: 'wrap',
                }}
              >
                <span>{b.reason}</span>
                {b.code && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.75vw',
                      fontWeight: 600,
                      color: b.col,
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '0.2vh 0.5vw',
                      borderRadius: '0.2vw',
                    }}
                  >
                    {b.code}
                  </span>
                )}
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: '1.6vw',
                  fontWeight: 700,
                  color: b.col,
                  textAlign: 'right',
                  letterSpacing: '-0.01em',
                }}
              >
                {b.pts}
              </div>
            </div>
          ))}
        </div>

        {/* Total bar */}
        <div
          className={isActive ? 'anim-card' : ''}
          style={{
            background: 'linear-gradient(90deg, rgba(22, 163, 74, 0.20), rgba(251, 191, 36, 0.18))',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            borderRadius: '0.4vw',
            padding: '1.6vh 2vw',
            marginTop: '2vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            animationDelay: '0.7s',
          }}
        >
          <div
            className="font-body"
            style={{
              fontSize: '1vw',
              color: '#eef3f0',
              fontStyle: 'italic',
            }}
          >
            Raw total: <strong style={{ color: '#fbbf24', fontStyle: 'normal' }}>130 points</strong> · capped at 100 · pushes past 70 → <strong style={{ color: '#fbbf24', fontStyle: 'normal' }}>STRONG band</strong>
          </div>
          <div
            className="font-display"
            style={{
              fontSize: '2vw',
              fontWeight: 800,
              color: '#fbbf24',
              letterSpacing: '-0.02em',
            }}
          >
            100 <span style={{ color: 'rgba(251, 191, 36, 0.4)' }}>/</span> 100
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>09 / 17</span>
      </div>
    </div>
  );
}
