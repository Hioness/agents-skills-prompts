# Model Policy

refreshed: YYYY-MM-DD
source: opencode models

## Priorities

- default: balanced
- sensitive data: local only
- bulk work: cheapest

## Constraints

- sensitive data: never leaves the machine
- approved models: all
- daily spend cap: none

## Plans

| Provider | Plan | Note |
|---|---|---|
| <provider> | <flat or metered> | <note> |

## Roles

| Role | First choice | Fallback | Note |
|---|---|---|---|
| orchestrator | <model> | <model> | planning |
| search | <model> | <model> | fast reads |
| implementation | <model> | <model> | code |
| review | <model> | <model> | different from the writer |
| bulk | <model> | <model> | cheap |

## Data classes

| Data class | Allowed models |
|---|---|
| public | any |
| internal | any |
| sensitive | <local or approved> |
| regulated | <approved> |

## Behavior

- escalate after: BLOCKED
- swap authority: orchestrator
- usage log: off
