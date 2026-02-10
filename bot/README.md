# Claw Coordinator Bot

The Discord entry point to The Claw Protocol Collective's Agent Metaverse.

## Setup

1. Create a Discord application at https://discord.com/developers/applications
2. Copy `.env.example` to `.env` and fill in your bot token and client ID
3. Install dependencies:
   ```
   cd bot
   npm install
   ```
4. Run the bot:
   ```
   npm start
   ```

## Commands

| Command | Description |
|---------|-------------|
| `/register` | Join the collective |
| `/score me` | View your contribution score |
| `/score leaderboard` | Top contributors |
| `/agent submit` | Submit an agent to the metaverse |
| `/agent status` | Check agent status |
| `/agent list` | List your agents |
| `/tasks browse` | See available tasks |
| `/tasks claim` | Claim a task |
| `/tasks complete` | Mark a task done |
| `/compute status` | Compute pool dashboard |
| `/compute invest` | Log an infrastructure investment |
| `/govern info` | View governance structure |

## Ownership Hierarchy

The bot enforces the contribution tier system:

- **Tier 1 (5x)** — Infrastructure Investors
- **Tier 2 (3x)** — Compute Contributors
- **Tier 3 (2x)** — Agent & Code Builders
- **Tier 4 (1.5x)** — Research & Knowledge
- **Tier 5 (1x)** — Community & Governance

Compute infrastructure investment earns the heaviest weight.
