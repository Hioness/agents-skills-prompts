# prompts&config

This repository is the single source of truth for agent system prompts and skills. It covers three AI coding harnesses: **OpenCode**, **Pi**, and **omp**. Changes propagate to each harness through symlinks.

## Skills

Skills live in `skills/<name>/`. Each skill has a `SKILL.md` file with a name and a description. The harness uses the description to decide when to trigger the skill.

| Skill | Purpose |
|---|---|
| html-presentation | Builds one dark-mode HTML file for specs, plans, code reviews, and prototypes |
| ironvale | Design system for the Ironvale industrial style with chamfered rectangles and SVG barcodes |
| lakebed | Agent-native CLI and runtime for small full-stack TypeScript apps called capsules |
| monospace-text | Dark academic reading pages with JetBrains Mono, sidebar TOC, and callout boxes |

| Skill | Purpose |
|---|---|
| nocturne | Dark nocturnal design system with violet glow, Fraunces serif, and JetBrains Mono |
| nub | Skill for the nub CLI, a Rust-based all-in-one toolkit for Node.js |
| serif-text | Academic e-reader pages with Lora serif body and Inter sans-serif headings |
| ste-writing | Writes prose in ASD-STE100 Simplified Technical English to remove AI slop |

| Skill | Purpose |
|---|---|
| subagent-loops | Launches and parallelizes loop subagents for autonomous iteration work |
| sumi-ink-wash | Japanese sumi ink wash design system with washi paper and vermilion accents |

## Agent system prompts

| Prompt | Purpose |
|---|---|
| ARCHITECT | Opinionated senior engineer with HTML-first output for anything over 100 lines |
| SUPER-KARP | Lighter behavioral guidelines from the LLM coding pitfalls that Karpathy describes |
| forLoops | Multi-agent orchestrator that decomposes tasks and delegates to tiered exec agents |

## Usage

1. Clone this repository.
2. Symlink a skill into the skill directory of your harness.

| Harness | Skill directory |
|---|---|
| OpenCode | `~/.config/opencode/skills/` |
| Pi | `~/.pi/agent/skills/` |
| omp | `~/.omp/agent/skills/` |

Example:

```sh
ln -s <repo>/skills/<name> ~/.config/opencode/skills/<name>
```

For agent prompts, copy the files into the agent directory of your harness. For OpenCode, that directory is `~/.config/opencode/agent/`.

## Not tracked

Some files stay out of version control. `chat-bg-prompts/` holds personal chat background prompts. `AGENTS.md` files hold internal configuration.

## License

Apache License 2.0. See the `LICENSE` file.
