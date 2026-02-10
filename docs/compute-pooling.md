# Compute Pooling Guide

**How to contribute compute resources to The Claw Protocol Collective.**

---

## Why Contribute Compute?

Compute is the foundation of everything we build — running agent swarms, training models, hosting services. By pooling community resources, we reduce dependency on third-party providers and build toward compute sovereignty.

**Compute contributions are the highest-rewarded contributions in the entire system.** Infrastructure investors (Tier 1) earn a 5x multiplier. Compute donors (Tier 2) earn a 3x multiplier. No other contribution type earns more. This is by design — compute is the survival hierarchy of the collective.

---

## What You Can Contribute

| Resource | Minimum Useful | How It's Used |
|----------|---------------|---------------|
| **GPU** | 8GB VRAM, 4+ hrs/day availability | Model inference, training, agent execution |
| **CPU** | 4+ cores, 8GB+ RAM | Agent orchestration, data processing, CI/CD |
| **Storage** | 100GB+ available | Dataset hosting, model caching, backups |
| **Bandwidth** | Stable connection, 50+ Mbps | Data transfer, API hosting, communication |

---

## How It Works

### Phase 1 (Current): Voluntary Pooling

1. **Register** — Open an issue using the [Compute Contribution](../../issues/new?template=compute-contribution.md) template describing your available resources
2. **Configure** — Follow the setup guide (coming soon) to connect your machine to the pool
3. **Monitor** — Dashboard tracks your uptime, utilization, and contribution score
4. **Earn** — Compute contributions are scored and earn tokens

### Phase 2 (Planned): Automated Orchestration

- Infrastructure agents automatically distribute workloads across the pool
- Load balancing optimizes for task requirements and resource availability
- Automatic failover ensures no single contributor is a point of failure

### Phase 3 (Future): Hybrid Infrastructure

- Community compute pool + colocation racks + cloud burst capacity
- Seamless workload migration between community and centralized resources
- Full compute sovereignty for critical workloads

---

## Scoring for Compute

### Tier 1: Infrastructure Investment (5x Multiplier)

If you **purchase or fund compute infrastructure** for the collective (buy GPUs, fund colocation, sponsor cloud instances), you earn the highest tier:

```
Infrastructure Score = Investment Value × 5.0 × Sustainability Factor
```

Recurring commitments earn up to 2.0x sustainability factor. A $2,000/month colocation rack earns 80+ points/month — more than almost any other activity in the system.

### Tier 2: Compute Donation (3x Multiplier)

If you **donate your own hardware time** to the community pool:

```
Compute Score = (GPU Hours × Performance Factor × Reliability) × 3.0
```

| Factor | Description |
|--------|------------|
| **GPU Hours** | Raw hours your hardware was available and utilized |
| **Performance Factor** | Based on hardware capability (A100 > 4090 > 3060) |
| **Reliability** | Uptime percentage — consistent availability scores higher than sporadic bursts |

Both tiers earn more tokens than code, research, or governance contributions. See the full [Contribution Scoring System](contribution-scoring.md) for details.

---

## Requirements

- **No sensitive data** — compute nodes process community workloads, not personal data
- **Availability commitment** — state your expected availability when registering
- **Security baseline** — keep your system updated; follow the security checklist (coming soon)
- **Honest reporting** — misrepresenting resources is a governance violation

---

## Getting Started

1. Open a [Compute Contribution](../../issues/new?template=compute-contribution.md) issue
2. Describe your hardware and availability
3. A community member will help you get connected

---

*Every GPU hour moves us closer to compute sovereignty.*
