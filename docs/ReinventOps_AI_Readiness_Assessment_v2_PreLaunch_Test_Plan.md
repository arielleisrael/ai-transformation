AI Readiness Assessment

Pre-Launch Test Scenarios & Scoring Validation Plan — v2.0

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Purpose</strong><br />
Run the live ScoreApp assessment against controlled fictional respondents before public release. For each scenario, enter the answers exactly as written, paste the live result screenshot(s) into the matching section, and record any internal notification/automation behavior. Return the completed file for final review.</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**This plan validates three independent layers.** Layer A = prospect-facing AI Readiness and archetype; Layer B = prospect-facing Workflow Opportunity and cost estimate; Layer C = hidden Diagnostic Fit, hard gates, thresholds, CTA behavior, flags, and internal routing.

What changed from the previous test plan

• Company size and job title no longer affect any visible score; they are Layer C only.

• AI Readiness is now a clean 0–100 score from Q3–Q6, with separate archetype demotion gates G1–G3.

• Workflow Opportunity is a separate 0–100 score from Q8–Q12; Q11 is correctly split into single-select automation level (Q11a) and multi-select symptoms (Q11b).

• Diagnostic qualification is now a third, hidden 0–100 Layer C with inverted-U AI maturity weighting, five hard gates, ten soft flags, and separate HOLD/ACCEPT thresholds.

• The Diagnostic CTA is decoupled from archetype. A Spectator can qualify; an Architect can be rejected.

• Under-25 and over-500 companies use raised qualification thresholds rather than an automatic rejection.

Review findings to clean up before launch

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Documentation mismatch #1</strong><br />
The Master Reference says on page 7 that there are '14 scored questions.' Based on the actual question tables, Q7 is unscored, Q7b is unscored, Q14 is contact capture, and Q11a/Q11b are separate scored components. This does not change the scoring formulas, but the wording should be corrected so a future handoff cannot misread the build.</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Documentation mismatch #2</strong><br />
The older AI Workflow ROI Diagnostic Qualification Criteria says HOLD prospects should receive targeted follow-up before scheduling. The new canonical Master Reference instead defines HOLD as 'HOLD / QUALIFY ON CALL' with the Diagnostic CTA visible. Because v2.0 explicitly declares itself canonical, the older criteria document should be updated to match this new behavior.</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Platform-verification tension</strong><br />
The Master Reference lists the Q11b multi-select denominator behavior as confirmed, but also lists empirical confirmation as the first remaining UI verification. Treat the live test as mandatory: five symptoms must total 10 Layer B points, one symptom 2 points, and the zero-point 'None of these' choice must not change the score.</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

1\. Canonical Scoring Rules Used by This Test Plan

| **Layer**                | **Visible?** | **Inputs**    | **Bands / decision**                                                                                                         | **Primary job**                  |
|--------------------------|--------------|---------------|------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| A — AI Readiness         | Yes          | Q3–Q6         | 0–29 Spectator; 30–54 Explorer; 55–79 Builder; 80–100 Architect; then G1–G3 demotions                                        | Archetype                        |
| B — Workflow Opportunity | Yes          | Q8–Q12        | 0–34 Contained; 35–59 Meaningful; 60–79 Significant; 80–100 Substantial                                                      | Opportunity tier + cost estimate |
| C — Diagnostic Fit       | No           | Q1–Q6, Q8–Q13 | Hard gate = Reject. Otherwise \<45 Reject; 45–64 Hold; ≥65 Accept. Under 25 / Over 500: \<60 Reject; 60–79 Hold; ≥80 Accept. | CTA + internal routing           |

Archetype demotion gates

• G1: Architect-band raw score + Q5 is not measurable business results → cap at Builder.

• G2: Builder-band-or-higher raw score + Q4 is 'No formal strategy yet' → cap at Explorer.

• G3: Q3 = 'few people experimenting' AND Q5 = 'not really using it yet' → force Spectator; G3 overrides.

Layer C hard gates

• HG1 — Q13 = Unlikely / mostly curious.

• HG2 — Q1 = Individual Contributor.

• HG3 — Q11a = Workflow runs smoothly / exploring what's possible.

• HG4 — Q10 = Less than 5 hours AND Q8 = Just me.

• HG5 — Q3 = few experimenting AND Q4 = no formal strategy AND Q5 = not really using it yet.

Soft flags that must appear internally when applicable

• SF1: Outside ICP size band: Under 25, 301–500, or Over 500.

• SF2: Manager or Director — map the buying committee early.

• SF3: 16+ people touch the workflow — scope/delivery complexity.

• SF4: Architect with measurable results — may already have internal capability.

• SF5: Possibly / exploring — timing unconfirmed.

• SF6: Other workflow category — outside known taxonomy; use Q7b.

• SF7: No formal AI strategy — no executive sponsor identified.

• SF8: Priority signal: Ops/Tech/Transformation function + Director-or-higher.

• SF9: Duplicate entry/copy symptom — direct integration opportunity.

• SF10: Waiting for review/approval symptom — routing/approval-flow opportunity.

Cost estimate check: Q10 visible ranges must match: \<5h = 150+ hrs / \$7.5K–\$11K; 5–10h = 375+ / \$19K–\$28K; 11–20h = 750+ / \$38K–\$56K; 21–40h = 1,500+ / \$75K–\$113K; \>40h = 2,250+ / \$113K–\$169K. Treat these as labor-capacity screening estimates, never guaranteed savings.

2\. Test Protocol

☐ Do not change the assessment between baseline runs. If a defect is found, finish the baseline unless it blocks completion; then fix and rerun only affected cases.

☐ Enter every answer exactly as written. Q11b is multi-select; select every listed symptom in the scenario, including 'None of these' when explicitly instructed.

☐ Use a controlled inbox/alias. Use the fictional first name and company name shown. Use the specified Function and marketing-consent choice.

