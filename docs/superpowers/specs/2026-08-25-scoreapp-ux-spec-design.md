# ScoreApp Result/Quiz-Flow UX Spec — Design

**Date:** 2026-08-25
**Source:** `docs/AI-readiness-assessment-UX-review.md` (Aug 24, 2026 UX review), reconciled against the current copy source of truth (`content/results-copy.md`, `content/quiz-questions.md`, `content/archetypes.md`, `content/follow-up-sequences.md`, all v2.0, last touched Aug 24–25) and the ReinventOps brand kit.

## Purpose

The UX review's P0/P1 findings apply to the assessment, result page, and lead-capture gate — all of which live inside ScoreApp's hosted quiz builder, not in this repo's code. This document is not an implementation plan (there's no code to write for the ScoreApp side); it's a **configuration spec**: what to change, with exact copy/values/layout instructions, organized so it can be applied directly in ScoreApp's admin UI or handed to whoever configures it.

This is a companion to the existing `content/*.md` files, not a replacement. Where a finding is already resolved by current copy decisions, this spec says so and moves on. Where it's a genuinely new requirement (mostly layout/visual, which the copy files never covered), this spec defines it.

## Out of scope

The landing page (`index.html`) rebrand and UX fixes are a separate spec, tracked next.

## Reconciliation: review findings vs. current state

| Review finding | Status | Resolution |
|---|---|---|
| P0 — Score-model contradiction ("100% overall") | **Likely resolved in copy, unverified live** | `results-copy.md` v2.0 already frames archetype + AI Readiness Score as the hero and Workflow Opportunity as secondary, with no "overall" language. Action: verify the *live* ScoreApp result page and lead-gate screen match this — see §1. |
| P0 — Result reveal hierarchy | **Open — new requirement** | Copy files define content, not layout order/visual weight. See §2. |
| P0 — Lead capture as obstruction | **Partially resolved** | Fields already cut to first name, company, email, function (4 fields, no consent checkbox — commits `ed3d328`, `89ecf49`). Gate *mechanics* (blocking modal + blur vs. inline card, partial reveal before gate) are still an open ScoreApp configuration question — see §3. |
| P1 — Portraits as identity anchors | **Open — new requirement** | Never addressed in copy files. See §4. |
| P1 — Score cards as explanations | **Partially resolved** | Category descriptions already exist (`results-copy.md` §"Score Display"). Band-scale visualization is a new layout question — see §5. |
| P1 — Content reorder into decision sequence | **Open — new requirement** | See §6. |
| P1 — Cost-estimate transparency | **Blocked on a real contradiction** | `results-copy.md` states no monetary estimate is shown publicly; the review observed one live ($113k–$169k). This must be resolved as fact before any copy change — see §1. |
| P1 — Next-action strengthening | **Partially resolved** | Positioning-statement matrix already exists per readiness×opportunity combination. Staged 3-step action format is new — see §7. |
| Question-flow items (progress model, section cues, multi-select, auto-advance, definitions, accessibility) | **Open — new requirement** | See §8. |

## §1 — P0: Verify live state before changing anything

Before implementing any other item, confirm against the live `reinventops.scoreapp.com` instance:

1. Does the result page currently show a monetary estimate ($113k–$169k in the reviewed run)? If yes, `results-copy.md`'s "no monetary estimate" decision has not been applied live — the live config needs to be brought in line with the copy doc (remove the dollar figure), not the other way around. Re-verify against the doc's own rationale (insufficient inputs to defend a company-specific dollar figure) before deciding.
2. Does the lead-capture gate still show "You scored 100% overall," or has it already been updated to the archetype-led framing? If the old copy is still live, update it to match `results-copy.md`'s hero framing — no gate screen should say "overall."
3. Confirm the score labels and values match exactly across: gate screen, result-page hero, result-page score cards, delivered email/brief. Any mismatch is a P0 bug, not a design question.

**Acceptance:** no live screen references a single overall score; the annual-hours estimate is the only economic figure shown publicly (per `results-copy.md`), or that decision is explicitly revisited with the team first.

## §2 — P0: Result-page first-screen hierarchy

Target order for the first viewport (both breakpoints):

1. Eyebrow: "Your AI readiness identity"
2. H1: archetype name (e.g., "The Architect")
3. Sub-headline (already written per archetype in `results-copy.md` — reuse verbatim, capped to ~2 lines desktop / 3 mobile)
4. Archetype portrait (see §4 for treatment)
5. Two score cards: AI Readiness and Workflow Opportunity (see §5)
6. One recommended next move (derived from the positioning-statement matrix already in `results-copy.md`, condensed to one line)
7. Primary CTA: "Get my AI Readiness Brief" (or whatever the live delivery mechanism actually does — see §7 wording rule)
8. Secondary action: anchor link or down-arrow to "Explore the full result"

