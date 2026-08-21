# AI Readiness Assessment — Scoring Architecture

**Design spec — 2026-08-21**

Supersedes the scoring sections of `docs/superpowers/specs/2026-08-16-ai-readiness-quiz-design.md` and the "Scoring Notes" section of `content/quiz-questions.md`. Everything else in those documents stands.

---

## 1. Problem

The live build computes one 0–100 number that blends three unrelated concepts: company fit (Q1–Q2, ~21%), AI maturity (Q3–Q5, ~31%), and workflow economics (Q6–Q11, ~49%). That single number drives the prospect-facing score, the archetype, and the Diagnostic CTA.

`docs/AI_Readiness_Qualification_Form_Questions_Review.md` identified this as the central flaw. The root cause is sharper than "the score mixes concepts":

**AI maturity relates to prospect value monotonically, but to internal opportunity as an inverted U.**

`docs/Initial_Ideal_Customer_Profile_ICP.md` defines the target as "the messy middle: not AI-resistant and not AI-optimized," and lists "already highly AI-optimized with a mature internal transformation team" as a disqualifier. A monotonic score cannot express a non-monotonic preference. The two audiences rank the same answers in a different order:

| Q5 — "Is AI actually moving the needle?" | Value to respondent | Value to us |
|---|---|---|
| We're not really using it yet | Lowest | **Low** — we would have to sell the category first (explicit reject criterion) |
| Using AI tools but no clear business impact | Low | **Highest** — ICP: "purchased AI-capable software but cannot clearly explain the economic return" |
| Productivity gains, nothing company-wide | Mid | **High** — the messy middle |
| Real, measurable business results | Highest | **Moderate** — may already have internal capability |

Q3 behaves identically. "We use AI across teams, but each team does it differently — no shared approach" reads as mid-maturity to the respondent and is the single highest-value answer in the quiz for us, because fragmentation is what the offer sells against.

One score cannot carry both shapes. Hence three layers.

### 1.1 Platform correction

A note dated 2026-08-19 in `content/quiz-questions.md` concluded that ScoreApp cannot branch result pages on anything other than the overall score, and the live build was collapsed to a single dimension as a result. **That conclusion was wrong.**

- ScoreApp's End Logic option labelled "Outcome" means *highest- or lowest-scoring category*. Categories do drive result-page routing.
- **Audiences** (Business plan and above, which this account is on) support AND/OR rules across individual scorecard answers, category subscores, and total score. Audiences drive result-page routing with priority ordering, and control section-level show/hide on a single page.
- The `QUIZ_FINISHED` webhook payload carries every question's answer text, every category subscore, highest/lowest category, and audience membership.

The two-independent-dimension design originally intended is therefore achievable. This spec assumes the Business plan.

---

## 2. Architecture

| Layer | Name | Visible? | Measures | Shape |
|---|---|---|---|---|
| **A** | AI Readiness Score → Archetype | Yes — hero | Organizational AI maturity | Monotonic |
| **B** | Workflow Opportunity Score | Yes — secondary | Economic value in the named workflow | Monotonic |
| **C** | Diagnostic Fit Score | **No** | Whether this company deserves founder call time | Non-monotonic on maturity; gated |

Layers A and B are what the respondent receives. Layer C is what decides the CTA and briefs the team. No layer is derived from another; all three read the same 14 answers with different weightings.

### 2.1 What the respondent gets

Layer A answers "who are we?" Layer B answers "what's it worth?" Together they form a 2×2 the respondent can carry into a leadership conversation:

|  | Low Opportunity | High Opportunity |
|---|---|---|
| **High Readiness** | "You're in good shape — this particular workflow isn't your lever." | "You can move on this now." |
| **Low Readiness** | "Start small and build the foundation." | "Big prize — but foundation first." |

The bottom-right cell is the profile the current single-score system handles worst.

### 2.2 Design principles

1. **Nothing about company size or job title touches the visible score.** Marking a 400-person company down on a score that claims to measure *their AI readiness* is indefensible to them. Q1 and Q2 are pure Layer C.
2. **Archetype never overclaims.** Gates demote, never promote (§4.3).
3. **The CTA is decoupled from the archetype.** Qualification runs entirely on Layer C. An Architect with no pain gets no CTA; a Spectator who clears every gate does.
4. **Layer C reuses the existing decision vocabulary.** ACCEPT / HOLD / REJECT, as already defined in `docs/AI Workflow ROI Diagnostic Qualification Criteria.md`. No new tiers invented.

---

## 3. Question Set — 14 Questions

Three scored questions added net (Q6, Q13, and the Q11 split), taking the quiz to **14 scored questions** plus the contact form. Renumbering follows. Answer input types are covered in §3.5.

| New | Old | Question | Change |
|---|---|---|---|
| Q1 | Q1 | Role | **Function option removed** — see §3.5. Single-select seniority ladder. Layer C only |
| Q2 | Q2 | Company size | Unchanged text; scoring moves to Layer C only |
| Q3 | Q3 | AI adoption breadth | Unchanged text; scored in A and C on different curves |
| Q4 | Q4 | Leadership AI strategy | Unchanged text; scored in A and C |
| Q5 | Q5 | Current AI ROI | Unchanged text; scored in A and C on different curves |
| **Q6** | — | **AI ownership — NEW** | New readiness dimension |
| Q7 | Q6 | Workflow category | **Now unscored** |
| Q8 | Q7 | People involved | **Scoring made monotonic** |
| Q9 | Q8 | Frequency | Multiple/day now above daily |
| Q10 | Q9 | Hours per week | Weight increased |
| **Q11a** | Q10 | Current state — automation level | **Split.** Single-select, mutually exclusive |
| **Q11b** | Q10 | Current state — symptoms | **Split.** Multi-select, bounded additive |
| Q12 | Q11 | Primary cost | Spread compressed; new answer added |
| **Q13** | — | **Willingness to act — NEW** | Internal qualifier |
| Q14 | Q12 | Contact capture | Unscored. **Add function dropdown + consent checkbox** — see §3.5 |

