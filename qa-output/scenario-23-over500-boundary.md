# Scenario 23: Over-500 Raised-Threshold Boundary — Evidence Record

**Date run:** 2026-08-25
**Scorecard:** AI Readiness Assessment (ReinventOps) — live URL confirmed from `manage.scoreapp.com` dashboard: `https://reinventops.scoreapp.com` (currently in Draft Mode; `/questions` is a valid direct entry point per the existing `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md:921` finding). Note: this is a **different** live URL than the one recorded in that finding (`arielle-69xcouvy.scoreapp.com`) — the scorecard has since moved to the `reinventops.scoreapp.com` custom domain. `index.html` was not checked/updated as part of this task (out of scope — tracked separately under Task 14 per the build plan).
**Result page reached:** `https://reinventops.scoreapp.com/results/6a8d3a27b6307353875227/result-the-builder-copy` (URL slug is a template artifact — the rendered page correctly displays the Explorer archetype content, not Builder; see Answers/Result below).

## Purpose

Prove the Over-500 raised-threshold modifier is correctly configured in the live ScoreApp scorecard: Scenario 12's exact fixture (Under-25, Diagnostic Fit in the high-50s) reused with only Q2 swapped to "Over 500" must still REJECT with no CTA, because Over-500 uses the same raised 60-point REJECT boundary as Under-25 rather than the standard 45-point boundary.

## Answers submitted

| Question | Answer |
|---|---|
| Q1 — Role | Owner / Founder / CEO |
| Q2 — Company size | **Over 500** |
| Q3 — AI adoption breadth | We use AI across teams, but each team does it differently — no shared approach |
| Q4 — Leadership AI strategy | We're starting to discuss it at a leadership level |
| Q5 — Current AI ROI | We're using AI tools but haven't seen clear business impact |
| Q6 — AI ownership | A few informal champions, but it isn't anyone's actual job |
| Q7 — Workflow category | Reporting & data aggregation |
| Q8 — People involved | 2–5 people |
| Q9 — Frequency | Weekly |
| Q10 — Hours per week | 5–10 hours |
| Q11a — Automation level | Partly automated, but it still takes significant hands-on work |
| Q11b — Symptoms | It's complex, with a lot of steps or handoffs (only) |
| Q12 — Primary cost | Team morale — it's tedious and people hate it |
| Q13 — Willingness to act | Possibly — we're exploring |
| Q14 — Contact capture | First name: Caleb; Company: Pebble Ridge Studio; Email: `arielleisrael3+scenario23qa@gmail.com` (controlled alias); Function: Operations; Marketing consent: Yes |

Identical to Scenario 12's fixture in every field except Q2.

## Observed result

- **AI Readiness (Layer A):** 38% — displayed on result page.
- **Archetype:** The Explorer — displayed on result page ("You are The Explorer").
- **Workflow Opportunity (Layer B):** 50% — displayed on result page.
- **Diagnostic Fit (Layer C) raw score:** not directly visible (hidden internally by design). Inferred = same as Scenario 12 (57, high-50s), since Q1 and Q3–Q13 — the only inputs that feed the Layer C raw score — are identical to Scenario 12. Q2 does not itself contribute points to the raw score; it only selects which threshold band applies.
- **CTA / booking block:** **Not present.** Full page text was extracted twice (via `get_page_text` and via a `document.body.innerText` JS check for "book/schedule/call/calendly/meeting" keywords) — no CTA, booking link, or qualifying language appeared anywhere on the result page. Page ends at the McKinsey citation and footer copyright with no further sections.

## Pass/fail against expected outcome (Step 2)

| Expected | Observed | Match |
|---|---|---|
| Layer C raw score in the high-50s (same as Scenario 12) | Not directly visible; inferred 57 by identical scoring inputs | Consistent |
| Over-500 raised-threshold modifier applies (REJECT < 60, HOLD 60–79, ACCEPT ≥ 80) | N/A — modifier's effect verified via absence of CTA | Consistent with modifier applying |
| REJECT with no Diagnostic CTA | No CTA/booking block found on result page | **PASS** |

**Result: PASS.** The Over-500 modifier is correctly configured in the live ScoreApp CTA Audience — a high-50s Diagnostic Fit score for an Over-500 respondent does not clear the raised 60-point REJECT boundary, and the booking CTA correctly does not appear. No fix to the CTA Audience was needed (Step 5 not triggered).

## Notes

- Scorecard is in Draft Mode; a top banner ("THIS SCORECARD IS IN DRAFT MODE, ONLY YOU CAN SEE THIS") was visible throughout the run. This does not affect scoring/audience logic, which is live-configured regardless of publish state.
- The result-page URL slug (`result-the-builder-copy`) is a naming artifact from the underlying ScoreApp result-page template and does not reflect a scoring defect — the archetype actually rendered on the page is Explorer, matching the expected 38% Layer A score band (30–54 → Explorer).
