# Daily Gematria View

Uma Single Page Application minimalista que calcula o número do dia via **Redução Teosófica** e exibe seu significado baseado no simbolismo numérico da tradição judaica.

> Hospedado via GitHub Pages — sem dependências de runtime, sem build step.

---

## Demonstração

A aplicação lê a data atual do sistema, soma todos os dígitos (dia + mês + ano) recursivamente até obter um único número de 1 a 9, e exibe o significado simbólico correspondente.

**Exemplo — 24/06/2026:**
```
24 + 6 + 2026 = 2056
2 + 0 + 5 + 6 = 13
1 + 3 = 4  →  Dalet — Estabilidade e Portal
```

---

## Estrutura do projeto

```
├── index.html       # Esqueleto semântico (sem lógica inline)
├── style.css        # Design tokens + layout + animações
├── calculator.js    # Lógica pura: redução teosófica e dicionário de significados
└── app.js           # Manipulação de DOM e orquestração da UI
```

### Separação de responsabilidades

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura HTML5 semântica, carrega `app.js` como módulo ES6 |
| `style.css` | Variáveis CSS, Flexbox, tipografia, fade-in via classe `.card--visible` |
| `calculator.js` | Funções puras exportáveis (`theosophicReduction`, `dateToGematria`) e dicionário `MEANINGS` imutável (`Object.freeze`) |
| `app.js` | Lê a data, chama o calculator, popula o DOM, dispara a animação com `requestAnimationFrame` |

---

## API do módulo `calculator.js`

### `theosophicReduction(n: number): number`

Reduz recursivamente um inteiro positivo somando seus dígitos até obter um valor entre 1 e 9.

```js
theosophicReduction(2056) // → 4
theosophicReduction(9)    // → 9
theosophicReduction(19)   // → 1
```

### `dateToGematria(date: Date): number`

Extrai dia, mês e ano de um objeto `Date` e aplica a redução teosófica.

```js
dateToGematria(new Date('2026-06-24')) // → 4
```

### `MEANINGS`

Objeto imutável com os significados dos números 1–9 baseados na tradição judaica. Cada chave contém `{ title: string, text: string }`.

| Número | Letra | Tema |
|---|---|---|
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

- **Tema:** dark minimalista (fundo `#0d0d0d`, dourado `#c9a84c`)
- **Tipografia:** serif (Georgia) para títulos e conteúdo, sans-serif do sistema para labels
- **Layout:** Flexbox centralizado, card com `max-width: 480px`
- **Animação:** fade-in com `opacity` + `translateY` via `requestAnimationFrame` duplo
- **Responsividade:** `clamp()` no título, ajuste de padding em viewports abaixo de 360px

---

## Como executar localmente

O projeto não possui build step. Qualquer servidor HTTP estático funciona:

```bash
# Com Node.js
npx serve .

# Com Python
python -m http.server 3000
```

> Não abra o `index.html` diretamente via `file://` — os módulos ES6 (`type="module"`) exigem um servidor HTTP para carregar corretamente.

---

## Deploy no GitHub Pages

1. Acesse **Settings → Pages** no repositório
2. Em *Source*, selecione a branch `main` e a pasta `/ (root)`
3. Salve — o GitHub Pages servirá o `index.html` automaticamente

---

## Tecnologias

- HTML5 semântico
- CSS3 (Custom Properties, Flexbox, `clamp()`, `dvh`)
- JavaScript ES6+ (módulos, arrow functions, `Object.freeze`, `requestAnimationFrame`)
- Sem frameworks, sem dependências, sem build
