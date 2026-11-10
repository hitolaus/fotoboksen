import '@fontsource/lilita-one/latin-400.css';
import '@fontsource/baloo-2/latin-600.css';
import '@fontsource/baloo-2/latin-800.css';
import './style.css';

import { CARD_TYPES, cardType, type CardTypeId } from './cardTypes';
import { EFFECTS, type EffectId } from './effects';
import { cardLayout, CARD_H, CARD_W } from './geometry';
import { ArtPainter, drawChrome, loadCardFonts, renderFinalCard, type CardInfo } from './card';
import { startCountdown } from './countdown';
import { cardNumberLabel, pickPower, pickStrength } from './powers';
import { CardStore, type CardRecord } from './store';
import { elementIcon, uiIcon } from './icons';
import { COUNTDOWN_SECONDS, RESULT_IDLE_SECONDS } from './config';
import {
  beep,
  CameraError,
  cardFile,
  keepAwake,
  printImage,
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
  type: 'ild' as CardTypeId,
  effect: 'normal' as EffectId,
  nextNumber: 1,
  count: 0,
  lastPower: undefined as string | undefined,
  counting: false,
};

let store: CardStore | undefined;

/* ---------- screens ---------- */

let resultIdle: ReturnType<typeof setTimeout> | undefined;

function show(screen: Screen) {
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

/* ---------- pickers ---------- */

function renderPickers() {
  $('types').innerHTML = CARD_TYPES.map(
    (t) => `<button class="chip" type="button" data-type="${t.id}" aria-pressed="${t.id === state.type}">
      <span class="chip-disc" style="--c1:${t.light};--c2:${t.dark};color:${t.id === 'lyn' ? '#141a4d' : '#fff7e0'}">${elementIcon(t.icon)}</span>
      <span class="chip-label">${t.label}</span></button>`,
  ).join('');
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
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-type]');
  if (!btn || state.counting) return;
  state.type = btn.dataset.type as CardTypeId;
  select('types', btn);
  chromeKey = '';
});

$('effects').addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-effect]');
  if (!btn || state.counting) return;
  state.effect = btn.dataset.effect as EffectId;
  select('effects', btn);
});

/* ---------- live preview ---------- */

const painter = new ArtPainter();
const chrome = document.createElement('canvas');
let chromeKey = '';
let previewScale = 0.6;
const startedAt = performance.now();
const foilPhase = () => ((performance.now() - startedAt) / 9000) % 1;

function currentInfo(): CardInfo {
  return { type: cardType(state.type), number: state.nextNumber, date: new Date() };
}

function sizePreview() {
  const h = preview.getBoundingClientRect().height || 600;
  previewScale = Math.min(0.85, Math.max(0.4, (h * devicePixelRatio) / CARD_H));
  preview.width = Math.round(CARD_W * previewScale);
  preview.height = Math.round(CARD_H * previewScale);
  chromeKey = '';
}

function frame() {
  if (state.screen !== 'booth') return;
  const key = `${state.type}|${state.nextNumber}|${previewScale}`;
  const L = cardLayout(previewScale);
  if (key !== chromeKey) {
    chrome.width = preview.width;
    chrome.height = preview.height;
    const c = chrome.getContext('2d')!;
    c.clearRect(0, 0, chrome.width, chrome.height);
    drawChrome(c, L, previewScale, currentInfo());
    chromeKey = key;
  }
  pctx.clearRect(0, 0, preview.width, preview.height);
  pctx.drawImage(chrome, 0, 0);
  if (video.videoWidth) painter.paint(pctx, video, video.videoWidth, video.videoHeight, L.art, state.effect, foilPhase());
  requestAnimationFrame(frame);
}

new ResizeObserver(sizePreview).observe(preview);

/* ---------- countdown and capture ---------- */

let cancelCountdown: (() => void) | undefined;

