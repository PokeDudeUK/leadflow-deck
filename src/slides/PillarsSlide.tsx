import type { SlideProps } from '../slides';

const PILLARS = [
  {
    tag: '01 — DISCOVER',
    title: 'Find leads automatically',
    body: 'Six live data sources query in parallel: Companies House, FHRS, CQC, GIAS, Find a Tender, Contracts Finder. Search by sector and location; results stream in already deduped.',
    accent: '#16a34a',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
      </>
    ),
  },
  {
    tag: '02 — SCORE',
    title: 'Rank them, transparently',
    body: 'Every lead gets three independent 0–100 scores — gritting, landscaping, pest. Rule-based, no black box. Reps see exactly which signals fired and why.',
    accent: '#22c55e',
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 4 5-5" />
      </>
    ),
  },
  {
    tag: '03 — ACTION',
    title: 'Move them through the pipeline',
    body: 'Assign, note, set follow-ups, change stage. Overdue chasers surface automatically. Every change is timestamped and audit-logged.',
    accent: '#fbbf24',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

export default function PillarsSlide({ isActive }: SlideProps) {
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
        <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '2vh' }}>
          The product, in one slide
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: '4.2vw',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#eef3f0',
            marginBottom: '2.5vh',
          }}
        >
          One platform. Three pillars.
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: '1.15vw',
            lineHeight: 1.55,
            color: 'rgba(238, 243, 240, 0.65)',
            maxWidth: '70vw',
            marginBottom: '6vh',
          }}
        >
          LeadFlow takes prospects from cold-list to qualified opportunity in a single pipeline — with consistent
          scoring across all three service lines, and every action logged.
        </p>

        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2vw',
            flex: 1,
          }}
        >
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className={isActive ? 'anim-card' : ''}
              style={{
                paddingTop: '3vh',
                paddingBottom: '3vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top rule */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: p.accent,
                }}
              />

              <div
                className="font-mono"
                style={{
                  fontSize: '0.85vw',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: p.accent,
                  marginBottom: '3vh',
                }}
              >
                {p.tag}
              </div>

              {/* Icon circle */}
              <div
                style={{
                  width: '4vw',
                  height: '4vw',
                  borderRadius: '50%',
                  background: 'rgba(22, 163, 74, 0.10)',
                  border: `1px solid ${p.accent}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '3vh',
                  color: p.accent,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '2vw', height: '2vw' }}
                >
                  {p.icon}
                </svg>
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: '2.1vw',
                  fontWeight: 700,
                  color: '#eef3f0',
                  marginBottom: '2vh',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                {p.title}
              </h3>

              <p
                className="font-body"
                style={{
                  fontSize: '1.0vw',
                  lineHeight: 1.6,
                  color: 'rgba(238, 243, 240, 0.7)',
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>03 / 15</span>
      </div>
    </div>
  );
}
