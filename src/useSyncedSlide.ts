import { useState, useEffect, useCallback } from 'react';

const SYNC_KEY = 'xsellio-current-slide';

/**
 * Synchronises slide index across browser windows on the same origin.
 * Used to drive both the audience view (/) and the presenter view (/presenter)
 * from a single source of truth.
 *
 * Each window:
 *   - reads the current slide from localStorage on mount
 *   - writes its current slide to localStorage on change
 *   - listens for storage events from the other window and updates
 *
 * Browsers only fire `storage` events in OTHER windows (not the one that wrote),
 * which is exactly what we need.
 */
export function useSyncedSlide(total: number) {
  const [current, setCurrent] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const raw = window.localStorage.getItem(SYNC_KEY);
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) && n >= 0 && n < total ? n : 0;
  });

  // Listen for changes from the OTHER window
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== SYNC_KEY || e.newValue === null) return;
      const n = parseInt(e.newValue, 10);
      if (Number.isFinite(n) && n >= 0 && n < total) {
        setCurrent(n);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [total]);

  // Write local changes to storage so the other window picks them up
  const setSynced = useCallback((idx: number | ((c: number) => number)) => {
    setCurrent((c) => {
      const next = typeof idx === 'function' ? (idx as (c: number) => number)(c) : idx;
      const clamped = Math.max(0, Math.min(total - 1, next));
      try {
        window.localStorage.setItem(SYNC_KEY, String(clamped));
      } catch {
        // localStorage might be disabled — fall back to local-only state
      }
      return clamped;
    });
  }, [total]);

  return [current, setSynced] as const;
}
