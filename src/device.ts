/** Browser plumbing: camera, sound, screen wake lock, print and share. */

export class CameraError extends Error {}

export async function startCamera(video: HTMLVideoElement): Promise<void> {
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
    throw new CameraError('Kameraet virker kun når appen åbnes via https.');
  }
  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 } },
    });
  } catch (err) {
    const name = (err as DOMException).name;
    if (name === 'NotAllowedError') {
      throw new CameraError('Kameraet er ikke tilladt. Gå til Indstillinger › Apps › Safari › Kamera, vælg Tillad, og prøv igen.');
    }
    if (name === 'NotFoundError' || name === 'OverconstrainedError') {
      throw new CameraError('Der blev ikke fundet noget kamera på denne enhed.');
    }
    throw new CameraError('Kameraet kunne ikke starte. Luk andre apps der bruger kameraet, og prøv igen.');
  }
  video.srcObject = stream;
  await video.play();
  if (!video.videoWidth) await new Promise((r) => video.addEventListener('loadedmetadata', r, { once: true }));
}

let audio: AudioContext | undefined;

/** Must run inside a tap: iPad Safari only lets sound start from a user gesture. */
export function unlockSound(): void {
  audio ??= new AudioContext();
  if (audio.state === 'suspended') void audio.resume();
}

export function beep(freq: number, seconds = 0.12): void {
  if (!audio) return;
  const t = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = 'triangle';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
  osc.connect(gain).connect(audio.destination);
  osc.start(t);
  osc.stop(t + seconds + 0.02);
}

/** A short "kshh" of filtered noise, the classic shutter. */
export function shutterSound(): void {
  if (!audio) return;
  const len = Math.floor(audio.sampleRate * 0.18);
  const buf = audio.createBuffer(1, len, audio.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
  const src = audio.createBufferSource();
  src.buffer = buf;
  const filter = audio.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 1200;
  src.connect(filter).connect(audio.destination);
  src.start();
}

let wakeLock: WakeLockSentinel | undefined;

/** Keeps the iPad from dimming and locking in the middle of the party. */
export async function keepAwake(): Promise<void> {
  const request = async () => {
    try {
      wakeLock = await navigator.wakeLock?.request('screen');
    } catch {
      /* not supported or refused: Auto-Lock must then be turned off in Settings */
    }
  };
  await request();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && (!wakeLock || wakeLock.released)) void request();
  });
}

export async function printImage(url: string): Promise<void> {
  const sheet = document.getElementById('print-sheet')!;
  const img = sheet.querySelector('img') ?? sheet.appendChild(document.createElement('img'));
  img.alt = '';
  img.src = url;
  await img.decode();
  window.print();
}

export function cardFile(image: Blob, number: number): File {
  return new File([image], `fotoboksen-kort-${String(number).padStart(3, '0')}.jpg`, { type: 'image/jpeg' });
}

/** Opens the iPad share sheet (Gem billede, AirDrop, Print ...); falls back to downloads elsewhere. */
export async function shareFiles(files: File[]): Promise<void> {
  if (navigator.canShare?.({ files })) {
    try {
      await navigator.share({ files });
    } catch (err) {
      if ((err as DOMException).name !== 'AbortError') throw err;
    }
    return;
  }
  for (const f of files) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(f);
    a.download = f.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10_000);
  }
}