### 3.1 New Q6 — AI Ownership

**Placement:** Phase 2, after Q5.
**Text:** "Who's accountable for AI at your company?"

| Answer |
|---|
| No one specifically — it's whoever's interested |
| A few informal champions, but it isn't anyone's actual job |
| Someone owns it as part of a wider role |
| We have a dedicated owner or team accountable for AI outcomes |

**Rationale.** `Initial_Ideal_Customer_Profile_ICP.md` §5 names "no clear owner accountable for converting AI experimentation into measurable workflow ROI" as a defining symptom of the operational immaturity the offer targets. Nothing in the existing 12 questions detects it. It is simultaneously the fourth maturity axis (Layer A) and a champion-identification signal (Layer C).

### 3.2 New Q13 — Willingness to Act

**Placement:** New Phase 4 ("Ready to move?"), after the workflow block and before contact capture. Placed there deliberately: the respondent has just articulated concrete pain, so the commitment question reads as a natural consequence rather than a sales probe.
**Text:** "If there were a clear business case for improving this workflow with AI or automation, how likely is your company to act on it in the next 6 months?"

| Answer |
|---|
| Very likely — this is already a priority |
| Likely — if the ROI is compelling |
| Possibly — we're exploring |
| Unlikely — mostly curious right now |

**Rationale.** Recommended in the question review as "extremely useful as an internal qualification signal." It is the only clean detector for the criteria doc's first automatic-reject condition: "primarily wants general AI education, brainstorming, or free consulting." **Layer C only — contributes nothing to either visible score.**

### 3.3 Q12 — new answer option

Add: **"Customer experience — slow or inconsistent handling costs us business."** Recommended in the question review; some workflows lose revenue rather than consuming labor. Requires 8 new insight-copy variants in `content/results-copy.md` (one per workflow category).

### 3.4 Q11 — superseded by the split

An earlier draft of this spec kept Q11 single-choice with "which **best** describes" wording. That is superseded by the Q11a / Q11b split in §3.5, which resolves the same problem properly: the list mixed mutually-exclusive automation states with co-occurring failure modes, and no wording change fixes a list that contains a contradiction.

### 3.5 Answer Input Types and Multi-Select Scoring

#### How ScoreApp scores a multi-select

Verified against official documentation. For a checkbox question with options worth `p₁…pₙ`:

```
question score = Σ(selected options) ÷ Σ(ALL options)
```

The numerator is additive; **the denominator is the sum of every option, regardless of how many were selected.** There is no cap setting, no "count only the highest" mode, and no per-question weight multiplier.

Two consequences that decide every input-type choice below:

1. **A multi-select's weight inside a category equals `Σ(all options)`.** Give six options 3 points each and that one question carries 18 points of the category's denominator — outweighing six ordinal ladders contributing 3 apiece. The budget *is* the sum.
2. **Converting an existing scored single-select list to multi-select silently inverts it.** Q11's live point values summed to 96. Ticking only "Entirely manual" — the single strongest pain signal in the quiz — would have scored 25/96 = **26%**, while the way to score high becomes ticking everything. The most thoughtful respondent is punished.

**The only native way to bound a multi-select to N points is to set its option values to sum to exactly N.** The trade-off is that per-option granularity collapses: differentiating severity between options raises Σ and therefore raises the question's weight. Bounded contribution and differentiated option weights are mutually exclusive under this model.

`max selections` exists but **must not be used for bounding** — whether it reduces the denominator is undocumented. If it does not, 100% becomes unreachable and every score is depressed by a constant, corrupting the tier cutoffs invisibly.

#### Two hard constraints on input type

**Constraint 1 — every question a gate references must stay single-select.** The demotion gates (§4.3) and hard gates (§6.5) test for *specific answers*: G1 asks "is Q5 the top answer?" Under multi-select a respondent could select the top answer *and* the bottom one, and the test has no meaning. Gate-referenced questions: **Q1, Q3, Q4, Q5, Q8, Q10, Q11a, Q13.**

**Constraint 2 — jump logic cannot branch per-answer on a multi-select.** ScoreApp follows one jump path for the whole question. Only single-select questions get a distinct path per answer.

#### Input type by question

| # | Question | Type | Why |
|---|---|---|---|
| Q1 | Role | Single | Ordinal authority ladder; gate HG2 |
| Q2 | Company size | Single | Exclusive bands |
| Q3 | AI adoption breadth | Single | Ordinal ladder; gates G3, HG5 |
| Q4 | Leadership AI strategy | Single | Ordinal ladder; gates G2, HG5 |
| Q5 | Current AI ROI | Single | Ordinal ladder; gates G1, G3, HG5 |
| Q6 | AI ownership | Single | Ordinal ladder |
| Q7 | Workflow category | Single | Q8–Q12 all describe *this* workflow; multi-select makes them incoherent |
| Q7b | "Tell us briefly what it is" | **Open Text, unscored, conditional** | Shown by jump logic only when Q7 = Other |
| Q8 | People involved | Single | Exclusive bands; gate HG4 |
| Q9 | Frequency | Single | Exclusive bands |
| Q10 | Hours per week | Single | Exclusive bands; gate HG4 |
| **Q11a** | Automation level | **Single** | Mutually exclusive states; gate HG3 |
| **Q11b** | Symptoms | **Multi-select** | Genuinely co-occurring and genuinely additive |
| Q12 | Primary cost | Single | "Costs you *most*" is a ranking question, and it selects the 48-variant insight paragraph |
| Q13 | Willingness to act | Single | Ordinal ladder; gate HG1 |
| Q14 | Contact + function + consent | Form fields | See below |

#### Why Q11 splits

The live Q11 list mixes two dimensions and contains a genuine contradiction — "entirely manual" and "partially automated" cannot both be true, so a checkbox version would let respondents assert both. Splitting by dimension fixes the contradiction *and* unlocks the symptom detail:

