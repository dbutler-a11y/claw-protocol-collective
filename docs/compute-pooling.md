# Compute Pooling Guide

**How to contribute compute resources to The Claw Protocol Collective.**

---

## Why Contribute Compute?

Compute is the foundation of everything we build — running agent swarms, training models, hosting services. By pooling community resources, we reduce dependency on third-party providers and build toward compute sovereignty.

Contributed compute earns contribution scores and tokens, just like code or research.

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

```
Compute Score = (GPU Hours × Performance Factor × Reliability) ÷ 1
```

| Factor | Description |
|--------|------------|
| **GPU Hours** | Raw hours your hardware was available and utilized |
| **Performance Factor** | Based on hardware capability (an A100 contributes more per hour than a 3060) |
| **Reliability** | Uptime percentage — consistent availability scores higher than sporadic bursts |

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
