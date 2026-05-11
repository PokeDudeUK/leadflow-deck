import type { SlideProps } from '../slides';
import { useEffect, useState, useRef } from 'react';

interface Product {
  status: 'LIVE PREVIEW' | 'IN DEVELOPMENT';
  statusColor: string;
  statusBg: string;
  statusBorder: string;
  name: string;
  tagline: string;
  body: string;
  url?: string;
  bullets: string[];
}

const PRODUCTS: Product[] = [
  {
    status: 'LIVE PREVIEW',
    statusColor: '#22c55e',
    statusBg: 'rgba(22, 163, 74, 0.12)',
    statusBorder: 'rgba(22, 163, 74, 0.45)',
    name: 'AutoMapper',
    tagline: 'Draw a boundary. Get a quote.',
    body:
      'Sales teams currently spend hours measuring sites for gritting and landscaping quotes. AutoMapper does it in seconds — draw the site boundary, get instant area calculations, automated pricing, and a quote-ready output.',
    url: 'automapper.vercel.app',
    bullets: [
      'Draw site boundaries on a live map',
      'Auto-calculates area, frontage, salt requirements',
      'Pricing applied automatically by service line',
      'Quote-ready output in under 60 seconds',
    ],
  },
  {
    status: 'IN DEVELOPMENT',
    statusColor: '#fbbf24',
    statusBg: 'rgba(251, 191, 36, 0.10)',
    statusBorder: 'rgba(251, 191, 36, 0.45)',
    name: 'Renewals & Retention',
    tagline: 'Keep what we win. Grow what we keep.',
    body:
      'New business is expensive. Existing relationships are gold. The Renewals system surfaces upcoming contract end-dates, automates structured follow-ups, and creates meeting opportunities to expand each account before the renewal window closes.',
    bullets: [
      'Tracks every contract end-date in one feed',
      'Automated multi-touch follow-up sequences',
      'Surfaces account-expansion opportunities',
      'Increases response rate, retention, and meeting volume',
    ],
  },
];

// Soft fade-in helper
function useEnterStagger(isActive: boolean, count: number, baseDelay: number, gap: number) {
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (!isActive) {
      setVisibleSet(new Set());
      return;
    }
    setVisibleSet(new Set());
    for (let i = 0; i < count; i++) {
      const id = window.setTimeout(() => {
        setVisibleSet((s) => {
          const next = new Set(s);
          next.add(i);
          return next;
        });
      }, baseDelay + i * gap);
      timeoutsRef.current.push(id);
    }
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [isActive, count, baseDelay, gap]);

  return visibleSet;
}