**Q11a — "Which best describes how this workflow runs today?"** (single)
- Entirely manual — spreadsheets, email, or paper
- We have tools for it, but they don't talk to each other
- Partly automated, but it still takes significant hands-on work
- It runs smoothly — I'm mostly here to explore what's possible

**Q11b — "Which of these also apply? Select all that apply."** (multi-select)
- It depends on one or two people — if they're out, it stalls
- It's complex, with a lot of steps or handoffs
- Work sits waiting for someone to review or approve it
- Mistakes slip through and get caught later
- The same information gets entered or copied more than once
- None of these

Q11b is the largest data upgrade in the question set. Each symptom maps to a *different* automation lever — "the same information gets entered more than once" is an integration opportunity; "work sits waiting for approval" is a routing opportunity — so the founders enter the call with a mechanism hypothesis rather than a category. Both the count (via score) and the identity (via the webhook `answers` array and Audience conditions) are available internally.

**A count-band alternative was considered and rejected.** Asking "how many of the following apply? None / 1–2 / 3–4 / 5+" would be a clean bounded ordinal with full jump-logic support. It was rejected because it discards *which* symptoms apply, which is the entire value of the question. The bounded-additive checkbox gives the count and the identity, and its math is exactly safe — see below.

**No exclusive-option behaviour exists in ScoreApp**, so nothing prevents a respondent ticking "None of these" alongside symptoms. Harmless by construction: "None of these" is worth 0, so a stray selection cannot move the score.

#### Q14 — contact step

Three additions, none of which cost a quiz question:

| Field | Type | Scored | Notes |
|---|---|---|---|
| Function — "Which area do you lead or work in?" | Lead-form **Dropdown** | **No** — lead-form fields cannot be scored | Drives an Audience and an internal priority flag (SF8) |
| Marketing consent | Native **Explicit Consent (Optional)** | No | Stores timestamp + exact wording; arrives as `opt_in` on every webhook event |
| First name, company, email | Text | No | Unchanged |

Consent is set to **Optional rather than Required** so a missing tick does not cost the lead — the results page is delivered instantly on screen regardless. **All three email sequences must be gated on `opt_in = true`.**

Function moves here rather than becoming a quiz question because it is profile data, reads naturally beside company name, and is fully available to Layer C through Audience "Lead Form Answers" conditions. The cost is that it cannot award points (§6.4).

---

## 4. Layer A — AI Readiness Score → Archetype

Four maturity axes at 25 points each. The raw total **is** the 0–100 score; no normalization to explain.

| Axis | Question |
|---|---|
| Breadth — how far usage has spread | Q3 |
| Commitment — whether it can be sponsored | Q4 |
| Proof — whether it has produced anything | Q5 |
| Ownership — whether anyone is accountable | Q6 |

### 4.1 Point tables

**Q3 — AI adoption breadth (0–25)**

| Answer | Pts |
|---|---|
| A few people are experimenting on their own | 4 |
| We use AI across teams, but each team does it differently — no shared approach | 11 |
| Most of our team uses AI as part of how they work | 18 |
| AI is woven into our operations — it's infrastructure, not just a tool | 25 |

**Q4 — Leadership AI strategy (0–25)**

| Answer | Pts |
|---|---|
| No formal strategy yet — mostly individual decisions | 3 |
| We're starting to discuss it at a leadership level | 10 |
| We have an AI plan and we're actively working on it | 18 |
| AI is a top strategic priority with full executive buy-in | 25 |

**Q5 — Current AI ROI (0–25)**

| Answer | Pts |
|---|---|
| We're not really using it yet | 1 |
| We're using AI tools but haven't seen clear business impact | 8 |
| We see productivity gains, but nothing that's changed the company overall | 16 |
| Yes — we can point to real, measurable business results | 25 |

**Q6 — AI ownership (0–25)**

| Answer | Pts |
|---|---|
| No one specifically — it's whoever's interested | 3 |
| A few informal champions, but it isn't anyone's actual job | 9 |
| Someone owns it as part of a wider role | 17 |
| We have a dedicated owner or team accountable for AI outcomes | 25 |

**Maximum: 100.**

### 4.2 Bands

| Score | Level | Archetype |
|---|---|---|
| 80–100 | 4 | The Architect |
| 55–79 | 3 | The Builder |
| 30–54 | 2 | The Explorer |
| 0–29 | 1 | The Spectator |

Archetype names adopt the set in `docs/Archetype Name Ideas.md`, replacing the live Observer / Tinkerer / Catalyst / Architect.

### 4.3 Demotion gates

A pure sum lets contradictory answers produce a false archetype. Three gates apply **after** banding. **Demotion only — never promotion.** Evaluated in order; each caps the result, and G3 overrides everything.

| Gate | Condition | Result | Why |
|---|---|---|---|
| **G1** | Provisional = Architect AND Q5 ≠ "real, measurable business results" | Cap at Builder | The Architect copy's central claim is "your company can point to real results." Without it, the copy is false. The Builder copy — "turn scattered productivity gains into measurable company-level results" — is exactly right for this profile. |
| **G2** | Provisional ≥ Builder AND Q4 = "No formal strategy yet" | Cap at Explorer | The Builder copy opens "Leadership is paying attention." An answer set claiming broad adoption with zero leadership strategy is internally contradictory; the conservative read is the honest one. |
| **G3** | Q3 = "A few people are experimenting on their own" AND Q5 = "We're not really using it yet" | Force Spectator | That answer pair is the literal Spectator definition. |

**Why demotion-only.** Overclaiming is the worse failure. Telling a company they are an Architect when they cannot point to results discredits the entire assessment the moment they discuss it internally — which is the explicit design goal of the results page. Under-claiming leaves the copy accurate to the answers given.

