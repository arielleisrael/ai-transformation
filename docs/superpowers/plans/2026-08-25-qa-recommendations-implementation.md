# QA Recommendations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Note on task shape:** this plan is not a code change — it is a mix of (a) source-of-truth content-doc edits in this repo and (b) live configuration changes in ScoreApp (`manage.scoreapp.com`, scorecard "AI Readiness Assessment"), done via the Claude in Chrome browser tools. Every task's "verify" step is a live browser check or a re-run scenario, not a test command. Load ScoreApp tools with `ToolSearch({query: "select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__form_input,mcp__claude-in-chrome__find,mcp__claude-in-chrome__tabs_create_mcp"})` once at the start of the session, and prefer `read_page`/`get_page_text` over screenshots to save tokens.

**Goal:** Implement all seven remediation items from `docs/ReinventOps_ScoreApp_QA_Review_and_Release_Recommendation_REVISED_v2.2.md`, keep every source-of-truth doc in sync with the live ScoreApp build, and clear the targeted regression suite before public release.

**Architecture:** Each task pairs a content-doc edit (the source of truth) with the matching live ScoreApp change, then a targeted browser verification. Docs edited, in rough order of appearance across the repo: `content/quiz-questions.md`, `content/results-copy.md`, `content/follow-up-sequences.md`, `content/internal-brief-template.md`, `docs/AI-Readiness-Assessment-Master-Reference.md`, `docs/assessment-reference.html` (hand-synchronized mirror of the Master Reference — no build script generates it), `docs/AI_Workflow_ROI_Diagnostic_Qualification_Criteria_v2.0.md`, `docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md`, `index.html`.

**Tech Stack:** Static Markdown/HTML content files (no build step); ScoreApp SaaS admin UI at `manage.scoreapp.com`; Claude in Chrome MCP tools for live verification.

## Global Constraints

- Do not reopen or redesign the scoring architecture (Layers A/B/C, hard gates, thresholds). This plan is remediation only.
- Do not rerun all 22 original QA scenarios. Only the targeted regression suite in Task 8 is required.
- Every content-doc edit must be mirrored into `docs/AI-Readiness-Assessment-Master-Reference.md` and, where the same passage exists there, into `docs/assessment-reference.html` (hand-sync, not generated) — these three plus the per-topic content files (`content/*.md`) are the canonical source of truth ScoreApp is built from.
- Never put a dollar/monetary figure on a prospect-facing result page. Hours only.
- Never imply a sales/qualification decision in Layer A/B copy — that judgment belongs only to the Layer C-driven CTA/not-qualified block.
- Preserve the priority order for not-qualified copy: **HG3/HG4 → HG1 → HG5 → HG2** (first match wins), per `content/results-copy.md` §"Not-Qualified Note".
- Preserve exact hard-gate answer-option wording referenced by ScoreApp Audience conditions (e.g. HG1's "Unlikely — mostly curious right now", HG3's "It runs smoothly — I'm mostly here to explore") — do not reword these while editing surrounding copy.

---

### Task 1: Add and run the Over-500 raised-threshold boundary scenario

**Files:**
- Modify: `docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md` (add new scenario near Scenario 14, ~line 1794, and in the scenario summary table ~line 182)
- Create: `qa-output/scenario-23-over500-boundary.md` (evidence record)

**Interfaces:**
- Consumes: Scenario 12's fixture (Under 25 boundary case) as the template — read it first (`grep -n "Scenario 12" docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md` to locate it) and copy its full answer set.
- Produces: a documented Scenario 23 fixture other regression runs can reference.

- [ ] **Step 1: Read Scenario 12 in full**

```bash
grep -n "Scenario 12" docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md
```
Read that section (all answers, expected scores) with the Read tool so you have the exact fixture to clone.

- [ ] **Step 2: Draft Scenario 23 in the test plan**

Add a new scenario section modeled exactly on Scenario 14's structure (find it at `docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md:1794`), titled **"Scenario 23: Over-500 Raised-Threshold Boundary"**. Body: identical answers to Scenario 12 except Q2 = "Over 500" instead of "Under 25". State the expected outcome explicitly:
- Diagnostic Fit (Layer C) raw score: same as Scenario 12's raw score (should land in the high-50s per the QA doc).
- Because Q2 = Over 500, the raised-threshold modifier applies: REJECT below 60, HOLD 60–79, ACCEPT 80+.
- Expected result: **REJECT with no Diagnostic CTA** (a high-50s score is below the raised 60 REJECT boundary).
- Failure signal: if the booking CTA appears, the Over-500 modifier is not configured correctly in the ScoreApp CTA Audience (`content/quiz-questions.md` §8 "CTA audience").

Also add one row to the scenario summary table near line 182, matching the format of the Scenario 14 row.

- [ ] **Step 3: Run Scenario 23 live**