☐ Capture enough of the live result page to show the archetype, AI Readiness Score, Workflow Opportunity Score/tier, cost estimate, positioning statement, personalized workflow/pain copy, and CTA or no-CTA state.

☐ If the full result will not fit in one screenshot, paste multiple screenshots under the same scenario.

☐ Record the internal notification/brief outcome, hard gate, Diagnostic Fit decision, flags, and any CRM/audience tag that is visible to you.

☐ For scenarios with opt_in = No, confirm the on-screen result still appears and no automated respondent email sequence fires.

☐ After all runs, compare scenarios relative to each other; do not judge only whether each isolated score matches arithmetic.

Account-level preflight checks

☐ Q11b denominator: five symptoms × 2 points = exactly 10 Layer B points; one symptom = 2; zero-point 'None' adds nothing.

☐ Q7 'Other' exposes Q7b open text without changing any score denominator.

☐ Audience nesting can express HG4 and HG5 AND/OR logic exactly.

☐ Result-page CTA sections can be shown/hidden by the intended Layer C audience.

☐ All scored questions are required; there is no denominator ambiguity from a blank scored answer.

☐ Internal notification email exposes the merge tags needed for the Phase 1 flat brief.

☐ Confirm the actual plan tier/webhook availability before Phase 2 automation is activated.

3\. Scenario Summary Matrix

| **\#** | **Scenario**                                                     | **A** | **Archetype** | **B / Tier**      | **C** | **Decision**           | **CTA** |
|--------|------------------------------------------------------------------|-------|---------------|-------------------|-------|------------------------|---------|
| 1      | Prime ICP / Messy-Middle Opportunity                             | 62    | Builder       | 81 / Substantial  | 88    | ACCEPT                 | YES     |
| 2      | AI-Mature Company / Healthy Workflow                             | 100   | Architect     | 24 / Contained    | 52    | REJECT / NOT NOW       | NO      |
| 3      | Low-Readiness Spectator / High-Value Workflow                    | 24    | Spectator     | 98 / Substantial  | 81    | ACCEPT                 | YES     |
| 4      | G3 Demotion / Provisional Builder Forced to Spectator            | 55    | Spectator     | 100 / Substantial | 88    | ACCEPT                 | YES     |
| 5      | G1 Demotion / Architect Score Without Measurable Results         | 91    | Builder       | 68 / Significant  | 76    | ACCEPT                 | YES     |
| 6      | G2 Demotion / Builder-Band Score With No Formal Strategy         | 78    | Explorer      | 68 / Significant  | 65    | ACCEPT                 | YES     |
| 7      | HG1 / Unlikely to Act                                            | 54    | Explorer      | 81 / Substantial  | 74    | REJECT / NOT NOW       | NO      |
| 8      | HG2 / Individual Contributor                                     | 54    | Explorer      | 81 / Substantial  | 76    | REJECT / NOT NOW       | NO      |
| 9      | HG3 / Smooth Workflow Despite Strong Company                     | 93    | Architect     | 65 / Significant  | 78    | REJECT / NOT NOW       | NO      |
| 10     | HG4 / Economically Trivial Solo Workflow                         | 54    | Explorer      | 45 / Meaningful   | 76    | REJECT / NOT NOW       | NO      |
| 11     | HG5 / Too Early — Category Must Be Sold First                    | 11    | Spectator     | 100 / Substantial | 75    | REJECT / NOT NOW       | NO      |
| 12     | Under-25 Company / Raised Threshold Converts HOLD to REJECT      | 38    | Explorer      | 50 / Meaningful   | 57    | REJECT / NOT NOW       | NO      |
| 13     | Under-25 Exception / Economics Strong Enough to Clear Raised Bar | 61    | Builder       | 100 / Substantial | 93    | ACCEPT                 | YES     |
| 14     | Over-500 Exception / Severe Enterprise Workflow                  | 61    | Builder       | 100 / Substantial | 93    | ACCEPT                 | YES     |
| 15     | Other Workflow Category / Q7b Branch                             | 54    | Explorer      | 78 / Significant  | 84    | ACCEPT                 | YES     |
| 16     | Q11b Multi-Select Maximum + 'None of These' Stray Selection      | 54    | Explorer      | 87 / Substantial  | 92    | ACCEPT                 | YES     |
| 17     | Layer A Boundary / 54 Must Remain Explorer                       | 54    | Explorer      | 61 / Significant  | 74    | ACCEPT                 | YES     |
| 18     | Layer A Boundary / 55 Must Become Builder                        | 55    | Builder       | 61 / Significant  | 65    | ACCEPT                 | YES     |
| 19     | Layer C Boundary / 44 Must Reject                                | 26    | Spectator     | 45 / Meaningful   | 44    | REJECT / NOT NOW       | NO      |
| 20     | Layer C Boundary / 45 Must Hold + Show CTA                       | 26    | Spectator     | 47 / Meaningful   | 45    | HOLD / QUALIFY ON CALL | YES     |
| 21     | Layer C Boundary / 64 Must Remain HOLD                           | 69    | Explorer      | 69 / Significant  | 64    | HOLD / QUALIFY ON CALL | YES     |
| 22     | Layer C Boundary / 65 Must Become ACCEPT                         | 69    | Explorer      | 71 / Significant  | 65    | ACCEPT                 | YES     |

Relative-ranking expectations

• Scenario 1 should rank among the best commercial opportunities even though its readiness is only Builder, because its workflow opportunity and Diagnostic Fit are strong.

• Scenario 2 should have the highest readiness in the suite but must NOT outrank Scenario 1 commercially; it is rejected because the workflow is healthy.

• Scenarios 3 and 4 prove that low or demoted archetypes can still be excellent leads when the workflow economics, authority, and willingness to act are strong.

• Scenarios 7–11 must all suppress the CTA regardless of numeric Diagnostic Fit because each isolates a hard gate.

• Scenario 12 must be rejected only because the Under-25 threshold is raised; Scenario 13 proves that a sufficiently strong Under-25 exception can still qualify.