**Worked example — G3 earning its place.** Leadership says AI is a top strategic priority (25) and there is a dedicated owner (25), but Q3 = "a few people experimenting" (4) and Q5 = "not really using it yet" (1). Raw score 55 → provisional **Builder**. G3 fires → **Spectator**. The Spectator copy fits precisely: *"You see what's happening. You just haven't stepped onto the field yet."*

That same company scores strongly on Layer C — high intent, real ownership, zero execution. **Low archetype, strong lead.** The current single-score system cannot express that combination at all.

---

## 5. Layer B — Workflow Opportunity Score

Estimates how much economic value plausibly sits in the workflow the respondent named.

| Question | Max | Rationale |
|---|---|---|
| Q10 hours/week | 35 | The economic core. Already aggregates people × frequency ("collectively spend"), so it should dominate. |
| Q11a automation level | 15 | Automation headroom — the multiplier on everything else. |
| Q11b symptoms | 10 | Bounded additive: 5 symptoms × 2 pts. Σ(all options) = 10 = the budget. |
| Q8 people involved | 15 | Coordination leverage beyond raw hours (handoffs, consistency). |
| Q9 frequency | 15 | Cadence — determines return on a build. |
| Q12 primary cost | 10 | Value *type*, not amount. Compressed spread avoids false precision. |
| Q7 workflow category | **0** | **Unscored.** |

**Q10 — Hours per week (0–35)**

| Answer | Pts |
|---|---|
| Less than 5 hours | 4 |
| 5–10 hours | 13 |
| 11–20 hours | 22 |
| 21–40 hours | 29 |
| More than 40 hours | 35 |

**Q11a — Automation level (0–15, single-select)**

| Answer | Pts |
|---|---|
| Entirely manual — spreadsheets, email, or paper | 15 |
| We have tools for it, but they don't talk to each other | 13 |
| Partly automated, but it still takes significant hands-on work | 11 |
| It runs smoothly — I'm mostly here to explore what's possible | 1 |

Disconnected tools is the highest-value integration opportunity and sits near the top. The last option is also hard gate HG3.

**Q11b — Symptoms (0–10, multi-select)**

| Answer | Pts |
|---|---|
| Each of the 5 symptoms | 2 |
| None of these | 0 |

Σ(all options) = 10, which equals the budget — so the question is exactly bounded and its weight inside Layer B is exactly 10. Score rises monotonically with symptom count: 0 / 2 / 4 / 6 / 8 / 10. Per-option severity is deliberately flat; differentiating it would raise Σ and silently increase the question's weight (§3.5).

Combined Q11a + Q11b budget is 25 — unchanged from the live build's single Q11. **The split is weight-neutral.**

**Q8 — People involved (0–15) — now monotonic**

| Answer | Pts |
|---|---|
| Just me | 2 |
| 2–5 people | 7 |
| 6–15 people | 12 |
| 16 or more people | 15 |

The live build scores 16+ *below* 6–15. The question review flagged this as unjustifiable. More people on a repetitive workflow means more economic leverage. The implementation complexity that motivated the original penalty moves to a Layer C soft flag (SF3), exactly as the review recommended.

**Q9 — Frequency (0–15)**

| Answer | Pts |
|---|---|
| Multiple times per day | 15 |
| Daily | 13 |
| Weekly | 10 |
| Monthly | 5 |
| Quarterly | 1 |

**Q12 — Primary cost (0–10)**

| Answer | Pts |
|---|---|
| Money — the labor cost is significant | 10 |
| Scale — we can't grow without adding headcount | 10 |
| Errors — mistakes happen and they're expensive | 9 |
| Time — it creates constant bottlenecks | 9 |
| Customer experience — slow or inconsistent handling costs us business | 9 |
| Team morale — it's tedious and people hate it | 7 |

**Maximum: 100.**

### 5.1 Why Q7 becomes unscored

In the live build the seven named categories score 8–10 while "Other / something else" scores 0. That spread does almost no discriminating work, and the "Other" penalty is a pure UX artifact — choosing the honest answer silently tanks the respondent's score. Q7's real job is selecting the insight paragraph. Internally it informs the Repeatability signal (§6.5), not the opportunity magnitude.

### 5.2 Display tiers

| Score | Label |
|---|---|
| 80–100 | Substantial |
| 60–79 | Significant |
| 35–59 | Meaningful |
| 0–34 | Contained |

Paired on the results page with the existing annual-hours and dollar estimate from Q10. Per `AI_Readiness_Qualification_Form_Questions_Review.md`, those dollar figures must be labelled as screening estimates of **labor cost**, never as recoverable savings.

### 5.3 Results page hierarchy

Archetype and AI Readiness Score lead the page as the hero. The Opportunity Score, its tier, the dollar estimate, and the 2×2 positioning appear below. This preserves the identity-discovery framing the quiz is built around rather than turning the page into a two-number dashboard.

---

## 6. Layer C — Diagnostic Fit Score (internal only)

Never rendered on any result page, never sent to the respondent. Four pillars mapped onto the four conditions in `AI_Readiness_Qualification_Form_Questions_Review.md` ("Fit, Readiness, Economic pain, Actionability") and the required minimum criteria in `AI Workflow ROI Diagnostic Qualification Criteria.md`.

| Pillar | Pts | Criteria-doc requirement |
|---|---|---|
| 1 — Economic Pain | 35 | "Meaningful workflow" + "Potential economic value" |
| 2 — Readiness to Act | 30 | "AI interest/readiness" + actionability |
| 3 — Company & Maturity Fit | 20 | "Company fit" |
| 4 — Access & Authority | 15 | "Decision access" |

### 6.1 Pillar 1 — Economic Pain (35)

Layer B rescaled to 35 points. Expressed as native per-answer values so it can be built additively in ScoreApp.

