import type { ComboInsight } from '@/types';

export const COMBO_INSIGHTS: Record<string, ComboInsight> = {
  coach_operator: {
    label: 'The Accountable Developer',
    insight:
      'You grow people AND hold them to a high bar. This is rare and powerful. The tension between patience (Coach) and standards (Operator) is where your best management happens. Your risk: pushing for accountability before you\'ve built enough trust. Sequence matters.',
  },
  coach_architect: {
    label: 'The Org Builder',
    insight:
      'You develop people within thoughtful structures. You see that the right org design amplifies individual growth, and growing people strengthens the system. Your risk: spending so long designing the perfect structure and coaching through change that you delay action.',
  },
  coach_catalyst: {
    label: 'The Multiplier',
    insight:
      'You develop people by giving them real ownership. You coach just enough to set direction, then step back and let them run. This scales beautifully. Your risk: your newest or most junior reports may need more hands-on guidance than your instincts provide.',
  },
  coach_shield: {
    label: 'The Guardian Mentor',
    insight:
      'You protect your team\'s space to grow. You absorb chaos so your reports can focus on development, not firefighting. Your risk: you may over-shelter people from the organizational realities they\'ll eventually need to navigate on their own.',
  },
  architect_operator: {
    label: 'The Systems Executor',
    insight:
      'You design the right structures AND ensure they deliver. You think in systems but measure in outcomes. This combination builds orgs that scale predictably. Your risk: optimizing the machine while underinvesting in the humans running it.',
  },
  architect_catalyst: {
    label: 'The Decentralizer',
    insight:
      'You build structures that enable autonomous teams. You design the guardrails, then trust people to operate within them. This is the playbook for scaling engineering orgs past 50. Your risk: the design phase can delay empowerment.',
  },
  architect_shield: {
    label: 'The Strategic Buffer',
    insight:
      'You build systems that protect your teams structurally, not just personally. Instead of absorbing chaos yourself, you design it out. This is sustainable shielding. Your risk: teams may lack the adaptive muscle that comes from occasional chaos.',
  },
  shield_operator: {
    label: 'The Reliable Protector',
    insight:
      'You protect your team AND ensure they deliver. You absorb noise while maintaining rigor. Teams under you feel safe and productive. Your risk: you carry enormous personal load. This combination has the highest burnout potential.',
  },
  shield_catalyst: {
    label: 'The Launchpad',
    insight:
      'You create a protected space where empowered teams can take risks. You absorb organizational consequences so your people can experiment freely. Your risk: when the shield drops (and it will), teams may not be prepared for the exposure.',
  },
  catalyst_operator: {
    label: 'The High-Trust Executor',
    insight:
      'You delegate aggressively but measure rigorously. You trust people with the how while holding the bar on outcomes. This builds senior engineers fast. Your risk: the combination of freedom and accountability can feel contradictory to reports who aren\'t yet senior.',
  },
};
