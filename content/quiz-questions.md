# Quiz Questions — Source of Truth

**Version 2.0 — 2026-08-21.** Supersedes v1 (12 questions, single blended score).

This document is the **build sheet**: exact question text, answer options, input types, and point values for every scoring layer. Someone configuring ScoreApp should be able to work from this file alone.

The *rationale* for every number lives in [`docs/superpowers/specs/2026-08-21-quiz-scoring-architecture-design.md`](../docs/superpowers/specs/2026-08-21-quiz-scoring-architecture-design.md). If the two ever disagree, the spec is the reasoning of record and this file is the implementation of record — reconcile, don't guess.

**Related sources of truth:** `content/archetypes.md` (archetype copy) · `content/results-copy.md` (results page) · `content/internal-brief-template.md` (internal brief) · `content/follow-up-sequences.md` (email)

---

## 1. At a Glance

**14 scored questions + 1 conditional unscored question + contact form.** Estimated completion: 4–5 minutes.

Three scoring layers read the same answers with different weightings. Two are shown to the respondent; one never is.

| Layer | Name | Range | Visible | Inputs | Drives |
|---|---|---|---|---|---|
| **A** | AI Readiness Score | 0–100 | Yes — hero | Q3, Q4, Q5, Q6 | The archetype |
| **B** | Workflow Opportunity Score | 0–100 | Yes — secondary | Q8–Q12 | Opportunity tier + $ estimate |
| **C** | Diagnostic Fit Score | 0–100 | **Never** | Q1–Q6, Q8–Q13 + function | Diagnostic CTA + internal brief |

**Why three.** AI maturity relates to prospect value monotonically but to internal opportunity as an **inverted U** — a company with tools and no measurable impact is the lowest-value answer to the respondent and the highest-value answer to us. One score cannot carry both shapes. See spec §1.

### Input-type rules

1. **Every question a gate references must be single-select.** Gates test for *specific answers*; multi-select makes "is Q5 the top answer?" unanswerable. Gate-referenced: **Q1, Q3, Q4, Q5, Q8, Q10, Q11a, Q13.**
2. **Multi-select scoring is `Σ(selected) ÷ Σ(all options)`.** A checkbox question's weight equals the sum of all its options, so option values must sum to exactly the intended budget. Per-option severity must stay flat.
3. **Never use `max selections`** — undocumented denominator behaviour would depress every score by a constant.
4. **Never put jump logic on a scored question** — skipping changes total points available. Q7 uses ScoreApp's native `Other` option; if Task 11 shows that it does not capture free text, the fallback jump may target only the unscored Q7b Open Text question.

---

## 2. Phase 1 — About You

### Q1 — Role
**Text:** "What's your role at your company?"
**Type:** Single choice · Required
**Scores:** Layer C only (Pillar 4 — Access & Authority, 0–15)

| Answer | A | B | C |
|---|---|---|---|
| Owner / Founder / CEO | — | — | 15 |
| C-Suite (COO, CTO, CIO, CFO…) | — | — | 14 |
| VP | — | — | 13 |
| Director / Head of Department | — | — | 9 |
| Manager | — | — | 5 |
| Individual Contributor | — | — | **0 · HG2** |

> **Changed in v2.** "Operations / Technology / Transformation leader" was removed from this list. It is a *function*, not a seniority level, so it made the list a non-partition — "VP of Operations" matched two rows and scored differently depending on which the respondent picked, feeding noise straight into qualification. Function now lives on the contact form (Q14).

### Q2 — Company Size
**Text:** "About how many employees does your company have?"
**Type:** Single choice · Required
**Scores:** Layer C only (Pillar 3, 0–8)

| Answer | A | B | C |
|---|---|---|---|
| Under 25 | — | — | 1 |
| 25–50 | — | — | 4 |
| 51–100 | — | — | 8 |
| 101–200 | — | — | 8 |
| 201–300 | — | — | 5 |
| 301–500 | — | — | 3 |
| Over 500 | — | — | 2 |

Also triggers the **company-size threshold modifier** (§7.4) and soft flag SF1 when Under 25 or Over 500.

---

## 3. Phase 2 — Your AI Story

*These four questions are Layer A in full. They determine the archetype.*

### Q3 — AI Adoption Breadth
**Text:** "Which best describes AI adoption across your company right now?"
**Type:** Single choice · Required
**Scores:** Layer A 0–25 · Layer C Pillar 3 0–6 (**inverted U**)

