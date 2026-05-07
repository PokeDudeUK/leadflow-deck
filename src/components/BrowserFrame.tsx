interface BrowserFrameProps {
  url: string;
  imageSrc: string;
  imageAlt: string;
  isActive: boolean;
  delay?: number;
}

export default function BrowserFrame({ url, imageSrc, imageAlt, isActive, delay = 0.2 }: BrowserFrameProps) {
  return (
    <div
      className={isActive ? 'anim-card' : ''}
      style={{
        background: '#0a0f0b',
        border: '1px solid rgba(22, 163, 74, 0.18)',
        borderRadius: '0.6vw',
        overflow: 'hidden',
        boxShadow: '0 1.2vh 4vw rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        animationDelay: `${delay}s`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Browser chrome bar */}
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
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: '0.35vw' }}>
          <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', background: '#eab308' }} />
          <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', background: '#16a34a' }} />
        </div>

        {/* URL bar */}
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
            {url}
          </span>
        </div>

        {/* Nav buttons */}
        <div style={{ display: 'flex', gap: '0.5vw' }}>
          {['←', '→', '⟳'].map((b) => (
            <span
              key={b}
              className="font-mono"
              style={{
                fontSize: '0.85vw',
                color: 'rgba(238, 243, 240, 0.4)',
                padding: '0.2vh 0.5vw',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '0.2vw',
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Screenshot */}
      <div
        style={{
          flex: 1,
          background: '#0e1a12',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}
