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
6. One recommended next move — the quadrant headline from `content/results-copy.md` §"Staged next actions," one line only
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
4. "What to do next" — the 3-step staged actions in `content/results-copy.md` §"Staged next actions"
5. Brief/share CTA (if distinct from the item-2 primary CTA)
6. Methodology and source notes (McKinsey citation) at the very bottom

Cards only for discrete comparable items (the two scores, the three next-step items). Narrative sections (advantage/watch-out, workflow-opportunity paragraph) stay on plain page background. Content width 680–760px for narrative; hero can use the wider grid from item 2.

**Acceptance:** the page reads as a sequence of labeled decisions, not a uniform wall of equally-weighted containers.

## 7. Next-action copy and CTA wording

**Status:** Resolved — no new work needed.

`content/results-copy.md` §"CTA Copy (Layer 4)" already states the delivery mechanism is email ("We'll email you a personalized summary...", button "Send my Brief"), which already satisfies the rule that CTA wording must name the actual mechanism. The staged 3-step actions in the same file supply the "next action" content this section originally called for. No further copy work; only the layout placement in item 6 above.

## 8. Question-flow adjustments

**Status:** Mixed — some resolved, some new copy added, one item confirmed not achievable on the platform.
**Where:** ScoreApp question-builder settings, per item below.

- [ ] Landing/first-question time estimate: update to "14 questions · about 4 minutes · instant summary" (also feeds the separate landing-page spec).
- [ ] Progress indicator: add "Question N of 14" alongside the existing percentage bar, if ScoreApp's progress-bar setting supports a count label.
- [ ] Section cues: the question set already has phase names in `content/quiz-questions.md` (Phase 1 — About You, Phase 2 — Your AI Story, Phase 3 — Your Biggest Opportunity, Phase 4 — Ready to Move, Phase 5 — Your Results). Surface these as visible in-quiz section headers at each phase transition, if ScoreApp's question flow supports section/group headers. Do not invent new section names — reuse these.
- [x] Multi-select instruction: done — updated in `content/quiz-questions.md` Q11b.
- [ ] "None of these" exclusivity: **not achievable on the platform** — `content/quiz-questions.md` documents that ScoreApp has no exclusive-option behavior. This is already mitigated by scoring ("None of these" = 0 points regardless of co-selection), not a UI fix. No further action.
- [ ] Auto-advance: preserve the visible selected state ~200–300ms before advancing on single-select questions; confirm Back restores the prior selection. Check whether ScoreApp exposes this timing as a setting.
- [x] Helper text/tooltips: done — added to `content/quiz-questions.md` §"Helper Text / Tooltips." Apply the table to the five listed questions via ScoreApp's tooltip/info-icon feature if available.
- [ ] Accessibility: radio groups for single-select, checkbox groups for multi-select, ARIA live region on question change, focus moves to the new question heading after auto-advance, visible focus states, accessible progress-bar label, no color-only indication of selected state or score bands. Confirm what ScoreApp's renderer already provides vs. what's out of the user's control before treating any sub-item as blocked.

**Acceptance:** each checked item matches its stated behavior when tested manually in the live quiz.
