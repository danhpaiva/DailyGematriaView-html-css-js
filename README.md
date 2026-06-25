<div align="center">

# ✡️ Daily Gematria View

<p>
  <a href="https://danhpaiva.github.io/DailyGematriaView-html-css-js/">
    <img src="https://img.shields.io/badge/demo-live-d4a843?style=for-the-badge&logo=github" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/github/actions/workflow/status/danhpaiva/DailyGematriaView-html-css-js/deploy.yml?branch=main&style=for-the-badge&label=deploy&color=9b6fd4" alt="Deploy Status" />
  <img src="https://img.shields.io/github/license/danhpaiva/DailyGematriaView-html-css-js?style=for-the-badge&color=1e2d4a" alt="License" />
</p>

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/dependencies-zero-brightgreen?style=flat-square" alt="Zero dependencies" />
  <img src="https://img.shields.io/badge/build_step-none-brightgreen?style=flat-square" alt="No build step" />
</p>

<p><em>Calcula o número do dia via Redução Teosófica e exibe seu significado baseado no simbolismo numérico da tradição judaica.</em></p>

</div>

---

## Como funciona

A aplicação lê a data atual do sistema, soma todos os dígitos (dia + mês + ano) recursivamente até obter um único número de 1 a 9, e exibe o significado simbólico correspondente.

```
24 + 6 + 2026 = 2056
2 + 0 + 5 + 6 = 13
1 + 3 = 4  →  Dalet — Estabilidade e Portal
```

---

## Funcionalidades

- **Número do Dia** — redução teosófica da data atual
- **Número de Destino** — insira sua data de nascimento para calcular seu número pessoal (salvo em `localStorage`)
- **Compartilhar** — Web Share API no mobile, fallback para clipboard no desktop
- **Tema claro / escuro** — toggle ☀️ / 🌙 com transição suave; respeita `prefers-color-scheme` e persiste no `localStorage`

---

## Estrutura do projeto

```
├── index.html
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD → GitHub Pages (dispara só na main)
└── assets/
    ├── css/
    │   └── style.css           # Design tokens (dois temas), layout, animações Vanilla CSS
    └── js/
        ├── calculator.js       # Lógica pura: theosophicReduction, dateToGematria, MEANINGS
        ├── theme.js            # Toggle de tema claro/escuro + persistência em localStorage
        └── app.js              # Orquestra UI, localStorage e Web Share API
```

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura HTML5 semântica; inline script no `<head>` aplica o tema antes do render (zero flash) |
| `style.css` | Design tokens para temas escuro e claro, glassmorphism, borda `conic-gradient` animada via `@property`, starfield puro CSS |
| `calculator.js` | Funções puras exportáveis e dicionário `MEANINGS` imutável (`Object.freeze`) |
| `theme.js` | `getTheme()`, `applyTheme()`, `toggleTheme()`, `initThemeToggle()` — sem efeitos colaterais fora do DOM |
| `app.js` | Inicializa o tema, manipula o DOM, gerencia `localStorage` e compartilhamento |

---

## API — `calculator.js`

### `theosophicReduction(n: number): number`

```js
theosophicReduction(2056) // → 4
theosophicReduction(19)   // → 1
```

### `dateToGematria(date: Date): number`

```js
dateToGematria(new Date('2026-06-24')) // → 4
```

### `MEANINGS`

Objeto imutável com os 9 significados baseados na tradição judaica:

| # | Letra | Tema |
|:-:|---|---|
| 1 | Alef | Unidade Divina |
| 2 | Bet | Dualidade e Berakhah |
| 3 | Gimel | Bondade e Movimento |
| 4 | Dalet | Estabilidade e Portal |
| 5 | He | Divindade Revelada |
| 6 | Vav | Conexão e Completude |
| 7 | Zayin | Santificação e Descanso |
| 8 | Chet | Transcendência |
| 9 | Tet | Bondade Oculta |

---

## API — `theme.js`

| Função | Descrição |
|---|---|
| `getTheme()` | Retorna o tema ativo: `'dark'` ou `'light'` |
| `applyTheme(theme)` | Aplica o tema com transição suave de 450ms e salva no `localStorage` |
| `toggleTheme()` | Alterna entre `'dark'` e `'light'` |
| `initThemeToggle()` | Vincula o botão `#theme-toggle` ao toggle e sincroniza o `aria-label` |

---

## Design

Dois temas inspirados no **Templo de Salomão** (1 Reis 6–7 / 2 Crônicas 3–4):

### 🌑 Tema Escuro — Noite de Jerusalém

| Token | Valor | Referência |
|---|---|---|
| `--color-bg` | `#07080f` | Noite do deserto de Judá |
| `--color-surface` | `rgba(14,18,32,.78)` | Pedra calcária à noite |
| `--color-border` | `#1e2d4a` | Azul *tekhelet* dos véus |
| `--color-accent` | `#d4a843` | Ouro do *Kodesh HaKodashim* |
| `--color-destiny` | `#9b6fd4` | Púrpura *argamán* real |
| `--color-text` | `#f0e6cc` | Marfim / linho sacerdotal |

### ☀️ Tema Claro — Pergaminho do Templo

| Token | Valor | Referência |
|---|---|---|
| `--color-bg` | `#f2e8cc` | Pergaminho envelhecido |
| `--color-surface` | `rgba(255,250,236,.82)` | Papiro à luz do dia |
| `--color-border` | `#c4a040` | Ouro aquecido pelo sol |
| `--color-accent` | `#8a5f0e` | Ouro profundo, legível no claro |
| `--color-destiny` | `#5c2888` | Púrpura *argamán* profunda |
| `--color-text` | `#1c1814` | Tinta sobre pergaminho |

### Técnicas Vanilla CSS aplicadas

| Técnica | Efeito |
|---|---|
| `@property --border-angle` | Ângulo animável (CSS Houdini) para borda `conic-gradient` |
| `backdrop-filter: blur(24px)` | Glassmorphism real sobre o fundo |
| `radial-gradient` em 24 camadas | Starfield (escuro) e partículas douradas (claro) |
| `background-clip: text` | Gradient shimmer animado no título |
| `text-shadow` multicamada + `@keyframes` | Glow pulsante nos números |
| `.theme-transitioning *` | Transição suave de 450ms entre temas sem flash |
| `prefers-reduced-motion` | Desativa animações para acessibilidade |
| **Cinzel** + **Crimson Pro** | Tipografia de inscrição romana/hebraica |

---

## Como executar localmente

```bash
# Node.js
npx serve .

# Python
python -m http.server 3000
```

> Não abra via `file://` — módulos ES6 (`type="module"`) exigem servidor HTTP.

---

## Deploy

O deploy é automatizado via **GitHub Actions** — qualquer push na `main` publica no GitHub Pages.

Para configurar pela primeira vez:
1. **Settings → Pages → Source** → selecione **GitHub Actions**
2. Faça push na `main` — o workflow `deploy.yml` cuida do resto

---

## Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white)

---

<div align="center">
  <sub>Sem frameworks · Sem dependências · Sem build step</sub>
</div>
