import { STYLES } from '@/data/styles';
import type { ArchetypeKey, Scores } from '@/types';

const BAR_LENGTH = 10;

function buildBar(pct: number): string {
  const filled = Math.round((pct / 100) * BAR_LENGTH);
  return '█'.repeat(filled) + '░'.repeat(BAR_LENGTH - filled);
}

export function generateShareText(
  topStyles: [ArchetypeKey, number][],
  scores: Scores
): string {
  const [primaryKey] = topStyles[0];
  const primary = STYLES[primaryKey];

  // Build header
  let header = `${primary.emoji} My engineering leadership style: ${primary.name}`;
  if (topStyles.length >= 2) {
    const secondaryKey = topStyles[1][0];
    const secondary = STYLES[secondaryKey];
    header += ` with ${secondary.name} tendencies`;
  }

  // Sort all scores descending
  const sorted = (Object.entries(scores) as [ArchetypeKey, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const maxScore = sorted[0][1];

  // Build bars
  const bars = sorted.map(([key, score]) => {
    const pct = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);
    const bar = buildBar(pct);
    const name = STYLES[key].name.replace('The ', '');
    return `${bar} ${name} ${pct}%`;
  });

  const footer = "10 real scenarios. No right answers. What's your style?";

  return [header, '', ...bars, '', footer].join('\n');
}
