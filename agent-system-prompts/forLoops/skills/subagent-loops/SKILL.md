---
name: subagent-loops
description: "Launch and parallelize `loop` subagents for autonomous iteration loops. Use when delegating continuous-improvement work toward a quality bar — benchmarking, refactoring, sweeping, coverage, documentation — that a subagent can drive end-to-end. Covers goal types (verifiable + LLM-as-judge), scoping, parallel launch, and when not to use."
---

# subagent-loops

The `loop` subagent iterates toward a goal on its own — it explores,
plans, executes, and reviews in a cycle until it reaches the quality bar
you set, then reports back. You launch it and stay free to do other
work.

## When to use a loop

Loops are for continuous improvement toward a quality bar, not
open-ended invention. Good fits: benchmarks ("get every page under
50ms"), sweeping ("add error logging to every path in this service"),
refactoring ("make this module DRY"), coverage ("fix every TypeScript
strict error in this directory"), documentation ("update these docs to
match the current code"). The common thread: there is a standard to
reach that you can define clearly.

## When NOT to use a loop

Loops are not for open-ended creative work. "Build a new feature from
scratch" has no clear done condition and the AI can't calibrate its own
taste without guidance. If the work needs back-and-forth with you
(discussion, direction, feedback), do it directly instead.

Loops also burn tokens running autonomously, so always pair them with a
tight done condition. A wide-open goal on any model will run away.

## How to launch

Call the `loop` subagent via the Task tool with three things:

- **Task** — one line: what to build or fix
- **Scope** — the files or modules involved
- **Done when** — the verifiable outcome that means complete (a passing
  test, a clean build, an observed behavior)

That's it. Give the loop the target, not the steps — prescribing the
approach defeats the point of delegating.

**Goal types.** Tell the loop which kind you're giving it:
- **Verifiable** — machine-checkable: "tests pass," "tsc has zero
  errors," "every page loads under 50ms." The loop checks mechanically.
- **LLM-as-judge** — subjective quality: "the code is clean," "docs
  are current," "error logging is thorough." The loop judges honestly
  and reports its reasoning.

## Parallelizing

If the work splits into independent units — no shared files, no
dependency on each other's output — launch one loop per unit at the same
time. Two loops must never write to the same file.

If units depend on each other, run them in sequence.

## After it returns

The loop reports DONE or BLOCKED with what it changed and how it
verified it. You are the final checkpoint. A loop that says DONE has
verified itself, but self-verification has blind spots — if the task
matters, look at the result yourself.

If a loop returns BLOCKED, you decide: re-launch on a more capable
model, narrow the scope, or do it directly. There is no automatic
escalation ladder — that call is yours.
