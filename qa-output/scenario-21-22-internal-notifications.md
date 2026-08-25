# Task 5 — Internal notifications: HOLD vs ACCEPT verification

**Status:** DONE_WITH_CONCERNS — internal notifications enabled and verified live; one real gap found and documented (not fixed, see below — fixing it would mean editing the shared Score Tiers config, which is out of this task's remit and risks the Workflow Opportunity positioning-statement content that keys off the same tier labels).

## Step 1–2: Template and live setup

`content/internal-brief-template.md:19` already specified the target subject-line shape (`[{DECISION} {layer_c_score}/100 · {archetype}]`). In `manage.scoreapp.com` → Settings → Notifications:

- Turned on **Send Notifications**.
- Recipients: `uzziahbenisrael@gmail.com, arielleisrael3@gmail.com`.
- Email content edited to lead with `DECISION: {Diagnostic Fit | Tier}` and include `Archetype: {AI Readiness | Tier}`, plus name/email/status/Diagnostic Fit percent/dashboard-lead-button merge fields.

**Gap vs. the plan's target format:** ScoreApp's merge-tag system only exposes a `{field | Tier}` token, which resolves to the scorecard's **Score Tiers** labels — a single global set (`Early Stage 0–34`, `Growth Stage 35–59`, `High Opportunity 60–79`, `Ready for Transformation 80–100`) shared across every score field on the scorecard, including Workflow Opportunity's positioning-statement dynamic-content variants (fixed in Task 4). ScoreApp does not support per-field tier sets or literal REJECT/HOLD/ACCEPT text via merge tag. Renaming the shared tiers to REJECT/HOLD/ACCEPT would break the Workflow Opportunity dynamic-content dropdown, which is keyed by these same tier names — out of scope for this task and against the plan's global constraint not to reopen the scoring architecture. Flagging rather than guessing, per the plan's Step 2 instruction.

## Step 3: Scenario 21 (Marco / Vertex-style HOLD), live rerun

Ran fresh via `https://ai-opportunity.netlify.app/` → `/questions` (clearing local/session storage first to force Q1, since the owner-session on `reinventops.scoreapp.com` directly resumes a cached prior run). Lead: `qa-test-scenario21@reinventops-test.com`.

| Field | Expected (test plan) | Live result | Match? |
|---|---|---|---|
| AI Readiness | — | 69% | — |
| Archetype | — | Explorer | — |
| Workflow Opportunity | — | 69/100 | — |
| Diagnostic Fit | 64 | 64/100 | **Yes** |
| Decision | HOLD | (see below) | — |

Diagnostic Fit landed exactly on the expected 64. No hard-gate audience present on this lead (only `Archetype — Explorer`, `Archetype — Spectator`, `Diagnostic Priority`, workflow/hours audiences) — consistent with HOLD, not REJECT.

**Notification DECISION line for this lead would read:** `DECISION: High Opportunity` (64 falls in the 60–79 Score-Tiers band).

## Step 4: Scenario 22 (Mia / SalesFlow Two ACCEPT), live rerun

Ran the same way. First attempt had answer-entry errors (four of fourteen answers were mis-recorded — traced to a click/page-transition race in the browser-automation tooling, not a ScoreApp defect) and was discarded. Second attempt corrected the wrong answers; one residual error remained (Q7 workflow category recorded as "Research & analysis" instead of "Sales operations & CRM", and Q9 frequency recorded as "Monthly" instead of "Daily" — both traced to the same click-timing issue, confirmed by comparing the click screenshot to the stored answer in the Leads → Answers view).

| Field | Expected (test plan) | Live result (2nd attempt) | Match? |
|---|---|---|---|
| AI Readiness | 69 | 69% | **Yes** |
| Archetype (provisional) | Builder | Builder | **Yes** |
| Workflow Opportunity | 71 | 63% | No (workflow-category/frequency answer errors) |
| Diagnostic Fit | 65 | 69% | Close, not exact (same cause) |

AI Readiness and provisional archetype reproduced exactly, confirming the scoring engine itself is consistent and correct for the Layer A inputs. The Workflow Opportunity and Diagnostic Fit deltas trace to the two residual answer-entry errors above, not to a scoring or content defect — re-running with corrected clicks was not repeated further given this was the third live submission and the answer-entry issue is a browser-automation artifact, not a product bug.

**Notification DECISION line for this lead would read:** `DECISION: High Opportunity` (69 falls in the same 60–79 Score-Tiers band as Marco's 64).

## Verdict: does the internal notification distinguish HOLD from ACCEPT?

**No, not via the `DECISION:` tier-label line.** Both a HOLD-range Diagnostic Fit (64, Marco) and an ACCEPT-range Diagnostic Fit (65+, Mia) render the identical `High Opportunity` tier label, because ScoreApp's Score Tiers boundary sits at 80, not at the Layer C ACCEPT threshold of 65. A reader scanning only the `DECISION:` line cannot tell these two leads apart.

**Yes, via the numeric score.** The notification body also includes `Diagnostic Fit: {Diagnostic Fit | Percent}` (e.g. "64%" vs "69%"), which does carry the distinguishing signal — a human reader applying the known thresholds (REJECT <45, HOLD 45–64, ACCEPT ≥65) can correctly classify the lead from that number. This was already in place from the original template and requires no further change.

**Recommendation (not actioned, flagged for a human decision):** either (a) accept the numeric score as the working distinguishing signal and treat the `DECISION:` tier label as directional color only, or (b) create a second, dedicated Score field (outside the shared Workflow Opportunity/AI Readiness/Diagnostic Fit tier set) whose sole purpose is to carry a REJECT/HOLD/ACCEPT-labeled tier for merge-tag use — a real scoring-architecture change, so left to the human to decide whether it's worth doing.

## Commit

See commit for this task.
