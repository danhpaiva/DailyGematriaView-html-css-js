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
- **Paleta Templo de Salomão** — azul *tekhelet*, ouro do *Kodesh HaKodashim* e púrpura *argamán*

---

## Estrutura do projeto

```
├── index.html
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD → GitHub Pages (dispara só na main)
└── assets/
    ├── css/
    │   └── style.css           # Design tokens + layout + animações
    └── js/
        ├── calculator.js       # Lógica pura: theosophicReduction, dateToGematria, MEANINGS
        └── app.js              # Manipulação de DOM, localStorage, Web Share API
```

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura HTML5 semântica, carrega `app.js` como módulo ES6 |
| `style.css` | Variáveis CSS (*design tokens*), Flexbox, tipografia, fade-in |
| `calculator.js` | Funções puras exportáveis e dicionário `MEANINGS` imutável (`Object.freeze`) |
| `app.js` | Orquestra UI, `localStorage` e compartilhamento |

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

## Design

Paleta inspirada no **Templo de Salomão** (1 Reis 6–7 / 2 Crônicas 3–4):

| Token | Valor | Referência |
|---|---|---|
| `--color-bg` | `#07080f` | Noite do deserto de Judá |
| `--color-surface` | `#0e1220` | Pedra calcária à noite |
| `--color-border` | `#1e2d4a` | Azul *tekhelet* dos véus |
| `--color-accent` | `#d4a843` | Ouro do *Kodesh HaKodashim* |
| `--color-destiny` | `#9b6fd4` | Púrpura *argamán* real |
| `--color-text` | `#f0e6cc` | Marfim / linho sacerdotal |

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
