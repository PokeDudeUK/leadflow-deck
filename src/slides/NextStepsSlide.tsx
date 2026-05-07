import type { SlideProps } from '../slides';

const STEPS = [
  {
    n: '01',
    when: 'THIS WEEK',
    body: 'Migrate to Postgres. Re-test under load. Lock down auth flows.',
  },
  {
    n: '02',
    when: 'NEXT WEEK',
    body: 'Pilot with 3–5 named reps. Confirm we want SSO before scaling.',
  },
  {
    n: '03',
    when: 'TWO WEEKS',
    body: 'Custom domain. Email digests. Wave-1 onboarding (10 reps).',
  },
  {
    n: '04',
    when: 'BY MONTH-END',
    body: 'Full rollout. Pilot review meeting. Decide v3 priorities.',
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
          What we're asking for
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
          Production-ready.<br />
          <span style={{ color: '#22c55e', fontStyle: 'italic', fontWeight: 600 }}>Let's pilot it.</span>
        </h1>

        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.2vw',
            maxWidth: '88vw',
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={isActive ? 'anim-card' : ''}
              style={{
                background: 'rgba(14, 42, 36, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(22, 163, 74, 0.25)',
                borderRadius: '0.5vw',
                padding: '2.2vh 1.6vw',
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: '2.4vw',
                  fontWeight: 800,
                  color: '#fbbf24',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: '0.8vh',
                }}
              >
                {s.n}
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
                {s.when}
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: '0.9vw',
                  color: '#eef3f0',
                  lineHeight: 1.5,
                }}
              >
                {s.body}
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
          15 / 15
        </span>
      </div>
    </div>
  );
}
