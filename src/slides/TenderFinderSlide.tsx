import type { SlideProps } from '../slides';
import { useEffect, useRef, useState } from 'react';

// ─── Tender feed data ──────────────────────────────────────
interface Tender {
  id: string;
  title: string;
  buyer: string;
  service: 'Gritting' | 'Landscaping' | 'Pest';
  value: string;
  source: 'Contracts Finder' | 'Find a Tender' | 'NHS Tenders';
  hoursLeft: number; // for sort + display only
  closeLabel: string;
  hero?: boolean;
}

const TENDERS: Tender[] = [
  {
    id: 'CF-2026-1184',
    title: 'Winter Gritting & Salting — Council Estate',
    buyer: 'Leeds City Council',
    service: 'Gritting',
    value: '£185,000',
    source: 'Contracts Finder',
    hoursLeft: 71,
    closeLabel: 'CLOSES IN',
    hero: true,
  },
  {
    id: 'FTS-2026-0427',
    title: 'Grounds Maintenance — Multi-site Portfolio',
    buyer: 'NHS Yorkshire & Humber',
    service: 'Landscaping',
    value: '£82,400',
    source: 'NHS Tenders',
    hoursLeft: 142,
    closeLabel: 'CLOSES IN',
  },
  {
    id: 'CF-2026-1198',
    title: 'Pest Control Services — Care Home Group',
    buyer: 'North West NHS Trust',
    service: 'Pest',
    value: '£46,800',
    source: 'NHS Tenders',
    hoursLeft: 96,
    closeLabel: 'CLOSES IN',
  },
  {
    id: 'FTS-2026-0431',
    title: 'Winter Maintenance — Logistics Park',
    buyer: 'Aire Valley Distribution',
    service: 'Gritting',
    value: '£38,500',
    source: 'Find a Tender',
    hoursLeft: 184,
    closeLabel: 'CLOSES IN',
  },
];

const SOURCES = [
  { label: 'Contracts Finder', desc: 'UK Government opportunities' },
  { label: 'Find a Tender',    desc: 'Above-threshold contract notices' },
  { label: 'NHS Tenders',      desc: 'Healthcare estate procurement' },
];

const SERVICE_COLORS: Record<Tender['service'], string> = {
  Gritting: '#60a5fa',
  Landscaping: '#22c55e',
  Pest: '#fbbf24',
};

// ─── Live countdown for the hero tender ───────────────────
function useCountdown(initialHours: number, isActive: boolean) {
  const [secondsLeft, setSecondsLeft] = useState(initialHours * 3600);

  useEffect(() => {
    if (!isActive) {
      setSecondsLeft(initialHours * 3600);
      return;
    }
    setSecondsLeft(initialHours * 3600);
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [initialHours, isActive]);

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  return { days, hours, minutes, seconds };
}

// ─── Count-up for the value pulse ─────────────────────────
function useCountUp(target: number, isActive: boolean, delayMs: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!isActive) {
      setVal(0);
      return;
    }
    setVal(0);
    const startDelay = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delayMs);
    return () => clearTimeout(startDelay);
  }, [target, isActive, delayMs]);
  return val;
}