Using the Claude in Chrome tools, open the live scorecard (confirm current URL first — `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md:921` warns the URL in `index.html` may be stale; verify the current one from the ScoreApp dashboard at `manage.scoreapp.com` rather than trusting a cached link), and submit Scenario 23's answers exactly as drafted.

- [ ] **Step 4: Record the evidence**

Write `qa-output/scenario-23-over500-boundary.md` with: the answers submitted, the resulting Layer C raw score shown internally (or inferred), the result page reached, and whether the CTA appeared. State pass/fail against Step 2's expected outcome.

- [ ] **Step 5: If it fails, fix the CTA Audience**

If the CTA appears when it shouldn't, open `manage.scoreapp.com` → the scorecard → Audiences → the CTA audience (`content/quiz-questions.md:432-443`) and confirm the "Diagnostic Fit % ≥ 45" condition is actually the two-tier raised-threshold condition (≥65 standard, ≥80 when Q2 ∈ {Under 25, Over 500}) rather than a flat 45%. Fix, re-save, and repeat Step 3.

- [ ] **Step 6: Commit**

```bash
git add docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md qa-output/scenario-23-over500-boundary.md
git commit -m "test: add Over-500 raised-threshold boundary scenario"
```

---

### Task 2: Remove monetary estimates from the public results page; keep annual hours

