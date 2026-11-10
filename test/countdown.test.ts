import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { startCountdown } from '../src/countdown';

describe('startCountdown', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('counts 5, 4, 3, 2, 1 one second apart and takes the photo one second after "1"', () => {
    const events: string[] = [];
    startCountdown(5, { onTick: (n) => events.push(String(n)), onDone: () => events.push('snap') });
    expect(events).toEqual(['5']);
    vi.advanceTimersByTime(3999);
    expect(events).toEqual(['5', '4', '3', '2']);
    vi.advanceTimersByTime(1);
    expect(events).toEqual(['5', '4', '3', '2', '1']);
    vi.advanceTimersByTime(999);
    expect(events).not.toContain('snap');
    vi.advanceTimersByTime(1);
    expect(events).toEqual(['5', '4', '3', '2', '1', 'snap']);
  });

  it('takes exactly one photo', () => {
    const done = vi.fn();
    startCountdown(3, { onTick: () => {}, onDone: done });
    vi.advanceTimersByTime(60_000);
    expect(done).toHaveBeenCalledTimes(1);
  });

  it('stops completely when cancelled', () => {
    const tick = vi.fn();
    const done = vi.fn();
    const cancel = startCountdown(5, { onTick: tick, onDone: done });
    vi.advanceTimersByTime(1500);
    cancel();
    vi.advanceTimersByTime(10_000);
    expect(tick).toHaveBeenCalledTimes(2);
    expect(done).not.toHaveBeenCalled();
  });

  it('still counts at least one second for nonsense input', () => {
    const tick = vi.fn();
    startCountdown(0, { onTick: tick, onDone: () => {} });
    expect(tick).toHaveBeenCalledWith(1);
  });
});
