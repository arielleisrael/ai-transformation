AI Workflow ROI Diagnostic Qualification Criteria

Version 2.0 — Assessment-driven qualification standard

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Objective</strong><br />
Protect founder time while allowing genuinely valuable exceptions. A prospect receives the AI Workflow ROI Diagnostic when the assessment indicates enough economic pain, readiness to act, company/maturity fit, and access/authority to justify a live conversation.</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Canonical relationship.** The AI Readiness Assessment Master Reference v2.0 governs the assessment questions, Layer C scoring, hard gates, soft flags, thresholds, CTA routing, and ScoreApp implementation. This document translates that canonical logic into the operating qualification standard.

1\. Qualification Model

**Qualification is independent of the prospect-facing AI Readiness archetype.** A Spectator may qualify when the workflow economics, leadership engagement, and willingness to act are strong. An Architect may be rejected when the selected workflow has little pain or the company already has sufficient internal capability.

| **Pillar**             | **Maximum** | **What it tests**                                                                                                                           |
|------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Economic Pain          | 35          | Meaningful workflow + potential economic value: hours, people, frequency, automation state, symptoms, and primary cost.                     |
| Readiness to Act       | 30          | Willingness to move, leadership sponsorship, and accountable AI ownership.                                                                  |
| Company & Maturity Fit | 20          | Company size plus the 'messy middle' maturity pattern; fragmented adoption and unclear ROI can score higher internally than either extreme. |
| Access & Authority     | 15          | Whether the respondent has sufficient seniority to sponsor or advance the opportunity.                                                      |

2\. Required Minimum Signals

• A real workflow can be named and described well enough to enter the call with a hypothesis rather than a vague 'tell us about AI' conversation.

• The workflow shows enough economic leverage through hours, people, frequency, cost, delay, rework, scale constraints, customer impact, or other material consequences.

• The company is not so early that the founders would first have to sell the category itself.

• There is credible willingness to act if the business case is compelling.

• The respondent has meaningful access to the workflow owner or buying process.

• Company size is generally consistent with the ICP, with outside-range companies held to a stricter numeric bar rather than automatically rejected.

3\. Hard Gates — Automatic REJECT / NOT NOW

Any one hard gate overrides the numeric Diagnostic Fit Score and suppresses the Diagnostic CTA.

| **Gate**                                      | **Assessment condition**                                                                                         | **Operating interpretation**                                                                                              |
|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| HG1 — Not ready to act                        | Q13 = "Unlikely — mostly curious right now"                                                                      | Do not consume founder call time when the respondent is primarily curious rather than prepared to act on a credible case. |
| HG2 — Insufficient access                     | Q1 = "Individual Contributor"                                                                                    | The assessment does not establish meaningful access to the workflow owner or buying process.                              |
| HG3 — No meaningful workflow pain             | Q11a = "It runs smoothly — I’m mostly here to explore what’s possible"                                           | A healthy workflow does not justify forcing an implementation opportunity.                                                |
| HG4 — Economically trivial workflow           | Q10 = "Less than 5 hours" AND Q8 = "Just me"                                                                     | The workflow is too small to support an economically rational engagement.                                                 |
| HG5 — Too early / category must be sold first | Q3 = "A few people are experimenting" AND Q4 = "No formal strategy yet" AND Q5 = "We’re not really using it yet" | This exact combination indicates the company is too early for the current offer.                                          |

4\. Decision Tiers

| **Condition**                      | **Decision**           | **CTA** | **Operating action**                                                                                              |
|------------------------------------|------------------------|---------|-------------------------------------------------------------------------------------------------------------------|
| Any hard gate fires                | REJECT / NOT NOW       | No      | Give the appropriate not-qualified result/nurture path. Do not schedule the Diagnostic.                           |
| Diagnostic Fit ≥ 65, no hard gate  | ACCEPT                 | Yes     | Priority outreach / booking. Rank stronger ACCEPT leads above weaker ones.                                        |
| Diagnostic Fit 45–64, no hard gate | HOLD / QUALIFY ON CALL | Yes     | Allow booking. Internal brief must name the weak pillar/flag so the call deliberately qualifies that uncertainty. |
| Diagnostic Fit \< 45, no hard gate | REJECT / NOT NOW       | No      | Nurture; do not consume founder Diagnostic time.                                                                  |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Important change from v1</strong><br />
HOLD no longer means 'ask follow-up questions before scheduling.' Under v2.0, HOLD / QUALIFY ON CALL receives the Diagnostic CTA. The live call is used to resolve the weak pillar while the internal brief makes that uncertainty explicit.</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

