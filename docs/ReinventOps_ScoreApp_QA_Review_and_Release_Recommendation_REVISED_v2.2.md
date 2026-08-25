# ReinventOps ScoreApp QA Review & Release Recommendation — Revised

## Overall Verdict

The completed test run still supports a **CONDITIONAL PASS**.

The scoring architecture itself does **not** need another redesign. The core engine performed well across the 22 scenarios: visible AI Readiness and Workflow Opportunity scores matched expectations; the 54/55 archetype boundary worked; G1–G3 demotion gates worked; HG1–HG5 suppressed the Diagnostic CTA as intended; Q11b behaved correctly even with a stray “None of these” selection; Q7 → Q7b worked; and the 44/45 REJECT→HOLD boundary behaved correctly.

The remaining work should be treated as targeted remediation and verification before public release—not another strategy cycle.

## 1. KEEP — Validate the Over-500 raised threshold with a dedicated boundary test

The canonical Master Reference and Qualification Criteria specify that **Under 25 and Over 500** companies use raised Layer C thresholds:

- **REJECT:** below 60
- **HOLD / QUALIFY ON CALL:** 60–79
- **ACCEPT:** 80+

The completed QA package did not actually prove the Over-500 modifier because Scenario 14 had a Diagnostic Fit score of 93. A score of 93 would ACCEPT under either the standard 65-point threshold or the raised 80-point threshold.

**Action:** add one targeted Over-500 boundary scenario. The cleanest version is essentially Scenario 12 with company size changed from **Under 25** to **Over 500**. The expected Layer C score should land around the high-50s. Under the canonical raised threshold, the result should be **REJECT with no CTA**. If the CTA appears, the Over-500 modifier is not configured correctly.

This is a targeted regression test only; there is no reason to rerun all 22 scenarios.

## 2. REVISED — Keep annual-hours estimates visible; do not show monetary estimates on result pages

Do **not** add the monetary labor-cost estimate to the prospect-facing results page.

The current assessment does not collect enough company-specific compensation, loaded labor rate, role mix, or automatable-percentage data to present a company-specific dollar estimate with the level of confidence ReinventOps should require. Displaying a monetary range at this stage could create false precision and weaken trust.

**Keep the annual-hours estimate.** It is directly tied to the respondent's answer to the collective hours-per-week question and is a useful, understandable signal without pretending to know the company's economics.

Recommended result-page structure:

- **Workflow Opportunity Score:** e.g. 81
- **Workflow Opportunity Tier:** e.g. Substantial
- **Estimated annual time tied to this workflow:** e.g. **1,500+ hours/year**

Do not show a dollar amount on the public result page.

The monetary model should remain an **internal/Diagnostic-stage tool**, where ReinventOps can validate loaded labor rates, automatable percentage, error/rework costs, capacity value, implementation cost, and operating cost before making an ROI claim.

**Source-of-truth implication:** update the Master Reference, scheduling workflow, test plan, and any results-page requirements that currently say the public result should display a cost range. The annual-hours estimate remains prospect-facing; monetary estimates move to the Diagnostic/internal layer.

## 3. KEEP — Configure the correct REJECT result-page copy by rejection reason

The Master Reference deliberately defines different not-qualified outcomes for different rejection reasons. The live test instead showed essentially the same access-oriented message across rejection cases.

That should be corrected before launch.

At minimum, route the public not-qualified copy into these families:

- **HG1 — Not ready to act:** acknowledge that the opportunity may exist, but timing/commitment is not there yet.
- **HG2 — Insufficient access:** encourage the respondent to bring the workflow owner or decision-maker into the conversation.
- **HG3 / HG4 — Workflow is healthy or too small:** explain that this particular workflow is not currently a strong enough economic lever.
- **HG5 — Too early:** explain that the organization is still at an earlier AI-adoption stage and should build foundational readiness before a workflow-specific Diagnostic.

The goal is not to make every rejected prospect feel “qualified.” The goal is to make the result feel accurate and useful based on why they did not qualify.

## 4. KEEP — Remove the “positioned to move on this now” contradiction

The tests surfaced a semantic conflict between prospect-facing Layer B copy and hidden Layer C qualification.

A respondent can receive copy such as:

> “You're positioned to move on this now.”

and then be correctly rejected because they are unlikely to act, the workflow runs smoothly, or another hard gate fires.

The scoring architecture is doing what it should. The problem is the wording.

**Change the high-readiness / high-opportunity positioning language so it describes the evidence without implying a sales/qualification decision.**

Recommended replacement:

> **You have strong organizational readiness and a workflow with meaningful improvement potential.**

Then allow the final CTA / not-qualified block to answer whether a Diagnostic is appropriate now.

## 5. KEEP — Turn on internal notifications and verify HOLD vs ACCEPT internally

Publicly, HOLD and ACCEPT are intentionally allowed to show the same Calendly CTA. That is fine.

Internally, however, ReinventOps must be able to distinguish them immediately.

**Action:** turn on the ScoreApp internal notifications and configure the internal brief so the decision is unmistakable. The notification should lead with something like:

- **[ACCEPT 65 · Explorer]**
- **[HOLD 64 · Explorer]**

and should include the relevant Layer C information, weak pillar, hard gates/soft flags, workflow information, and other fields needed to prepare for the Diagnostic.

