'use strict';

// Laufbursche NIU Firmware Updater: statische Liste der update.json-Links je Modell und Region.
// Copyright (c) 2026 Laufbursche (https://github.com/Laufbursche42)
// Die Seite spricht mit keinem Server. Alle Einträge stehen unten in FIRMWARE, die URLs werden aus
// BASE gebaut und zeigen auf die update.json dieses Repos. Design und Mechanik (Theme, Sprache,
// Modal, Kopieren) entsprechen den übrigen Laufbursche-Seiten.

const BUILD = 'v1';

const BASE = 'https://github.com/Laufbursche42/niu-update/raw/main/';
// Die Dokumente im Fuß werden auf GitHub gerendert verlinkt, sprachabhängig wie in sf-unlock.
const DOC_BASE = 'https://github.com/Laufbursche42/niu-update/blob/main/';

const MODELS = [
  { id: 'kqi2-pro',   label: 'KQi2 Pro' },
  { id: 'kqi3-sport', label: 'KQi3 Sport' },
  { id: 'kqi3-pro',   label: 'KQi3 Pro' },
  { id: 'kqi3-max',   label: 'KQi3 Max' },
  { id: 'kqi-300x',   label: 'KQi 300X' }
];
const REGIONS = [
  { id: 'de', label: 'DE' },
  { id: 'eu', label: 'EU' },
  { id: 'us', label: 'US' }
];

// limit steht bei KQi2 und KQi3 im NIU-Dateinamen, beim 300X nicht; dort ist es aus der Firmware
// ermittelt und mit inferred gekennzeichnet. size muss byte-genau zur .bin passen, die App prüft
// nach dem Download nur die Dateigröße gegen diesen Wert.
const FIRMWARE = [
  { model: 'kqi2-pro',   region: 'de', limit: '20 km/h', version: 'K2E38J23', size: 27544 },
  { model: 'kqi2-pro',   region: 'eu', limit: '25 km/h', version: 'K2E01J23', size: 27956 },
  { model: 'kqi2-pro',   region: 'us', limit: '28 km/h', version: 'K2E13J23', size: 27956 },
  { model: 'kqi3-sport', region: 'de', limit: '20 km/h', version: 'K3E38J23', size: 27456 },
  { model: 'kqi3-sport', region: 'eu', limit: '25 km/h', version: 'K3E01J23', size: 27836 },
  { model: 'kqi3-sport', region: 'us', limit: '28 km/h', version: 'K3E13J23', size: 27828 },
  { model: 'kqi3-pro',   region: 'de', limit: '20 km/h', version: 'K3E38J23', size: 27196 },
  { model: 'kqi3-pro',   region: 'eu', limit: '25 km/h', version: 'K3E01J23', size: 27576 },
  { model: 'kqi3-pro',   region: 'us', limit: '32 km/h', version: 'K3E13J23', size: 27608 },
  { model: 'kqi3-max',   region: 'de', limit: '21 km/h', version: 'K3E38J23', size: 27412 },
  { model: 'kqi3-max',   region: 'eu', limit: '25 km/h', version: 'K3E01J23', size: 27820 },
  { model: 'kqi3-max',   region: 'us', limit: '32 km/h', version: 'K3E13J23', size: 27792 },
  { model: 'kqi-300x',   region: 'de', limit: '21 km/h', version: 'KBE38D05', size: 29696, inferred: true },
  { model: 'kqi-300x',   region: 'eu', limit: '25 km/h', version: 'KBE01D03', size: 29696, inferred: true },
  { model: 'kqi-300x',   region: 'us', limit: '32 km/h', version: 'KBE13D03', size: 29696, inferred: true }
];

const LS_THEME = 'niufw_theme', LS_MODEL = 'niufw_model', LS_REGION = 'niufw_region';

function $(id) { return document.getElementById(id); }
function urlFor(f) { return BASE + f.model + '/' + f.region + '/update.json'; }
function modelLabel(id) { const m = MODELS.find(x => x.id === id); return m ? m.label : id; }

