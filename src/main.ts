import '@fontsource/lilita-one/latin-400.css';
import '@fontsource/baloo-2/latin-600.css';
import '@fontsource/baloo-2/latin-800.css';
import '@fontsource/anton/latin-400.css';
import '@fontsource/mochiy-pop-one/latin-400.css';
import '@fontsource/pixelify-sans/latin-700.css';
import './style.css';

import { EFFECTS, type EffectId } from './effects';
import { ArtPainter } from './card';
import { PAINTERS, drawThemeTile, loadFonts, renderFinal, type RenderInfo } from './render';
import { startCountdown } from './countdown';
import { cardNumberLabel } from './powers';
import { CardStore, type CardRecord } from './store';
import { PRINT_SIZES, gridFor, printSize, printSummary, type PrintSizeId } from './print';
import { uiIcon } from './icons';
import { COUNTDOWN_SECONDS, RESULT_IDLE_SECONDS } from './config';
import { THEMES, themeOf, isThemeId, visibleThemes, type Theme, type ThemeId } from './themes';
import {
  beep,
  CameraError,
  cardFile,
  keepAwake,
  printPictures,
  type PrintItem,
  shareFiles,
  shutterSound,
  startCamera,
  unlockSound,
} from './device';

type Screen = 'start' | 'booth' | 'result' | 'gallery';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const video = $<HTMLVideoElement>('video');
const preview = $<HTMLCanvasElement>('preview');
const pctx = preview.getContext('2d')!;
const state = {
  screen: 'start' as Screen,
  theme: THEMES.kort as Theme,
  frame: '',
  effect: 'normal' as EffectId,
  nextNumber: 1,
  count: 0,
  lastSurprise: undefined as string | undefined,
  counting: false,
  cameraOn: false,
};
state.frame = state.theme.frames[0].id;

let store: CardStore | undefined;

/* ---------- screens ---------- */

let resultIdle: ReturnType<typeof setTimeout> | undefined;

function show(screen: Screen) {
  if (screen !== 'gallery' && selecting) setSelecting(false);
  state.screen = screen;
  document.body.dataset.screen = screen;
  clearTimeout(resultIdle);
  if (screen === 'booth') requestAnimationFrame(frame);
  if (screen === 'gallery') void renderGallery();
}

function toast(message: string) {
  const el = $('toast');
  el.textContent = message;
  el.hidden = false;
  setTimeout(() => (el.hidden = true), 3500);
}

/* ---------- theme ---------- */

function applyTheme(id: ThemeId) {
  const theme = THEMES[id];
  state.theme = theme;
  state.frame = theme.frames[0].id;
  state.lastSurprise = undefined;
  document.body.dataset.theme = id;
  document.documentElement.style.setProperty('--ratio', `${theme.width} / ${theme.height}`);
  $('types-heading').textContent = theme.framesHeading;
  $('shutter-label').textContent = theme.shutterLabel;
  renderPickers();
  sizePreview();
}

/* ---------- pickers ---------- */

function renderPickers() {
  $('types').innerHTML = state.theme.frames
    .map(
      (f) => `<button class="chip" type="button" data-frame="${f.id}" aria-pressed="${f.id === state.frame}">
      <span class="chip-disc" style="--c1:${f.c1};--c2:${f.c2};color:${f.ink}">${f.iconSvg}</span>
      <span class="chip-label">${f.label}</span></button>`,
    )
    .join('');
  $('effects').innerHTML = EFFECTS.map(
    (e) => `<button class="chip chip-effect" type="button" data-effect="${e.id}" aria-pressed="${e.id === state.effect}">
      <span class="chip-disc">${uiIcon(e.id)}</span><span class="chip-label">${e.label}</span></button>`,
  ).join('');
}

function select(group: 'types' | 'effects', btn: HTMLElement) {
  for (const b of $(group).querySelectorAll('button')) b.setAttribute('aria-pressed', String(b === btn));
  btn.classList.remove('picked');
  void btn.offsetWidth;
  btn.classList.add('picked');
}

$('types').addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-frame]');
  if (!btn || state.counting) return;
  state.frame = btn.dataset.frame!;
  select('types', btn);
  layerKey = '';
});

$('effects').addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-effect]');
  if (!btn || state.counting) return;
  state.effect = btn.dataset.effect as EffectId;
  select('effects', btn);
});

/* ---------- live preview ---------- */