• Scenario 14 proves the same exception logic for Over-500 companies.

• Scenario 15 should not lose visible or hidden score merely because the workflow taxonomy answer is 'Other.'

• Scenario 16 should produce exactly 10 Layer B symptom points and 5 Layer C symptom points despite also selecting 'None of these.'

• Scenario 17 (A=54) must be Explorer and Scenario 18 (A=55) must be Builder.

• Scenario 19 (C=44) must reject; Scenario 20 (C=45) must Hold with CTA; Scenario 21 (C=64) must Hold; Scenario 22 (C=65) must Accept.

Scenario 1: Prime ICP / Messy-Middle Opportunity

**Jordan — Northstar Process Co.**  
Confirm that a central-ICP prospect with fragmented AI adoption, real productivity gains, strong economics, and an ideal champion is ranked as a priority Diagnostic lead.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We have an AI plan and we're actively working on it</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We see productivity gains, but nothing that's changed the company overall</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>Someone owns it as part of a wider role</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>6–15 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Daily</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>21–40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>We have tools for it, but they don't talk to each other</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It's complex, with a lot of steps or handoffs<br />
• The same information gets entered or copied more than once</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Scale — we can't grow without adding headcount</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Jordan<br />
Company: Northstar Process Co.<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 62               | **Provisional**      | Builder                         |
|--------------------------|------------------|----------------------|---------------------------------|
| **Final archetype**      | Builder          | **Demotion gate(s)** | None                            |
| **Workflow Opportunity** | 81 — Substantial | **Cost estimate**    | 1,500+ hrs / \$75,000–\$113,000 |
| **Diagnostic Fit**       | 88               | **Decision / CTA**   | ACCEPT / YES                    |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF8, SF9 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 2: AI-Mature Company / Healthy Workflow

**Priya — Apex Insight Partners**  
Confirm that very high AI readiness does not create a false-positive lead when the selected workflow is already healthy and low-burden; HG3 must suppress the CTA.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>C-Suite (COO, CTO, CIO, CFO…)</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>AI is woven into our operations — it's infrastructure, not just a tool</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>AI is a top strategic priority with full executive buy-in</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>Yes — we can point to real, measurable business results</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>We have a dedicated owner or team accountable for AI outcomes</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Research &amp; analysis</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>2–5 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Monthly</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>Less than 5 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>It runs smoothly — I'm mostly here to explore what's possible</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• None of these</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Team morale — it's tedious and people hate it</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Possibly — we're exploring</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Priya<br />
Company: Apex Insight Partners<br />
Email: use controlled test inbox/alias<br />
Function: Technology / IT / Engineering<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 100            | **Provisional**      | Architect                   |
|--------------------------|----------------|----------------------|-----------------------------|
| **Final archetype**      | Architect      | **Demotion gate(s)** | None                        |
| **Workflow Opportunity** | 24 — Contained | **Cost estimate**    | 150+ hrs / \$7,500–\$11,000 |
| **Diagnostic Fit**       | 52             | **Decision / CTA**   | REJECT / NOT NOW / NO       |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** HG3 **\| Soft flags:** SF4, SF5, SF8 **\| Positioning quadrant:** High readiness / Low opportunity

**Respondent email expectation:** Opted in: results/brief without booking block; gate-specific nurture path for REJECT.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 3: Low-Readiness Spectator / High-Value Workflow

**Marcus — Redline Services**  
Validate the core decoupling: a low-readiness Spectator with serious economic pain and willingness to act can still qualify for the Diagnostic.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>A few people are experimenting on their own</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We're starting to discuss it at a leadership level</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're not really using it yet</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>A few informal champions, but it isn't anyone's actual job</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>16 or more people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Multiple times per day</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>More than 40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Entirely manual — spreadsheets, email, or paper</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls<br />
• It's complex, with a lot of steps or handoffs<br />
• Work sits waiting for someone to review or approve it<br />
• Mistakes slip through and get caught later</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Money — the labor cost is significant</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Marcus<br />
Company: Redline Services<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 24               | **Provisional**      | Spectator                        |
|--------------------------|------------------|----------------------|----------------------------------|
| **Final archetype**      | Spectator        | **Demotion gate(s)** | G3                               |
| **Workflow Opportunity** | 98 — Substantial | **Cost estimate**    | 2,250+ hrs / \$113,000–\$169,000 |
| **Diagnostic Fit**       | 81               | **Decision / CTA**   | ACCEPT / YES                     |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF3, SF8, SF10 **\| Positioning quadrant:** Low readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 4: G3 Demotion / Provisional Builder Forced to Spectator

**Elena — Beacon Strategy Works**  
Validate Layer A gate G3: raw readiness reaches the Builder band, but the exact 'few experimenting + not really using it' pair must force Spectator while Layer C may still accept.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>A few people are experimenting on their own</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>AI is a top strategic priority with full executive buy-in</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're not really using it yet</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>We have a dedicated owner or team accountable for AI outcomes</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>16 or more people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Multiple times per day</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>More than 40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Entirely manual — spreadsheets, email, or paper</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls<br />
• It's complex, with a lot of steps or handoffs<br />
• Work sits waiting for someone to review or approve it<br />
• Mistakes slip through and get caught later<br />
• The same information gets entered or copied more than once</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Scale — we can't grow without adding headcount</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Elena<br />
Company: Beacon Strategy Works<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 55                | **Provisional**      | Builder                          |
|--------------------------|-------------------|----------------------|----------------------------------|
| **Final archetype**      | Spectator         | **Demotion gate(s)** | G3                               |
| **Workflow Opportunity** | 100 — Substantial | **Cost estimate**    | 2,250+ hrs / \$113,000–\$169,000 |
| **Diagnostic Fit**       | 88                | **Decision / CTA**   | ACCEPT / YES                     |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF3, SF8, SF9, SF10 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 5: G1 Demotion / Architect Score Without Measurable Results