function takeCard() {
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

  const power = pickPower(Math.random, state.lastPower);
  const strength = pickStrength(Math.random);
  const info: CardInfo = { ...currentInfo(), power, strength };
  const effect = state.effect;
  let image: Blob;
  try {
    image = await renderFinalCard(video, video.videoWidth, video.videoHeight, effect, foilPhase(), info);
  } catch {
    endCountdown();
    toast('Kortet kunne ikke laves. Prøv igen.');
    return;
  }
  state.lastPower = power;

  const record: CardRecord = {
    number: info.number,
    createdAt: Date.now(),
    type: state.type,
    effect,
    power,
    strength,
    image,
  };
  try {
    await store?.add(record);
    state.count += 1;
  } catch {
    toast('Kortet blev ikke gemt i samlingen. Der er måske ikke mere plads.');
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

$('shutter').addEventListener('click', takeCard);

/* ---------- tilting holo card ---------- */

function mountCard(host: HTMLElement, url: string, alt: string, reveal: boolean) {
  host.innerHTML = `<div class="flipper${reveal ? ' reveal' : ''}">
      <div class="face face-back card-back" aria-hidden="true"><span class="card-back-title">Fotoboksen</span></div>
      <div class="face face-front"><img src="${url}" alt="${alt}" draggable="false"><span class="foil" aria-hidden="true"></span></div>
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

function showResult(record: CardRecord) {
  if (resultUrl) URL.revokeObjectURL(resultUrl);
  resultUrl = URL.createObjectURL(record.image);
  $('result-title').textContent = `${cardNumberLabel(record.number)} er klar!`;
  $('result-power').textContent = record.power;
  mountCard($('result-card'), resultUrl, `Kort ${cardNumberLabel(record.number)}: ${record.power}`, true);
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
$('result-print').addEventListener('click', () => resultUrl && void printImage(resultUrl));

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
  $('gallery-count').textContent = `${galleryRecords.length} kort`;
  $('gallery-empty').hidden = galleryRecords.length > 0;
  $<HTMLButtonElement>('share-all').disabled = galleryRecords.length === 0;
  $('binder').innerHTML = galleryRecords
    .map(
      (r, i) => `<button class="pocket" type="button" data-index="${i}" aria-label="${cardNumberLabel(r.number)}, ${r.power}">
        <img src="${galleryUrls[i]}" alt="" loading="lazy" decoding="async"></button>`,
    )
    .join('');
}

$('binder').addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-index]');
  if (btn) openViewer(Number(btn.dataset.index));
});

$('gallery-back').addEventListener('click', () => show('booth'));
$('gallery-first').addEventListener('click', () => show('booth'));
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
  const r = galleryRecords[i];
  mountCard($('viewer-card'), galleryUrls[i], `Kort ${cardNumberLabel(r.number)}: ${r.power}`, false);
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
$('viewer-print').addEventListener('click', () => void printImage(galleryUrls[viewerIndex]));
$('viewer-share').addEventListener('click', () => {
  const r = galleryRecords[viewerIndex];
  shareFiles([cardFile(r.image, r.number)]).catch(() => toast('Billedet kunne ikke deles.'));
});

/* ---------- start ---------- */

async function boot() {
  renderPickers();
  $('shutter-icon').innerHTML = uiIcon('camera');
  $('again').innerHTML = `${uiIcon('again')}<span>Igen!</span>`;
  $('result-print').innerHTML = `${uiIcon('print')}<span>Print</span>`;
  $('result-gallery').innerHTML = `${uiIcon('cards')}<span>Samling</span>`;
  $('gallery-back').innerHTML = `${uiIcon('back')}<span>Tilbage</span>`;
  $('share-all').innerHTML = `${uiIcon('share')}<span>Del alle</span>`;
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
    toast('Samlingen kan ikke gemmes i denne browser. Kort vises, men gemmes ikke.');
  }
  updateGalleryButton();
  await loadCardFonts();
}

const booting = boot();

$('start-btn').addEventListener('click', async () => {
  unlockSound();
  const err = $('start-error');
  err.hidden = true;
  try {
    await Promise.all([booting, startCamera(video)]);
  } catch (e) {
    err.textContent = e instanceof CameraError ? e.message : 'Noget gik galt. Genindlæs siden og prøv igen.';
    err.hidden = false;
    return;
  }
  void keepAwake();
  void navigator.storage?.persist?.();
  show('booth');
  sizePreview();
});
