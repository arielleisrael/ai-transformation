# ScoreApp UX Spec Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved ScoreApp UX spec (`docs/superpowers/specs/2026-08-25-scoreapp-ux-spec-design.md`) into (a) the new copy it requires, added to the existing content source-of-truth files, and (b) a single assembled implementation-ready spec document the user can work from inside ScoreApp's admin UI.

**Architecture:** This is a content/documentation deliverable, not software — there is no code, build, or automated test suite involved. Every task therefore replaces the skill's default "write failing test → implement → pass" cycle with "draft copy → self-check against the spec's acceptance criteria → commit." Each task still produces one independently reviewable, committed change.

**Tech Stack:** Markdown files only (`content/*.md`, `docs/*.md`).

## Global Constraints

- Tone: calm, executive — no gamified badges, no celebratory language (per spec §"Content and visual-system guidance" / original review).
- Sentence case for labels and CTAs.
- Never imply AI Readiness and Workflow Opportunity are the same construct or move together (spec §5).
- Never use "overall" to describe a single score (spec §1).
- `content/results-copy.md` and `content/quiz-questions.md` remain the single source of truth for copy — the assembled spec doc (Task 5) references them, it does not duplicate long-form copy inline.
- No ScoreApp admin changes happen in this plan — every task produces a file in this repo. Live configuration is the user's follow-up step, guided by Task 5's output.

---

### Task 1: Add AI Readiness band labels to `content/results-copy.md`

**Files:**
- Modify: `content/results-copy.md:9-21` (the "Score Display (Layer 1)" section, specifically after the existing category-description table at lines 17-20)

**Interfaces:**
- Consumes: existing AI Readiness Score → Archetype band table at `content/results-copy.md:24-30` (80–100 / 55–79 / 30–54 / 0–29)
- Produces: a new "AI Readiness band label" per band, parallel to the existing Workflow Opportunity tier names (Substantial/Significant/Meaningful/Contained) at `content/results-copy.md:52-55` — later tasks and the Task 5 assembly reference these four label strings verbatim: **"Advanced readiness," "Building readiness," "Early readiness," "Starting point."**

- [ ] **Step 1: Draft the band-label table**

Insert immediately after line 20 (the closing `|` of the existing category-description table), before the "**Why no tier badge.**" paragraph:

```markdown
**AI Readiness band labels (added 2026-08-25, per UX review §5):** shown on the AI Readiness score card as the plain-language band, parallel to the Workflow Opportunity tier names below.

| Score | Band label |
|---|---|
| 80–100 | Advanced readiness |
| 55–79 | Building readiness |
| 30–54 | Early readiness |
| 0–29 | Starting point |
```

- [ ] **Step 2: Self-check against acceptance criteria**

Confirm: four bands match the existing archetype band boundaries exactly (`content/results-copy.md:24-30`); labels are sentence case; no label implies failure or judgment (this is the "never imply the respondent failed" principle already stated for the Not-Qualified copy at `content/results-copy.md:339`, applied consistently here).

- [ ] **Step 3: Commit**

```bash
git add content/results-copy.md
git commit -m "content: add AI Readiness band labels for score card"
```

---

### Task 2: Add staged next-action copy to `content/results-copy.md`

**Files:**
- Modify: `content/results-copy.md:57-68` (the "The Positioning Statement" section)

**Interfaces:**
- Consumes: the existing 2×2 positioning-statement matrix at `content/results-copy.md:62-65` (Readiness high/low × Opportunity high/low)
- Produces: a 3-step staged action list per quadrant, referenced by Task 5 as the source for spec §7's "What to do next" section.

- [ ] **Step 1: Draft the four staged-action sets**

Insert immediately after line 65 (the closing `|` of the positioning-statement matrix table) and before the existing "The bottom-right cell..." paragraph at line 67:

