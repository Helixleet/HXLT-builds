/* HXLT Player — интерактивные демо для GitHub Pages. Без сервера и зависимостей. */
(function () {
'use strict';
/* ===== 01-core.js ===== */
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (v, a = 0, b = 1) => (Number.isFinite(v) ? Math.min(b, Math.max(a, v)) : a);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const mmss = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const mmss2 = s => { s = Math.max(0, Math.round(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };

const P = {
  back: 'M19 12H5m6-6-6 6 6 6',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  disc: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  friends: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 12 0v1M16 3.5a4 4 0 0 1 0 7.5M18 14a5 5 0 0 1 4 5v2',
  cup: 'M4 8h12v5a6 6 0 0 1-12 0zM16 9h2a3 3 0 0 1 0 6h-2.5M7 3v2M11 2v3',
  home: 'M3 11 12 4l9 7v9h-6v-6H9v6H3z',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  star: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
  gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  exit: 'M10 17l5-5-5-5M15 12H3M14 3h6v18h-6',
  play: 'M7 4.5v15l13-7.5z',
  pause: 'M6.5 4h4v16h-4zM13.5 4h4v16h-4z',
  prev: 'M5 5h2.5v14H5zM20 5v14L9 12z',
  next: 'M16.5 5H19v14h-2.5zM4 5l11 7-11 7z',
  shuffle: 'M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
  repeat: 'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',
  download: 'M12 4v11m-5-5 5 5 5-5M5 20h14',
  upload: 'M12 20V9m-5 5 5-5 5 5M5 4h14',
  sparkle: 'M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8zM19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  lyrics: 'M4 6h16M4 11h16M4 16h10M4 21h6',
  queue: 'M3 6h13M3 11h13M3 16h8M16 14l5 3-5 3z',
  phone: 'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2',
  status: 'M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5',
  vol: 'M4 9h4l5-4v14l-5-4H4zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12',
  vollow: 'M4 9h4l5-4v14l-5-4H4zM16.5 8.5a5 5 0 0 1 0 7',
  mute: 'M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6',
  mini: 'M3 5h18v14H3zM12 12h6v4.5h-6z',
  min: 'M5 12h14',
  max: 'M5 5h14v14H5z',
  dots: 'M5 12h.01M12 12h.01M19 12h.01',
  dotsv: 'M12 5h.01M12 12h.01M12 19h.01',
  menu: 'M4 7h16M4 12h16M4 17h16',
  chevdown: 'M6 9l6 6 6-6',
  chevup: 'M6 15l6-6 6 6',
  chevright: 'M9 6l6 6-6 6',
  bt: 'M7 7l10 10-5 5V2l5 5L7 17',
  heart: 'M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  x: 'M6 6l12 12M18 6 6 18',
  radio: 'M4 9h16v11H4zM8 9l9-5M7 14.5a2 2 0 1 0 4 0 2 2 0 0 0-4 0M15 13h2M15 16h2',
  lib: 'M4 4v16M9 4v16M14 4.5l5.5 15',
  swap: 'M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4',
  car: 'M5 11l2-5h10l2 5M4 11h16v6H4zM7 17v2.5M17 17v2.5M7.5 14h.01M16.5 14h.01',
  pc: 'M3 4h18v12H3zM8 20h8M12 16v4',
  wifi: 'M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0M12 19.5h.01',
  thumbdown: 'M10 15v4a3 3 0 0 0 3 3l4-9V3H6.3a2 2 0 0 0-2 1.7l-1.4 9A2 2 0 0 0 4.9 16H10zM17 3h3v10h-3',
  similar: 'M3 12h3l3-7 4 14 3-7h5',
  eq: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  check: 'M5 12l5 5 9-10',
  qr: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 18h3v3h-3z',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  hand: 'M8 13V5a1.5 1.5 0 0 1 3 0v6M11 10V3.5a1.5 1.5 0 0 1 3 0V10M14 10V5a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L3 14a1.5 1.5 0 0 1 2.5-1.6L8 15'
};
const FILLED = new Set(['play', 'pause', 'prev', 'next']);
const ic = (n, c = '') => `<svg viewBox="0 0 24 24" class="ic${FILLED.has(n) ? ' f' : ''}${c ? ' ' + c : ''}" aria-hidden="true"><path d="${P[n] || ''}"/></svg>`;

const TRACKS = [
  { t: 'Night Drive', a: 'North Avenue', d: 222, h: 262 },
  { t: 'Never Gonna Give You Up', a: 'Rick Astley', d: 213, h: 352 },
  { t: 'Take On Me', a: 'a-ha', d: 228, h: 196 },
  { t: 'Bohemian Rhapsody', a: 'Queen', d: 354, h: 42 },
  { t: 'Billie Jean', a: 'Michael Jackson', d: 293, h: 28 },
  { t: 'Every Breath You Take', a: 'The Police', d: 251, h: 214 },
  { t: 'Smells Like Teen Spirit', a: 'Nirvana', d: 301, h: 186 },
  { t: 'Dancing Queen', a: 'ABBA', d: 231, h: 300 },
  { t: 'Africa', a: 'Toto', d: 295, h: 12 },
  { t: 'Glass Horizon', a: 'Velvet Static', d: 247, h: 236 },
  { t: 'Paper Satellites', a: 'Polar Echo', d: 209, h: 168 }
];
TRACKS.forEach((x, i) => { x.id = i; });
const STATIONS = [
  { t: 'Лофи-волна', a: 'Chill · Lo-fi', h: 204, radio: true },
  { t: 'Синтвейв 80-х', a: 'Retro · Synth', h: 292, radio: true },
  { t: 'Рок-классика', a: 'Rock', h: 8, radio: true },
  { t: 'Джаз-кафе', a: 'Jazz', h: 36, radio: true },
  { t: 'Дорожное', a: 'Drive', h: 172, radio: true },
  { t: 'Танцпол', a: 'Dance', h: 322, radio: true }
];
STATIONS.forEach((x, i) => { x.id = 100 + i; });

const cover = (h, label = '', cls = '') => `<span class="hx-cov${cls ? ' ' + cls : ''}" style="--h:${h}">${label ? `<em>${esc(label)}</em>` : ''}</span>`;

/* ---------- Звук: процедурный синтезатор на Web Audio ---------- */
const Sound = (() => {
  const EQF = [30, 60, 80, 120, 250, 400, 600, 1000, 2500, 4000, 6000, 8000, 10000, 12000, 16000];
  const eqVals = EQF.map(() => 0);
  let ctx = null, master, analyser, eq = [], bus = null, timer = 0, song = null, step = 0, nextT = 0, noise = null;
  let media = null, mediaNode = null, mediaEnded = null;
  let on = true, vol = 0.6;
  try { on = localStorage.getItem('hxlt-demo-sound') !== '0'; } catch (e) { /* file:// без storage */ }
  const freq = m => 440 * Math.pow(2, (m - 69) / 12);
  const rng = seed => { let a = (seed * 2654435761) >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  function init() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try { ctx = new AC(); } catch (e) { ctx = null; return false; }
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 4;
    analyser = ctx.createAnalyser(); analyser.fftSize = 128; analyser.smoothingTimeConstant = 0.78;
    master = ctx.createGain();
    eq = EQF.map((f, i) => { const b = ctx.createBiquadFilter(); b.type = 'peaking'; b.frequency.value = f; b.Q.value = 1.15; b.gain.value = eqVals[i]; return b; });
    for (let i = 0; i < eq.length - 1; i++) eq[i].connect(eq[i + 1]);
    eq[eq.length - 1].connect(comp); comp.connect(analyser); analyser.connect(master); master.connect(ctx.destination);
    const len = Math.floor(ctx.sampleRate * 0.5);
    noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    applyVol();
    return true;
  }
  function applyVol() { if (master) master.gain.setTargetAtTime(on ? vol * vol * 0.85 : 0, ctx.currentTime, 0.03); }
  function makeSong(seed) {
    const r = rng(seed + 11);
    const minor = r() < 0.55;
    const progs = minor ? [[0, 8, 3, 10], [0, 5, 8, 7], [0, 10, 8, 7]] : [[0, 7, 9, 5], [0, 5, 7, 5], [0, 9, 5, 7]];
    return { seed, minor, prog: progs[Math.floor(r() * 3)], bpm: 86 + Math.floor(r() * 30), root: 45 + Math.floor(r() * 7), arp: Array.from({ length: 8 }, () => Math.floor(r() * 4)), four: r() < 0.5, alt: r() < 0.5 };
  }
  function env(g, t, a, peak, dec) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec); }
  function osc(type, f, t, dur, peak, a, dest, detune) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = f; o.detune.value = detune || 0;
    env(g, t, a || 0.005, peak, dur); o.connect(g); g.connect(dest || bus);
    o.start(t); o.stop(t + (a || 0.005) + dur + 0.05);
  }
  function hit(t, type, f, peak, dec) {
    const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noise; fl.type = type; fl.frequency.value = f; env(g, t, 0.002, peak, dec);
    s.connect(fl); fl.connect(g); g.connect(bus); s.start(t); s.stop(t + dec + 0.05);
  }
  function kick(t) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    env(g, t, 0.004, 0.5, 0.28); o.connect(g); g.connect(bus); o.start(t); o.stop(t + 0.36);
  }
  function playStep(i, t, spb) {
    const s = song, inBar = i % 16, deg = s.prog[Math.floor(i / 16) % 4];
    const q = (s.minor ? { 0: 3, 3: 4, 5: 3, 7: 3, 8: 4, 10: 4 } : { 0: 4, 5: 4, 7: 4, 9: 3 })[deg] || 4;
    const base = s.root + deg, notes = [base, base + q, base + 7];
    if (inBar === 0) {
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1100; lp.connect(bus);
      notes.forEach(n => { osc('sawtooth', freq(n + 12), t, spb * 15, 0.026, 0.35, lp, -8); osc('sawtooth', freq(n + 12), t, spb * 15, 0.026, 0.35, lp, 8); });
    }
    if (inBar === 0 || inBar === 8 || (s.alt && (inBar === 6 || inBar === 14))) osc('triangle', freq(base - 12), t, spb * 3, 0.22, 0.01);
    if (inBar % 4 === 0 && (s.four || inBar % 8 === 0)) kick(t);
    if (inBar === 4 || inBar === 12) hit(t, 'bandpass', 1900, 0.15, 0.16);
    if (inBar % 4 === 2) hit(t, 'highpass', 7500, 0.045, 0.05);
    if (inBar % 2 === 0) { const k = s.arp[(inBar / 2) % 8]; osc('triangle', freq((k === 3 ? notes[0] + 12 : notes[k]) + 24), t, 0.28, 0.04, 0.004); }
  }
  function tick() {
    if (!bus || !song) return;
    const spb = 60 / song.bpm / 4;
    if (nextT < ctx.currentTime - 0.2) nextT = ctx.currentTime + 0.02;
    while (nextT < ctx.currentTime + 0.12) { playStep(step, nextT, spb); nextT += spb; step++; }
  }
  function stopBus() {
    clearInterval(timer);
    if (!bus) return;
    const b = bus; bus = null;
    try { b.gain.setTargetAtTime(0, ctx.currentTime, 0.03); setTimeout(() => b.disconnect(), 400); } catch (e) { /* ignore */ }
  }
  function stopMedia() { if (media) { media.pause(); } }
  return {
    EQF,
    get on() { return on; },
    get media() { return media; },
    setOn(v) {
      on = !!v;
      try { localStorage.setItem('hxlt-demo-sound', on ? '1' : '0'); } catch (e) { /* ignore */ }
      if (ctx) applyVol();
    },
    setVol(v) { vol = v; if (ctx) applyVol(); },
    play(seed, fresh) {
      if (!init()) return;
      if (ctx.state === 'suspended') ctx.resume();
      stopMedia(); stopBus();
      if (fresh || !song || song.seed !== seed) { song = makeSong(seed); step = 0; }
      bus = ctx.createGain(); bus.connect(eq[0]);
      nextT = ctx.currentTime + 0.05;
      timer = setInterval(tick, 25); tick();
    },
    playMedia(track, pos, onEnd) {
      if (!init()) return;
      if (ctx.state === 'suspended') ctx.resume();
      stopBus();
      if (!media || media.dataset.url !== track.url) {
        if (media) media.pause();
        media = new Audio(); media.dataset.url = track.url; media.src = track.url; media.preload = 'auto';
        try { mediaNode = ctx.createMediaElementSource(media); mediaNode.connect(eq[0]); } catch (e) { /* ignore */ }
        media.addEventListener('ended', () => mediaEnded && mediaEnded());
      }
      mediaEnded = onEnd;
      if (Math.abs(media.currentTime - pos) > 0.5) media.currentTime = pos;
      media.play().catch(() => {});
    },
    seekMedia(pos) { if (media) media.currentTime = pos; },
    pause() { stopBus(); stopMedia(); },
    setEq(i, db) { eqVals[i] = db; if (ctx) eq[i].gain.setTargetAtTime(db, ctx.currentTime, 0.02); },
    eqVal(i) { return eqVals[i]; },
    bands(n) {
      const out = new Array(n).fill(0);
      if (!analyser || (!bus && !(media && !media.paused))) return out;
      const a = new Uint8Array(analyser.frequencyBinCount); analyser.getByteFrequencyData(a);
      const per = Math.floor(40 / n) || 1;
      for (let k = 0; k < n; k++) { let s = 0; for (let j = 0; j < per; j++) s += a[2 + k * per + j] || 0; out[k] = s / (per * 255); }
      return out;
    }
  };
})();

/* ---------- Модель плеера (общая для всех демо) ---------- */
class Player {
  constructor(list) {
    this.list = list.slice(); this.i = 0; this.pos = 0; this.playing = false;
    this.shuffle = false; this.repeat = 0; this.vol = 0.62; this.radio = null;
    this.fns = new Set(); this._raf = 0; this._t = 0;
    this._loop = now => {
      const dt = Math.min(0.25, (now - this._t) / 1000); this._t = now;
      if (!this.playing) return;
      const tr = this.track;
      if (tr.url) { const m = Sound.media; if (m) { this.pos = m.currentTime || 0; if (m.duration && isFinite(m.duration)) tr.d = m.duration; } }
      else if (!this.radio) { this.pos += dt; if (this.pos >= this.dur) { this.ended(); return; } }
      else this.pos += dt;
      this.emit('time');
      this._raf = requestAnimationFrame(this._loop);
    };
    Sound.setVol(this.vol);
  }
  get track() { return this.radio || this.list[this.i]; }
  get dur() { return this.radio ? 0 : Math.max(1, this.track.d || 1); }
  get nextTrack() { return this.list[(this.i + 1) % this.list.length]; }
  on(f) { this.fns.add(f); }
  emit(k) { this.fns.forEach(f => { try { f(k, this); } catch (e) { console.error(e); } }); }
  idxOf(t) { return this.list.findIndex(x => x.id === t.id); }
  stepIndex(dir) {
    const n = this.list.length;
    if (this.shuffle && dir > 0 && n > 1) { let j; do { j = Math.floor(Math.random() * n); } while (j === this.i); return j; }
    return (this.i + dir + n) % n;
  }
  load(i, play = true) { this.radio = null; this.i = clamp(i, 0, this.list.length - 1); this.pos = 0; this.emit('track'); if (play) this.play(true); else { this.pause(); } }
  playTrack(t) { let k = this.idxOf(t); if (k < 0) { this.list.push(t); k = this.list.length - 1; } if (!this.radio && k === this.i) { this.toggle(); return; } this.load(k, true); }
  playStation(st) { if (this.radio === st) { this.toggle(); return; } this.radio = st; this.pos = 0; this.emit('track'); this.play(true); }
  play(fresh) {
    this.playing = true;
    const t = this.track;
    if (t.url) Sound.playMedia(t, this.pos, () => this.ended()); else Sound.play(t.id + 1, fresh);
    this._t = performance.now(); cancelAnimationFrame(this._raf); this._raf = requestAnimationFrame(this._loop);
    this.emit('state');
  }
  pause() { const was = this.playing; this.playing = false; Sound.pause(); cancelAnimationFrame(this._raf); if (was || true) this.emit('state'); }
  toggle() { if (this.playing) this.pause(); else this.play(false); }
  next() { if (this.radio) return this.station(1); this.load(this.stepIndex(1), true); }
  prev() { if (this.radio) return this.station(-1); if (this.pos > 3) { this.seek(0); return; } this.load(this.stepIndex(-1), true); }
  station(d) { const k = STATIONS.indexOf(this.radio); this.radio = STATIONS[(k + d + STATIONS.length) % STATIONS.length]; this.pos = 0; this.emit('track'); this.play(true); }
  ended() {
    if (this.repeat === 2) { this.pos = 0; if (this.track.url) Sound.seekMedia(0); this.play(false); return; }
    if (this.repeat === 0 && !this.shuffle && this.i === this.list.length - 1) { this.load(0, false); return; }
    this.next();
  }
  seek(s) { if (this.radio) return; this.pos = clamp(s, 0, this.dur - 0.25); if (this.track.url) Sound.seekMedia(this.pos); this.emit('time'); }
  setVol(v) { this.vol = clamp(v); Sound.setVol(this.vol); this.emit('vol'); }
  cycleRepeat() { this.repeat = (this.repeat + 1) % 3; this.emit('state'); }
  toggleShuffle() { this.shuffle = !this.shuffle; this.emit('state'); }
  destroy() { this.playing = false; Sound.pause(); cancelAnimationFrame(this._raf); this.fns.clear(); }
}