| Answer | A | B | C |
|---|---|---|---|
| A few people are experimenting on their own | 4 | — | 2 |
| We use AI across teams, but each team does it differently — no shared approach | 11 | — | **6** |
| Most of our team uses AI as part of how they work | 18 | — | 4 |
| AI is woven into our operations — it's infrastructure, not just a tool | 25 | — | 2 |

> The second answer is the **highest-value answer in the entire quiz** for us. Fragmentation is what the offer sells against, and it is the ICP's stated target state. It reads as mid-maturity to the respondent, which is exactly why Layer A and Layer C must be separate.

### Q4 — Leadership AI Strategy
**Text:** "Where does your leadership stand on AI?"
**Type:** Single choice · Required
**Scores:** Layer A 0–25 · Layer C Pillar 2 0–8

| Answer | A | B | C |
|---|---|---|---|
| No formal strategy yet — mostly individual decisions | 3 | — | 0 |
| We're starting to discuss it at a leadership level | 10 | — | 4 |
| We have an AI plan and we're actively working on it | 18 | — | 7 |
| AI is a top strategic priority with full executive buy-in | 25 | — | 8 |

### Q5 — Current AI ROI
**Text:** "Honestly — is AI actually moving the needle at your company?"
**Type:** Single choice · Required
**Scores:** Layer A 0–25 · Layer C Pillar 3 0–6 (**inverted U**)

| Answer | A | B | C |
|---|---|---|---|
| We're not really using it yet | 1 | — | 1 |
| We're using AI tools but haven't seen clear business impact | 8 | — | **6** |
| We see productivity gains, but nothing that's changed the company overall | 16 | — | 5 |
| Yes — we can point to real, measurable business results | 25 | — | 2 |

> Top answer to the respondent = 25. To us = 2. This is the clearest illustration of why the layers exist: a company that can already point to measurable AI results may have the internal capability that makes the engagement unnecessary.

### Q6 — AI Ownership · NEW in v2
**Text:** "Who's accountable for AI at your company?"
**Type:** Single choice · Required
**Scores:** Layer A 0–25 · Layer C Pillar 2 0–7

| Answer | A | B | C |
|---|---|---|---|
| No one specifically — it's whoever's interested | 3 | — | 1 |
| A few informal champions, but it isn't anyone's actual job | 9 | — | 4 |
| Someone owns it as part of a wider role | 17 | — | **7** |
| We have a dedicated owner or team accountable for AI outcomes | 25 | — | 6 |

> Added because the ICP names "no clear owner accountable for converting AI experimentation into measurable workflow ROI" as *the* defining symptom of the immaturity we target, and nothing in v1 detected it. Note the deliberate inversion at the top: a part-time owner is a champion who needs help; a dedicated AI team may be the capability that removes the need for us.

---

## 4. Phase 3 — Your Biggest Opportunity

*All questions in this phase describe **one** workflow — the one named in Q7.*

### Q7 — Workflow Category
**Text:** "Think about one workflow that consistently costs more time, effort, or money than it should. Which category fits best?"
**Type:** Single choice · Required
**Scores:** **UNSCORED** in all three layers

| Answer | A | B | C |
|---|---|---|---|
| Reporting & data aggregation | — | — | — |
| Document creation & review | — | — | — |
| Client or customer communications | — | — | — |
| Research & analysis | — | — | — |
| Approval & review processes | — | — | — |
| Employee or client onboarding | — | — | — |
| Sales operations & CRM | — | — | — |
| Other | — | — | — |

**Job:** selects the insight paragraph on the results page (8 categories × 6 pain types = 48 variants in `results-copy.md`) and sets the FAEO Repeatability signal (named category → 4, Other → 2).

> **Changed in v2.** Previously scored 8–10 across named categories and **0** for "Other," which meant choosing the honest answer silently tanked the respondent's score. The spread did almost no discriminating work. Now unscored.

### Q7b — Workflow Description
**Text:** "In a sentence, what is it?"
**Type:** Open Text · **Optional** · Shown by jump logic **only when Q7 = "Other"**
**Scores:** Unscored (ScoreApp never scores Open Text)

Captures workflows the taxonomy is missing. Safe to attach jump logic here precisely because it is unscored — a skipped scored question would change the denominator.

### Q8 — People Involved
**Text:** "How many people on your team touch this workflow?"
**Type:** Single choice · Required
**Scores:** Layer B 0–15 · Layer C Pillar 1 0–5

