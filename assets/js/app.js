import { dateToGematria, MEANINGS } from './calculator.js';

const STORAGE_KEY = 'gematria_birthday';
const SITE_URL    = 'https://danhpaiva.github.io/DailyGematriaView-html-css-js/';

// ── Daily card ────────────────────────────────────────────
const today  = new Date();
const number = dateToGematria(today);

document.getElementById('display-date').textContent = today.toLocaleDateString('pt-BR', {
  weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
});
document.getElementById('display-number').textContent  = number;
document.getElementById('display-meaning').textContent = formatMeaning(MEANINGS[number]);

fadeIn(document.getElementById('result'));

document.getElementById('share-daily').addEventListener('click', () => {
  const dateStr = today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  share(
    `Daily Gematria View — ${dateStr}`,
    buildShareText('Número do Dia', dateStr, number, MEANINGS[number]),
  );
});

// ── Birthday card ─────────────────────────────────────────
const elForm           = document.getElementById('birthday-form');
const elBirthdayResult = document.getElementById('birthday-result');
const elInput          = document.getElementById('birthday-input');
const elSave           = document.getElementById('birthday-save');
const elEdit           = document.getElementById('birthday-edit');
const elShareDestiny   = document.getElementById('share-destiny');

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  showBirthdayResult(saved);
} else {
  fadeIn(document.getElementById('birthday-card'));
}

elSave.addEventListener('click', () => {
  const val = elInput.value;
  if (!val) return;
  localStorage.setItem(STORAGE_KEY, val);
  showBirthdayResult(val);
});

elEdit.addEventListener('click', () => {
  elBirthdayResult.hidden = true;
  elForm.hidden = false;
  elInput.value = localStorage.getItem(STORAGE_KEY) ?? '';
});

elShareDestiny.addEventListener('click', () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  const [y, m, d] = raw.split('-').map(Number);
  const date    = new Date(y, m - 1, d);
  const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const destiny = dateToGematria(date);
  share(
    `Daily Gematria View — Número de Destino`,
    buildShareText('Número de Destino', dateStr, destiny, MEANINGS[destiny]),
  );
});

// ── Helpers ───────────────────────────────────────────────
function showBirthdayResult(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const destinyNumber = dateToGematria(date);

  document.getElementById('display-birthday').textContent =
    date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  document.getElementById('display-destiny').textContent         = destinyNumber;
  document.getElementById('display-destiny-meaning').textContent = formatMeaning(MEANINGS[destinyNumber]);

  elForm.hidden           = true;
  elBirthdayResult.hidden = false;
  fadeIn(document.getElementById('birthday-card'));
}

function formatMeaning({ title, text }) {
  return `${title} — ${text}`;
}

function buildShareText(label, dateStr, num, meaning) {
  return (
    `✡️ Daily Gematria View\n` +
    `📅 ${dateStr}\n` +
    `${label}: ${num} — ${meaning.title}\n\n` +
    `"${meaning.text}"\n\n` +
    `🔗 ${SITE_URL}`
  );
}

async function share(title, text) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url: SITE_URL });
      return;
    } catch {
      // user cancelled — silently ignore
      return;
    }
  }
  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copiado para a área de transferência!');
  } catch {
    showToast('Não foi possível copiar.');
  }
}

function showToast(message) {
  const existing = document.getElementById('share-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id          = 'share-toast';
  toast.className   = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast--visible'));
  });

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2500);
}

function fadeIn(el) {
  el.classList.remove('card--visible');
  requestAnimationFrame(() =>
    requestAnimationFrame(() => el.classList.add('card--visible'))
  );
}
