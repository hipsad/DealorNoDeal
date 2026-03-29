# NBA Deal or No Deal 🏀

A browser-based "Deal or No Deal" game played with NBA rosters. Pick a player as your team's star, watch briefcases reveal rival players' career scoring averages, weigh the banker's offers, and find out whether you made the right deal!

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Player Data & API](#player-data--api)
- [Game Rules](#game-rules)
- [Deployment](#deployment)

---

## Overview

The game follows the classic Deal or No Deal format:

1. **Setup** – Choose between the active NBA roster or an all-time historical pool.
2. **Rounds** – Open briefcases one by one to reveal player stats (career PPG).
3. **Banker Offers** – After each round the banker makes an offer based on remaining values.
4. **Result** – Accept a deal or go all the way to see what was in your briefcase.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI framework |
| [Vite](https://vitejs.dev/) | 8 | Dev server & bundler |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [ESLint](https://eslint.org/) | 9 | Code linting |
| [Ball Don't Lie API](https://www.balldontlie.io/) | v1 | Live NBA player data (optional) |

---

## Prerequisites

- **Node.js** v18 or later ([download](https://nodejs.org/))
- **npm** v9 or later (comes with Node.js)

Verify your versions:

```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hipsad/DealorNoDeal.git
cd DealorNoDeal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open your browser at **http://localhost:5173** — the page reloads automatically whenever you save a file.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with Hot Module Replacement |
| `npm run build` | Build the app for production (output: `dist/`) |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Lint the source files with ESLint |

---

## Project Structure

```
DealorNoDeal/
├── public/                 # Static assets served as-is
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/             # Images & SVG assets
│   ├── components/
│   │   ├── BankerOffer.jsx # Banker offer modal
│   │   ├── Briefcase.jsx   # Individual briefcase tile
│   │   ├── FinalResult.jsx # End-of-game result screen
│   │   ├── GameSetup.jsx   # Game configuration screen
│   │   └── RoundView.jsx   # Main gameplay screen
│   ├── data/
│   │   └── players.js      # Built-in dataset of 126+ NBA players
│   ├── hooks/
│   │   └── useNBAApi.js    # Hook that fetches live player data
│   ├── utils/
│   │   └── gameLogic.js    # Banker offer formula & scoring logic
│   ├── App.jsx             # Root component & game-phase router
│   ├── index.css           # Global styles (Tailwind directives)
│   └── main.jsx            # React DOM entry point
├── index.html              # HTML shell
├── vite.config.js          # Vite + Tailwind configuration
├── eslint.config.js        # ESLint flat config
└── package.json
```

---

## Player Data & API

The app can pull player data in two ways:

1. **Live API** (default for the "Active Players" mode) – fetches the top 100 current NBA players from the [Ball Don't Lie API](https://www.balldontlie.io/api/v1/players). No API key is required.
2. **Built-in dataset** – a static list of 126+ active and historical players located in `src/data/players.js`. This is used automatically if the API call fails or when the "Historical" pool is selected.

> **No environment variables are required** — the app works fully offline using the built-in dataset.

---

## Game Rules

- **26 briefcases** are assigned random players at the start of each game.
- You pick one briefcase as your own; the remaining 25 are opened across **6 rounds**.
- After each round the banker offers a deal based on the average career PPG of the unopened cases.
- Accept the deal at any point, or play until the final reveal.
- Your score is measured against the player actually in your briefcase.

---

## Deployment

The app is a static single-page application and can be deployed to any static host.

### Build for production

```bash
npm run build
```

The optimized output is placed in the `dist/` folder. Upload that folder to your host of choice:

- **Vercel** – connect the repo and set the build command to `npm run build` and output directory to `dist`.
- **Netlify** – same settings as above, or drag-and-drop the `dist/` folder.
- **GitHub Pages** – use the [vite-plugin-gh-pages](https://github.com/nicktindall/vite-plugin-gh-pages) or manually push `dist/` to the `gh-pages` branch.
