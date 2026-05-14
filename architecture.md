# Architecture: LeaderShape

Technical implementation guide for the leadership style assessment.

## Clean Code Principles

### Naming Conventions

**✅ Domain language** - names match product terminology:
- Types: `ArchetypeKey`, `ComboInsight`, `Scenario`
- Functions: `getTopStyles(scores)`, `getComboInsight(styles)`

**❌ Avoid generic names:**
- `calculate(data)`, `getResult(arr)`, `StyleType`

| Category | Convention | Example |
|----------|------------|---------|
| Types | PascalCase, noun | `Scenario`, `ComboInsight` |
| Functions | camelCase, verb+noun | `handleChoice`, `generateShareText` |
| Predicates | is/has/can prefix | `isSecondaryStyle`, `hasComboInsight` |
| Constants | SCREAMING_SNAKE | `ARCHETYPE_KEYS`, `TOTAL_SCENARIOS` |
| Files | kebab-case | `combo-insights.ts`, `share-utils.ts` |

### Single Responsibility

Each file/function does ONE thing:

**✅ Separated concerns:**
- `scoring.ts` → only `getTopStyles`, `getComboInsight`, `calculatePercentage`
- `sharing.ts` → only `generateShareText`, `copyToClipboard`

**❌ Mixed concerns:**
- `utils.ts` → `getTopStylesAndGenerateShareTextAndCopy` (does everything)

### Pure Functions

Same input → same output, no side effects.

**✅ Pure:**
```
getTopStyles(scores) →
  sorted = sort scores descending
  primary = first of sorted
  secondary = second of sorted
  threshold = primary.value × 0.55
  
  IF secondary.value >= threshold
    RETURN [primary, secondary]
  ELSE
    RETURN [primary]
```

**❌ Impure:**
- Reads from `globalScores` (external state)
- Calls `console.log` (side effect)
- Mutates `lastCalculation` (mutation)

### Small Functions (< 20 lines)

Break down complex logic into composed functions:

**✅ Composed:**
```
radarPoints(scores, radius, center) →
  normalized = normalizeScores(scores)
  angles = calculateAngles(5)
  points = mapToCartesian(normalized, angles, radius, center)
  RETURN pointsToSvgPath(points)
```

**❌ Monolithic:** 30+ lines doing normalization, angle calc, and SVG in one function

### Early Returns

Handle edge cases first, reduce nesting:

**✅ Flat structure:**
```
getComboInsight(topStyles) →
  IF length < 2: RETURN null
  
  k1 = first key
  k2 = second key
  
  RETURN lookup(k1 + "_" + k2) OR lookup(k2 + "_" + k1) OR null
```

**❌ Nested:** Multiple levels of if/else/if/else

### Type Safety

- No `any` types
- Explicit return types on all functions
- Use `Partial<Scores>` for optional score mappings

### Constants Over Magic Values

**✅ Named:** `SECONDARY_THRESHOLD = 0.55`

**❌ Magic:** `primary[1] * 0.55` with no explanation

### Immutability

Never mutate inputs - always return new objects:

**✅ Immutable:**
```
handleChoice(choice, scores) →
  updated = copy of scores
  FOR each (key, value) in choice.scores:
    updated[key] += value
  RETURN updated
```

**❌ Mutation:** Modifying `scores` directly

### Error Boundaries

Fail fast in development:

```
getScenario(id, scenarios) →
  found = find scenario where id matches
  IF not found: THROW "Scenario not found: {id}"
  RETURN found
```

### No Comments Needed

Code should be self-documenting:

**✅ Self-documenting:**
```
SECONDARY_THRESHOLD = 0.55

isSecondaryStyle(secondaryScore, primaryScore) →
  RETURN secondaryScore >= primaryScore × SECONDARY_THRESHOLD
```

**❌ Needs comment:** `check(s, p) → s >= p * 0.55`

### Folder-by-Feature