| Question | Answer | Pts |
|---|---|---|
| Q10 hours | <5 / 5–10 / 11–20 / 21–40 / >40 | 1 / 5 / 8 / 10 / **12** |
| Q11a level | manual / disconnected tools / partly automated / runs smoothly | 4 / 3 / 3 / 0 |
| Q11b symptoms | per symptom selected (multi-select, Σ = 5) | 1 each |
| Q8 people | just me / 2–5 / 6–15 / 16+ | 1 / 2 / 4 / **5** |
| Q9 frequency | multiple daily / daily / weekly / monthly / quarterly | 5 / 4 / 3 / 2 / 0 |
| Q12 cost | money / scale / errors / time / CX / morale | 4 / 4 / 3 / 3 / 3 / 2 |

Max 12 + (4+5) + 5 + 5 + 4 = **35**. Unchanged by the split.

### 6.2 Pillar 2 — Readiness to Act (30)

| Question | Answer | Pts |
|---|---|---|
| **Q13 willingness** | Very likely — already a priority | 15 |
| | Likely — if the ROI is compelling | 11 |
| | Possibly — we're exploring | 5 |
| | Unlikely — mostly curious right now | **0 · HARD GATE** |
| Q4 leadership | No formal strategy | 0 |
| | Starting to discuss | 4 |
| | Have a plan, actively working | 7 |
| | Top strategic priority | 8 |
| Q6 ownership | No one specifically | 1 |
| | Informal champions | 4 |
| | Owns it as part of a wider role | **7** |
| | Dedicated owner or team | 6 |

Max **30**.

Note the deliberate inversion at the top of Q6: "owns it as part of a wider role" scores *above* "dedicated owner or team." A part-time owner is a champion who needs help. A dedicated AI team may be the internal capability that makes the engagement unnecessary — the ICP disqualifier "already highly AI-optimized with a mature internal transformation team."

### 6.3 Pillar 3 — Company & Maturity Fit (20)

**Q2 — Company size (0–8), ICP-shaped**

| Answer | Pts |
|---|---|
| Under 25 | 1 |
| 25–50 | 4 |
| 51–100 | **8** |
| 101–200 | **8** |
| 201–300 | 5 |
| 301–500 | 3 |
| Over 500 | 2 |

**Q3 — Adoption breadth (0–6), INVERTED-U**

| Answer | Layer A | Layer C |
|---|---|---|
| A few people are experimenting on their own | 4 | 2 |
| We use AI across teams, but each does it differently — no shared approach | 11 | **6** |
| Most of our team uses AI as part of how they work | 18 | 4 |
| AI is woven into our operations — it's infrastructure | 25 | 2 |

**Q5 — Current AI ROI (0–6), INVERTED-U**

| Answer | Layer A | Layer C |
|---|---|---|
| We're not really using it yet | 1 | 1 |
| Using AI tools but no clear business impact | 8 | **6** |
| Productivity gains, nothing company-wide | 16 | 5 |
| Real, measurable business results | 25 | 2 |

Max **20**. These two tables are the mechanical expression of the ICP's "messy middle" principle, and the reason Layer C cannot be a re-weighting of Layer A.

### 6.4 Pillar 4 — Access & Authority (15)

The live Q1 list is not a partition: it mixes a seniority ladder with a single *function* option, so "VP of Operations" matches two rows and scores 15 or 13 depending on which the respondent happens to pick. Since this pillar reads Q1 as an ordinal authority ladder, that ambiguity fed noise straight into the qualification decision. Function is removed from the list and captured on the contact form instead (§3.5).

| Q1 answer — seniority only | Pts |
|---|---|
| Owner / Founder / CEO | 15 |
| C-Suite (COO, CTO, CIO, CFO…) | 14 |
| VP | 13 |
| Director / Head of Department | 9 |
| Manager | 5 |
| Individual Contributor | **0 · HARD GATE** |

**Function awards no points**, because ScoreApp lead-form fields cannot be scored. It drives soft flag SF8 instead — Operations, Technology, or Transformation at Director level or above is the ICP's named ideal champion and is worth surfacing as a priority signal in the internal brief.

**Layer C maximum: 35 + 30 + 20 + 15 = 100.**

### 6.5 Hard gates

Any one firing forces REJECT and suppresses the Diagnostic CTA regardless of score. Each traces to a specific line in `AI Workflow ROI Diagnostic Qualification Criteria.md`.

| ID | Condition | Criteria-doc line implemented |
|---|---|---|
| **HG1** | Q13 = "Unlikely — mostly curious right now" | "Primarily wants general AI education, brainstorming, or free consulting without a specific workflow problem." |
| **HG2** | Q1 = "Individual Contributor" | "No meaningful access to the workflow owner or buying process and cannot make an introduction." |
| **HG3** | Q11a = "It runs smoothly — I'm mostly here to explore what's possible" | "No identifiable operational pain or meaningful cost." |
| **HG4** | Q10 = "Less than 5 hours" **AND** Q8 = "Just me" | "The workflow is too trivial to support an economically rational engagement." |
| **HG5** | Q3 = "a few experimenting" **AND** Q4 = "No formal strategy" **AND** Q5 = "not really using it yet" | "Company is fundamentally resistant to AI and the conversation would first require us to sell the category itself." |

HG5 is intentionally narrower than Layer A's G3. A Spectator who clears HG5 — leadership engaged, real pain, willing to act — **does** receive the CTA. This is the substantive behavioural change from the live build, where Level 1 is excluded categorically.

### 6.6 Soft flags

CTA still shows; the internal brief carries the caveat.

