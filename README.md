# Clarion — Editorial Edition

A full-stack news intelligence app with a fresh **newsroom editorial** landing layer over your existing Clarion backend. Built to feel like a quiet, modern broadsheet — warm ink-black, bone paper, vermillion accent, Fraunces + Inter + JetBrains Mono.

This drop contains:

```
clarion-fullstack/
├── client/   ← React + Vite + Tailwind v4 frontend (editorial landing)
├── server/   ← Express + Gemini + NewsAPI backend
└── README.md
```

---

## What's new in this drop

The client has been redesigned around a "newsroom editorial" aesthetic — distinct from the previous cinematic landing — while preserving the entire analysis screen (search → results: SynthesisPanel + ArticleGrid) untouched.

New components live in `client/src/components/editorial/`:

- `EditorialNavbar` — masthead bar with vermillion hairline rule
- `EditorialHero` — split-grid hero with inline search + live wire ticker
- `TickerColumn` — auto-scrolling vertical "Live Wire" column
- `SourcesMarquee` — horizontal infinite-scroll source list ("Today's Bureau")
- `PullQuote` — giant italic Fraunces editor's-note quote
- `MethodSection` — four-step "Method" (I, II, III, IV) with serif numerals
- `CapabilitiesBoard` — four "desk" cards (World / AI / Watch / Facts) on a hairline grid
- `EditorialCTA` — "Press Pass" CTA with corner brackets
- `EditorialFooter` — masthead-style footer with desk/method/house columns
- `EditorialLanding` — composes everything; consumes `topic / setTopic / onAnalyze / trending / error`

`App.jsx` renders `<EditorialLanding/>` on the landing state and the original `Navbar + LoadingPulse` (loading) and `Navbar + SynthesisPanel + ArticleGrid` (results) afterwards.

---

## Quick start (two terminals)

### 1) Server

```bash
cd server
cp .env.example .env
# fill in GEMINI_API_KEY and NEWSAPI_KEY
npm install
npm run dev
# → http://localhost:5000  (health: /api/health)
```

### 2) Client

```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

The frontend's `src/api/clarionApi.js` already targets `http://localhost:5000/api`, matching the backend's default port.

---

## Environment

Create `server/.env` from `server/.env.example`:

| Key | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Google Gemini API key (uses `gemini-2.0-flash`) |
| `NEWSAPI_KEY`    | NewsAPI.org developer key |
| `PORT`           | Backend port (default `5000`) |

> ⚠️ The `.env` file from your original drop was **not** included for safety. Use your existing keys.

---

## API surface (unchanged)

- `GET  /api/health` → `{ status, message }`
- `POST /api/analyze` body `{ topic }` → `{ topic, articlesAnalyzed, articles, analysis, timestamp }`
- `GET  /api/trending` → `{ topics: string[] }`

---

## Tech

**Frontend** — React 19, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), framer-motion, lucide-react, axios, JS (no TS).
**Backend** — Node + Express (ES modules), `@google/genai`, axios, dotenv, cors.

Fonts loaded from Google Fonts: Fraunces (display serif), Inter (sans), JetBrains Mono (mono).

---

## Build

```bash
cd client && npm run build
# → client/dist/
```

Verified clean build: ~390 KB JS / ~30 KB CSS gzipped to ~125 KB / ~7 KB.

---

## File tree (editorial additions)

```
client/src/
├── App.jsx                                  ← updated to render EditorialLanding
├── index.css                                ← editorial tokens + preserved app vars
├── api/clarionApi.js                        ← unchanged
├── components/
│   ├── editorial/                           ← NEW landing
│   │   ├── EditorialLanding.jsx
│   │   ├── EditorialNavbar.jsx
│   │   ├── EditorialHero.jsx
│   │   ├── TickerColumn.jsx
│   │   ├── SourcesMarquee.jsx
│   │   ├── PullQuote.jsx
│   │   ├── MethodSection.jsx
│   │   ├── CapabilitiesBoard.jsx
│   │   ├── EditorialCTA.jsx
│   │   └── EditorialFooter.jsx
│   ├── Navbar.jsx                           ← preserved
│   ├── SearchBar.jsx                        ← preserved
│   ├── LoadingPulse.jsx                     ← preserved
│   ├── SynthesisPanel.jsx                   ← preserved
│   ├── ArticleGrid.jsx                      ← preserved
│   ├── BiasSignalCard.jsx                   ← preserved
│   ├── RegionalMap.jsx                      ← preserved
│   └── Hero.jsx                             ← legacy, no longer used
└── main.jsx
```
