import { dateToGematria, MEANINGS } from './calculator.js';

const today   = new Date();
const number  = dateToGematria(today);
const meaning = MEANINGS[number];

// ── DOM refs ──────────────────────────────────────────────
const elDate    = document.getElementById('display-date');
const elNumber  = document.getElementById('display-number');
const elMeaning = document.getElementById('display-meaning');
const elCard    = document.getElementById('result');

// ── Render ────────────────────────────────────────────────
elDate.textContent    = today.toLocaleDateString('pt-BR', {
  weekday: 'long',
  day:     '2-digit',
  month:   'long',
  year:    'numeric',
});

elNumber.textContent  = number;
elMeaning.textContent = `${meaning.title} — ${meaning.text}`;

// ── Fade-in after first paint ─────────────────────────────
requestAnimationFrame(() => {
  requestAnimationFrame(() => elCard.classList.add('card--visible'));
});
