import type { Style, ArchetypeKey, Distribution } from '@/types';

export const STYLES: Record<ArchetypeKey, Style> = {
  coach: {
    name: 'The Coach',
    emoji: '🪞',
    color: '#E8A838',
    short: 'Develops people',
    desc: 'You lead through growth. Your instinct is to develop people, ask the right questions, and build capability over time. You invest deeply in 1:1s, create psychological safety, and believe that growing your people is the highest-leverage thing you can do.',
    strengths: [
      'Deep trust with reports',
      'Strong retention and growth trajectories',
      'Culture of psychological safety',
      'Effective at developing new managers',
    ],
    watchOuts: [
      'Can under-index on urgency when speed matters',
      'May avoid hard performance conversations too long',
      'Risk of over-investing in low performers',
      'Coaching when directing would be faster',
    ],
    reading:
      'The Coaching Habit (Bungay Stanier), Radical Candor (Scott), Thanks for the Feedback (Stone & Heen)',
    questions: [
      'Think about your last difficult performance conversation. Did you delay it? What were you protecting: them or yourself?',
      'Who on your team has grown the most in the last 6 months? What did you do differently with them versus everyone else?',
      'Are you coaching your strongest people as much as your struggling ones? Where is your time actually going?',
      'When was the last time you gave feedback that genuinely surprised someone? If it\'s been a while, what are you holding back?',
    ],
  },
  architect: {
    name: 'The Architect',
    emoji: '🏗️',
    color: '#6B8AFF',
    short: 'Builds systems',
    desc: 'You lead through systems. You see org structures, incentives, and processes as your primary tools. When something breaks, you look upstream for the structural cause rather than the individual one. You think in team topologies, decision rights, and feedback loops.',
    strengths: [
      'Scalable org design',
      'Clear roles and decision rights',
      'Strong cross-team alignment',
      'Durable solutions that outlast individuals',
    ],
    watchOuts: [
      'Can feel impersonal to reports who need connection',
      'May over-engineer process for current team size',
      'Risk of analysis paralysis on re-orgs',
      'Can miss the human element in structural changes',
    ],
    reading:
      'An Elegant Puzzle (Larson), Team Topologies (Skelton & Pais), Thinking in Systems (Meadows)',
    questions: [
      'What\'s the last recurring problem you solved with a process change? Did it actually fix the root cause, or did it move the pain somewhere else?',
      'If you removed yourself from the org for a month, which team would break first? What does that tell you about your design?',
      'Think about your last re-org or structural change. Did you spend as much time on the human transition as the org chart?',
      'Are you designing for the org you have today or the one you\'ll need in 6 months? How do you know the difference?',
    ],
  },
  shield: {
    name: 'The Shield',
    emoji: '🛡️',
    color: '#4ECDC4',
    short: 'Absorbs chaos',
    desc: 'You lead through protection. You absorb organizational chaos so your team can focus. You manage up aggressively, translate business noise into clarity, and fight for your team\'s capacity.',
    strengths: [
      'High team focus and flow state',
      'Strong team loyalty and morale',
      'Effective stakeholder management',
      'Teams ship consistently under pressure',
    ],
    watchOuts: [
      'Can become a bottleneck or single point of failure',
      'Team may be sheltered from necessary context',
      'Risk of burnout from absorbing too much',
      'Reports may struggle on less-shielded teams',
    ],
    reading:
      'Turn the Ship Around! (Marquet), The Manager\'s Path (Fournier), Dare to Lead (Brown)',
    questions: [
      'What are you shielding your team from right now? For each thing: is it truly noise, or is it context they need to grow?',
      'How would you rate your own energy on a scale of 1 to 10? If you\'re below a 6, what does that mean for the sustainability of your approach?',
      'If your team found out about everything you\'re filtering, would they thank you or feel patronized?',
      'Who shields you? If nobody, what\'s your plan for when you hit your limit?',
    ],
  },
  catalyst: {
    name: 'The Catalyst',
    emoji: '⚡',
    color: '#FF6B6B',
    short: 'Empowers others',
    desc: 'You lead through empowerment. You push decision-making down, set high bars, and trust your team to figure out the how. You intervene only when the stakes demand it. Your goal is to make yourself unnecessary.',
    strengths: [
      'High team autonomy and ownership',
      'Scales well as org grows',
      'Develops strong senior ICs and leads',
      'Fosters innovation and creative problem-solving',
    ],
    watchOuts: [
      'Can feel hands-off to newer reports',
      'May miss early warning signs of dysfunction',
      'Risk of inconsistency across sub-teams',
      'Delegation without context can backfire',
    ],
    reading: 'Multipliers (Wiseman), High Output Management (Grove), Drive (Pink)',
    questions: [
      'Think about the last decision you delegated that didn\'t go well. Was the person missing context, capability, or confidence? How would you know?',
      'Who on your team would say they don\'t get enough of your time? What would they need from you that they\'re not getting?',
      'Is your instinct to step back serving your team, or is it serving your own comfort? How do you tell the difference?',
      'Where are outcomes inconsistent across your teams? Is that healthy autonomy or a sign you\'ve under-specified the "what"?',
    ],
  },
  operator: {
    name: 'The Operator',
    emoji: '📊',
    color: '#A78BFA',
    short: 'Drives execution',
    desc: 'You lead through execution. You bring rigor, measurement, and follow-through. Your teams ship reliably because you track commitments, remove ambiguity, and hold the bar on delivery.',
    strengths: [
      'Predictable, reliable delivery',
      'Clear expectations and accountability',
      'Strong operational hygiene',
      'Excellent at managing up with data',
    ],
    watchOuts: [
      'Can over-rotate on metrics vs. outcomes',
      'May squeeze out experimentation time',
      'Risk of feeling controlling to senior ICs',
      'Process overhead can slow down small teams',
    ],
    reading:
      'Measure What Matters (Doerr), Accelerate (Forsgren, Humble & Kim), The Goal (Goldratt)',
    questions: [
      'Look at your team\'s metrics. For each one: does it measure what your team produced, or the outcome it created? What\'s the difference?',
      'When was the last time someone on your team tried something that failed? If you can\'t remember, is your process leaving room for experimentation?',
      'What process would your most senior IC eliminate if they could? Why haven\'t they told you?',
      'Are your status updates reporting what happened, or why it mattered? What would change if you led with impact instead of activity?',
    ],
  },
};

export const DISTRIBUTION: Record<ArchetypeKey, Distribution> = {
  coach: { pct: 28, rank: 'Most common primary' },
  architect: { pct: 14, rank: 'Least common primary' },
  shield: { pct: 22, rank: '' },
  catalyst: { pct: 18, rank: '' },
  operator: { pct: 18, rank: '' },
};
