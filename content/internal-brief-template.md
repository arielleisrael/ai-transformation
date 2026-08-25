# Internal Brief Email Template — Source of Truth

**Version 2.0 — 2026-08-21.** Restructured around the Diagnostic Fit Score (Layer C).

Sent to Uzziah + Arielle, **30 minutes after submission**. Never sent to the respondent.

> ⚠️ **Rendering dependency.** This template is built on conditional blocks. ScoreApp documents Dynamic Content for result pages and PDFs but **never for emails**, so this cannot render natively as written.
>
> - **Phase 1 (native):** send a flat notification — all answers, all three scores, the Layer C tier. Founders read talking points off §8 as a static reference.
> - **Phase 2 (webhook):** `QUIZ_FINISHED` → Make/Zapier recomputes Layer C from answer text and renders this template in full. **This is what makes the internal side genuinely useful.**
>
> The webhook payload carries no per-question scores, so phase 2 re-derives everything from answer text using the tables in `content/quiz-questions.md` §7. That makes the automation the single source of truth for gate logic.

---

## 1. Subject Line

```
[{DECISION} {layer_c_score}/100 · {archetype}] {first_name} {last_initial}. at {company_name}
```

**Examples:**
- `[ACCEPT 89 · Builder] Sarah M. at Clearwater Consulting`
- `[ACCEPT 81 · Explorer] James T. at Horizon Partners`
- `[HOLD 52 · Explorer] Dana R. at Apex Group`
- `[REJECT — HG3 · Architect] Marcus L. at Vantage Systems`

The **Layer C decision leads**, not the respondent-facing score. A 92 AI Readiness Score with a REJECT is a real and common combination — the subject line has to make that unmissable so nobody opens a mature-sounding lead expecting a hot one.

---

## 2. Decision Block

```
DECISION: {ACCEPT | HOLD — QUALIFY ON CALL | REJECT — NOT NOW}
Diagnostic Fit Score: {layer_c_score}/100
{IF Q2 IN (Under 25, Over 500): "⚠️ Out-of-band company size — thresholds raised to HOLD 60 / ACCEPT 80"}

{IF DECISION = ACCEPT}   → Diagnostic CTA shown. Rank against current pipeline by score.
{IF DECISION = HOLD}     → Diagnostic CTA shown. Weakest pillar: {lowest_pillar}. Qualify this on the call before investing time.
{IF DECISION = REJECT}   → No CTA shown. Gate fired: {gate_id} — {gate_reason}. Nurture sequence only.
```

---

## 3. Respondent

```
Name:        {first_name} {last_name}
Company:     {company_name}
Email:       {email}
Role:        {Q1}
Function:    {lead_form_function}
Submitted:   {submission_datetime}
Unsubscribed: {IF unsubscribed: "Yes — marketing/nurture suppressed" ELSE: "No"}
```

---

## 4. Scores

```
AI Readiness (Layer A):        {layer_a_score}/100  →  {archetype}
                               {IF gate_fired: "⚠️ Demoted by {G1|G2|G3} — see below"}
Workflow Opportunity (Layer B): {layer_b_score}/100  →  {opportunity_tier}
Diagnostic Fit (Layer C):       {layer_c_score}/100  →  {DECISION}
```

**Layer C pillar breakdown:**

| Pillar | Score | Max | Read |
|---|---|---|---|
| Economic Pain | {p1} | 35 | |
| Readiness to Act | {p2} | 30 | |
| Company & Maturity Fit | {p3} | 20 | |
| Access & Authority | {p4} | 15 | |

The lowest-scoring pillar is the thing to test first on the call.

```
{IF gate_fired G1: "Archetype demoted: scored in the Architect band but cannot point to measurable results. Treat as a Builder — they have the machinery, not the proof."}
{IF gate_fired G2: "Archetype demoted: adoption claims outrun leadership reality. No formal AI strategy. Verify who actually sponsors anything here."}
{IF gate_fired G3: "Archetype forced to Spectator: claims coordination but reports almost no actual usage. Answer set is internally contradictory — probe gently."}
```

---

## 5. Flags

```
{IF SF1}  Outside ICP size band ({Q2}) — confirm the economics justify an exception.
{IF SF2}  {Q1} — map the buying committee early: "Who else would need to be part of a conversation like this?"
{IF SF3}  16+ people touch this workflow — delivery complexity. Probe scope containment.
{IF SF4}  Architect + measurable results — may already have internal capability. Probe what's actually missing before committing time.
{IF SF5}  Timing unconfirmed ("Possibly — we're exploring"). Establish the trigger event on the call.
{IF SF6}  Workflow outside our taxonomy. They described it as: "{Q7b}"
{IF SF7}  No executive sponsor identified. Ask who the internal champion is and who would have to sponsor this.
{IF SF8}  ★ PRIORITY — {function} leader at {Q1}. Ideal champion profile per ICP §6.
{IF SF9}  Integration opportunity: information is entered or copied more than once. Name the systems on the call.
{IF SF10} Routing opportunity: work sits waiting for review or approval.
```

---

## 6. AI Readiness Signals

```
Adoption breadth:      {Q3}
Leadership strategy:   {Q4}
Current AI ROI:        {Q5}
AI ownership:          {Q6}
Willingness to act:    {Q13}
```

> **Read Q3 and Q5 inverted.** "Across teams but each does it differently" and "using tools but no clear business impact" are the *strongest* signals for us — that's the messy middle the ICP targets. "Measurable business results" and "woven into operations" mean less gap to close.

---