Everything else (benchmark stats, personalized insight paragraph, methodology, positioning-statement full text) moves below this fold, restructured per §6.

**Layout targets (desktop):**
- Max width 1120–1200px, two-column grid `minmax(0, 1.2fr) minmax(320px, .8fr)` (content / portrait), gap 48–72px, vertical padding 64–80px.
- Score cards: two columns.

**Mobile:** single column — archetype name/definition, then portrait, then score cards (stacked or two compact side-by-side cards), then CTA.

**Dependency:** confirm in ScoreApp's result-page builder whether block order and grid layout like this are configurable, or whether the builder only allows a fixed vertical stack with limited component choices. If layout is fixed, the fallback is to get as close to this order as the builder allows and treat visual grouping (spacing, dividers) as the substitute for grid layout.

## §3 — P0: Lead-gate mechanics

Content is already right (4 fields, no consent checkbox). What's still open is *how* the gate is presented:

- Reveal archetype name, portrait, sub-headline, and both score values **before** the gate — no blur/overlay over that content.
- Gate only: workflow cost detail/estimate, the full "what this means" narrative sections, and the emailed/downloadable brief.
- Replace a full-page blurred overlay with an inline card placed directly below the ungated result summary (§2, items 1–6).
- Add one line above the fields explaining the exchange, e.g.: "Enter your details to get your full workflow breakdown and a copy of your brief."
- Success state after submission should confirm what happened: "Your brief is on its way to `{email}`" (matches `results-copy.md`'s existing email-delivery-notice placement below the score card).

**Dependency:** verify ScoreApp's lead-form block supports being placed inline mid-page rather than as a full-screen gate before implementing. If it only supports full-screen gating, the fallback is minimizing what's gated (per the reveal/gate split above) rather than changing the gate's presentation mechanic.

**Acceptance:** a user sees a meaningful result (archetype, portrait, both scores) before being asked for any contact information.

## §4 — P1: Portrait treatment

Applies to all four archetype images (`the architect.png`, `the builder.png`, `the explorer.png`, `the spectator.png`, already in `docs/`).

- Container: 4:5 aspect ratio, 16–24px corner radius, `object-fit: cover`.
- Desktop: portrait occupies the ~0.8fr column in the §2 grid, capped 460–520px tall.
- Mobile: portrait sits between the archetype sub-headline and the score cards.
- Per-archetype focal point (not one crop for all four): Architect 62% center, Spectator 66% center, Explorer 68% center, Builder 48% center.
- Alt text, metaphor-based not filename-based:
  - Architect: "The Architect planning an interconnected system."
  - Builder: "The Builder executing hands-on, practical work."
  - Explorer: "The Explorer finding a route through open terrain."
  - Spectator: "The Spectator observing from a distance."
- No body copy overlaid on the images — contrast varies too much across the four.
- One shared visual system (spacing, radius, shadow) across all four archetypes; don't let each image's palette redefine card/button styling elsewhere on the page.

**Dependency:** confirm ScoreApp's result-page builder supports per-archetype image upload with independent crop/focal-point control per result variant (there are 4 separate result pages, one per archetype, per `results-copy.md`'s scoring table — this should be natively achievable by uploading a different image per result page).

## §5 — P1: Score-card content and format

Each of the two score cards (AI Readiness, Workflow Opportunity) shows:

1. Metric name
2. Large score value
3. Plain-language band label (e.g., "Advanced readiness," "Meaningful opportunity" — Workflow Opportunity already has tier names Substantial/Significant/Meaningful/Contained in `results-copy.md`; AI Readiness needs an equivalent band label set, see below)
4. The one-line category description already defined in `results-copy.md` §"Score Display"
5. Optional: horizontal banded scale showing where the score falls (not a gauge/dial — the review specifically flags gauges as less scannable and harder to make accessible)

**New copy needed — AI Readiness band labels** (parallel to the existing Workflow Opportunity tiers), to pair with the existing archetype bands (0–29/30–54/55–79/80–100):
- 80–100: "Advanced readiness"
- 55–79: "Building readiness"
- 30–54: "Early readiness"
- 0–29: "Starting point"

(Exact wording open to revision — flagging as new copy to add to `results-copy.md`, not inventing final language here.)

**Explicit rule:** AI Readiness and Workflow Opportunity must never be visually implied to move together or be the same construct (no shared color scale implying "high=good" identically for both, no combined average shown anywhere).

