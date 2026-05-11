import { useEffect, useState, useCallback } from 'react';
import { SLIDES } from './slides';
import { SLIDE_NOTES } from './speakerNotes';
import { useSyncedSlide } from './useSyncedSlide';

export default function PresenterView() {
  const total = SLIDES.length;
  const [current, setCurrent] = useSyncedSlide(total);
  const [elapsed, setElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Timer
  useEffect(() => {
    if (!timerRunning) return;
    const tick = () => {
      if (startTime !== null) setElapsed(Date.now() - startTime);
    };
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [timerRunning, startTime]);

  const startTimer = useCallback(() => {
    setStartTime(Date.now() - elapsed);
    setTimerRunning(true);
  }, [elapsed]);

  const pauseTimer = useCallback(() => {
    setTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setStartTime(null);
    setElapsed(0);
    setTimerRunning(false);
  }, []);

  // Keyboard nav — same as audience view, sync via storage
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrent((c) => c + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrent((c) => c - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrent(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrent(total - 1);
      } else if (/^[0-9]$/.test(e.key)) {
        const n = e.key === '0' ? 9 : parseInt(e.key, 10) - 1;
        setCurrent(n);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setCurrent, total]);

  const notes = SLIDE_NOTES[current];
  const nextNotes = current < total - 1 ? SLIDE_NOTES[current + 1] : null;

  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const timerDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="presenter-root">
      {/* Header bar */}
      <div className="presenter-header">
        <div className="presenter-brand">
          <span className="presenter-brand-mark">◆</span>
          <span className="presenter-brand-name">XSELLIO</span>
          <span className="presenter-brand-sub">Presenter View</span>
        </div>

        <div className="presenter-timer-block">
          <div className="presenter-timer-label">ELAPSED</div>
          <div className={`presenter-timer ${elapsed > 25 * 60 * 1000 ? 'over' : ''}`}>{timerDisplay}</div>
          <div className="presenter-timer-controls">
            {!timerRunning ? (
              <button onClick={startTimer}>▶ Start</button>
            ) : (
              <button onClick={pauseTimer}>⏸ Pause</button>
            )}
            <button onClick={resetTimer}>↺ Reset</button>
          </div>
        </div>

        <div className="presenter-counter-block">
          <div className="presenter-counter-label">SLIDE</div>
          <div className="presenter-counter">
            {String(current + 1).padStart(2, '0')}
            <span className="presenter-counter-divider">/</span>
            {String(total).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="presenter-body">
        {/* Left column — current slide title + notes */}
        <div className="presenter-notes-col">
          <div className="presenter-slide-title-row">
            <div className="presenter-slide-num">{String(current + 1).padStart(2, '0')}</div>
            <div className="presenter-slide-title">{notes?.title || 'Untitled'}</div>
          </div>

          <div className="presenter-notes-body">
            {notes?.notes || 'No notes for this slide.'}
          </div>

          {notes?.beats && notes.beats.length > 0 && (
            <div className="presenter-beats">
              <div className="presenter-section-label">KEY BEATS</div>
              <ul>
                {notes.beats.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {notes?.questions && notes.questions.length > 0 && (
            <div className="presenter-qa">
              <div className="presenter-section-label">ANTICIPATED QUESTIONS</div>
              {notes.questions.map((qa, i) => (
                <div key={i} className="presenter-qa-item">
                  <div className="presenter-qa-q">Q: {qa.q}</div>
                  <div className="presenter-qa-a">A: {qa.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column — next slide preview, navigation */}
        <div className="presenter-side-col">
          <div className="presenter-next-block">
            <div className="presenter-section-label">COMING UP</div>
            {nextNotes ? (
              <>
                <div className="presenter-next-title">{nextNotes.title}</div>
                <div className="presenter-next-snippet">
                  {nextNotes.notes.slice(0, 180)}{nextNotes.notes.length > 180 ? '…' : ''}
                </div>
              </>
            ) : (
              <div className="presenter-next-end">— End of deck —</div>
            )}
          </div>

          <div className="presenter-nav">
            <button
              onClick={() => setCurrent((c) => c - 1)}
              disabled={current === 0}
              className="presenter-nav-btn"
            >
              ◀ Prev
            </button>
            <button
              onClick={() => setCurrent((c) => c + 1)}
              disabled={current === total - 1}
              className="presenter-nav-btn primary"
            >
              Next ▶
            </button>
          </div>

          <div className="presenter-hint">
            <div className="presenter-section-label">SHORTCUTS</div>
            <div className="presenter-shortcuts">
              <kbd>←</kbd> <kbd>→</kbd> Navigate<br />
              <kbd>Space</kbd> Next<br />
              <kbd>1</kbd>–<kbd>9</kbd> Jump to slide<br />
              <kbd>Home</kbd> / <kbd>End</kbd> First / Last
            </div>
          </div>

          <div className="presenter-audience-link">
            <div className="presenter-section-label">AUDIENCE VIEW</div>
            <div className="presenter-shortcuts">
              Open <code>/</code> in another window (full-screen on projector or Teams share).
              Both windows stay synced automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