| ID | Condition | Brief note |
|---|---|---|
| SF1 | Q2 ∈ {Under 25, 301–500, Over 500} | Outside ICP size band — confirm the economics justify an exception. |
| SF2 | Q1 ∈ {Manager, Director} | Map the buying committee early: who else must be in the room? |
| SF3 | Q8 = "16 or more people" | Delivery complexity — many stakeholders. Probe scope containment. |
| SF4 | Archetype = Architect AND Q5 = "measurable results" | May already have internal capability. Probe what is actually missing before committing founder time. |
| SF5 | Q13 = "Possibly — we're exploring" | Timing unconfirmed. Establish the trigger event on the call. |
| SF6 | Q7 = "Other / something else" | Workflow outside the known taxonomy — confirm scope and feasibility early. |
| SF7 | Q4 = "No formal strategy yet" | No executive sponsor identified. Ask who the internal champion is and who would have to sponsor this. |
| SF8 | Function ∈ {Operations, Technology, Transformation} **AND** Q1 ≥ Director | **Priority signal, not a caveat.** Ideal champion profile per ICP §6. |
| SF9 | Q11b includes "the same information gets entered or copied more than once" | Direct integration opportunity — name the systems on the call. |
| SF10 | Q11b includes "work sits waiting for someone to review or approve it" | Routing / approval-flow opportunity. |

SF4 implements the review's instruction that "a mature company should not receive a Diagnostic CTA merely because it is mature."

### 6.7 Decision tiers

Calibrated for balanced strictness at 7+ calls/week capacity, where volume rather than capacity is the binding constraint.

| Condition | Decision | CTA | Action |
|---|---|---|---|
| Any hard gate fires | **REJECT / NOT NOW** | No | Nurture sequence |
| Score ≥ 65, no gates | **ACCEPT** | Yes | Priority outreach; rank by score |
| Score 45–64, no gates | **HOLD / QUALIFY ON CALL** | Yes | Brief names the specific weak pillar |
| Score < 45, no gates | **REJECT / NOT NOW** | No | Nurture sequence |

These thresholds are tuning dials, not findings. See §10.

#### 6.7.1 Company-size threshold modifier

`Initial_Ideal_Customer_Profile_ICP.md` states that companies outside 50–250 employees "are exceptions, not the default. Consider them only when the workflow economics, buyer access, urgency, and delivery fit are unusually strong."

A soft flag alone does not implement that, because an out-of-band company can still reach HOLD on ordinary strength. So:

**If Q2 ∈ {Under 25, Over 500}, both thresholds rise by 15 points: HOLD becomes 60, ACCEPT becomes 80.**

This is a stricter bar rather than a hard gate, which is exactly what "exception, not default" means. Two profiles from §10.1 demonstrate it working in both directions:

| Profile | Layer C | Standard bar | Raised bar | Outcome |
|---|---|---|---|---|
| AI-curious sub-25-person company, owner-CEO, modest workflow | 49 | HOLD → CTA | below 60 | **REJECT** ✓ matches reviewer's expectation |
| Department head in a 500+ enterprise, severe workflow pain | 81 | ACCEPT | clears 80 | **ACCEPT** ✓ the intended exception |

The small-company case is instructive: its Layer C score is carried almost entirely by Q1 = Owner/CEO (15 of 49). Perfect decision access over a workflow too small to matter is not a qualified opportunity, and without this modifier the model would treat it as one.

### 6.8 FAEO pre-population

Layer C pre-fills 5 of the 9 criteria in `docs/Fit-Adjusted Economic Opportunity (FAEO) Scorecard.md` on its 1–5 scale, so the internal brief arrives as a partial FAEO scorecard rather than a pile of answers.

| FAEO criterion | Derived from | Mapping |
|---|---|---|
| Pain | Layer B | 0–19→1, 20–39→2, 40–59→3, 60–79→4, 80–100→5 |
| Urgency | Q13 | Unlikely→1, Possibly→2, Likely→4, Very likely→5 |
| Access | Q1 | IC→1, Manager→2, Director→3, C-Suite/VP→4, Owner or Ops/Tech leader→5 |
| AI Readiness | Layer A archetype | HG5 fired→1, Spectator→2, Explorer→3, Builder→4, Architect→5 |
| Repeatability | Q7 | Named category→4, Other→2 |

**Not derivable from the quiz — leave blank for the call:** Budget, Uzziah + Arielle Fit, Delivery Simplicity, Proof Speed. Per the FAEO doc, blanks must not be treated as 5s.

---

## 7. Routing and CTA Logic

```
14 answers
    │
    ├─► Layer A (Q3,Q4,Q5,Q6) ──► band ──► gates G1-G3 ──► ARCHETYPE ──► result page (1 of 4)
    │
    ├─► Layer B (Q8-Q12) ──────────────────────────────► OPPORTUNITY SCORE + tier + $ estimate
    │                                                         (rendered on whichever page)
    │
    └─► Layer C (all except Q7,Q14) ──► hard gates HG1-HG5
                                              │
                                    ┌─────────┴─────────┐
                                 fires              none fire
                                    │                   │
                                 REJECT            score band
                                    │              ┌────┴────┐
                              no CTA shown      ≥45        <45
                              nurture email       │           │
                                            CTA shown     no CTA
                                                  │       nurture
                                          ACCEPT ≥65 → priority
                                          HOLD 45-64 → flagged
```

**Two independent axes.** Which of the four result pages the respondent lands on is a Layer A question. Whether the Diagnostic CTA section is visible on that page is a Layer C question. All sixteen combinations are reachable, including Architect-without-CTA and Spectator-with-CTA.

**CTA copy varies by archetype**, not by qualification. A qualifying Spectator sees "starting point" framing; a qualifying Architect sees "next strategic lever" framing. Both point at the same Calendly link.

---

## 8. ScoreApp Implementation

### 8.1 Categories

| Category | Contents | Counts toward total score? |
|---|---|---|
| AI Readiness | Layer A point values | **Yes** — total score = Layer A |
| Workflow Opportunity | Layer B point values | No (excluded via toggle) |
| Diagnostic Fit | Layer C point values | No (excluded via toggle) |

Setting the overall score equal to Layer A means the archetype and the headline number are one coherent thing, and any stray ScoreApp UI that displays "your score" shows the right number.

### 8.2 Why not "Outcome / highest category" routing

