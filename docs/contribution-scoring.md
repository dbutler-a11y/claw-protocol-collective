# Contribution Scoring System

**How contributions are measured, scored, and rewarded in The Claw Protocol Collective.**

---

## Core Principle: Compute is King

The Claw Protocol Collective runs on compute. Without infrastructure, there are no agents, no swarms, no metaverse, no mission. **Members who invest directly in compute infrastructure receive the heaviest scoring weight and earn the most tokens.** This is not arbitrary — compute ownership is the survival hierarchy of the collective. Everything else depends on it.

---

## Contribution Tiers

All contributions are valuable, but they are not equal. The scoring system uses **tier multipliers** that reflect how critical each contribution type is to the collective's survival and growth.

### Tier 1: Infrastructure Investors (5x Multiplier)

Members who **purchase, fund, or directly invest in compute infrastructure** for the collective. This is the highest-value contribution because it creates the foundation everything else runs on.

| Contribution | Examples | Why It's Tier 1 |
|-------------|----------|-----------------|
| **Hardware purchase** | Buying GPUs, servers, or rack equipment for the collective | Direct permanent infrastructure |
| **Colocation funding** | Paying for rack space, power, cooling, bandwidth | Keeps the lights on |
| **Cloud infrastructure** | Funding dedicated cloud instances for the collective | Expands capacity immediately |
| **Network equipment** | Switches, routers, ground station hardware | Enables connectivity |
| **Capital investment** | Direct financial investment earmarked for compute expansion | Fuels growth |

**Scoring:**
```
Infrastructure Score = Investment Value × 5.0 × Sustainability Factor
```

- **Investment Value**: Dollar value of the contribution (normalized to a 0-10 scale)
- **Sustainability Factor (1.0 – 2.0)**: Long-term commitments score higher than one-time purchases. A recurring monthly server payment gets 2.0x; a one-time GPU donation gets 1.0x.

**Example:** A member funds a $2,000/month colocation rack for the collective.
```
Investment Value:       8.0 (significant ongoing investment)
Tier Multiplier:       5.0
Sustainability Factor: 2.0 (recurring monthly commitment)

Score = 8.0 × 5.0 × 2.0 = 80.0 per month
```

This single contribution earns more than almost any other activity in the system. That's by design.

---

### Tier 2: Compute Contributors (3x Multiplier)

Members who **donate their own compute resources** (GPUs, CPUs, storage, bandwidth) to the community pool.

| Contribution | Examples |
|-------------|----------|
| **GPU time** | Making your GPU available for community workloads |
| **CPU cycles** | Running agent orchestration, data processing |
| **Storage** | Hosting datasets, model weights, backups |
| **Bandwidth** | Serving API traffic, data transfer |

**Scoring:**
```
Compute Score = (GPU Hours × Performance Factor × Reliability) × 3.0
```

| Factor | Description |
|--------|------------|
| **GPU Hours** | Raw hours your hardware was available and utilized |
| **Performance Factor** | Based on hardware capability (A100 > 4090 > 3060) |
| **Reliability** | Uptime percentage — consistent availability scores higher than sporadic bursts |

**Example:** A member runs a 4090 GPU 12 hours/day for a month with 95% uptime.
```
GPU Hours:           360
Performance Factor:  1.5 (4090-class)
Reliability:         0.95
Tier Multiplier:     3.0

Score = (360 × 1.5 × 0.95) × 3.0 = 1,539.0 per month
```

---

### Tier 3: Agent & Code Contributors (2x Multiplier)

Members who **build agents, write code, and create tooling** that powers the collective's operations.

**Scoring:**
```
Agent/Code Score = (Impact × Quality × Reusability) ÷ Resource Cost × 2.0
```

| Factor | Range | Description |
|--------|-------|-------------|
| **Impact** | 0.0 – 10.0 | Measurable effect on system capability |
| **Quality** | 0.0 – 5.0 | Technical soundness, documentation, tests |
| **Reusability** | 1.0 – 3.0 | How broadly applicable beyond original context |
| **Resource Cost** | 1.0 – 10.0 | Resources consumed to produce (efficiency rewarded) |

**Example:** A contributor builds a reusable research agent.
```
Impact:      7.0
Quality:     4.0
Reusability: 2.5
Cost:        3.0
Tier Multiplier: 2.0

Score = (7.0 × 4.0 × 2.5) ÷ 3.0 × 2.0 = 46.7
```

---

### Tier 4: Research & Knowledge Contributors (1.5x Multiplier)

Members who **produce research, publish findings, create educational content**, and expand the collective's knowledge base.

**Scoring:**
```
Research Score = (Impact × Quality × Reusability) ÷ Resource Cost × 1.5
```

Uses the same factor definitions as Tier 3.

