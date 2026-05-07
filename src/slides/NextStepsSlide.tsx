import type { SlideProps } from '../slides';

const HIGHLIGHTS = [
  {
    metric: '+£3.6M',
    metricSub: 'modelled annual uplift',
    label: 'AT 10-REP PILOT',
    body: 'Closing the gap to target — 90 extra wins per rep, per year, at £4k average contract value.',
  },
  {
    metric: '2 hrs',
    metricSub: 'back per rep, per day',
    label: 'SELLING, NOT SEARCHING',
    body: 'Reps stop hunting on portals and spreadsheets. The platform brings the leads to them, scored.',
  },
  {
    metric: 'v2.44',
    metricSub: 'live in production today',
    label: 'NOT A PROTOTYPE',
    body: 'Already running. Already integrated with six live data sources. Pilot-ready when you are.',
  },
];

export default function NextStepsSlide({ isActive }: SlideProps) {
  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      {/* Hero photo */}
      <img
        src="./assets/hero-fields.jpg"
        alt=""
        className={isActive ? 'anim-zoom' : ''}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.32,
          filter: 'saturate(1.1)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(14, 26, 18, 0.78) 0%, rgba(14, 26, 18, 0.95) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(22, 163, 74, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 163, 74, 0.05) 1px, transparent 1px)',
          backgroundSize: '4vw 4vw',
        }}
      />

      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '12vh 6vw 9vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          className="slide-eyebrow"
          style={{
            fontSize: '0.95vw',
            marginBottom: '2vh',
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            gap: '0.7vw',
            opacity: 0,
            animation: isActive ? 'card-up 0.7s 0.1s ease forwards' : 'none',
          }}
        >
          <span
            className="anim-pulse"
            style={{
              width: '0.6vw',
              height: '0.6vw',
              borderRadius: '50%',
              background: '#16a34a',
            }}
          />
          What's possible
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: '6.5vw',
            fontWeight: 800,
            lineHeight: 0.96,
            letterSpacing: '-0.03em',
            color: '#eef3f0',
            marginBottom: '5vh',
            opacity: 0,
            animation: isActive ? 'card-up 0.9s 0.3s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          }}
        >
          Production-ready today.<br />
          <span style={{ color: '#22c55e', fontStyle: 'italic', fontWeight: 600 }}>Pilot-ready tomorrow.</span>
        </h1>

        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5vw',
            maxWidth: '88vw',
          }}
        >
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.label}
              className={isActive ? 'anim-card' : ''}
              style={{
                background: 'rgba(14, 42, 36, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(22, 163, 74, 0.30)',
                borderRadius: '0.5vw',
                padding: '2.5vh 1.8vw',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                className="font-display hero-number-glow-amber"
                style={{
                  fontSize: '3vw',
                  fontWeight: 800,
                  color: '#fbbf24',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: '0.6vh',
                }}
              >
                {h.metric}
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: '0.85vw',
                  color: 'rgba(238, 243, 240, 0.55)',
                  fontStyle: 'italic',
                  marginBottom: '1.4vh',
                }}
              >
                {h.metricSub}
              </div>
              <div
                style={{
                  width: '2vw',
                  height: '2px',
                  background: '#16a34a',
                  marginBottom: '1.2vh',
                }}
              />
              <div
                className="font-mono"
                style={{
                  fontSize: '0.78vw',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: '#86efac',
                  marginBottom: '1.2vh',
                }}
              >
                {h.label}
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: '0.92vw',
                  color: '#eef3f0',
                  lineHeight: 1.5,
                }}
              >
                {h.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom URL strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '2vh 6vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(22, 163, 74, 0.25)',
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: '1vw',
            color: '#86efac',
          }}
        >
          <strong style={{ color: '#fbbf24' }}>Live now →</strong> leadflow-python-production.up.railway.app
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: '0.85vw',
            color: '#22c55e',
            letterSpacing: '0.18em',
            fontWeight: 600,
          }}
        >
          18 / 18
        </span>
      </div>
    </div>
  );
}