const painter = new ArtPainter();
const under = document.createElement('canvas');
const over = document.createElement('canvas');
let layerKey = '';
let previewScale = 0.6;
const startedAt = performance.now();
const foilPhase = () => ((performance.now() - startedAt) / 9000) % 1;

const currentInfo = (): RenderInfo => ({ number: state.nextNumber, date: new Date() });

function sizePreview() {
  const h = preview.getBoundingClientRect().height || 600;
  previewScale = Math.min(0.85, Math.max(0.4, (h * devicePixelRatio) / state.theme.height));
  preview.width = Math.round(state.theme.width * previewScale);
  preview.height = Math.round(state.theme.height * previewScale);
  layerKey = '';
}

/** The theme's drawing under and over the photo changes rarely, so it is cached and only the photo redraws. */
function drawLayers() {
  const p = PAINTERS[state.theme.id];
  for (const [layer, draw] of [
    [under, p.under],
    [over, p.over],
  ] as const) {
    layer.width = preview.width;
    layer.height = preview.height;
    const c = layer.getContext('2d')!;
    c.clearRect(0, 0, layer.width, layer.height);
    draw?.(c, previewScale, state.frame, currentInfo());
  }
}

function frame() {
  if (state.screen !== 'booth') return;
  const key = `${state.theme.id}|${state.frame}|${state.nextNumber}|${previewScale}`;
  if (key !== layerKey) {
    drawLayers();
    layerKey = key;
  }
  const p = PAINTERS[state.theme.id];
  pctx.clearRect(0, 0, preview.width, preview.height);
  pctx.drawImage(under, 0, 0);
  if (video.videoWidth) {
    painter.paint(pctx, video, video.videoWidth, video.videoHeight, p.art(previewScale), p.artRadius(previewScale), state.effect, foilPhase());
  }
  pctx.drawImage(over, 0, 0);
  requestAnimationFrame(frame);
}

new ResizeObserver(sizePreview).observe(preview);

/* ---------- countdown and capture ---------- */

let cancelCountdown: (() => void) | undefined;

function takePicture() {
  if (state.counting || !video.videoWidth) return;
  unlockSound();
  state.counting = true;
  document.body.dataset.counting = 'true';
  const cd = $('countdown');
  const num = $('countdown-num');
  cd.hidden = false;
  cd.style.setProperty('--budget', `${COUNTDOWN_SECONDS}s`);
  cd.classList.remove('running');
  void cd.offsetWidth;
  cd.classList.add('running');

  cancelCountdown = startCountdown(COUNTDOWN_SECONDS, {
    onTick: (n) => {
      num.textContent = String(n);
      num.classList.remove('tick');
      void num.offsetWidth;
      num.classList.add('tick');
      beep(n === 1 ? 880 : 660);
    },
    onDone: () => void capture(),
  });
}

async function capture() {
  const flash = $('flash');
  flash.classList.remove('go');
  void flash.offsetWidth;
  flash.classList.add('go');
  shutterSound();

  const theme = state.theme;
  const surprise = theme.surprise(state.frame, Math.random, state.lastSurprise);
  const info: RenderInfo = { ...currentInfo(), surprise };
  const effect = state.effect;
  let image: Blob;
  try {
    image = await renderFinal(theme.id, state.frame, video, video.videoWidth, video.videoHeight, effect, foilPhase(), info);
  } catch {
    endCountdown();
    toast('Billedet kunne ikke laves. Prøv igen.');
    return;
  }
  state.lastSurprise = surprise.text;

  const record: CardRecord = {
    number: info.number,
    createdAt: Date.now(),
    theme: theme.id,
    type: state.frame,
    effect,
    power: surprise.text,
    strength: surprise.strength,
    image,
  };
  try {
    await store?.add(record);
    state.count += 1;
  } catch {
    toast('Billedet blev ikke gemt i samlingen. Der er måske ikke mere plads.');
  }
  state.nextNumber = info.number + 1;
  updateGalleryButton();
  endCountdown();
  showResult(record);
}

function endCountdown() {
  cancelCountdown?.();
  state.counting = false;
  delete document.body.dataset.counting;
  $('countdown').hidden = true;
}

$('shutter').addEventListener('click', takePicture);

/* ---------- tilting picture (result + viewer) ---------- */

const altText = (r: CardRecord) => `${THEMES[themeOf(r)].name} ${cardNumberLabel(r.number)}: ${r.power}`;

