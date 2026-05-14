import type { ArchetypeKey, Scores } from '@/types';
import { SECONDARY_THRESHOLD } from './constants';

export function getTopStyles(scores: Scores): [ArchetypeKey, number][] {
  const sorted = (Object.entries(scores) as [ArchetypeKey, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const [primary, secondary] = sorted;
  const result: [ArchetypeKey, number][] = [primary];

  if (secondary && primary[1] > 0 && secondary[1] >= primary[1] * SECONDARY_THRESHOLD) {
    result.push(secondary);
  }

  return result;
}