## §6 — P1: Page content order (below the fold)

After the §2 hero:

1. "What this means" — advantage / watch-out / next move, using the archetype's existing detailed copy (currently likely a single long block — split into these three labeled sub-sections)
2. "Your workflow opportunity" — named workflow, score, primary friction (draws from the Q7×Q12 personalized insight paragraph already in `results-copy.md`)
3. "What it may be costing" — the annual-hours estimate (dynamic benchmark table already in `results-copy.md`) + static McKinsey benchmark, each labeled as an estimate, with a short "how we calculated this" line placed next to the number, not only in a footer
4. "What to do next" — three staged actions (see §7)
5. Brief/share CTA (if not already the primary CTA in §2)
6. Methodology and source notes (McKinsey citation, calculation assumptions) at the very bottom

Use cards only for discrete comparable objects (the two scores, the three next-step items). Keep narrative sections (advantage/watch-out, workflow opportunity paragraph) on plain page background — avoid wrapping everything in bordered containers.

**Content width:** 680–760px for narrative sections; hero can use the wider grid from §2.

## §7 — P1: Next-action copy and CTA wording

- Convert the existing positioning-statement (readiness×opportunity 2×2 matrix, already in `results-copy.md`) into a 3-step staged action list per quadrant, matching the review's example format (Step 1: validate baseline → Step 2: map dependencies → Step 3: run a pilot). New copy needed — 4 quadrants × 3 steps = 12 short action lines, to be added to `results-copy.md`.
- One primary CTA only. Its label must state the actual mechanism: "Email my brief" if it's sent by email, "Download my brief" if it's a file — never a generic "Get my brief" if the delivery method is knowable and singular. Confirm which mechanism ScoreApp actually uses (per `content/follow-up-sequences.md`) before finalizing the label.

## §8 — Question-flow adjustments (P1/P2 from the review)

Lower priority than §1–§7 but included for completeness — apply after the result-page work:

- Landing/first-question copy: add question count to the time estimate — "14 questions · about 4 minutes · instant summary" (also feeds the landing-page spec).
- Progress indicator: add "Question N of 14" alongside the existing percentage bar.
- Section cues: add short headers ("About you" / "AI readiness" / "Workflow opportunity") at the transitions between question groups, so demographic questions (role, company size) read as a distinct phase from scored questions.
- Multi-select question (the "select all that apply" one): update instruction text to "Select all that apply, or choose 'None of these.'" Confirm "None" is mutually exclusive and clears other selections when chosen — this is a ScoreApp question-config setting, verify it's on.
- Auto-advance: preserve the visible selected state briefly (200–300ms) before advancing on single-select questions; confirm Back restores the prior selection.
- Add optional helper text/tooltips for ambiguous scoring terms: "AI plan," "embedded," "automation," "measurable business results," "workflow." New short copy, additive to `quiz-questions.md`.
- Accessibility: radio groups for single-select, checkbox groups for multi-select, ARIA live region announcing question changes/progress, focus moves to new question heading after auto-advance, visible focus states, accessible label on the progress bar, no color-only indication of selected state or score bands. These are ScoreApp-platform-dependent — confirm what's controllable vs. inherent to the builder's rendering before writing this off as fully achievable.

## Deliverable format

A single markdown document at `docs/ScoreApp-UX-Implementation-Spec.md`, organized exactly as §1–§8 above, each item tagged with:
- **Status** (new requirement / copy already exists, verify live / blocked on fact-check)
- **Where it's configured** (ScoreApp result-page builder / ScoreApp lead-form block / `content/*.md` file + manual paste / ScoreApp question settings)
- **Exact copy or values**, pulled from or added to the relevant `content/*.md` file
- **Acceptance criteria**, carried from the original review where applicable

New copy that needs to be added to existing content files (AI Readiness band labels in §5, staged 3-step actions in §7, question helper text in §8) will be drafted directly into `content/results-copy.md` and `content/quiz-questions.md` as part of implementation, not left only in the spec doc — so the content files remain the single source of truth for copy, and the spec doc stays focused on layout/mechanics/sequencing instructions ScoreApp's copy files don't cover.

## Open questions carried into implementation

1. Live-state verification (§1) — must happen first; may change scope of everything downstream if the live gate/result page already matches `results-copy.md`.
2. ScoreApp result-page builder's actual layout flexibility (§2, §3, §4) — unknown until checked in the admin UI.
3. Whether ScoreApp's lead-form block can be placed inline vs. only as a full-page gate (§3).
4. Delivery mechanism for the brief (email vs. download vs. both) — affects CTA wording (§7).