function mountPicture(host: HTMLElement, record: CardRecord, url: string, reveal: boolean) {
  const theme = themeOf(record);
  host.dataset.theme = theme;
  host.style.setProperty('--ratio', `${THEMES[theme].width} / ${THEMES[theme].height}`);
  host.innerHTML = `<div class="flipper${reveal ? ' reveal' : ''}">
      <div class="face face-back card-back" aria-hidden="true"><span class="card-back-title">Fotoboksen</span></div>
      <div class="face face-front"><img src="${url}" alt="${altText(record)}" draggable="false"><span class="foil" aria-hidden="true"></span></div>
    </div>`;
}

function attachTilt(host: HTMLElement) {
  const move = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    host.style.setProperty('--mx', `${x * 100}%`);
    host.style.setProperty('--my', `${y * 100}%`);
    host.style.setProperty('--ry', `${(x - 0.5) * 24}deg`);
    host.style.setProperty('--rx', `${(0.5 - y) * 24}deg`);
    host.classList.add('touching');
  };
  const leave = () => host.classList.remove('touching');
  host.addEventListener('pointerdown', move);
  host.addEventListener('pointermove', move);
  host.addEventListener('pointerup', leave);
  host.addEventListener('pointercancel', leave);
  host.addEventListener('pointerleave', leave);
}

/* ---------- result ---------- */

let resultUrl: string | undefined;
let resultRecord: CardRecord | undefined;

function showResult(record: CardRecord) {
  resultRecord = record;
  if (resultUrl) URL.revokeObjectURL(resultUrl);
  resultUrl = URL.createObjectURL(record.image);
  const theme = THEMES[themeOf(record)];
  $('result-title').textContent = theme.resultTitle(record.number);
  $('result-label').textContent = theme.resultLabel;
  $('result-power').textContent = record.power;
  (document.querySelector('.result-power') as HTMLElement).hidden = !theme.resultLabel;
  mountPicture($('result-card'), record, resultUrl, true);
  show('result');
  armResultIdle();
}

function armResultIdle() {
  clearTimeout(resultIdle);
  resultIdle = setTimeout(() => state.screen === 'result' && show('booth'), RESULT_IDLE_SECONDS * 1000);
}

$('result').addEventListener('pointerdown', armResultIdle);
$('again').addEventListener('click', () => show('booth'));
$('result-gallery').addEventListener('click', () => show('gallery'));
$('result-print').addEventListener('click', () => resultRecord && resultUrl && askPrint([printItem(resultRecord, resultUrl)]));

/* ---------- gallery ---------- */

let galleryUrls: string[] = [];
let galleryRecords: CardRecord[] = [];

function updateGalleryButton() {
  $('open-gallery').innerHTML = `${uiIcon('cards')}<span>Samling</span><span class="count">${state.count}</span>`;
}

async function renderGallery() {
  galleryUrls.forEach((u) => URL.revokeObjectURL(u));
  galleryRecords = store ? await store.list() : [];
  galleryUrls = galleryRecords.map((r) => URL.createObjectURL(r.image));
  if (selecting) setSelecting(false);
  updateSelectionUi();
  $('gallery-empty').hidden = galleryRecords.length > 0;
  $<HTMLButtonElement>('share-all').disabled = galleryRecords.length === 0;
  $<HTMLButtonElement>('select-start').disabled = galleryRecords.length === 0;
  $('binder').innerHTML = galleryRecords
    .map((r, i) => {
      const t = THEMES[themeOf(r)];
      return `<button class="pocket" type="button" data-index="${i}" data-theme="${t.id}" style="--ratio:${t.width} / ${t.height}" aria-label="${altText(r)}">
        <img src="${galleryUrls[i]}" alt="" loading="lazy" decoding="async"></button>`;
    })
    .join('');
}

$('binder').addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-index]');
  if (!btn) return;
  const i = Number(btn.dataset.index);
  if (selecting) toggleSelected(i, btn);
  else openViewer(i);
});

/* ---------- choosing pictures to print together ---------- */

let selecting = false;
const selected = new Set<number>();

function setSelecting(on: boolean) {
  selecting = on;
  selected.clear();
  $('gallery').dataset.selecting = String(on);
  for (const b of $('binder').querySelectorAll<HTMLElement>('.pocket')) {
    if (on) b.setAttribute('aria-pressed', 'false');
    else b.removeAttribute('aria-pressed');
  }
  updateSelectionUi();
}

