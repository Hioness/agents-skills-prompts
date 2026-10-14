# Model Policy

refreshed: YYYY-MM-DD
source: opencode models
provider: <provider> (flat subscription)

## Priorities

- default: balanced
- sensitive data: local only
- bulk work: cheapest

## Constraints

- sensitive data: never leaves the machine
- approved models: all
- daily spend cap: none

## Roles

Refs are full tool refs: `<provider>/<model>[#variant]`.

| Role | First choice | Fallback | Note |
|---|---|---|---|
| orchestrator | <model> | <model> | planning |
| search | <model> | <model> | fast reads |
| bulk | <model> | <model> | cheap |
| implementation | <model> | <model> | code |
| implementation (complex) | <model> | <model> | serious logic |
| design | <model> | <model> | pages and UI |
| review | <model> | <model> | different from the writer |
| review (fourth opinion) | <model> | <model> | second opinion |
| sensitive | <model> | <model> | local or approved models only |

## Data classes

| Data class | Allowed models |
|---|---|
| public | any |
| internal | any |
| sensitive | <local or approved> |
| regulated | <approved> |

## Behavior

- escalate: after repeated failure, or for review / security / serious logic
- swap authority: orchestrator
- swap within the approved list only
- if no approved model fits, stop and ask the user
- usage log: off