**Files:**
- Modify: `content/results-copy.md:78-93` (Dynamic Benchmark section)
- Modify: `docs/AI-Readiness-Assessment-Master-Reference.md` (mirrors the same benchmark copy — locate with `grep -n "150+ hours\|equivalent to roughly" docs/AI-Readiness-Assessment-Master-Reference.md`)
- Modify: `docs/assessment-reference.html` (same, HTML-escaped mirror)
- Modify: `content/follow-up-sequences.md` (the respondent-brief email at line ~30-35 quotes `{annual_cost_low}–{annual_cost_high}` — this is the *internal/email* layer, which the QA doc allows to keep dollar estimates as an internal tool per §2; leave the email copy alone but re-read it to confirm it isn't rendered on the public page)

**Interfaces:**
- Consumes: nothing new.
- Produces: a "hours only" public benchmark block later tasks and regression scenarios will read against.

- [ ] **Step 1: Edit the five Dynamic Benchmark lines in results-copy.md**

Replace each of the five conditional strings (`content/results-copy.md:81,84,87,90,93`) to drop the dollar clause. Example for the first:

Old:
```
"Based on your answers, your team is spending an estimated 150+ hours per year on this workflow — equivalent to roughly $7,500–$11,000 in annual labor cost at average knowledge worker rates."
```
New:
```
"Based on your answers, your team is spending an estimated 150+ hours per year on this workflow — time that could be redirected toward higher-value work."
```

Apply the same pattern (keep the hours figure, drop everything from "— equivalent to" onward, replace with a short non-monetary closer) to the 375+, 750+, 1,500+, and 2,250+ hour variants.

- [ ] **Step 2: Add an explicit "no dollar amount" note above the table**

In `content/results-copy.md`, immediately above the "### Dynamic Benchmark" heading (line 78), add:

```
> **No monetary estimate on the public result page.** The assessment does not collect enough company-specific compensation, loaded labor rate, role mix, or automatable-percentage data to present a company-specific dollar figure with the confidence ReinventOps requires. The annual-hours estimate above is the only economic figure shown to respondents. A monetary range remains an internal/Diagnostic-stage tool — see `content/follow-up-sequences.md` for where `{annual_cost_low}`/`{annual_cost_high}` are still used, internally, in the respondent-brief email.
```

- [ ] **Step 3: Mirror the change into the Master Reference and the HTML mirror**

Find the matching benchmark passage in `docs/AI-Readiness-Assessment-Master-Reference.md` and apply the identical wording change from Step 1, plus the same note from Step 2. Then find the HTML-escaped equivalent in `docs/assessment-reference.html` (search for `equivalent to roughly`) and apply the same change, HTML-escaping the em dash and curly quotes consistently with the surrounding markup.

- [ ] **Step 4: Update the live ScoreApp Benchmark Stats section**

In `manage.scoreapp.com`, open the scorecard's result pages (all four: Spectator, Explorer, Builder, Architect) and find the Dynamic Benchmark text block/section (conditional copy keyed on Q10, per `content/results-copy.md:78`). Replace the live copy with the five updated strings from Step 1, one per Q10 condition, on all four result pages.

- [ ] **Step 5: Verify live**

Using Claude in Chrome, submit the quiz with Q10 = "21–40 hours" (or any one condition) and confirm the live result page shows "estimated 1,500+ hours per year" with no dollar figure anywhere on the page. Use `get_page_text` to check the full rendered page text for a `$` character on the result page — there should be none.

- [ ] **Step 6: Commit**

```bash
git add content/results-copy.md docs/AI-Readiness-Assessment-Master-Reference.md docs/assessment-reference.html
git commit -m "content: remove monetary estimates from public result pages, keep hours"
```

---

### Task 3: Route REJECT copy by rejection reason (four gate-specific variants)

**Files:**
- Modify: `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md` (update the stale "Simplification recorded" note at ~line 884 once the live fix ships)
- No content-doc copy changes needed — the four variants already exist verbatim at `content/results-copy.md:325-336`. This task is a **live ScoreApp Audience/section-visibility fix only**.

**Interfaces:**
- Consumes: the existing `DQ-HG1` through `DQ-HG5` single-purpose audiences noted as already built in `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md:743` (verify they still exist before rebuilding).
- Produces: four mutually-exclusive "not-qualified" sections per result page, each visible to exactly one composite audience.

- [ ] **Step 1: Confirm current (broken) state**

In `manage.scoreapp.com`, open one result page (e.g. Architect) and find the "Where to go from here" / not-qualified section. Per `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md:882-884`, this currently ships **one** default variant (the HG2/access copy) unconditionally visible to the whole `Diagnostic Disqualified` audience — confirm this is still the case.

- [ ] **Step 2: Build four composite priority audiences**

Under Audiences, using the existing `DQ-HG1`–`DQ-HG5` single-gate audiences (verify with `read_page` that they exist; if not, rebuild each from the corresponding row in `content/quiz-questions.md:360-366`), create four new composite audiences that encode the priority order from `content/results-copy.md:323` (HG3/HG4 → HG1 → HG5 → HG2, first match wins):

1. **`NQ-Copy-1-WorkflowFine`** = `DQ-HG3` OR `DQ-HG4`
2. **`NQ-Copy-2-NotReady`** = `DQ-HG1` AND NOT (`DQ-HG3` OR `DQ-HG4`)
3. **`NQ-Copy-3-TooEarly`** = `DQ-HG5` AND NOT (`DQ-HG3` OR `DQ-HG4` OR `DQ-HG1`)
4. **`NQ-Copy-4-AccessScale`** = `Diagnostic Disqualified` AND NOT (`DQ-HG3` OR `DQ-HG4` OR `DQ-HG1` OR `DQ-HG5`)

If ScoreApp's Audience builder cannot express `AND NOT` directly, use the negation form each rule surfaces (e.g. "is not in audience") — confirmed available per the same build plan's Task 8 notes on Audience condition types. If nesting genuinely cannot express this, fall back to one Audience per gate ordered by which section-visibility rule you apply first, and document the limitation in Step 5's log update rather than silently shipping a partial fix.

- [ ] **Step 3: Create four separate not-qualified sections on each of the four result pages**

Duplicate the existing not-qualified section three times on each result page (Spectator, Explorer, Builder, Architect — 16 sections total). Set each section's copy to the matching variant from `content/results-copy.md:325-336` verbatim:
- Section A copy = "Based on what you described, this particular workflow probably isn't where your biggest opportunity is hiding…" → visibility: Audience Based → Show to `NQ-Copy-1-WorkflowFine` only.
- Section B copy = "You flagged a real workflow, and the opportunity in it looks legitimate…" → Show to `NQ-Copy-2-NotReady` only.
- Section C copy = "Your results point to a real opportunity ahead…" → Show to `NQ-Copy-3-TooEarly` only.
- Section D copy = "Your results are worth sharing. The people who'd need to be part of a conversation…" → Show to `NQ-Copy-4-AccessScale` only.

Delete or hide the old single default section once all four are wired and verified (Step 4), so a REJECT respondent never sees two not-qualified blocks stacked.

- [ ] **Step 4: Verify with four fixtures**

Using Claude in Chrome, run four quick quiz submissions, each designed to fire exactly one gate (reuse fixtures from `docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md` — Scenario 9 for HG3, Scenario 7 for HG1, Scenario 11 for HG5, Scenario 8 for HG2 per the QA doc's regression list). For each, confirm via `get_page_text` that exactly the matching copy variant renders and no other not-qualified block appears.

- [ ] **Step 5: Update the stale plan note**

In `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md` around line 884, append a dated note: the single-default simplification has been superseded — four gate-specific composite audiences now drive four distinct not-qualified sections per result page, verified against Scenarios 7/8/9/11 on [date]. If Step 2's `AND NOT` nesting was not fully expressible, say exactly which fallback was used instead.

- [ ] **Step 6: Commit**

```bash
git add docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md
git commit -m "docs: record live fix for gate-specific REJECT copy routing"
```

---

### Task 4: Replace the "positioned to move on this now" contradiction

**Files:**
- Modify: `content/results-copy.md:63`
- Modify: `docs/AI-Readiness-Assessment-Master-Reference.md:635`
- Modify: `docs/assessment-reference.html:406`

**Interfaces:**
- Consumes: nothing new.
- Produces: neutral Layer A/B positioning copy that later regression scenarios (Task 8) will check does not imply qualification.

- [ ] **Step 1: Edit results-copy.md**

At `content/results-copy.md:63`, in the 2×2 positioning table, replace the "Readiness high / Opportunity high" cell.

Old:
```
"You're positioned to move on this now. You have the organizational readiness *and* a workflow worth the effort. That combination is rarer than it sounds."
```
New:
```
"You have strong organizational readiness and a workflow with meaningful improvement potential. That combination is rarer than it sounds."
```

- [ ] **Step 2: Mirror into the Master Reference**

At `docs/AI-Readiness-Assessment-Master-Reference.md:635`, apply the identical replacement (same table, same cell).

- [ ] **Step 3: Mirror into the HTML reference**

At `docs/assessment-reference.html:406`, replace the equivalent HTML-escaped `<td>` cell content with the same new copy (watch for `&#x27;` apostrophe escaping and `<em>` around "and" if you keep the emphasis — the new copy no longer needs the `*and*` emphasis since "and" is no longer contrasting a decision).

- [ ] **Step 4: Update the live ScoreApp positioning-statement section**

On all four result pages in `manage.scoreapp.com`, find the Positioning Statement section (the 2×2-driven copy block described in `content/results-copy.md:66` as "the line designed to travel"). Update the Readiness-high/Opportunity-high variant text to match Step 1's new copy exactly, on each of the four pages where it can appear.

- [ ] **Step 5: Verify live**

Run a fixture that lands Readiness high + Opportunity high (e.g. a Builder or Architect profile with a high Workflow Opportunity score and no hard gate) and confirm via `get_page_text` that the page shows "You have strong organizational readiness and a workflow with meaningful improvement potential" and does **not** contain the string "positioned to move on this now" anywhere in the rendered page.

- [ ] **Step 6: Commit**

```bash
git add content/results-copy.md docs/AI-Readiness-Assessment-Master-Reference.md docs/assessment-reference.html
git commit -m "content: replace positioning copy that implied a qualification decision"
```

---

### Task 5: Turn on internal notifications; verify HOLD vs ACCEPT

**Files:**
- Modify: `content/internal-brief-template.md` (subject-line format already matches the target — verify, don't rewrite unless it's missing the bracketed decision lead)

**Interfaces:**
- Consumes: `content/internal-brief-template.md:19` subject-line template `[{DECISION} {layer_c_score}/100 · {archetype}] {first_name} {last_initial}. at {company_name}` — already matches the QA doc's requested format (e.g. `[ACCEPT 65 · Explorer]`).
- Produces: a live, verified internal notification channel; no new content file.

- [ ] **Step 1: Confirm the brief template already has the right shape**

Read `content/internal-brief-template.md:1-60` and confirm the subject line (line 19) and body already include: DECISION, layer_c_score, archetype, weak pillar, hard gates/soft flags, workflow information. Per the earlier grep, this already appears to be in place — do not add new fields unless something from the QA doc's list (line 91) is actually missing after this read.

- [ ] **Step 2: Turn on internal notifications in ScoreApp**

In `manage.scoreapp.com`, open the scorecard's notification/email settings and enable internal (founder-facing) notifications on every lead submission. Confirm the notification email is wired to the subject-line and body template from Step 1 (or as close to it as ScoreApp's native notification templating allows — note any gaps rather than silently dropping fields).

- [ ] **Step 3: Rerun Scenario 21 and confirm HOLD**

Using Claude in Chrome, resubmit Scenario 21's answers (locate the exact fixture: `grep -n "Scenario 21" docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md`). Confirm the internal notification received (check the notification destination — email inbox or ScoreApp's Leads view, whichever the user has configured) leads with `[HOLD 64 · Explorer]` or equivalent, and lists the expected soft flags for that scenario.

