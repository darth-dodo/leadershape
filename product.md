# LeaderShape: Engineering Leadership Style Assessment

## Overview

An interactive quiz that reveals your engineering leadership style through realistic workplace scenarios. Users navigate 10 branching situations and receive a personalized profile across 5 leadership archetypes.

## Problem

Engineering managers often operate on instinct without understanding their default leadership patterns. This creates blind spots - over-relying on strengths while neglecting complementary skills.

## Solution

A 5-minute scenario-based assessment that:
- Presents realistic management dilemmas (no obvious "right" answers)
- Tracks tendencies across 5 archetypes
- Reveals primary style + secondary tendencies
- Provides actionable reflection questions
- Suggests targeted reading

## Leadership Archetypes

| Archetype | Emoji | Core Strength | Risk |
|-----------|-------|---------------|------|
| **Coach** | 🪞 | Develops people | May delay hard conversations |
| **Architect** | 🏗️ | Builds systems | Can feel impersonal |
| **Shield** | 🛡️ | Absorbs chaos | Burnout risk |
| **Catalyst** | ⚡ | Empowers others | May seem hands-off |
| **Operator** | 📊 | Drives execution | Can over-rotate on metrics |

## User Flow

```
┌─────────────────────────────────────────────────────────┐
│                      INTRO                              │
│  "What Kind of Engineering Leader Are You?"             │
│  [Start Your Monday]                                    │
└─────────────────────┬───────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   SCENARIO 1-10                         │
│  Scene description + context                            │
│  Question: "How do you handle this?"                    │
│  [Choice A] [Choice B] [Choice C] [Choice D]            │
│  ─────────────────────────────────────                  │
│  Progress: ████████░░ 80%                               │
└─────────────────────┬───────────────────────────────────┘
                      ▼ (after 10 scenarios)
┌─────────────────────────────────────────────────────────┐
│                     RESULTS                             │
│  🪞 The Coach (with Architect tendencies)               │
│  ┌─────────────────────────────────────┐                │
│  │         Radar Chart (SVG)           │                │
│  └─────────────────────────────────────┘                │
│  • Primary style description                            │
│  • Combo insight (if applicable)                        │
│  • Strengths / Watch-outs                               │
│  • Reflection questions                                 │
│  • Growth edge (lowest archetype)                       │
│  • Recommended reading                                  │
│  [Copy Results] [Play Again]                            │
└─────────────────────────────────────────────────────────┘
```

## Key Features

### Branching Scenarios
- 10 realistic management situations
- Each choice routes to a contextually appropriate next scenario
- Choices score 1-2 points across 1-2 archetypes

### Scoring System

**How choices map to scores:**
- Each choice awards 1-2 points to 1-2 archetypes
- No choice is "wrong" — they reveal tendencies, not skill
- Points accumulate across all 10 scenarios

**Example choice scoring:**
```
"Thank Priya, then set up a 1:1 with Marcus to coach him..."
  → Coach +2, Shield +1

"Look at Marcus's team structure and decision rights..."
  → Architect +2
```

**Determining your profile:**

| Result | Condition | Example |
|--------|-----------|---------|
| **Primary** | Highest total score | Coach: 14 pts → Primary |
| **Secondary** | ≥55% of primary score | Architect: 8 pts (57%) → Secondary |
| **No Secondary** | <55% of primary score | Shield: 5 pts (36%) → Not shown |

**Why 55%?**
- Too low (40%) → Almost everyone gets two styles, loses meaning
- Too high (70%) → Almost no one gets a secondary, misses nuance
- 55% captures genuine dual-tendency without noise

**Combo insights trigger when:**
1. You have both a primary AND secondary style
2. That specific pairing has a defined insight

```
Coach (primary) + Operator (secondary) 
  → "The Accountable Developer"
  → "You grow people AND hold them to a high bar..."
```

**12 combo pairings defined:**
- coach_operator, coach_architect, coach_catalyst, coach_shield
- architect_operator, architect_catalyst, architect_shield
- shield_operator, shield_catalyst
- catalyst_operator
- (Order doesn't matter: coach+operator = operator+coach)

### Results Visualization
- SVG radar chart showing shape across all 5 archetypes
- Score bars with comparison to "typical" distribution
- Growth edge highlighting lowest archetype

### Shareability
- Copy-to-clipboard formatted for LinkedIn
- Includes ASCII score bars and archetype breakdown

## Technical Implementation

See [architecture.md](architecture.md) for:
- Tech stack decisions (Alpine.js + TypeScript + Vite)
- Data models and TypeScript interfaces
- File structure
- CSS architecture and design tokens
- Build configuration

## Non-Goals

- ❌ No backend / database
- ❌ No user accounts
- ❌ No analytics tracking
- ❌ No A/B testing
- ❌ No internationalization (English only)
- ❌ No accessibility audit (defer to v2)

## Success Metrics

- Loads in <1s on 3G
- Works offline (no server dependency)
- Single HTML file deployable (after build)
- <50KB total JS (Alpine + app code)

## References

Based on frameworks from:
- Will Larson (An Elegant Puzzle)
- Andy Grove (High Output Management)
- Kim Scott (Radical Candor)
- Liz Wiseman (Multipliers)
- Camille Fournier (The Manager's Path)
- Patrick Lencioni (Five Dysfunctions)
