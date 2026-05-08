import type { SlideProps } from '../slides';
import { useState, useEffect } from 'react';

const PAGES = [
  {
    id: 'dashboard',
    url: 'leadflow-python-production.up.railway.app/dashboard',
    tab: 'Dashboard',
    label: 'Live Dashboard',
    caption: 'Real-time KPIs, pipeline breakdown, and alert summary across the team.',
    image: './assets/screen-dashboard.png',
  },
  {
    id: 'discover',
    url: 'leadflow-python-production.up.railway.app/discover',
    tab: 'Discover',
    label: 'Lead Discovery',
    caption: 'Multi-source search across Companies House, Google Places, and Yelp — scored on import.',
    image: './assets/screen-discover.png',
  },
  {
    id: 'action',
    url: 'leadflow-python-production.up.railway.app/action-centre',
    tab: 'Action Centre',
    label: 'Action Centre',
    caption: 'Auto-generated alerts — closing tenders, overdue follow-ups, stale leads.',
    image: './assets/screen-action-centre.png',
  },
  {
    id: 'copilot',
    url: 'leadflow-python-production.up.railway.app/help',
    tab: 'AI Copilot',
    label: 'Copilot Assistant',
    caption: 'Domain-aware AI that answers from your live pipeline data — not generic answers.',
    image: './assets/screen-help-ai.png',
  },
];

const FADE_MS = 350;

