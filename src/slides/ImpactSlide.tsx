import type { SlideProps } from '../slides';
import { useEffect, useState } from 'react';

// ─── Count-up hook (matches PipelineSlide pattern) ───
function useCountUp(target: number, isActive: boolean, delayMs: number, decimals = 0) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setVal(0);
      return;
    }
    setVal(0);
    const startDelay = setTimeout(() => {
      const duration = 1500;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const next = target * eased;
        setVal(decimals > 0 ? parseFloat(next.toFixed(decimals)) : Math.round(next));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delayMs);
    return () => clearTimeout(startDelay);
  }, [target, isActive, delayMs, decimals]);

  return val;
}

// ─── Animated number display ───
function AnimNum({
  value,
  isActive,
  delay,
  prefix = '',
  suffix = '',
  decimals = 0,
  fontSize,
  color,
}: {
  value: number;
  isActive: boolean;
  delay: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  fontSize: string;
  color: string;
}) {
  const v = useCountUp(value, isActive, delay, decimals);
  const display = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
  return (
    <div
      className="font-display"
      style={{
        fontSize,
        fontWeight: 800,
        color,
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}
    >
      {prefix}
      {display}
      {suffix}
    </div>
  );
}

export default function ImpactSlide({ isActive }: SlideProps) {
  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '6vh 5vw 5vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header row */}
        <div
          className={isActive ? 'imp-header' : ''}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3vh',
            opacity: isActive ? 1 : 0,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9vw', marginBottom: '0.6vh' }}>
              <div
                className="slide-eyebrow"
                style={{ fontSize: '0.95vw', color: '#16a34a' }}
              >
                Business Impact
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: '#92400e',
                  background: '#fef3c7',
                  border: '1px solid #fcd34d',
                  padding: '0.25vh 0.7vw',
                  borderRadius: '999px',
                }}
              >
                HYPOTHETICAL PROJECTIONS
              </div>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: '3.4vw',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#eef3f0',
              }}
            >
              The numbers don't lie.
            </h2>
          </div>

          <div
            className="font-body"
            style={{
              fontSize: '0.95vw',
              color: 'rgba(238, 243, 240, 0.5)',
              maxWidth: '28vw',
              lineHeight: 1.55,
              textAlign: 'right',
            }}
          >
            Modelled on Nurture's own benchmarks — 280–310 sites/rep/year target,
            ~70% current attainment, 1-in-4 quote-to-win, £4k average annual contract value.
          </div>
        </div>

        {/* Three columns */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1.2fr',
            gap: '1.6vw',
            minHeight: 0,
            marginBottom: '2vh',
          }}
        >
          {/* COL 1 — TODAY */}
          <div
            className={isActive ? 'imp-col-1' : ''}
            style={{
              background: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.22)',
              borderRadius: '0.6vw',
              padding: '2.5vh 1.6vw',
              display: 'flex',
              flexDirection: 'column',
              opacity: isActive ? 1 : 0,
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.78vw',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#fca5a5',
                marginBottom: '0.6vh',
              }}
            >
              TODAY · WITHOUT LEADFLOW
            </div>
            <div
              className="font-body"
              style={{
                fontSize: '0.95vw',
                color: 'rgba(238, 243, 240, 0.55)',
                marginBottom: '3vh',
                lineHeight: 1.4,
              }}
            >
              Reps spend hours hunting and prioritising. Many fall short of target.
            </div>

            <div style={{ marginBottom: '2.2vh' }}>
              <AnimNum
                value={200}
                isActive={isActive}
                delay={300}
                fontSize="3.2vw"
                color="#fca5a5"
              />
              <div
                className="font-body"
                style={{ fontSize: '0.95vw', color: '#eef3f0', fontWeight: 500, marginTop: '0.4vh' }}
              >
                Wins per rep, per year
              </div>
              <div
                className="font-body"
                style={{ fontSize: '0.82vw', color: 'rgba(238, 243, 240, 0.45)', marginTop: '0.2vh' }}
              >
                Realistic current average
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.8vh' }}>
              <AnimNum
                value={70}
                isActive={isActive}
                delay={600}
                suffix="%"
                fontSize="2.2vw"
                color="#f87171"
              />
              <div
                className="font-body"
                style={{ fontSize: '0.88vw', color: 'rgba(238, 243, 240, 0.7)', marginTop: '0.4vh' }}
              >
                of the 280–310 sites/year target
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <div
              className="font-body"
              style={{
                fontSize: '0.82vw',
                color: 'rgba(252, 165, 165, 0.85)',
                fontStyle: 'italic',
                lineHeight: 1.5,
                borderTop: '1px solid rgba(239, 68, 68, 0.18)',
                paddingTop: '1.4vh',
                marginTop: '1.4vh',
              }}
            >
              The bottleneck isn't closing rate — it's having enough quality leads to quote.
            </div>
          </div>

          {/* COL 2 — WITH LEADFLOW */}
          <div
            className={isActive ? 'imp-col-2' : ''}
            style={{
              background: 'rgba(22, 163, 74, 0.08)',
              border: '1px solid rgba(22, 163, 74, 0.32)',
              borderRadius: '0.6vw',
              padding: '2.5vh 1.6vw',
              display: 'flex',
              flexDirection: 'column',
              opacity: isActive ? 1 : 0,
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.78vw',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#86efac',
                marginBottom: '0.6vh',
              }}
            >
              WITH LEADFLOW
            </div>
            <div
              className="font-body"
              style={{
                fontSize: '0.95vw',
                color: 'rgba(238, 243, 240, 0.65)',
                marginBottom: '3vh',
                lineHeight: 1.4,
              }}
            >
              Scored leads in the queue every morning. Reps quote more, hit target.
            </div>

            <div style={{ marginBottom: '2.2vh' }}>
              <AnimNum
                value={290}
                isActive={isActive}
                delay={500}
                fontSize="3.2vw"
                color="#22c55e"
              />
              <div
                className="font-body"
                style={{ fontSize: '0.95vw', color: '#eef3f0', fontWeight: 500, marginTop: '0.4vh' }}
              >
                Wins per rep, per year
              </div>
              <div
                className="font-body"
                style={{ fontSize: '0.82vw', color: 'rgba(238, 243, 240, 0.45)', marginTop: '0.2vh' }}
              >
                On-target — middle of the 280–310 band
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.8vh' }}>
              <AnimNum
                value={90}
                isActive={isActive}
                delay={800}
                prefix="+"
                fontSize="2.2vw"
                color="#4ade80"
              />
              <div
                className="font-body"
                style={{ fontSize: '0.88vw', color: 'rgba(238, 243, 240, 0.7)', marginTop: '0.4vh' }}
              >
                Extra sites won per rep, per year
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <div
              className="font-body"
              style={{
                fontSize: '0.82vw',
                color: 'rgba(134, 239, 172, 0.9)',
                fontStyle: 'italic',
                lineHeight: 1.5,
                borderTop: '1px solid rgba(22, 163, 74, 0.22)',
                paddingTop: '1.4vh',
                marginTop: '1.4vh',
              }}
            >
              Same close rate. More qualified leads in the funnel. Closes the target gap.
            </div>
          </div>

          {/* COL 3 — ANNUAL UPLIFT (hero) */}
          <div
            className={isActive ? 'imp-col-3' : ''}
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.10), rgba(22, 163, 74, 0.10))',
              border: '1px solid rgba(251, 191, 36, 0.40)',
              borderRadius: '0.6vw',
              padding: '2.5vh 1.6vw',
              display: 'flex',
              flexDirection: 'column',
              opacity: isActive ? 1 : 0,
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.78vw',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#fbbf24',
                marginBottom: '0.6vh',
              }}
            >
              ANNUAL REVENUE UPLIFT
            </div>
            <div
              className="font-body"
              style={{
                fontSize: '0.95vw',
                color: 'rgba(238, 243, 240, 0.65)',
                marginBottom: '2.5vh',
                lineHeight: 1.4,
              }}
            >
              Extra sites × £4k average annual contract value.
            </div>

            {/* Pilot scenario */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(251, 191, 36, 0.25)',
                borderRadius: '0.4vw',
                padding: '1.6vh 1.2vw',
                marginBottom: '1.4vh',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  fontWeight: 700,
                  letterSpacing: '0.20em',
                  color: 'rgba(251, 191, 36, 0.85)',
                  marginBottom: '0.6vh',
                }}
              >
                10-REP PILOT
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6vw' }}>
                <AnimNum
                  value={3.6}
                  isActive={isActive}
                  delay={1000}
                  prefix="+£"
                  suffix="M"
                  decimals={1}
                  fontSize="2.8vw"
                  color="#fbbf24"
                />
                <div
                  className="font-body"
                  style={{ fontSize: '0.85vw', color: 'rgba(238, 243, 240, 0.65)' }}
                >
                  per year
                </div>
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: '0.78vw',
                  color: 'rgba(238, 243, 240, 0.5)',
                  marginTop: '0.4vh',
                }}
              >
                900 extra sites × £4k
              </div>
            </div>

            {/* Scaled scenario */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(22, 163, 74, 0.30)',
                borderRadius: '0.4vw',
                padding: '1.6vh 1.2vw',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  fontWeight: 700,
                  letterSpacing: '0.20em',
                  color: 'rgba(134, 239, 172, 0.95)',
                  marginBottom: '0.6vh',
                }}
              >
                30-REP SCALED ROLLOUT
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6vw' }}>
                <AnimNum
                  value={10.8}
                  isActive={isActive}
                  delay={1200}
                  prefix="+£"
                  suffix="M"
                  decimals={1}
                  fontSize="2.8vw"
                  color="#22c55e"
                />
                <div
                  className="font-body"
                  style={{ fontSize: '0.85vw', color: 'rgba(238, 243, 240, 0.65)' }}
                >
                  per year
                </div>
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: '0.78vw',
                  color: 'rgba(238, 243, 240, 0.5)',
                  marginTop: '0.4vh',
                }}
              >
                2,700 extra sites × £4k
              </div>
            </div>
          </div>
        </div>

        {/* Bottom banner — conservative case */}
        <div
          className={isActive ? 'imp-banner' : ''}
          style={{
            background: 'rgba(22, 163, 74, 0.10)',
            border: '1px solid rgba(22, 163, 74, 0.30)',
            borderLeft: '3px solid #16a34a',
            borderRadius: '0 0.4vw 0.4vw 0',
            padding: '1.6vh 1.6vw',
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
            CONSERVATIVE CASE
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
            Even if LeadFlow only closes <strong style={{ color: '#fbbf24' }}>half</strong> the gap to target,
            that's still <strong style={{ color: '#22c55e' }}>+£1.8M/year</strong> at pilot scale and{' '}
            <strong style={{ color: '#22c55e' }}>+£5.4M/year</strong> scaled — payback in months, not years.
          </div>
          <div
            className="font-body"
            style={{
              fontSize: '0.82vw',
              color: 'rgba(238, 243, 240, 0.5)',
              fontStyle: 'italic',
              flexShrink: 0,
              maxWidth: '14vw',
              lineHeight: 1.4,
              textAlign: 'right',
            }}
          >
            Model, not forecast.<br />Inputs are Nurture's own benchmarks.
          </div>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>16 / 17</span>
      </div>

      <style>{`
        @keyframes imp-header {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imp-col {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imp-banner {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .imp-header { animation: imp-header 0.5s ease both; }
        .imp-col-1  { animation: imp-col 0.5s ease both 0.15s; }
        .imp-col-2  { animation: imp-col 0.5s ease both 0.30s; }
        .imp-col-3  { animation: imp-col 0.5s ease both 0.50s; }
        .imp-banner { animation: imp-banner 0.5s ease both 1.4s; }
      `}</style>
    </div>
  );
}
