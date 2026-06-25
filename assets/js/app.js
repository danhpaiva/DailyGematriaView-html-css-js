import { dateToGematria, MEANINGS } from './calculator.js';

const STORAGE_KEY = 'gematria_birthday';

// ── Daily card ────────────────────────────────────────────
const today  = new Date();
const number = dateToGematria(today);

document.getElementById('display-date').textContent = today.toLocaleDateString('pt-BR', {
  weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
});
document.getElementById('display-number').textContent  = number;
document.getElementById('display-meaning').textContent = formatMeaning(MEANINGS[number]);

fadeIn(document.getElementById('result'));

// ── Birthday card ─────────────────────────────────────────
const elForm           = document.getElementById('birthday-form');
const elBirthdayResult = document.getElementById('birthday-result');
const elInput          = document.getElementById('birthday-input');
const elSave           = document.getElementById('birthday-save');
const elEdit           = document.getElementById('birthday-edit');

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  showBirthdayResult(saved);
} else {
  fadeIn(document.getElementById('birthday-card'));
}

elSave.addEventListener('click', () => {
  const val = elInput.value; // 'YYYY-MM-DD'
  if (!val) return;
  localStorage.setItem(STORAGE_KEY, val);
  showBirthdayResult(val);
});

elEdit.addEventListener('click', () => {
  elBirthdayResult.hidden = true;
  elForm.hidden = false;
  elInput.value = localStorage.getItem(STORAGE_KEY) ?? '';
});

// ── Helpers ───────────────────────────────────────────────
function showBirthdayResult(isoDate) {
  // Parse as local date (avoid UTC offset shifting the day)
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

function fadeIn(el) {
  el.classList.remove('card--visible');
  requestAnimationFrame(() =>
    requestAnimationFrame(() => el.classList.add('card--visible'))
  );
}