/* ---------- Общие помощники UI ---------- */
function bindSlider(el, opt) {
  const vertical = !!opt.vertical;
  el.setAttribute('role', 'slider'); el.tabIndex = 0;
  const at = ev => { const r = el.getBoundingClientRect(); return clamp(vertical ? 1 - (ev.clientY - r.top) / r.height : (ev.clientX - r.left) / r.width); };
  el.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    e.preventDefault(); e.stopPropagation();
    try { el.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
    el.classList.add('drag'); opt.onInput(at(e));
    const mv = ev => opt.onInput(at(ev));
    const up = () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); el.classList.remove('drag'); if (opt.onCommit) opt.onCommit(); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
  el.addEventListener('keydown', e => {
    const k = e.key; const cur = opt.get ? opt.get() : 0; let d = 0;
    if (k === 'ArrowRight' || k === 'ArrowUp') d = 0.05; else if (k === 'ArrowLeft' || k === 'ArrowDown') d = -0.05; else return;
    e.preventDefault(); e.stopPropagation(); opt.onInput(clamp(cur + d)); if (opt.onCommit) opt.onCommit();
  });
}
const setV = (el, v) => { if (el) { el.style.setProperty('--v', clamp(v).toFixed(4)); el.setAttribute('aria-valuenow', Math.round(clamp(v) * 100)); } };

function makeToast(stage) {
  const el = document.createElement('div'); el.className = 'hx-toast'; el.setAttribute('role', 'status'); stage.appendChild(el);
  let t = 0;
  return msg => { el.textContent = msg; el.classList.add('show'); clearTimeout(t); t = setTimeout(() => el.classList.remove('show'), 2200); };
}

function makeMenu(stage, api) {
  const el = document.createElement('div'); el.className = 'hx-menu'; el.hidden = true; el.setAttribute('role', 'menu'); stage.appendChild(el);
  let acts = [];
  const close = () => { el.hidden = true; };
  el.addEventListener('click', e => { const b = e.target.closest('[data-mi]'); if (!b) return; e.stopPropagation(); const f = acts[+b.dataset.mi]; close(); if (f) f(); });
  stage.addEventListener('pointerdown', e => { if (!el.hidden && !el.contains(e.target)) close(); }, true);
  return {
    close,
    get open() { return !el.hidden; },
    show(ev, items) {
      acts = items.map(x => x.f);
      el.innerHTML = items.map((x, i) => `<button role="menuitem" data-mi="${i}">${ic(x.i)}<span>${esc(x.t)}</span></button>`).join('');
      el.hidden = false;
      const s = api.scale(), sr = stage.getBoundingClientRect();
      let x = (ev.clientX - sr.left) / s, y = (ev.clientY - sr.top) / s;
      const w = el.offsetWidth, h = el.offsetHeight;
      x = Math.min(x, stage.offsetWidth - w - 8); y = Math.min(y, stage.offsetHeight - h - 8);
      el.style.left = Math.max(8, x) + 'px'; el.style.top = Math.max(8, y) + 'px';
      const first = el.querySelector('button'); if (first) first.focus({ preventScroll: true });
    }
  };
}

const DEMOS = {};

/* ===== 02-shell.js ===== */
/* ---------- Окно демо: запуск, масштаб, панель возможностей, закрытие ---------- */
let current = null;
let lastPtr = { x: -1, y: -1 };
document.addEventListener('pointermove', e => { lastPtr = { x: e.clientX, y: e.clientY }; }, { passive: true });

const srcRect = src => { const img = src.querySelector('img'); const r = (img || src).getBoundingClientRect(); return r.width > 4 && r.height > 4 ? r : null; };

const splashHTML = kind => `<div class="sp sp-${kind}"><div class="sp-circle"><i></i><i></i><i></i><span class="sp-eq"><b></b><b></b><b></b><b></b><b></b></span></div><div class="sp-brand"><b>HELI<em>X</em>LEET</b><small>${kind === 'pc' ? '— VK PLAYER —' : kind === 'modern' ? 'HXLT PLAYER MODERN' : 'HXLT PLAYER'}</small></div></div>`;

function focusables(root) { return $$('button:not([disabled]),input:not([disabled]),[tabindex="0"],a[href]', root).filter(el => el.offsetParent !== null || el === document.activeElement); }

function openDemo(kind, src) {
  const def = DEMOS[kind];
  if (!def || current) return;
  const root = document.createElement('div');
  root.className = 'hx-demo is-opening';
  root.dataset.kind = kind;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', def.title + ' — интерактивное демо');
  const img = src.querySelector('img');
  root.innerHTML = `<div class="hx-backdrop" data-close></div>
  <div class="hx-shell">
    <div class="hx-stagewrap">
      <div class="hx-stage" style="width:${def.w}px;height:${def.h}px"></div>
      <div class="hx-badges" aria-hidden="true"></div>
      <div class="hx-splash" aria-hidden="true">${splashHTML(kind)}</div>
      ${img ? `<img class="hx-ghost" alt="" src="${esc(img.getAttribute('src'))}">` : ''}
    </div>
    <aside class="hx-feat" aria-label="Возможности">
      <header class="hx-fh">
        <div><span class="hx-kick">${esc(def.kicker)}</span><h2>${esc(def.title)}</h2><p>${esc(def.sub)}</p></div>
        <button class="hx-x" type="button" data-close aria-label="Закрыть демо" title="Закрыть (Esc)">${ic('x')}</button>
      </header>
      <ol class="hx-fl">${def.features.map((f, i) => `<li tabindex="0" data-f="${i}"><b>${i + 1}</b><div><strong>${esc(f.t)}</strong><span>${esc(f.d)}</span></div></li>`).join('')}</ol>
      <footer class="hx-ff">
        <div class="hx-sws">
          <label class="hx-sw"><input type="checkbox" data-sound ${Sound.on ? 'checked' : ''}><span></span>Звук демо</label>
          <label class="hx-sw"><input type="checkbox" data-badges checked><span></span>Номера на экране</label>
        </div>
        <p class="hx-note">Музыка синтезируется прямо в браузере, обложки и тексты — демонстрационные.</p>
        <button class="hx-cta" type="button" data-cta>${ic('download')}<span>${esc(def.cta)}</span></button>
      </footer>
    </aside>
  </div>
  <button class="hx-xf" type="button" data-close aria-label="Закрыть демо">${ic('x')}</button>
  <button class="hx-featbtn" type="button" aria-expanded="false">${ic('star')}<span>Возможности</span></button>`;
  document.body.appendChild(root);
  document.documentElement.classList.add('hx-lock');
  const wrap = $('.hx-stagewrap', root), stage = $('.hx-stage', root), feat = $('.hx-feat', root);
  const badges = $('.hx-badges', root), splash = $('.hx-splash', root), ghost = $('.hx-ghost', root);
  let scale = 1, spotTimer = 0, badgeRaf = 0, badgesOn = true, pinned = -1;
  const api = {
    root, stage,
    scale: () => scale,
    close: () => closeDemo(),
    refresh: () => { cancelAnimationFrame(badgeRaf); badgeRaf = requestAnimationFrame(placeBadges); },
    fullscreen: () => {
      try {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (root.requestFullscreen) root.requestFullscreen();
      } catch (e) { /* ignore */ }
    }
  };
  stage.classList.add('st-' + kind);
  const inst = def.build(stage, api) || {};

  function layout() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const narrow = vw < def.w * 0.5 + def.featW + 120 || vw < 760;
    root.classList.toggle('is-narrow', narrow);
    const pad = narrow ? 10 : 28;
    let s = narrow ? Math.min(1, (vw - pad * 2) / def.w, (vh - pad * 2 - 58) / def.h)
      : Math.min(1, (vw - def.featW - pad * 3) / def.w, (vh - pad * 2) / def.h);
    s = Math.max(0.3, s);
    scale = s;
    wrap.style.width = Math.round(def.w * s) + 'px';
    wrap.style.height = Math.round(def.h * s) + 'px';
    wrap.style.setProperty('--s', s);
    stage.style.transform = `scale(${s})`;
    feat.style.height = narrow ? '' : Math.round(def.h * s) + 'px';
    api.refresh();
  }
  function spotEls(i) { const f = def.features[i]; if (!f) return []; return f.spot.split(' ').flatMap(n => $$(`[data-spot~="${n}"]`, stage)); }
  function spot(i) {
    $$('.hx-spot', stage).forEach(e => e.classList.remove('hx-spot'));
    $$('.hx-badge.on', badges).forEach(e => e.classList.remove('on'));
    if (i < 0) return;
    spotEls(i).forEach(e => e.classList.add('hx-spot'));
    const b = $(`.hx-badge[data-b="${i}"]`, badges); if (b) b.classList.add('on');
  }
  // Элемент действительно виден, а не перекрыт плеером, шторкой или настройками
  function visibleOnTop(el, r) {
    const pts = [[.5, .5], [.2, .25], [.8, .25], [.2, .75], [.8, .75], [.5, .1], [.5, .9]];
    for (const [fx, fy] of pts) {
      const x = r.left + r.width * fx, y = r.top + r.height * fy;
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
      const hit = document.elementFromPoint(x, y);
      if (hit && (el === hit || el.contains(hit) || hit.contains(el))) return true;
    }
    return false;
  }
  function placeBadges() {
    if (!badgesOn) { badges.innerHTML = ''; return; }
    const wr = wrap.getBoundingClientRect();
    const out = [];
    def.features.forEach((f, i) => {
      const el = spotEls(i).find(e => { const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2 && r.bottom > wr.top + 2 && r.top < wr.bottom - 2 && r.right > wr.left && r.left < wr.right && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[hidden],.is-off'); });
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!visibleOnTop(el, r)) return;
      const x = clamp(r.left - wr.left + (f.bx != null ? f.bx * r.width : r.width) - 2, 12, wr.width - 12);
      const y = clamp(r.top - wr.top + (f.by != null ? f.by * r.height : 2), 12, wr.height - 12);
      out.push(`<span class="hx-badge${pinned === i ? ' on' : ''}" data-b="${i}" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px">${i + 1}</span>`);
    });
    badges.innerHTML = out.join('');
  }
  const badgeInt = setInterval(() => { if (!root.classList.contains('is-opening')) placeBadges(); }, 700);

  // Панель возможностей
  const list = $('.hx-fl', feat);
  list.addEventListener('pointerover', e => { const li = e.target.closest('li'); if (li) spot(+li.dataset.f); });
  list.addEventListener('pointerleave', () => spot(pinned));
  list.addEventListener('focusin', e => { const li = e.target.closest('li'); if (li) spot(+li.dataset.f); });
  const runFeat = li => {
    const i = +li.dataset.f, f = def.features[i];
    $$('li.on', list).forEach(x => x.classList.remove('on'));
    li.classList.add('on'); pinned = i;
    if (f.act && inst.act) inst.act(f.act);
    clearTimeout(spotTimer);
    spotTimer = setTimeout(() => { spot(i); placeBadges(); }, 380);
    if (root.classList.contains('is-narrow')) setFeat(false);
  };
  list.addEventListener('click', e => { const li = e.target.closest('li'); if (li) runFeat(li); });
  list.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('li')) { e.preventDefault(); runFeat(e.target.closest('li')); } });
  $('[data-sound]', feat).addEventListener('change', e => Sound.setOn(e.target.checked));
  $('[data-badges]', feat).addEventListener('change', e => { badgesOn = e.target.checked; placeBadges(); });
  $('[data-cta]', feat).addEventListener('click', () => { const want = def.ctaAct; closeDemo(() => openDownloads(want)); });
  const featBtn = $('.hx-featbtn', root);
  const setFeat = v => { root.classList.toggle('feat-open', v); featBtn.setAttribute('aria-expanded', String(v)); };
  featBtn.addEventListener('click', () => setFeat(!root.classList.contains('feat-open')));
  root.addEventListener('click', e => { if (e.target.closest('[data-close]')) { e.preventDefault(); closeDemo(); } });

  const onKey = e => {
    if (!current || current.root !== root) return;
    if (e.key === 'Escape') {
      if (inst.onEscape && inst.onEscape()) { e.preventDefault(); return; }
      e.preventDefault(); closeDemo(); return;
    }
    if (e.key === 'Tab') {
      const f = focusables(root); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      return;
    }
    if (inst.onKey) inst.onKey(e);
  };
  document.addEventListener('keydown', onKey, true);
  const onResize = () => layout();
  window.addEventListener('resize', onResize);

  current = { root, src, inst, def, wrap, feat, ghost, onKey, onResize, badgeInt, closing: false };
  src.classList.add('is-launched');
  layout();

  const r0 = srcRect(src), r1 = wrap.getBoundingClientRect();
  const animate = !REDUCE.matches && r0 && wrap.animate;
  const finish = () => {
    root.classList.remove('is-opening');
    if (ghost) ghost.style.opacity = '0';
    splash.classList.add('out');
    setTimeout(() => { splash.remove(); stage.classList.add('is-ready'); api.refresh(); if (inst.ready) inst.ready(); }, animate ? 520 : 0);
  };
  if (animate) {
    const sx = r0.width / r1.width, sy = r0.height / r1.height, dx = r0.left - r1.left, dy = r0.top - r1.top;
    wrap.animate([{ transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})`, opacity: 1 }, { transform: 'none', opacity: 1 }], { duration: 640, easing: 'cubic-bezier(.2,.85,.25,1)' });
    if (ghost) ghost.animate([{ opacity: 1 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 640, fill: 'forwards' });
    feat.animate([{ opacity: 0, transform: 'translateX(48px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 300, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    $('.hx-backdrop', root).animate([{ opacity: 0 }, { opacity: 1 }], { duration: 460 });
    setTimeout(finish, 1450);
  } else {
    if (ghost) ghost.remove();
    finish();
  }
  const xBtn = root.classList.contains('is-narrow') ? $('.hx-xf', root) : $('.hx-x', root);
  setTimeout(() => xBtn && xBtn.focus({ preventScroll: true }), 60);
}

function closeDemo(after) {
  if (!current || current.closing) return;
  const c = current; c.closing = true;
  const { root, src, inst, wrap, feat } = c;
  try { if (inst.destroy) inst.destroy(); } catch (e) { console.error(e); }
  Sound.pause();
  clearInterval(c.badgeInt);
  document.removeEventListener('keydown', c.onKey, true);
  window.removeEventListener('resize', c.onResize);
  if (document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) { /* ignore */ } }
  const done = () => {
    root.remove();
    document.documentElement.classList.remove('hx-lock');
    src.classList.remove('is-launched');
    const under = lastPtr.x >= 0 ? document.elementFromPoint(lastPtr.x, lastPtr.y) : null;
    if (under && under.closest('[data-demo]') === src) src.dataset.cool = '1';
    current = null;
    if (typeof after === 'function') after(); else src.focus({ preventScroll: true });
  };
  const r0 = srcRect(src);
  if (REDUCE.matches || !r0 || !wrap.animate) { done(); return; }
  root.classList.add('is-closing');
  const r1 = wrap.getBoundingClientRect();
  const sx = r0.width / r1.width, sy = r0.height / r1.height, dx = r0.left - r1.left, dy = r0.top - r1.top;
  let ghost = c.ghost;
  if (!ghost || !ghost.isConnected) {
    const img = src.querySelector('img');
    if (img) { ghost = document.createElement('img'); ghost.className = 'hx-ghost'; ghost.alt = ''; ghost.src = img.getAttribute('src'); wrap.appendChild(ghost); }
  }
  if (ghost) { ghost.style.opacity = ''; ghost.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, delay: 60, fill: 'forwards' }); }
  wrap.animate([{ transform: 'none' }, { transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})` }], { duration: 440, easing: 'cubic-bezier(.55,0,.7,.2)', fill: 'forwards' });
  feat.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(40px)' }], { duration: 220, fill: 'forwards' });
  $('.hx-backdrop', root).animate([{ opacity: 1 }, { opacity: 0 }], { duration: 440, fill: 'forwards' });
  setTimeout(done, 450);
}

