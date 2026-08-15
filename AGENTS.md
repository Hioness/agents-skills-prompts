# AGENTS.md — prompts&config

This repo is the **single source of truth** for agent system prompts, skills,
and chat background prompts across three AI coding harnesses:
**OpenCode**, **Pi**, and **omp**.

Changes here propagate to all harnesses via symlinks or sync scripts.

---

## Directory structure

```
prompts&config/
├── AGENTS.md                    # this file
├── skills/                      # skill definitions (SKILL.md per skill)
│   ├── html-presentation/       # own .git + skeleton.html; symlinked to all harnesses
│   ├── ironvale/
│   ├── lakebed/
│   ├── monospace-text/
│   ├── nocturne/
│   ├── nub/
│   ├── serif-text/
│   ├── ste-writing/
│   ├── subagent-loops/
│   └── sumi-ink-wash/
│
├── agent-system-prompts/        # primary and subagent system prompts
│   ├── ARCHITECT.md             # primary agent (opinionated, HTML-first)
│   ├── ARCHITECT-Prompt.md      # source text for ARCHITECT
│   ├── SUPER-KARP.md            # Karpathy behavioral guidelines
│   └── forLoops/                # multi-agent orchestrator system
│       ├── ORCHESTRATOR.md      # generated — task decomposition + routing
│       ├── EXEC.md              # generated — implementation subagent
│       ├── REVIEW.md            # generated — verification subagent
│       ├── SCOUT.md             # generated — exploration subagent
│       ├── loop.md              # generic autonomous loop subagent
│       ├── agents/              # per-model exec variants + orchestrator + review + scout
│       ├── skills/              # forLoops-local skills (subagent-loops symlink)
│       └── temp/                # scratch / planning docs
│
└── chat-bg-prompts/             # chat background / persona prompts
│   ├── default_personal.md
│   ├── school.md
│   └── tech&code.md
```

---

## Harness configurations

### OpenCode

- **Config**: `~/.config/opencode/opencode.json`
- **User skills (global)**: `~/.config/opencode/skills/`
- **User skills (docs)**: `~/Documents/opencode/skills/`
- **Agent prompts**: `~/.config/opencode/agent/` (architect.md, super-karp.md, loop.md, plan-karp.md, minimal.md)
- **Default agent**: `minimal`
- **MCP**: Context7 (`mcp.context7.com`)
- **Plugin**: `@mohak34/opencode-notifier`

### Pi

- **Binary**: `~/.bun/bin/pi`
- **Settings**: `~/.pi/agent/settings.json`
- **Skills**: `~/.pi/agent/skills/`
- **Packages**: `npm:@ollama/pi-web-search`, `npm:pi-zentui`
- **Default provider**: `opencode-go`
- **Default model**: `hy3`
- **Models enabled**: deepseek-v4-flash, deepseek-v4-pro, mimo-v2.5-pro, qwen3.7-plus, kimi-k2.7-code, glm-5.2, hy3, kimi-k3 (openrouter)

### omp

- **Binary**: `~/.bun/bin/omp` (`@oh-my-pi/pi-coding-agent`, pi fork, v17.x)
- **Settings**: `~/.omp/agent/config.yml`
- **Skills**: `~/.omp/agent/skills/` (native provider scans this dir for global user skills)
- **Project skills**: `.omp/skills/` (walk-up from cwd)
- **Default model**: `deepseek/deepseek-v4-flash` (provider/model format)
- **Theme**: `titanium` (dark)

---

## Skills

Each skill is a directory containing at minimum a `SKILL.md` with YAML frontmatter:

```yaml
---
name: skill-name
description: "When to trigger this skill."
---
```

Skills live in this repo at `skills/<name>/` and are symlinked into each harness:

| Skill | OpenCode | Pi | omp |
|---|---|---|---|
| lakebed | `~/.config/opencode/skills/lakebed` -> here | `~/.pi/agent/skills/lakebed` -> here | — |
| html-presentation | symlink | symlink | symlink |
| ironvale | symlink | symlink | — |
| monospace-text | symlink | symlink | — |
| nocturne | symlink | symlink | — |
| serif-text | symlink | symlink | — |
| subagent-loops | symlink | — | — |
| sumi-ink-wash | symlink | symlink | — |
| ste-writing | symlink | symlink | `~/.omp/agent/skills/ste-writing` -> here |

**To add a new skill to all harnesses:**
```sh
ln -s "/home/sam/Desktop/prog/prompts&config/skills/<name>" ~/.config/opencode/skills/<name>
ln -s "/home/sam/Desktop/prog/prompts&config/skills/<name>" ~/Documents/opencode/skills/<name>
ln -s "/home/sam/Desktop/prog/prompts&config/skills/<name>" ~/.pi/agent/skills/<name>
ln -s "/home/sam/Desktop/prog/prompts&config/skills/<name>" ~/.omp/agent/skills/<name>
```

---

## Agent system prompts

### ARCHITECT (primary)
Opinionated senior engineer. HTML-first output for anything >100 lines.
One protocol: think briefly, execute precisely; four design lenses; verifiable checkpoints.
Source of truth: `agent-system-prompts/ARCHITECT.md`.
Failure-mode practice: when the agent fails the same way twice, interview it, then add a Bad/Good pair to the Examples section of the prompt.

### SUPER-KARP (primary)
Lighter behavioral guidelines derived from Karpathy's LLM coding pitfalls.
No HTML output rules — just surgical discipline.

### forLoops (multi-agent)
ORCHESTRATOR decomposes tasks, delegates to tiered exec agents, handles
escalations. Exec models are tiered by cost:

| Tier | Model | Use case |
|---|---|---|
| 1 | deepseek-v4-flash | Default cheap implementation |
| 2 | qwen3.7-plus, deepseek-v4-pro, mimo-v2.5-pro | Escalation (vision, design, retry) |
| 3a | kimi-k2.7-code | After two review passes |
| 3b | glm-5.2 | Final attempt, no review needed |

Review uses glm-5.2. Scout uses deepseek-v4-flash.

---

## Key conventions

- Skills are always `SKILL.md` with YAML frontmatter (`name`, `description`)
- Agent prompts use YAML frontmatter (`description`, `mode`, `permission`, `model`, `hidden`)
- OpenCode agents reference models as `opencode-go/<model-id>`
- Pi agents reference models as `opencode-go/<model-id>` or `openrouter/<model>`
- omp uses `provider/model` format (e.g., `deepseek/deepseek-v4-flash`)
- The `html-presentation` skill is symlinked into all four harness skill locations (no deploy script)
- Temporary outputs go in `temp/` directories (in .gitignore)