| Answer | A | B | C |
|---|---|---|---|
| Just me | — | 2 | 1 |
| 2–5 people | — | 7 | 2 |
| 6–15 people | — | 12 | 4 |
| 16 or more people | — | 15 | 5 |

> **Changed in v2 — now monotonic.** v1 scored 16+ *below* 6–15. More people on a repetitive workflow means more economic leverage. The implementation complexity that motivated the original penalty is now soft flag SF3, not a score reduction.

### Q9 — Frequency
**Text:** "How often does this workflow run?"
**Type:** Single choice · Required
**Scores:** Layer B 0–15 · Layer C Pillar 1 0–5

| Answer | A | B | C |
|---|---|---|---|
| Multiple times per day | — | 15 | 5 |
| Daily | — | 13 | 4 |
| Weekly | — | 10 | 3 |
| Monthly | — | 5 | 2 |
| Quarterly | — | 1 | 0 |

### Q10 — Hours Per Week
**Text:** "How many hours per week does your team collectively spend on this workflow?"
**Type:** Single choice · Required
**Scores:** Layer B 0–35 (heaviest question in the quiz) · Layer C Pillar 1 0–12

| Answer | A | B | C | Annual hrs | Cost range |
|---|---|---|---|---|---|
| Less than 5 hours | — | 4 | 1 | 150+ | $7,500–$11,000 |
| 5–10 hours | — | 13 | 5 | 375+ | $19,000–$28,000 |
| 11–20 hours | — | 22 | 8 | 750+ | $38,000–$56,000 |
| 21–40 hours | — | 29 | 10 | 1,500+ | $75,000–$113,000 |
| More than 40 hours | — | 35 | 12 | 2,250+ | $113,000–$169,000 |

Cost range = hours midpoint × 50 weeks × $50–$75/hr blended knowledge-worker rate.

> **These are screening estimates of labor cost, not recoverable savings.** Never present them as savings. The Diagnostic converts them into a defensible model: annual hours × loaded rate × automatable percentage + error/rework cost + capacity value − implementation and operating cost.

### Q11a — Automation Level
**Text:** "Which best describes how this workflow runs today?"
**Type:** Single choice · Required
**Scores:** Layer B 0–15 · Layer C Pillar 1 0–4

| Answer | A | B | C |
|---|---|---|---|
| Entirely manual — spreadsheets, email, or paper | — | 15 | 4 |
| We have tools for it, but they don't talk to each other | — | 13 | 3 |
| Partly automated, but it still takes significant hands-on work | — | 11 | 3 |
| It runs smoothly — I'm mostly here to explore what's possible | — | 1 | **0 · HG3** |

### Q11b — Symptoms · MULTI-SELECT
**Text:** "Which of these also apply? Select all that apply."
**Type:** **Multi-select (checkboxes)** · Required
**Scores:** Layer B 0–10 · Layer C Pillar 1 0–5

| Answer | A | B | C | Flag |
|---|---|---|---|---|
| It depends on one or two people — if they're out, it stalls | — | 2 | 1 | |
| It's complex, with a lot of steps or handoffs | — | 2 | 1 | |
| Work sits waiting for someone to review or approve it | — | 2 | 1 | SF10 |
| Mistakes slip through and get caught later | — | 2 | 1 | |
| The same information gets entered or copied more than once | — | 2 | 1 | SF9 |
| None of these | — | 0 | 0 | |

**Bounding proof:** Σ(all options) = 5 × 2 = 10 = the Layer B budget. The question is exactly bounded and its weight inside Layer B is exactly 10. Scores 0 / 2 / 4 / 6 / 8 / 10 by symptom count.

**Per-option severity is deliberately flat.** Differentiating it would raise Σ and silently increase the question's weight — under ScoreApp's model, bounded contribution and differentiated option weights are mutually exclusive.

**"None of these" is worth 0**, so a respondent ticking it alongside symptoms cannot move the score. This matters because ScoreApp has no exclusive-option behaviour.

> **New in v2.** v1's Q10 mixed mutually-exclusive automation states with co-occurring failure modes in one single-select list — "entirely manual" and "partially automated" cannot both be true, yet "depends on one person" and "complex" routinely are. Q11a + Q11b split by dimension. Each symptom maps to a *different* automation lever, so the founders enter the call with a mechanism hypothesis rather than a category. **Combined budget is 25 — identical to v1's single Q10. The split is weight-neutral.**

