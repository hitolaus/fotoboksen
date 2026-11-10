export interface CountdownHandlers {
  /** Called with seconds remaining: n, n-1, ..., 1. */
  onTick: (remaining: number) => void;
  /** Called one second after the last tick: take the photo now. */
  onDone: () => void;
}

/** Runs a self-timer. Returns a cancel function; after cancel no further callbacks fire. */
export function startCountdown(seconds: number, handlers: CountdownHandlers): () => void {
  let remaining = Math.max(1, Math.floor(seconds));
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const step = () => {
    if (cancelled) return;
    if (remaining === 0) {
      handlers.onDone();
      return;
    }
    handlers.onTick(remaining);
    remaining -= 1;
    timer = setTimeout(step, 1000);
  };
  step();

  return () => {
    cancelled = true;
    if (timer !== undefined) clearTimeout(timer);
  };
}
