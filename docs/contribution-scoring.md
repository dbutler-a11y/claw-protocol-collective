# Contribution Scoring System

**How contributions are measured, scored, and rewarded in Open Claw.**

---

## The Formula

```
Contribution Score = (Impact × Quality × Reusability) ÷ Resource Cost
```

---

## Factors Explained

### Impact (0.0 – 10.0)
Measurable effect on system capability, user outcomes, or knowledge base.

| Score | Meaning | Example |
|-------|---------|---------|
| 1-2 | Minor improvement | Typo fix, minor formatting |
| 3-4 | Useful contribution | Bug fix, small feature, documentation update |
| 5-6 | Significant contribution | New agent, research finding, infrastructure component |
| 7-8 | High-impact contribution | Core system component, major research output |
| 9-10 | Transformative | Flagship initiative breakthrough, architecture innovation |

### Quality (0.0 – 5.0)
Technical soundness, documentation completeness, adherence to standards.

| Score | Meaning |
|-------|---------|
| 1 | Works but poorly documented, no tests |
| 2 | Functional with basic documentation |
| 3 | Well-written, documented, tested |
| 4 | Excellent code quality, comprehensive docs and tests |
| 5 | Exceptional — sets the standard for others |

### Reusability (1.0 – 3.0)
Degree to which the contribution can be applied beyond its original context.

| Score | Meaning | Example |
|-------|---------|---------|
| 1.0 | Single-use | One-off script for a specific task |
| 1.5 | Limited reuse | Component usable in similar contexts |
| 2.0 | Broadly reusable | Library or tool applicable across projects |
| 2.5 | Platform-level | Infrastructure component enabling many workflows |
| 3.0 | Foundational | Core primitive that the system depends on |

### Resource Cost (1.0 – 10.0)
Compute, human attention, and infrastructure consumed to produce the contribution. **Higher cost = lower score** (efficiency is rewarded).

| Score | Meaning |
|-------|---------|
| 1 | Minimal resources (documentation, small code change) |
| 3 | Moderate resources (medium feature, research task) |
| 5 | Significant resources (large implementation, GPU training) |
| 8 | Heavy resources (major infrastructure, extensive compute) |
| 10 | Exceptional resource consumption |

---

## Scoring Examples

### Example 1: Reusable Research Agent
A contributor builds an agent that monitors arXiv for papers relevant to flagship initiatives and produces weekly digests.

```
Impact:      7.0 (enables continuous research tracking for all initiatives)
Quality:     4.0 (well-documented, tested, handles edge cases)
Reusability: 2.5 (usable across all flagship workstreams)
Cost:        3.0 (moderate development effort)

Score = (7.0 × 4.0 × 2.5) ÷ 3.0 = 23.3
```

### Example 2: One-Off Bug Fix
A contributor fixes a broken link in the documentation.

```
Impact:      2.0 (minor improvement)
Quality:     3.0 (correct fix, clean PR)
Reusability: 1.0 (single-use fix)
Cost:        1.0 (minimal effort)

Score = (2.0 × 3.0 × 1.0) ÷ 1.0 = 6.0
```

### Example 3: High-Volume Low-Quality Submissions
A contributor submits 20 small PRs with minimal documentation and no tests.

```
Impact:      1.5 (each individually low-impact)
Quality:     1.5 (no docs, no tests)
Reusability: 1.0 (not reusable)
Cost:        2.0 (reviewer time consumed across 20 PRs)

Score per PR = (1.5 × 1.5 × 1.0) ÷ 2.0 = 1.1
Total for 20 PRs = 22.5 (less than one good agent)
```

### Example 4: Educational Tutorial Series
A contributor creates a 5-part tutorial teaching newcomers how to build their first agent.

```
Impact:      6.0 (directly enables new contributors)
Quality:     4.5 (clear writing, working code examples, tested)
Reusability: 3.0 (foundational onboarding resource)
Cost:        4.0 (significant writing and testing effort)

Score = (6.0 × 4.5 × 3.0) ÷ 4.0 = 20.3
```

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

Foundational work never fully decays — a core architecture contribution from year 1 retains 30% of its original weight indefinitely.

---

## Transparency

- All scores are computed from public data
- The scoring algorithm is open-source and auditable
- Contributors can see exactly how their score was calculated
- Appeals process: open an issue tagged `score-appeal` with your reasoning
- Scoring methodology changes require Strategic-level governance approval (60%)

---

*The system rewards what matters: high-impact, high-quality, reusable work that advances the mission.*