ScoreApp's Outcome routing assigns a result page by whichever category scores highest. That is the correct mechanism for personality-type quizzes with parallel, non-ordinal types. **These archetypes are ordinal levels**, not types — Architect is not a different flavour of Explorer, it is further along the same axis. Modelling them as four competing categories would be conceptually wrong and would inherit ScoreApp's tie-breaking behaviour (ties resolve to whichever category sits higher in the list), producing arbitrary results on balanced answer sets.

Instead: route on **Audiences** keyed to the AI Readiness category percentage plus answer-level gate conditions.

### 8.3 Archetype audiences

Priority-ordered; ScoreApp evaluates top-down and the first match wins, so each rule need only express its own gates.

| Priority | Audience | Conditions |
|---|---|---|
| 1 | Archetype — Architect | AI Readiness % ≥ 80 **AND** Q5 is "real, measurable business results" |
| 2 | Archetype — Builder | AI Readiness % ≥ 55 **AND** Q4 is not "No formal strategy yet" **AND** (Q3 is not "a few experimenting" **OR** Q5 is not "not really using it yet") |
| 3 | Archetype — Explorer | AI Readiness % ≥ 30 **AND** (Q3 is not "a few experimenting" **OR** Q5 is not "not really using it yet") |
| 4 | Archetype — Spectator | *(default — all remaining)* |

G1 is expressed by the Architect rule's second condition; G2 by the Builder rule's second; G3 by the De Morgan expansion `NOT(A AND B) = (NOT A) OR (NOT B)` in rules 2 and 3.

### 8.4 CTA visibility audience

Audience **"Diagnostic Qualified"**, controlling section-level visibility of the booking CTA on all four result pages:

```
Diagnostic Fit % ≥ 45
  AND Q13 is not "Unlikely — mostly curious right now"          (HG1)
  AND Q1  is not "Individual Contributor"                        (HG2)
  AND Q11a is not "It runs smoothly — I'm mostly here to explore" (HG3)
  AND (Q10 is not "Less than 5 hours" OR Q8 is not "Just me")    (HG4)
  AND (Q3 is not "a few experimenting"
       OR Q4 is not "No formal strategy yet"
       OR Q5 is not "not really using it yet")                   (HG5)
```

A second audience **"Diagnostic Priority"** (`Diagnostic Fit % ≥ 65` plus the same gates) drives internal ranking and the CRM tag.

**This is the highest-risk part of the native build.** HG4 and HG5 require an AND of OR-groups; ScoreApp documents AND/OR combination but not nesting depth. See §10.

### 8.5 Phasing

**Phase 1 — native ScoreApp.** Layers A and B in full. Archetype routing with all three gates. Layer C as an additive hidden category with as many hard gates as audience logic supports. Internal notification: a flat email carrying all answers, all three scores, and the tier.

**Phase 2 — webhook.** Point `QUIZ_FINISHED` at Make or Zapier. The payload carries every answer as text plus all category subscores, so Layer C is recomputed with exact logic — every gate, every soft flag, the FAEO pre-fill — and the rich internal brief is rendered there.

Two payload facts that shape the phase-2 build:
- **No per-question scores are included.** Only `total_score` and `category_scores` aggregates. Layer C must be re-derived from answer *text* using the tables in §6 — which is fine, and in fact preferable, since it makes the automation the single source of truth for gate logic.
- **Multi-select answers arrive as an array of objects**, not bare strings: `"answers": [{"answer": "..."}, {"answer": "..."}]`. Q11b's parser must handle the array shape and count matches.

**Phase 2 is not optional for the internal brief.** `content/internal-brief-template.md` is built almost entirely from `{IF Q11 = ...}` conditional blocks (old numbering — that is the primary-cost question, now Q12). ScoreApp documents Dynamic Content for result pages and PDFs but never for emails. Phase 1 therefore delivers correct *routing* but a degraded *briefing* experience. Plan accordingly: phase 1 is launchable, phase 2 is what makes the internal side genuinely useful.

---

## 9. Content Changes Required

| File | Change |
|---|---|
| `content/quiz-questions.md` | Replace the entire Scoring Notes section. Add Q6 and Q13. Renumber Q6–Q12. Update Q8/Q9/Q11/Q12 point tables and Q12 answer list. Remove the incorrect 2026-08-19 platform finding and replace it with §1.1. |
| `content/archetypes.md` | Rename to Spectator / Explorer / Builder / Architect, adopting the fuller copy from `docs/Archetype Name Ideas.md`. **Delete the "Observers do not receive a Diagnostic CTA" note** — superseded by §7. Remove the note that archetype is driven by overall score. |
| `content/results-copy.md` | New score-display section: archetype + Readiness hero, Opportunity secondary, 2×2 positioning. New band table. Replace the Observer no-CTA block with Layer-C-driven CTA / no-CTA copy. Add "starting point" CTA framing for qualifying Spectators. Add 8 insight variants for the new Q12 "Customer experience" option (40 → 48 total). |
| `content/internal-brief-template.md` | Restructure around Layer C: four-pillar breakdown, tier, which gates and flags fired, FAEO pre-fill table. Subject line carries Layer C tier, not the blended score. |
| `content/follow-up-sequences.md` | Nurture trigger changes from "Observer archetype OR score < 35" to "Layer C = REJECT." Consider reason-specific variants (too-small workflow vs not-ready-to-act are different conversations). |
| `index.html` | The "Your AI Opportunity Score" block describes "a 0–100 score calibrated to your company size, AI adoption, and the specific workflows your team runs." Company size no longer feeds any visible score. Rewrite to describe the two-score model. |

---

## 10. Validation and Open Items

### 10.1 Test matrix

Reproduces the five profiles from `AI_Readiness_Qualification_Form_Questions_Review.md`. Expand to 15 profiles before launch, as that document recommends.

