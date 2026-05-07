import type { SlideProps } from '../slides';

export default function TitleSlide({ isActive }: SlideProps) {
  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      {/* Hero image with slow zoom */}
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
          opacity: 0.42,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(14,26,18,0.95) 30%, rgba(14,26,18,0.65) 100%)',
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(22,163,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.06) 1px, transparent 1px)',
          backgroundSize: '4vw 4vw',
          maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 78%)',
        }}
      />

      {/* Top accent stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '0.5vh',
          background: '#16a34a',
        }}
      />
      {/* Bottom thinner stripe */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '0.25vh',
          background: 'rgba(22, 163, 74, 0.3)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 9vw',
        }}
      >
        {/* Eyebrow with live dot */}
        <div
          className="font-body"
          style={{
            fontSize: '1.2vw',
            color: '#16a34a',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '3vh',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8vw',
            opacity: 0,
            animation: isActive ? 'card-up 0.7s 0.2s ease forwards' : 'none',
          }}
        >
          <span
            className="anim-pulse"
            style={{
              width: '0.7vw',
              height: '0.7vw',
              borderRadius: '50%',
              background: '#16a34a',
              display: 'inline-block',
            }}
          />
          Nurture Group · CCO + IT Briefing · 2026
        </div>

        {/* Wordmark */}
        <h1
          className="font-display"
          style={{
            fontSize: '8.5vw',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: '#eef3f0',
            marginBottom: '3vh',
            textWrap: 'balance' as const,
            opacity: 0,
            animation: isActive ? 'card-up 0.9s 0.4s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          }}
        >
          Nurture <span style={{ color: '#22c55e' }}>LeadFlow</span>
        </h1>

        {/* Accent rule */}
        <div
          style={{
            width: 0,
            height: '0.4vh',
            background: '#16a34a',
            marginBottom: '3vh',
            boxShadow: '0 0 8px rgba(22, 163, 74, 0.4)',
            animation: isActive ? 'rule-grow 0.8s 0.85s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          }}
        />
        <style>{`
          @keyframes rule-grow {
            from { width: 0; }
            to { width: 6vw; }
          }
        `}</style>

        {/* Subtitle */}
        <div
          className="font-body"
          style={{
            fontSize: '2vw',
            fontWeight: 400,
            color: 'rgba(238, 243, 240, 0.88)',
            marginBottom: '1.8vh',
            maxWidth: '70vw',
            opacity: 0,
            animation: isActive ? 'card-up 0.7s 1.0s ease forwards' : 'none',
          }}
        >
          UK B2B lead intelligence, built in-house.
        </div>

        {/* Service line */}
        <div
          className="font-body"
          style={{
            fontSize: '1.4vw',
            fontWeight: 400,
            color: 'rgba(107, 155, 122, 0.95)',
            opacity: 0,
            animation: isActive ? 'card-up 0.7s 1.15s ease forwards' : 'none',
          }}
        >
          For Gritting · Landscaping · Pest Control
        </div>

        {/* Bottom meta strip */}
        <div
          style={{
            position: 'absolute',
            bottom: '8vh',
            left: '9vw',
            right: '9vw',
            display: 'flex',
            alignItems: 'center',
            gap: '3vw',
            paddingTop: '3vh',
            borderTop: '1px solid rgba(22, 163, 74, 0.18)',
            opacity: 0,
            animation: isActive ? 'card-up 0.7s 1.4s ease forwards' : 'none',
          }}
        >
          <MetaItem label="Live Build" value="v2.44" />
          <Divider />
          <MetaItem label="Date" value="May 2026" />
          <Divider />
          <MetaItemLive />
          <Divider />
          <MetaItem label="URL" value="leadflow-python-production.up.railway.app" mono />
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh' }}>
      <span
        className="font-mono"
        style={{
          fontSize: '0.7vw',
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: 'rgba(107, 155, 122, 0.7)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span
        className={mono ? 'font-mono' : 'font-display'}
        style={{
          fontSize: mono ? '0.95vw' : '1.2vw',
          fontWeight: mono ? 500 : 600,
          color: '#eef3f0',
        }}
      >
        {value}
      </span>
    </div>
  );
}

function MetaItemLive() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh' }}>
      <span
        className="font-mono"
        style={{
          fontSize: '0.7vw',
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: 'rgba(107, 155, 122, 0.7)',
          textTransform: 'uppercase',
        }}
      >
        Status
      </span>
      <span
        className="font-display"
        style={{
          fontSize: '1.2vw',
          fontWeight: 600,
          color: '#22c55e',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5vw',
        }}
      >
        <span
          className="anim-pulse"
          style={{
            width: '0.55vw',
            height: '0.55vw',
            borderRadius: '50%',
            background: '#16a34a',
            display: 'inline-block',
          }}
        />
        Online
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: '1px',
        height: '4vh',
        background: 'rgba(22, 163, 74, 0.2)',
      }}
    />
  );
}