- [ ] **Step 4: Rerun Scenario 22 and confirm ACCEPT**

Same as Step 3 for Scenario 22 (`grep -n "Scenario 22" docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md`), confirming `[ACCEPT 65 · ...]`-style lead and correct soft flags.

- [ ] **Step 5: Record the evidence**

Write `qa-output/scenario-21-22-internal-notifications.md` documenting what the internal notification showed for each scenario (decision, score, archetype, weak pillar, gates/flags) alongside the expected values from the test plan, and a pass/fail verdict.

- [ ] **Step 6: Commit**

```bash
git add qa-output/scenario-21-22-internal-notifications.md
git commit -m "test: verify internal notifications distinguish HOLD vs ACCEPT"
```

---

### Task 6: Remove the pre-results email opt-in; verify unsubscribe and rename the assessment

**Status (2026-08-26): DONE WITH CONCERNS.** Opt-in removal is fully shipped and live-verified (content mirrors updated everywhere; live form confirmed on Implied Consent with no checkbox; no `Opt In` condition remains in any live Audience; rename, transactional copy, and logo all verified — see `qa-output/scenario-15-optin-removal.md` and `qa-output/regression-suite-2026-08-25.md`). **Step 10 is BLOCKED**, not done: no Unsubscribe link could be verified because Sequences 2/3 have no live email automation in ScoreApp yet (Integrate page shows Zapier/webhooks/ActiveCampaign all unconfigured). The `index.html` "one-click unsubscribe" trust-signal line from Step 7 was removed rather than published, since it can't be substantiated until Step 10 is unblocked.