function openDownloads(which) {
  const btn = document.getElementById('open-download');
  if (!btn) return;
  btn.click();
  if (which === 'android') { const q = document.getElementById('show-qr'); if (q) setTimeout(() => q.click(), 30); }
}

/* ---------- Привязка к странице ---------- */
function wire() {
  $$('[data-demo]').forEach(el => {
    let t = 0;
    const arm = () => { el.classList.add('is-arming'); t = setTimeout(() => { el.classList.remove('is-arming'); openDemo(el.dataset.demo, el); }, 750); };
    const disarm = () => { clearTimeout(t); el.classList.remove('is-arming'); };
    el.addEventListener('pointerenter', e => { if (e.pointerType !== 'mouse' || el.dataset.cool || current) return; arm(); });
    el.addEventListener('pointerleave', () => { disarm(); delete el.dataset.cool; });
    el.addEventListener('click', e => { e.preventDefault(); disarm(); openDemo(el.dataset.demo, el); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); disarm(); openDemo(el.dataset.demo, el); } });
  });
  const q = new URLSearchParams(location.search).get('demo');
  if (q && DEMOS[q]) { const el = $(`[data-demo="${q}"]`); if (el) setTimeout(() => openDemo(q, el), 300); }
  window.HXLTDemo = { open: k => { const el = $(`[data-demo="${k}"]`); if (el) openDemo(k, el); }, close: () => closeDemo() };
}

/* ===== 03-pc.js ===== */
/* ---------- Демо: HXLT Player для Windows ---------- */
const LYR = ['♪', 'Здесь появляется текст песни', 'Строки загораются в такт музыке', 'Текущая строка всегда по центру', 'Нажмите на строку — плеер перемотает к ней', '♪ ♪', 'Текст можно скопировать одной кнопкой', 'Панель закрывается крестиком', 'а музыка играет дальше', '♪'];
const FRIENDS = [{ n: 'Алексей', h: 200, t: 2 }, { n: 'Мария', h: 320, t: 7 }, { n: 'Дмитрий', h: 30, t: 6 }, { n: 'Ольга', h: 262, t: 0 }, { n: 'Сергей', h: 150, t: 8 }, { n: 'Анна', h: 290, t: 3 }];
const EQ_PRE = {
  'Обычный': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'Бас': [7, 6, 5, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'Вокал': [-2, -2, -1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 0, -1, -1],
  'Рок': [4, 3, 2, 1, -1, -1, 0, 1, 2, 3, 3, 3, 3, 2, 2]
};
const eqLab = f => f >= 1000 ? (f / 1000) + 'k' : String(f);

function fakeQR(seed) {
  const n = 21, r = (() => { let a = seed; return () => { a = (a * 1103515245 + 12345) & 0x7fffffff; return a / 0x7fffffff; }; })();
  const finder = (x, y) => { const inF = (fx, fy) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7; for (const [fx, fy] of [[0, 0], [14, 0], [0, 14]]) { if (inF(fx, fy)) { const dx = x - fx, dy = y - fy; return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0; } } return -1; };
  let d = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const f = finder(x, y); if (f === 1 || (f === -1 && r() < 0.47)) d += `M${x} ${y}h1v1h-1z`; }
  return `<svg viewBox="-1 -1 23 23" class="qr" aria-hidden="true"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/><path d="${d}" fill="#0b111e"/></svg>`;
}

