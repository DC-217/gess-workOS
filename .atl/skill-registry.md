# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review. | branch-pr | C:/Users/Propietario/.gemini/config/skills/branch-pr/SKILL.md |
| When a PR would exceed 400 changed lines, when planning chained PRs, stacked PRs, or reviewable slices. | chained-pr | C:/Users/Propietario/.gemini/config/skills/chained-pr/SKILL.md |
| When writing guides, READMEs, RFCs, onboarding docs, architecture docs, or review-facing documentation. | cognitive-doc-design | C:/Users/Propietario/.gemini/config/skills/cognitive-doc-design/SKILL.md |
| When drafting or posting feedback, review comments, maintainer replies, Slack messages, or GitHub comments. | comment-writer | C:/Users/Propietario/.gemini/config/skills/comment-writer/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage. | go-testing | C:/Users/Propietario/.gemini/config/skills/go-testing/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature. | issue-creation | C:/Users/Propietario/.gemini/config/skills/issue-creation/SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | judgment-day | C:/Users/Propietario/.gemini/config/skills/judgment-day/SKILL.md |
| When working with Next.js - routing, Server Actions, data fetching. | nextjs-15 | C:/Users/Propietario/.gemini/config/skills/nextjs-15/SKILL.md |
| When writing E2E tests - Page Objects, selectors, MCP workflow. | playwright | C:/Users/Propietario/.gemini/config/skills/playwright/SKILL.md |
| When writing React components - no useMemo/useCallback needed. | react-19 | C:/Users/Propietario/.gemini/config/skills/react-19/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI. | skill-creator | C:/Users/Propietario/.gemini/config/skills/skill-creator/SKILL.md |
| When styling with Tailwind - cn(), theme variables, no var() in className. | tailwind-4 | C:/Users/Propietario/.gemini/config/skills/tailwind-4/SKILL.md |
| When writing TypeScript code - types, interfaces, generics. | typescript | C:/Users/Propietario/.gemini/config/skills/typescript/SKILL.md |
| When implementing a change, preparing commits, splitting PRs, or planning chained or stacked PRs. | work-unit-commits | C:/Users/Propietario/.gemini/config/skills/work-unit-commits/SKILL.md |
| When using Zod for validation - breaking changes from v3. | zod-4 | C:/Users/Propietario/.gemini/config/skills/zod-4/SKILL.md |
| When managing React state with Zustand. | zustand-5 | C:/Users/Propietario/.gemini/config/skills/zustand-5/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Always create a branch following conventional formats (e.g., feat/issue-id-description).
- Ensure an issue is created/associated before opening a PR.
- Structure commits as work units within the PR.

### chained-pr
- Split changes larger than 400 lines into stacked or chained PRs.
- Identify autonomous chunks that can be reviewed independently.
- Avoid deploying intermediate broken states; use feature flags or test-only chains.

### cognitive-doc-design
- Use clear visual hierarchy with headers and lists.
- Design documentation to reduce reader cognitive load.
- Avoid large blocks of dense text.

### comment-writer
- Use warm, polite, and direct language in comments and PR reviews.
- Explain the rationale behind recommendations.
- Keep comments concise and focused.

### go-testing
- Write unit tests for all Go logic.
- Use Go testing frameworks (go test, teatest for Bubbletea).
- Focus on testing behaviors, not implementations.

### issue-creation
- Always open an issue first to describe the problem or feature.
- Include reproduction steps or acceptance criteria.
- Tag/label issues correctly.

### judgment-day
- Trigger parallel adversarial reviews with two independent sub-agent judges.
- Synthesize feedback, apply fixes, and re-run if any fail.
- Max 2 iterations before escalating.

### nextjs-15
- React Server Components (RSC) by default; 'use client' only when hooks or interactivity are needed.
- Use app router features: page.tsx, layout.tsx, and loading.tsx.
- Implement server actions for data mutations.

### playwright
- Implement E2E tests using the Page Object Model (POM).
- Prefer locators like `getByRole` or `getByText` over raw CSS selectors.
- Keep E2E tests clean, isolated, and fast.

### react-19
- Do not use manual memoization (useMemo/useCallback) since React Compiler does it automatically.
- Import hooks individually using named imports (e.g., `import { useState } from "react"`); do NOT use `import * as React` or `import React`.
- ref is now a standard prop; do not use forwardRef.
- Use `use()` hook for reading promises and conditional context.

### skill-creator
- Create new skills with clear frontmatter: name, description, and trigger.
- Structure skills inside directories with SKILL.md.
- Ensure the skill is documented cleanly for agents.

### tailwind-4
- Use Tailwind CSS v4 patterns: tailwind classNames, theme variables.
- Use `cn()` helper to merge classNames conditionally.
- Never use `var()` directly in className values.

### typescript
- Always use the Const Types Pattern (`const STATUS = { ... } as const; type Status = typeof STATUS[keyof typeof STATUS]`) instead of union strings.
- Always use Flat Interfaces with nested objects extracted to their own interfaces (no inline nested structures).
- Never use `any`; use `unknown` or generics instead.
- Use named type imports (`import type { User }` or `import { type User }`).

### work-unit-commits
- Commit by work units (behavior, fix, migration, doc unit) instead of file types (e.g., separate model, controller commits).
- Write conventional commits (`feat(scope): message`, `fix(scope): message`).
- Include tests and documentation in the same commit as the code changes.
- Ensure the codebase builds and passes all tests at each commit.

### zod-4
- Use Zod schemas for runtime data validation.
- Implement clean error formatting when validation fails.
- Structure schemas reusefully.

### zustand-5
- Manage global state with Zustand 5 selectors for optimal rendering.
- Avoid exporting raw store instances; use hooks instead.
- Keep stores atomic and highly focused.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | [AGENTS.md](file:///c:/software-dc217/gess-workOS/AGENTS.md) | Index — references coding style and conventions |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