function toggleSelected(i: number, btn: HTMLElement) {
  if (selected.has(i)) selected.delete(i);
  else selected.add(i);
  btn.setAttribute('aria-pressed', String(selected.has(i)));
  updateSelectionUi();
}

function updateSelectionUi() {
  const n = selected.size;
  $('gallery-count').textContent = selecting
    ? `${n} valgt`
    : `${galleryRecords.length} ${galleryRecords.length === 1 ? 'billede' : 'billeder'}`;
  $<HTMLButtonElement>('print-selected').disabled = n === 0;
  $('print-selected').innerHTML = `${uiIcon('print')}<span>Print${n ? ` (${n})` : ''}</span>`;
}

$('select-start').addEventListener('click', () => setSelecting(true));
$('select-cancel').addEventListener('click', () => setSelecting(false));
$('print-selected').addEventListener('click', () => {
  // in gallery order, newest first, the same order the adult sees
  const items = [...selected].sort((a, b) => a - b).map((i) => printItem(galleryRecords[i], galleryUrls[i]));
  if (items.length) askPrint(items);
});

/* ---------- print size ---------- */

const printDialog = $<HTMLDialogElement>('print-dialog');
let pendingPrint: PrintItem[] = [];

function printItem(r: CardRecord, url: string): PrintItem {
  const t = THEMES[themeOf(r)];
  return { url, ratio: t.width / t.height };
}

/** A tiny A4 page showing how the pictures sit on the sheet at that size. */
function sheetPreview(id: PrintSizeId): string {
  const { cols, rows } = gridFor(printSize(id));
  const cells = Array.from({ length: cols * rows }, () => '<i></i>').join('');
  return `<span class="mini-sheet" style="--cols:${cols};--rows:${rows}" aria-hidden="true">${cells}</span>`;
}

function askPrint(items: PrintItem[]) {
  pendingPrint = items;
  $('print-count').textContent = items.length === 1 ? '1 billede' : `${items.length} billeder`;
  $('print-sizes').innerHTML = PRINT_SIZES.map(
    (s) => `<button class="print-size" type="button" data-size="${s.id}">
      ${sheetPreview(s.id)}
      <span class="print-size-label">${s.label}</span>
      <span class="print-size-hint">${s.hint}</span>
      <span class="print-size-sum">${printSummary(items.length, s)}</span>
    </button>`,
  ).join('');
  printDialog.showModal();
}

$('print-sizes').addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-size]');
  if (!btn) return;
  printDialog.close();
  void printPictures(pendingPrint, printSize(btn.dataset.size as PrintSizeId));
});
$('print-cancel').addEventListener('click', () => printDialog.close());
printDialog.addEventListener('click', (e) => e.target === printDialog && printDialog.close());

$('gallery-back').addEventListener('click', () => show('booth'));
$('gallery-first').addEventListener('click', () => show('booth'));
/** Back to the start screen to pick another theme; the camera keeps running. */
function goToThemes() {
  if (state.counting) return;
  delete document.body.dataset.theme;
  show('start');
}

$('change-theme').addEventListener('click', goToThemes);
$('booth-back').addEventListener('click', goToThemes);
$('open-gallery').addEventListener('click', () => !state.counting && show('gallery'));
$('share-all').addEventListener('click', () =>
  shareFiles(galleryRecords.map((r) => cardFile(r.image, r.number))).catch(() => toast('Billederne kunne ikke deles.')),
);

/* ---------- viewer ---------- */

const viewer = $<HTMLDialogElement>('viewer');
let viewerIndex = -1;
let deleteArmed: ReturnType<typeof setTimeout> | undefined;
const deleteBtn = $('viewer-delete');

function openViewer(i: number) {
  viewerIndex = i;
  mountPicture($('viewer-card'), galleryRecords[i], galleryUrls[i], false);
  disarmDelete();
  viewer.showModal();
}

function disarmDelete() {
  clearTimeout(deleteArmed);
  deleteArmed = undefined;
  deleteBtn.classList.remove('armed');
  deleteBtn.innerHTML = `${uiIcon('trash')}<span>Slet</span>`;
}