// --------------------------- language ---------------------------

let lang = 'de';
function table() { return (window.I18N && window.I18N[lang]) || {}; }
function t(key) { const v = table()[key]; return (typeof v === 'string') ? v : ''; }

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-t]').forEach(n => {
    const v = t(n.getAttribute('data-t'));
    if (/[<&]/.test(v)) n.innerHTML = v; else n.textContent = v;   // scan-ok: our own translation table
  });
  { const el = $('langs'); if (el) el.setAttribute('aria-label', t('langGroup')); }
  document.querySelectorAll('#langs button').forEach(b => { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  { const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    const el = $('btn-theme');
    if (el) { el.setAttribute('aria-label', t(dark ? 'themeToLight' : 'themeToDark')); el.title = el.getAttribute('aria-label'); } }
  { const el = $('build-ver'); if (el) el.textContent = t('buildLabel') + ' ' + BUILD; }
  { const de = (lang === 'de');
    const p = $('link-privacy'); if (p) p.href = DOC_BASE + (de ? 'PRIVACY.de.md' : 'PRIVACY.md');
    const m = $('link-trademarks'); if (m) m.href = DOC_BASE + (de ? 'TRADEMARKS.de.md' : 'TRADEMARKS.md'); }
  // Chips und Ergebnisliste tragen übersetzte Beschriftungen, also neu aufbauen.
  buildChips();
  render();
}
function initLangSwitch() {
  document.querySelectorAll('#langs button').forEach(b => {
    b.addEventListener('click', () => { lang = b.dataset.lang; applyLang(); });
  });
}

// --------------------------- theme ---------------------------

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const b = $('btn-theme');
  if (b) {
    b.innerHTML = dark ? '&#9728;' : '&#9790;';   // scan-ok: a fixed character, not user input
    b.setAttribute('aria-label', t(dark ? 'themeToLight' : 'themeToDark'));
    b.title = b.getAttribute('aria-label');
  }
  try { localStorage.setItem(LS_THEME, dark ? 'dark' : 'light'); } catch (e) {}
}
function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem(LS_THEME); } catch (e) {}
  applyTheme(saved !== 'light');
  const b = $('btn-theme');
  if (b) b.addEventListener('click', () => { applyTheme(document.documentElement.getAttribute('data-theme') === 'light'); });
}

// --------------------------- copy ---------------------------

function copyFallback(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.className = 'copy-offscreen';
    document.body.appendChild(ta);
    ta.select(); ta.setSelectionRange(0, text.length);
    const ok = document.execCommand && document.execCommand('copy');
    document.body.removeChild(ta);
    return !!ok;
  } catch (e) { return false; }
}
async function copyText(text, btn) {
  let ok = false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); ok = true; }
  } catch (e) { ok = false; }
  if (!ok) ok = copyFallback(text);
  if (!btn) return;
  const cls = ok ? 'copied' : 'failed';
  btn.classList.add(cls);
  btn.textContent = t(ok ? 'copied' : 'copyFail');
  window.setTimeout(() => { btn.classList.remove(cls); btn.textContent = t('btnCopy'); }, 1800);
}

// --------------------------- filter ---------------------------

let fModel = 'all', fRegion = 'all';

function chip(label, pressed, onClick) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.setAttribute('aria-pressed', String(!!pressed));
  b.addEventListener('click', onClick);
  return b;
}
function buildChips() {
  const mHost = $('chips-model'), rHost = $('chips-region');
  if (!mHost || !rHost) return;
  mHost.textContent = '';
  rHost.textContent = '';
  mHost.appendChild(chip(t('allModels'), fModel === 'all', () => { fModel = 'all'; persistFilter(); buildChips(); render(); }));
  MODELS.forEach(m => mHost.appendChild(chip(m.label, fModel === m.id, () => { fModel = m.id; persistFilter(); buildChips(); render(); })));
  rHost.appendChild(chip(t('allRegions'), fRegion === 'all', () => { fRegion = 'all'; persistFilter(); buildChips(); render(); }));
  REGIONS.forEach(r => rHost.appendChild(chip(r.label, fRegion === r.id, () => { fRegion = r.id; persistFilter(); buildChips(); render(); })));
  { const el = $('chips-model'); if (el) el.setAttribute('aria-label', t('filterTitle')); }
}
function persistFilter() {
  try { localStorage.setItem(LS_MODEL, fModel); localStorage.setItem(LS_REGION, fRegion); } catch (e) {}
}

