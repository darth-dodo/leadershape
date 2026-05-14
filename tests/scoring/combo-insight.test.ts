import { describe, it, expect } from 'vitest';
import { getComboInsight } from '@/scoring/combo-insight';
import type { ArchetypeKey } from '@/types';

describe('getComboInsight', () => {
  it('returns null when only one style is provided', () => {
    const result = getComboInsight([['coach', 10]]);
    expect(result).toBeNull();
  });

  it('returns null when topStyles is empty', () => {
    const result = getComboInsight([]);
    expect(result).toBeNull();
  });

  it('finds a combo insight using the canonical key order (k1_k2)', () => {
    // coach_operator exists in COMBO_INSIGHTS
    const result = getComboInsight([['coach', 10], ['operator', 6]]);
    expect(result).not.toBeNull();
    expect(result?.label).toBe('The Accountable Developer');
  });

  it('finds a combo insight when keys are in reverse order (k2_k1)', () => {
    // COMBO_INSIGHTS only has coach_operator, not operator_coach
    const result = getComboInsight([['operator', 10], ['coach', 6]]);
    expect(result).not.toBeNull();
    expect(result?.label).toBe('The Accountable Developer');
  });

  it('returns null for an unknown combination', () => {
    // no entry exists for any pair involving two identical keys or an invalid pair
    const result = getComboInsight([['coach', 10], ['coach', 6]] as [ArchetypeKey, number][]);
    expect(result).toBeNull();
  });

  it('finds coach_architect combo', () => {
    const result = getComboInsight([['coach', 9], ['architect', 6]]);
    expect(result).not.toBeNull();
    expect(result?.label).toBe('The Org Builder');
  });

  it('finds catalyst_operator combo regardless of order', () => {
    const result = getComboInsight([['operator', 8], ['catalyst', 7]]);
    expect(result).not.toBeNull();
    expect(result?.label).toBe('The High-Trust Executor');
  });
});