**Files:**
- Modify: `content/quiz-questions.md:283-302` (Q14 Contact Capture section)
- Modify: `content/results-copy.md:289` (Primary CTA copy note referencing `opt_in`)
- Modify: `content/follow-up-sequences.md:1-15,101,196,215` (header warning, per-sequence gates, the opt_in=false row, changelog)
- Modify: `content/internal-brief-template.md:19,49,55,58,212,226` (subject line uses `last_initial` — unaffected; remove/rework the consent line and gating rule)
- Modify: `docs/AI-Readiness-Assessment-Master-Reference.md` (mirrors of the same Q14/consent/opt-in passages — locate with `grep -n "opt_in\|Marketing consent\|opt-in" docs/AI-Readiness-Assessment-Master-Reference.md`)
- Modify: `docs/assessment-reference.html` (HTML mirror of the same passages)
- Modify: `docs/AI_Workflow_ROI_Diagnostic_Qualification_Criteria_v2.0.md` if it references opt-in gating (check first: `grep -n opt_in docs/AI_Workflow_ROI_Diagnostic_Qualification_Criteria_v2.0.md` — none found in the earlier scan, likely no change needed, confirm)
- Modify: `docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md:145,2924` (opt-in-related regression checklist items)
- Modify: `index.html:604,693` (the "Follow-up emails are opt-in only" trust-signal line, now inaccurate)

**Interfaces:**
- Consumes: nothing new.
- Produces: updated source-of-truth docs that no longer gate email delivery on `opt_in`; a live ScoreApp form with no marketing-consent checkbox; a verified Unsubscribe flow.

- [x] **Step 1: Update Q14 spec in quiz-questions.md**

At `content/quiz-questions.md:288-296`, remove the "Marketing consent" row from the field table (line 294). Replace lines 300-302:

Old:
```
**Consent is set to Optional, not Required**, so a missing tick does not cost the lead — the results page delivers instantly on screen regardless. ScoreApp stores a timestamp plus the exact opt-in wording and passes `opt_in` on every webhook event.

> ⚠️ **All three email sequences must be gated on `opt_in = true`.**
```
New:
```
**No separate marketing-consent checkbox.** Submitting an email address for the assessment is the respondent's request for their result and places them into the intended results/follow-up flow by default — there is no additional opt-in action required. Every marketing/nurture email must carry a working **Unsubscribe** link; using it suppresses future marketing/nurture email to that respondent. The one-time result-delivery email is not a marketing email and is sent regardless of unsubscribe status, since it is the artifact the respondent explicitly requested by submitting the form.
```

- [x] **Step 2: Update the CTA copy note in results-copy.md**

At `content/results-copy.md:289`, replace:
```
Consent checkbox state from the contact form governs whether any follow-up email may be sent. **No sequence fires without `opt_in = true`.**
```
with:
```
Submitting an email address places the respondent into the results/follow-up flow by default — no separate consent checkbox gates delivery. Every marketing/nurture email carries an Unsubscribe link (see `content/follow-up-sequences.md`).
```

- [x] **Step 3: Update follow-up-sequences.md**