// --------------------------- results ---------------------------

function entryNode(f) {
  const box = document.createElement('div');
  box.className = 'entry';

  const head = document.createElement('div');
  head.className = 'entry-head';
  const title = document.createElement('span');
  title.className = 'entry-title';
  title.textContent = modelLabel(f.model);
  const region = document.createElement('span');
  region.className = 'entry-region';
  region.textContent = f.region.toUpperCase();
  head.appendChild(title);
  head.appendChild(region);

  const meta = document.createElement('p');
  meta.className = 'entry-meta';
  meta.textContent = f.limit + (f.inferred ? ' *' : '') + '  |  ' + f.version + '  |  ' + f.size + ' ' + t('unitBytes');

  const url = urlFor(f);
  const pre = document.createElement('pre');
  pre.className = 'copy';
  pre.textContent = url;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';
  btn.textContent = t('btnCopy');
  btn.addEventListener('click', () => copyText(url, btn));

  box.appendChild(head);
  box.appendChild(meta);
  box.appendChild(pre);
  box.appendChild(btn);
  return box;
}

function render() {
  const host = $('results');
  if (!host) return;
  host.textContent = '';
  const list = FIRMWARE.filter(f =>
    (fModel === 'all' || f.model === fModel) && (fRegion === 'all' || f.region === fRegion));
  list.forEach(f => host.appendChild(entryNode(f)));

  const note = $('inferred-note');
  if (note) note.hidden = !list.some(f => f.inferred);
}

// --------------------------- help modal ---------------------------

const HELP = {
  app: ['helpAppTitle', 'helpApp'],
  steps: ['helpStepsTitle', 'helpSteps'],
  data: ['helpDataTitle', 'helpData'],
  disclaimer: ['disclaimerTitle', 'disclaimerText']
};
function openHelp(key) {
  const m = HELP[key]; if (!m) return;
  const dlg = $('help'); if (!dlg) return;
  const ti = $('help-title'); if (ti) ti.textContent = t(m[0]);
  const bo = $('help-body'); if (bo) bo.textContent = t(m[1]);
  if (dlg.showModal) { try { dlg.showModal(); } catch (e) { dlg.setAttribute('open', ''); } } else dlg.setAttribute('open', '');
}
function closeHelp() { const dlg = $('help'); if (!dlg) return; if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }

// --------------------------- init ---------------------------

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.help-btn').forEach(btn => btn.addEventListener('click', () => openHelp(btn.getAttribute('data-help'))));
  ['help-x', 'help-close'].forEach(id => { const b = $(id); if (b) b.addEventListener('click', closeHelp); });
  { const b = $('link-disclaimer'); if (b) b.addEventListener('click', e => { e.preventDefault(); openHelp('disclaimer'); }); }
  document.addEventListener('click', e => {
    if (!e.target.closest) return;
    const disc = e.target.closest('[data-open-disclaimer]');
    if (disc) { e.preventDefault(); openHelp('disclaimer'); }
  });

  initLangSwitch();
  initTheme();

  try {
    const m = localStorage.getItem(LS_MODEL), r = localStorage.getItem(LS_REGION);
    if (m && (m === 'all' || MODELS.some(x => x.id === m))) fModel = m;
    if (r && (r === 'all' || REGIONS.some(x => x.id === r))) fRegion = r;
  } catch (e) {}

  applyLang();
});