**Simone — Meridian Digital**  
Validate Layer A gate G1: an Architect-band raw score without measurable business results must be capped at Builder.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>AI is woven into our operations — it's infrastructure, not just a tool</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>AI is a top strategic priority with full executive buy-in</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We see productivity gains, but nothing that's changed the company overall</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>We have a dedicated owner or team accountable for AI outcomes</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>6–15 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Weekly</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>11–20 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Partly automated, but it still takes significant hands-on work</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls<br />
• It's complex, with a lot of steps or handoffs</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Time — it creates constant bottlenecks</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Likely — if the ROI is compelling</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Simone<br />
Company: Meridian Digital<br />
Email: use controlled test inbox/alias<br />
Function: Transformation / Strategy / Innovation<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 91               | **Provisional**      | Architect                    |
|--------------------------|------------------|----------------------|------------------------------|
| **Final archetype**      | Builder          | **Demotion gate(s)** | G1                           |
| **Workflow Opportunity** | 68 — Significant | **Cost estimate**    | 750+ hrs / \$38,000–\$56,000 |
| **Diagnostic Fit**       | 76               | **Decision / CTA**   | ACCEPT / YES                 |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF8 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 6: G2 Demotion / Builder-Band Score With No Formal Strategy

**Daniel — Graystone Holdings**  
Validate Layer A gate G2: Builder-band-or-higher readiness with no formal leadership strategy must be capped at Explorer.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>AI is woven into our operations — it's infrastructure, not just a tool</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>No formal strategy yet — mostly individual decisions</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>Yes — we can point to real, measurable business results</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>We have a dedicated owner or team accountable for AI outcomes</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>6–15 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Weekly</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>11–20 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Partly automated, but it still takes significant hands-on work</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It's complex, with a lot of steps or handoffs<br />
• The same information gets entered or copied more than once</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Time — it creates constant bottlenecks</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Likely — if the ROI is compelling</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Daniel<br />
Company: Graystone Holdings<br />
Email: use controlled test inbox/alias<br />
Function: Finance<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 78               | **Provisional**      | Builder                      |
|--------------------------|------------------|----------------------|------------------------------|
| **Final archetype**      | Explorer         | **Demotion gate(s)** | G2                           |
| **Workflow Opportunity** | 68 — Significant | **Cost estimate**    | 750+ hrs / \$38,000–\$56,000 |
| **Diagnostic Fit**       | 65               | **Decision / CTA**   | ACCEPT / YES                 |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF7, SF9 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 7: HG1 / Unlikely to Act

**Maya — Cirrus Labs**  
Validate hard gate HG1: willingness='Unlikely' must force REJECT and suppress the CTA even when the numeric Diagnostic Fit score is otherwise strong.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We have an AI plan and we're actively working on it</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're using AI tools but haven't seen clear business impact</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>Someone owns it as part of a wider role</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>6–15 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Daily</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>21–40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>We have tools for it, but they don't talk to each other</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It's complex, with a lot of steps or handoffs<br />
• The same information gets entered or copied more than once</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Scale — we can't grow without adding headcount</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Unlikely — mostly curious right now</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Maya<br />
Company: Cirrus Labs<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 54               | **Provisional**      | Explorer                        |
|--------------------------|------------------|----------------------|---------------------------------|
| **Final archetype**      | Explorer         | **Demotion gate(s)** | None                            |
| **Workflow Opportunity** | 81 — Substantial | **Cost estimate**    | 1,500+ hrs / \$75,000–\$113,000 |
| **Diagnostic Fit**       | 74               | **Decision / CTA**   | REJECT / NOT NOW / NO           |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** HG1 **\| Soft flags:** SF8, SF9 **\| Positioning quadrant:** Low readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief without booking block; gate-specific nurture path for REJECT.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 8: HG2 / Individual Contributor

**Alex — Harborline Systems**  
Validate hard gate HG2: an Individual Contributor must be REJECT regardless of strong workflow economics and fit score.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>Individual Contributor</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We have an AI plan and we're actively working on it</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're using AI tools but haven't seen clear business impact</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>Someone owns it as part of a wider role</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>6–15 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Daily</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>21–40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>We have tools for it, but they don't talk to each other</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It's complex, with a lot of steps or handoffs<br />
• The same information gets entered or copied more than once</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Scale — we can't grow without adding headcount</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Alex<br />
Company: Harborline Systems<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 54               | **Provisional**      | Explorer                        |
|--------------------------|------------------|----------------------|---------------------------------|
| **Final archetype**      | Explorer         | **Demotion gate(s)** | None                            |
| **Workflow Opportunity** | 81 — Substantial | **Cost estimate**    | 1,500+ hrs / \$75,000–\$113,000 |
| **Diagnostic Fit**       | 76               | **Decision / CTA**   | REJECT / NOT NOW / NO           |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** HG2 **\| Soft flags:** SF9 **\| Positioning quadrant:** Low readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief without booking block; gate-specific nurture path for REJECT.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 9: HG3 / Smooth Workflow Despite Strong Company

**Renee — Vertex Ops**  
Validate hard gate HG3 independently at a high numeric fit score: 'runs smoothly' must suppress the CTA.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>Most of our team uses AI as part of how they work</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>AI is a top strategic priority with full executive buy-in</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>Yes — we can point to real, measurable business results</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>We have a dedicated owner or team accountable for AI outcomes</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>6–15 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Daily</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>21–40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>It runs smoothly — I'm mostly here to explore what's possible</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• None of these</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Money — the labor cost is significant</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Renee<br />
Company: Vertex Ops<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 93               | **Provisional**      | Architect                       |
|--------------------------|------------------|----------------------|---------------------------------|
| **Final archetype**      | Architect        | **Demotion gate(s)** | None                            |
| **Workflow Opportunity** | 65 — Significant | **Cost estimate**    | 1,500+ hrs / \$75,000–\$113,000 |
| **Diagnostic Fit**       | 78               | **Decision / CTA**   | REJECT / NOT NOW / NO           |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** HG3 **\| Soft flags:** SF4, SF8 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief without booking block; gate-specific nurture path for REJECT.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 10: HG4 / Economically Trivial Solo Workflow