## 7. Workflow Identified

```
Category:        {Q7}{IF Q7 = Other: " — \"{Q7b}\""}
People involved: {Q8}
Frequency:       {Q9}
Hours/week:      {Q10}
Runs today as:   {Q11a}
Also true:       {Q11b — list all selected}
Costs them most: {Q12}
```

**Estimated annual labor cost: {annual_cost_range}**

| Q10 answer | Annual hours | Cost range |
|---|---|---|
| Less than 5 hours | 150+ | $7,500–$11,000 |
| 5–10 hours | 375+ | $19,000–$28,000 |
| 11–20 hours | 750+ | $38,000–$56,000 |
| 21–40 hours | 1,500+ | $75,000–$113,000 |
| More than 40 hours | 2,250+ | $113,000–$169,000 |

*Conservative: $50–$75/hr blended knowledge-worker rate × hours midpoint × 50 weeks.*

> **Screening estimate of labor cost — not recoverable savings.** Do not quote this figure as savings on the call. Convert it during the Diagnostic: annual hours × loaded rate × automatable percentage + error/rework cost + capacity value − implementation and operating cost.

---

## 8. Talking Points

### Lead with the cost type they named (Q12)

| If Q12 = | Open with |
|---|---|
| Money | ROI: *"What would you do with ${cost_estimate} back in the budget each year?"* |
| Scale | Growth ceiling: *"What does your team look like in 18 months if this workflow doesn't change?"* |
| Time | Velocity: *"What decisions or projects are waiting on this process right now?"* |
| Errors | Risk: *"What's the cost when one of those errors gets through?"* |
| Customer experience | External impact: *"Who outside the company feels it when this workflow is slow?"* |
| Team morale | Retention: *"How long has the team been living with this? What's the turnover risk?"* |

### Probe the symptoms they selected (Q11b)

| If selected | Ask |
|---|---|
| Depends on one or two people | *"What happens when they're on holiday? Has that already bitten you?"* |
| Complex, lots of handoffs | *"Walk me through where it actually stalls — is it the steps or the waiting between them?"* |
| Work sits waiting for approval | *"How long does it typically sit? Who's the bottleneck approver?"* |
| Mistakes slip through | *"How do you usually find out? Who catches it, and how late?"* |
| Same information entered twice | *"Which systems? That gap is usually the fastest thing to fix."* |

### By readiness signal

| If | Then |
|---|---|
| Q4 = No formal strategy | Leadership isn't aligned. Ask who the internal AI champion is and whether there's an executive sponsor to reach. |
| Q5 = Using tools, no impact | Prime pain state. Lead with: *"What would make AI feel like it's actually working for your business?"* |
| Q6 = No one specifically | No owner. This is the gap — position the Diagnostic as the thing that creates clarity on who should own it. |
| Q6 = Dedicated owner or team | They may have internal capability. Find out what that team is *not* getting to. |
| Q13 = Very likely | Move fast. There's a live trigger — find out what it is. |
| Q1 = Manager or Director | Map the buying committee early. |
| Q1 = Owner, C-Suite, or VP | They can likely greenlight. Keep it at strategic ROI, not implementation detail. |

---

## 9. FAEO Pre-Fill

Five of the nine criteria in `docs/Fit-Adjusted Economic Opportunity (FAEO) Scorecard.md` are derivable from the quiz. The brief arrives as a partial scorecard rather than a pile of answers.

| Criterion | Pre-filled | Derived from |
|---|---|---|
| Pain | {1–5} | Layer B score |
| Urgency | {1–5} | Q13 |
| Access | {1–5} | Q1 |
| AI Readiness | {1–5} | Layer A archetype |
| Repeatability | {1–5} | Q7 |
| Budget | — | Establish on call |
| Uzziah + Arielle Fit | — | Establish on call |
| Delivery Simplicity | — | Establish on call |
| Proof Speed | — | Establish on call |

> Per the FAEO doc: **blanks are not 5s.** Use the lowest score defensible from the evidence and flag the unknown.

---

## 10. Status

```
CALENDAR: Check Calendly notifications — if a booking arrived from {email}, they booked.
          If not, they had not booked as of the time this brief was sent.
BRIEF EMAIL: {IF requested: "✅ Requested" ELSE: "❌ Not requested"}
UNSUBSCRIBED: {IF unsubscribed: "Yes — marketing/nurture suppressed" ELSE: "No"}
```

---

## Changelog

### 2026-08-25
- **Removed marketing-consent field and gating.** No separate opt-in checkbox exists on the contact form anymore; Sequence 1 always sends. Replaced the `CONSENT`/`Marketing consent` lines with `UNSUBSCRIBED` status, which governs Sequences 2/3 only.

### v2.0 — 2026-08-21
- **Restructured around Layer C.** Subject line now leads with the Diagnostic decision rather than the respondent-facing score, because high readiness + REJECT is a common and previously invisible combination.
- Added the **four-pillar breakdown** so the weakest pillar is obvious at a glance.
- Added **demotion-gate explanations** — when an archetype was capped, the brief says why.
- Added **all ten soft flags**, including SF8 as a priority signal rather than a caveat.
- Added **Q11b symptom probes** — the highest-value new talking points, since each symptom names a specific automation lever.
- Added the **FAEO pre-fill** table.
- Added **consent status**, and the rule that no sequence fires without `opt_in`.
- Replaced the v1 `score >= 76 → 🔥 HOT LEAD` rule. It fired on the blended score and would have flagged mature companies with no workflow pain as hot leads.
