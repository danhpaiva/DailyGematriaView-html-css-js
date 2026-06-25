const STORAGE_KEY  = 'gematria_theme';
const TRANSITION_MS = 450;

/**
 * Lê o tema atual do atributo data-theme do <html>.
 * @returns {'dark'|'light'}
 */
export function getTheme() {
  return document.documentElement.getAttribute('data-theme') ?? 'dark';
}

/**
 * Aplica um tema com transição suave.
 * @param {'dark'|'light'} theme
 */
export function applyTheme(theme) {
  const html = document.documentElement;

  // Habilita transições em todos os elementos por um ciclo
  html.classList.add('theme-transitioning');
  html.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);

  setTimeout(
    () => html.classList.remove('theme-transitioning'),
    TRANSITION_MS,
  );
}

/**
 * Alterna entre 'dark' e 'light'.
 */
export function toggleTheme() {
  applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

/**
 * Inicializa o botão de toggle e sincroniza o ícone com o tema atual.
 */
export function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  // Sincroniza ícone ao carregar
  syncIcon(btn, getTheme());

  btn.addEventListener('click', () => {
    toggleTheme();
    syncIcon(btn, getTheme());
  });
}

function syncIcon(btn, theme) {
  // Visibilidade controlada por CSS via data-theme,
  // mas atualizamos aria-label para acessibilidade
  btn.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro',
  );
}