**Omar — Fieldstone Advisory**  
Validate hard gate HG4: 'Less than 5 hours' AND 'Just me' must force REJECT even if other answers would otherwise qualify.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We have an AI plan and we're actively working on it</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're using AI tools but haven't seen clear business impact</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>Someone owns it as part of a wider role</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>Just me</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Daily</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>Less than 5 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Entirely manual — spreadsheets, email, or paper</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It's complex, with a lot of steps or handoffs</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Time — it creates constant bottlenecks</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Omar<br />
Company: Fieldstone Advisory<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 54              | **Provisional**      | Explorer                    |
|--------------------------|-----------------|----------------------|-----------------------------|
| **Final archetype**      | Explorer        | **Demotion gate(s)** | None                        |
| **Workflow Opportunity** | 45 — Meaningful | **Cost estimate**    | 150+ hrs / \$7,500–\$11,000 |
| **Diagnostic Fit**       | 76              | **Decision / CTA**   | REJECT / NOT NOW / NO       |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** HG4 **\| Soft flags:** SF8 **\| Positioning quadrant:** Low readiness / Low opportunity

**Respondent email expectation:** Opted in: results/brief without booking block; gate-specific nurture path for REJECT.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 11: HG5 / Too Early — Category Must Be Sold First

**Leah — Cedar Bridge**  
Validate hard gate HG5: the exact low-adoption/no-strategy/no-use triple must force REJECT even with severe workflow pain and executive interest in acting.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>A few people are experimenting on their own</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>No formal strategy yet — mostly individual decisions</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're not really using it yet</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>No one specifically — it's whoever's interested</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>16 or more people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Multiple times per day</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>More than 40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Entirely manual — spreadsheets, email, or paper</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls<br />
• It's complex, with a lot of steps or handoffs<br />
• Work sits waiting for someone to review or approve it<br />
• Mistakes slip through and get caught later<br />
• The same information gets entered or copied more than once</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Money — the labor cost is significant</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Leah<br />
Company: Cedar Bridge<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 11                | **Provisional**      | Spectator                        |
|--------------------------|-------------------|----------------------|----------------------------------|
| **Final archetype**      | Spectator         | **Demotion gate(s)** | G3                               |
| **Workflow Opportunity** | 100 — Substantial | **Cost estimate**    | 2,250+ hrs / \$113,000–\$169,000 |
| **Diagnostic Fit**       | 75                | **Decision / CTA**   | REJECT / NOT NOW / NO            |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** HG5 **\| Soft flags:** SF3, SF7, SF8, SF9, SF10 **\| Positioning quadrant:** Low readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief without booking block; gate-specific nurture path for REJECT.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 12: Under-25 Company / Raised Threshold Converts HOLD to REJECT

**Caleb — Pebble Ridge Studio**  
Validate the company-size modifier: a sub-25 company scoring above the standard HOLD threshold but below the raised HOLD threshold (60) must not see the CTA.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>Owner / Founder / CEO</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>Under 25</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We're starting to discuss it at a leadership level</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're using AI tools but haven't seen clear business impact</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>A few informal champions, but it isn't anyone's actual job</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>2–5 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Weekly</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>5–10 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Partly automated, but it still takes significant hands-on work</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It's complex, with a lot of steps or handoffs</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Team morale — it's tedious and people hate it</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Possibly — we're exploring</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Caleb<br />
Company: Pebble Ridge Studio<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 38              | **Provisional**      | Explorer                     |
|--------------------------|-----------------|----------------------|------------------------------|
| **Final archetype**      | Explorer        | **Demotion gate(s)** | None                         |
| **Workflow Opportunity** | 50 — Meaningful | **Cost estimate**    | 375+ hrs / \$19,000–\$28,000 |
| **Diagnostic Fit**       | 57              | **Decision / CTA**   | REJECT / NOT NOW / NO        |

**Layer C thresholds:** HOLD ≥ 60; ACCEPT ≥ 80. **Hard gates:** None **\| Soft flags:** SF1, SF5, SF8 **\| Positioning quadrant:** Low readiness / Low opportunity

**Respondent email expectation:** Opted in: results/brief without booking block; gate-specific nurture path for REJECT.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 13: Under-25 Exception / Economics Strong Enough to Clear Raised Bar

**Sofia — ForgeWorks**  
Confirm that the size modifier is a stricter bar, not a hard rejection: an unusually strong small-company exception can still reach ACCEPT at 80+.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>Owner / Founder / CEO</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>Under 25</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>AI is a top strategic priority with full executive buy-in</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're using AI tools but haven't seen clear business impact</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>Someone owns it as part of a wider role</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>16 or more people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Multiple times per day</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>More than 40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Entirely manual — spreadsheets, email, or paper</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls<br />
• It's complex, with a lot of steps or handoffs<br />
• Work sits waiting for someone to review or approve it<br />
• Mistakes slip through and get caught later<br />
• The same information gets entered or copied more than once</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Scale — we can't grow without adding headcount</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Sofia<br />
Company: ForgeWorks<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 61                | **Provisional**      | Builder                          |
|--------------------------|-------------------|----------------------|----------------------------------|
| **Final archetype**      | Builder           | **Demotion gate(s)** | None                             |
| **Workflow Opportunity** | 100 — Substantial | **Cost estimate**    | 2,250+ hrs / \$113,000–\$169,000 |
| **Diagnostic Fit**       | 93                | **Decision / CTA**   | ACCEPT / YES                     |

**Layer C thresholds:** HOLD ≥ 60; ACCEPT ≥ 80. **Hard gates:** None **\| Soft flags:** SF1, SF3, SF8, SF9, SF10 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 14: Over-500 Exception / Severe Enterprise Workflow

