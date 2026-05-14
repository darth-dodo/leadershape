import { describe, it, expect } from 'vitest';
import { generateShareText } from '@/sharing/format';
import type { ArchetypeKey, Scores } from '@/types';

const baseScores: Scores = {
  coach: 0,
  architect: 0,
  shield: 0,
  catalyst: 0,
  operator: 0,
};

describe('generateShareText', () => {
  it('generates correct header with primary style only', () => {
    const topStyles: [ArchetypeKey, number][] = [['coach', 10]];
    const scores: Scores = { ...baseScores, coach: 10 };

    const result = generateShareText(topStyles, scores);

    expect(result).toContain('🪞 My engineering leadership style: The Coach');
    expect(result).not.toContain('tendencies');
  });

  it('generates correct header with primary and secondary style', () => {
    const topStyles: [ArchetypeKey, number][] = [
      ['coach', 10],
      ['architect', 6],
    ];
    const scores: Scores = { ...baseScores, coach: 10, architect: 6 };

    const result = generateShareText(topStyles, scores);

    expect(result).toContain(
      '🪞 My engineering leadership style: The Coach with The Architect tendencies'
    );
  });

  it('creates percentage bars relative to max score', () => {
    const topStyles: [ArchetypeKey, number][] = [['coach', 10]];
    const scores: Scores = {
      coach: 10,
      architect: 6,
      shield: 2,
      catalyst: 1,
      operator: 1,
    };

    const result = generateShareText(topStyles, scores);

    // coach is max (10 / 10 = 100%) → 10 filled blocks
    expect(result).toContain('██████████ Coach 100%');
    // architect: 6 / 10 = 60% → 6 filled, 4 empty
    expect(result).toContain('██████░░░░ Architect 60%');
    // shield: 2 / 10 = 20% → 2 filled, 8 empty
    expect(result).toContain('██░░░░░░░░ Shield 20%');
    // catalyst: 1 / 10 = 10% → 1 filled, 9 empty
    expect(result).toContain('█░░░░░░░░░ Catalyst 10%');
    // operator: 1 / 10 = 10% → 1 filled, 9 empty
    expect(result).toContain('█░░░░░░░░░ Operator 10%');
  });

  it('sorts bars descending by score', () => {
    const topStyles: [ArchetypeKey, number][] = [['architect', 8]];
    const scores: Scores = {
      coach: 3,
      architect: 8,
      shield: 5,
      catalyst: 1,
      operator: 2,
    };

    const result = generateShareText(topStyles, scores);
    const lines = result.split('\n');

    // Find the bar section lines
    const architectLine = lines.findIndex((l) => l.includes('Architect'));
    const coachLine = lines.findIndex((l) => l.includes('Coach'));
    const shieldLine = lines.findIndex((l) => l.includes('Shield'));

    expect(architectLine).toBeLessThan(shieldLine);
    expect(shieldLine).toBeLessThan(coachLine);
  });

  it('handles all zero scores by showing 0% for all', () => {
    const topStyles: [ArchetypeKey, number][] = [['coach', 0]];
    const scores: Scores = { ...baseScores };

    const result = generateShareText(topStyles, scores);

    // All scores are 0, so all bars should show 0% with 10 empty blocks
    expect(result).toContain('░░░░░░░░░░ Coach 0%');
    expect(result).toContain('░░░░░░░░░░ Architect 0%');
    expect(result).toContain('░░░░░░░░░░ Shield 0%');
    expect(result).toContain('░░░░░░░░░░ Catalyst 0%');
    expect(result).toContain('░░░░░░░░░░ Operator 0%');
  });

  it('includes the footer text', () => {
    const topStyles: [ArchetypeKey, number][] = [['coach', 5]];
    const scores: Scores = { ...baseScores, coach: 5 };

    const result = generateShareText(topStyles, scores);

    expect(result).toContain('10 real scenarios. No right answers. What\'s your style?');
  });
});
