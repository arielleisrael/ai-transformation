Claude Code ScoreApp QA Execution Guide

Automated execution of the 22 pre-launch assessment test scenarios

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Goal</strong><br />
Use browser automation to run every scenario in the AI Readiness Assessment v2.0 Pre-Launch Test Plan against the live ScoreApp assessment, capture the actual result state, compare it with the expected result, and produce a completed evidence package for human review.</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

1\. Files Claude Code Must Receive

• AI-Readiness-Assessment-Master-Reference_v2.0.md — canonical assessment/scoring/build specification.

• ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md — the 22 exact test scenarios and expected outcomes.

• AI_Workflow_ROI_Diagnostic_Qualification_Criteria_v2.0.md — operational interpretation of Layer C.

• This execution guide.

2\. Inputs the Human Must Provide at Run Time

• Public assessment URL.

• A controlled test email address or alias pattern that can safely receive many submissions (for example qa+scenario01@domain.com).

• Whether the ScoreApp assessment can be submitted repeatedly from the same browser/IP without anti-bot restrictions.

• Optional: access method for founder/internal notification evidence if the team wants Claude to validate emails/webhooks too.

• Optional: expected Calendly host/domain URL. Claude should verify the booking CTA target but must NOT create fake bookings unless explicitly authorized.

3\. Recommended Automation Stack

• Use Playwright with Chromium. Prefer text/role/label locators over brittle CSS selectors.

• Run headed mode for the first scenario to inspect the flow; then run headless for the remaining scenarios unless ScoreApp behaves differently.

• Use a fresh browser context for every scenario to avoid cookies, previous answers, personalization, or cached result state contaminating later tests.

• Save full-page screenshots and machine-readable JSON for every scenario.

• Use Python + python-docx to insert screenshots and actual-result fields into a copy of the pre-launch test plan.

4\. Safety / Non-Destructive Rules

• Do not change ScoreApp configuration, scoring, audiences, result pages, or Calendly settings during baseline execution.

• Do not click the Calendly booking CTA beyond verifying visibility and target URL unless the user explicitly authorizes fake bookings.

• Do not use real prospect identities or external customer email addresses.

• Do not opt a test profile into marketing unless the scenario explicitly says Consent = Yes.

• If a CAPTCHA, bot challenge, rate limit, or authentication wall appears, stop and report it rather than attempting to bypass it.

• If a scenario reveals a defect, record it and continue when possible. Do not silently patch the production assessment mid-suite.

5\. Browser Execution Algorithm

1\. Parse the 22 scenarios from the v2 pre-launch test plan into a local structured manifest (JSON is preferred). Preserve exact answer text.

2\. For each scenario, create a new browser context and navigate to the public assessment URL.

3\. Answer each question using visible question/answer text. For Q11b, select every listed symptom. For Q7 = Other, confirm Q7b appears and enter the exact open-text description.

4\. Use the scenario-specific first name/company/function/consent. Generate a unique controlled test email alias for that scenario.

5\. Submit the assessment and wait for the result page to fully settle (including delayed client-side score/result rendering).

6\. Capture: full-page result screenshot(s), URL, visible archetype, AI Readiness score, Workflow Opportunity score/tier, hours/cost estimate, positioning statement, personalized insight, CTA visibility, CTA href, and any not-qualified note.

7\. Compare actual values to the expected values in the test plan. Record PASS/FAIL/REVIEW per field and overall.

8\. If CTA is present, inspect href/target only; do not create a Calendly booking.

9\. Close the context and continue with the next scenario.

10\. After all scenarios, generate a consolidated summary and a completed DOCX copy with screenshots inserted into the matching scenario sections.

6\. Evidence Folder Standard

Create this structure inside the working directory:

qa-output/  
run-manifest.json  
summary.csv  
summary.md  
completed-test-plan.docx  
scenario-01/  
actual.json  
result-full.png  
result-01.png (optional additional crops)  
...  
scenario-22/  
actual.json  
result-full.png

7\. Required actual.json Fields

• scenario_number

• scenario_title

• timestamp

• assessment_url

• result_url

• input_answers

• visible_ai_readiness_score

• visible_archetype

• visible_workflow_opportunity_score

• visible_workflow_tier

• visible_annual_hours

• visible_cost_range

• visible_positioning_statement

• visible_cta

• cta_text

• cta_href

• visible_not_qualified_note

• expected

• comparisons

• overall_status

• notes

8\. Comparison Rules

• Exact numeric equality for Layer A and Layer B visible scores when those numbers render.

• Exact archetype after applying G1–G3, not merely the raw score band.

• Exact Layer B tier boundaries and Q10 hours/cost range.

• Exact CTA visibility expected from Layer C decision/hard gates.

• For Layer C itself, if ScoreApp does not expose the hidden numeric score publicly, compare the public routing result to the expected decision and capture internal evidence only when available.

• For personalized copy, use semantic QA rather than exact-character matching unless the Master Reference specifies exact copy. Flag mismatched workflow category, pain type, archetype family, or qualification note.

• Scenario 16 is a special platform test: five real symptoms must produce the bounded maximum; adding zero-point “None of these” must not change the result.

• Boundary scenarios 17–22 require exact routing at 54/55 and 44/45/64/65.

9\. Completed DOCX Requirements

• Start from a copy of ReinventOps_AI_Readiness_Assessment_v2_PreLaunch_Test_Plan.md.

• Locate each “Paste live result screenshot(s) here” placeholder under the matching scenario and insert the full-page screenshot at readable width.

• Populate the Actual A, Archetype, Actual B score/tier, Actual C decision/internal score (if available), CTA shown, hard gate/flags observed, and Overall QA fields.

• Do not overwrite the expected-result sections.

• At the beginning of the document, add a one-page Executive QA Summary listing total PASS/FAIL/REVIEW scenarios and every launch-blocking defect.

• Save as ScoreApp_Assessment_v2_Completed_QA\_\<YYYY-MM-DD\>.docx.

10\. Stop / Escalation Conditions

• Assessment cannot be submitted due to CAPTCHA/rate limit.

• Question/answer text does not match the canonical Master Reference enough to select safely.

• A required answer is missing from the live assessment.

• The live assessment changes during the run.

• Result page requires authentication or does not render deterministically.

• Claude cannot distinguish CTA/no-CTA state reliably.

11\. Definition of Done

The run is complete when all 22 scenarios have evidence folders, a PASS/FAIL/REVIEW determination, a consolidated summary, and a completed test-plan DOCX containing the live screenshots and actual outputs. No production configuration changes are part of this task.