### Q12 — Primary Cost
**Text:** "What does this workflow cost your company most?"
**Type:** Single choice · Required
**Scores:** Layer B 0–10 · Layer C Pillar 1 0–4

| Answer | A | B | C |
|---|---|---|---|
| Money — the labor cost is significant | — | 10 | 4 |
| Scale — we can't grow without adding headcount | — | 10 | 4 |
| Errors — mistakes happen and they're expensive | — | 9 | 3 |
| Time — it creates constant bottlenecks | — | 9 | 3 |
| Customer experience — slow or inconsistent handling costs us business | — | 9 | 3 |
| Team morale — it's tedious and people hate it | — | 7 | 2 |

**Stays single-select** for two reasons: "costs you *most*" is a ranking question whose forced prioritization is itself signal, and it selects which of the 48 insight paragraphs renders.

> **Changed in v2.** "Customer experience" added — some workflows lose revenue rather than consuming labor. Spread compressed from 8–10 to 7–10, because this question tells you *which* value story to tell, not *how much* value exists.

---

## 5. Phase 4 — Ready to Move

### Q13 — Willingness to Act · NEW in v2
**Text:** "If there were a clear business case for improving this workflow with AI or automation, how likely is your company to act on it in the next 6 months?"
**Type:** Single choice · Required
**Scores:** Layer C only (Pillar 2, 0–15) — **contributes nothing to either visible score**

| Answer | A | B | C |
|---|---|---|---|
| Very likely — this is already a priority | — | — | 15 |
| Likely — if the ROI is compelling | — | — | 11 |
| Possibly — we're exploring | — | — | 5 |
| Unlikely — mostly curious right now | — | — | **0 · HG1** |

**Placement is deliberate:** after the respondent has articulated concrete pain, so the commitment question reads as a natural consequence rather than a sales probe. It is the only clean detector for the criteria doc's first automatic-reject condition.

---

## 6. Phase 5 — Your Results

### Q14 — Contact Capture
**Text:** "Almost done. Where should we send your results?"
**Subtext:** "We'll send your personalized AI Readiness Brief here — your archetype, your score, and a summary of your biggest opportunity."
**Type:** Lead form · **All fields unscored** (ScoreApp lead-form fields cannot carry points)

| Field | Type | Required | Purpose |
|---|---|---|---|
| First name | Text | Yes | |
| Company name | Text | Yes | |
| Email address | Email | Yes | |
| **Function** — "Which area do you lead or work in?" | **Dropdown** | Yes | Drives SF8 via an Audience on Lead Form Answers |
| **Marketing consent** | **Explicit Consent (Optional)** | No | Gates all email sequences |

**Function options:** Operations · Technology / IT / Engineering · Transformation / Strategy / Innovation · Finance · Sales & Marketing · HR & People · Customer Service · Other

Function sits here rather than in the quiz because it is profile data, reads naturally beside company name, and costs no assessment question. The trade-off is that it **awards no points** — it drives a flag, not a score.

**Consent is set to Optional, not Required**, so a missing tick does not cost the lead — the results page delivers instantly on screen regardless. ScoreApp stores a timestamp plus the exact opt-in wording and passes `opt_in` on every webhook event.

> ⚠️ **All three email sequences must be gated on `opt_in = true`.**

---

## 7. Scoring

### 7.1 Layer A — AI Readiness Score → Archetype

Four axes at 25 points each; the raw total **is** the 0–100 score.

| Score | Level | Archetype |
|---|---|---|
| 80–100 | 4 | **The Architect** |
| 55–79 | 3 | **The Builder** |
| 30–54 | 2 | **The Explorer** |
| 0–29 | 1 | **The Spectator** |

**Demotion gates — applied after banding, demotion only, never promotion.** Evaluated in order; G3 overrides everything.

| Gate | Condition | Result |
|---|---|---|
| **G1** | Provisional = Architect AND Q5 ≠ "real, measurable business results" | Cap at Builder |
| **G2** | Provisional ≥ Builder AND Q4 = "No formal strategy yet" | Cap at Explorer |
| **G3** | Q3 = "a few people experimenting" AND Q5 = "not really using it yet" | Force Spectator |

Rationale: the archetype copy must be literally true of the answers given. Overclaiming discredits the assessment the moment it is discussed internally — which is the whole design goal of the results page.

### 7.2 Layer B — Workflow Opportunity Score

| Question | Max |
|---|---|
| Q10 hours/week | 35 |
| Q11a automation level | 15 |
| Q11b symptoms | 10 |
| Q8 people involved | 15 |
| Q9 frequency | 15 |
| Q12 primary cost | 10 |
| **Total** | **100** |

