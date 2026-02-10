# Contributing to The Claw Protocol Collective

Welcome. If you're reading this, you're already ahead of most — the first contribution is showing up.

## Your First Contribution (10 Minutes)

1. **Fork this repository**
2. **Open an issue** using the [Community Introduction](../../issues/new?template=community-introduction.md) template — tell us who you are and what you're interested in
3. **Pick one task** from the issues labeled [`good-first-issue`](../../issues?q=label%3Agood-first-issue)
4. **Submit a pull request** — even a one-line documentation fix counts

That's it. You're a contributor.

---

## Contribution Types

### AI Agents
Build specialized agents that perform narrow, well-defined functions for the swarm ecosystem.

**How to submit:**
1. Create your agent following the [Agent Standards](docs/agent-standards.md) (coming soon)
2. Include documentation explaining what the agent does, its inputs, and expected outputs
3. Include a test suite demonstrating the agent works correctly
4. Submit a PR and tag it with `agent-contribution`

**Examples:** Literature monitoring agent, code review agent, dataset discovery agent, cost tracking agent

### Compute Resources
Contribute CPU, GPU, storage, or bandwidth to the community compute pool.

**How to contribute:**
1. Read the [Compute Pooling Guide](docs/compute-pooling.md)
2. Register your available resources
3. Your contribution is automatically tracked and scored

### Research & Analysis
Contribute research outputs — literature reviews, data analysis, hypothesis generation, dataset curation.

**How to submit:**
1. Open an issue describing your research direction
2. Work in a branch or fork
3. Submit findings as markdown documents or Jupyter notebooks
4. Tag PRs with `research`

### Code & Infrastructure
Build tools, libraries, infrastructure, and platform components.

**How to submit:**
1. Check open issues for tasks that need implementation
2. Follow existing code patterns and documentation standards
3. Include tests for any new functionality
4. Submit a PR with a clear description of what changed and why

### Education & Documentation
Create tutorials, guides, learning paths, or improve existing documentation.

**How to submit:**
1. Identify a gap — something you wish had been documented when you started
2. Write the guide you wish you had
3. Submit a PR tagged with `education`

**Important:** Learning in public counts as contribution. If you're working through a tutorial or learning a new skill, document your process. Your learning notes become someone else's onboarding guide.

### Governance Participation
Propose changes, review proposals, participate in votes, serve on committees.

**How to participate:**
1. Read the [Governance Charter](docs/governance.md)
2. Comment on open proposals
3. Submit your own proposals using the [Governance Proposal](../../issues/new?template=governance-proposal.md) template

---

## Contribution Scoring

Every contribution is tracked and scored:

```
Score = (Impact × Quality × Reusability) ÷ Resource Cost
```

| Factor | What It Measures | Range |
|--------|-----------------|-------|
| Impact | Effect on system capability or knowledge | 0.0 – 10.0 |
| Quality | Technical soundness, documentation, standards | 0.0 – 5.0 |
| Reusability | Can others build on this? | 1.0 – 3.0 |
| Resource Cost | How much did this consume to produce? | 1.0 – 10.0 |

**What gets rewarded:**
- Work that enables others to contribute more effectively
- Well-documented, reusable components
- Sustained engagement over time
- Teaching and mentorship

**What gets penalized:**
- High-volume, low-quality submissions
- Extractive behavior (consuming resources without proportional output)
- Gaming metrics without genuine contribution

All scores are public. See [Contribution Scoring Details](docs/contribution-scoring.md).

---

## Pull Request Process

1. **Branch from `main`** — use descriptive branch names (`feature/research-agent-v1`, `docs/compute-guide`)
2. **Keep PRs focused** — one logical change per PR
3. **Write clear descriptions** — explain what changed, why, and how to test it
4. **Respond to review feedback** — reviewers are contributors too; their time matters
5. **Merge criteria:**
   - At least 1 peer review approval
   - All tests passing
   - Documentation updated if behavior changed

---

## Code of Conduct

- **Respect.** Disagreement is welcome; disrespect is not.
- **Transparency.** Work in the open. Ask questions publicly when possible.
- **Generosity.** Help others contribute. Answer questions. Review code.
- **Accountability.** Own your work. If something breaks, help fix it.
- **Mission focus.** We're here to build coordinated intelligence for human advancement. Keep that in the center.

---

## Questions?

- Open an issue tagged `question`
- Check existing issues and discussions
- Read the [full research paper](paper/coordinated-intelligence-systems.md) for context on any concept

---

*Every contribution matters. Start small. Start now.*