At the top of `content/follow-up-sequences.md` (lines 4-6), replace the opt-in warning block with:
```
> **No separate opt-in gates delivery.** Submitting an email address on the results page places the respondent into Sequence 1 by default. Sequences 2 and 3 (nurture/follow-up) require an **Unsubscribe** link in every send; using it stops all future marketing/nurture email to that respondent. The one-time Sequence 1 result-delivery email is not affected by unsubscribe status.
```
Replace every `**Gate:** \`opt_in = true\`` line (lines 14, 72, 101) with `**Gate:** none (sends by default); respondent must not have unsubscribed from marketing/nurture email.` Remove the `opt_in = false` row from the table at line 196 (or replace it with an "Unsubscribed" row showing the same No/—/No/No pattern for sequences 2/3, Yes for the one-time result email if applicable — confirm against Step 1's rule that the result-delivery email is unaffected). Update the changelog entry at line 215 to state consent gating was removed and unsubscribe gating was added instead.

- [x] **Step 4: Update internal-brief-template.md**

At `content/internal-brief-template.md:55,58,212`, remove the "Marketing consent" line and the `opt_in`-gating rule and the `CONSENT:` line, since there is no longer a consent field to report. If the internal brief should instead report unsubscribe status, add a line: `UNSUBSCRIBED: {IF unsubscribed: "Yes — marketing/nurture suppressed" ELSE: "No"}`. Update the changelog note at line 226 accordingly.

- [x] **Step 5: Mirror all of the above into the Master Reference and HTML reference**

Find and update the matching Q14/consent/opt-in passages in `docs/AI-Readiness-Assessment-Master-Reference.md` (grep for `opt_in|Marketing consent|opt-in` first to enumerate every hit) and the HTML-escaped equivalents in `docs/assessment-reference.html`. Also update the fact table row `docs/AI-Readiness-Assessment-Master-Reference.md:773` ("Native GDPR consent with timestamp + wording, passed as `opt_in`") — this describes a ScoreApp platform capability, not the assessment's own field choice, so leave the platform-capability fact as-is but add a note that the assessment no longer surfaces this as a respondent-facing checkbox.

- [x] **Step 6: Update the pre-launch test plan's opt-in checklist items**

At `docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md:145`, replace the opt_in-based checklist item with one that checks the Unsubscribe flow instead. At line 2924, replace "Marketing-consent behavior was correct: opt-in false received on-screen results but no automated respondent email sequence" with "No separate opt-in checkbox appears on the contact form; the results email and default follow-up sequence send regardless; Unsubscribe suppresses future marketing/nurture email."

- [x] **Step 7: Fix the now-inaccurate trust-signal copy in index.html**

At `index.html:604` and `:693`, the line `<span class="meta-item">Follow-up emails are opt-in only</span>` is no longer accurate once opt-in is removed. Read the surrounding markup first (`Read index.html` around those lines) to match formatting, then replace the text with an accurate claim, e.g. `Every follow-up email includes one-click unsubscribe`. Apply the same change at both occurrences (hero and final-cta meta rows, per `docs/superpowers/plans/2026-08-24-copy-review-implementation.md:34`).

**Deviation (2026-08-26):** replaced with removing the line entirely rather than the suggested unsubscribe claim — that claim can't be substantiated until Step 10 is unblocked (flagged in code review, see PR #2).

- [x] **Step 8: Remove the marketing-consent field from the live ScoreApp Lead Form**

In `manage.scoreapp.com` → `Settings → Lead Form`, delete or disable the "Explicit Consent (Optional)" field. Confirm the form now asks only for First name, Company name, Email, Function (plus Last name — handled separately in Task 7).

- [x] **Step 9: Rewire ScoreApp automations off `opt_in`**

Find every ScoreApp Audience or automation condition keyed on the `Opt In` lead-form-answer field (noted as available in `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md:1187`) and remove that condition, so Sequence 1 sends to every submitter by default. Confirm Sequences 2/3 still route on Layer C decision as before (`content/follow-up-sequences.md` gate table), just without the opt_in AND-clause.

- [ ] **Step 10: Add/verify Unsubscribe on every marketing/nurture template — BLOCKED**

Open each of ScoreApp's marketing/nurture email templates (Sequences 2 and 3 per `content/follow-up-sequences.md`) and confirm a working Unsubscribe link/footer is present on each (ScoreApp typically provides this natively — confirm it's enabled, not just assumed). Do not add it to the one-time Sequence 1 result-delivery email if ScoreApp treats it as transactional; if ScoreApp forces the same footer on all emails, that's acceptable too — just confirm behavior matches Step 1's rule that the result-delivery email itself is unaffected by unsubscribe status.

**Blocked (2026-08-26):** no live ScoreApp email automation exists yet for Sequences 2/3 — the Integrate page shows Zapier/webhooks/ActiveCampaign all unconfigured, so there are no templates to check. `qa-output/scenario-15-optin-removal.md` records this condition, and the sibling check in Step 14 (below), as **N/A** rather than PASS. This step can't close until the Sequence 2/3 automation itself is built — tracked as separate future work, not part of this task's remaining scope.

- [x] **Step 11: Rename the scorecard**

