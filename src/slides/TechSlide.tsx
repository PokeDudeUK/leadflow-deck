import type { SlideProps } from '../slides';

const COLUMNS = [
  {
    header: 'Stack today',
    color: '#16a34a',
    rows: [
      ['Backend', 'Python 3.14 · Flask · gunicorn'],
      ['Frontend', 'Jinja2 · Tailwind CSS'],
      ['Data', 'SQLite (dev) → Postgres (prod)'],
      ['Hosting', 'Railway · auto-deploy from GitHub'],
      ['Source', 'Private GitHub · branch-protected'],
      ['AI', 'OpenAI for chat · rule engine for actions'],
      ['Background', 'In-process scheduler · 6-hour cycles'],
    ],
  },
  {
    header: 'Security controls',
    color: '#fbbf24',
    rows: [
      ['Authentication', 'Session-based · per-user · role-aware'],
      ['Authorization', 'Role middleware on every endpoint'],
      ['Secrets', 'Env vars only · never in repo'],
      ['Transport', 'HTTPS enforced (Railway TLS)'],
      ['Audit trail', 'Every action timestamped + attributed'],
      ['Data residency', 'EU-region option available'],
      ['Backups', 'Postgres point-in-time on Railway'],
    ],
  },
  {
    header: 'Before pilot rollout',
    color: '#86efac',
    rows: [
      ['Postgres migration', 'Move from SQLite for concurrency'],
      ['SSO integration', 'Microsoft 365 / Google Workspace'],
      ['Email notifications', 'Daily digest + critical alerts'],
      ['Custom domain', 'xsellio.com'],
      ['Load testing', 'Validate at 50–100 concurrent users'],
      ['Onboarding flow', 'Email invites · password reset'],
      ['Pen test', 'External review before opening up'],
    ],
  },
];

export default function TechSlide({ isActive }: SlideProps) {
  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '8vh 5vw 6vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '2vh', color: '#fbbf24' }}>
          For the IT team
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: '3.5vw',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#eef3f0',
            marginBottom: '5vh',
            maxWidth: '85vw',
          }}
        >
          Architecture, security, and what's<br />
          on the roadmap before pilot.
        </h2>

        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.4vw',
            flex: 1,
          }}
        >
          {COLUMNS.map((col) => (
            <div
              key={col.header}
              className={isActive ? 'anim-card' : ''}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(22, 163, 74, 0.15)',
                borderRadius: '0.5vw',
                padding: '2vh 1.5vw',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: col.color,
                }}
              />
              <div
                className="font-mono"
                style={{
                  fontSize: '0.85vw',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: col.color,
                  marginBottom: '2vh',
                  marginTop: '0.5vh',
                  textTransform: 'uppercase',
                }}
              >
                {col.header}
              </div>

              {col.rows.map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    padding: '0.9vh 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div
                    className="font-display"
                    style={{
                      fontSize: '1vw',
                      fontWeight: 700,
                      color: '#eef3f0',
                      marginBottom: '0.3vh',
                    }}
                  >
                    {k}
                  </div>
                  <div
                    className="font-body"
                    style={{
                      fontSize: '0.85vw',
                      color: 'rgba(107, 155, 122, 0.95)',
                      lineHeight: 1.4,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>XSELLIO</strong> · CCO + IT BRIEFING</span>
        <span>15 / 19</span>
      </div>
    </div>
  );
}