| Score | Tier |
|---|---|
| 80–100 | Substantial |
| 60–79 | Significant |
| 35–59 | Meaningful |
| 0–34 | Contained |

### 7.3 Layer C — Diagnostic Fit Score

| Pillar | Max | Inputs |
|---|---|---|
| 1 — Economic Pain | 35 | Q10 (12) · Q11a (4) · Q11b (5) · Q8 (5) · Q9 (5) · Q12 (4) |
| 2 — Readiness to Act | 30 | Q13 (15) · Q4 (8) · Q6 (7) |
| 3 — Company & Maturity Fit | 20 | Q2 (8) · Q3 (6) · Q5 (6) |
| 4 — Access & Authority | 15 | Q1 (15) |
| **Total** | **100** | |

**Hard gates — any one forces REJECT and suppresses the Diagnostic CTA regardless of score.**

| ID | Condition | Criteria-doc line implemented |
|---|---|---|
| **HG1** | Q13 = "Unlikely — mostly curious right now" | "Primarily wants general AI education… without a specific workflow problem" |
| **HG2** | Q1 = "Individual Contributor" | "No meaningful access to the workflow owner or buying process" |
| **HG3** | Q11a = "It runs smoothly — I'm mostly here to explore" | "No identifiable operational pain or meaningful cost" |
| **HG4** | Q10 = "Less than 5 hours" **AND** Q8 = "Just me" | "Too trivial to support an economically rational engagement" |
| **HG5** | Q3 = "a few experimenting" **AND** Q4 = "No formal strategy" **AND** Q5 = "not really using it yet" | "Would first require us to sell the category itself" |

**Soft flags — CTA still shows; the internal brief carries the note.**

| ID | Condition | Brief note |
|---|---|---|
| SF1 | Q2 ∈ {Under 25, 301–500, Over 500} | Outside ICP size band — confirm the economics justify an exception |
| SF2 | Q1 ∈ {Manager, Director} | Map the buying committee early |
| SF3 | Q8 = "16 or more people" | Delivery complexity — probe scope containment |
| SF4 | Archetype = Architect AND Q5 = "measurable results" | May already have internal capability — probe what is actually missing |
| SF5 | Q13 = "Possibly — we're exploring" | Timing unconfirmed — establish the trigger event on the call |
| SF6 | Q7 = "Other" | Outside known taxonomy — see Q7b, confirm scope early |
| SF7 | Q4 = "No formal strategy yet" | No executive sponsor identified — ask who would have to sponsor this |
| SF8 | Function ∈ {Operations, Technology, Transformation} AND Q1 ≥ Director | **Priority signal, not a caveat** — ideal champion profile per ICP §6 |
| SF9 | Q11b includes "same information entered or copied more than once" | Direct integration opportunity — name the systems on the call |
| SF10 | Q11b includes "work sits waiting for review or approval" | Routing / approval-flow opportunity |

### 7.4 Decision tiers

| Condition | Decision | CTA | Action |
|---|---|---|---|
| Any hard gate fires | **REJECT / NOT NOW** | No | Nurture sequence |
| Score ≥ 65, no gates | **ACCEPT** | Yes | Priority outreach; rank by score |
| Score 45–64, no gates | **HOLD / QUALIFY ON CALL** | Yes | Brief names the weak pillar |
| Score < 45, no gates | **REJECT / NOT NOW** | No | Nurture sequence |

**Company-size threshold modifier:** if Q2 ∈ {Under 25, Over 500}, both thresholds rise by 15 — HOLD becomes 60, ACCEPT becomes 80. This implements the ICP's "exceptions, not the default" as a higher bar rather than a hard gate.

### 7.5 CTA routing

**The Diagnostic CTA is not gated on archetype.** Which result page a respondent lands on is a Layer A question; whether the CTA is visible on that page is a Layer C question. All sixteen combinations are reachable.

- An **Architect** whose workflow runs smoothly gets **no CTA** (HG3).
- A **Spectator** with real pain, engaged leadership, and "very likely to act" **does** get the CTA, with "starting point" framing.

> **Changed in v2.** v1 excluded Level 1 categorically and gave the CTA to all other archetypes. That mis-routed three of the five profiles in the reviewer's own test matrix.

---

## 8. ScoreApp Build Notes

### Categories

