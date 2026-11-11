import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { build } from 'vite';
import { serviceWorkerFor } from '../offline';

const ORIGIN = 'https://fotoboksen.example';
const root = join(__dirname, '..');

let out: string;
let sw: string;

const builtFiles = () =>
  readdirSync(out, { recursive: true, withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => relative(out, join(d.parentPath, d.name)).split(sep).join('/'))
    .filter((p) => p !== 'sw.js');

beforeAll(async () => {
  out = mkdtempSync(join(tmpdir(), 'fotoboksen-build-'));
  // Vitest sets NODE_ENV=test, which would build the app as a non-production bundle.
  const env = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  await build({ root, logLevel: 'silent', build: { outDir: out, emptyOutDir: true } });
  process.env.NODE_ENV = env;
  sw = readFileSync(join(out, 'sw.js'), 'utf8');
}, 60_000);

afterAll(() => rmSync(out, { recursive: true, force: true }));

/** Runs sw.js against an in-memory Cache Storage and a fetch that serves the build. */
function worker(source: string) {
  let online = true;
  const listeners: Record<string, (e: any) => void> = {};
  const storage = new Map<string, Map<string, Response>>();
  const keyOf = (r: string | Request) => new URL(typeof r === 'string' ? r : r.url, ORIGIN).pathname;

  const fetchFromServer = async (r: Request | string): Promise<Response> => {
    if (!online) throw new TypeError('Load failed');
    const path = keyOf(r);
    const file = path === '/' ? 'index.html' : path.slice(1);
    try {
      return new Response(readFileSync(join(out, file)));
    } catch {
      return new Response('not found', { status: 404 });
    }
  };

  const caches = {
    async open(name: string) {
      if (!storage.has(name)) storage.set(name, new Map());
      const m = storage.get(name)!;
      return {
        async addAll(reqs: Request[]) {
          for (const r of reqs) {
            const res = await fetchFromServer(r);
            if (!res.ok) throw new TypeError(`addAll: ${r.url} gave ${res.status}`);
            m.set(keyOf(r), res);
          }
        },
        async match(r: string | Request) {
          return m.get(keyOf(r))?.clone();
        },
      };
    },
    keys: async () => [...storage.keys()],
    delete: async (name: string) => storage.delete(name),
  };

  const self = { location: new URL(`${ORIGIN}/sw.js`), addEventListener: (t: string, f: any) => (listeners[t] = f) };
  new Function('self', 'caches', 'fetch', source)(self, caches, fetchFromServer);

  const lifecycle = async (type: 'install' | 'activate') => {
    let wait: Promise<unknown> = Promise.resolve();
    listeners[type]({ waitUntil: (p: Promise<unknown>) => (wait = p) });
    await wait;
  };

  return {
    storage,
    goOffline: () => (online = false),
    install: () => lifecycle('install'),
    activate: () => lifecycle('activate'),
    /** What the page gets for a request; null means the browser goes to the network itself. */
    async request(path: string, mode: RequestMode | 'navigate' = 'no-cors', method = 'GET') {
      const request = { method, url: new URL(path, ORIGIN).href, mode };
      let answer: Promise<Response> | null = null;
      listeners.fetch({ request, respondWith: (p: Promise<Response>) => (answer = p) });
      return answer;
    },
  };
}

describe('offline service worker', () => {
  it('is built next to the app, and the app registers it', () => {
    expect(sw).toContain("addEventListener('fetch'");
    const js = builtFiles().filter((p) => p.endsWith('.js'));
    expect(js.some((p) => readFileSync(join(out, p), 'utf8').includes('/sw.js'))).toBe(true);
  });

  it('serves every built file with the network gone, after one online launch', async () => {
    const w = worker(sw);
    await w.install();
    await w.activate();
    w.goOffline();

    const files = builtFiles();
    expect(files).toContain('index.html');
    expect(files.some((p) => p.endsWith('.woff2'))).toBe(true);
    for (const file of files) {
      const path = file === 'index.html' ? '/' : `/${file}`;
      const res = await w.request(path);
      expect(res, path).not.toBeNull();
      expect(Buffer.from(await res!.arrayBuffer()).equals(readFileSync(join(out, file))), path).toBe(true);
    }
  });

  it('opens the app offline from the Home Screen start URL and any other page URL', async () => {
    const w = worker(sw);
    await w.install();
    w.goOffline();
    const index = readFileSync(join(out, 'index.html'), 'utf8');
    for (const path of ['/', '/?source=homescreen', '/index.html']) {
      const res = await w.request(path, 'navigate');
      expect(await res!.text(), path).toBe(index);
    }
  });

  it('does not store /index.html, which Cloudflare Pages answers with a redirect', async () => {
    const w = worker(sw);
    await w.install();
    const [cache] = [...w.storage.values()];
    expect(cache.has('/')).toBe(true);
    expect(cache.has('/index.html')).toBe(false);
  });

  it('leaves requests to other sites and non-GET requests to the browser', async () => {
    const w = worker(sw);
    await w.install();
    expect(await w.request('https://elsewhere.example/font.woff2')).toBeNull();
    expect(await w.request('/', 'navigate', 'POST')).toBeNull();
  });

  it('replaces the stored copy when a new version is deployed', async () => {
    const w = worker(sw);
    await w.install();
    await w.activate();
    const [oldName] = w.storage.keys();

    const changed = serviceWorkerFor([
      { path: 'index.html', bytes: new TextEncoder().encode('<p>new</p>') },
    ]);
    const next = worker(changed);
    // Same device: carry over what the old version stored.
    for (const [k, v] of w.storage) next.storage.set(k, v);
    await next.install();
    await next.activate();

    expect([...next.storage.keys()]).not.toContain(oldName);
    expect(next.storage.size).toBe(1);
  });
});

describe('serviceWorkerFor', () => {
  const file = (path: string, text: string) => ({ path, bytes: new TextEncoder().encode(text) });

  it('names a new cache when any file changes, even one without a hash in its name', () => {
    const a = serviceWorkerFor([file('index.html', 'x'), file('icon.svg', '<svg/>')]);
    const b = serviceWorkerFor([file('index.html', 'x'), file('icon.svg', '<svg id="new"/>')]);
    const cacheName = (s: string) => /const CACHE = .*;/.exec(s)![0];
    expect(cacheName(a)).not.toBe(cacheName(b));
  });

  it('keeps the same cache when nothing changed', () => {
    const files = [file('index.html', 'x'), file('assets/a.js', 'y')];
    expect(serviceWorkerFor(files)).toBe(serviceWorkerFor([...files].reverse()));
  });
});
