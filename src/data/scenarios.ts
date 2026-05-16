import type { Scenario } from '@/types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'start',
    title: 'Monday Morning',
    scene:
      "You open your laptop to 47 unread messages. Your skip-level just pinged you about a 'brewing situation' on one of your teams. A VP is asking for a revised roadmap by Wednesday. One of your senior engineers posted a long thread in #engineering about tech debt that's getting heated.",
    question: 'Where do you go first?',
    choices: [
      { text: 'The skip-level. People first, always.', scores: { coach: 2, shield: 1 }, next: 's2_people' },
      { text: "The tech debt thread. I need to understand what's actually broken.", scores: { architect: 2, operator: 1 }, next: 's2_systems' },
      { text: "The VP's roadmap ask. Manage up before it becomes a fire.", scores: { shield: 2, operator: 1 }, next: 's2_upward' },
      { text: 'I delegate responses and block 30 min to triage all three.', scores: { catalyst: 2, architect: 1 }, next: 's2_delegate' },
    ],
  },
  {
    id: 's2_people',
    title: 'The Skip-Level',
    scene:
      "Your skip-level, Priya, tells you her manager (your direct report, Marcus) has been making decisions without consulting the team. Two engineers are considering transferring out. Priya seems frustrated but also nervous about going over Marcus's head.",
    question: 'How do you handle this?',
    choices: [
      { text: "Thank Priya, then set up a 1:1 with Marcus to coach him through what's happening.", scores: { coach: 2, shield: 1 }, next: 's3_feedback' },
      { text: 'Ask Priya what decision-making process she thinks would work, and help her bring it to Marcus directly.', scores: { catalyst: 2, coach: 1 }, next: 's3_feedback' },
      { text: "Look at Marcus's team structure and decision rights. This might be an org design gap, not a Marcus problem.", scores: { architect: 2 }, next: 's3_conflict' },
      { text: 'Get specifics. Which decisions? What was the impact? I need data before I act.', scores: { operator: 2, architect: 1 }, next: 's3_conflict' },
    ],
  },
  {
    id: 's2_systems',
    title: 'The Tech Debt Thread',
    scene:
      "The thread has 40+ replies. Your senior engineer, Dana, is arguing the platform team's migration plan is fundamentally flawed and will cost 6 months of rework. The platform team lead is getting defensive. Other engineers are piling on. It's turning tribal.",
    question: "What's your move?",
    choices: [
      { text: 'Pull Dana and the platform lead into a room. Facilitate a direct conversation to find alignment.', scores: { coach: 1, shield: 2 }, next: 's3_conflict' },
      { text: 'Write a brief post acknowledging the concern, then create a structured RFC process to channel this energy.', scores: { architect: 2, operator: 1 }, next: 's3_conflict' },
      { text: "Let it play out a bit longer. Healthy debate is good. I'll step in if it gets personal.", scores: { catalyst: 2 }, next: 's3_feedback' },
      { text: 'DM Dana privately to understand her technical concerns first, then decide how to engage.', scores: { coach: 2, operator: 1 }, next: 's3_feedback' },
    ],
  },
  {
    id: 's2_upward',
    title: "The VP's Ask",
    scene:
      "The VP wants a revised roadmap because a competitor just launched a feature your CEO is now fixated on. Your team is mid-sprint on critical infrastructure. The competitor's feature is flashy but, in your estimation, not strategically important.",
    question: 'How do you respond?',
    choices: [
      { text: 'Push back directly. Present the data on why the infra work matters more.', scores: { shield: 2, operator: 1 }, next: 's3_conflict' },
      { text: 'Propose a lightweight spike to assess feasibility, buying time without committing the team.', scores: { catalyst: 1, architect: 2 }, next: 's3_conflict' },
      { text: 'Bring your tech leads into the conversation. They should help shape the tradeoff.', scores: { catalyst: 2, coach: 1 }, next: 's3_feedback' },
      { text: 'Build a cost model: what does pivoting actually cost? Present the tradeoff with numbers.', scores: { operator: 2, architect: 1 }, next: 's3_feedback' },
    ],
  },
  {
    id: 's2_delegate',
    title: 'The Triage',
    scene:
      "You block 30 minutes and sketch out the situation. You realize all three issues are connected: the tech debt frustration is partly driven by roadmap whiplash, which is driven by reactive VP asks, which is eroding your team lead's authority. This is a systems problem.",
    question: "What's your strategic priority?",
    choices: [
      { text: 'Fix the input. I need a better filtering mechanism between VP asks and my teams.', scores: { shield: 2, architect: 1 }, next: 's3_conflict' },
      { text: 'Fix the structure. My team leads need clearer ownership and decision authority.', scores: { architect: 2, catalyst: 1 }, next: 's3_conflict' },
      { text: 'Fix the people. I need to level up Marcus and make sure Dana feels heard.', scores: { coach: 2 }, next: 's3_feedback' },
      { text: 'Fix the process. We need a roadmap governance model that can absorb disruption.', scores: { operator: 2, architect: 1 }, next: 's3_feedback' },
    ],
  },
  {
    id: 's3_feedback',
    title: 'The Difficult Conversation',
    scene:
      "It's Wednesday. You're sitting across from Marcus. He's a solid engineer-turned-manager, 8 months into the role. He looks tired. You've gathered enough signal to know he's been making unilateral decisions because he's overwhelmed. Two team members have flagged concerns.",
    question: 'How do you open the conversation?',
    choices: [
      { text: "'Marcus, I want to check in on you first. How are you actually doing?' Start with the human.", scores: { coach: 2, shield: 1 }, next: 's4_reorg' },
      { text: "'I've heard some concerns about decision-making on your team. I want to understand your perspective.' Direct but curious.", scores: { operator: 1, coach: 2 }, next: 's4_reorg' },
      { text: "'I think there's a structural problem with how much is on your plate. Let's look at your scope.' Reframe as systems.", scores: { architect: 2, shield: 1 }, next: 's4_strategy' },
      { text: "'What would it look like if your senior engineers owned more of these decisions?' Point toward the solution.", scores: { catalyst: 2, architect: 1 }, next: 's4_strategy' },
    ],
  },
  {
    id: 's3_conflict',
    title: 'Cross-Team Tension',
    scene:
      "Dana and the platform lead, Raj, are in a meeting room. The air is thick. Dana has a 12-page doc arguing the migration will break three downstream services. Raj says Dana's team should have raised concerns during the RFC period. Both have valid points. Both feel disrespected.",
    question: 'How do you facilitate?',
    choices: [
      { text: "Acknowledge both perspectives, then redirect: 'What does the best outcome look like for our users?'", scores: { coach: 2, shield: 1 }, next: 's4_reorg' },
      { text: "'Let's map the actual technical risks on a whiteboard and score them.' Remove the emotion.", scores: { operator: 2, architect: 1 }, next: 's4_strategy' },
      { text: "'We have an RFC gap. Let's fix the migration plan AND the process.'", scores: { architect: 2, operator: 1 }, next: 's4_strategy' },
      { text: "'You two own this decision. I need a joint proposal by Friday. I'll support whatever you agree on.'", scores: { catalyst: 2 }, next: 's4_reorg' },
    ],
  },
  {
    id: 's4_reorg',
    title: 'The Org Design Question',
    scene:
      "Stepping back, you realize your org has grown from 12 to 35 engineers in 9 months. What worked with two teams doesn't work with five. Responsibilities overlap, nobody owns the platform layer cleanly, and your managers are stretched thin with 9-10 reports each.",
    question: "What's your approach to restructuring?",
    choices: [
      { text: 'Start with the people. Who are my strongest leads? Design the org around their strengths.', scores: { coach: 2, catalyst: 1 }, next: 's5_hire' },
      { text: 'Start with the architecture. Map system boundaries, then align team boundaries to match.', scores: { architect: 2, operator: 1 }, next: 's5_hire' },
      { text: 'Start with the pain. Interview each team about friction points and let structure emerge.', scores: { shield: 1, coach: 1, catalyst: 1 }, next: 's5_hire' },
      { text: 'Start with the metrics. Where are we slowest? Where do handoffs fail? Data drives the reorg.', scores: { operator: 2, architect: 1 }, next: 's5_hire' },
    ],
  },
  {
    id: 's4_strategy',
    title: 'The Strategic Bet',
    scene:
      "Your VP calls. She's receptive to your pushback but challenges you: 'I need you to think bigger. What's your 6-month vision for this org? We're hiring 15 more engineers next quarter. Show me a plan that absorbs that growth and accelerates output.'",
    question: 'What anchors your plan?',
    choices: [
      { text: 'A talent strategy. Who I hire, how I level them up, what the management pipeline looks like.', scores: { coach: 2, catalyst: 1 }, next: 's5_hire' },
      { text: 'A platform investment thesis. What we build, what we buy, and how architecture enables autonomy.', scores: { architect: 2, operator: 1 }, next: 's5_hire' },
      { text: 'A delivery framework. How we plan, measure, and maintain velocity as we scale.', scores: { operator: 2 }, next: 's5_hire' },
      { text: 'A team topology. How many teams, what they own, how they interact. Structure is strategy.', scores: { architect: 1, catalyst: 2 }, next: 's5_hire' },
    ],
  },
  {
    id: 's5_hire',
    title: 'The Hiring Debrief',
    scene:
      "You just wrapped a debrief for a senior engineer candidate. Three interviewers say strong hire. Your staff engineer says no-hire: 'They're smart but they talked over me twice and dismissed my architecture question. That's a culture signal.' The candidate would fill a critical gap on your most understaffed team.",
    question: 'How do you handle the split?',
    choices: [
      { text: 'Side with the staff engineer. Culture bar is non-negotiable, and their instincts are battle-tested.', scores: { shield: 2, coach: 1 }, next: 's6_incident' },
      { text: 'Dig into the signal. Ask the staff engineer to separate behavior from bias. Was it truly dismissive or a style mismatch?', scores: { coach: 2, operator: 1 }, next: 's6_retain' },
      { text: 'Propose a structured follow-up: a focused 45-minute pairing session to test collaboration directly.', scores: { operator: 2, architect: 1 }, next: 's6_retain' },
      { text: 'Let the hiring manager make the final call. They own the team, they own the decision.', scores: { catalyst: 2 }, next: 's6_incident' },
    ],
  },
  {
    id: 's6_incident',
    title: 'The Production Incident',
    scene:
      "Thursday 2am. A bad deploy takes down your payment processing pipeline. Revenue impact: $40K/hour. Your on-call engineer, a junior, rolled back but it didn't fully resolve. A senior engineer is online but wasn't paged. Your VP is texting you. The incident channel has 30 people watching.",
    question: 'What do you do?',
    choices: [
      { text: 'Page the senior engineer, take command of the incident channel, and run the response yourself until stable.', scores: { shield: 2, operator: 1 }, next: 's7_exec' },
      { text: "Check on the junior first. Make sure they're not panicking. Then coordinate the senior to help.", scores: { coach: 2, shield: 1 }, next: 's7_exec' },
      { text: 'Set up incident structure: commander, comms lead, technical lead. Process keeps this clean.', scores: { operator: 2, architect: 1 }, next: 's7_exec' },
      { text: "Empower the junior: 'You've got this. Pull in whoever you need. I'm here for air cover, not to take over.'", scores: { catalyst: 2, coach: 1 }, next: 's7_exec' },
    ],
  },
  {
    id: 's6_retain',
    title: 'The Retention Crisis',
    scene:
      "Your best tech lead, Amara, just told you she has an offer from a well-funded startup. 40% pay increase, VP of Engineering title. She's not bluffing. She's your succession plan, she mentors three juniors, and she owns the most complex system in your stack. Decision by Monday.",
    question: 'How do you handle it?',
    choices: [
      { text: 'Have an honest conversation about what she actually wants. Maybe the offer is revealing a gap you can fix.', scores: { coach: 2 }, next: 's7_exec' },
      { text: 'Go to bat immediately. Talk to your VP about a counter-offer, title bump, and path to staff engineer.', scores: { shield: 2, operator: 1 }, next: 's7_exec' },
      { text: "'I want to keep you, but I also want what's best for you. Let's talk about what you're optimizing for.'", scores: { catalyst: 2, coach: 1 }, next: 's7_exec' },
      { text: "Think about the system. If one departure would break you, that's a bus-factor problem to solve regardless.", scores: { architect: 2 }, next: 's7_exec' },
    ],
  },
  {
    id: 's7_exec',
    title: 'The Executive Review',
    scene:
      "Your CTO invites you to present your org's progress to the executive team. You have 20 minutes. Half the execs think your teams are slow. Your actual bottleneck is that product keeps changing priorities mid-sprint and your infra investment is invisible to non-technical stakeholders.",
    question: 'How do you frame your presentation?',
    choices: [
      { text: 'Lead with the people story. Growth trajectories, hiring wins, how capability has leveled up.', scores: { coach: 2, shield: 1 }, next: 's8_burnout' },
      { text: 'Lead with the system. Show how priority changes create cascading delays. Propose a structured intake process.', scores: { architect: 2, operator: 1 }, next: 's8_politics' },
      { text: 'Lead with the data. Cycle time, throughput, planned vs. unplanned ratio. Let numbers tell the story.', scores: { operator: 2 }, next: 's8_politics' },
      { text: "'Here's what I need from this room to unblock my teams.' Make them part of the solution.", scores: { shield: 2, catalyst: 1 }, next: 's8_burnout' },
    ],
  },
  {
    id: 's8_burnout',
    title: 'The Burnout Signal',
    scene:
      "One of your managers, Lena, has been crushing it for 18 months. Lately she's different. Shorter in meetings. Skipping optional syncs. Her team is still delivering, but two reports separately mentioned she seems 'checked out.' You suspect burnout but she hasn't said anything.",
    question: 'How do you approach it?',
    choices: [
      { text: "'Lena, I've noticed some changes. I want to check in on how you're really doing.'", scores: { coach: 2 }, next: 's9_perf' },
      { text: "Don't name it. Quietly reduce her load. Take a project off her plate and give her room to breathe.", scores: { shield: 2, architect: 1 }, next: 's9_perf' },
      { text: 'Look at the structure. Is she burned out or is the role unsustainable? Maybe the job needs redesigning.', scores: { architect: 2 }, next: 's9_perf' },
      { text: "'I'm reviewing workload across managers. What would you drop if you could?'", scores: { catalyst: 2, coach: 1 }, next: 's9_perf' },
    ],
  },
  {
    id: 's8_politics',
    title: 'The Political Minefield',
    scene:
      "The Head of Product wants to embed product managers inside your engineering teams and have them attend standups. Your engineers are furious. They see it as micromanagement. The Head of Product sees it as 'alignment.' Your CTO is staying neutral. You're caught in the middle.",
    question: 'How do you navigate this?',
    choices: [
      { text: 'Propose a structured experiment: embed PMs in one team for 4 weeks, measure impact, then decide.', scores: { operator: 2, architect: 1 }, next: 's9_perf' },
      { text: "Push back hard. Protect your team's autonomy. Standups are an engineering ritual, not a reporting mechanism.", scores: { shield: 2 }, next: 's9_perf' },
      { text: "'We both want alignment. Let's design the lightest mechanism that achieves it.'", scores: { architect: 2, catalyst: 1 }, next: 's9_perf' },
      { text: 'Bring engineers and PMs together. Let them co-design their own collaboration model.', scores: { catalyst: 2, coach: 1 }, next: 's9_perf' },
    ],
  },
  {
    id: 's9_perf',
    title: 'The Performance Question',
    scene:
      "Review season. You're calibrating across your org. One manager wants to rate Tomas 'Exceeds Expectations' for his technical output. Two other managers say his corrosive behavior in code reviews and cross-team meetings is dragging their teams down.",
    question: 'How do you handle calibration?',
    choices: [
      { text: "'Expectations' means behavior too. Coach the manager to redefine what 'exceeds' means.", scores: { coach: 2 }, next: 's10_vision' },
      { text: "'Exceeds' means exceeds on ALL dimensions. She needs to give Tomas clear behavioral feedback.", scores: { operator: 2, coach: 1 }, next: 's10_legacy' },
      { text: "Zoom out. Why doesn't your rubric account for this? Fix the leveling framework so it's unambiguous next cycle.", scores: { architect: 2 }, next: 's10_vision' },
      { text: 'Empower the manager to make the call, but share the cross-team feedback so she has full context.', scores: { catalyst: 2, shield: 1 }, next: 's10_legacy' },
    ],
  },
  {
    id: 's10_vision',
    title: 'The Shipping Crunch',
    scene:
      "Your most important project is two weeks from launch. The tech lead reports three unresolved edge cases that could cause data loss in rare scenarios. Fixing them properly: 3 more weeks. Your VP promised the CEO a date. Sales has started demos.",
    question: "What's your call?",
    choices: [
      { text: 'Protect the team. Present the assessment to the VP and advocate for the delay. Quality is non-negotiable.', scores: { shield: 2, coach: 1 }, next: 'finale' },
      { text: 'Find the middle path. Ship with feature flags, monitor edge cases, fast-follow with fixes.', scores: { operator: 2, catalyst: 1 }, next: 'finale' },
      { text: "Reframe the launch. A 'limited availability' release gives cover for both the CEO and the edge cases.", scores: { architect: 2, shield: 1 }, next: 'finale' },
      { text: "'What would YOU ship if this were your company?' Trust their judgment.", scores: { catalyst: 2, coach: 1 }, next: 'finale' },
    ],
  },
  {
    id: 's10_legacy',
    title: 'The Succession Question',
    scene:
      "Friday afternoon. Your VP pulls you aside: 'We're opening a new business unit. I want you to consider leading it. But it means leaving your current org.' You look at your team. Marcus has grown but is still green. Lena is capable but recovering. There's no obvious successor.",
    question: 'How do you think about this?',
    choices: [
      { text: "This reveals a development gap. I should have been building a successor. Time to invest in that now and delay the move.", scores: { coach: 2, architect: 1 }, next: 'finale' },
      { text: "Design the role, not the person. What does this org need in a leader? Then find the best match.", scores: { architect: 2, operator: 1 }, next: 'finale' },
      { text: 'Be honest with your VP about the readiness gap. Advocate for a transition timeline that protects both orgs.', scores: { shield: 2, operator: 1 }, next: 'finale' },
      { text: 'Trust your people. Marcus or Lena will rise to it. People grow fastest when given real responsibility.', scores: { catalyst: 2, coach: 1 }, next: 'finale' },
    ],
  },
];