```markdown
**Staged next actions (added 2026-08-25, per UX review §7):** three concrete steps per quadrant, shown under "What to do next" below the positioning statement.

**Readiness high + Opportunity high:**
Headline: "Choose one end-to-end workflow to redesign."
1. Validate the baseline cost and cycle time for the workflow you named.
2. Map the decisions, handoffs, and data dependencies inside it.
3. Run a constrained redesign pilot with measurable success criteria.

**Readiness high + Opportunity low:**
Headline: "Look for your real constraint elsewhere."
1. Confirm this workflow with the team closest to it — is it really running as smoothly as it scored?
2. Shortlist one or two other workflows to score the same way.
3. Take the highest-opportunity one to a focused review.

**Readiness low + Opportunity high:**
Headline: "Build the foundation by fixing this one workflow."
1. Name an owner for this workflow and get leadership visibility on it.
2. Fix this single workflow before attempting anything broader.
3. Use the result as the internal proof point that funds what comes next.

**Readiness low + Opportunity low:**
Headline: "Make your first move deliberately, not reactively."
1. Pick one small, low-risk process to learn on — this workflow is a reasonable candidate.
2. Set a defined trial window with a clear before/after measure.
3. Use what you learn to decide where AI adoption goes next.
```

- [ ] **Step 2: Self-check against acceptance criteria**

Confirm: each headline directly follows from its quadrant's existing positioning-statement sentence (no new claims introduced); exactly one primary CTA remains elsewhere on the page (this section adds steps, not a competing CTA — per spec §7's "use one primary CTA" rule); no step assumes a Diagnostic call has happened (staged actions are self-serve, distinct from the Diagnostic CTA in the same file at line 293-321).

- [ ] **Step 3: Commit**

```bash
git add content/results-copy.md
git commit -m "content: add staged next-action steps per positioning-statement quadrant"
```

---

### Task 3: Update Q11b multi-select instruction in `content/quiz-questions.md`

**Files:**
- Modify: `content/quiz-questions.md:222`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing consumed by later tasks (Task 5 references the line number, not new content).

- [ ] **Step 1: Change the instruction text**

At `content/quiz-questions.md:222`, replace:

```markdown
**Text:** "Which of these also apply? Select all that apply."
```

with:

```markdown
**Text:** "Which of these also apply? Select all that apply, or choose 'None of these.'"
```

- [ ] **Step 2: Self-check against acceptance criteria**

Confirm the existing note at `content/quiz-questions.md:239` ("ScoreApp has no exclusive-option behaviour") still applies and is not contradicted — this change is instruction copy only; it does not claim "None" is enforced as mutually exclusive by the platform, since it already isn't (mitigated by "None" scoring 0 regardless of what else is ticked, per the same line).

- [ ] **Step 3: Commit**

```bash
git add content/quiz-questions.md
git commit -m "content: clarify None-of-these option in multi-select instruction"
```

---

### Task 4: Add helper-text tooltips to `content/quiz-questions.md`

**Files:**
- Modify: `content/quiz-questions.md` — insert a new subsection after `## 6. Phase 5 — Your Results` (after line 299, before the `---` at line 301) so it reads as reference material attached to the question flow, not interleaved with the scored-question definitions above it.

**Interfaces:**
- Consumes: existing question text at lines 79-90 (Q2), 92-101 (Q4), 105-114 (Q5), 134-139 (Q7 workflow definition), 210-219 (Q10 automation state).
- Produces: a "Helper Text / Tooltips" table, referenced by Task 5 for spec §8.

- [ ] **Step 1: Draft the tooltip table**

Insert after line 299 (the "No separate marketing-consent checkbox" paragraph), before the `---` divider at line 301:

```markdown
### Helper Text / Tooltips (added 2026-08-25, per UX review)

Optional tooltip/helper text for terms that can be interpreted differently, shown on hover or via an info icon next to the relevant question — not added to the answer labels themselves.

| Question | Term | Helper text |
|---|---|---|
| Q2 — AI adoption | "infrastructure" (in "AI is woven into our operations — it's infrastructure, not just a tool") | "By 'infrastructure,' we mean AI is built into how work actually gets done — not a tool people open sometimes, but part of the default way tasks happen." |
| Q4 — Leadership AI Strategy | "AI plan" | "'AI plan' means a documented direction — not necessarily a full strategy document, but a shared sense within leadership of where AI fits and what's next." |
| Q5 — Is AI moving the needle | "measurable business results" | "This means results you could show someone outside your team — time saved, cost reduced, revenue affected — not just a general sense that AI is helping." |
| Q7 — Workflow category | "workflow" | "A workflow is any repeatable process your team runs — not just software-driven ones. Reporting, client onboarding, and approvals all count." |
| Q10 — Current automation state | "automation" / "partly automated" | "'Partly automated' means some steps happen without a person doing them by hand; 'entirely manual' means a person performs every step." |
```