In `manage.scoreapp.com` → `Scorecard Settings → General`, confirm the scorecard name is exactly **"AI Readiness Assessment"** (not "The AI Readiness Assessment" — per `content/results-copy.md:359` this rename already shipped on 2026-08-24; verify it is still correct and hasn't reverted).

- [x] **Step 12: Verify the transactional email copy**

Open the transactional "results delivered" email template in ScoreApp and confirm it now reads "Thank you for completing the AI Readiness Assessment." (no duplicate article). If it still reads "the The AI Readiness Assessment" or similar, the merge tag is pulling a stale cached scorecard name — re-save the scorecard name in Step 11 and re-check.

- [x] **Step 13: Verify the brand logo replacement**

The user has already uploaded the ReinventOps logo asset into the scorecard (via ScoreApp's Footer/Theme Logo picker), resolving the "YOUR BRAND LOGO" placeholder noted as outstanding in `docs/superpowers/plans/2026-08-24-copy-review-implementation.md:38`. Confirm live in `manage.scoreapp.com` that the Footer section (and any other place the logo placeholder appeared) now renders the real logo, not the placeholder text, on at least two result pages (spot-check per the same pattern used for the copyright-text fix). Update `docs/superpowers/plans/2026-08-24-copy-review-implementation.md:38` with a dated note that the logo item is now resolved.

- [x] **Step 14: Rerun Scenario 15 and verify all five conditions — 3/5 PASS, 2/5 N/A (blocked, see Step 10)**

Using Claude in Chrome, resubmit Scenario 15's answers (`grep -n "Scenario 15" docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md`). Confirm: (1) no consent checkbox appears on the contact form (`read_page` the form and check for the removed field), (2) the results email is delivered, (3) the follow-up sequence enrolls without any opt-in action, (4) each marketing/nurture email template carries an Unsubscribe link, (5) using Unsubscribe (test on a scratch address, not a real prospect) stops further marketing/nurture email to that address.

Conditions (1)–(3) PASS live. Conditions (4)–(5) are N/A — blocked on Step 10.

- [x] **Step 15: Record the evidence**

Write `qa-output/scenario-15-optin-removal.md` with the five checks from Step 14 and their pass/fail status.

- [x] **Step 16: Commit**

```bash
git add content/quiz-questions.md content/results-copy.md content/follow-up-sequences.md content/internal-brief-template.md docs/AI-Readiness-Assessment-Master-Reference.md docs/assessment-reference.html docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md index.html qa-output/scenario-15-optin-removal.md
git commit -m "content: remove opt-in gating, verify unsubscribe, rename assessment"
```

---

### Task 7: Remove the required last-name field, or document why it stays

**Files:**
- Modify (conditionally — only if the field is removed live): `content/internal-brief-template.md:19,49` (`{last_initial}` / `{last_name}` merge tags)
- Modify (conditionally): `docs/AI-Readiness-Assessment-Master-Reference.md`, `docs/assessment-reference.html`, `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md:579-584,1195-1196` (all currently document Last name as a kept, required field — these need a dated correction either way this branches)

**Interfaces:**
- Consumes: the ScoreApp Lead Form's actual field-removal capability (unknown until checked live).
- Produces: either a lower-friction form (last name gone, brief template reworked to first-name-only) or an accurate doc trail explaining why it stays.

- [ ] **Step 1: Check whether ScoreApp allows removing Last Name**

In `manage.scoreapp.com` → `Settings → Lead Form`, attempt to delete or make optional the "Last name" field. ScoreApp's built-in fields (First name, Last name, Email) may be structurally required by the platform — confirm one way or the other before proceeding.

- [ ] **Step 2a: If removable — remove it and rework the brief template**

Remove the field in ScoreApp. Then edit `content/internal-brief-template.md`:
- Line 19 subject line: change `{first_name} {last_initial}.` to `{first_name}`.
- Line 49 respondent block: change `Name: {first_name} {last_name}` to `Name: {first_name}`.
Update the changelog note near line 226 to record the removal and the merge-tag rework, with today's date.

Then update every doc that currently documents Last name as a required kept field:
- `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md:579` (field table) — mark the row removed, with a dated note explaining the reversal of the 2026-08-23 "kept" decision (the QA review changed the calculus once the consent field was also removed, tightening the friction budget).
- `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md:584,1195-1196` — append a dated correction rather than deleting the history (this is a log of what happened, not a spec).
- `content/quiz-questions.md` Q14 table — already correct (never listed Last name); no change needed, but add a one-line note that this now matches the live form as of today's date.
- `docs/AI-Readiness-Assessment-Master-Reference.md:318` and around — confirm it matches `content/quiz-questions.md`'s Q14 table (First name / Company name / Email / Function only); if it ever added Last name, remove it there too.

- [ ] **Step 2b: If not removable — leave it and correct the docs**

Leave the ScoreApp field as-is (required). Update `content/quiz-questions.md`'s Q14 field table (`content/quiz-questions.md:288-296`) to add a "Last name" row (Text, Required) matching the live form, with a one-line note: "ScoreApp's built-in Last name field cannot be removed or made optional; kept as required to match the live form rather than leave the spec inaccurate." Mirror the same table addition into `docs/AI-Readiness-Assessment-Master-Reference.md`'s Q14 section and `docs/assessment-reference.html`. Do not touch `content/internal-brief-template.md` — it already consumes `{last_name}`/`{last_initial}` correctly for this branch.

- [ ] **Step 3: Verify live**

Using Claude in Chrome, `read_page` the live contact form and confirm its actual field list matches whichever branch (2a or 2b) you took, and that the source-of-truth Q14 table in `content/quiz-questions.md` and `docs/AI-Readiness-Assessment-Master-Reference.md` says the same thing.

- [ ] **Step 4: Commit**

```bash
git add content/quiz-questions.md content/internal-brief-template.md docs/AI-Readiness-Assessment-Master-Reference.md docs/assessment-reference.html docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md
git commit -m "content: resolve last-name field per live ScoreApp capability"
```

---

### Task 8: Targeted regression suite

**Files:**
- Create: `qa-output/regression-suite-2026-08-25.md`

**Interfaces:**
- Consumes: fixtures for Scenarios 1, 7, 8, 9, 11, 15, 21, 22, and 23 (new), all already read or run in Tasks 1–7.
- Produces: a single evidence file a human reviewer can use to sign off on release.

- [ ] **Step 1: Confirm Scenario 15, 21, 22, and 23 evidence already exists**

Tasks 1, 5, and 6 already produced `qa-output/scenario-23-over500-boundary.md`, `qa-output/scenario-21-22-internal-notifications.md`, and `qa-output/scenario-15-optin-removal.md`. Read them to pull forward into the summary rather than re-running those four.

- [ ] **Step 2: Run Scenario 1 (baseline)**

Using Claude in Chrome, submit Scenario 1's fixture (`grep -n "Scenario 1[^0-9]" docs/ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md`). Confirm the result page matches the expected archetype/scores, the CTA appears (qualified baseline), and the new positioning copy from Task 4 renders correctly if this scenario lands in the Readiness-high/Opportunity-high cell.

- [ ] **Step 3: Run Scenario 7 (HG1) and confirm the correct not-qualified copy**

Submit Scenario 7's fixture. Confirm HG1 fires (no CTA) and, per Task 3's fix, the page shows the "You flagged a real workflow… acting on it isn't on the table right now" copy — not the generic access-oriented fallback.

- [ ] **Step 4: Run Scenario 8 (HG2) and confirm the correct not-qualified copy**

Submit Scenario 8's fixture. Confirm HG2 fires and the page shows the "Your results are worth sharing. The people who'd need to be part of a conversation…" copy.

- [ ] **Step 5: Run Scenario 9 (HG3) and confirm the correct not-qualified copy**

Submit Scenario 9's fixture. Confirm HG3 fires and the page shows the "Based on what you described, this particular workflow probably isn't where your biggest opportunity is hiding…" copy.

- [ ] **Step 6: Run Scenario 10 or verify HG3/HG4 share copy intentionally**

Per the QA doc, either rerun Scenario 10 (HG4) or confirm in the Task 3 Audience config that HG4 is deliberately grouped with HG3 in the same `NQ-Copy-1-WorkflowFine` audience. Since Task 3 Step 2 already groups them by design, running Scenario 10 is the stronger verification — submit its fixture and confirm the same HG3/HG4 copy renders.

- [ ] **Step 7: Run Scenario 11 (HG5) and confirm the correct not-qualified copy**

Submit Scenario 11's fixture. Confirm HG5 fires and the page shows the "Your results point to a real opportunity ahead, and capturing it starts with building the foundation first…" copy.

- [ ] **Step 8: Cross-check no dollar amounts leaked back in**

Across every result page visited in Steps 2-7, and in the Task 1/5/6 evidence, confirm `get_page_text` output contains no `$` character on any public result page.

- [ ] **Step 9: Write the consolidated regression report**

Write `qa-output/regression-suite-2026-08-25.md` summarizing all nine scenarios (1, 7, 8, 9, 10, 11, 15, 21, 22, 23 — ten total including the Scenario 10 addition from Step 6) with pass/fail per scenario and a final go/no-go recommendation. Reference the individual evidence files from Tasks 1, 5, and 6 rather than duplicating their content.

- [ ] **Step 10: Commit**

```bash
git add qa-output/
git commit -m "test: complete targeted regression suite for QA remediation"
```

---

## Self-Review Notes

- **Spec coverage:** all seven QA-doc recommendations map 1:1 to Tasks 1–7; the "Revised Release Recommendation" and "Targeted Regression Suite" sections map to Task 8.
- **Logo item** (Task 6 Step 13): the user has already uploaded the ReinventOps logo asset into the scorecard — this step is now verify-only (confirm it renders in place of the placeholder), not blocked on an asset.
- **Task 7 branches** because ScoreApp's field-removal capability for a built-in Last Name field is unknown until checked live; both branches are fully specified so the executor isn't blocked mid-task.
- **Task 3** is flagged as the highest platform-capability risk (composite `AND NOT` Audience nesting) and includes an explicit fallback instruction rather than silently shipping a partial fix if ScoreApp can't express it natively.