DEMOS.pc = {
  w: 1080, h: 660, featW: 340,
  kicker: 'Демо · Windows',
  title: 'HXLT Player для Windows',
  sub: 'Нативный плеер музыки VK на WinUI 3. Наведите на пункт — подсветим его на экране, нажмите — покажем в деле.',
  cta: 'Скачать для Windows', ctaAct: 'win',
  features: [
    { spot: 'nav', t: 'Разделы', d: 'Моя музыка, плейлисты, аудиозаписи друзей, рекомендации, главная, обзор, подписки и поиск.', bx: 0.92, by: 0.02 },
    { spot: 'actions', t: 'Действия со списком', d: 'Воспроизвести всё, скачать, загрузить свой трек (в демо можно выбрать настоящий аудиофайл) и сгенерировать плейлист.', act: 'music' },
    { spot: 'tracks', t: 'Треки', d: 'Клик — играть. Правая кнопка или «…» — в плейлист, скачать, похожие, к исполнителю.', act: 'music', bx: 0.98, by: 0.01 },
    { spot: 'controls', t: 'Управление', d: 'Перемешать, назад, пауза, вперёд и повтор — всех или одного трека.' },
    { spot: 'seek', t: 'Перемотка и «Далее»', d: 'Клик или перетаскивание по полосе. Следующий трек виден заранее под названием.' },
    { spot: 'cover', t: 'Меню трека', d: 'Нажмите на обложку в плеере: добавить к себе, скачать, похожие, «Не нравится».' },
    { spot: 'lyrics', t: 'Текст песни', d: 'Синхронный текст: строка подсвечивается в такт, клик по строке — перемотка, есть копирование.', act: 'lyrics' },
    { spot: 'queue', t: 'Очередь', d: 'Список воспроизведения справа — можно сразу переключить трек.', act: 'queue' },
    { spot: 'status', t: 'Статус ВК', d: 'Транслирует текущий трек в статус ВКонтакте.' },
    { spot: 'phone', t: 'Управление с телефона', d: 'Пульт по Wi-Fi через Android-приложение: поиск ПК в сети, отпечаток сертификата и PIN на 2 минуты.', act: 'phone' },
    { spot: 'volume', t: 'Громкость', d: 'Колёсико мыши над плеером меняет громкость, шаг настраивается. Уровень запоминается.' },
    { spot: 'mini', t: 'Мини-плеер', d: 'Компактное окно с обложкой и управлением — когда нужен только плеер.', act: 'mini' },
    { spot: 'settings', t: 'Параметры и эквалайзер', d: '15 полос от 30 Гц до 16 кГц, кроссфейд, горячие клавиши, трей, автозапуск, Discord.', act: 'settings' }
  ],
  build(stage, api) {
    const pl = new Player([1, 2, 3, 4, 5, 6, 7, 8, 0, 9, 10].map(i => TRACKS[i]));
    const toast = makeToast(stage);
    const menu = makeMenu(stage, api);
    const S = { cross: true, cf: 0.5, wheel: 0.2, auto: false, tray: true, discord: false, dl: true };
    const playlists = [{ n: 'Любимое', h: 330, c: 48 }, { n: 'В дорогу', h: 170, c: 32 }, { n: 'Для работы', h: 214, c: 57 }, { n: 'Вечерний синти', h: 268, c: 24 }, { n: 'Тренировка', h: 12, c: 40 }, { n: 'Ретро 80-х', h: 300, c: 64 }];
    const downloads = [], urls = [];
    let view = 'music', hist = [], side = null, statusOn = false, preMute = 0.62, phoneOn = false, pin = '', pinLeft = 0, pinTimer = 0, query = '', lyrK = -1, uploads = 0;
    const NAV = [['music', 'music', 'Моя музыка'], ['playlists', 'disc', 'Плейлисты'], ['friends', 'friends', 'Аудиозаписи друзей'], ['recs', 'cup', 'Рекомендации'], null, ['home', 'home', 'Главная'], ['overview', 'grid', 'Обзор'], ['subs', 'star', 'Подписки'], ['search', 'search', 'Поиск']];
    stage.innerHTML = `
    <div class="pc-win-wrap">
    <div class="pc-title">
      <div class="pc-brand"><b>HELI<em>X</em>LEET</b><small>— VK PLAYER —</small></div>
      <div class="pc-drag"></div>
      <div class="pc-tools">
        <button data-a="refresh" title="Обновить">${ic('refresh')}</button>
        <button data-a="downloads" data-spot="downloads" title="Загрузки">${ic('download')}<span class="pc-dot" hidden></span></button>
        <button data-a="account" title="Аккаунт">${ic('user')}</button>
      </div>
      <div class="pc-wbtn">
        <button data-a="mini" title="Свернуть в мини-плеер">${ic('min')}</button>
        <button data-a="max" title="На весь экран">${ic('max')}</button>
        <button class="pc-close" data-close title="Закрыть демо" aria-label="Закрыть демо">${ic('x')}</button>
      </div>
    </div>
    <div class="pc-body">
      <nav class="pc-nav" data-spot="nav" aria-label="Разделы">
        <button class="pc-back" data-a="back" title="Назад" aria-label="Назад">${ic('back')}</button>
        ${NAV.map(n => n ? `<button class="pn-item" data-v="${n[0]}">${ic(n[1])}<span>${n[2]}</span></button>` : '<hr>').join('')}
        <div class="pc-navfoot">
          <button class="pn-item" data-v="settings" data-spot="settings">${ic('gear')}<span>Параметры</span></button>
          <button class="pn-item" data-close>${ic('exit')}<span>Закрыть плеер</span></button>
        </div>
      </nav>
      <main class="pc-main"></main>
      <aside class="pc-side" aria-label="Панель"><div class="pc-side-in"></div></aside>
    </div>
    <div class="pc-player" data-spot="player">
      <div class="pp-left">
        <button class="pp-cov" data-a="flyout" data-spot="cover" title="Меню трека" aria-label="Меню трека"></button>
        <div class="pp-meta"><b class="pp-t"></b><span class="pp-a"></span><small class="pp-next" data-spot="seek"></small></div>
      </div>
      <div class="pp-center">
        <div class="pp-ctrl" data-spot="controls">
          <button data-a="shuffle" class="pp-tg" title="Перемешать">${ic('shuffle')}</button>
          <button data-a="prev" title="Предыдущий трек">${ic('prev')}</button>
          <button data-a="toggle" class="pp-play" title="Воспроизвести">${ic('play')}</button>
          <button data-a="next" title="Следующий трек">${ic('next')}</button>
          <button data-a="repeat" class="pp-tg pp-rep" title="Повтор">${ic('repeat')}<i>1</i></button>
        </div>
        <div class="pp-seek" data-spot="seek"><span class="pp-cur">00:00</span><div class="sl pp-sl" aria-label="Позиция трека"><i></i></div><span class="pp-dur">00:00</span></div>
      </div>
      <div class="pp-right">
        <button data-a="status" class="pp-tg" data-spot="status" title="Транслировать в статус ВК">${ic('status')}</button>
        <button data-a="lyrics" class="pp-tg" data-spot="lyrics" title="Открыть текст песни">${ic('lyrics')}</button>
        <button data-a="queue" class="pp-tg" data-spot="queue" title="Показать очередь">${ic('queue')}</button>
        <button data-a="phone" class="pp-tg" data-spot="phone" title="Управление с телефона">${ic('phone')}</button>
        <div class="pp-vol" data-spot="volume"><button data-a="mute" class="pp-volic" title="Громкость">${ic('vol')}</button><div class="sl pp-vsl" aria-label="Громкость"><i></i></div><span class="pp-vpct">62</span></div>
        <button data-a="mini" data-spot="mini" title="Минимизировать">${ic('mini')}</button>
      </div>
    </div>
    </div>
    <div class="pc-minibox" aria-hidden="true">
      <div class="mb-cov"></div>
      <div class="mb-meta"><b></b><small></small></div>
      <div class="mb-ctrl"><button data-a="prev" title="Назад">${ic('prev')}</button><button data-a="toggle" class="pp-play" title="Воспроизвести">${ic('play')}</button><button data-a="next" title="Вперёд">${ic('next')}</button></div>
      <div class="mb-bar"><i></i></div>
      <button class="mb-exp" data-a="unmini" title="Развернуть" aria-label="Развернуть">${ic('max')}</button>
    </div>
    <input type="file" accept="audio/*" class="pc-file" hidden>`;

    const E = {
      main: $('.pc-main', stage), sideIn: $('.pc-side-in', stage), cov: $('.pp-cov', stage), t: $('.pp-t', stage), a: $('.pp-a', stage),
      nx: $('.pp-next', stage), cur: $('.pp-cur', stage), dur: $('.pp-dur', stage), sl: $('.pp-sl', stage), vsl: $('.pp-vsl', stage),
      vpct: $('.pp-vpct', stage), volic: $('.pp-volic', stage), mb: $('.pc-minibox', stage), mbBar: $('.mb-bar', stage), dot: $('.pc-dot', stage), file: $('.pc-file', stage)
    };
    const findT = id => pl.list.find(x => x.id === id) || TRACKS[id];
    const row = t => `<div class="pt-row${t.id === pl.track.id ? ' cur' : ''}" data-id="${t.id}" role="button" tabindex="0" aria-label="${esc(t.t + ' — ' + t.a)}"><span class="pt-cov">${cover(t.h)}<span class="pt-eq"><i></i><i></i><i></i><i></i></span></span><span class="pt-meta"><b>${esc(t.t)}</b><small>${esc(t.a)}</small></span><button class="pt-more" data-a="more" title="Действия с треком" aria-label="Действия с треком">${ic('dots')}</button><span class="pt-dur">${t.d ? mmss2(t.d) : '--:--'}</span></div>`;
    const tl = arr => `<div class="pt-list" data-spot="tracks">${arr.map(row).join('')}</div>`;
    const head = (title, acts = '') => `<div class="pv-head"><h1>${title}</h1>${acts}</div>`;
    const tgl = (k, title, sub) => `<label class="pc-srow"><div><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</div><span class="pc-tgl"><input type="checkbox" data-set="${k}" ${S[k] ? 'checked' : ''}><i></i></span></label>`;
    const card = (h, title, subt, attr) => `<button class="pc-card" ${attr}>${cover(h, '', 'sq')}<b>${esc(title)}</b><small>${esc(subt)}</small></button>`;
    const V = {
      music: () => head('Иван Иванов', `<div class="pv-acts" data-spot="actions"><button data-a="playall" class="pri">${ic('play')}Воспроизвести</button><button data-a="dlall">${ic('download')}Скачать</button><button data-a="upload">${ic('upload')}Загрузить свою</button><button data-a="gen">${ic('sparkle')}Сгенерировать плейлист</button></div>`) + tl(pl.list),
      playlists: () => head('Плейлисты', `<div class="pv-acts"><button data-a="create">${ic('plus')}Создать плейлист</button></div>`) + `<div class="pc-grid">${playlists.map((p, k) => card(p.h, p.n, p.c + ' треков', `data-pl="${k}"`)).join('')}</div>`,
      friends: () => head('Аудиозаписи друзей') + `<div class="pc-grid fr">${FRIENDS.map((f, k) => `<button class="pc-person" data-fr="${k}"><span class="av" style="--h:${f.h}">${f.n[0]}</span><b>${f.n}</b><small>Слушает: ${esc(TRACKS[f.t].t)}</small></button>`).join('')}</div>`,
      recs: () => head('Рекомендации') + `<div class="pc-mixes">${[['Микс дня', 262, 'Собран по вашим трекам'], ['Открытия', 196, 'Новое для вас'], ['Похожее на Africa', 12, 'По одному треку']].map((m, k) => `<button class="pc-mix" data-mix="${k}" style="--h:${m[1]}"><b>${m[0]}</b><small>${m[2]}</small><span class="pc-mixplay">${ic('play')}</span></button>`).join('')}</div><h3 class="pv-sub">Для вас</h3>` + tl([3, 9, 6, 10, 2].map(findT)),
      home: () => head('Главная') + `<div class="pc-banner"><div><small>Подборка недели</small><b>Ночной город</b><span>Синти, электроника и немного рока</span><button data-mix="0" class="pri">${ic('play')}Слушать</button></div>${cover(262, 'NIGHT DRIVE', 'big')}</div><h3 class="pv-sub">Новые альбомы</h3><div class="pc-grid sm">${[9, 10, 0, 2, 5].map(i => card(TRACKS[i].h, TRACKS[i].t, TRACKS[i].a, `data-play="${i}"`)).join('')}</div>`,
      overview: () => head('Обзор') + `<div class="pc-chips">${['Поп', 'Рок', 'Электроника', 'Хип-хоп', 'Джаз', 'Классика', 'Лоу-фай', 'Инди'].map((g, k) => `<button class="pc-chip" data-genre="${esc(g)}" style="--h:${k * 45}">${g}</button>`).join('')}</div><h3 class="pv-sub">Чарт</h3>` + tl([1, 4, 7, 8, 3].map(findT)),
      subs: () => head('Подписки') + `<div class="pc-grid ar">${TRACKS.slice(0, 10).map(t => `<button class="pc-person" data-artist="${esc(t.a)}"><span class="av" style="--h:${t.h}">${esc(t.a[0])}</span><b>${esc(t.a)}</b><small>Исполнитель</small></button>`).join('')}</div>`,
      search: () => head('Поиск') + `<label class="pc-search">${ic('search')}<input type="search" placeholder="Трек, исполнитель или альбом" value="${esc(query)}" aria-label="Поиск"></label><div class="pc-sres"></div>`,
      settings: () => head('Параметры') + `<div class="pc-set">
        <section><h4>Воспроизведение</h4>
          ${tgl('cross', 'Кроссфейд между треками', 'Плавный переход в конце трека')}
          <div class="pc-srow"><div><b>Длительность кроссфейда</b><small data-out="cf"></small></div><div class="sl pc-ssl" data-sl="cf" aria-label="Длительность кроссфейда"><i></i></div></div>
          <div class="pc-srow"><div><b>Эквалайзер</b><small>15 полос, 30 Гц — 16 кГц</small></div><button class="pc-btn" data-a="eq">${ic('eq')}Открыть</button></div>
          <div class="pc-srow"><div><b>Шаг громкости колёсиком мыши</b><small data-out="wheel"></small></div><div class="sl pc-ssl" data-sl="wheel" aria-label="Шаг громкости"><i></i></div></div>
        </section>
        <section><h4>Управление с телефона</h4>
          <div class="pc-srow"><div><b>Remote Control · Android</b><small>Пульт по Wi-Fi, порт 8765</small></div><button class="pc-btn" data-a="phone">${ic('phone')}Настроить</button></div>
        </section>
        <section><h4>Горячие клавиши</h4>
          <div class="pc-srow"><div><b>Свои сочетания клавиш</b><small>Записываются нажатием и включаются по отдельности</small></div></div>
          <div class="pc-keys"><span>В этом демо:</span><span><kbd>Пробел</kbd> пауза</span><span><kbd>←</kbd><kbd>→</kbd> перемотка</span><span><kbd>Esc</kbd> закрыть</span></div>
        </section>
        <section><h4>Система</h4>
          ${tgl('auto', 'Запускать вместе с Windows', '')}
          ${tgl('tray', 'Сворачивать в трей', 'Музыка продолжает играть')}
          ${tgl('discord', 'Показывать музыку в Discord', 'Название, исполнитель и обложка')}
          ${tgl('dl', 'Автоматически начинать загрузки', '')}
          <div class="pc-srow"><div><b>Фон окна</b><small>Эффект материала Windows 11</small></div><div class="pc-seg"><button class="on">Mica</button><button>Acrylic</button></div></div>
        </section></div>`
    };

    function afterRender() {
      if (view === 'search') {
        const inp = $('.pc-search input', E.main);
        const draw = () => {
          const q = query.trim().toLowerCase();
          const pool = TRACKS.concat(pl.list.filter(t => t.url));
          const res = q ? pool.filter(t => (t.t + ' ' + t.a).toLowerCase().includes(q)) : pool.slice(0, 6);
          $('.pc-sres', E.main).innerHTML = (q ? `<h3 class="pv-sub">Найдено: ${res.length}</h3>` : '<h3 class="pv-sub">Популярное</h3>') + (res.length ? tl(res) : '<p class="pv-empty">Ничего не нашлось. Попробуйте «Queen» или «Night».</p>');
          api.refresh();
        };
        inp.addEventListener('input', () => { query = inp.value; draw(); });
        draw();
        setTimeout(() => inp.focus({ preventScroll: true }), 30);
      }
      if (view === 'settings') {
        const outs = { cf: v => Math.round(v * 12) + ' с', wheel: v => Math.max(1, Math.round(v * 25)) + '%' };
        $$('.pc-ssl', E.main).forEach(el => {
          const k = el.dataset.sl, out = $(`[data-out="${k}"]`, E.main);
          const upd = () => { setV(el, S[k]); out.textContent = outs[k](S[k]); };
          bindSlider(el, { get: () => S[k], onInput: v => { S[k] = v; upd(); } });
          upd();
        });
      }
    }
    function go(v, push = true) {
      if (push && v !== view) hist.push(view);
      if (hist.length > 30) hist.shift();
      view = v;
      E.main.innerHTML = `<div class="pv pv-${v}">${V[v]()}</div>`;
      E.main.scrollTop = 0;
      $$('.pn-item[data-v]', stage).forEach(b => b.classList.toggle('sel', b.dataset.v === v));
      afterRender();
      api.refresh();
    }

    const SIDE = {
      queue: () => `<header><b>Очередь</b><small>${pl.list.length} треков</small><button data-a="sideclose" title="Закрыть">${ic('x')}</button></header><div class="q-list">${pl.list.map(t => `<div class="q-row${t.id === pl.track.id ? ' cur' : ''}" data-id="${t.id}" role="button" tabindex="0">${cover(t.h)}<span><b>${esc(t.t)}</b><small>${esc(t.a)}</small></span><em>${t.d ? mmss2(t.d) : '--:--'}</em></div>`).join('')}</div>`,
      lyrics: () => `<header><b>Текст песни</b><small>${esc(pl.track.t)}</small><button data-a="sideclose" title="Закрыть">${ic('x')}</button></header><div class="ly">${LYR.map((l, k) => `<p data-k="${k}">${esc(l)}</p>`).join('')}</div><footer class="side-foot"><button class="pc-btn" data-a="copylyr">${ic('copy')}Копировать</button><small>Демо-текст</small></footer>`,
      phone: () => `<header><b>Управление с телефона</b><button data-a="sideclose" title="Закрыть">${ic('x')}</button></header><div class="ph">
        <label class="pc-srow"><div><b>Разрешить управление</b><small>${phoneOn ? 'Сервер запущен · 192.168.1.5:8765' : 'Выключено'}</small></div><span class="pc-tgl"><input type="checkbox" data-phone ${phoneOn ? 'checked' : ''}><i></i></span></label>
        <div class="ph-qr${phoneOn ? '' : ' dim'}">${fakeQR(77)}<div><b>HXLT-PC</b><small>Отпечаток сертификата</small><code>7C:1E:A4:58 … D2:9B</code><small class="ph-demo">QR демонстрационный</small></div></div>
        <button class="pc-btn wide" data-a="pin" ${phoneOn ? '' : 'disabled'}>${ic('lock')}Показать PIN на 2 минуты</button>
        <div class="ph-pin"${pin ? '' : ' hidden'}><b>${pin}</b><small>Действует ещё <span class="pinleft">${mmss(pinLeft)}</span></small></div>
        <ol class="ph-steps"><li>Включите управление на ПК</li><li>В Android-приложении: Пульт ПК → «Найти ПК» или QR</li><li>Сверьте отпечаток сертификата</li><li>Введите PIN — телефон стал пультом</li></ol></div>`,
      eq: () => `<header><b>Эквалайзер</b><small>15 полос</small><button data-a="sideclose" title="Закрыть">${ic('x')}</button></header><div class="eq-pre">${Object.keys(EQ_PRE).map(n => `<button data-pre="${n}">${n}</button>`).join('')}</div><div class="eq">${Sound.EQF.map((f, k) => `<div class="eq-b"><span class="eq-db">${Sound.eqVal(k) > 0 ? '+' : ''}${Sound.eqVal(k)}</span><div class="sl v eq-sl" data-k="${k}" aria-label="${eqLab(f)} Гц"><i></i></div><small>${eqLab(f)}</small></div>`).join('')}</div><p class="side-note">±12 дБ. В демо эквалайзер реально меняет звук.</p>`,
      downloads: () => `<header><b>Загрузки</b><small>${downloads.filter(d => d.p < 1).length} активных</small><button data-a="sideclose" title="Закрыть">${ic('x')}</button></header><div class="dl-list">${downloads.length ? downloads.map((d, k) => `<div class="dl-row${d.p >= 1 ? ' done' : ''}" data-k="${k}">${cover(d.t.h)}<span><b>${esc(d.t.t)}</b><small>${d.p >= 1 ? 'Готово · MP3' : Math.round(d.p * 100) + '%'}</small><i style="--v:${d.p.toFixed(3)}"></i></span></div>`).join('') : '<p class="pv-empty">Пока пусто. Нажмите «Скачать» в «Моей музыке» или в меню трека.</p>'}</div><p class="side-note">До 3 загрузок одновременно, треки можно раскладывать по папкам плейлистов.</p>`
    };
    function renderSide() {
      stage.classList.toggle('side-open', !!side);
      $$('.pp-right .pp-tg', stage).forEach(b => { if (b.dataset.a !== 'status') b.classList.toggle('on', b.dataset.a === side); });
      if (!side) { setTimeout(() => { if (!side) E.sideIn.innerHTML = ''; }, 320); api.refresh(); return; }
      E.sideIn.innerHTML = `<div class="side side-${side}">${SIDE[side]()}</div>`;
      if (side === 'eq') $$('.eq-sl', E.sideIn).forEach(el => { const k = +el.dataset.k; const upd = () => { setV(el, (Sound.eqVal(k) + 12) / 24); const v = Sound.eqVal(k); el.parentNode.querySelector('.eq-db').textContent = (v > 0 ? '+' : '') + v; }; bindSlider(el, { vertical: true, get: () => (Sound.eqVal(k) + 12) / 24, onInput: v => { Sound.setEq(k, Math.round(v * 24 - 12)); upd(); } }); upd(); });
      if (side === 'lyrics') { lyrK = -1; updLyr(); }
      if (side === 'queue') { const c = $('.q-row.cur', E.sideIn); if (c) c.scrollIntoView({ block: 'center' }); }
      api.refresh();
    }
    const openSide = s => { side = s; renderSide(); };
    function updLyr() {
      if (side !== 'lyrics') return;
      const n = LYR.length, d = pl.dur, step = (d - 10) / n;
      const k = clamp(Math.floor((pl.pos - 4) / step), -1, n - 1);
      if (k === lyrK) return; lyrK = k;
      const box = $('.ly', E.sideIn); if (!box) return;
      $$('p', box).forEach((p, i) => { p.classList.toggle('cur', i === k); p.classList.toggle('past', i < k); });
      const p = $(`p[data-k="${Math.max(0, k)}"]`, box);
      if (p) box.scrollTo({ top: p.offsetTop - box.clientHeight / 2 + p.offsetHeight / 2, behavior: REDUCE.matches ? 'auto' : 'smooth' });
    }

    function updTrack() {
      const t = pl.track;
      E.cov.innerHTML = cover(t.h);
      E.t.textContent = t.t; E.a.textContent = t.a;
      const n = pl.nextTrack; E.nx.textContent = 'Далее: ' + n.t + ' — ' + n.a;
      $('.mb-cov', E.mb).innerHTML = cover(t.h, t.t.toUpperCase());
      $('.mb-meta b', E.mb).textContent = t.t; $('.mb-meta small', E.mb).textContent = t.a;
      $$('.pt-row, .q-row', stage).forEach(r => r.classList.toggle('cur', +r.dataset.id === t.id));
      if (side === 'lyrics') renderSide();
      updTime();
      api.refresh();
    }
    function updState() {
      stage.classList.toggle('is-playing', pl.playing);
      $$('[data-a="toggle"]', stage).forEach(b => { b.innerHTML = ic(pl.playing ? 'pause' : 'play'); b.title = pl.playing ? 'Пауза' : 'Воспроизвести'; });
      $('[data-a="shuffle"]', stage).classList.toggle('on', pl.shuffle);
      const rp = $('[data-a="repeat"]', stage);
      rp.classList.toggle('on', pl.repeat > 0); rp.classList.toggle('one', pl.repeat === 2);
      rp.title = ['Повтор выключен', 'Повтор всех', 'Повтор трека'][pl.repeat];
    }
    function updTime() {
      E.cur.textContent = mmss2(pl.pos); E.dur.textContent = pl.track.d ? mmss2(pl.dur) : '--:--';
      setV(E.sl, pl.pos / pl.dur); setV(E.mbBar, pl.pos / pl.dur);
      updLyr();
    }
    function updVol() {
      setV(E.vsl, pl.vol); E.vpct.textContent = Math.round(pl.vol * 100);
      E.volic.innerHTML = ic(pl.vol === 0 ? 'mute' : pl.vol < 0.45 ? 'vollow' : 'vol');
    }
    pl.on(k => { if (k === 'time') updTime(); else if (k === 'vol') updVol(); else { updTrack(); updState(); } });
    bindSlider(E.sl, { get: () => pl.pos / pl.dur, onInput: v => pl.seek(v * pl.dur) });
    bindSlider(E.vsl, { get: () => pl.vol, onInput: v => pl.setVol(v) });
    $('.pc-player', stage).addEventListener('wheel', e => { e.preventDefault(); pl.setVol(pl.vol + (e.deltaY < 0 ? 1 : -1) * Math.max(0.01, S.wheel * 0.25)); }, { passive: false });

    // Загрузки
    const dlTimer = setInterval(() => {
      let act = 0, changed = false;
      downloads.forEach(d => { if (d.p < 1 && act < 3) { act++; d.p = Math.min(1, d.p + 0.02 + Math.random() * 0.05); changed = true; } });
      E.dot.hidden = !downloads.some(d => d.p < 1);
      if (changed && side === 'downloads') {
        $$('.dl-row', E.sideIn).forEach(r => { const d = downloads[+r.dataset.k]; if (!d) return; r.classList.toggle('done', d.p >= 1); $('small', r).textContent = d.p >= 1 ? 'Готово · MP3' : Math.round(d.p * 100) + '%'; $('i', r).style.setProperty('--v', d.p.toFixed(3)); });
        const s = $('header small', E.sideIn); if (s) s.textContent = downloads.filter(d => d.p < 1).length + ' активных';
      }
    }, 220);
    const addDl = arr => { arr.forEach(t => { if (!downloads.some(d => d.t.id === t.id)) downloads.push({ t, p: 0 }); }); E.dot.hidden = false; toast(arr.length > 1 ? `В загрузки добавлено ${arr.length} трека — значок вверху` : `«${arr[0].t}» скачивается`); };

    function trackMenu(ev, t, anchor) {
      let e = ev;
      if ((!ev.clientX && !ev.clientY) && anchor) { const r = anchor.getBoundingClientRect(); e = { clientX: r.left, clientY: r.bottom }; }
      menu.show(e, [
        { i: 'plus', t: 'Добавить к себе', f: () => toast(`«${t.t}» добавлен в «Мою музыку»`) },
        { i: 'disc', t: 'Добавить в плейлист', f: () => toast(`«${t.t}» → плейлист «Любимое»`) },
        { i: 'download', t: 'Скачать', f: () => addDl([t]) },
        { i: 'similar', t: 'Показать похожие', f: () => go('recs') },
        { i: 'user', t: 'Перейти к исполнителю', f: () => { query = t.a; go('search'); } },
        { i: 'thumbdown', t: 'Не нравится', f: () => toast('Похожее больше не будем рекомендовать') },
        { i: 'x', t: 'Пропускать треки исполнителя', f: () => toast(`Треки ${t.a} будут пропускаться`) }
      ]);
    }
    function setMini(v) { stage.classList.toggle('is-mini', v); E.mb.setAttribute('aria-hidden', String(!v)); api.refresh(); if (v) setTimeout(() => { const b = $('.mb-ctrl .pp-play', E.mb); if (b) b.focus({ preventScroll: true }); }, 50); }
    function startPin() {
      pin = String(Math.floor(100000 + Math.random() * 900000)).replace(/(\d{3})(\d{3})/, '$1 $2'); pinLeft = 120;
      clearInterval(pinTimer);
      pinTimer = setInterval(() => { pinLeft--; const el = $('.pinleft', E.sideIn); if (el) el.textContent = mmss(pinLeft); if (pinLeft <= 0) { clearInterval(pinTimer); pin = ''; if (side === 'phone') renderSide(); } }, 1000);
      renderSide();
    }
    const ACT = {
      toggle: () => pl.toggle(), prev: () => pl.prev(), next: () => pl.next(),
      shuffle: () => { pl.toggleShuffle(); toast(pl.shuffle ? 'Перемешивание включено' : 'Перемешивание выключено'); },
      repeat: () => { pl.cycleRepeat(); toast(['Повтор выключен', 'Повтор всех треков', 'Повтор одного трека'][pl.repeat]); },
      mute: () => { if (pl.vol > 0) { preMute = pl.vol; pl.setVol(0); } else pl.setVol(preMute || 0.5); },
      status: b => { statusOn = !statusOn; b.classList.toggle('on', statusOn); toast(statusOn ? 'Текущий трек транслируется в статус ВК' : 'Трансляция в статус выключена'); },
      lyrics: () => openSide(side === 'lyrics' ? null : 'lyrics'),
      queue: () => openSide(side === 'queue' ? null : 'queue'),
      phone: () => openSide(side === 'phone' ? null : 'phone'),
      eq: () => openSide(side === 'eq' ? null : 'eq'),
      downloads: () => openSide(side === 'downloads' ? null : 'downloads'),
      sideclose: () => openSide(null),
      mini: () => setMini(true), unmini: () => setMini(false),
      max: () => api.fullscreen(),
      refresh: () => { go(view, false); toast('Обновлено'); },
      account: () => toast('Аккаунт VK: Иван Иванов'),
      back: () => { if (hist.length) go(hist.pop(), false); },
      playall: () => { pl.shuffle = false; pl.load(0, true); },
      dlall: () => addDl(pl.list.slice(0, 4)),
      upload: () => E.file.click(),
      gen: () => { playlists.unshift({ n: 'Микс по вашим трекам', h: Math.floor(Math.random() * 360), c: 25 }); toast('Плейлист «Микс по вашим трекам» создан — он в «Плейлистах»'); },
      create: () => { playlists.push({ n: 'Новый плейлист ' + (playlists.length + 1), h: Math.floor(Math.random() * 360), c: 0 }); go('playlists', false); toast('Плейлист создан'); },
      pin: () => startPin(),
      copylyr: () => { const ok = () => toast('Текст скопирован'); try { navigator.clipboard.writeText(LYR.join('\n')).then(ok, () => toast('Браузер не разрешил копирование')); } catch (e) { toast('Браузер не разрешил копирование'); } }
    };
    stage.addEventListener('click', e => {
      const a = e.target.closest('[data-a]');
      if (a) {
        if (a.dataset.a === 'more') { const r = a.closest('[data-id]'); e.stopPropagation(); trackMenu(e, findT(+r.dataset.id), a); return; }
        if (a.dataset.a === 'flyout') { trackMenu(e, pl.track, a); return; }
        if (ACT[a.dataset.a]) ACT[a.dataset.a](a, e);
        return;
      }
      const t = e.target;
      const nv = t.closest('[data-v]'); if (nv) { go(nv.dataset.v); return; }
      const r = t.closest('.pt-row, .q-row'); if (r) { pl.playTrack(findT(+r.dataset.id)); return; }
      const p = t.closest('[data-pl]'); if (p) { const x = playlists[+p.dataset.pl]; pl.shuffle = true; pl.emit('state'); pl.load(Math.floor(Math.random() * pl.list.length)); toast(`Играет плейлист «${x.n}»`); return; }
      const mx = t.closest('[data-mix]'); if (mx) { pl.load([0, 9, 8][+mx.dataset.mix] === undefined ? 0 : pl.idxOf(TRACKS[[0, 9, 8][+mx.dataset.mix]])); return; }
      const fr = t.closest('[data-fr]'); if (fr) { const f = FRIENDS[+fr.dataset.fr]; pl.playTrack(findT(f.t)); toast(`Слушаете вместе с другом: ${f.n}`); return; }
      const pp = t.closest('[data-play]'); if (pp) { pl.playTrack(findT(+pp.dataset.play)); return; }
      const ar = t.closest('[data-artist]'); if (ar) { query = ar.dataset.artist; go('search'); return; }
      const g = t.closest('[data-genre]'); if (g) { pl.load(Math.floor(Math.random() * pl.list.length)); toast(`Жанр «${g.dataset.genre}» — включили подборку`); return; }
      const lp = t.closest('.ly p'); if (lp) { const n = LYR.length, step = (pl.dur - 10) / n; pl.seek(4 + (+lp.dataset.k) * step + 0.05); if (!pl.playing) pl.play(false); return; }
      const pre = t.closest('[data-pre]'); if (pre) { EQ_PRE[pre.dataset.pre].forEach((v, k) => Sound.setEq(k, v)); renderSide(); toast(`Пресет эквалайзера: «${pre.dataset.pre}»`); return; }
      const seg = t.closest('.pc-seg button'); if (seg) { $$('button', seg.parentNode).forEach(b => b.classList.toggle('on', b === seg)); toast(`Фон окна: ${seg.textContent}`); return; }
    });
    stage.addEventListener('contextmenu', e => { const r = e.target.closest('.pt-row, .q-row'); if (r) { e.preventDefault(); trackMenu(e, findT(+r.dataset.id)); } });
    stage.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const r = e.target.closest && e.target.closest('.pt-row, .q-row');
      if (r && e.target === r) { e.preventDefault(); e.stopPropagation(); pl.playTrack(findT(+r.dataset.id)); }
    });
    stage.addEventListener('change', e => {
      const t = e.target;
      if (t.dataset.set) {
        S[t.dataset.set] = t.checked;
        const M = { cross: 'Кроссфейд', auto: 'Автозапуск', tray: 'Сворачивание в трей', discord: 'Музыка в Discord', dl: 'Автостарт загрузок' };
        toast(`${M[t.dataset.set]}: ${t.checked ? 'включено' : 'выключено'}`);
      }
      if (t.hasAttribute('data-phone')) {
        phoneOn = t.checked;
        if (!phoneOn) { pin = ''; clearInterval(pinTimer); }
        renderSide();
        toast(phoneOn ? 'Сервер управления запущен' : 'Управление с телефона выключено');
      }
    });
    E.file.addEventListener('change', () => {
      const f = E.file.files && E.file.files[0];
      if (!f) return;
      const url = URL.createObjectURL(f); urls.push(url);
      const t = { t: f.name.replace(/\.[^.]+$/, ''), a: 'Загружено с компьютера', d: 0, h: Math.floor(Math.random() * 360), id: 1000 + (uploads++), url };
      pl.list.push(t); go('music', false); pl.load(pl.list.length - 1, true);
      toast('Ваш трек добавлен в «Мою музыку» и играет');
      E.file.value = '';
    });
    pl.on(k => { if (k === 'time' && pl.track.url && pl.track.d) $$(`[data-id="${pl.track.id}"] .pt-dur, [data-id="${pl.track.id}"] em`, stage).forEach(x => { x.textContent = mmss2(pl.track.d); }); });

    go('music', false); updTrack(); updState(); updVol();

    return {
      act(n) {
        if (n !== 'mini') setMini(false);
        if (n === 'music') { if (view !== 'music') go('music'); }
        else if (n === 'settings') go('settings');
        else if (n === 'mini') setMini(true);
        else if (['lyrics', 'queue', 'phone', 'eq'].includes(n)) openSide(n);
      },
      onEscape() {
        if (menu.open) { menu.close(); return true; }
        if (stage.classList.contains('is-mini')) { setMini(false); return true; }
        return false;
      },
      onKey(e) {
        const tg = e.target;
        if (tg !== document.body && !api.root.contains(tg)) return;
        if (tg.closest && tg.closest('input,textarea,[role=slider],button,li,.pt-row,.q-row,[role=menuitem],label')) return;
        if (e.key === ' ') { e.preventDefault(); pl.toggle(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); pl.seek(pl.pos + 5); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); pl.seek(pl.pos - 5); }
      },
      destroy() { pl.destroy(); clearInterval(dlTimer); clearInterval(pinTimer); urls.forEach(u => URL.revokeObjectURL(u)); }
    };
  }
};