**✅ Feature-based:**
```
src/
├── quiz/         → state, actions, computed
├── scoring/      → calculate, thresholds
├── sharing/      → format, clipboard
├── radar/        → geometry, svg
└── data/         → styles, scenarios, combos
```

**❌ Layer-based:** `components/`, `utils/`, `helpers/`, `services/`

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Reactivity | Alpine.js 3.x | Declarative, 15KB, no virtual DOM |
| Language | TypeScript 5.x | Type safety for nested data |
| Build | Vite 5.x | Fast HMR, native ES modules |
| Styling | Vanilla CSS | CSS variables, no framework needed |
| Charts | Hand-rolled SVG | Radar chart is simple geometry |

---

## File Structure

```
leadershape/
├── index.html
├── src/
│   ├── main.ts              → Alpine.start() only
│   ├── types.ts             → All interfaces
│   │
│   ├── quiz/                → Quiz feature
│   │   ├── index.ts         → Alpine.data registration
│   │   ├── state.ts         → Initial state factory
│   │   ├── actions.ts       → handleChoice, reset, start
│   │   └── computed.ts      → scenario, topStyles, combo
│   │
│   ├── scoring/             → Scoring domain
│   │   ├── index.ts         → Public exports
│   │   ├── top-styles.ts    → getTopStyles()
│   │   ├── combo-insight.ts → getComboInsight()
│   │   └── constants.ts     → SECONDARY_THRESHOLD
│   │
│   ├── sharing/             → Share feature
│   │   ├── format.ts        → generateShareText()
│   │   └── clipboard.ts     → copyToClipboard()
│   │
│   ├── radar/               → Radar chart
│   │   ├── geometry.ts      → Point calculation
│   │   └── svg.ts           → SVG path generation
│   │
│   └── data/                → Static content
│       ├── styles.ts        → Archetype definitions
│       ├── scenarios.ts     → Quiz scenarios
│       ├── combos.ts        → Combo insights
│       └── references.ts    → Books, frameworks
│
├── styles/
│   ├── main.css             → Imports partials
│   ├── tokens.css           → CSS custom properties
│   ├── base.css             → Reset, typography
│   ├── components.css       → card, btn, progress-bar
│   └── layouts.css          → container, phases
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Barrel Exports

Each feature folder has `index.ts` exposing only public API:

```
scoring/index.ts exports:
  - getTopStyles
  - getComboInsight
  - SECONDARY_THRESHOLD

