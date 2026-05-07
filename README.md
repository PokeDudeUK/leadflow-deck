# Nurture LeadFlow — CCO + IT Briefing Deck

A web-based presentation deck built with Vite + React + TypeScript.
14 slides, animated, with real product screenshots and live URL references.

## Quick start (just run the deck)

If you want to run the pre-built deck without setting up the project:

```bash
# Navigate to the dist/ folder and serve it with any static server
cd dist
python3 -m http.server 8000
# Or:  npx serve .
```

Then open `http://localhost:8000` in Chrome.

## Deploy to Vercel

The repo is preconfigured for Vercel — `vercel.json` sets the framework and SPA rewrite.

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Vite. Click **Deploy** — no config needed.
4. Every push to `main` redeploys automatically.

You'll get a URL like `https://leadflow-deck-<hash>.vercel.app/`.

## Navigation

- **→ / Space / PageDown** — next slide
- **← / PageUp** — previous slide
- **Home / End** — first / last slide
- **0–9** — jump to slide
- **Click right half** — next slide
- **Click left half** — previous slide
- **Touch swipe** — left/right on mobile

## Development setup

If you want to edit the deck:

```bash
# Install dependencies (one time)
npm install

# Run dev server with hot reload
npm run dev
# Opens http://localhost:5173

# Build for production
npm run build
# Output goes to dist/

# Preview production build
npm run preview
```

## File structure

```
src/
├── App.tsx              Main app with slide navigation + HUD
├── main.tsx             React entry point
├── index.css            Global tokens, palette, animations
├── slides.ts            Slide registry (imports all 14 slides)
├── components/
│   └── BrowserFrame.tsx Browser-frame wrapper for screenshots
└── slides/
    ├── TitleSlide.tsx           1. Hero with UK fields photo
    ├── ProblemSlide.tsx         2. Three friction cards
    ├── PillarsSlide.tsx         3. Three pillars (Discover/Score/Action)
    ├── StatusSlide.tsx          4. Live URL + hosting cards
    ├── DiscoverySlide.tsx       5. Real screenshot — Discover
    ├── SectorsSlide.tsx         6. Real screenshot — Sector Sources
    ├── ScoringSlide.tsx         7. Animated scoring factor bars
    ├── WorkedExampleSlide.tsx   8. Yorkshire Cold Chain breakdown
    ├── LiveAppSlide.tsx         9. Auto-rotating 4-page live app
    ├── PipelineSlide.tsx        10. Animated count-up pipeline stages
    ├── ActionCentreSlide.tsx    11. Real screenshot — Action Centre
    ├── CopilotSlide.tsx         12. Real screenshot — AI Copilot
    ├── TechSlide.tsx            13. Architecture / security / roadmap
    └── NextStepsSlide.tsx       14. Closing with phased steps

public/assets/
├── hero-fields.jpg              UK aerial fields hero (used on slides 1 + 14)
├── screen-discover.png          Lead Discovery screenshot
├── screen-dashboard.png         Management Dashboard screenshot
├── screen-sectors.png           Sector Sources screenshot
├── screen-action-centre.png     Action Centre screenshot
└── screen-help-ai.png           Help / AI Copilot screenshot
```

## Deploying to Vercel

1. Initialise a git repo and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial deck"
   git remote add origin https://github.com/PokeDudeUK/leadflow-deck.git
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Import the GitHub repo
4. Vercel auto-detects Vite — no config needed
5. Click Deploy

You'll get a URL like `leadflow-deck.vercel.app`.

## Tech notes

- **No frameworks beyond React** — plain CSS, no Tailwind, no animation libraries
- **All sizing in `vw`/`vh`** — fully responsive, scales to any screen
- **CSS-only animations** — keyframes for bar fills, card reveals, count-ups, pulse
- **Live App slide** auto-rotates between 4 screens every 5.5s (uses React state + setInterval)
- **Fonts** loaded from Google Fonts: Barlow (display), DM Sans (body), JetBrains Mono (code/URLs)
- **Palette** matches the Replit-inspired dark green tech aesthetic:
  - `#0e1a12` deep background
  - `#16a34a` vivid green accent
  - `#22c55e` brighter green
  - `#fbbf24` amber for highlights / "honesty notes"
  - `#eef3f0` cream text