- [ ] **Step 2: Self-check against acceptance criteria**

Confirm each tooltip explains the term without changing what the question measures or introducing new scoring implications; confirm the table doesn't duplicate the answer-option text verbatim (it clarifies, not repeats).

- [ ] **Step 3: Commit**

```bash
git add content/quiz-questions.md
git commit -m "content: add helper-text tooltips for ambiguous assessment terms"
```

---

### Task 5: Assemble `docs/ScoreApp-UX-Implementation-Spec.md`

**Files:**
- Create: `docs/ScoreApp-UX-Implementation-Spec.md`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-08-25-scoreapp-ux-spec-design.md` (§1–§8 structure), the band labels from Task 1, the staged actions from Task 2, the updated instruction from Task 3, the tooltip table from Task 4, and the existing CTA copy at `content/results-copy.md:285-291` (confirms delivery is by email — "Send my Brief" / "We'll email you..." — which already satisfies spec §7's CTA-wording rule, so no new CTA copy is needed).
- Produces: the final deliverable — an actionable checklist document, not consumed by any later task in this plan.

- [ ] **Step 1: Write the document**

Create `docs/ScoreApp-UX-Implementation-Spec.md` with this exact structure and content:

```markdown
# ScoreApp UX Implementation Spec

**Date:** 2026-08-25
**Status:** Ready to apply in ScoreApp's admin UI. Source design: `docs/superpowers/specs/2026-08-25-scoreapp-ux-spec-design.md`.

Each item below is tagged with its status, where it's configured, the exact copy/values to use, and the acceptance criteria to check it against.

## 1. Verify live state (do this first)

**Status:** Blocking — must be checked before any other item, since it may change what's actually needed below.
**Where:** ScoreApp admin — live result pages and lead-capture gate for `reinventops.scoreapp.com`.

Checklist:
- [ ] Does the live result page show a monetary estimate ($113k–$169k range or similar)? If yes, remove it — `content/results-copy.md` §"Static Benchmark" explicitly documents that no monetary estimate should appear publicly (insufficient inputs to defend a company-specific dollar figure). The annual-hours estimate (from the Dynamic Benchmark table in the same file) is the only public economic figure.
- [ ] Does the live lead-capture gate say "You scored X% overall" or similar single-score language? If yes, replace with the archetype-led framing already defined in `content/results-copy.md` §"Score Display" (archetype name is the headline; both scores are shown, separately labeled).
- [ ] Do the score labels and values match exactly across: gate screen, result-page hero, result-page score cards, and the delivered email? Fix any mismatch.

**Acceptance:** no live screen references a single overall score; the annual-hours estimate is the only public economic figure (or that decision is explicitly revisited with the team first, not silently overridden).

## 2. Result-page first-screen hierarchy

**Status:** New requirement — not covered by existing copy files, this is layout/ordering only.
**Where:** ScoreApp result-page builder (per-archetype result page, ×4).