/* ===== 04-android-common.js ===== */
/* ---------- Общее для Android-демо ---------- */
const nowHM = () => { const d = new Date(); return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); };
const statusBar = () => `<div class="ab-status"><span class="ab-time">${nowHM()}</span><span class="ab-sys">${ic('wifi')}<i class="ab-sig"><b></b><b></b><b></b><b></b></i><i class="ab-batt"></i></span></div>`;
const brandMark = () => `<span class="brandmark"><i></i><b></b></span>`;

// Свайпы: возвращает направление и смещения; игнорирует кнопки и ползунки
function bindSwipe(el, api, h) {
  el.addEventListener('pointerdown', e => {
    if (e.button > 0 || e.target.closest('button,.sl,input,[data-nogest]')) return;
    const s = api.scale(), x0 = e.clientX, y0 = e.clientY, r = el.getBoundingClientRect();
    const side = (x0 - r.left) / r.width < 0.5 ? 'left' : 'right';
    let axis = null, moved = false;
    try { el.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
    const mv = ev => {
      const dx = (ev.clientX - x0) / s, dy = (ev.clientY - y0) / s;
      if (!axis && Math.hypot(dx, dy) > 12) { axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'; if (h.start) h.start(axis, side); }
      if (axis) { moved = true; if (h.move) h.move(axis, dx, dy, side); }
    };
    const up = ev => {
      el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
      const dx = (ev.clientX - x0) / s, dy = (ev.clientY - y0) / s;
      if (axis && h.end) h.end(axis, dx, dy, side);
      if (moved) { const stop = ce => { ce.stopPropagation(); ce.preventDefault(); }; el.addEventListener('click', stop, { capture: true, once: true }); setTimeout(() => el.removeEventListener('click', stop, true), 50); }
    };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
}
// Долгое нажатие
function bindLongPress(root, sel, fn) {
  let t = 0, fired = false;
  root.addEventListener('pointerdown', e => {
    const el = e.target.closest(sel); if (!el || e.target.closest('button')) return;
    fired = false; const x = e.clientX, y = e.clientY;
    t = setTimeout(() => { fired = true; fn(el); }, 520);
    const cancel = ev => { if (ev.type === 'pointermove' && Math.hypot(ev.clientX - x, ev.clientY - y) < 8) return; clearTimeout(t); root.removeEventListener('pointermove', cancel); root.removeEventListener('pointerup', cancel); };
    root.addEventListener('pointermove', cancel); root.addEventListener('pointerup', cancel);
  });
  root.addEventListener('click', e => { if (fired && e.target.closest(sel)) { e.stopPropagation(); e.preventDefault(); fired = false; } }, true);
  root.addEventListener('contextmenu', e => { const el = e.target.closest(sel); if (el) { e.preventDefault(); clearTimeout(t); if (!fired) fn(el); fired = false; } });
}

/* ===== 05-legacy.js ===== */
/* ---------- Демо: Android Legacy ---------- */
DEMOS.legacy = {
  w: 360, h: 760, featW: 340,
  kicker: 'Демо · Android', title: 'HXLT Player — Legacy',
  sub: 'Классическое Android-приложение: плеер, радио и пульт для ПК. Наведите на пункт — подсветим его, нажмите — покажем.',
  cta: 'Скачать APK', ctaAct: 'android',
  features: [
    { spot: 'menu', t: 'Меню', d: 'Плеер, Моя музыка, плейлисты, радио, пульт ПК и параметры.', act: 'drawer' },
    { spot: 'account', t: 'Аккаунт и плеер', d: 'Выбор, где играет музыка: на телефоне или на компьютере.', act: 'account' },
    { spot: 'cover', t: 'Обложка', d: 'Плавно сменяется и чуть уменьшается на паузе.', act: 'player', bx: 0.96, by: 0.04 },
    { spot: 'track', t: 'Трек и меню ⋮', d: 'Название и исполнитель. В меню: в плейлист, похожие, к исполнителю, «Не нравится».', act: 'actions' },
    { spot: 'seek', t: 'Перемотка', d: 'Справа — сколько осталось. На радио вместо полосы — «● LIVE».', act: 'player' },
    { spot: 'controls', t: 'Управление', d: 'Перемешать · назад · пауза · вперёд.', act: 'player' },
    { spot: 'volume', t: 'Громкость', d: 'Кнопка справа открывает вертикальный регулятор.', act: 'vol' },
    { spot: 'queue', t: 'Далее в очереди', d: 'Кнопкой или свайпом вверх по плееру. Сам экран плеера не листается.', act: 'queue' },
    { spot: 'bt', t: 'Bluetooth', d: 'Название подключённых наушников или колонки.', act: 'player' },
    { spot: 'mini', t: 'Мини-плеер', d: 'Внизу списков: нажатие открывает плеер.', act: 'library' },
    { spot: 'radio', t: 'Радио', d: 'Станции, избранное и прямой эфир.', act: 'radio' },
    { spot: 'remote', t: 'Пульт ПК', d: 'Поиск ПК в Wi-Fi, сверка PIN и отпечатка — и телефон управляет плеером на компьютере.', act: 'remote' }
  ],
  build(stage, api) {
    const pl = new Player([0, 9, 10, 2, 5, 8, 3, 7].map(i => TRACKS[i]));
    const toast = makeToast(stage);
    const S = { cross: true, cf: 0.5, cache: 0.5 };
    const fav = new Set([0, 3]);
    let scr = 'player', sheet = null, remote = 0, remoteT = 0, sheetTrack = null;
    const TOP2 = (title) => `<header class="lg-top2"><button data-a="drawer" data-spot="menu" aria-label="Меню">${ic('menu')}</button><b>${title}</b><button data-a="search" aria-label="Поиск">${ic('search')}</button></header>`;
    const NAV = [['player', 'music', 'Плеер'], ['library', 'lib', 'Моя музыка'], ['playlists', 'disc', 'Плейлисты'], ['radio', 'radio', 'Радио'], ['remote', 'pc', 'Пульт ПК'], ['settings', 'gear', 'Параметры']];
    stage.innerHTML = `<div class="lg">
      ${statusBar()}
      <div class="lg-scrs">
        <section class="lg-scr lg-player" data-scr="player">
          <header class="lg-top"><button data-a="drawer" data-spot="menu" aria-label="Меню">${ic('menu')}</button><button class="lg-acc" data-a="account" data-spot="account"><span class="lg-accl">Аккаунт VK</span>${ic('chevdown')}</button><span class="lg-sp"></span></header>
          <div class="lg-conn" hidden>${ic('pc')}<span>Управление · HXLT-PC</span></div>
          <div class="lg-art" data-spot="cover"></div>
          <div class="lg-info" data-spot="track"><div><b class="lg-t"></b><span class="lg-a"></span></div><button data-a="actions" aria-label="Действия с треком">${ic('dotsv')}</button></div>
          <div class="lg-seek" data-spot="seek"><div class="sl lg-sl" aria-label="Позиция трека"><i></i></div><div class="lg-times"><span class="cur">0:00</span><span class="rem">−0:00</span></div></div>
          <div class="lg-live" data-spot="seek" hidden><i></i>LIVE</div>
          <div class="lg-ctrl">
            <div class="lg-c4" data-spot="controls"><button data-a="shuffle" class="tg" aria-label="Перемешать">${ic('shuffle')}</button><button data-a="prev" aria-label="Назад">${ic('prev')}</button><button data-a="toggle" class="lg-play" aria-label="Воспроизвести">${ic('play')}</button><button data-a="next" aria-label="Вперёд">${ic('next')}</button></div>
            <div class="lg-volw" data-spot="volume"><button data-a="vol" class="tg" aria-label="Громкость">${ic('vol')}</button>
              <div class="lg-volpop" data-nogest><button data-a="volup" aria-label="Громче">${ic('plus')}</button><div class="sl v lg-vsl" aria-label="Громкость"><i></i></div><button data-a="voldn" aria-label="Тише">${ic('minus')}</button><small class="lg-vpct"></small></div></div>
          </div>
          <button class="lg-nextq" data-a="queue" data-spot="queue">${ic('chevup')}<span>Далее в очереди</span></button>
          <div class="lg-bt" data-spot="bt">${ic('bt')}<span>JBL Flip 6</span></div>
        </section>
        <section class="lg-scr" data-scr="library">${TOP2('Моя музыка')}<div class="lg-list"></div></section>
        <section class="lg-scr" data-scr="playlists">${TOP2('Плейлисты')}<div class="lg-grid">${[['Любимое', 330, 48], ['В дорогу', 170, 32], ['Для работы', 214, 57], ['Вечерний синти', 268, 24], ['Тренировка', 12, 40], ['Ретро 80-х', 300, 64]].map(p => `<button class="lg-card" data-pl="${esc(p[0])}">${cover(p[1], '', 'sq')}<b>${p[0]}</b><small>${p[2]} треков</small></button>`).join('')}</div></section>
        <section class="lg-scr" data-scr="radio" data-spot="radio">${TOP2('Радио')}<div class="lg-tabs"><button class="on" data-rt="all">Радиостанции</button><button data-rt="fav">Избранное</button></div><div class="lg-list lg-radio"></div></section>
        <section class="lg-scr" data-scr="remote" data-spot="remote">${TOP2('Пульт ПК')}<div class="lg-remote"></div></section>
        <section class="lg-scr" data-scr="settings">${TOP2('Параметры')}<div class="lg-set">
          <h5>Воспроизведение</h5>
          <label class="lg-srow"><span><b>Кроссфейд</b><small>Плавный переход между треками</small></span><span class="a-sw"><input type="checkbox" data-set="cross" checked><i></i></span></label>
          <div class="lg-srow col"><span><b>Длительность</b><small data-out="cf"></small></span><div class="sl a-sl" data-sl="cf" aria-label="Длительность кроссфейда"><i></i></div></div>
          <h5>Память</h5>
          <div class="lg-srow col"><span><b>Кэш треков</b><small data-out="cache"></small></span><div class="sl a-sl" data-sl="cache" aria-label="Кэш треков"><i></i></div></div>
          <button class="lg-srow btn" data-a="clearcache"><span><b>Очистить кэш</b><small>Треки и обложки</small></span>${ic('chevright')}</button>
          <h5>Приложение</h5>
          <button class="lg-srow btn" data-a="update"><span><b>Проверить обновление</b><small>Из релизов GitHub</small></span>${ic('chevright')}</button>
        </div></section>
      </div>
      <div class="lg-mini" data-spot="mini" role="button" tabindex="0" aria-label="Открыть плеер"><span class="lg-mcov"></span><span class="lg-mmeta"><b></b><small></small></span><button data-a="toggle" aria-label="Воспроизвести">${ic('play')}</button><i class="lg-mbar"></i></div>
      <div class="a-scrim"></div>
      <nav class="lg-drawer" aria-label="Меню"><div class="lg-brand">${brandMark()}<span><b>HELI<em>X</em>LEET</b><small>HXLT Player</small></span></div>${NAV.map(n => `<button class="lg-ditem" data-go="${n[0]}"${n[0] === 'radio' ? ' data-spot="radio"' : n[0] === 'remote' ? ' data-spot="remote"' : ''}>${ic(n[1])}<span>${n[2]}</span></button>`).join('')}<div class="lg-dfoot">Аккаунт VK · Иван Иванов</div></nav>
      <div class="a-sheet lg-sheet" role="dialog" aria-label="Панель"><i class="a-handle"></i><div class="a-sheet-in"></div></div>
      <i class="a-gbar"></i>
    </div>`;
    const R = $('.lg', stage);
    const E = { art: $('.lg-art', R), t: $('.lg-t', R), a: $('.lg-a', R), sl: $('.lg-sl', R), cur: $('.lg-times .cur', R), rem: $('.lg-times .rem', R), live: $('.lg-live', R), seek: $('.lg-seek', R), vsl: $('.lg-vsl', R), vpct: $('.lg-vpct', R), volw: $('.lg-volw', R), mini: $('.lg-mini', R), mbar: $('.lg-mbar', R), sheetIn: $('.a-sheet-in', R), conn: $('.lg-conn', R), accl: $('.lg-accl', R) };
    const findT = id => pl.list.find(x => x.id === id) || TRACKS[id];
    const row = t => `<div class="a-row${t.id === pl.track.id ? ' cur' : ''}" data-id="${t.id}" role="button" tabindex="0">${cover(t.h)}<span><b>${esc(t.t)}</b><small>${esc(t.a)}</small></span><button data-a="rowmenu" aria-label="Действия">${ic('dotsv')}</button></div>`;
    let radioTab = 'all';
    function drawLists() {
      $('.lg-list', R).innerHTML = pl.list.map(row).join('');
      const st = radioTab === 'fav' ? STATIONS.filter(s => fav.has(s.id - 100)) : STATIONS;
      $('.lg-radio', R).innerHTML = st.length ? st.map(s => `<div class="a-row st${pl.radio === s ? ' cur' : ''}" data-st="${s.id - 100}" role="button" tabindex="0">${cover(s.h)}<span><b>${esc(s.t)}</b><small>${esc(s.a)}</small></span><button data-a="fav" class="${fav.has(s.id - 100) ? 'on' : ''}" aria-label="В избранное">${ic('heart')}</button></div>`).join('') : '<p class="a-empty">Добавьте станции сердечком</p>';
    }
    function drawRemote() {
      const box = $('.lg-remote', R);
      const saved = remote === 4 ? `<div class="a-card">${ic('pc')}<span><b>HXLT-PC</b><small>192.168.1.5:8765 · доверенный</small></span></div>` : '<p class="a-empty">Пока нет</p>';
      const V = [
        () => `<div class="lg-rhero">${ic('pc')}<b>Управляйте плеером на ПК</b><small>Телефон и компьютер в одной сети Wi-Fi</small></div><button class="a-btn pri" data-a="findpc">${ic('search')}Найти ПК</button><div class="a-btns"><button class="a-btn" data-a="byip">${ic('link')}По IP</button><button class="a-btn" data-a="scanqr">${ic('qr')}QR с ПК</button></div>`,
        () => `<div class="lg-rhero"><span class="a-spin"></span><b>Ищем компьютеры…</b><small>На ПК должно быть включено «Управление с телефона»</small></div>`,
        () => `<h5>Найдено в сети</h5><button class="a-card btn" data-a="pair">${ic('pc')}<span><b>HXLT-PC</b><small>192.168.1.5:8765</small></span>${ic('chevright')}</button><button class="a-btn" data-a="findpc">${ic('refresh')}Искать снова</button>`,
        () => `<div class="lg-pair"><b>Сверьте PIN</b><small>Введите код, который показан на компьютере</small><div class="lg-pin">${'482913'.split('').map((d, i) => `<i style="--d:${i}">${d}</i>`).join('')}</div><p class="ok">${ic('check')}Отпечаток сертификата совпадает</p><button class="a-btn pri" data-a="link">Связать</button></div>`,
        () => `<div class="lg-rhero ok">${ic('check')}<b>Подключено к HXLT-PC</b><small>Кнопки плеера управляют компьютером</small></div><button class="a-btn pri" data-go="player">${ic('music')}К плееру</button><div class="a-btns"><button class="a-btn" data-a="session">${ic('swap')}Передать сессию</button><button class="a-btn" data-a="unlink">${ic('x')}Отключить</button></div>`
      ];
      box.innerHTML = V[remote]() + `<button class="a-row2" data-a="vkqr">${ic('qr')}<span><b>Вход на ПК через QR VK</b><small>Авторизуйте компьютер с телефона</small></span></button><h5>Сохранённые компьютеры</h5>${saved}`;
      const connected = remote === 4;
      E.conn.hidden = !connected; E.accl.textContent = connected ? 'HXLT-PC' : 'Аккаунт VK';
      api.refresh();
    }
    function go(s) {
      closeSheet(); setDrawer(false); E.volw.classList.remove('open');
      scr = s;
      $$('.lg-scr', R).forEach(x => x.classList.toggle('on', x.dataset.scr === s));
      $$('.lg-ditem', R).forEach(x => x.classList.toggle('sel', x.dataset.go === s));
      R.classList.toggle('on-player', s === 'player');
      if (s === 'remote') drawRemote();
      api.refresh();
    }
    function setDrawer(v) { R.classList.toggle('drawer-open', v); api.refresh(); }
    function openSheet(kind, t) {
      sheet = kind; sheetTrack = t || pl.track; E.volw.classList.remove('open');
      const tr = sheetTrack;
      if (kind === 'queue') {
        const rest = pl.list.filter(x => x.id !== pl.track.id);
        E.sheetIn.innerHTML = `<h4>Очередь</h4><h5>Сейчас играет</h5>${row(pl.track)}<h5>Далее</h5><div class="a-sheet-list">${rest.map(row).join('')}</div>`;
      } else if (kind === 'actions') {
        E.sheetIn.innerHTML = `<div class="a-sh-head">${cover(tr.h)}<span><b>${esc(tr.t)}</b><small>${esc(tr.a)}</small></span></div>` + [['plus', 'Добавить в плейлист'], ['similar', 'Похожие треки'], ['user', 'Перейти к исполнителю'], ['disc', 'Перейти в альбом'], ['link', 'Отправить трек'], ['thumbdown', 'Не нравится'], ['x', 'Пропускать треки исполнителя']].map(x => `<button class="a-mi" data-mi="${x[1]}">${ic(x[0])}<span>${x[1]}</span></button>`).join('');
      } else if (kind === 'account') {
        E.sheetIn.innerHTML = `<h4>Где играть музыку</h4><button class="a-mi${remote === 4 ? '' : ' sel'}" data-a="usephone">${ic('phone')}<span>Этот телефон<small>Аккаунт VK · Иван Иванов</small></span>${remote === 4 ? '' : ic('check')}</button><button class="a-mi${remote === 4 ? ' sel' : ''}" data-a="usepc">${ic('pc')}<span>${remote === 4 ? 'Компьютер HXLT-PC' : 'Подключить компьютер…'}<small>Телефон станет пультом</small></span>${remote === 4 ? ic('check') : ''}</button>`;
      }
      R.classList.add('sheet-open'); api.refresh();
    }
    function closeSheet() { if (!sheet) return; sheet = null; R.classList.remove('sheet-open'); api.refresh(); }

    function updTrack() {
      const t = pl.track, radio = !!pl.radio;
      const old = $('.hx-cov', E.art);
      const n = document.createElement('div'); n.className = 'lg-artc in'; n.innerHTML = cover(t.h, t.t.toUpperCase(), 'big');
      E.art.appendChild(n);
      if (old) { const p = old.parentNode; p.classList.add('out'); setTimeout(() => p.remove(), 420); }
      E.t.textContent = t.t; E.a.textContent = t.a;
      E.seek.hidden = radio; E.live.hidden = !radio;
      $('[data-a="shuffle"]', R).disabled = radio;
      $('.lg-mcov', R).innerHTML = cover(t.h); $('.lg-mmeta b', R).textContent = t.t; $('.lg-mmeta small', R).textContent = t.a;
      drawLists();
      if (sheet === 'queue') openSheet('queue');
      updTime(); api.refresh();
    }
    function updState() {
      R.classList.toggle('is-playing', pl.playing);
      $$('[data-a="toggle"]', R).forEach(b => { b.innerHTML = ic(pl.playing ? 'pause' : 'play'); b.setAttribute('aria-label', pl.playing ? 'Пауза' : 'Воспроизвести'); });
      $('[data-a="shuffle"]', R).classList.toggle('on', pl.shuffle);
    }
    function updTime() { setV(E.sl, pl.radio ? 1 : pl.pos / pl.dur); E.cur.textContent = pl.radio ? 'LIVE' : mmss(pl.pos); E.rem.textContent = pl.radio ? '' : '−' + mmss(pl.dur - pl.pos); setV(E.mbar, pl.radio ? 1 : pl.pos / pl.dur); }
    function updVol() { setV(E.vsl, pl.vol); E.vpct.textContent = Math.round(pl.vol * 100) + '%'; $('[data-a="vol"]', R).innerHTML = ic(pl.vol === 0 ? 'mute' : pl.vol < 0.45 ? 'vollow' : 'vol'); }
    pl.on(k => { if (k === 'time') updTime(); else if (k === 'vol') updVol(); else { updTrack(); updState(); } });
    bindSlider(E.sl, { get: () => pl.radio ? 1 : pl.pos / pl.dur, onInput: v => { if (!pl.radio) pl.seek(v * pl.dur); } });
    bindSlider(E.vsl, { vertical: true, get: () => pl.vol, onInput: v => pl.setVol(v) });
    const outs = { cf: v => Math.round(v * 12) + ' с', cache: v => Math.round(128 + v * 1920) + ' МБ' };
    $$('.lg-set .sl', R).forEach(el => { const k = el.dataset.sl, out = $(`[data-out="${k}"]`, R); const upd = () => { setV(el, S[k]); out.textContent = outs[k](S[k]); }; bindSlider(el, { get: () => S[k], onInput: v => { S[k] = v; upd(); } }); upd(); });
    bindSwipe($('.lg-player', R), api, { end: (axis, dx, dy) => { if (axis === 'y' && dy < -60) openSheet('queue'); } });
    bindSwipe($('.lg-sheet', R), api, { end: (axis, dx, dy) => { if (axis === 'y' && dy > 60) closeSheet(); } });
    bindSwipe(E.mini, api, { end: (axis, dx, dy) => { if (axis === 'y' && dy < -40) go('player'); } });

    const ACT = {
      drawer: () => setDrawer(true), toggle: () => pl.toggle(), prev: () => pl.prev(), next: () => pl.next(),
      shuffle: () => { pl.toggleShuffle(); toast(pl.shuffle ? 'Перемешивание включено' : 'По порядку'); },
      vol: () => E.volw.classList.toggle('open'),
      volup: () => pl.setVol(pl.vol + 0.1), voldn: () => pl.setVol(pl.vol - 0.1),
      queue: () => openSheet('queue'), actions: () => openSheet('actions'), account: () => openSheet('account'),
      rowmenu: b => openSheet('actions', findT(+b.closest('[data-id]').dataset.id)),
      search: () => toast('Поиск по трекам, исполнителям и станциям'),
      fav: b => { const k = +b.closest('[data-st]').dataset.st; if (fav.has(k)) fav.delete(k); else fav.add(k); drawLists(); toast(fav.has(k) ? 'Добавлено в избранное' : 'Убрано из избранного'); },
      findpc: () => { remote = 1; drawRemote(); clearTimeout(remoteT); remoteT = setTimeout(() => { remote = 2; drawRemote(); }, 1600); },
      byip: () => { remote = 2; drawRemote(); toast('Адрес 192.168.1.5:8765 найден'); },
      scanqr: () => { remote = 3; drawRemote(); toast('QR с ПК считан'); },
      pair: () => { remote = 3; drawRemote(); },
      link: () => { remote = 4; drawRemote(); toast('Телефон связан с HXLT-PC'); },
      unlink: () => { remote = 0; drawRemote(); toast('Отключено'); },
      session: () => toast('Сессия VK передана на компьютер'),
      vkqr: () => toast('Наведите камеру на QR в окне входа на ПК'),
      usephone: () => { closeSheet(); if (remote === 4) { remote = 0; drawRemote(); } toast('Музыка играет на телефоне'); },
      usepc: () => { closeSheet(); if (remote !== 4) go('remote'); else toast('Уже управляете HXLT-PC'); },
      clearcache: () => toast('Кэш очищен'), update: () => toast('Установлена последняя версия')
    };
    R.addEventListener('click', e => {
      const t = e.target;
      if (t.closest('.a-scrim')) { setDrawer(false); closeSheet(); return; }
      if (!t.closest('.lg-volw')) E.volw.classList.remove('open');
      const a = t.closest('[data-a]'); if (a) { if (ACT[a.dataset.a]) ACT[a.dataset.a](a); return; }
      const g = t.closest('[data-go]'); if (g) { go(g.dataset.go); return; }
      const mi = t.closest('[data-mi]'); if (mi) { const tr = sheetTrack; closeSheet(); toast(mi.dataset.mi === 'Добавить в плейлист' ? `«${tr.t}» → «Любимое»` : mi.dataset.mi + ' · ' + tr.t); return; }
      const rt = t.closest('[data-rt]'); if (rt) { radioTab = rt.dataset.rt; $$('[data-rt]', R).forEach(b => b.classList.toggle('on', b === rt)); drawLists(); return; }
      const st = t.closest('[data-st]'); if (st) { pl.playStation(STATIONS[+st.dataset.st]); go('player'); return; }
      const r = t.closest('.a-row[data-id]'); if (r) { const tr = findT(+r.dataset.id); const same = !pl.radio && tr.id === pl.track.id; if (!same) pl.playTrack(tr); else if (!pl.playing) pl.play(false); closeSheet(); if (scr !== 'player' && same) go('player'); return; }
      const p = t.closest('[data-pl]'); if (p) { pl.shuffle = true; pl.load(Math.floor(Math.random() * pl.list.length)); toast(`Играет «${p.dataset.pl}» вперемешку`); return; }
      if (t.closest('.lg-mini')) go('player');
    });
    R.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.a-row,.lg-mini')) { e.preventDefault(); e.target.click(); } });
    R.addEventListener('change', e => { if (e.target.dataset.set) { S[e.target.dataset.set] = e.target.checked; toast('Кроссфейд: ' + (e.target.checked ? 'включён' : 'выключен')); } });
    const clock = setInterval(() => { const el = $('.ab-time', R); if (el) el.textContent = nowHM(); }, 15000);

    go('player'); updTrack(); updState(); updVol(); drawRemote();
    return {
      act(n) {
        if (n === 'drawer') { go(scr); setDrawer(true); }
        else if (n === 'player') go('player');
        else if (n === 'account') { go('player'); openSheet('account'); }
        else if (n === 'actions') { go('player'); openSheet('actions'); }
        else if (n === 'vol') { go('player'); E.volw.classList.add('open'); }
        else if (n === 'queue') { go('player'); openSheet('queue'); }
        else go(n);
      },
      onEscape() {
        if (sheet) { closeSheet(); return true; }
        if (R.classList.contains('drawer-open')) { setDrawer(false); return true; }
        if (E.volw.classList.contains('open')) { E.volw.classList.remove('open'); return true; }
        return false;
      },
      destroy() { pl.destroy(); clearTimeout(remoteT); clearInterval(clock); }
    };
  }
};

/* ===== 06-modern.js ===== */
/* ---------- Демо: Android Modern ---------- */
DEMOS.modern = {
  w: 360, h: 760, featW: 340,
  kicker: 'Демо · Android', title: 'HXLT Player Modern',
  sub: 'Новый интерфейс с вкладками, жестами и Android Auto. Плеер можно листать свайпами прямо мышью.',
  cta: 'Скачать Modern APK', ctaAct: 'android',
  features: [
    { spot: 'tabs', t: 'Вкладки', d: 'Медиатека, Для вас, Радио и Поиск — внизу экрана.', act: 'lib' },
    { spot: 'list', t: 'Треки', d: 'Нажатие — играть, повторное — открыть плеер. Долгое нажатие — меню трека.', act: 'lib', bx: 0.97, by: 0.02 },
    { spot: 'mini', t: 'Мини-плеер', d: 'Тап или свайп вверх открывает плеер.', act: 'lib' },
    { spot: 'collapse', t: 'Свернуть', d: 'Кнопка вниз или свайп вниз по половине очереди.', act: 'player' },
    { spot: 'source', t: 'Музыка | Радио', d: 'Переключение источника прямо в плеере.', act: 'player' },
    { spot: 'menu', t: 'Меню трека', d: 'В плейлист, скачать, похожие, к исполнителю, «Не нравится».', act: 'pmenu' },
    { spot: 'bt', t: 'Bluetooth-устройство', d: 'Название наушников, колонки или машины. Название, исполнитель и обложка уходят по Bluetooth.', act: 'player' },
    { spot: 'seek', t: 'Прогресс', d: 'Тонкая заливка без ползунка: коснитесь или протяните, чтобы перемотать.', act: 'player' },
    { spot: 'controls', t: 'Управление', d: 'Перемешать, назад, пауза, вперёд и очередь.', act: 'player' },
    { spot: 'gest', t: 'Жесты', d: 'Влево/вправо — следующий и предыдущий трек. Вверх/вниз по одной половине — громкость, по другой — очередь и сворачивание.', act: 'gest', bx: 0.5, by: 0.03 },
    { spot: 'volume', t: 'Громкость', d: 'Свайп двигает основной регулятор внизу — без всплывающих окон.', act: 'player' },
    { spot: 'swap', t: 'Сторона жестов', d: 'В настройках кнопка обмена меняет местами громкость и очередь.', act: 'settings' },
    { spot: 'auto', t: 'Android Auto', d: 'Моя музыка, Скачанные, Очередь и Радио на экране машины, голосовой поиск и «Продолжить».', act: 'auto' }
  ],
  build(stage, api) {
    const pl = new Player([9, 0, 10, 2, 8, 5, 3, 7, 4].map(i => TRACKS[i]));
    const toast = makeToast(stage);
    let tab = 'lib', open = false, sheet = null, sheetTrack = null, setOpen = false, chip = 'all', q = '', lastStation = STATIONS[0], liked = new Set([9]);
    let volLeft = true; try { volLeft = localStorage.getItem('hxlt-demo-volleft') !== '0'; } catch (e) { /* ignore */ }
    const downloaded = new Set([9, 2, 5]);
    const TABS = [['lib', 'lib', 'Медиатека'], ['foryou', 'sparkle', 'Для вас'], ['radio', 'radio', 'Радио'], ['search', 'search', 'Поиск']];
    stage.innerHTML = `<div class="md">
      ${statusBar()}
      <div class="md-scrs">
        <section class="md-scr" data-tab="lib"><header class="md-h"><h2>Медиатека</h2><button data-a="settings" aria-label="Настройки">${ic('gear')}</button><span class="md-av">И</span></header>
          <div class="md-chips">${[['all', 'Мои треки'], ['dl', 'Скачанные'], ['liked', 'Нравится']].map(c => `<button data-chip="${c[0]}"${c[0] === 'all' ? ' class="on"' : ''}>${c[1]}</button>`).join('')}</div>
          <button class="md-shuf" data-a="shuffleall">${ic('shuffle')}<span><b>Слушать вперемешку</b><small>${pl.list.length} треков</small></span></button>
          <div class="md-list" data-spot="list"></div></section>
        <section class="md-scr" data-tab="foryou"><header class="md-h"><h2>Для вас</h2></header>
          <button class="md-hero" data-mix="0"><small>Обновляется каждый день</small><b>Микс дня</b><span>Velvet Static, North Avenue 222, a-ha и другие</span><i class="md-heroplay">${ic('play')}</i></button>
          <h3 class="md-sub">Новинки</h3><div class="md-hscroll">${[10, 9, 0, 8, 2].map(i => `<button class="md-tile" data-play="${i}">${cover(TRACKS[i].h, '', 'sq')}<b>${esc(TRACKS[i].t)}</b><small>${esc(TRACKS[i].a)}</small></button>`).join('')}</div>
          <h3 class="md-sub">Похоже на ваши</h3><div class="md-list md-flist"></div></section>
        <section class="md-scr" data-tab="radio"><header class="md-h"><h2>Радио</h2></header><div class="md-rgrid">${STATIONS.map((s, k) => `<button class="md-st" data-st="${k}" style="--h:${s.h}"><i class="md-live">LIVE</i><b>${esc(s.t)}</b><small>${esc(s.a)}</small></button>`).join('')}</div></section>
        <section class="md-scr" data-tab="search"><header class="md-h"><h2>Поиск</h2></header><label class="md-search">${ic('search')}<input type="search" placeholder="Треки, исполнители, радио" aria-label="Поиск"></label><div class="md-sres"></div></section>
      </div>
      <section class="md-set">
        <header class="md-sh"><button data-a="setback" aria-label="Назад">${ic('back')}</button><b>Настройки</b></header>
        <div class="md-setin">
          <h5>Воспроизведение</h5>
          <label class="md-row"><span><b>Кроссфейд</b><small>Плавный переход между треками</small></span><span class="a-sw"><input type="checkbox" data-set="cross" checked><i></i></span></label>
          <div class="md-gcard" data-spot="swap"><b>Жесты в плеере</b><small>Свайп вверх или вниз по половине экрана</small>
            <div class="md-zones"><span class="z zl"></span><button data-a="swap" class="md-swap" aria-label="Поменять местами">${ic('swap')}</button><span class="z zr"></span></div></div>
          <h5>Android Auto</h5>
          <div class="md-auto" data-spot="auto">
            <div class="car"><div class="car-rail">${ic('music')}${ic('search')}${ic('car')}</div><div class="car-main"><b>HXLT Player</b><div class="car-tiles">${[['lib', 'Моя музыка', 262], ['download', 'Скачанные', 190], ['queue', 'Очередь', 310], ['radio', 'Радио', 20]].map(x => `<span style="--h:${x[2]}">${ic(x[0])}<em>${x[1]}</em></span>`).join('')}</div><div class="car-np"><i class="car-cov"></i><span><b class="car-t"></b><small class="car-a"></small></span>${ic('play', 'car-pp')}</div></div></div>
            <ul><li>Голосовой и текстовый поиск</li><li>«Продолжить» — сохранённая очередь, до 60 треков</li><li>Скачанные играют без интернета</li><li>Обложки и метаданные на экране машины</li></ul>
            <small class="md-note">Для APK не из Google Play: Android Auto → 10 раз нажать «Версия» → «Для разработчиков» → «Неизвестные источники».</small>
          </div>
          <h5>Приложение</h5>
          <button class="md-row btn" data-a="update"><span><b>Проверить обновление</b><small>HXLT Player Modern</small></span>${ic('chevright')}</button>
        </div>
      </section>
      <div class="md-mini" data-spot="mini" role="button" tabindex="0" aria-label="Открыть плеер"><span class="md-mcov"></span><span class="md-mmeta"><b></b><small></small></span><button data-a="toggle" aria-label="Воспроизвести">${ic('play')}</button><button data-a="next" aria-label="Следующий">${ic('next')}</button><i class="md-mbar"></i></div>
      <nav class="md-nav" data-spot="tabs" aria-label="Вкладки">${TABS.map(t => `<button data-tabb="${t[0]}">${ic(t[1])}<span>${t[2]}</span></button>`).join('')}</nav>
      <section class="md-player is-off" aria-label="Плеер">
        <div class="mp-bg"></div>
        <header class="mp-top"><button data-a="collapse" data-spot="collapse" aria-label="Свернуть">${ic('chevdown')}</button><div class="mp-src" data-spot="source"><button data-src="music" class="on">Музыка</button><button data-src="radio">Радио</button></div><button data-a="pmenu" data-spot="menu" aria-label="Меню трека">${ic('dots')}</button></header>
        <div class="mp-bt" data-spot="bt">${ic('bt')}<span>JBL Flip 6</span></div>
        <div class="mp-gest" data-spot="gest"><div class="mp-art"></div>
          <div class="mp-zhint" aria-hidden="true"><span class="zh zl"></span><span class="zh zr"></span><em>← → треки</em></div></div>
        <div class="mp-info"><div><b class="mp-t"></b><span class="mp-a"></span></div><button data-a="like" aria-label="Нравится">${ic('heart')}</button></div>
        <div class="mp-seek" data-spot="seek"><div class="sl nothumb fat mp-sl" aria-label="Позиция трека"><i></i></div><div class="mp-times"><span class="cur">0:00</span><span class="dur">0:00</span></div></div>
        <div class="mp-live" hidden><i></i>Прямой эфир</div>
        <div class="mp-ctrl" data-spot="controls"><button data-a="shuffle" class="tg" aria-label="Перемешать">${ic('shuffle')}</button><button data-a="prev" aria-label="Назад">${ic('prev')}</button><button data-a="toggle" class="mp-play" aria-label="Воспроизвести">${ic('play')}</button><button data-a="next" aria-label="Вперёд">${ic('next')}</button><button data-a="queue" class="tg" data-spot="queue" aria-label="Очередь">${ic('queue')}</button></div>
        <div class="mp-vol" data-spot="volume">${ic('vollow')}<div class="sl nothumb mp-vsl" aria-label="Громкость"><i></i></div>${ic('vol')}</div>
      </section>
      <div class="a-scrim"></div>
      <div class="a-sheet md-sheet" role="dialog" aria-label="Панель"><i class="a-handle"></i><div class="a-sheet-in"></div></div>
      <i class="a-gbar"></i>
    </div>`;
    const R = $('.md', stage);
    const E = { player: $('.md-player', R), art: $('.mp-art', R), gest: $('.mp-gest', R), t: $('.mp-t', R), a: $('.mp-a', R), sl: $('.mp-sl', R), vsl: $('.mp-vsl', R), cur: $('.mp-times .cur', R), dur: $('.mp-times .dur', R), seek: $('.mp-seek', R), live: $('.mp-live', R), mini: $('.md-mini', R), mbar: $('.md-mbar', R), sheetIn: $('.a-sheet-in', R), set: $('.md-set', R), bg: $('.mp-bg', R) };
    const findT = id => pl.list.find(x => x.id === id) || TRACKS[id];
    const row = t => `<div class="md-trow${!pl.radio && t.id === pl.track.id ? ' cur' : ''}" data-id="${t.id}" role="button" tabindex="0">${cover(t.h)}<span><b>${esc(t.t)}</b><small>${downloaded.has(t.id) ? ic('download', 'dlm') : ''}${esc(t.a)}</small></span><em>${mmss(t.d)}</em></div>`;
    function drawLists() {
      const L = chip === 'dl' ? pl.list.filter(t => downloaded.has(t.id)) : chip === 'liked' ? pl.list.filter(t => liked.has(t.id)) : pl.list;
      $('.md-list[data-spot="list"]', R).innerHTML = L.length ? L.map(row).join('') : '<p class="a-empty">Пока пусто</p>';
      $('.md-flist', R).innerHTML = [3, 7, 4].map(i => row(findT(i))).join('');
      const qq = q.trim().toLowerCase();
      const res = qq ? TRACKS.filter(t => (t.t + ' ' + t.a).toLowerCase().includes(qq)) : [];
      const rs = qq ? STATIONS.filter(s => (s.t + ' ' + s.a).toLowerCase().includes(qq)) : [];
      $('.md-sres', R).innerHTML = qq ? (res.length + rs.length ? res.map(row).join('') + rs.map(s => `<div class="md-trow" data-st="${STATIONS.indexOf(s)}" role="button" tabindex="0">${cover(s.h)}<span><b>${esc(s.t)}</b><small>Радио · ${esc(s.a)}</small></span><em>LIVE</em></div>`).join('') : '<p class="a-empty">Ничего не нашлось</p>') : `<div class="md-genres">${['Поп', 'Рок', 'Электроника', 'Джаз', 'Хип-хоп', 'Лоу-фай'].map((g, k) => `<button data-genre="${g}" style="--h:${k * 55 + 200}">${g}</button>`).join('')}</div>`;
      $$('.md-st', R).forEach(b => b.classList.toggle('cur', pl.radio === STATIONS[+b.dataset.st]));
      api.refresh();
    }
    function setTab(t) {
      tab = t;
      $$('.md-scr', R).forEach(s => { const on = s.dataset.tab === t; s.classList.toggle('on', on); s.classList.toggle('is-off', !on); });
      $$('[data-tabb]', R).forEach(b => b.classList.toggle('on', b.dataset.tabb === t));
      if (t === 'search') setTimeout(() => $('.md-search input', R).focus({ preventScroll: true }), 60);
      api.refresh();
    }
    function setPlayer(v) {
      open = v; closeSheet();
      R.classList.toggle('player-open', v); E.player.classList.toggle('is-off', !v);
      E.player.style.transform = '';
      api.refresh();
    }
    function setSettings(v) { setOpen = v; if (v) setPlayer(false); R.classList.toggle('set-open', v); E.set.classList.toggle('is-off', !v); api.refresh(); }
    function drawZones() {
      const vl = '<b>Громкость</b><small>вверх / вниз</small>', ql = '<b>Очередь</b><small>вверх — открыть, вниз — свернуть</small>';
      $('.md-zones .zl', R).innerHTML = volLeft ? vl : ql; $('.md-zones .zr', R).innerHTML = volLeft ? ql : vl;
      $('.md-zones .zl', R).classList.toggle('vol', volLeft); $('.md-zones .zr', R).classList.toggle('vol', !volLeft);
      $('.mp-zhint .zl', R).textContent = volLeft ? '↕ Громкость' : '↑ Очередь · ↓ Свернуть';
      $('.mp-zhint .zr', R).textContent = volLeft ? '↑ Очередь · ↓ Свернуть' : '↕ Громкость';
    }
    function openSheet(kind, t) {
      sheet = kind; sheetTrack = t || pl.track;
      if (kind === 'queue') {
        const cur = pl.radio ? `<div class="md-trow cur">${cover(pl.track.h)}<span><b>${esc(pl.track.t)}</b><small>Радио</small></span><em>LIVE</em></div>` : row(pl.track);
        E.sheetIn.innerHTML = `<h4>Очередь</h4><h5>Сейчас играет</h5>${cur}<h5>Далее</h5><div class="a-sheet-list">${pl.list.filter(x => pl.radio || x.id !== pl.track.id).map(row).join('')}</div>`;
      } else {
        const tr = sheetTrack;
        E.sheetIn.innerHTML = `<div class="a-sh-head">${cover(tr.h)}<span><b>${esc(tr.t)}</b><small>${esc(tr.a)}</small></span></div>` + [['plus', 'Добавить в плейлист'], ['download', 'Скачать'], ['similar', 'Похожие треки'], ['user', 'К исполнителю'], ['link', 'Поделиться'], ['thumbdown', 'Не нравится']].map(x => `<button class="a-mi" data-mi="${x[1]}">${ic(x[0])}<span>${x[1]}</span></button>`).join('');
      }
      R.classList.add('sheet-open'); api.refresh();
    }
    function closeSheet() { if (!sheet) return; sheet = null; R.classList.remove('sheet-open'); api.refresh(); }

    function updTrack() {
      const t = pl.track, radio = !!pl.radio;
      if (radio) lastStation = pl.radio;
      const old = $('.mp-artc', E.art);
      const n = document.createElement('div'); n.className = 'mp-artc in'; n.innerHTML = cover(t.h, t.t.toUpperCase(), 'big');
      E.art.appendChild(n);
      if (old) { old.classList.add('out'); setTimeout(() => old.remove(), 420); }
      E.bg.style.setProperty('--h', t.h);
      E.t.textContent = t.t; E.a.textContent = radio ? 'Радио · ' + t.a : t.a;
      E.seek.hidden = radio; E.live.hidden = !radio;
      $$('[data-src]', R).forEach(b => b.classList.toggle('on', b.dataset.src === (radio ? 'radio' : 'music')));
      $('[data-a="like"]', R).classList.toggle('on', liked.has(t.id));
      $('[data-a="shuffle"]', E.player).disabled = radio;
      $('.md-mcov', R).innerHTML = cover(t.h); $('.md-mmeta b', R).textContent = t.t; $('.md-mmeta small', R).textContent = t.a;
      $('.car-cov', R).style.setProperty('--h', t.h); $('.car-t', R).textContent = t.t; $('.car-a', R).textContent = t.a;
      R.classList.add('has-track');
      drawLists(); if (sheet === 'queue') openSheet('queue');
      updTime();
    }
    function updState() {
      R.classList.toggle('is-playing', pl.playing);
      $$('[data-a="toggle"]', R).forEach(b => { b.innerHTML = ic(pl.playing ? 'pause' : 'play'); b.setAttribute('aria-label', pl.playing ? 'Пауза' : 'Воспроизвести'); });
      $('.car-pp', R).outerHTML = ic(pl.playing ? 'pause' : 'play', 'car-pp');
      $('[data-a="shuffle"]', E.player).classList.toggle('on', pl.shuffle);
    }
    function updTime() { setV(E.sl, pl.radio ? 0 : pl.pos / pl.dur); E.cur.textContent = pl.radio ? '' : mmss(pl.pos); E.dur.textContent = pl.radio ? '' : mmss(pl.dur); setV(E.mbar, pl.radio ? 1 : pl.pos / pl.dur); }
    pl.on(k => { if (k === 'time') updTime(); else if (k === 'vol') setV(E.vsl, pl.vol); else { updTrack(); updState(); } });
    bindSlider(E.sl, { get: () => pl.radio ? 0 : pl.pos / pl.dur, onInput: v => { if (!pl.radio) pl.seek(v * pl.dur); } });
    bindSlider(E.vsl, { get: () => pl.vol, onInput: v => pl.setVol(v) });
    let lvl = 0;
    const vis = () => { if (open && pl.playing) { const b = Sound.bands(4); const v = b.length ? (b[0] + b[1]) / 2 : 0; lvl += (v - lvl) * 0.25; E.art.style.setProperty('--lvl', lvl.toFixed(3)); } raf = requestAnimationFrame(vis); };
    let raf = requestAnimationFrame(vis);

    // Жесты плеера (без всплывающего индикатора — двигается основной регулятор)
    let vol0 = 0, mode = null;
    bindSwipe(E.player, api, {
      start(axis, side) { const isVol = (side === 'left') === volLeft; mode = axis === 'x' ? 'track' : isVol ? 'vol' : 'queue'; vol0 = pl.vol; R.classList.add('gesturing'); },
      move(axis, dx, dy) {
        if (mode === 'track') E.art.style.transform = `translateX(${dx * 0.55}px) rotate(${dx * 0.02}deg)`;
        else if (mode === 'vol') pl.setVol(vol0 - dy / 320);
        else if (dy > 0) E.player.style.transform = `translateY(${dy * 0.6}px)`;
      },
      end(axis, dx, dy) {
        R.classList.remove('gesturing'); E.art.style.transform = ''; E.player.style.transform = '';
        if (mode === 'track') { if (dx < -72) pl.next(); else if (dx > 72) pl.prev(); }
        else if (mode === 'queue') { if (dy < -72) openSheet('queue'); else if (dy > 72) setPlayer(false); }
        mode = null;
      }
    });
    bindSwipe(E.mini, api, { end: (axis, dx, dy) => { if (axis === 'y' && dy < -36) setPlayer(true); else if (axis === 'x' && Math.abs(dx) > 72) (dx < 0 ? pl.next() : pl.prev()); } });
    bindSwipe($('.md-sheet', R), api, { end: (axis, dx, dy) => { if (axis === 'y' && dy > 60) closeSheet(); } });
    bindLongPress(R, '.md-trow[data-id]', el => openSheet('menu', findT(+el.dataset.id)));

    const ACT = {
      toggle: () => pl.toggle(), prev: () => pl.prev(), next: () => pl.next(),
      shuffle: () => { pl.toggleShuffle(); toast(pl.shuffle ? 'Перемешивание включено' : 'По порядку'); },
      queue: () => openSheet('queue'), pmenu: () => openSheet('menu'), collapse: () => setPlayer(false),
      like: b => { const id = pl.track.id; if (liked.has(id)) liked.delete(id); else liked.add(id); b.classList.toggle('on', liked.has(id)); toast(liked.has(id) ? 'Добавлено в «Нравится»' : 'Убрано из «Нравится»'); drawLists(); },
      settings: () => setSettings(true), setback: () => setSettings(false),
      swap: () => { volLeft = !volLeft; try { localStorage.setItem('hxlt-demo-volleft', volLeft ? '1' : '0'); } catch (e) { /* ignore */ } drawZones(); toast(volLeft ? 'Громкость — слева, очередь — справа' : 'Громкость — справа, очередь — слева'); },
      shuffleall: () => { pl.shuffle = true; pl.load(Math.floor(Math.random() * pl.list.length)); setPlayer(true); },
      update: () => toast('Установлена последняя версия')
    };
    const playRow = id => { const tr = findT(id); if (!pl.radio && tr.id === pl.track.id && R.classList.contains('has-track')) { if (!pl.playing) pl.play(false); setPlayer(true); return; } pl.playTrack(tr); };
    R.addEventListener('click', e => {
      const t = e.target;
      if (t.closest('.a-scrim')) { closeSheet(); return; }
      const a = t.closest('[data-a]'); if (a) { if (ACT[a.dataset.a]) ACT[a.dataset.a](a); return; }
      const tb = t.closest('[data-tabb]'); if (tb) { setSettings(false); setPlayer(false); setTab(tb.dataset.tabb); return; }
      const ch = t.closest('[data-chip]'); if (ch) { chip = ch.dataset.chip; $$('[data-chip]', R).forEach(b => b.classList.toggle('on', b === ch)); drawLists(); return; }
      const src = t.closest('[data-src]'); if (src) { if (src.dataset.src === 'radio' && !pl.radio) pl.playStation(lastStation); else if (src.dataset.src === 'music' && pl.radio) { pl.radio = null; pl.load(pl.i, true); } return; }
      const mi = t.closest('[data-mi]'); if (mi) { const tr = sheetTrack; closeSheet(); if (mi.dataset.mi === 'Скачать') { downloaded.add(tr.id); drawLists(); } toast(mi.dataset.mi + ' · ' + tr.t); return; }
      const st = t.closest('[data-st]'); if (st) { pl.playStation(STATIONS[+st.dataset.st]); drawLists(); setPlayer(true); return; }
      const r = t.closest('.md-trow[data-id]'); if (r) { const inSheet = !!r.closest('.a-sheet'); playRow(+r.dataset.id); if (inSheet) closeSheet(); return; }
      const mx = t.closest('[data-mix]'); if (mx) { pl.shuffle = true; pl.load(0, true); setPlayer(true); return; }
      const pp = t.closest('[data-play]'); if (pp) { playRow(+pp.dataset.play); return; }
      const g = t.closest('[data-genre]'); if (g) { q = g.dataset.genre === 'Рок' ? 'Queen' : g.dataset.genre === 'Лоу-фай' ? 'Лофи' : 'a'; $('.md-search input', R).value = q; drawLists(); return; }
      if (t.closest('.md-mini')) setPlayer(true);
    });
    R.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.md-trow,.md-mini')) { e.preventDefault(); e.stopPropagation(); e.target.click(); } });
    $('.md-search input', R).addEventListener('input', e => { q = e.target.value; drawLists(); });
    R.addEventListener('change', e => { if (e.target.dataset.set) toast('Кроссфейд: ' + (e.target.checked ? 'включён' : 'выключен')); });
    const clock = setInterval(() => { const el = $('.ab-time', R); if (el) el.textContent = nowHM(); }, 15000);
    let hintT = 0;
    const showZones = () => { R.classList.add('show-zones'); clearTimeout(hintT); hintT = setTimeout(() => R.classList.remove('show-zones'), 2600); };

    setTab('lib'); drawZones(); updTrack(); updState(); setV(E.vsl, pl.vol); setSettings(false); R.classList.remove('has-track');
    return {
      act(n) {
        if (n === 'lib') { setSettings(false); setPlayer(false); setTab('lib'); }
        else if (n === 'player') { setSettings(false); setPlayer(true); }
        else if (n === 'pmenu') { setSettings(false); setPlayer(true); openSheet('menu'); }
        else if (n === 'gest') { setSettings(false); setPlayer(true); showZones(); }
        else if (n === 'settings') { setSettings(true); }
        else if (n === 'auto') { setSettings(true); setTimeout(() => { const el = $('.md-auto', R); el.parentNode.scrollTo({ top: el.offsetTop - 60, behavior: REDUCE.matches ? 'auto' : 'smooth' }); setTimeout(api.refresh, 450); }, 80); }
      },
      onEscape() {
        if (sheet) { closeSheet(); return true; }
        if (open) { setPlayer(false); return true; }
        if (setOpen) { setSettings(false); return true; }
        return false;
      },
      destroy() { pl.destroy(); cancelAnimationFrame(raf); clearInterval(clock); clearTimeout(hintT); }
    };
  }
};

/* ===== 99-init.js ===== */
/* ---------- Запуск ---------- */
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire); else wire();

})();