5\. Company-Size Threshold Modifier

**Under 25 and Over 500 are exceptions, not automatic rejects.** For these two size bands, both qualification thresholds increase by 15 points.

| **Company size**     | **REJECT** | **HOLD / Qualify on Call** | **ACCEPT** |
|----------------------|------------|----------------------------|------------|
| 25–500 employees\*   | \<45       | 45–64                      | ≥65        |
| Under 25 or Over 500 | \<60       | 60–79                      | ≥80        |

\*301–500 receives soft flag SF1 but does not use the raised threshold. The raised threshold applies specifically to Under 25 and Over 500.

6\. Soft Flags — CTA Still Shows

| **Flag** | **Condition**                                                         | **Internal note**                                                      |
|----------|-----------------------------------------------------------------------|------------------------------------------------------------------------|
| SF1      | Q2 = Under 25, 301–500, or Over 500                                   | Outside ICP size band — confirm economics justify the exception.       |
| SF2      | Q1 = Manager or Director                                              | Map the buying committee early.                                        |
| SF3      | Q8 = "16 or more people"                                              | Delivery complexity — probe scope containment.                         |
| SF4      | Architect + Q5 = measurable results                                   | May already have internal capability — probe what is actually missing. |
| SF5      | Q13 = "Possibly — we’re exploring"                                    | Timing unconfirmed — establish the trigger event.                      |
| SF6      | Q7 = "Other"                                                          | Outside known taxonomy — use Q7b.                                      |
| SF7      | Q4 = "No formal strategy yet"                                         | No executive sponsor identified.                                       |
| SF8      | Function = Operations / Technology / Transformation AND Q1 ≥ Director | Priority signal — ideal champion pattern.                              |
| SF9      | Q11b includes duplicate entry / copying                               | Direct integration opportunity.                                        |
| SF10     | Q11b includes waiting for review / approval                           | Routing / approval-flow opportunity.                                   |

7\. How to Use the Assessment Result Operationally

• Lead with the Layer C decision internally: ACCEPT, HOLD, or REJECT — not the prospect-facing archetype.

• For ACCEPT: treat as a priority Diagnostic opportunity and review the strongest economic and access signals before the call.

• For HOLD / QUALIFY ON CALL: allow booking, but explicitly use the Diagnostic to resolve the weak pillar or soft flag rather than assuming the prospect is fully qualified.

• For REJECT: do not override the result merely because the AI Readiness Score or archetype looks impressive.

• A high AI Readiness Score is not equivalent to a hot lead. Highly mature companies can have little workflow pain or sufficient internal capability.

• A low archetype is not equivalent to a bad lead. A Spectator may still qualify if HG5 does not fire and the workflow economics, leadership engagement, authority, and willingness to act are strong.

8\. Relationship to the Diagnostic and Proposal Decision

**Assessment qualification answers only one question:** Is this prospect worth a 30-minute Diagnostic?

**The Diagnostic answers a different question:** Is there enough validated economic value, technical feasibility, buying context, and implementation fit to justify a paid proposal?

**Therefore:** ACCEPT or HOLD at the assessment stage does not guarantee a proposal. The Diagnostic must still produce enough evidence for PROPOSE / HOLD / NO PROPOSAL.

9\. Post-Launch Calibration

• Do not tune thresholds from isolated anecdotes. Review roughly the first 50 submissions as a batch.

• Track qualification rate, archetype distribution, hard-gate frequency, Diagnostic booking rate, Diagnostic quality, proposal rate, and close rate.

• Pay special attention to whether prospects without a clear executive sponsor actually convert; this is the most important current calibration question.

• Change one major variable at a time and record material changes in the Decision Log.

Source of Truth

This document is derived from and subordinate to the AI Readiness Assessment Master Reference v2.0 (21 August 2026). If this qualification criteria file and the Master Reference ever disagree, the Master Reference governs and this file should be updated.