export default function RoadmapSlide({ isActive }: SlideProps) {
  const cardVisible = useEnterStagger(isActive, PRODUCTS.length, 400, 280);

  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '7vh 5vw 6vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3vh' }}>
          <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '1.2vh', color: '#22c55e' }}>
            What's coming next
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '3vw' }}>
            <h2
              className="font-display"
              style={{
                fontSize: '3.4vw',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#eef3f0',
                maxWidth: '52vw',
              }}
            >
              xsellio is the foundation.<br />
              <span style={{ color: '#22c55e', fontStyle: 'italic', fontWeight: 600 }}>
                Two more in the works.
              </span>
            </h2>

            <p
              className="font-body"
              style={{
                fontSize: '1vw',
                color: 'rgba(238, 243, 240, 0.55)',
                lineHeight: 1.55,
                maxWidth: '28vw',
                textAlign: 'right',
                marginBottom: '0.8vh',
              }}
            >
              Lead intelligence is one piece of the picture. The next two close the loop —
              from quoting a site faster, to keeping the customer for longer.
            </p>
          </div>
        </div>

        {/* Two product cards */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2vw',
            minHeight: 0,
          }}
        >
          {PRODUCTS.map((p, i) => {
            const visible = cardVisible.has(i);
            return (
              <div
                key={p.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${p.statusBorder}`,
                  borderTop: `3px solid ${p.statusColor}`,
                  borderRadius: '0.5vw',
                  padding: '2.2vh 1.8vw',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
                {/* Glow accent in corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-30%',
                    right: '-20%',
                    width: '40%',
                    height: '60%',
                    background: `radial-gradient(ellipse, ${p.statusColor}22 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Status badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7vw', marginBottom: '1.5vh' }}>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.72vw',
                      fontWeight: 700,
                      letterSpacing: '0.22em',
                      color: p.statusColor,
                      background: p.statusBg,
                      border: `1px solid ${p.statusBorder}`,
                      padding: '0.3vh 0.8vw',
                      borderRadius: '0.25vw',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5vw',
                    }}
                  >
                    {p.status === 'LIVE PREVIEW' && (
                      <span
                        className="anim-pulse"
                        style={{
                          width: '0.45vw',
                          height: '0.45vw',
                          borderRadius: '50%',
                          background: p.statusColor,
                          display: 'inline-block',
                        }}
                      />
                    )}
                    {p.status}
                  </div>
                  {p.url && (
                    <a
                      href={`https://${p.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono"
                      style={{
                        fontSize: '0.78vw',
                        color: '#86efac',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4vw',
                        padding: '0.3vh 0.7vw',
                        borderRadius: '0.25vw',
                        border: '1px solid rgba(134, 239, 172, 0.25)',
                        background: 'rgba(134, 239, 172, 0.06)',
                      }}
                    >
                      🔗 {p.url}
                    </a>
                  )}
                </div>

                {/* Product name */}
                <div
                  className="font-display"
                  style={{
                    fontSize: '2.4vw',
                    fontWeight: 700,
                    color: '#eef3f0',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                    marginBottom: '0.6vh',
                  }}
                >
                  {p.name}
                </div>

                {/* Tagline */}
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.1vw',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    color: p.statusColor,
                    marginBottom: '1.8vh',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {p.tagline}
                </div>

                {/* Body */}
                <p
                  className="font-body"
                  style={{
                    fontSize: '0.92vw',
                    color: 'rgba(238, 243, 240, 0.72)',
                    lineHeight: 1.55,
                    marginBottom: '2vh',
                  }}
                >
                  {p.body}
                </p>

                {/* Bullets */}
                <div
                  style={{
                    borderTop: `1px solid ${p.statusBorder}55`,
                    paddingTop: '1.6vh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.7vh',
                    marginTop: 'auto',
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.7vw',
                      fontWeight: 700,
                      letterSpacing: '0.22em',
                      color: 'rgba(238, 243, 240, 0.45)',
                      marginBottom: '0.6vh',
                    }}
                  >
                    KEY CAPABILITIES
                  </div>
                  {p.bullets.map((b, j) => (
                    <div
                      key={j}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.7vw',
                      }}
                    >
                      <span
                        style={{
                          color: p.statusColor,
                          fontSize: '0.95vw',
                          fontWeight: 700,
                          lineHeight: 1.4,
                          flexShrink: 0,
                        }}
                      >
                        ›
                      </span>
                      <span
                        className="font-body"
                        style={{
                          fontSize: '0.88vw',
                          color: 'rgba(238, 243, 240, 0.78)',
                          lineHeight: 1.45,
                        }}
                      >
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom strip — vision line */}
        <div
          style={{
            marginTop: '2vh',
            background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.10), rgba(251, 191, 36, 0.06))',
            border: '1px solid rgba(22, 163, 74, 0.25)',
            borderLeft: '3px solid #16a34a',
            borderRadius: '0 0.4vw 0.4vw 0',
            padding: '1.4vh 1.8vw',
            display: 'flex',
            alignItems: 'center',
            gap: '2vw',
            flexShrink: 0,
            opacity: cardVisible.size === PRODUCTS.length ? 1 : 0,
            transform: cardVisible.size === PRODUCTS.length ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: '0.78vw',
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#86efac',
              flexShrink: 0,
            }}
          >
            THE BIGGER PICTURE
          </div>
          <div
            className="font-body"
            style={{
              fontSize: '0.95vw',
              color: 'rgba(238, 243, 240, 0.85)',
              lineHeight: 1.5,
              flex: 1,
            }}
          >
            <strong style={{ color: '#22c55e' }}>Find the lead</strong> (xsellio) →{' '}
            <strong style={{ color: '#22c55e' }}>quote it fast</strong> (AutoMapper) →{' '}
            <strong style={{ color: '#fbbf24' }}>keep the customer</strong> (Renewals).{' '}
            <span style={{ color: 'rgba(238, 243, 240, 0.6)' }}>
              One pipeline, end-to-end.
            </span>
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>XSELLIO</strong> · CCO + IT BRIEFING</span>
        <span>16 / 19</span>
      </div>
    </div>
  );
}
