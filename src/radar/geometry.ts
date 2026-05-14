import type { ArchetypeKey, Scores, Point } from '@/types';

export const RADAR_ARCHETYPE_ORDER: ArchetypeKey[] = [
  'coach',
  'architect',
  'operator',
  'catalyst',
  'shield',
];

export const RADAR_START_ANGLE = -Math.PI / 2;

/**
 * Convert scores to 0-1 range relative to the max score.
 * Order follows RADAR_ARCHETYPE_ORDER.
 * If max is 0, returns all zeros.
 */
export function normalizeScores(scores: Scores): number[] {
  const values = RADAR_ARCHETYPE_ORDER.map((key) => scores[key]);
  const max = Math.max(...values);
  if (max === 0) {
    return values.map(() => 0);
  }
  return values.map((v) => v / max);
}

/**
 * Return angles in radians for `count` evenly-distributed points.
 * Starts at the top (-π/2) and proceeds clockwise.
 */
export function calculateAngles(count: number): number[] {
  const step = (2 * Math.PI) / count;
  return Array.from({ length: count }, (_, i) => RADAR_START_ANGLE + i * step);
}

/**
 * Convert parallel arrays of normalized values and angles to cartesian Points.
 * Each point is offset by `center` and scaled by `radius * normalized[i]`.
 */
export function mapToCartesian(
  normalized: number[],
  angles: number[],
  radius: number,
  center: Point
): Point[] {
  return normalized.map((n, i) => ({
    x: center.x + radius * n * Math.cos(angles[i]),
    y: center.y + radius * n * Math.sin(angles[i]),
  }));
}

/**
 * Compose normalizeScores → calculateAngles → mapToCartesian and return
 * an SVG polygon points string: "x1,y1 x2,y2 ...".
 */
export function radarPoints(scores: Scores, radius: number, center: Point): string {
  const normalized = normalizeScores(scores);
  const angles = calculateAngles(normalized.length);
  const points = mapToCartesian(normalized, angles, radius, center);
  return points.map((p) => `${p.x},${p.y}`).join(' ');
}