| Category | Contents | Score logic (LOGIC tab) | Hidden toggle |
|---|---|---|---|
| AI Readiness | Layer A values | `Add category score to total score` | Off |
| Workflow Opportunity | Layer B values | `Do not affect total score` | Off |
| Diagnostic Fit | Layer C values | `Do not affect total score` | **ON — required** |

> ⚠️ **These are two independent settings.** Verified 2026-08-21: excluding a category from the total does **not** hide it from the respondent. A category set to "do not affect total score" still rendered on the results page — in the donut legend and as its own score card. Only the `Hidden` toggle removes it.
>
> Without it, every prospect sees their own Diagnostic Fit score. The configuration screens look correct while this is wrong.

One answer awards **different point values to different categories** — confirmed supported. Q4 carries 25 in AI Readiness and 8 in Diagnostic Fit on the same option.

### Archetype audiences — priority-ordered, first match wins

| Priority | Audience | Conditions |
|---|---|---|
| 1 | Archetype — Architect | AI Readiness % ≥ 80 AND Q5 is "real, measurable business results" |
| 2 | Archetype — Builder | AI Readiness % ≥ 55 AND Q4 is not "No formal strategy yet" AND (Q3 is not "a few experimenting" OR Q5 is not "not really using it yet") |
| 3 | Archetype — Explorer | AI Readiness % ≥ 30 AND (Q3 is not "a few experimenting" OR Q5 is not "not really using it yet") |
| 4 | Archetype — Spectator | *(default — all remaining)* |

Not using "Outcome / highest category" routing: these archetypes are **ordinal levels**, not parallel personality types, and highest-category matching would inherit ScoreApp's arbitrary tie-breaking.

### CTA audience

```
Diagnostic Fit % ≥ 45
  AND Q13 is not "Unlikely — mostly curious right now"           (HG1)
  AND Q1  is not "Individual Contributor"                         (HG2)
  AND Q11a is not "It runs smoothly — I'm mostly here to explore" (HG3)
  AND (Q10 is not "Less than 5 hours" OR Q8 is not "Just me")     (HG4)
  AND (Q3 is not "a few experimenting"
       OR Q4 is not "No formal strategy yet"
       OR Q5 is not "not really using it yet")                    (HG5)
```

A second audience **Diagnostic Priority** (`≥ 65` plus the same gates) drives ranking and the CRM tag.

### Open verification items

1. **Confirm the multi-select denominator empirically** — 6-option checkbox at 2 pts, tick one, expect 20%. Do this first.
2. Does an **"Other" option with free text** exist on choice questions? Q7b is the fallback and works regardless.
3. **Audience condition nesting** — is an AND of OR-groups expressible? Blocks HG4/HG5.
4. Can a result-page section be **hidden by** audience, or only **shown to** it?
5. Does an **optional scored question left blank** leave the denominator? Mitigated by making every scored question required.
6. Merge-tag inventory in notification emails.
7. Which plan tier enables **webhooks** (phase 2).

---

## 9. Changelog

### v2.0 — 2026-08-21
- **Split one blended score into three layers.** v1 mixed company fit, AI maturity, and workflow economics in a single 0–100 number that drove the score, the archetype, and the CTA.
- **Archetype decoupled from the blended score** and driven by Layer A with demotion gates.
- **CTA decoupled from archetype** and driven entirely by Layer C.
- **Q1/Q2 removed from all visible scoring.** Marking a 400-person company down on a score claiming to measure *their AI readiness* is indefensible to them.
- **Added Q6** (AI ownership) and **Q13** (willingness to act).
- **Split v1's Q10** into Q11a + Q11b; Q11b is the quiz's only multi-select. Weight-neutral.
- **Q1 function option removed** to the contact form; **consent checkbox added**.
- **Q7 unscored**; **Q8 made monotonic**; **Q12 gained "Customer experience"** and had its spread compressed.
- Archetype names: Observer / Tinkerer / Catalyst / Architect → **Spectator / Explorer / Builder / Architect**.

### Corrected from v1
- **2026-08-19 platform finding was wrong.** It concluded ScoreApp could not branch result pages on anything but the overall score, and the build was collapsed to one dimension as a result. In fact "Outcome" means highest-scoring *category*, and **Audiences** support AND/OR rules across individual answers, category subscores, and total score. The two-dimension design is achievable natively.
- **v1's Q6 scored "Other" at 0** while named categories scored 8–10 — choosing the honest answer silently tanked the score. Now unscored.
- **v1's Q7 scored 16+ people below 6–15.** Now monotonic.