## Speaker notes

Speaker notes for each slide live in this README rather than the slides themselves
(deliberate — this is a clean presentation deck, not a teleprompter).

### Slide 1 — Title
Welcome. LeadFlow is the lead intelligence platform built specifically for Nurture
Group's three service lines. It's not a concept — it's running in production right
now. The URL on this slide is live. Over the next 14 slides we'll cover what it
does, how it works under the hood for IT, and what we're proposing for rollout.

### Slide 2 — The before
Before LeadFlow, reps were stitching leads together from spreadsheets, browser
tabs, and gut instinct — different process for each service line. Three friction
points: Discovery (manual, duplicated), Qualification (no shared scoring), Follow-
through (promises lived in heads).

### Slide 3 — Three pillars
LeadFlow does three things: Discover (six live data sources query in parallel),
Score (rule-based, three independent scores per lead), Action (assign, note,
follow-up, every change logged).

### Slide 4 — Live status
The platform is already running on Railway, deployed via GitHub auto-push. SQLite
in dev moving to Postgres before pilot. For IT: no new infrastructure to procure,
no PCs to re-image, secrets in env vars.

### Slide 5 — Lead Discovery
Real screenshot from the live app. Auto-detect picks the right query type. Three
sources query in parallel (Companies House, Google Places, Yelp), results dedup
automatically. Live counters at the top show queue state.

### Slide 6 — Sector Sources
Twelve service packs across Property & FM, Logistics, Education, Healthcare,
Hospitality, Retail, Manufacturing, Transport. LIVE / GATEWAY / CSV badges show
data source type — honest about what's currently working.

### Slide 7 — Scoring engine
Four factors, additive: sector match (+35), location value (+25), keyword signals
(+30), tender source bonus (+45). Raw total can hit 135, capped at 100. Score
tiers: Strong ≥70, Good 55–69, Possible 40–54, Weak <40. Every code reference
shown is a real constant in the codebase.

### Slide 8 — Worked example
Yorkshire Cold Chain Ltd — real lead, real LS10 postcode, real SIC code. Walk
through the +35/+25/+25/+45 = 130 (capped to 100). Shows the scoring isn't a
black box.

### Slide 9 — Live app rotator
Auto-cycles through four real screens every 5.5 seconds with a fade transition.
Tabs in the browser chrome show which page is active. URL changes per page. Status
bar at bottom shows real version (v2.44) and indexed lead count (56). This is
what convinces IT this is a real product, not a mockup.

### Slide 10 — Pipeline
Eight stages from Discovery to Won. Numbers count up on slide entry. Won is
highlighted in amber. Three callouts: timestamped, automatic alerts, shared
ownership.

### Slide 11 — Action Centre
Real screenshot. Shows 6 alert summary cards (CRITICAL / WARNINGS / INFO / OVERDUE
FOLLOW-UPS / STALE LEADS / NO OWNER) and the actual critical alerts list
(Birmingham Logistics Ltd, Test Facilities PLC).

### Slide 12 — AI Copilot
Real screenshot of the help centre with the AI assistant panel. Honesty note at
bottom: answers come from live database queries, the LLM only phrases the
response. No hallucinated lead numbers.

### Slide 13 — Tech architecture
Three columns for IT: Stack today (Python 3.14 / Flask / Postgres / Railway),
Security controls (session auth, role middleware, env-var secrets, HTTPS),
Before pilot rollout (Postgres migration, SSO, custom domain, pen test).

### Slide 14 — Production-ready
Phased steps: this week (Postgres, auth lockdown), next week (3-5 rep pilot),
two weeks (custom domain, 10 reps), by month-end (full rollout, v3 priorities).
Live URL stays in view at the bottom.