Then rerun **Scenarios 21 and 22** and verify:

- Scenario 21 → **HOLD / QUALIFY ON CALL** internally
- Scenario 22 → **ACCEPT** internally

Also verify that the expected soft flags are present in the internal notification/brief.

This is an internal operating requirement, not something that needs to be exposed to the respondent.

## 6. UPDATED — Remove the separate email opt-in; verify unsubscribe behavior and assessment naming

The founder decision is to **remove the separate marketing-consent / email opt-in control before the results page**. Respondents should not have to check a box to receive ReinventOps follow-up emails after submitting their email address for the assessment.

**Action:** remove the optional marketing-consent field from the ScoreApp contact form and update the related automation/documentation so follow-up email delivery no longer depends on `opt_in = true`. Submitting an email address for the assessment should place the respondent into the intended results/follow-up email flow by default.

Every marketing or nurture email should include a clear **Unsubscribe** option at the bottom. Verify that using that link suppresses future marketing/nurture communications for that respondent. The one-time assessment result-delivery email remains appropriate as part of delivering the result requested by the respondent.

**Source-of-truth implication:** update the Master Reference, Q14/contact-form specification, email-sequence rules, automation logic, QA manifest, and regression expectations that currently describe marketing consent as optional or require `opt_in = true`.

**Assessment-name / email-copy fix:** change the quiz name from **“The AI Readiness Assessment”** to **“AI Readiness Assessment.”** This should resolve the duplicate article in the transactional message so the sentence reads: **“Thank you for completing the AI Readiness Assessment.”** Also replace or remove the generic **“YOUR BRAND LOGO”** placeholder with ReinventOps Group branding before launch.

**Targeted verification:** rerun Scenario 15 after these changes and confirm: (1) no separate opt-in checkbox appears, (2) the results email is delivered, (3) the intended follow-up sequence can run without a separate opt-in action, (4) each marketing/follow-up email includes an Unsubscribe link, and (5) unsubscribing stops future marketing/nurture emails.

## 7. KEEP — Remove required last name if ScoreApp allows it

The live ScoreApp contact form required a last name even though the revised Q14 specification should require only first name, company name, email address, and function. The separate marketing-consent field should now be removed.

Claude had to use “Test” as a placeholder because the QA manifest did not contain a last name.

Given the goal of minimizing friction, **remove the required last-name field if ScoreApp allows it**.

If ScoreApp technically requires a last name, retain it but update the canonical Master Reference, test scenarios, and QA manifest so the live form and source-of-truth documentation match.

## Revised Release Recommendation

Do **not** rerun all 22 scenarios. The scoring engine has already earned enough confidence.

Complete these targeted actions:

1. Run one dedicated **Over-500 raised-threshold** boundary test.
2. Keep **Workflow Opportunity tier + annual-hours estimate** visible, but remove/omit the **monetary cost range** from prospect-facing results.
3. Configure the four appropriate **REJECT copy families**.
4. Replace the “positioned to move on this now” language with neutral evidence-based positioning.
5. Turn on **internal notifications** and verify HOLD vs ACCEPT plus internal flags with Scenarios 21 and 22.
6. Remove the separate pre-results email opt-in, verify default follow-up delivery plus working Unsubscribe behavior, rename the quiz to “AI Readiness Assessment,” and replace the placeholder logo.
7. Remove required **last name** if possible; otherwise update the documentation.

### Targeted Regression Suite

After making the changes, rerun only the cases needed to prove the fixes:

- **Scenario 1** — normal qualified result-page baseline
- **Scenario 7** — HG1 / not ready
- **Scenario 8** — HG2 / insufficient access
- **Scenario 9** — HG3 / healthy workflow
- **Scenario 11** — HG5 / too early
- **Scenario 15** — Other workflow + no opt-in field + email/unsubscribe verification
- **Scenario 21** — HOLD internal notification
- **Scenario 22** — ACCEPT internal notification
- **New Over-500 boundary scenario** — raised threshold verification

For HG4 copy, either rerun **Scenario 10** as well or verify that HG3/HG4 intentionally share the same “workflow is fine / too small” result family in configuration.

## Final Status

| Area | Status |
|---|---|
| Scoring architecture | **PASS** |
| Visible score/archetype routing | **PASS** |
| Over-500 threshold modifier | **TARGETED VERIFICATION REQUIRED** |
| Public result economics | **REVISE — HOURS YES, DOLLARS NO** |
| Rejection-result copy | **FIX BEFORE LAUNCH** |
| Positioning copy | **FIX BEFORE LAUNCH** |
| Internal qualification workflow | **TURN ON + VERIFY** |
| Email subscription behavior | **REMOVE OPT-IN + VERIFY DEFAULT FOLLOW-UP + UNSUBSCRIBE** |
| Assessment naming/email copy | **RENAME TO “AI READINESS ASSESSMENT” + VERIFY EMAIL COPY** |
| Contact-form friction | **REMOVE LAST NAME IF POSSIBLE** |
| Overall | **CONDITIONAL PASS — targeted remediation, then launch** |

## Bottom Line

Do not reopen the scoring model. The remaining work is implementation cleanup and targeted verification around a scoring architecture that performed well under the test suite.

Once these fixes pass the targeted regression suite, the assessment should be ready to release publicly.
