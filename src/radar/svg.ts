import type { Scores, Point } from '@/types';
import { STYLES } from '@/data/styles';
import { RADAR_ARCHETYPE_ORDER, calculateAngles, mapToCartesian, normalizeScores } from './geometry';

const SIZE = 200;
const CENTER: Point = { x: SIZE / 2, y: SIZE / 2 };
const RADIUS = 80;
const LABEL_RADIUS = RADIUS + 20;

function polygonPoints(values: number[], radius: number): string {
  const angles = calculateAngles(values.length);
  const points = mapToCartesian(values, angles, radius, CENTER);
  return points.map((p) => `${p.x},${p.y}`).join(' ');
}

function gridRings(): string {
  const levels = [0.25, 0.5, 0.75, 1];
  return levels
    .map((level) => {
      const full = Array(5).fill(level);
      return `<polygon points="${polygonPoints(full, RADIUS)}" class="radar__ring"/>`;
    })
    .join('\n');
}

function axisLines(): string {
  const angles = calculateAngles(5);
  return angles
    .map((angle) => {
      const x = CENTER.x + RADIUS * Math.cos(angle);
      const y = CENTER.y + RADIUS * Math.sin(angle);
      return `<line x1="${CENTER.x}" y1="${CENTER.y}" x2="${x}" y2="${y}" class="radar__axis"/>`;
    })
    .join('\n');
}

function labels(): string {
  const angles = calculateAngles(5);
  return RADAR_ARCHETYPE_ORDER.map((key, i) => {
    const angle = angles[i];
    const x = CENTER.x + LABEL_RADIUS * Math.cos(angle);
    const y = CENTER.y + LABEL_RADIUS * Math.sin(angle);
    const style = STYLES[key];
    const anchor = x < CENTER.x - 5 ? 'end' : x > CENTER.x + 5 ? 'start' : 'middle';
    const dy = y < CENTER.y ? '-0.3em' : y > CENTER.y + 5 ? '1em' : '0.35em';
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" dy="${dy}" class="radar__label" fill="${style.color}">${style.name}</text>`;
  }).join('\n');
}

function dataPolygon(scores: Scores, color: string): string {
  const normalized = normalizeScores(scores);
  const points = polygonPoints(normalized, RADIUS);
  return `<polygon points="${points}" class="radar__data" style="fill: ${color}20; stroke: ${color}"/>`;
}

function dataPoints(scores: Scores, color: string): string {
  const normalized = normalizeScores(scores);
  const angles = calculateAngles(5);
  const points = mapToCartesian(normalized, angles, RADIUS, CENTER);
  return points
    .map((p) => `<circle cx="${p.x}" cy="${p.y}" r="4" class="radar__point" style="fill: ${color}"/>`)
    .join('\n');
}

export function generateRadarSVG(scores: Scores, primaryColor: string): string {
  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" class="radar">
  ${gridRings()}
  ${axisLines()}
  ${dataPolygon(scores, primaryColor)}
  ${dataPoints(scores, primaryColor)}
  ${labels()}
</svg>`;
}
