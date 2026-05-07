import type { SlideProps } from '../slides';

const PROBLEMS = [
  {
    n: '01',
    title: 'Discovery',
    body: 'Companies House, FHRS, council sites, tender portals — searched manually, separately, repeatedly. Two reps could spend a morning finding the same lead.',
  },
  {
    n: '02',
    title: 'Qualification',
    body: 'No shared scoring. "Is this Leeds logistics depot a strong gritting prospect?" answered by feel, not data. Reps disagreed on what "good" looked like.',
  },
  {
    n: '03',
    title: 'Follow-through',
    body: 'Promised callbacks lived in heads, sticky notes, and Outlook flags. Tenders closed without quotes. Strong leads went cold while reps chased weak ones.',
  },
];

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
          style={{ fontSize: '0.95vw', marginBottom: '2vh' }}
        >
          The Before
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
          Three services, three different<br />
          prospect-hunting jobs.
        </h2>

        {/* Lede */}
        <p
          className="font-body"
          style={{
            fontSize: '1.15vw',
            lineHeight: 1.55,
            color: 'rgba(238, 243, 240, 0.65)',
            maxWidth: '78vw',
            marginBottom: '5vh',
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
            alignItems: 'start',
          }}
        >
          {PROBLEMS.map((p) => (
            <div
              key={p.n}
              className={isActive ? 'anim-card' : ''}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '0.6vw',
                padding: '3vh 2.2vw 3vh 2.2vw',
                position: 'relative',
                overflow: 'hidden',
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
        <span>02 / 14</span>
      </div>
    </div>
  );
}