Target block order for the first viewport:
1. Eyebrow: "Your AI readiness identity"
2. H1: archetype name
3. Sub-headline (use `content/results-copy.md` §"Sub-headline by archetype" verbatim, capped ~2 lines desktop / 3 mobile)
4. Archetype portrait (see item 4 below)
5. Two score cards: AI Readiness, Workflow Opportunity (see item 3 below)
6. One recommended next move — the quadrant headline from `content/results-copy.md` §"Staged next actions" (added by this plan's Task 2), one line only
7. Primary CTA: "Get your AI Readiness Brief" / button "Send my Brief" (already defined in `content/results-copy.md` §"CTA Copy," no new copy needed)
8. Secondary action: anchor/down-arrow to the rest of the page

Layout targets — desktop: max width 1120–1200px, two-column grid `minmax(0, 1.2fr) minmax(320px, .8fr)`, gap 48–72px, vertical padding 64–80px, two-column score cards. Mobile: single column in the order above.

**Dependency to check in ScoreApp admin:** whether block order and this grid layout are configurable, or the builder only allows a fixed vertical stack. If fixed, get as close to this order as the builder allows and use spacing/dividers to establish grouping instead of a true grid.

**Acceptance:** a user reading only the first viewport can state the archetype name, both score values, and one recommended action.

## 3. Lead-gate mechanics

**Status:** Fields already resolved (first name, company, email, function — no consent checkbox). Gate *presentation* is still open.
**Where:** ScoreApp lead-form block settings.

- [ ] Reveal archetype name, portrait, sub-headline, and both score values before the gate — no blur/overlay over that content.
- [ ] Gate only: workflow cost detail, the full "what this means" narrative, and the emailed brief.
- [ ] Replace a full-page blurred overlay with an inline card directly below the ungated result summary.
- [ ] Add above the fields: "Enter your details to get your full workflow breakdown and a copy of your brief."
- [ ] Success state: "Your brief is on its way to {email}" (matches the existing email-delivery-notice placement in `content/results-copy.md`, below the score card, not interrupting the reveal).

**Dependency to check in ScoreApp admin:** whether the lead-form block supports inline placement vs. only full-screen gating. If only full-screen gating is available, minimize what's gated (per above) rather than changing the mechanic.

**Acceptance:** a user sees archetype, portrait, and both scores before any contact-information prompt.

## 4. Portrait treatment

**Status:** New requirement.
**Where:** ScoreApp result-page builder, per-archetype image upload (4 separate result pages).
**Assets:** `docs/the architect.png`, `docs/the builder.png`, `docs/the explorer.png`, `docs/the spectator.png`.

| Archetype | Focal point | Alt text |
|---|---|---|
| Architect | 62% center | "The Architect planning an interconnected system." |
| Builder | 48% center | "The Builder executing hands-on, practical work." |
| Explorer | 68% center | "The Explorer finding a route through open terrain." |
| Spectator | 66% center | "The Spectator observing from a distance." |

Container: 4:5 aspect ratio, 16–24px corner radius, `object-fit: cover`. Desktop: ~0.8fr column, capped 460–520px tall. Mobile: between sub-headline and score cards. No text overlaid on the image. One shared container/spacing/shadow style across all four — don't let each image's palette change card or button styling elsewhere.

**Dependency to check in ScoreApp admin:** confirm each of the 4 result pages supports independent image upload and crop/focal-point control.

**Acceptance:** all four portraits render at consistent size/radius with correct alt text; no legibility issues from text-over-image.

## 5. Score-card content and format

**Status:** Category descriptions already exist; band labels and layout format are new.
**Where:** ScoreApp result-page builder, score-card component (×2 per result page).

Each card shows, top to bottom:
1. Metric name ("AI Readiness" / "Workflow Opportunity")
2. Large score value
3. Band label — AI Readiness: Advanced readiness (80–100) / Building readiness (55–79) / Early readiness (30–54) / Starting point (0–29); Workflow Opportunity: Substantial (80–100) / Significant (60–79) / Meaningful (35–59) / Contained (0–34) — both sets defined in `content/results-copy.md`
4. The one-line category description already in `content/results-copy.md` §"Score Display"
5. Optional: a horizontal banded scale showing where the score falls — not a gauge/dial (harder to make accessible and scannable)

**Explicit rule:** never use a shared color scale or layout that implies the two scores are the same construct or move together.

**Acceptance:** a user can state, in their own words, what each of the two scores measures and how it differs from the other, after reading only the two cards.

## 6. Page content order (below the fold)

**Status:** New requirement.
**Where:** ScoreApp result-page builder, section ordering.

1. "What this means" — split the existing archetype detail copy (`content/archetypes.md`) into advantage / watch-out / next-move sub-sections
2. "Your workflow opportunity" — the Q7×Q12 personalized insight paragraph (`content/results-copy.md` §"Personalized Insight Paragraphs")
3. "What it may be costing" — the annual-hours dynamic benchmark + static McKinsey benchmark (`content/results-copy.md` §"Benchmark Stats"), each labeled as an estimate, with the calculation basis stated next to the number, not only in a footer
4. "What to do next" — the 3-step staged actions added in this plan's Task 2
5. Brief/share CTA (if distinct from the item-2 primary CTA)
6. Methodology and source notes (McKinsey citation) at the very bottom

Cards only for discrete comparable items (the two scores, the three next-step items). Narrative sections (advantage/watch-out, workflow-opportunity paragraph) stay on plain page background. Content width 680–760px for narrative; hero can use the wider grid from item 2.

**Acceptance:** the page reads as a sequence of labeled decisions, not a uniform wall of equally-weighted containers.

## 7. Next-action copy and CTA wording

**Status:** Resolved — no new work needed.

`content/results-copy.md` §"CTA Copy (Layer 4)" already states the delivery mechanism is email ("We'll email you a personalized summary...", button "Send my Brief"), which already satisfies the rule that CTA wording must name the actual mechanism. The staged 3-step actions added in Task 2 supply the "next action" content this section originally called for. No further copy work; only the layout placement in item 6 above.

## 8. Question-flow adjustments

**Status:** Mixed — some resolved, some new copy added, one item confirmed not achievable on the platform.
**Where:** ScoreApp question-builder settings, per item below.

- [ ] Landing/first-question time estimate: update to "14 questions · about 4 minutes · instant summary" (also feeds the separate landing-page spec).
- [ ] Progress indicator: add "Question N of 14" alongside the existing percentage bar, if ScoreApp's progress-bar setting supports a count label.
- [ ] Section cues: the question set already has phase names in `content/quiz-questions.md` (Phase 1 — About You, Phase 2 — Your AI Story, Phase 3 — Your Biggest Opportunity, Phase 4 — Ready to Move, Phase 5 — Your Results). Surface these as visible in-quiz section headers at each phase transition, if ScoreApp's question flow supports section/group headers. Do not invent new section names — reuse these.
- [ ] Multi-select instruction: done (Task 3).
- [ ] "None of these" exclusivity: **not achievable on the platform** — `content/quiz-questions.md` documents that ScoreApp has no exclusive-option behavior. This is already mitigated by scoring ("None of these" = 0 points regardless of co-selection), not a UI fix. No further action.
- [ ] Auto-advance: preserve the visible selected state ~200–300ms before advancing on single-select questions; confirm Back restores the prior selection. Check whether ScoreApp exposes this timing as a setting.
- [ ] Helper text/tooltips: done (Task 4) — apply the table from `content/quiz-questions.md` §"Helper Text / Tooltips" to the five listed questions, via ScoreApp's tooltip/info-icon feature if available.
- [ ] Accessibility: radio groups for single-select, checkbox groups for multi-select, ARIA live region on question change, focus moves to the new question heading after auto-advance, visible focus states, accessible progress-bar label, no color-only indication of selected state or score bands. Confirm what ScoreApp's renderer already provides vs. what's out of the user's control before treating any sub-item as blocked.

**Acceptance:** each checked item matches its stated behavior when tested manually in the live quiz.
```

- [ ] **Step 2: Self-check against acceptance criteria**

Read the completed document against `docs/superpowers/specs/2026-08-25-scoreapp-ux-spec-design.md` §1–§8 and its "Deliverable format" section: confirm every spec section has a corresponding numbered item, every item is tagged Status/Where/copy-or-values/Acceptance, and no item says "TBD" or defers a decision without stating what to check.

- [ ] **Step 3: Commit**

```bash
git add "docs/ScoreApp-UX-Implementation-Spec.md"
git commit -m "docs: assemble ScoreApp UX implementation spec from design + updated copy"
```

---

## Self-Review Notes

- **Spec coverage:** §1 → Task 5 item 1. §2 → Task 5 item 2. §3 → Task 5 item 3. §4 → Task 5 item 4. §5 → Task 1 + Task 5 item 5. §6 → Task 5 item 6. §7 → Task 5 item 7 (resolved, no new copy needed — confirmed against existing CTA copy). §8 → Tasks 3, 4 + Task 5 item 8.
- **Placeholder scan:** no TBD/TODO; every "Dependency to check" line states exactly what to verify and what the fallback is if the answer is no.
- **Type/reference consistency:** band-label strings, staged-action headlines, and the tooltip table are each defined once (Tasks 1, 2, 4) and referenced by exact name in Task 5 rather than redefined.
