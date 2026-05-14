import { describe, it, expect } from 'vitest';
import { getTopStyles } from '@/scoring/top-styles';
import type { Scores } from '@/types';

const baseScores: Scores = {
  coach: 0,
  architect: 0,
  shield: 0,
  catalyst: 0,
  operator: 0,
};

describe('getTopStyles', () => {
  it('returns the primary style with the highest score', () => {
    const scores: Scores = { ...baseScores, coach: 10, architect: 3 };
    const result = getTopStyles(scores);
    expect(result[0][0]).toBe('coach');
    expect(result[0][1]).toBe(10);
  });

  it('includes secondary style when it is >= 55% of primary', () => {
    // 6 >= 10 * 0.55 = 5.5  → include
    const scores: Scores = { ...baseScores, coach: 10, architect: 6 };
    const result = getTopStyles(scores);
    expect(result).toHaveLength(2);
    expect(result[1][0]).toBe('architect');
    expect(result[1][1]).toBe(6);
  });

  it('excludes secondary style when it is < 55% of primary', () => {
    // 5 < 10 * 0.55 = 5.5  → exclude
    const scores: Scores = { ...baseScores, coach: 10, architect: 5 };
    const result = getTopStyles(scores);
    expect(result).toHaveLength(1);
    expect(result[0][0]).toBe('coach');
  });

  it('returns only primary when all other scores are zero', () => {
    const scores: Scores = { ...baseScores, catalyst: 7 };
    const result = getTopStyles(scores);
    expect(result).toHaveLength(1);
    expect(result[0][0]).toBe('catalyst');
  });

  it('handles all zeros gracefully by returning the first sorted entry', () => {
    const result = getTopStyles(baseScores);
    expect(result).toHaveLength(1);
    expect(result[0][1]).toBe(0);
  });

  it('returns both styles when there is a tie (second equals 100% of primary)', () => {
    // exact tie: second is 100% of primary, which is >= 55%
    const scores: Scores = { ...baseScores, coach: 8, architect: 8 };
    const result = getTopStyles(scores);
    expect(result).toHaveLength(2);
    expect(result[0][1]).toBe(8);
    expect(result[1][1]).toBe(8);
  });

  it('returns results sorted descending by score', () => {
    const scores: Scores = {
      coach: 3,
      architect: 10,
      shield: 7,
      catalyst: 1,
      operator: 2,
    };
    const result = getTopStyles(scores);
    expect(result[0][0]).toBe('architect');
    expect(result[0][1]).toBe(10);
    expect(result[1][0]).toBe('shield');
  });
});
