import type { Phase, Scores, Choice, Scenario, Style, ArchetypeKey, ComboInsight } from '@/types';
import { ARCHETYPE_KEYS } from '@/types';
import { STYLES, SCENARIOS, ICONS } from '@/data';
import { getTopStyles, getComboInsight, TOTAL_SCENARIOS } from '@/scoring';
import { generateShareText, copyToClipboard } from '@/sharing';

interface QuizState {
  phase: Phase;
  scores: Scores;
  currentId: string;
  choiceCount: number;
  copied: boolean;
  showRefs: boolean;
  theme: 'dark' | 'light';
}

function createInitialScores(): Scores {
  return {
    coach: 0,
    architect: 0,
    shield: 0,
    catalyst: 0,
    operator: 0,
  };
}

function resolveInitialTheme(): 'dark' | 'light' {
  const saved = localStorage.getItem('leadershape-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function quiz() {
  return {
    // State
    phase: 'intro' as Phase,
    scores: createInitialScores(),
    currentId: 'start',
    choiceCount: 0,
    copied: false,
    showRefs: false,
    theme: 'dark' as 'dark' | 'light',

    // Exposed data for templates
    styles: STYLES,
    icons: ICONS,
    archetypeKeys: ARCHETYPE_KEYS,
    totalScenarios: TOTAL_SCENARIOS,

    // Getters
    get scenario(): Scenario | undefined {
      return SCENARIOS.find((s) => s.id === this.currentId);
    },

    get maxScore(): number {
      const values = Object.values(this.scores) as number[];
      const max = Math.max(...values);
      return max < 1 ? 1 : max;
    },

    get topStyles(): [ArchetypeKey, number][] {
      return getTopStyles(this.scores);
    },

    get primary(): Style | null {
      const top = this.topStyles;
      if (top.length === 0) return null;
      return STYLES[top[0][0]];
    },

    get secondary(): Style | null {
      const top = this.topStyles;
      if (top.length < 2) return null;
      return STYLES[top[1][0]];
    },

    get combo(): ComboInsight | null {
      return getComboInsight(this.topStyles);
    },

    // Lifecycle
    init() {
      const t = resolveInitialTheme();
      this.theme = t;
      document.documentElement.dataset.theme = t;
    },

    // Actions
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = this.theme;
      localStorage.setItem('leadershape-theme', this.theme);
    },

    start() {
      this.phase = 'play';
    },

    handleChoice(choice: Choice) {
      // Add choice scores to current scores
      for (const [key, value] of Object.entries(choice.scores)) {
        if (value !== undefined) {
          this.scores[key as ArchetypeKey] += value;
        }
      }

      // Increment choice count
      this.choiceCount++;

      // Navigate to next scenario or end
      if (choice.next === 'finale') {
        this.phase = 'result';
      } else {
        this.currentId = choice.next;
      }
    },

    reset() {
      this.phase = 'intro';
      this.scores = createInitialScores();
      this.currentId = 'start';
      this.choiceCount = 0;
      this.copied = false;
      this.showRefs = false;
    },

    async copyResults() {
      const text = generateShareText(this.topStyles, this.scores);
      await copyToClipboard(text);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2500);
    },
  };
}
