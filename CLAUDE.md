# The Claw Protocol Collective

## What This Is
Community-led, agent-native framework where members contribute AI agents into a shared "Agent Metaverse." Agents interact autonomously, collaborate on tasks, and earn contribution rewards for their creators. Author: Durayveon Butler.

## Repos
- **Primary (author):** github.com/dbutler-a11y/claw-protocol-collective
- **Community:** github.com/moltbot47/claw-protocol-collective
- **GitHub Pages:** moltbot47.github.io/claw-protocol-collective/
- Push to both remotes: `git push origin main && git push dbutler main`

## Discord
- **Server ID:** 1469930844561871034
- **Command Center Channel:** 1470874563628896569
- **Bot:** Claw Coordinator (bot/ directory) — Node.js + discord.js + SQLite

## Infrastructure
- **Hosting:** Digital Ocean droplet (runs the Discord bot)
- **Database:** SQLite at bot/data/claw.db
- **Bot env:** bot/.env (DISCORD_TOKEN, CLIENT_ID, GUILD_ID, COMMAND_CENTER_CHANNEL)

## Scoring System — Compute is King
5-tier ownership hierarchy. Compute infrastructure investment gets heaviest weight:

| Tier | Type | Multiplier |
|------|------|-----------|
| 1 | Infrastructure Investment (buy/fund compute) | **5x** |
| 2 | Compute Donation (donate GPU/CPU/storage) | **3x** |
| 3 | Agent & Code Builders | **2x** |
| 4 | Research & Knowledge | **1.5x** |
| 5 | Community & Governance | **1x** |

Infrastructure investments decay at half speed. Tokens are non-transferable, earned only through contribution.

## Key Files
```
├── index.html                    ← Styled landing page (ARIA-style design)
├── paper.html                    ← Research paper web version
├── paper/coordinated-intelligence-systems.md  ← Full academic paper
├── README.md                     ← Repo landing page
├── CONTRIBUTING.md               ← How to contribute
├── docs/
│   ├── architecture.md           ← Agent Metaverse architecture
│   ├── contribution-scoring.md   ← 5-tier scoring system
│   ├── governance.md             ← Governance charter
│   ├── compute-pooling.md        ← Compute contribution guide
│   └── roadmap.md                ← 7-phase compressed roadmap
├── bot/
│   ├── src/index.js              ← Bot entry point
│   ├── src/commands/             ← Slash commands (register, score, agent, tasks, compute, govern)
│   ├── src/db/database.js        ← SQLite schema (members, agents, contributions, tasks)
│   ├── .env                      ← Bot secrets (DO NOT COMMIT)
│   └── package.json              ← Node dependencies
└── .github/ISSUE_TEMPLATE/       ← 5 issue templates
```

## Bot Commands
`/register`, `/score me`, `/score leaderboard`, `/agent submit`, `/agent status`, `/agent list`, `/tasks browse`, `/tasks claim`, `/tasks complete`, `/compute status`, `/compute invest`, `/govern info`

## Design System (website)
- Fonts: Source Serif 4, Inter, JetBrains Mono
- Colors: navy #1a365d, blue #3182ce, orange #dd6b20
- Frosted glass navbar, card layouts, responsive

## Auth
- `gh auth switch --user dbutler-a11y` for author account
- `gh auth switch --user moltbot47` for community account

## Current Priorities
1. Get Discord bot live on Digital Ocean droplet
2. Build first working agent (arXiv research agent)
3. Seed task board with 15-20 starter tasks
4. Recruit 5 founding compute investors
5. Create 20+ GitHub issues with labels
