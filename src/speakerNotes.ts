/**
 * Speaker notes for the xsellio CCO + IT briefing deck.
 *
 * Each entry maps 1:1 to a slide in src/slides.ts.
 * - notes: the main script — what you'd say while on this slide
 * - beats: 2-4 short bullets — the key things that must land
 * - questions: anticipated audience questions + a suggested answer (one-liner)
 *
 * Tone: conversational, first-person, as if Christos is talking.
 * Length: ~60-100 words of notes per slide so you can read them at a glance.
 */

export interface SlideNotes {
  title: string;            // for the presenter view header
  notes: string;            // main script — what to say
  beats: string[];          // 2-4 key points that must land
  questions: { q: string; a: string }[];  // anticipated Q&A
}

export const SLIDE_NOTES: SlideNotes[] = [
  // 1. Title
  {
    title: 'Title — xsellio',
    notes:
      "Open with confidence. \"What I want to show you today is something I've been working on. It's called xsellio. It's a working, production-ready platform for lead intelligence — built specifically with our service lines in mind: gritting, landscaping, pest control. By the end of the next twenty minutes you'll see what it does, what it could be worth to Nurture, and where it goes from here.\" Pause. Let the slide breathe — the ticker and live indicator are doing work for you.",
    beats: [
      'Production-ready, not a prototype',
      'Built for our three service lines specifically',
      'Set expectation: 20 minutes',
    ],
    questions: [
      { q: 'How long have you been working on this?', a: 'Months — entirely my own time, my own hardware, public APIs only.' },
    ],
  },

  // 2. The Problem We Identified
  {
    title: 'The Problem We Identified',
    notes:
      "Switch to first-person observation. \"I've spent enough time in the field to see the same problem play out every week. Reps are losing roughly two hours every morning hunting for leads across spreadsheets, Companies House tabs, council websites. About a third of what they then work isn't even worth a call. And one in five strong leads goes cold before anyone follows up. None of this is anyone's fault — it's the workflow.\" Let the cost figures count up. Don't read them aloud — point at them.",
    beats: [
      '10 hrs/week/rep lost — that\'s 2 hours/day',
      '30% of worked leads were the wrong leads',
      '1 in 5 strong leads dies in admin',
      'Frame as workflow problem, not people problem',
    ],
    questions: [
      { q: 'Where do these numbers come from?', a: 'Estimates from observation — they\'re labelled "estimated cost" deliberately. Happy to refine with real data in a pilot.' },
    ],
  },

  // 3. The Solution
  {
    title: 'The Solution',
    notes:
      "\"So I built one platform that addresses exactly those three problems. Find them — automatically, from six live data sources. Score them — transparently, no black box. Action them — through a pipeline with audit trail.\" Then point at the SOLVES → tags on each card. \"You\'ll see those three words again as we go — Discovery, Qualification, Follow-through — because every feature traces back to one of those three problems.\"",
    beats: [
      'One platform, three pillars',
      'Each pillar maps to a slide-2 problem',
      'Set up the rest of the deck — they\'ll see this structure repeat',
    ],
    questions: [
      { q: 'Why not just buy a CRM that does this?', a: 'CRMs manage relationships. xsellio finds the relationships. Complementary, not competing.' },
    ],
  },

  // 4. Status / Live
  {
    title: 'Status — It\'s Live',
    notes:
      "Quick credibility beat. \"This isn\'t a mock-up. It\'s running right now on Railway. v2.44. If you want to open this URL after the meeting you can — it\'s authenticated, you\'d need a login.\" Don\'t spend long here. The slide does the work. Move on within 30 seconds.",
    beats: [
      'It exists, it runs, you can see it',
      'Real version number, real URL',
      'Move on fast — this is a credibility checkpoint',
    ],
    questions: [
      { q: 'Where is it hosted?', a: 'My Railway account. Production-grade infrastructure. SOC 2 compliant provider.' },
      { q: 'Could we host it ourselves?', a: 'Yes — we\'d move it to Nurture infrastructure if you wanted that.' },
    ],
  },

  // 5. Discovery (manual nav)
  {
    title: 'Discovery — Multi-source Search',
    notes:
      "Use the manual buttons. Walk through each search slowly. \"So if I want cold storage prospects in Leeds...\" — wait for the search to type and resolve — \"...we get scored leads back from Companies House, Yelp, Google Places, the tender feeds, all in one view.\" Then click the next dot. \"Care homes in Birmingham — different sector, different data sources, same flow. CQC data is now in the mix.\" Then the third. \"Hotels in Manchester — FHRS food hygiene data, Google Places, Yelp.\" The point: variety of inputs, consistent output.",
    beats: [
      'Variety of inputs, consistent scored output',
      'Each sector pulls from its relevant data sources',
      'Use the manual buttons — talk at your own pace',
      'About 60-90 seconds total',
    ],
    questions: [
      { q: 'Where does the data come from?', a: 'All public APIs — Companies House, FHRS, CQC, Google Places, Yelp, Find a Tender, Contracts Finder. No paid data sources, no customer data.' },
    ],
  },

  // 6. Sectors
  {
    title: 'Sectors — Targeted Categories',
    notes:
      "\"Beyond ad-hoc search, the platform has 24 pre-built sector lenses for each service line. Cold storage, distribution warehouses, care homes, hotels, hospitals — each one configured with the SIC codes, postcodes, and signals that matter for that service. Reps don\'t have to remember what makes a good gritting prospect — the lens does that for them.\"",
    beats: [
      '24 pre-built sector targets',
      'Encoded domain knowledge — reps don\'t need to remember',
      'One slide of breadth before we zoom in',
    ],
    questions: [],
  },

  // 7. Tender Finder
  {
    title: 'Tender Finder — High-Value Procurement',
    notes:
      "This is one of the strongest slides — slow down. \"Tenders are where the big deals live. £180k contracts, multi-site frameworks. Today, the way we\'d hear about a tender like this Leeds City Council one is — somebody reads about it in a trade journal, maybe a week after publication. xsellio surfaces it within hours. Look at the countdown — every minute that competitors don\'t know about it is a minute we have the field to ourselves.\" Pause. \"And it\'s not just one — there are 23 live in the system right now.\"",
    beats: [
      'High-value: £185k example, multi-site',
      'Speed = competitive advantage',
      '1+ week late vs hours = the moat',
      'The countdown is real — points the urgency',
    ],
    questions: [
      { q: 'Which tender feeds?', a: 'Contracts Finder, Find a Tender, NHS Tenders — all UK government. Free APIs.' },
    ],
  },

  // 8. Scoring
  {
    title: 'Scoring — How a Lead is Ranked',
    notes:
      "Show, don\'t tell. \"Every lead gets three independent scores — one for gritting, one for landscaping, one for pest control. The reason is a logistics depot is a gritting prospect but probably not a care-home pest control prospect. Same data, different lenses.\" Then walk through the four factors — sector match, location, source quality, keywords. \"It\'s a rule-based engine. No black box. We can explain why any lead got the score it got.\"",
    beats: [
      'Three scores per lead — one per service line',
      'Four factor inputs',
      'Rule-based and explainable — IT will love this',
      'No black-box AI risk',
    ],
    questions: [
      { q: 'Can we tune the weights?', a: 'Yes — every weight is config. We\'d tune them with the team in the first weeks of pilot.' },
    ],
  },

  // 9. Worked Example
  {
    title: 'Worked Example — Yorkshire Cold Chain',
    notes:
      "Make it real. \"Here\'s an actual lead in the system. Yorkshire Cold Chain Ltd, Leeds postcode LS10. It scored 92 for gritting. Why? Sector match — they\'re cold-chain logistics, perfect fit. Postcode — LS10 is a cold zone in winter. Source — found via a Contracts Finder tender. Keywords — \"loading bay\" and \"winter contract\" both showed up. All four signals fired, capped at 100, tier is Strong.\" That\'s the workflow.",
    beats: [
      'One real lead, end-to-end',
      'Maps to slide 8\'s four factors',
      'Shows transparency in practice',
    ],
    questions: [],
  },

  // 10. Live App rotator (manual)
  {
    title: 'Live App — Walkthrough',
    notes:
      "Manual control here. \"This is the actual product. Let me walk you through the four screens reps live in.\" Click each one and talk to it. **Dashboard** — \"team-wide KPIs, pipeline at a glance.\" **Discover** — \"the search interface from slide 5.\" **Action Centre** — \"alerts and overdue follow-ups.\" **AI Copilot** — \"natural language query — we'll dig into this in two slides.\" Don\'t dwell — about 20 seconds per screen.",
    beats: [
      'Manual nav — talk at your pace',
      '4 screens, ~80 seconds total',
      'Sets up Action Centre + Copilot which follow',
    ],
    questions: [
      { q: 'Can we see a live demo?', a: 'Yes — happy to walk through the actual app after this if you want. Login is authenticated.' },
    ],
  },

  // 11. Pipeline
  {
    title: 'Pipeline — Stages & Flow',
    notes:
      "Brief beat. \"Leads move through a pipeline. New → Contacted → Quoted → Won/Lost. Each stage is timestamped, audit-logged. Manager visibility is real-time — no end-of-day status email.\" The numbers count up to show scale.",
    beats: [
      'Standard pipeline stages — familiar to anyone in sales',
      'Audit-logged at every stage',
      'Manager visibility without the chase',
    ],
    questions: [],
  },

  // 12. Action Centre
  {
    title: 'Action Centre — Auto-generated Alerts',
    notes:
      "\"This is what every rep sees first thing in the morning. The system has done the prioritising overnight. Overdue follow-ups. Closing tenders. New strong leads since yesterday. Stale opportunities. The rep doesn\'t decide what to work on — the system has already done that.\" This is the slide that lands hardest with reps; for a CCO frame it as consistency. \"Every rep sees the same prioritisation logic. No more \'I forgot to follow up\'.\"",
    beats: [
      'System decides priority, not the rep',
      'Consistency across the team',
      'Removes the "I forgot" excuse',
    ],
    questions: [
      { q: 'How are alerts prioritised?', a: 'Closing tenders first (time-sensitive), then overdue follow-ups, then new strong leads, then stale opportunities.' },
    ],
  },

  // 13. Day in Life — Sarah
  {
    title: 'Day in the Life — Sarah, Tuesday morning',
    notes:
      "Slow down here. This slide humanises everything before it. \"This is what a rep\'s morning actually looks like with xsellio. 8:30 — she logs in, the Action Centre has already loaded. By 8:45 she\'s spotted the Leeds tender. By 9:00 she\'s cleared yesterday\'s follow-ups. By 9:20 she\'s used the Copilot. By 9:50 she\'s on her first call. Today, without xsellio, she\'s still googling and copying into spreadsheets at 9:50.\" Let the bottom comparison land — 240 mins old way vs 80 mins new way.",
    beats: [
      'Humanise the workflow',
      'First call before 10am — vs 4 hours of prep old way',
      '~2 hours/day back per rep — selling not searching',
    ],
    questions: [
      { q: 'Is Sarah a real rep?', a: 'Composite — drawn from observing how our team actually works. Real reps wouldn\'t recognise themselves but they\'d recognise the morning.' },
    ],
  },

  // 14. AI Copilot
  {
    title: 'AI Copilot — Natural-Language Queries',
    notes:
      "Use the pause button. \"This is where it gets interesting. The Copilot is grounded in the live database — it\'s not generic AI, it\'s not making things up.\" Press play, let the first conversation run. Talk over the second one — \"here it\'s explaining a score, showing every signal that fired.\" Pause for the pipeline summary. \"And here it\'s surfacing what\'s urgent.\" The point: four genuinely different capabilities, all conversational. \"The reason this isn\'t a hallucination risk is — every answer comes from a real database query. If the data isn\'t in the system, the Copilot says so.\"",
    beats: [
      'Use the pause button — control your own pace',
      'Four capabilities: search, explain, summarise, alert',
      'Grounded in real data — not LLM hallucination',
      'This is the IT-trust slide — the honesty note matters',
    ],
    questions: [
      { q: 'What LLM is behind it?', a: 'We use Anthropic\'s API — but it has no access to anything except specific database query tools we control. The LLM can\'t see customer data or invent records.' },
      { q: 'Data security?', a: 'Queries against our own database. No customer data leaves the platform. LLM only sees what we send it — currently anonymised summaries.' },
    ],
  },

  // 15. Tech
  {
    title: 'Tech — IT Picture',
    notes:
      "Brief. \"This is for the IT side of the room. Built on Python/Flask, FastAPI for the ML services, Postgres-ready. Hosted on Railway. To roll out to the wider team we\'d migrate from SQLite to Postgres, add SSO, pen-test, custom domain.\" Don\'t dwell — IT just want to know it\'s sensible.",
    beats: [
      'Sensible, modern stack',
      'No surprises — standard cloud architecture',
      'Roadmap items are exactly what IT would expect',
    ],
    questions: [
      { q: 'What about disaster recovery?', a: 'Railway provides automated backups. We\'d add point-in-time recovery for Postgres in production.' },
      { q: 'SSO — Microsoft or Google?', a: 'Either — works with both. Whichever Nurture uses.' },
    ],
  },

  // 16. Roadmap — AutoMapper + Renewals
  {
    title: 'What\'s Coming Next',
    notes:
      "\"xsellio is the foundation, but the bigger picture is end-to-end. AutoMapper is already in live preview — draw a site boundary on a map, get measurements, get a quote. That\'s for gritting and landscaping where quoting today is half the rep\'s afternoon. And renewals — keeping customers, expanding accounts before contract end-dates close. Find the lead, quote it fast, keep the customer. One pipeline.\"",
    beats: [
      'Roadmap shows it\'s a strategy, not a tool',
      'AutoMapper is real and clickable — you can show them after',
      'Renewals positioning — retention is gold',
      'Closes the customer lifecycle loop',
    ],
    questions: [
      { q: 'When will AutoMapper / Renewals be ready?', a: 'AutoMapper is live preview now. Renewals is in design — Q3 if we focus on it.' },
    ],
  },

  // 17. Competitive Landscape
  {
    title: 'Competitive Landscape',
    notes:
      "Confident, slightly understated. \"There's no shortage of B2B sales tools out there. But none of them do this combination.\" Walk down the table — point at the columns rather than reading them. \"ZoomInfo and Cognism find contacts — they don't score by sector. Glenigan and Barbour ABI do tenders — but only for construction. FieldRoutes and ServiceTitan run the operations after the sale. HubSpot manages relationships you already have.\" Pause. \"Each lane has one piece. Xsellio is the only one that puts all six together for our three service lines.\" Let the bottom strip land.",
    beats: [
      'No direct competitor — each lane covers 1-2 capabilities',
      'Sector specificity is the moat',
      'Don\'t dwell on individual platforms — point at the gaps',
      'The "only xsellio does" strip is the takeaway',
    ],
    questions: [
      { q: 'What about [some platform I haven\'t listed]?', a: 'Worth me looking at — but every platform in this category falls into one of these four lanes. None combine all six capabilities.' },
      { q: 'Why no one done this before?', a: 'The cross-sector data is fragmented across free public APIs — Companies House, FHRS, CQC, tender feeds. Stitching them together for service-sector scoring isn\'t obvious until you\'ve worked in the sector.' },
      { q: 'So you\'re building it in a niche?', a: 'A niche of three substantial service lines worth — for Nurture alone — nearly a million pounds in modelled annual uplift. There\'s nothing small about this niche.' },
    ],
  },

  // 18. The Numbers Don't Lie
  {
    title: 'The Numbers Don\'t Lie',
    notes:
      "Slow, confident. \"Let me show you the model. Today, reps average around 200 wins a year — that\'s about 70% of the target. With xsellio, modestly, we close half that gap — so 245 wins per rep, +45 per year. At 10 reps, that\'s 450 extra sites a year. At £2,100 average annual contract value, that\'s **plus £945,000 a year**. At full 30-rep rollout, £2.8M.\" Pause. \"And I\'ve been deliberately modest. The upside case — if it lands stronger — doubles that.\" The slide does the maths visibly so the room can sanity-check every step.",
    beats: [
      'Lead with the modest number — £945k',
      'Maths is visible — they can challenge any input',
      'Upside case is acknowledged but not the anchor',
      'Numbers are Nurture\'s own benchmarks, not industry guesses',
    ],
    questions: [
      { q: 'Where did £2,100 come from?', a: 'Average annual contract value across our three service lines — happy to refine.' },
      { q: 'How are you sure it\'ll close the gap at all?', a: 'I\'m not — that\'s why we\'d run a 10-rep pilot. The pilot tells us if it works at half-gap, full-gap, or doesn\'t.' },
      { q: 'What\'s the cost?', a: 'Let\'s see if it\'s something you want first. Happy to come back with commercial options next week.' },
    ],
  },

  // 19. Next Steps — What's Possible
  {
    title: 'What\'s Possible',
    notes:
      "Close with confidence, no ask. \"That\'s the platform. Production-ready today. Pilot-ready tomorrow.\" Pause. \"+£945k modelled, two hours back per rep per day, already running in production.\" Let it land. \"I\'d love to hear what you think — and what would be most useful to dig into.\" Then **stop talking**. Let them speak first.",
    beats: [
      'End on value, not on ask',
      'Hand the conversation over — let them ask',
      'Don\'t pre-negotiate price',
      'Silence is your friend here',
    ],
    questions: [
      { q: 'What do you want from us?', a: 'For today — just your reaction. The next conversation can be about pilot structure.' },
      { q: 'How do we license this?', a: 'I\'d love to come back next week and talk through commercial options properly. Not the conversation for today.' },
      { q: 'Can we have a copy of the deck?', a: 'Yes — I\'ll send the link after the meeting.' },
    ],
  },
];