**Victor — Crescent Enterprise Group**  
Confirm that a very large company can qualify only when evidence is strong enough to clear the raised ACCEPT threshold of 80.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>C-Suite (COO, CTO, CIO, CFO…)</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>Over 500</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>AI is a top strategic priority with full executive buy-in</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're using AI tools but haven't seen clear business impact</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>Someone owns it as part of a wider role</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>16 or more people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Multiple times per day</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>More than 40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Entirely manual — spreadsheets, email, or paper</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls<br />
• It's complex, with a lot of steps or handoffs<br />
• Work sits waiting for someone to review or approve it<br />
• Mistakes slip through and get caught later<br />
• The same information gets entered or copied more than once</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Money — the labor cost is significant</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Victor<br />
Company: Crescent Enterprise Group<br />
Email: use controlled test inbox/alias<br />
Function: Technology / IT / Engineering<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 61                | **Provisional**      | Builder                          |
|--------------------------|-------------------|----------------------|----------------------------------|
| **Final archetype**      | Builder           | **Demotion gate(s)** | None                             |
| **Workflow Opportunity** | 100 — Substantial | **Cost estimate**    | 2,250+ hrs / \$113,000–\$169,000 |
| **Diagnostic Fit**       | 93                | **Decision / CTA**   | ACCEPT / YES                     |

**Layer C thresholds:** HOLD ≥ 60; ACCEPT ≥ 80. **Hard gates:** None **\| Soft flags:** SF1, SF3, SF8, SF9, SF10 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 15: Other Workflow Category / Q7b Branch

**Luis — OpenRoute Labs**  
Validate that 'Other' is unscored, Q7b appears and captures free text, SF6 fires internally, and the result remains coherent rather than being penalized.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We have an AI plan and we're actively working on it</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're using AI tools but haven't seen clear business impact</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>Someone owns it as part of a wider role</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Other — something else</td>
</tr>
<tr class="even">
<td><strong>Q7b — Other workflow description</strong></td>
<td>A manual exception-tracking workflow for complex customer cases that moves between several teams.</td>
</tr>
<tr class="odd">
<td><strong>Q8 — People involved</strong></td>
<td>6–15 people</td>
</tr>
<tr class="even">
<td><strong>Q9 — Frequency</strong></td>
<td>Daily</td>
</tr>
<tr class="odd">
<td><strong>Q10 — Hours per week</strong></td>
<td>21–40 hours</td>
</tr>
<tr class="even">
<td><strong>Q11a — Automation level</strong></td>
<td>Partly automated, but it still takes significant hands-on work</td>
</tr>
<tr class="odd">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It's complex, with a lot of steps or handoffs<br />
• Work sits waiting for someone to review or approve it</td>
</tr>
<tr class="even">
<td><strong>Q12 — Primary cost</strong></td>
<td>Customer experience — slow or inconsistent handling costs us business</td>
</tr>
<tr class="odd">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Likely — if the ROI is compelling</td>
</tr>
<tr class="even">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Luis<br />
Company: OpenRoute Labs<br />
Email: use controlled test inbox/alias<br />
Function: Customer Service<br />
Marketing consent: No</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 54               | **Provisional**      | Explorer                        |
|--------------------------|------------------|----------------------|---------------------------------|
| **Final archetype**      | Explorer         | **Demotion gate(s)** | None                            |
| **Workflow Opportunity** | 78 — Significant | **Cost estimate**    | 1,500+ hrs / \$75,000–\$113,000 |
| **Diagnostic Fit**       | 84               | **Decision / CTA**   | ACCEPT / YES                    |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF6, SF10 **\| Positioning quadrant:** Low readiness / High opportunity

**Respondent email expectation:** No automated respondent email sequence; on-screen result still displays.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 16: Q11b Multi-Select Maximum + 'None of These' Stray Selection

**Naomi — RelayPoint**  
Validate bounded multi-select behavior: five real symptoms must contribute exactly 10 points to Layer B and 5 to Layer C; selecting zero-point 'None of these' alongside them must not change either score.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>VP</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We have an AI plan and we're actively working on it</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're using AI tools but haven't seen clear business impact</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>Someone owns it as part of a wider role</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Reporting &amp; data aggregation</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>6–15 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Daily</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>21–40 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>We have tools for it, but they don't talk to each other</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls<br />
• It's complex, with a lot of steps or handoffs<br />
• Work sits waiting for someone to review or approve it<br />
• Mistakes slip through and get caught later<br />
• The same information gets entered or copied more than once<br />
• None of these</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Scale — we can't grow without adding headcount</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Very likely — this is already a priority</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Naomi<br />
Company: RelayPoint<br />
Email: use controlled test inbox/alias<br />
Function: Operations<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 54               | **Provisional**      | Explorer                        |
|--------------------------|------------------|----------------------|---------------------------------|
| **Final archetype**      | Explorer         | **Demotion gate(s)** | None                            |
| **Workflow Opportunity** | 87 — Substantial | **Cost estimate**    | 1,500+ hrs / \$75,000–\$113,000 |
| **Diagnostic Fit**       | 92               | **Decision / CTA**   | ACCEPT / YES                    |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF8, SF9, SF10 **\| Positioning quadrant:** Low readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 17: Layer A Boundary / 54 Must Remain Explorer

**Hannah — Atlas Documents**  
Validate the exact Builder threshold from below: AI Readiness 54 must route to Explorer, not Builder.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>Director / Head of Department</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>We use AI across teams, but each team does it differently — no shared approach</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We have an AI plan and we're actively working on it</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We're using AI tools but haven't seen clear business impact</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>Someone owns it as part of a wider role</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Document creation &amp; review</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>2–5 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Weekly</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>11–20 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Partly automated, but it still takes significant hands-on work</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It's complex, with a lot of steps or handoffs</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Time — it creates constant bottlenecks</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Likely — if the ROI is compelling</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Hannah<br />
Company: Atlas Documents<br />
Email: use controlled test inbox/alias<br />
Function: Finance<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 54               | **Provisional**      | Explorer                     |
|--------------------------|------------------|----------------------|------------------------------|
| **Final archetype**      | Explorer         | **Demotion gate(s)** | None                         |
| **Workflow Opportunity** | 61 — Significant | **Cost estimate**    | 750+ hrs / \$38,000–\$56,000 |
| **Diagnostic Fit**       | 74               | **Decision / CTA**   | ACCEPT / YES                 |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF2 **\| Positioning quadrant:** Low readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 18: Layer A Boundary / 55 Must Become Builder