| Mock company | Expected | This model | Correct today? |
|---|---|---|---|
| AI-curious sub-25 company, modest workflow, owner-CEO | Spectator / nurture, no Diagnostic | Spectator. Layer C **49**; §6.7.1 raises the bar to 60 → **REJECT** | ✓ |
| 100-person, fragmented adoption, $100K/yr burden, Ops leader | Prime candidate | Explorer or Builder. Layer B 83, Layer C **89** → **ACCEPT**, top of the ranking | ✗ under-ranked today |
| AI-mature, measurable ROI, no workflow pain | Not a hot lead | Architect. Layer B 27, Layer C 59 — but **HG3 fires** → **REJECT**. SF4 would have flagged it regardless | ✗ flagged "🔥 HOT LEAD" today |
| Dept head in 500+ enterprise, severe workflow pain | Intentional exception | Layer C **81**, clears the raised 80 bar → **ACCEPT**. SF1 + SF2 + SF3 flagged | ✗ unhandled today |
| Strong workflow economics, no leadership support, Director | Acknowledge opportunity, avoid an aggressive CTA | Explorer (G2 demotes). Layer B high, Layer C **75** → **ACCEPT** with SF7 + SF2 flagged | ✗ |

Three of five are mis-routed by the live build.

**One row deserves scrutiny.** The last profile reaches ACCEPT at 75 rather than HOLD, because strong workflow economics (31/35) and good maturity fit (20/20) outweigh a zero on leadership. The review asked for a softer CTA here. Two defences: the criteria doc's minimum bar is "already using, piloting, budgeting for, or actively exploring AI" — no formal strategy is not the same as resistant — and SF7 puts the missing sponsor in front of the founders before the call. But it depends on the "balanced strictness / 7+ calls per week" calibration chosen for launch. **If founder time gets scarcer, raising Q4's Pillar 2 weight is the first dial to turn.** Flagged in §10.3.

### 10.2 Platform verification

#### Resolved from official documentation — the two blockers both clear

| Question | Verdict | Source |
|---|---|---|
| Can one answer award **different point values to different categories**? Q4 needs 25 in Layer A and 8 in Layer C. | **YES.** "Set Points: decide how many points an answer is worth *within that category*… repeat for any additional categories." Corroborated by the integration field-mapping doc: "if the answer has multiple scoring categories, this score will be the sum of those scores." | `support.scoreapp.com/article/146`, `/195` |
| Can a category be **excluded from the total score**? | **YES.** The public API exposes category `scoring_logic` with values `add` and `none`, plus `type` of `visible` or `hidden`. A scored-but-hidden category that does not move the headline number is a supported configuration. | `support.scoreapp.com/article/217` |

**This was the load-bearing pair.** Native Layer C is viable; phase 2 remains an enhancement rather than a prerequisite.

Also newly established: a **public Open API exists** (article 217) and exposes `score_potential` per answer and per category. An earlier research pass concluded no public API was documented — that was wrong. This matters because the webhook does *not* carry per-question scores or denominators, so any downstream audit of the scoring maths must pull the API rather than parse the webhook.

#### Still to verify in the account UI

| # | Question | Blocks | Priority |
|---|---|---|---|
| 1 | **Confirm the multi-select denominator empirically.** Build a 6-option checkbox at 2 pts each, tick one, and read the percentage. 20% confirms `Σ(selected)/Σ(all)` as documented. | Q11b's weight inside Layer B | **First** |
| 2 | Does an **"Other" option with free text** exist on choice questions? The API's `"type": "regular"` option discriminator hints something else exists, but no doc describes it. | Q7's Other capture. Fallback (Q7b Open Text via jump logic) already specified in §3.5 and works regardless | High |
| 3 | **Audience condition nesting** — is an AND of OR-groups expressible? | HG4 and HG5 (§8.4) | High |
| 4 | Can a result-page section be **hidden by** audience membership, or only **shown to** it? | Fallback construction if #3 fails | Medium |
| 5 | Does an **optional scored question left blank** (as opposed to logic-skipped) leave the denominator? Docs cover only logic-skipping, and contradict themselves between overall and category level. | 0–100 normalization consistency. Mitigated by making every scored question required | Medium |
| 6 | Merge-tag inventory in notification emails — numeric category percentages? individual answer text? | Phase 1 internal notification quality | Medium |
| 7 | Which plan tier enables **webhooks**? Absent from every published pricing table. | Phase 2 | Low |

**Do not use `max selections` anywhere.** It exists, but whether it reduces the denominator is undocumented; if it does not, 100% becomes unreachable on that question and every respondent's score is depressed by a constant, corrupting tier cutoffs invisibly. No question in this design needs it.

**Do not add jump logic to any scored question.** Logic-skipping changes the total points available, so two respondents would be normalized against different denominators. The only jump in this design is Q7 → Q7b, and Q7b is Open Text, which ScoreApp never scores.

### 10.3 Calibration

Every threshold in §4.2, §5.2 and §6.7 is a dial, not a finding. Pre-launch they are set by judgement against the test matrix. Recalibrate after the first 50 submissions:

- If more than ~60% qualify, the ACCEPT threshold is too low.
- If archetype distribution is heavily skewed to one level, the Layer A bands need moving.
- If Diagnostic calls repeatedly surface a disqualifier the quiz missed, that disqualifier needs a new question or a new gate.
- **Watch the no-executive-sponsor profile specifically** (§10.1, last row). It reaches ACCEPT on workflow economics alone. If those calls consistently stall on the absence of a sponsor, increase Q4's weight inside Pillar 2 or add a gate requiring Q4 ≠ "No formal strategy yet" for ACCEPT.

### 10.4 Explicitly out of scope

- **Technical feasibility signals** (data access, systems, security constraints). Genuinely valuable, but a business leader cannot answer them reliably in a quiz, and they are core Diagnostic-call material. Noted here so the omission is deliberate rather than forgotten.
- **Budget signal.** Asking about money inside a free assessment damages the identity-discovery framing. Stays a call question and a blank in the FAEO pre-fill.
- **Multi-select on Q11.** Richer data, materially more complex Layer B weighting. Revisit only if single-choice proves lossy in practice.