Usage: import { getTopStyles } from '@/scoring'
```

---

## Data Model

### Types

| Type | Description |
|------|-------------|
| `ArchetypeKey` | Union: 'coach' \| 'architect' \| 'shield' \| 'catalyst' \| 'operator' |
| `Phase` | Union: 'intro' \| 'play' \| 'result' |
| `Scores` | Record mapping ArchetypeKey → number |

### Interfaces

**Style**
| Field | Type | Example |
|-------|------|---------|
| name | string | "The Coach" |
| emoji | string | "🪞" |
| color | string | "#E8A838" |
| short | string | "Develops people" |
| desc | string | Full paragraph |
| strengths | string[] | 4 items |
| watchOuts | string[] | 4 items |
| reading | string | Comma-separated books |
| questions | string[] | 4 reflection prompts |

**Choice**
| Field | Type | Example |
|-------|------|---------|
| text | string | "Thank Priya, then..." |
| scores | Partial\<Scores\> | { coach: 2, shield: 1 } |
| next | string | "s2_people" or "finale" |

**Scenario**
| Field | Type | Example |
|-------|------|---------|
| id | string | "start", "s2_people" |
| title | string | "Monday Morning" |
| scene | string | 2-4 sentence situation |
| question | string | "Where do you go first?" |
| choices | Choice[] | Always 4 choices |

**ComboInsight**
| Field | Type | Example |
|-------|------|---------|
| label | string | "The Accountable Developer" |
| insight | string | Paragraph explanation |

---

## Alpine.js Component

### State

| Property | Type | Initial |
|----------|------|---------|
| phase | Phase | 'intro' |
| scores | Scores | all zeros |
| currentId | string | 'start' |
| choiceCount | number | 0 |
| copied | boolean | false |
| showRefs | boolean | false |

### Computed (Getters)

| Getter | Returns | Logic |
|--------|---------|-------|
| scenario | Scenario | Find by currentId |
| maxScore | number | Max of all scores, min 1 |
| topStyles | [key, score][] | Sorted, filtered by threshold |
| primary | Style | Lookup topStyles[0] |
| secondary | Style \| null | Lookup topStyles[1] if exists |
| combo | ComboInsight \| null | Lookup by key pair |

### Actions

| Method | Effect |
|--------|--------|
| start() | Set phase → 'play' |
| handleChoice(choice) | Add scores, increment count, advance or finish |
| reset() | Reset all state to initial |
| copyResults() | Format text, copy to clipboard, set copied flag |

---

## State Machine

```
┌─────────┐   start()    ┌─────────┐   handleChoice()   ┌─────────┐
│  intro  │ ───────────► │  play   │ ◄───────────────── │  play   │
└─────────┘              └─────────┘                    └─────────┘
                              │                              
                              │ choice.next === "finale"     
                              ▼                              
                         ┌─────────┐                         
                         │ result  │
                         └─────────┘
                              │
                              │ reset()
                              ▼
                         ┌─────────┐
                         │  intro  │
                         └─────────┘
```

---

## Scoring Algorithm

### getTopStyles(scores)

```
INPUT: scores = { coach: 10, architect: 6, shield: 2, catalyst: 1, operator: 1 }

1. Sort entries by value descending
   → [['coach', 10], ['architect', 6], ['shield', 2], ...]

2. Extract primary (first) and secondary (second)
   → primary = ['coach', 10]
   → secondary = ['architect', 6]

3. Calculate threshold
   → threshold = 10 × 0.55 = 5.5

4. Check if secondary qualifies
   → 6 >= 5.5? YES

OUTPUT: [['coach', 10], ['architect', 6]]
```

### getComboInsight(topStyles)

```
INPUT: topStyles = [['coach', 10], ['operator', 6]]

1. If length < 2: RETURN null

2. Extract keys
   → k1 = 'coach', k2 = 'operator'

3. Try lookup "coach_operator"
   → Found? RETURN it

4. Try lookup "operator_coach"
   → Found? RETURN it

5. RETURN null
```

---

## Radar Chart Geometry

### calculateAngles(count)

```
INPUT: count = 5 (archetypes)

Start angle = -π/2 (top of circle)
Step = 2π / 5 = 72°

OUTPUT: [-90°, -18°, 54°, 126°, 198°] (in radians)
```

### radarPoints(scores, radius, center)

```
INPUT: 
  scores = { coach: 10, architect: 6, ... }
  radius = 100
  center = (130, 130)

1. Normalize scores
   → max = 10
   → normalized = [1.0, 0.6, 0.2, 0.1, 0.1]

2. Calculate angles for 5 points

3. For each (normalized value, angle):
   distance = normalized × radius
   x = center.x + distance × cos(angle)
   y = center.y + distance × sin(angle)

4. Join as SVG polygon points