deleteBtn.addEventListener('click', async () => {
  if (!deleteArmed) {
    deleteBtn.classList.add('armed');
    deleteBtn.innerHTML = `${uiIcon('trash')}<span>Tryk igen for at slette</span>`;
    deleteArmed = setTimeout(disarmDelete, 3000);
    return;
  }
  disarmDelete();
  const r = galleryRecords[viewerIndex];
  await store?.remove(r.number);
  state.count = Math.max(0, state.count - 1);
  updateGalleryButton();
  viewer.close();
  await renderGallery();
});

$('viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (e) => e.target === viewer && viewer.close());
$('viewer-print').addEventListener('click', () => askPrint([printItem(galleryRecords[viewerIndex], galleryUrls[viewerIndex])]));
$('viewer-share').addEventListener('click', () => {
  const r = galleryRecords[viewerIndex];
  shareFiles([cardFile(r.image, r.number)]).catch(() => toast('Billedet kunne ikke deles.'));
});

/* ---------- start ---------- */

async function boot() {
  $('shutter-icon').innerHTML = uiIcon('camera');
  $('again').innerHTML = `${uiIcon('again')}<span>Igen!</span>`;
  $('result-print').innerHTML = `${uiIcon('print')}<span>Print</span>`;
  $('result-gallery').innerHTML = `${uiIcon('cards')}<span>Samling</span>`;
  $('gallery-back').innerHTML = `${uiIcon('back')}<span>Tilbage</span>`;
  $('change-theme').innerHTML = `${uiIcon('palette')}<span>Skift tema</span>`;
  $('booth-back').innerHTML = `${uiIcon('back')}<span>Skift tema</span>`;
  $('share-all').innerHTML = `${uiIcon('share')}<span>Del alle</span>`;
  $('select-start').innerHTML = `${uiIcon('select')}<span>Vælg</span>`;
  $('select-cancel').innerHTML = `${uiIcon('close')}<span>Annuller</span>`;
  $('viewer-print').innerHTML = `${uiIcon('print')}<span>Print</span>`;
  $('viewer-share').innerHTML = `${uiIcon('share')}<span>Del</span>`;
  $('viewer-close').innerHTML = `${uiIcon('close')}<span>Luk</span>`;
  attachTilt($('result-card'));
  attachTilt($('viewer-card'));

  try {
    store = await CardStore.open();
    state.nextNumber = await store.nextNumber();
    state.count = await store.count();
  } catch {
    toast('Samlingen kan ikke gemmes i denne browser. Billeder vises, men gemmes ikke.');
  }
  updateGalleryButton();
  await loadFonts();
  renderThemePicks();
}

/** One tile per offered theme: a sunburst card back in the theme's colours, or a finished sample picture for a theme without one. */
function renderThemePicks() {
  const host = $('theme-picks');
  // tile size is shared out between however many themes are offered
  host.style.setProperty('--count', String(visibleThemes().length));
  host.innerHTML = visibleThemes()
    .map(
      (t) => `<button class="theme-pick" type="button" data-theme-pick="${t.id}">
        ${
          t.id === 'kort' || t.id === 'kawaii' || t.id === 'blokland'
            ? `<span class="card-back card-back-${t.id} theme-art"><span class="card-back-title">${t.name}</span></span>`
            : `<canvas class="theme-tile theme-art" style="--ratio:${t.width} / ${t.height}" aria-hidden="true"></canvas>`
        }
        <span class="theme-name">${t.name}</span></button>`,
    )
    .join('');
  for (const c of host.querySelectorAll<HTMLCanvasElement>('canvas.theme-tile')) {
    const id = (c.closest('[data-theme-pick]') as HTMLElement).dataset.themePick as ThemeId;
    drawThemeTile(c, id, 0.5);
  }
}

const booting = boot();

$('theme-picks').addEventListener('click', async (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-theme-pick]');
  const id = btn?.dataset.themePick;
  if (!isThemeId(id)) return;
  unlockSound();
  const err = $('start-error');
  err.hidden = true;
  try {
    await Promise.all([booting, state.cameraOn ? undefined : startCamera(video)]);
  } catch (e) {
    err.textContent = e instanceof CameraError ? e.message : 'Noget gik galt. Genindlæs siden og prøv igen.';
    err.hidden = false;
    return;
  }
  if (!state.cameraOn) {
    state.cameraOn = true;
    void keepAwake();
    void navigator.storage?.persist?.();
  }
  show('booth');
  applyTheme(id);
});
