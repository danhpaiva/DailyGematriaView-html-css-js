/**
 * Theosophic reduction: sum all digits of n recursively
 * until the result is a single digit (1–9).
 *
 * Pure function — no side effects, fully testable.
 *
 * @param {number} n - positive integer
 * @returns {number} single digit 1–9
 */
export function theosophicReduction(n) {
  if (n < 10) return n === 0 ? 9 : n; // treat 0 as 9 (edge case: sum = 9 → digit 0)
  const sum = String(n)
    .split('')
    .reduce((acc, d) => acc + Number(d), 0);
  return theosophicReduction(sum);
}

/**
 * Derives the theosophic number from a Date object
 * by summing day + month + all four year digits.
 *
 * @param {Date} date
 * @returns {number} single digit 1–9
 */
export function dateToGematria(date) {
  const day   = date.getDate();
  const month = date.getMonth() + 1;
  const year  = date.getFullYear();
  return theosophicReduction(day + month + year);
}

/**
 * Symbolic meanings based on Jewish numerological tradition.
 * Keys 1–9, each entry has a title and a description.
 */
export const MEANINGS = Object.freeze({
  1: {
    title: 'Alef — Unidade Divina',
    text: 'Representa o Ein Sof, a unicidade absoluta de Deus. É o princípio de toda criação, o Uno que contém o infinito. Simboliza liderança, originalidade e o impulso primordial da existência.',
  },
  2: {
    title: 'Bet — Dualidade e Berakhah',
    text: 'A primeira letra da Torah (Bereshit). Simboliza a dualidade: Céu e Terra, espírito e matéria, homem e mulher. Representa bênção, parceria e a tensão criativa entre opostos.',
  },
  3: {
    title: 'Gimel — Bondade e Movimento',
    text: 'Associado à Chesed (bondade) e ao camelo que atravessa o deserto, símbolo de generosidade. Representa crescimento, harmonia, e a tríade sagrada: Deus, Torah e Israel.',
  },
  4: {
    title: 'Dalet — Estabilidade e Portal',
    text: 'A porta (delet) entre os mundos. Simboliza humildade, estrutura e fundamento. Remete às quatro direções, às quatro letras do Nome Divino (YHVH) e à solidez da manifestação.',
  },
  5: {
    title: 'He — Divindade Revelada',
    text: 'Letra do nome de Deus (YHVH), associada à revelação e à graça divina. Representa os cinco livros da Torah, os cinco sentidos e a capacidade humana de elevar o material ao espiritual.',
  },
  6: {
    title: 'Vav — Conexão e Completude',
    text: 'O gancho que une o Céu à Terra. Simboliza a harmonia, a criação em seis dias e o homem como elo entre o divino e o físico. Representa amor, beleza e equilíbrio nas relações.',
  },
  7: {
    title: 'Zayin — Santificação e Descanso',
    text: 'O número sagrado do Shabbat e da Menorá de sete ramos. Representa completude espiritual, sabedoria interior e o ciclo sagrado do tempo. É o número da perfeição e da introspecção.',
  },
  8: {
    title: 'Chet — Transcendência',
    text: 'Um além do sete, transgride os limites da natureza. Associado à Brit Milah (oitavo dia) e à eternidade. Representa renovação, milagre e a capacidade de superar os ciclos naturais.',
  },
  9: {
    title: 'Tet — Bondade Oculta',
    text: 'A bondade escondida (tov nistar). Representa a gestação, o fruto que amadurece em nove meses, e a verdade que se revela gradualmente. Simboliza introspecção, finalização e sabedoria acumulada.',
  },
});