**Devon — Brightpath Services**  
Validate the exact Builder threshold: AI Readiness 55 must route to Builder when no demotion gate fires.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>Director / Head of Department</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>A few people are experimenting on their own</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>We're starting to discuss it at a leadership level</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We see productivity gains, but nothing that's changed the company overall</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>We have a dedicated owner or team accountable for AI outcomes</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Document creation &amp; review</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>2–5 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Weekly</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>11–20 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Partly automated, but it still takes significant hands-on work</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It's complex, with a lot of steps or handoffs</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Time — it creates constant bottlenecks</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Likely — if the ROI is compelling</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Devon<br />
Company: Brightpath Services<br />
Email: use controlled test inbox/alias<br />
Function: Finance<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 55               | **Provisional**      | Builder                      |
|--------------------------|------------------|----------------------|------------------------------|
| **Final archetype**      | Builder          | **Demotion gate(s)** | None                         |
| **Workflow Opportunity** | 61 — Significant | **Cost estimate**    | 750+ hrs / \$38,000–\$56,000 |
| **Diagnostic Fit**       | 65               | **Decision / CTA**   | ACCEPT / YES                 |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF2 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 19: Layer C Boundary / 44 Must Reject

**Ian — ReviewWorks**  
Validate the lower Diagnostic Fit threshold from below: 44 with no hard gate must be REJECT with no CTA.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>Director / Head of Department</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>A few people are experimenting on their own</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>No formal strategy yet — mostly individual decisions</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We see productivity gains, but nothing that's changed the company overall</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>No one specifically — it's whoever's interested</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Approval &amp; review processes</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>16 or more people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Quarterly</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>Less than 5 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>We have tools for it, but they don't talk to each other</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Money — the labor cost is significant</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Possibly — we're exploring</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Ian<br />
Company: ReviewWorks<br />
Email: use controlled test inbox/alias<br />
Function: Finance<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 26              | **Provisional**      | Spectator                   |
|--------------------------|-----------------|----------------------|-----------------------------|
| **Final archetype**      | Spectator       | **Demotion gate(s)** | None                        |
| **Workflow Opportunity** | 45 — Meaningful | **Cost estimate**    | 150+ hrs / \$7,500–\$11,000 |
| **Diagnostic Fit**       | 44              | **Decision / CTA**   | REJECT / NOT NOW / NO       |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF2, SF3, SF5, SF7 **\| Positioning quadrant:** Low readiness / Low opportunity

**Respondent email expectation:** Opted in: results/brief without booking block; gate-specific nurture path for REJECT.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 20: Layer C Boundary / 45 Must Hold + Show CTA

**Irene — ReviewWorks Plus**  
Validate the lower Diagnostic Fit threshold: 45 with no hard gate must become HOLD / QUALIFY ON CALL and show the CTA.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>Director / Head of Department</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>A few people are experimenting on their own</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>No formal strategy yet — mostly individual decisions</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We see productivity gains, but nothing that's changed the company overall</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>No one specifically — it's whoever's interested</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Approval &amp; review processes</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>16 or more people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Quarterly</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>Less than 5 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>We have tools for it, but they don't talk to each other</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls<br />
• It's complex, with a lot of steps or handoffs</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Money — the labor cost is significant</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Possibly — we're exploring</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Irene<br />
Company: ReviewWorks Plus<br />
Email: use controlled test inbox/alias<br />
Function: Finance<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 26              | **Provisional**      | Spectator                    |
|--------------------------|-----------------|----------------------|------------------------------|
| **Final archetype**      | Spectator       | **Demotion gate(s)** | None                         |
| **Workflow Opportunity** | 47 — Meaningful | **Cost estimate**    | 150+ hrs / \$7,500–\$11,000  |
| **Diagnostic Fit**       | 45              | **Decision / CTA**   | HOLD / QUALIFY ON CALL / YES |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF2, SF3, SF5, SF7 **\| Positioning quadrant:** Low readiness / Low opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 21: Layer C Boundary / 64 Must Remain HOLD

**Marco — SalesFlow One**  
Validate the ACCEPT threshold from below: 64 with no hard gate must remain HOLD and show the CTA.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>Owner / Founder / CEO</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>AI is woven into our operations — it's infrastructure, not just a tool</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>No formal strategy yet — mostly individual decisions</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We see productivity gains, but nothing that's changed the company overall</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>We have a dedicated owner or team accountable for AI outcomes</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Sales operations &amp; CRM</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>2–5 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Daily</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>11–20 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Entirely manual — spreadsheets, email, or paper</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Money — the labor cost is significant</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Possibly — we're exploring</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Marco<br />
Company: SalesFlow One<br />
Email: use controlled test inbox/alias<br />
Function: Sales &amp; Marketing<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 69               | **Provisional**      | Builder                      |
|--------------------------|------------------|----------------------|------------------------------|
| **Final archetype**      | Explorer         | **Demotion gate(s)** | G2                           |
| **Workflow Opportunity** | 69 — Significant | **Cost estimate**    | 750+ hrs / \$38,000–\$56,000 |
| **Diagnostic Fit**       | 64               | **Decision / CTA**   | HOLD / QUALIFY ON CALL / YES |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF5, SF7 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Scenario 22: Layer C Boundary / 65 Must Become ACCEPT