OUTPUT: "130,30 185,95 160,180 100,180 75,95"
```

---

## CSS Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --bg-base | #0F1118 | Page background |
| --bg-card | rgba(255,255,255,0.03) | Card backgrounds |
| --text-primary | #E8E6E1 | Main text |
| --text-muted | rgba(255,255,255,0.45) | Secondary text |
| --color-coach | #E8A838 | Coach archetype |
| --color-architect | #6B8AFF | Architect archetype |
| --color-shield | #4ECDC4 | Shield archetype |
| --color-catalyst | #FF6B6B | Catalyst archetype |
| --color-operator | #A78BFA | Operator archetype |
| --font-body | 'DM Sans' | Body text |
| --font-display | 'Playfair Display' | Headings |
| --ease-out | cubic-bezier(0.22,1,0.36,1) | Animations |

---

## Build Configuration

### Vite Config
- Path alias: `@` → `src/`
- Build target: ES2020
- Minify: esbuild
- Single bundle (no code splitting)

### TypeScript Config
- Strict mode enabled
- Module resolution: bundler
- Path mapping: `@/*` → `./src/*`
- Types: alpinejs

---

## Test-Driven Development

### TDD Workflow

```
┌─────────────────────────────────────────────────┐
│  1. RED: Write failing test                     │
│     Test describes desired behavior             │
│     Run → fails (function doesn't exist)        │
└─────────────────────┬───────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────┐
│  2. GREEN: Minimal code to pass                 │
│     No clever solutions, just make it work      │
│     Run → passes                                │
└─────────────────────┬───────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────┐
│  3. REFACTOR: Clean up, tests stay green        │
│     Extract constants, rename, simplify         │
│     Run → still passes                          │
└─────────────────────┬───────────────────────────┘
                      ▼
                 Next test...
```

### Implementation Order

Build from leaf nodes up - no mocks needed:

| Phase | Files | Approach |
|-------|-------|----------|
| 1 | types.ts, data/*.ts | No tests (just data) |
| 2 | scoring/*.ts | TDD |
| 3 | sharing/format.ts | TDD |
| 4 | radar/geometry.ts | TDD |
| 5 | quiz/*.ts | Integration tests |

### TDD Example: getTopStyles

**RED:** Write test for "returns primary with highest score"
- Input: { coach: 10, architect: 3, ... }
- Expected: [['coach', 10]]
- Run → FAIL (module not found)

**GREEN:** Minimal implementation
- Sort entries descending
- Return first entry only
- Run → PASS

**RED:** Add test for "includes secondary when >= 55%"
- Input: { coach: 10, architect: 6, ... }
- Expected: length 2, includes architect
- Run → FAIL (only returns 1)

**GREEN:** Extend implementation
- Calculate threshold = primary × 0.55
- If secondary >= threshold, include it
- Run → PASS

**REFACTOR:** Extract constant
- `SECONDARY_THRESHOLD = 0.55`
- Run → PASS

### Test Cases Matrix

| Function | Test Cases |
|----------|------------|
| getTopStyles | Single winner, close secondary, exact threshold, tie, all zeros |
| getComboInsight | Valid combo, reversed keys, unknown combo, single style |
| generateShareText | Format matches spec, emoji rendering, percentage bars |
| normalizeScores | Max normalization, zero handling, single non-zero |
| calculateAngles | 5 points, start at top, even distribution |

### What to Test

| Module | Focus |
|--------|-------|
| scoring/* | Edge cases: ties, zeros, threshold boundaries |
| sharing/format | Output format matches LinkedIn expectations |
| radar/geometry | Math: angles, coordinates, normalization |
| data/* | Schema: all scenarios have 4 choices |

### What NOT to Test

- Alpine.js reactivity (framework's job)
- CSS styling (visual regression if needed)
- DOM manipulation (integration tests if needed)

---

## Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| JS bundle | <50KB gzip | Alpine (15KB) + app (~20KB) + data (~10KB) |
| CSS | <10KB | Minimal styles, no framework |
| LCP | <1.5s | No external API calls |
| TTI | <2s | Minimal JS, no hydration |

---

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- No IE11 (Alpine.js 3.x uses Proxy)

---

## Deployment

Build produces static files:
- `dist/index.html`
- `dist/assets/main-[hash].js`
- `dist/assets/main-[hash].css`

Deploy to any static host: Netlify, Vercel, GitHub Pages, S3.
