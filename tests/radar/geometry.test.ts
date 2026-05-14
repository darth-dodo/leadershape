import { describe, it, expect } from 'vitest';
import { normalizeScores, calculateAngles, mapToCartesian, radarPoints } from '@/radar/geometry';
import type { Scores } from '@/types';
import type { Point } from '@/types';

const baseScores: Scores = {
  coach: 0,
  architect: 0,
  shield: 0,
  catalyst: 0,
  operator: 0,
};

// ---------------------------------------------------------------------------
// normalizeScores
// ---------------------------------------------------------------------------
describe('normalizeScores', () => {
  it('normalizes scores relative to the max score', () => {
    const scores: Scores = { ...baseScores, coach: 10, architect: 5, operator: 2 };
    const result = normalizeScores(scores);
    // order: coach, architect, operator, catalyst, shield
    expect(result[0]).toBeCloseTo(1.0);   // coach  = 10/10
    expect(result[1]).toBeCloseTo(0.5);   // architect = 5/10
    expect(result[2]).toBeCloseTo(0.2);   // operator  = 2/10
    expect(result[3]).toBeCloseTo(0.0);   // catalyst  = 0/10
    expect(result[4]).toBeCloseTo(0.0);   // shield    = 0/10
  });

  it('returns all zeros when all scores are zero', () => {
    const result = normalizeScores(baseScores);
    expect(result).toEqual([0, 0, 0, 0, 0]);
  });

  it('maintains archetype order: coach, architect, operator, catalyst, shield', () => {
    const scores: Scores = {
      coach: 4,
      architect: 8,
      shield: 2,
      catalyst: 6,
      operator: 10,
    };
    const result = normalizeScores(scores);
    // max = 10 (operator)
    expect(result[0]).toBeCloseTo(0.4);  // coach
    expect(result[1]).toBeCloseTo(0.8);  // architect
    expect(result[2]).toBeCloseTo(1.0);  // operator
    expect(result[3]).toBeCloseTo(0.6);  // catalyst
    expect(result[4]).toBeCloseTo(0.2);  // shield
  });
});

// ---------------------------------------------------------------------------
// calculateAngles
// ---------------------------------------------------------------------------
describe('calculateAngles', () => {
  it('returns correct angles for 5 points', () => {
    const angles = calculateAngles(5);
    expect(angles).toHaveLength(5);
  });

  it('first angle is -π/2 (top of circle)', () => {
    const angles = calculateAngles(5);
    expect(angles[0]).toBeCloseTo(-Math.PI / 2);
  });

  it('angles are evenly spaced 2π/count apart', () => {
    const count = 5;
    const angles = calculateAngles(count);
    const step = (2 * Math.PI) / count;
    for (let i = 1; i < count; i++) {
      expect(angles[i]).toBeCloseTo(angles[i - 1] + step);
    }
  });

  it('works for counts other than 5', () => {
    const angles = calculateAngles(4);
    expect(angles).toHaveLength(4);
    expect(angles[0]).toBeCloseTo(-Math.PI / 2);
    expect(angles[1]).toBeCloseTo(-Math.PI / 2 + Math.PI / 2); // + π/2
  });
});

// ---------------------------------------------------------------------------
// mapToCartesian
// ---------------------------------------------------------------------------
describe('mapToCartesian', () => {
  const center: Point = { x: 100, y: 100 };
  const radius = 50;

  it('maps a point at the top (angle=-π/2, normalized=1) to center.x, center.y - radius', () => {
    const points = mapToCartesian([1], [-Math.PI / 2], radius, center);
    expect(points[0].x).toBeCloseTo(100);
    expect(points[0].y).toBeCloseTo(50); // center.y - radius
  });

  it('applies center offset correctly', () => {
    const points = mapToCartesian([1], [0], radius, center); // angle=0 → right
    expect(points[0].x).toBeCloseTo(150); // center.x + radius
    expect(points[0].y).toBeCloseTo(100); // center.y
  });

  it('zero normalized value maps point to center', () => {
    const points = mapToCartesian([0], [-Math.PI / 2], radius, center);
    expect(points[0].x).toBeCloseTo(100);
    expect(points[0].y).toBeCloseTo(100);
  });

  it('maps multiple points correctly', () => {
    const normalized = [1, 0.5];
    const angles = [-Math.PI / 2, 0]; // top, right
    const points = mapToCartesian(normalized, angles, radius, center);
    expect(points).toHaveLength(2);
    expect(points[0].y).toBeCloseTo(50);   // top: center.y - radius*1
    expect(points[1].x).toBeCloseTo(125);  // right: center.x + radius*0.5
  });
});

// ---------------------------------------------------------------------------
// radarPoints
// ---------------------------------------------------------------------------
describe('radarPoints', () => {
  const center: Point = { x: 100, y: 100 };
  const radius = 100;

  it('returns a non-empty SVG points string', () => {
    const scores: Scores = { ...baseScores, coach: 10 };
    const result = radarPoints(scores, radius, center);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns exactly 5 coordinate pairs separated by spaces', () => {
    const scores: Scores = { coach: 5, architect: 3, operator: 8, catalyst: 2, shield: 6 };
    const result = radarPoints(scores, radius, center);
    const pairs = result.trim().split(' ');
    expect(pairs).toHaveLength(5);
    for (const pair of pairs) {
      const [x, y] = pair.split(',');
      expect(Number.isFinite(parseFloat(x))).toBe(true);
      expect(Number.isFinite(parseFloat(y))).toBe(true);
    }
  });

  it('all zeros produces points at the center', () => {
    const result = radarPoints(baseScores, radius, center);
    const pairs = result.trim().split(' ');
    for (const pair of pairs) {
      const [x, y] = pair.split(',');
      expect(parseFloat(x)).toBeCloseTo(100);
      expect(parseFloat(y)).toBeCloseTo(100);
    }
  });

  it('points are in archetype order: coach, architect, operator, catalyst, shield', () => {
    // coach=max → first point should be at the top (center.y - radius)
    const scores: Scores = { ...baseScores, coach: 10 };
    const result = radarPoints(scores, radius, center);
    const pairs = result.trim().split(' ');
    const [x0, y0] = pairs[0].split(',').map(parseFloat);
    expect(x0).toBeCloseTo(100);
    expect(y0).toBeCloseTo(0); // center.y (100) - radius (100)
  });
});
