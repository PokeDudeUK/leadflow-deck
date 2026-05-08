import { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './slides';

export default function App() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < total) setCurrent(idx);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(total - 1);
      } else if (/^[0-9]$/.test(e.key)) {
        const n = e.key === '0' ? 9 : parseInt(e.key, 10) - 1;
        goTo(n);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, goTo, total]);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.changedTouches[0].screenX; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].screenX - startX;
      if (Math.abs(dx) < 50) return;
      if (dx < 0) goNext(); else goPrev();
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [goNext, goPrev]);

  // Click halves
  const onClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, .interactive')) return;
    const x = e.clientX;
    const w = window.innerWidth;
    if (x > w * 0.55) goNext();
    else if (x < w * 0.45) goPrev();
  }, [goNext, goPrev]);

  const progress = ((current + 1) / total) * 100;

  return (
    <>
      <Hud current={current} total={total} progress={progress} />
      <div className="slide-stack" onClick={onClick}>
        {SLIDES.map((Slide, i) => (
          <div
            key={i}
            className={`slide-frame ${i === current ? 'active' : ''}`}
          >
            {/* Render only the active slide and its neighbours for perf, but
                keep all in tree so transitions feel right */}
            {Math.abs(i - current) <= 1 && <Slide isActive={i === current} />}
          </div>
        ))}
      </div>
    </>
  );
}

function Hud({ current, total, progress }: { current: number; total: number; progress: number }) {
  return (
    <div className="hud">
      <div className="hud-brand">
        <span className="hud-brand-mark">◆</span>
        <span>XSELLIO</span>
      </div>
      <div className="hud-progress">
        <div className="hud-bar">
          <div className="hud-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="hud-counter">
          {String(current + 1).padStart(2, '0')}
          <span className="hud-counter-divider">/</span>
          {String(total).padStart(2, '0')}
        </div>
      </div>
      <div className="hud-hint">
        <kbd>←</kbd><kbd>→</kbd> NAVIGATE
      </div>
    </div>
  );
}
