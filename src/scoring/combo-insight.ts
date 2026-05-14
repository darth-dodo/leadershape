import type { ArchetypeKey, ComboInsight } from '@/types';
import { COMBO_INSIGHTS } from '@/data/combos';

export function getComboInsight(
  topStyles: [ArchetypeKey, number][]
): ComboInsight | null {
  if (topStyles.length < 2) return null;

  const [k1, k2] = [topStyles[0][0], topStyles[1][0]];

  return (
    COMBO_INSIGHTS[`${k1}_${k2}`] ??
    COMBO_INSIGHTS[`${k2}_${k1}`] ??
    null
  );
}
