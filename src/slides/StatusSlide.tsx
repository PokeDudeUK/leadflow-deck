import type { SlideProps } from '../slides';

export default function StatusSlide({ isActive }: SlideProps) {
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
        <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '2vh', color: '#fbbf24' }}>
          Where we are today
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: '4vw',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#eef3f0',
            marginBottom: '5vh',
          }}
        >
          Already running. Already in production.
        </h2>

        <div
          className={isActive ? 'anim-card' : ''}
          style={{
            background: 'rgba(22, 163, 74, 0.06)',
            border: '1.5px solid rgba(22, 163, 74, 0.40)',
            borderRadius: '0.6vw',
            padding: '3vh 2.5vw',
            marginBottom: '4vh',
            position: 'relative',
            overflow: 'hidden',
            animationDelay: '0.2s',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.7), transparent)',
            }}
          />

          <div
            className="font-mono"
            style={{
              fontSize: '0.85vw', fontWeight: 600,
              letterSpacing: '0.22em',
              color: '#fbbf24',
              marginBottom: '1.5vh',
              display: 'flex', alignItems: 'center', gap: '0.7vw',
            }}
          >
            <span
              className="anim-pulse"
              style={{
                width: '0.6vw', height: '0.6vw',
                borderRadius: '50%',
                background: '#16a34a',
              }}
            />
            LIVE STAGING URL
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '2vw', fontWeight: 600,
              color: '#eef3f0',
              marginBottom: '1.5vh',
              letterSpacing: '-0.01em',
            }}
          >
            https://leadflow-python-production.up.railway.app
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '0.85vw',
              color: 'rgba(238, 243, 240, 0.55)',
              display: 'flex', alignItems: 'center', gap: '1vw',
            }}
          >
            <span style={{ color: '#22c55e', fontWeight: 600 }}>● Online</span>
            <span style={{ color: 'rgba(22, 163, 74, 0.3)' }}>·</span>
            <span>Build v2.44</span>
            <span style={{ color: 'rgba(22, 163, 74, 0.3)' }}>·</span>
            <span style={{ color: 'rgba(238, 243, 240, 0.7)' }}>Last deploy: GitHub auto-push</span>
          </div>
        </div>

        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.2vw',
            marginBottom: '4vh',
          }}
        >
          {[
            { tag: 'HOSTING', val: 'Railway', note: 'Auto-deploy on push to GitHub main' },
            { tag: 'VERSION CONTROL', val: 'GitHub', note: 'Private repo · all secrets in Railway env' },
            { tag: 'DATABASE', val: 'SQLite → Postgres', note: 'Migrating before pilot rollout' },
          ].map((c, i) => (
            <div
              key={i}
              className={isActive ? 'anim-card' : ''}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(22, 163, 74, 0.18)',
                borderRadius: '0.5vw',
                padding: '2.5vh 1.8vw',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '0.75vw', fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: '#fbbf24',
                  marginBottom: '1.5vh',
                }}
              >
                {c.tag}
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: '1.7vw', fontWeight: 700,
                  color: '#eef3f0',
                  marginBottom: '1vh',
                  letterSpacing: '-0.01em',
                }}
              >
                {c.val}
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: '0.9vw',
                  color: 'rgba(107, 155, 122, 0.95)',
                }}
              >
                {c.note}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'rgba(22, 163, 74, 0.06)',
            borderLeft: '3px solid #fbbf24',
            padding: '1.6vh 1.8vw',
            display: 'flex', alignItems: 'center', gap: '1.5vw',
            marginTop: 'auto',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: '0.8vw', fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#fbbf24',
              flexShrink: 0,
            }}
          >
            FOR IT
          </span>
          <span
            className="font-body"
            style={{
              fontSize: '1vw',
              color: 'rgba(238, 243, 240, 0.8)',
              fontStyle: 'italic',
            }}
          >
            No new infrastructure to procure. No PCs to re-image. One URL, role-based access, regenerated keys.
            Pilot-ready when you are.
          </span>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>04 / 18</span>
      </div>
    </div>
  );
}