export default function TenderFinderSlide({ isActive }: SlideProps) {
  const hero = TENDERS[0];
  const others = TENDERS.slice(1);
  const { days, hours, minutes, seconds } = useCountdown(hero.hoursLeft, isActive);
  const heroValue = useCountUp(185000, isActive, 600);

  // Streaming entry — control which non-hero rows are visible
  const [visibleCount, setVisibleCount] = useState(0);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (!isActive) {
      setVisibleCount(0);
      return;
    }
    setVisibleCount(0);
    others.forEach((_, i) => {
      const id = window.setTimeout(() => {
        setVisibleCount((c) => Math.max(c, i + 1));
      }, 1100 + i * 280);
      timeoutsRef.current.push(id);
    });
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [isActive]);

  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '6.5vh 5vw 5vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.5vh',
          }}
        >
          <div>
            <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '1vh' }}>
              Real product — Tender Finder
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: '3.4vw',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#eef3f0',
                marginBottom: '1vh',
              }}
            >
              Live procurement feed.<br />Quote before competitors notice.
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: '1.05vw',
                color: 'rgba(238, 243, 240, 0.65)',
                lineHeight: 1.5,
                maxWidth: '60vw',
              }}
            >
              Three government feeds, monitored continuously. Relevant tenders surface scored and ranked
              within hours of publication — not days.
            </p>
          </div>

          {/* Source pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7vh', alignItems: 'flex-end' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '0.7vw',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#86efac',
                marginBottom: '0.4vh',
              }}
            >
              ● MONITORING 3 LIVE FEEDS
            </div>
            {SOURCES.map((s, i) => (
              <div
                key={s.label}
                className={isActive ? 'src-pill' : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6vw',
                  padding: '0.5vh 0.9vw',
                  background: 'rgba(22, 163, 74, 0.08)',
                  border: '1px solid rgba(22, 163, 74, 0.30)',
                  borderRadius: '0.3vw',
                  opacity: isActive ? 1 : 0,
                  animationDelay: `${0.2 + i * 0.12}s`,
                }}
              >
                <span style={{ color: '#22c55e', fontSize: '0.7vw' }}>●</span>
                <span
                  className="font-mono"
                  style={{ fontSize: '0.78vw', color: '#eef3f0', fontWeight: 600 }}
                >
                  {s.label}
                </span>
                <span
                  className="font-body"
                  style={{ fontSize: '0.72vw', color: 'rgba(238, 243, 240, 0.5)' }}
                >
                  · {s.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero tender card */}
        <div
          className={isActive ? 'hero-tender' : ''}
          style={{
            background:
              'linear-gradient(135deg, rgba(239, 68, 68, 0.10), rgba(251, 191, 36, 0.08))',
            border: '1px solid rgba(239, 68, 68, 0.40)',
            borderLeft: '4px solid #ef4444',
            borderRadius: '0.5vw',
            padding: '2.2vh 1.8vw',
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            gap: '2vw',
            alignItems: 'center',
            marginBottom: '2vh',
            opacity: isActive ? 1 : 0,
          }}
        >
          {/* LEFT: title + buyer */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', marginBottom: '0.6vh' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: '#ef4444',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.40)',
                  padding: '0.2vh 0.6vw',
                  borderRadius: '0.2vw',
                }}
              >
                CRITICAL · CLOSING SOON
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  color: SERVICE_COLORS[hero.service],
                  background: `${SERVICE_COLORS[hero.service]}1a`,
                  border: `1px solid ${SERVICE_COLORS[hero.service]}66`,
                  padding: '0.2vh 0.6vw',
                  borderRadius: '0.2vw',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                }}
              >
                {hero.service.toUpperCase()}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  color: 'rgba(238, 243, 240, 0.5)',
                  letterSpacing: '0.12em',
                }}
              >
                {hero.id} · {hero.source}
              </span>
            </div>
            <div
              className="font-display"
              style={{
                fontSize: '1.6vw',
                fontWeight: 700,
                color: '#eef3f0',
                marginBottom: '0.4vh',
                letterSpacing: '-0.01em',
              }}
            >
              {hero.title}
            </div>
            <div
              className="font-body"
              style={{ fontSize: '1vw', color: 'rgba(238, 243, 240, 0.7)' }}
            >
              {hero.buyer}
            </div>
          </div>

          {/* MIDDLE: contract value */}
          <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '2vw' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '0.7vw',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: 'rgba(238, 243, 240, 0.55)',
                marginBottom: '0.6vh',
              }}
            >
              CONTRACT VALUE
            </div>
            <div
              className="font-display hero-number-glow-amber"
              style={{
                fontSize: '2.6vw',
                fontWeight: 800,
                color: '#fbbf24',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              £{heroValue.toLocaleString()}
            </div>
          </div>

          {/* RIGHT: countdown */}
          <div
            style={{
              textAlign: 'center',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              paddingLeft: '2vw',
              minWidth: '13vw',
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.7vw',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#fca5a5',
                marginBottom: '0.6vh',
              }}
            >
              {hero.closeLabel}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.6vw' }}>
              <CountUnit value={days} label="d" pulse />
              <CountUnit value={hours} label="h" pulse />
              <CountUnit value={minutes} label="m" pulse />
              <CountUnit value={seconds} label="s" pulse />
            </div>
          </div>
        </div>

        {/* Other tenders streaming in */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1vw',
            marginBottom: '2vh',
          }}
        >
          {others.map((t, i) => {
            const visible = i < visibleCount;
            const closeDays = Math.floor(t.hoursLeft / 24);
            const closeHrs = t.hoursLeft % 24;
            return (
              <div
                key={t.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderLeft: `3px solid ${SERVICE_COLORS[t.service]}`,
                  borderRadius: '0.4vw',
                  padding: '1.4vh 1.2vw',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.45s ease, transform 0.45s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '0.6vh' }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.65vw',
                      color: SERVICE_COLORS[t.service],
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                    }}
                  >
                    {t.service.toUpperCase()}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.65vw',
                      color: 'rgba(238, 243, 240, 0.45)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    · {t.source}
                  </span>
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '0.95vw',
                    fontWeight: 600,
                    color: '#eef3f0',
                    lineHeight: 1.3,
                    marginBottom: '0.4vh',
                  }}
                >
                  {t.title}
                </div>
                <div
                  className="font-body"
                  style={{ fontSize: '0.78vw', color: 'rgba(238, 243, 240, 0.55)', marginBottom: '1vh' }}
                >
                  {t.buyer}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span
                    className="font-display"
                    style={{
                      fontSize: '1.3vw',
                      fontWeight: 700,
                      color: '#fbbf24',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t.value}
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: '0.7vw', color: 'rgba(238, 243, 240, 0.5)' }}
                  >
                    closes in {closeDays}d {closeHrs}h
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Moat callout */}
        <div
          className={isActive ? 'moat' : ''}
          style={{
            background: 'rgba(22, 163, 74, 0.10)',
            border: '1px solid rgba(22, 163, 74, 0.30)',
            borderLeft: '3px solid #16a34a',
            borderRadius: '0 0.4vw 0.4vw 0',
            padding: '1.4vh 1.6vw',
            display: 'flex',
            alignItems: 'center',
            gap: '2vw',
            opacity: isActive ? 1 : 0,
            flexShrink: 0,
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
            WHY THIS MATTERS
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
            Tenders found manually arrive <strong style={{ color: '#fca5a5' }}>1+ week late on average</strong> —
            often after competitors have already submitted.{' '}
            <strong style={{ color: '#22c55e' }}>xsellio surfaces them within hours of publication</strong>,
            scored and ranked, with the closing date in the Action Centre.
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>XSELLIO</strong> · CCO + IT BRIEFING</span>
        <span>07 / 18</span>
      </div>

      <style>{`
        @keyframes pill-in {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes hero-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes moat-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        .src-pill   { animation: pill-in 0.45s ease both; }
        .hero-tender { animation: hero-in 0.5s ease both 0.15s; }
        .moat        { animation: moat-in 0.5s ease both 2.2s; }
        .count-pulse { animation: pulse-soft 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ─── Single time unit (d / h / m / s) ─────────────────
function CountUnit({ value, label, pulse }: { value: number; label: string; pulse?: boolean }) {
  const baseClass = pulse && label === 's' ? 'count-pulse font-display' : 'font-display';
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.15vw' }}>
      <span
        className={`${baseClass} hero-number-glow-red`}
        style={{
          fontSize: '1.8vw',
          fontWeight: 800,
          color: '#ef4444',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value.toString().padStart(2, '0')}
      </span>
      <span
        className="font-mono"
        style={{
          fontSize: '0.85vw',
          fontWeight: 600,
          color: 'rgba(252, 165, 165, 0.7)',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </span>
    </div>
  );
}