export default function LiveAppSlide({ isActive }: SlideProps) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  // Reset to first screen whenever the slide becomes active
  useEffect(() => {
    if (!isActive) return;
    setCurrent(0);
    setFading(false);
  }, [isActive]);

  const page = PAGES[current];

  const goTo = (i: number) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(i);
      setFading(false);
    }, FADE_MS);
  };

  const goNext = () => goTo((current + 1) % PAGES.length);
  const goPrev = () => goTo((current - 1 + PAGES.length) % PAGES.length);

  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
        }}
      >
        {/* Left side — context, label, indicator */}
        <div
          style={{
            width: '24vw',
            flexShrink: 0,
            padding: '8vh 0 6vh 5vw',
            paddingRight: '2vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div className="slide-eyebrow" style={{ fontSize: '0.85vw', marginBottom: '1.5vh' }}>
            <span
              className="anim-pulse"
              style={{
                display: 'inline-block',
                width: '0.6vw',
                height: '0.6vw',
                borderRadius: '50%',
                background: '#16a34a',
                marginRight: '0.6vw',
                verticalAlign: 'middle',
              }}
            />
            LIVE — AUTO-ROTATING
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: '2.5vw',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#eef3f0',
              marginBottom: '2vh',
            }}
          >
            Real product.<br />
            Real URL.
          </h2>

          <p
            className="font-body"
            style={{
              fontSize: '0.95vw',
              lineHeight: 1.55,
              color: 'rgba(238, 243, 240, 0.65)',
              marginBottom: '4vh',
            }}
          >
            What you're seeing isn't a mockup. It's the actual app cycling through four real screens — with real
            v2.44 data.
          </p>

          {/* Now viewing */}
          <div style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE_MS}ms ease` }}>
            <div
              className="font-mono"
              style={{
                fontSize: '0.7vw',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'rgba(238, 243, 240, 0.45)',
                marginBottom: '0.8vh',
              }}
            >
              NOW VIEWING
            </div>
            <div
              className="font-display"
              style={{
                fontSize: '1.7vw',
                fontWeight: 700,
                color: '#22c55e',
                marginBottom: '0.6vh',
                letterSpacing: '-0.01em',
              }}
            >
              {page.label}
            </div>
            <div
              className="font-body"
              style={{
                fontSize: '0.9vw',
                lineHeight: 1.5,
                color: 'rgba(238, 243, 240, 0.65)',
              }}
            >
              {page.caption}
            </div>
          </div>

          {/* Page indicator dots with prev/next buttons */}
          <div
            className="interactive"
            style={{
              marginTop: '3vh',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6vw',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous screen"
              style={{
                background: 'rgba(22, 163, 74, 0.10)',
                border: '1px solid rgba(22, 163, 74, 0.30)',
                cursor: 'pointer',
                color: '#86efac',
                fontSize: '0.95vw',
                width: '2.2vw',
                height: '2.2vw',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                marginRight: '0.4vw',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(22, 163, 74, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(22, 163, 74, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(22, 163, 74, 0.10)';
                e.currentTarget.style.borderColor = 'rgba(22, 163, 74, 0.30)';
              }}
            >
              ◀
            </button>

            {PAGES.map((p, i) => (
              <button
                key={p.id}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                style={{
                  padding: '0.4vh 0.2vw',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                }}
              >
                <div
                  style={{
                    width: i === current ? '1.6vw' : '0.5vw',
                    height: '0.4vh',
                    borderRadius: '0.3vw',
                    background: i === current ? '#16a34a' : 'rgba(255, 255, 255, 0.20)',
                    transition: 'all 0.4s ease',
                    boxShadow: i === current ? '0 0 8px rgba(34, 197, 94, 0.5)' : 'none',
                  }}
                />
              </button>
            ))}

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next screen"
              style={{
                background: 'rgba(22, 163, 74, 0.10)',
                border: '1px solid rgba(22, 163, 74, 0.30)',
                cursor: 'pointer',
                color: '#86efac',
                fontSize: '0.95vw',
                width: '2.2vw',
                height: '2.2vw',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                marginLeft: '0.4vw',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(22, 163, 74, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(22, 163, 74, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(22, 163, 74, 0.10)';
                e.currentTarget.style.borderColor = 'rgba(22, 163, 74, 0.30)';
              }}
            >
              ▶
            </button>

            <span
              className="font-mono"
              style={{
                fontSize: '0.85vw',
                color: 'rgba(238, 243, 240, 0.4)',
                marginLeft: '0.6vw',
              }}
            >
              {current + 1} / {PAGES.length}
            </span>
          </div>
        </div>

        {/* Right side — browser frame with rotating pages */}
        <div
          style={{
            flex: 1,
            padding: '7vh 4vw 6vh 3vw',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              flex: 1,
              background: '#0a0f0b',
              borderRadius: '0.6vw',
              overflow: 'hidden',
              boxShadow: '0 1.2vh 4vw rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Browser chrome with TABS */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7vw',
                padding: '0.9vh 1vw',
                background: '#141a15',
                borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', gap: '0.35vw' }}>
                <div style={{ width: '0.65vw', height: '0.65vw', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '0.65vw', height: '0.65vw', borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: '0.65vw', height: '0.65vw', borderRadius: '50%', background: '#16a34a' }} />
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '0.25vw', marginLeft: '0.5vw' }}>
                {PAGES.map((p, i) => (
                  <div
                    key={p.id}
                    className="font-body"
                    style={{
                      padding: '0.4vh 0.9vw',
                      borderRadius: '0.25vw 0.25vw 0 0',
                      fontSize: '0.85vw',
                      color: i === current ? '#eef3f0' : 'rgba(238, 243, 240, 0.40)',
                      background: i === current ? '#0e1a12' : 'transparent',
                      borderBottom: i === current ? '1px solid #0e1a12' : 'none',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4vw',
                    }}
                  >
                    {p.tab}
                    {i === current && (
                      <span
                        style={{
                          width: '0.4vw',
                          height: '0.4vw',
                          borderRadius: '50%',
                          background: '#16a34a',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* URL bar */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5vw',
                  padding: '0.35vh 0.8vw',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '0.25vw',
                  marginLeft: '0.5vw',
                }}
              >
                <span style={{ fontSize: '0.8vw', color: '#16a34a' }}>🔒</span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.82vw',
                    color: 'rgba(238, 243, 240, 0.65)',
                    opacity: fading ? 0 : 1,
                    transition: `opacity ${FADE_MS}ms ease`,
                  }}
                >
                  {page.url}
                </span>
              </div>
            </div>

            {/* Page content — fading screenshot */}
            <div
              style={{
                flex: 1,
                background: '#0e1a12',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={page.image}
                alt={page.label}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  opacity: fading ? 0 : 1,
                  transition: `opacity ${FADE_MS}ms ease`,
                }}
              />
            </div>

            {/* Status bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.4vh 1vw',
                background: '#141a15',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                <span
                  className="anim-pulse"
                  style={{
                    width: '0.4vw',
                    height: '0.4vw',
                    borderRadius: '50%',
                    background: '#16a34a',
                    display: 'inline-block',
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.7vw',
                    color: 'rgba(238, 243, 240, 0.4)',
                  }}
                >
                  Connected · v2.44 · 56 leads indexed · Refreshed 12s ago
                </span>
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  color: 'rgba(238, 243, 240, 0.3)',
                }}
              >
                xsellio · Christos P. (Admin)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>XSELLIO</strong> · CCO + IT BRIEFING</span>
        <span>10 / 18</span>
      </div>
    </div>
  );
}