**Mia — SalesFlow Two**  
Validate the ACCEPT threshold: 65 with no hard gate must become ACCEPT.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Question</strong></th>
<th><strong>Enter this answer exactly</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Q1 — Role</strong></td>
<td>Owner / Founder / CEO</td>
</tr>
<tr class="even">
<td><strong>Q2 — Company size</strong></td>
<td>101–200</td>
</tr>
<tr class="odd">
<td><strong>Q3 — AI adoption breadth</strong></td>
<td>AI is woven into our operations — it's infrastructure, not just a tool</td>
</tr>
<tr class="even">
<td><strong>Q4 — Leadership AI strategy</strong></td>
<td>No formal strategy yet — mostly individual decisions</td>
</tr>
<tr class="odd">
<td><strong>Q5 — Current AI ROI</strong></td>
<td>We see productivity gains, but nothing that's changed the company overall</td>
</tr>
<tr class="even">
<td><strong>Q6 — AI ownership</strong></td>
<td>We have a dedicated owner or team accountable for AI outcomes</td>
</tr>
<tr class="odd">
<td><strong>Q7 — Workflow category</strong></td>
<td>Sales operations &amp; CRM</td>
</tr>
<tr class="even">
<td><strong>Q8 — People involved</strong></td>
<td>2–5 people</td>
</tr>
<tr class="odd">
<td><strong>Q9 — Frequency</strong></td>
<td>Daily</td>
</tr>
<tr class="even">
<td><strong>Q10 — Hours per week</strong></td>
<td>11–20 hours</td>
</tr>
<tr class="odd">
<td><strong>Q11a — Automation level</strong></td>
<td>Entirely manual — spreadsheets, email, or paper</td>
</tr>
<tr class="even">
<td><strong>Q11b — Symptoms — select all listed</strong></td>
<td>• It depends on one or two people — if they're out, it stalls<br />
• It's complex, with a lot of steps or handoffs</td>
</tr>
<tr class="odd">
<td><strong>Q12 — Primary cost</strong></td>
<td>Money — the labor cost is significant</td>
</tr>
<tr class="even">
<td><strong>Q13 — Willingness to act</strong></td>
<td>Possibly — we're exploring</td>
</tr>
<tr class="odd">
<td><strong>Q14 — Contact capture</strong></td>
<td>First name: Mia<br />
Company: SalesFlow Two<br />
Email: use controlled test inbox/alias<br />
Function: Sales &amp; Marketing<br />
Marketing consent: Yes</td>
</tr>
</tbody>
</table>

Expected result

| **AI Readiness**         | 69               | **Provisional**      | Builder                      |
|--------------------------|------------------|----------------------|------------------------------|
| **Final archetype**      | Explorer         | **Demotion gate(s)** | G2                           |
| **Workflow Opportunity** | 71 — Significant | **Cost estimate**    | 750+ hrs / \$38,000–\$56,000 |
| **Diagnostic Fit**       | 65               | **Decision / CTA**   | ACCEPT / YES                 |

**Layer C thresholds:** HOLD ≥ 45; ACCEPT ≥ 65. **Hard gates:** None **\| Soft flags:** SF5, SF7 **\| Positioning quadrant:** High readiness / High opportunity

**Respondent email expectation:** Opted in: results/brief sequence with booking block; non-booker follow-up may fire; no REJECT nurture.

Paste live result screenshot(s) here

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong><br />
<br />
PASTE RESULT SCREENSHOT(S) HERE<br />
<br />
</strong></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Actual A score: \_\_\_\_\_\_ Archetype: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Actual B score/tier: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Actual C decision / internal score: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ CTA shown? YES / NO  
Hard gate / flags observed: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
Overall QA: PASS / FAIL / REVIEW Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4\. Final Release Gate

☐ All 22 scenarios were run without changing the assessment mid-baseline.

☐ Layer A arithmetic matched the expected score in every scenario.

☐ Layer A archetype routing matched the band plus G1–G3 demotion logic.

☐ Scenario 17 remained Explorer at 54 and Scenario 18 became Builder at 55.

☐ Layer B arithmetic and all four tiers appeared correctly across the suite: Contained, Meaningful, Significant, Substantial.

☐ Q10 cost/annual-hours copy matched the selected hours band and was not described as guaranteed savings.

☐ Q11b symptoms contributed exactly 2 Layer B points and 1 Layer C point each; 'None of these' added zero.

☐ Layer C arithmetic matched the expected score in every scenario.

☐ All five hard gates independently forced REJECT and suppressed the CTA.

☐ Scenario 19 at C44 rejected; Scenario 20 at C45 held + showed CTA; Scenario 21 at C64 held; Scenario 22 at C65 accepted.

☐ Under-25 and Over-500 raised thresholds behaved as specified.

☐ Soft flags SF1–SF10 appeared correctly when triggered; no unrelated flag appeared.

☐ Q7 'Other' showed Q7b, remained unscored, and produced coherent personalized result copy.

☐ All four readiness/opportunity positioning quadrants displayed the correct statement.

☐ CTA copy matched the archetype family when the CTA was visible.

☐ REJECT pages used the correct not-qualified note family for HG1, HG2, HG3/HG4, and HG5.

☐ Marketing-consent behavior was correct: opt-in false received on-screen results but no automated respondent email sequence.

☐ Internal notifications/briefs made the Layer C decision unmistakable and did not confuse a high readiness score with a hot lead.

☐ No result-page wording, number, cost estimate, archetype claim, or CTA would feel indefensible if forwarded to a CEO, COO, CTO, or operations leader.

☐ Relative ranking makes commercial sense: prime messy-middle prospects rise above mature/no-pain and early/resistant profiles.

Release decision

☐ PASS — Release publicly

☐ CONDITIONAL PASS — Fix listed issues and rerun only affected scenarios

☐ FAIL — Scoring/routing requires another design pass

Issues to resolve before release

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Post-launch calibration note

Do not keep tuning pre-launch indefinitely. After launch, recalibrate at roughly the first 50 submissions using qualification rate, archetype distribution, missed disqualifiers, Diagnostic quality, and conversion — especially whether no-executive-sponsor prospects actually convert.