**Example:** A contributor writes a 5-part tutorial series for onboarding.
```
Impact:      6.0
Quality:     4.5
Reusability: 3.0
Cost:        4.0
Tier Multiplier: 1.5

Score = (6.0 × 4.5 × 3.0) ÷ 4.0 × 1.5 = 30.4
```

---

### Tier 5: Community & Governance Contributors (1.0x Multiplier)

Members who **participate in governance, mentor others, review PRs, and build community**. Essential work — scored at baseline.

**Scoring:**
```
Community Score = (Impact × Quality × Reusability) ÷ Resource Cost × 1.0
```

**Example:** A contributor reviews 10 PRs in a week with detailed, constructive feedback.
```
Impact:      4.0
Quality:     4.0
Reusability: 1.5
Cost:        2.0
Tier Multiplier: 1.0

Score = (4.0 × 4.0 × 1.5) ÷ 2.0 × 1.0 = 12.0
```

---

## The Ownership Hierarchy

This is how it works in plain terms:

```
┌─────────────────────────────────────────────┐
│         INFRASTRUCTURE INVESTORS             │  5x  ← Heaviest weight
│      (Buy/fund compute for the collective)   │       ← Most tokens
├─────────────────────────────────────────────┤
│           COMPUTE CONTRIBUTORS               │  3x  ← Donate GPU/CPU/storage
├─────────────────────────────────────────────┤
│         AGENT & CODE BUILDERS                │  2x  ← Build the tools
├─────────────────────────────────────────────┤
│        RESEARCH & KNOWLEDGE                  │ 1.5x ← Create the knowledge
├─────────────────────────────────────────────┤
│        COMMUNITY & GOVERNANCE                │  1x  ← Build the culture
└─────────────────────────────────────────────┘
```

**Why this hierarchy?**

1. **Without compute, nothing runs.** Agents need GPUs. Models need training. Services need servers. The collective literally cannot survive without infrastructure.
2. **Compute investors take the biggest risk.** Spending real money on hardware is a tangible commitment — more than submitting a PR or writing a doc.
3. **Infrastructure compounds.** A GPU purchased today runs workloads for years. A server rack enables thousands of agent-hours. The long-term value per dollar is enormous.
4. **This attracts the resources we need most.** By making compute the top-rewarded contribution, we incentivize exactly what the collective needs to grow and survive.

---

## Score Decay

Contribution scores decay over time to ensure governance weight reflects current engagement:

```
Effective Score = Raw Score × Decay Factor(t)
```

| Age of Contribution | Decay Factor |
|--------------------|-------------|
| 0-6 months | 1.0 (full weight) |
| 6-12 months | 0.8 |
| 12-18 months | 0.6 |
| 18-24 months | 0.4 |
| 24+ months | 0.3 (permanent floor) |

**Exception: Infrastructure investments decay at half speed.** A server rack purchased 12 months ago is still running and still producing value. Its decay factor at 12 months is 0.9 (not 0.8). Foundational infrastructure retains a permanent floor of 0.5 (not 0.3).

---

## Token Issuance

Tokens are minted based on contribution scores:

```
Tokens Earned = Effective Score × Monthly Minting Rate
```

- Tokens are **non-transferable** — you can't buy them, only earn them
- Tokens determine **governance weight** — more tokens = more voting power
- Tokens determine **revenue share** — managed service revenue distributed proportional to token holdings
- Infrastructure investors receive the **most tokens** due to their 5x multiplier, giving them the strongest governance voice and largest revenue share

This is the ownership hierarchy. If you want the most influence and the largest share, invest in compute.

---

## Transparency

- All scores are computed from public data
- The scoring algorithm is open-source and auditable
- Contributors can see exactly how their score was calculated
- Appeals process: open an issue tagged `score-appeal` with your reasoning
- Scoring methodology changes require Strategic-level governance approval (60%)
- Tier multiplier changes require Constitutional-level governance approval (75%)

---

## Quick Reference

| What You Do | Tier | Multiplier | Monthly Score Range |
|------------|------|-----------|-------------------|
| Fund a colocation rack | 1 | 5x | 40 – 100+ |
| Buy GPUs for the collective | 1 | 5x | 20 – 80 |
| Run your GPU 24/7 for the pool | 2 | 3x | 500 – 2,000+ |
| Build a production agent | 3 | 2x | 20 – 60 |
| Fix bugs and review PRs | 3 | 2x | 5 – 25 |
| Publish research findings | 4 | 1.5x | 15 – 45 |
| Write tutorials | 4 | 1.5x | 10 – 30 |
| Governance participation | 5 | 1.0x | 5 – 15 |

---

*Compute is the backbone. Those who build the backbone own the most of what we create together.*

*The Claw Protocol Collective — Infrastructure is ownership.*
