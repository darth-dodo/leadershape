export type ArchetypeKey = 'coach' | 'architect' | 'shield' | 'catalyst' | 'operator';

export type Phase = 'intro' | 'play' | 'result';

export type Scores = Record<ArchetypeKey, number>;

export interface Style {
  name: string;
  emoji: string;
  color: string;
  short: string;
  desc: string;
  strengths: string[];
  watchOuts: string[];
  reading: string;
  questions: string[];
}

export interface Choice {
  text: string;
  scores: Partial<Scores>;
  next: string;
}

export interface Scenario {
  id: string;
  title: string;
  scene: string;
  question: string;
  choices: Choice[];
}

export interface ComboInsight {
  label: string;
  insight: string;
}

export interface Reference {
  title: string;
  author: string;
  year: number;
  note: string;
}

export interface Framework {
  name: string;
  source: string;
  desc: string;
}

export interface Distribution {
  pct: number;
  rank: string;
}

export const ARCHETYPE_KEYS: ArchetypeKey[] = [
  'coach',
  'architect',
  'shield',
  'catalyst',
  'operator',
];
