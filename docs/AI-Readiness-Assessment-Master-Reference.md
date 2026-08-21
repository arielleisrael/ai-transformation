# AI Readiness Assessment — Master Reference

**Version 2.0 · 2026-08-21 · Canonical**

The complete specification for the AI Readiness Assessment: what it is, every question, all three scoring layers, archetype assignment, qualification logic, results copy, internal process, and the ScoreApp build.

---

## 0. How to Use This Document

This is the **canonical reference**. If any other file disagrees with it, this document wins and the other file should be corrected.

| File | Role |
|---|---|
| **This document** | Complete specification. Read this to understand or hand off the whole system. |
| `content/quiz-questions.md` | Question build sheet — same content as §3–§6 here, sliced for ScoreApp configuration work. |
| `content/archetypes.md` | Archetype hero copy — reproduced in full in §4.4. |
| `content/results-copy.md` | Results page copy, **including the 48-variant insight matrix not reproduced here** (see §7.4). |
| `content/internal-brief-template.md` | Internal brief template — summarized in §8. |
| `content/follow-up-sequences.md` | Email copy — summarized in §9. |
| `docs/superpowers/specs/2026-08-21-quiz-scoring-architecture-design.md` | Design rationale: why each number is what it is, alternatives considered, worked examples. |

**One thing is deliberately not here:** the 48 personalized insight paragraphs (8 workflow categories × 6 pain types). They are ~5,000 words of near-parallel copy that would dominate this document without making the logic clearer. They live in `content/results-copy.md` §Layer 3. Everything else is here in full.

**Maintenance rule:** change this document first, then propagate. Two places holding the same fact will drift; the only defence is a clear order of precedence.

---

## 1. What This Is

A 14-question assessment that a business leader completes in 4–5 minutes and receives an immediate, personalized result. It sits at the top of the funnel for the **AI Workflow ROI Diagnostic**.

**Position in the funnel:**

```
CTA / LinkedIn / Referral
        ↓
   AI Readiness Assessment
        ↓
Archetype + two scores, instantly
        ↓
   Layer C qualification (invisible)
        ↓
Qualified → Calendly booking     Not qualified → nurture
        ↓
Internal brief to Uzziah + Arielle (30 min delay)
        ↓
   30-minute Diagnostic
```

**The two jobs it does at once:**

| To the respondent | To us |
|---|---|
| A useful AI-readiness assessment with a result worth discussing internally | Qualification data: company fit, authority, AI maturity, workflow economics, willingness to act |

**Design promise:** the result should be specific enough that the respondent wants to show someone. The target reaction is *"This describes us. We should talk about this."* Not *"I've been sold to."*

**Who it's for** (from `Initial_Ideal_Customer_Profile_ICP.md`): 50–250 employee knowledge-work-heavy companies whose leaders already believe AI matters and whose teams are using it, but who have not translated adoption into coordinated workflows and measurable impact. The **"messy middle" — not AI-resistant, not AI-optimized.**

---

## 2. The Scoring Architecture

### 2.1 Three layers

| Layer | Name | Range | Visible | Inputs | Drives |
|---|---|---|---|---|---|
| **A** | AI Readiness Score | 0–100 | Yes — hero | Q3, Q4, Q5, Q6 | The archetype |
| **B** | Workflow Opportunity Score | 0–100 | Yes — secondary | Q8–Q12 | Opportunity tier + cost estimate |
| **C** | Diagnostic Fit Score | 0–100 | **Never** | Q1–Q6, Q8–Q13 + function | Diagnostic CTA + internal brief |

All three read the same answers with different weightings. None is derived from another.

### 2.2 Why three, and not one

The v1 assessment computed a single 0–100 number blending company fit (~21%), AI maturity (~31%), and workflow economics (~49%). That number drove the score, the archetype, and the CTA simultaneously.

The root problem is sharper than "it mixes concepts":

> **AI maturity relates to prospect value monotonically, but to internal opportunity as an inverted U.**

The ICP defines the target as the messy middle and lists "already highly AI-optimized with a mature internal transformation team" as a disqualifier. A monotonic score cannot express a non-monotonic preference. The two audiences rank the same answers in a different order:

| Q5 — "Is AI actually moving the needle?" | To the respondent | To us |
|---|---|---|
| We're not really using it yet | Lowest | **Low** — we'd have to sell the category first |
| Using AI tools but no clear business impact | Low | **Highest** — the exact ICP pain state |
| Productivity gains, nothing company-wide | Mid | **High** — the messy middle |
| Real, measurable business results | Highest | **Moderate** — may already have internal capability |

Q3 behaves identically. "We use AI across teams, but each team does it differently" reads as mid-maturity to the respondent and is the **single highest-value answer in the quiz** for us, because fragmentation is what the offer sells against.

One score cannot carry both shapes.

### 2.3 Design principles

1. **Nothing about company size or job title touches a visible score.** Marking a 400-person company down on a score claiming to measure *their AI readiness* is indefensible to them. Q1 and Q2 are Layer C only.
2. **The archetype never overclaims.** Gates demote, never promote (§4.3).
3. **The CTA is decoupled from the archetype.** Qualification runs entirely on Layer C. An Architect with no pain gets no CTA; a Spectator who clears every gate does.
4. **Layer C reuses existing decision vocabulary.** ACCEPT / HOLD / REJECT, already defined in `AI Workflow ROI Diagnostic Qualification Criteria.md`.

### 2.4 Input-type rules

1. **Every question a gate references must be single-select.** Gates test for *specific answers*; multi-select makes "is Q5 the top answer?" unanswerable. Gate-referenced: **Q1, Q3, Q4, Q5, Q8, Q10, Q11a, Q13.**
2. **Multi-select scoring is `Σ(selected) ÷ Σ(all options)`.** A checkbox question's weight equals the sum of all its options, so option values must sum to exactly the intended budget, and per-option severity must stay flat.
3. **Never use `max selections`** — undocumented denominator behaviour would depress every score by a constant.
4. **Never put jump logic on a scored question** — skipping changes total points available. The one jump (Q7 → Q7b) targets an unscored Open Text question.

---

## 3. The Question Set

**14 scored questions + 1 conditional unscored question + contact form.**

Point columns: **A** = AI Readiness, **B** = Workflow Opportunity, **C** = Diagnostic Fit. A dash means the question does not feed that layer.

### Phase 1 — About You

#### Q1 · Role
*"What's your role at your company?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| Owner / Founder / CEO | — | — | 15 |
| C-Suite (COO, CTO, CIO, CFO…) | — | — | 14 |
| VP | — | — | 13 |
| Director / Head of Department | — | — | 9 |
| Manager | — | — | 5 |
| Individual Contributor | — | — | **0 · HG2** |

> Function ("Operations / Technology / Transformation leader") was removed from this list in v2. It is a *function*, not a seniority level, so the list was not a partition — "VP of Operations" matched two rows and scored differently depending on which the respondent picked, feeding noise straight into qualification. Function is now captured on the contact form.

#### Q2 · Company Size
*"About how many employees does your company have?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| Under 25 | — | — | 1 |
| 25–50 | — | — | 4 |
| 51–100 | — | — | 8 |
| 101–200 | — | — | 8 |
| 201–300 | — | — | 5 |
| 301–500 | — | — | 3 |
| Over 500 | — | — | 2 |

Also triggers the company-size threshold modifier (§6.6) and flag SF1 when Under 25 or Over 500.

### Phase 2 — Your AI Story

*These four questions are Layer A in full.*

#### Q3 · AI Adoption Breadth
*"Which best describes AI adoption across your company right now?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| A few people are experimenting on their own | 4 | — | 2 |
| We use AI across teams, but each team does it differently — no shared approach | 11 | — | **6** |
| Most of our team uses AI as part of how they work | 18 | — | 4 |
| AI is woven into our operations — it's infrastructure, not just a tool | 25 | — | 2 |

#### Q4 · Leadership AI Strategy
*"Where does your leadership stand on AI?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| No formal strategy yet — mostly individual decisions | 3 | — | 0 |
| We're starting to discuss it at a leadership level | 10 | — | 4 |
| We have an AI plan and we're actively working on it | 18 | — | 7 |
| AI is a top strategic priority with full executive buy-in | 25 | — | 8 |

#### Q5 · Current AI ROI
*"Honestly — is AI actually moving the needle at your company?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| We're not really using it yet | 1 | — | 1 |
| We're using AI tools but haven't seen clear business impact | 8 | — | **6** |
| We see productivity gains, but nothing that's changed the company overall | 16 | — | 5 |
| Yes — we can point to real, measurable business results | 25 | — | 2 |

> Top answer scores **25 to the respondent and 2 to us**. This single row is the clearest justification for the whole architecture.

#### Q6 · AI Ownership · new in v2
*"Who's accountable for AI at your company?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| No one specifically — it's whoever's interested | 3 | — | 1 |
| A few informal champions, but it isn't anyone's actual job | 9 | — | 4 |
| Someone owns it as part of a wider role | 17 | — | **7** |
| We have a dedicated owner or team accountable for AI outcomes | 25 | — | 6 |

> Added because the ICP names "no clear owner accountable for converting AI experimentation into measurable workflow ROI" as *the* defining symptom of the immaturity we target, and nothing in v1 detected it. Note the inversion at the top of column C: a part-time owner is a champion who needs help; a dedicated AI team may be the capability that removes the need for us.

### Phase 3 — Your Biggest Opportunity

*Every question in this phase describes **one** workflow — the one named in Q7.*

#### Q7 · Workflow Category
*"Think about one workflow that consistently costs more time, effort, or money than it should. Which category fits best?"* — Single choice, required — **UNSCORED**

Reporting & data aggregation · Document creation & review · Client or customer communications · Research & analysis · Approval & review processes · Employee or client onboarding · Sales operations & CRM · Other — something else

**Job:** selects the insight paragraph (§7.4) and sets the FAEO Repeatability signal. In v1 this scored 8–10 for named categories and **0** for "Other," so choosing the honest answer silently tanked the score. Now unscored.

#### Q7b · Workflow Description
*"In a sentence, what is it?"* — Open Text, **optional**, shown by jump logic **only when Q7 = Other** — unscored

Safe to attach jump logic here precisely because it is unscored.

#### Q8 · People Involved
*"How many people on your team touch this workflow?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| Just me | — | 2 | 1 |
| 2–5 people | — | 7 | 2 |
| 6–15 people | — | 12 | 4 |
| 16 or more people | — | 15 | 5 |

> **Now monotonic.** v1 scored 16+ *below* 6–15. More people on a repetitive workflow means more economic leverage; the implementation complexity that motivated the original penalty is now flag SF3.

#### Q9 · Frequency
*"How often does this workflow run?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| Multiple times per day | — | 15 | 5 |
| Daily | — | 13 | 4 |
| Weekly | — | 10 | 3 |
| Monthly | — | 5 | 2 |
| Quarterly | — | 1 | 0 |

#### Q10 · Hours Per Week
*"How many hours per week does your team collectively spend on this workflow?"* — Single choice, required — **heaviest question in the quiz**

| Answer | A | B | C | Annual hrs | Cost range |
|---|---|---|---|---|---|
| Less than 5 hours | — | 4 | 1 | 150+ | $7,500–$11,000 |
| 5–10 hours | — | 13 | 5 | 375+ | $19,000–$28,000 |
| 11–20 hours | — | 22 | 8 | 750+ | $38,000–$56,000 |
| 21–40 hours | — | 29 | 10 | 1,500+ | $75,000–$113,000 |
| More than 40 hours | — | 35 | 12 | 2,250+ | $113,000–$169,000 |

Cost = hours midpoint × 50 weeks × $50–$75/hr blended knowledge-worker rate.

> ⚠️ **Screening estimates of labor cost — never present as recoverable savings.** The Diagnostic converts this into a defensible model: annual hours × loaded rate × automatable percentage + error/rework cost + capacity value − implementation and operating cost.

#### Q11a · Automation Level
*"Which best describes how this workflow runs today?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| Entirely manual — spreadsheets, email, or paper | — | 15 | 4 |
| We have tools for it, but they don't talk to each other | — | 13 | 3 |
| Partly automated, but it still takes significant hands-on work | — | 11 | 3 |
| It runs smoothly — I'm mostly here to explore what's possible | — | 1 | **0 · HG3** |

#### Q11b · Symptoms · MULTI-SELECT
*"Which of these also apply? Select all that apply."* — Multi-select, required

| Answer | A | B | C | Flag |
|---|---|---|---|---|
| It depends on one or two people — if they're out, it stalls | — | 2 | 1 | |
| It's complex, with a lot of steps or handoffs | — | 2 | 1 | |
| Work sits waiting for someone to review or approve it | — | 2 | 1 | SF10 |
| Mistakes slip through and get caught later | — | 2 | 1 | |
| The same information gets entered or copied more than once | — | 2 | 1 | SF9 |
| None of these | — | 0 | 0 | |

**Bounding proof:** Σ(all options) = 5 × 2 = 10 = the Layer B budget, so the question is exactly bounded and its weight inside Layer B is exactly 10. Scores 0 / 2 / 4 / 6 / 8 / 10 by symptom count.

> **Why Q11 splits.** v1's single list mixed mutually-exclusive automation states with co-occurring failure modes — "entirely manual" and "partly automated" cannot both be true, yet "depends on one person" and "complex" routinely are. Splitting by dimension fixes the contradiction and unlocks the symptom detail: each symptom names a *different* automation lever, so the founders enter the call with a mechanism hypothesis rather than a category. **Combined budget is 25 — identical to v1. The split is weight-neutral.**
>
> Per-option severity is deliberately flat. Differentiating it would raise Σ and silently increase the question's weight. **"None of these" is worth 0**, so a stray selection alongside symptoms cannot move the score — which matters because ScoreApp has no exclusive-option behaviour.

#### Q12 · Primary Cost
*"What does this workflow cost your company most?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| Money — the labor cost is significant | — | 10 | 4 |
| Scale — we can't grow without adding headcount | — | 10 | 4 |
| Errors — mistakes happen and they're expensive | — | 9 | 3 |
| Time — it creates constant bottlenecks | — | 9 | 3 |
| Customer experience — slow or inconsistent handling costs us business | — | 9 | 3 |
| Team morale — it's tedious and people hate it | — | 7 | 2 |

Stays single-select: "costs you *most*" is a ranking question whose forced prioritization is itself signal, and it selects which of the 48 insight paragraphs renders.

### Phase 4 — Ready to Move

#### Q13 · Willingness to Act · new in v2
*"If there were a clear business case for improving this workflow with AI or automation, how likely is your company to act on it in the next 6 months?"* — Single choice, required

| Answer | A | B | C |
|---|---|---|---|
| Very likely — this is already a priority | — | — | 15 |
| Likely — if the ROI is compelling | — | — | 11 |
| Possibly — we're exploring | — | — | 5 |
| Unlikely — mostly curious right now | — | — | **0 · HG1** |

> Placed after the respondent has articulated concrete pain, so the commitment question reads as a natural consequence rather than a sales probe. It is the only clean detector for the criteria doc's first automatic-reject condition. **Contributes nothing to either visible score.**

### Phase 5 — Your Results

#### Q14 · Contact Capture
*"Almost done. Where should we send your results?"*
Subtext: *"We'll send your personalized AI Readiness Brief here — your archetype, your score, and a summary of your biggest opportunity."*

**All fields unscored** — ScoreApp lead-form fields cannot carry points.

| Field | Type | Required | Purpose |
|---|---|---|---|
| First name | Text | Yes | |
| Company name | Text | Yes | |
| Email address | Email | Yes | |
| Function — *"Which area do you lead or work in?"* | Dropdown | Yes | Drives SF8 via an Audience on Lead Form Answers |
| Marketing consent | Explicit Consent (Optional) | No | Gates all email sequences |

**Function options:** Operations · Technology / IT / Engineering · Transformation / Strategy / Innovation · Finance · Sales & Marketing · HR & People · Customer Service · Other

Consent is **Optional, not Required**, so a missing tick doesn't cost the lead — results deliver instantly on screen regardless. ScoreApp stores a timestamp plus the exact opt-in wording and passes `opt_in` on every webhook event.

> ⚠️ **No email sequence may fire without `opt_in = true`.**

---

## 4. Layer A — AI Readiness Score → Archetype

### 4.1 Structure

Four maturity axes at 25 points each; the raw total **is** the 0–100 score.

| Axis | Question |
|---|---|
| Breadth — how far usage has spread | Q3 |
| Commitment — whether it can be sponsored | Q4 |
| Proof — whether it has produced anything | Q5 |
| Ownership — whether anyone is accountable | Q6 |

### 4.2 Bands

| Score | Level | Archetype |
|---|---|---|
| 80–100 | 4 | The Architect |
| 55–79 | 3 | The Builder |
| 30–54 | 2 | The Explorer |
| 0–29 | 1 | The Spectator |

### 4.3 Demotion gates

Applied after banding. **Demotion only — never promotion.** Evaluated in order; G3 overrides everything.

| Gate | Condition | Result | Why |
|---|---|---|---|
| **G1** | Architect band AND Q5 ≠ "real, measurable business results" | Cap at Builder | The Architect copy's central claim is "your company can point to real results." Without it the copy is false. |
| **G2** | Builder band or above AND Q4 = "No formal strategy yet" | Cap at Explorer | The Builder copy opens "Leadership is paying attention." |
| **G3** | Q3 = "a few people experimenting" AND Q5 = "not really using it yet" | Force Spectator | That answer pair is the literal Spectator definition. |

**Why demotion-only.** Overclaiming is the worse failure. Telling a company they're an Architect when they can't point to results discredits the entire assessment the moment they discuss it internally — which is the explicit design goal of the results page. Under-claiming leaves the copy accurate.

**Worked example.** Leadership says AI is a top strategic priority (25), there's a dedicated owner (25), but Q3 = "a few people experimenting" (4) and Q5 = "not really using it yet" (1). Raw score 55 → provisional **Builder**. G3 fires → **Spectator**, and the copy fits precisely: *"You see what's happening. You just haven't stepped onto the field yet."*

That same company scores strongly on Layer C — high intent, real ownership, zero execution. **Low archetype, strong lead.** v1 could not express that combination at all.

### 4.4 Archetype copy

Respondents see only their own. Full versions also in `content/archetypes.md`.

---

#### Level 4 — The Architect
***"AI isn't something your company uses anymore. It's becoming part of how your company is designed."***

You've crossed an important threshold.

AI is not living in a few isolated tools or individual habits. Leadership understands its strategic importance. Adoption is broad. Your company can point to real results, and AI is increasingly embedded into workflows, decisions, and operating processes.

You are not simply adopting technology. You are shaping an organization around new capabilities. That is what makes you an Architect.

Architects think differently from everyone else. They don't ask, *"Where can we add AI?"* They ask, *"If we were designing this workflow today, knowing what AI can do, would we build it this way at all?"* That question changes everything.

At this level the opportunity is no longer finding basic use cases. It is creating systems that compound: workflows that get faster, operating models that become more scalable, people who spend more time on judgment and less on mechanical work, and capabilities that become increasingly difficult for competitors to imitate.

But Architects face their own risk. Success can create complacency. The companies that lead this transition will not be the ones that simply accumulate AI projects — they will be the ones that continually redesign the business around what becomes newly possible. The question isn't whether you're ahead. It's whether you're moving fast enough to stay there.

**Your next move:** Look beyond individual AI wins and ask, *"Where could we redesign an entire end-to-end workflow so dramatically that the old way of working would no longer make sense?"*

---

#### Level 3 — The Builder
***"You're no longer experimenting with AI. You're starting to build the company around it."***

Something important has changed.

Leadership is paying attention. AI is showing up across multiple teams. People are seeing legitimate productivity gains, and the conversation has moved beyond novelty.

The question is no longer *"Can AI help us?"* It's becoming *"How do we turn these wins into something bigger?"* That is Builder territory.

You have raw materials: executive interest, employee adoption, useful experiments, and early evidence that AI can improve how the company operates. Now the hard part begins.

Builders have to connect the pieces. That means deciding which workflows deserve investment, creating consistency where there is fragmentation, redesigning processes instead of layering AI on top of broken ones, and turning scattered productivity gains into measurable company-level results.

This is where many organizations stall, because the excitement of experimentation gives way to the harder work of transformation. It's also the most dangerous place to be comfortable — close enough to transformation that it can feel like you're already there, far enough that you're not yet capturing the compounding returns.

But if you get this stage right, the payoff changes dramatically. You stop collecting AI wins and start building an AI-enabled operating model.

**Your next move:** Find the workflows where AI is already showing promise and ask, *"What would we have to redesign for this to become a repeatable business advantage instead of an isolated success?"*

---

#### Level 2 — The Explorer
***"You've left the sidelines. Now you're finding out what's actually possible."***

AI is already showing up inside your company.

A few people have found tools they love. Someone has built a clever workflow. One team may be saving hours every week while another is barely touching AI at all. There are experiments, wins, frustrations, and probably a growing list of ideas.

That's exactly what exploration looks like. You are learning through action instead of theory, which puts you ahead of companies still only talking about AI.

But exploration has a trap. It can feel like progress even when the company itself hasn't changed.

If every useful AI workflow lives inside one employee's personal process, every team chooses its own tools, and nobody is connecting the wins to a larger strategy, you can end up with a company full of interesting experiments and very little transformation.

The AI landscape is moving at a pace unlike anything before it, and the window to move from isolated experiments to coordinated advantage is narrower than most leaders realize. Explorers eventually have to decide which discoveries are worth turning into roads.

That's the shift in front of you now.

**Your next move:** Identify the experiments that are producing real value, then ask, *"What would happen if this stopped being one person's clever trick and became the way this workflow worked across the business?"*

---

#### Level 1 — The Spectator
***"You see what's happening. You just haven't stepped onto the field yet."***

AI is on your radar. People around your company are talking about it, experimenting with it, and probably sending each other examples of what it can do. You may even have a few employees using AI regularly.

But as an organization, you're still mostly watching.

AI hasn't meaningfully changed how work gets done. It hasn't become part of your operating rhythm. There may be curiosity, but not yet a coordinated move. That's what makes this stage deceptively comfortable.

Spectators often know enough to recognize that something important is happening, but not enough has changed internally to create urgency. The danger is assuming that watching closely is the same thing as preparing.

It isn't.

The good news is that you are not late simply because you are early in your journey. You still have the opportunity to move deliberately instead of reactively. The companies that make the smartest moves from here won't be the ones that chase every new AI tool. They'll be the ones that choose the right business problems, experiment with purpose, and start building evidence about where AI actually creates value.

**Your next move:** Stop asking, *"Should we be doing more with AI?"* Start asking, *"Where could AI change the economics of how we work?"*

---

## 5. Layer B — Workflow Opportunity Score

### 5.1 Weights

| Question | Max | Rationale |
|---|---|---|
| Q10 hours/week | 35 | The economic core. Already aggregates people × frequency ("collectively spend"). |
| Q11a automation level | 15 | Automation headroom — the multiplier on everything else. |
| Q11b symptoms | 10 | Bounded additive; each symptom is a separate lever. |
| Q8 people involved | 15 | Coordination leverage beyond raw hours. |
| Q9 frequency | 15 | Cadence — determines return on a build. |
| Q12 primary cost | 10 | Value *type*, not amount. Compressed to avoid false precision. |
| Q7 workflow category | **0** | Unscored. |
| **Total** | **100** | |

### 5.2 Tiers

| Score | Tier |
|---|---|
| 80–100 | Substantial |
| 60–79 | Significant |
| 35–59 | Meaningful |
| 0–34 | Contained |

---

## 6. Layer C — Diagnostic Fit Score

Never rendered on any result page, never sent to the respondent.

### 6.1 Pillars

| Pillar | Max | Criteria-doc requirement |
|---|---|---|
| 1 — Economic Pain | 35 | "Meaningful workflow" + "Potential economic value" |
| 2 — Readiness to Act | 30 | "AI interest/readiness" + actionability |
| 3 — Company & Maturity Fit | 20 | "Company fit" |
| 4 — Access & Authority | 15 | "Decision access" |

**Pillar 1 (35):** Q10 (12) · Q11a (4) · Q11b (5, one per symptom) · Q8 (5) · Q9 (5) · Q12 (4)
**Pillar 2 (30):** Q13 (15) · Q4 (8) · Q6 (7)
**Pillar 3 (20):** Q2 (8) · Q3 (6, inverted-U) · Q5 (6, inverted-U)
**Pillar 4 (15):** Q1 (15)

Per-answer values are in §3.

### 6.2 The inverted-U, side by side

This is where Layer C stops being a re-weighting of Layer A and becomes a different instrument:

| Q3 answer | Layer A | Layer C |
|---|---|---|
| A few people experimenting on their own | 4 | 2 |
| **Across teams, each differently — no shared approach** | 11 | **6 ← max** |
| Most of our team uses AI | 18 | 4 |
| Woven into operations — infrastructure | 25 | 2 |

| Q5 answer | Layer A | Layer C |
|---|---|---|
| Not really using it yet | 1 | 1 |
| **Using AI tools but no clear business impact** | 8 | **6 ← max** |
| Productivity gains, nothing company-wide | 16 | 5 |
| Real, measurable business results | 25 | 2 |

### 6.3 Hard gates

Any one firing forces REJECT and suppresses the CTA regardless of score. Each traces to a line in `AI Workflow ROI Diagnostic Qualification Criteria.md`.

| ID | Condition | Criteria-doc line |
|---|---|---|
| **HG1** | Q13 = "Unlikely — mostly curious right now" | "Primarily wants general AI education, brainstorming, or free consulting without a specific workflow problem" |
| **HG2** | Q1 = "Individual Contributor" | "No meaningful access to the workflow owner or buying process and cannot make an introduction" |
| **HG3** | Q11a = "It runs smoothly — I'm mostly here to explore" | "No identifiable operational pain or meaningful cost" |
| **HG4** | Q10 = "Less than 5 hours" **AND** Q8 = "Just me" | "Too trivial to support an economically rational engagement" |
| **HG5** | Q3 = "a few experimenting" **AND** Q4 = "No formal strategy" **AND** Q5 = "not really using it yet" | "Fundamentally resistant to AI… would first require us to sell the category itself" |

HG5 is deliberately narrower than Layer A's G3. **A Spectator who clears HG5 — leadership engaged, real pain, willing to act — does receive the CTA.**

### 6.4 Soft flags

CTA still shows; the internal brief carries the note.

| ID | Condition | Note |
|---|---|---|
| SF1 | Q2 ∈ {Under 25, 301–500, Over 500} | Outside ICP size band — confirm the economics justify an exception |
| SF2 | Q1 ∈ {Manager, Director} | Map the buying committee early |
| SF3 | Q8 = "16 or more people" | Delivery complexity — probe scope containment |
| SF4 | Architect AND Q5 = "measurable results" | May already have internal capability — probe what's actually missing |
| SF5 | Q13 = "Possibly — we're exploring" | Timing unconfirmed — establish the trigger event |
| SF6 | Q7 = "Other" | Outside known taxonomy — see Q7b |
| SF7 | Q4 = "No formal strategy yet" | No executive sponsor identified |
| SF8 | Function ∈ {Ops, Tech, Transformation} AND Q1 ≥ Director | **★ Priority signal, not a caveat** — ideal champion per ICP §6 |
| SF9 | Q11b includes "same information entered or copied more than once" | Direct integration opportunity |
| SF10 | Q11b includes "work sits waiting for review or approval" | Routing / approval-flow opportunity |

### 6.5 Decision tiers

| Condition | Decision | CTA | Action |
|---|---|---|---|
| Any hard gate fires | **REJECT / NOT NOW** | No | Nurture sequence |
| Score ≥ 65, no gates | **ACCEPT** | Yes | Priority outreach; rank by score |
| Score 45–64, no gates | **HOLD / QUALIFY ON CALL** | Yes | Brief names the weak pillar |
| Score < 45, no gates | **REJECT / NOT NOW** | No | Nurture sequence |

Calibrated for balanced strictness at 7+ calls/week capacity, where volume rather than capacity is the binding constraint.

### 6.6 Company-size threshold modifier

The ICP states that companies outside 50–250 employees "are exceptions, not the default. Consider them only when the workflow economics, buyer access, urgency, and delivery fit are unusually strong."

**If Q2 ∈ {Under 25, Over 500}, both thresholds rise by 15: HOLD becomes 60, ACCEPT becomes 80.**

A stricter bar rather than a hard gate — which is exactly what "exception, not default" means. It works in both directions:

| Profile | Layer C | Standard bar | Raised bar | Outcome |
|---|---|---|---|---|
| AI-curious sub-25 company, owner-CEO, modest workflow | 49 | HOLD → CTA | below 60 | **REJECT** ✓ |
| Dept head in 500+ enterprise, severe pain | 81 | ACCEPT | clears 80 | **ACCEPT** ✓ |

The small-company case is instructive: 15 of its 49 points come from Q1 = Owner/CEO. Perfect decision access over a workflow too small to matter is not a qualified opportunity.

### 6.7 FAEO pre-population

Layer C pre-fills 5 of the 9 criteria in the FAEO Scorecard on its 1–5 scale, so the internal brief arrives as a partial scorecard.

| Criterion | From | Mapping |
|---|---|---|
| Pain | Layer B | 0–19→1, 20–39→2, 40–59→3, 60–79→4, 80–100→5 |
| Urgency | Q13 | Unlikely→1, Possibly→2, Likely→4, Very likely→5 |
| Access | Q1 | IC→1, Manager→2, Director→3, C-Suite/VP→4, Owner→5 |
| AI Readiness | Layer A | HG5→1, Spectator→2, Explorer→3, Builder→4, Architect→5 |
| Repeatability | Q7 | Named category→4, Other→2 |

**Not derivable — leave blank:** Budget, Uzziah + Arielle Fit, Delivery Simplicity, Proof Speed. Per the FAEO doc, **blanks are not 5s.**

---

## 7. The Results Page

### 7.1 Routing

```
14 answers
    │
    ├─► Layer A ──► band ──► gates G1-G3 ──► ARCHETYPE ──► result page (1 of 4)
    │
    ├─► Layer B ─────────────────────────► OPPORTUNITY SCORE + tier + $ estimate
    │
    └─► Layer C ──► hard gates HG1-HG5
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

**Two independent axes.** Which page you land on is Layer A. Whether the CTA is visible on it is Layer C. All sixteen combinations are reachable.

### 7.2 Score display

Archetype and AI Readiness Score are the hero. Opportunity Score is secondary, paired with the dollar estimate. This preserves identity-discovery framing rather than making the page a two-number dashboard.

**Suppress** the default "Thank you for taking the AI Readiness Assessment" headline — the archetype reveal makes reintroducing the quiz name feel like a reset. Move the email delivery notice *below* the score card.

### 7.3 The Positioning Statement

Shown beneath both scores. The line designed to travel — what they screenshot and send to leadership.

| | Opportunity low (0–59) | Opportunity high (60–100) |
|---|---|---|
| **Readiness high (55–100)** | "You're in good shape. This particular workflow isn't your biggest lever — the next question worth asking is where your real constraint actually sits." | "You're positioned to move on this now. You have the organizational readiness *and* a workflow worth the effort. That combination is rarer than it sounds." |
| **Readiness low (0–54)** | "Start small. Neither your AI foundation nor this particular workflow is the urgent thing — which means you get to choose your first move deliberately rather than reactively." | "There's a real prize here — and a foundation to build first. Companies in this position often get the most value from fixing one workflow well and letting that become the proof that funds everything after it." |

The bottom-right cell matters most: a large opportunity in a company not yet organized to capture it. Say so honestly rather than implying readiness they don't have.

### 7.4 Personalized insight paragraphs

**8 workflow categories × 6 pain types = 48 variants.** Triggered by Q7 + Q12. Full copy in `content/results-copy.md` §Layer 3 — the only content not reproduced in this document.

If ScoreApp supports only single-question conditional copy, use Q7 as the trigger and the "Time (bottlenecks)" variant as each category's default.

### 7.5 Benchmarks

- **Static, all respondents:** knowledge workers spend ~23% of the workweek on partially or fully automatable tasks (McKinsey Global Institute, 2021). **Verify before launch** and update the citation if a newer figure exists.
- **Dynamic, by Q10:** annual hours and cost range from the table in §3.

### 7.6 CTA copy

**Primary — all respondents.** "Get your AI Readiness Brief" → "Send my Brief"

**Secondary — Layer C = ACCEPT or HOLD only.** Same Calendly link, two framings:

| Archetype | Body |
|---|---|
| Builder, Architect | "Talk through your results with our team. We'll examine the workflow you identified from both the business and technical sides and determine whether there's a practical opportunity worth pursuing — and roughly what it's worth." |
| Spectator, Explorer | "You don't need an AI strategy to have this conversation — you need one workflow worth examining, and you've just described one. We'll look at it from both the business and technical sides and tell you honestly whether it's the right place to start." |

**Not-qualified note — Layer C = REJECT.** Four variants keyed to which gate fired (HG3/HG4 workflow is fine · HG1 not ready · HG5 early stage · HG2 access). Full copy in `content/results-copy.md`.

> **Principle across all four:** never imply the respondent failed. They completed an honest assessment and got an honest answer. Every variant gives them something to do and a reason to keep the page.

---

## 8. The Internal Brief

Sent to Uzziah + Arielle **30 minutes after submission**. Full template in `content/internal-brief-template.md`.

**Subject line leads with the Layer C decision, not the respondent-facing score:**

```
[ACCEPT 89 · Builder] Sarah M. at Clearwater Consulting
[HOLD 52 · Explorer] Dana R. at Apex Group
[REJECT — HG3 · Architect] Marcus L. at Vantage Systems
```

High readiness plus REJECT is now a common combination, so the subject line has to make it unmissable. v1's `score >= 76 → 🔥 HOT LEAD` rule fired on the blended score and would have flagged mature companies with no workflow pain as hot leads.

**Contents:** decision block · respondent + consent status · all three scores · Layer C pillar breakdown · demotion-gate explanations · all fired flags · AI readiness signals (with the inverted-U reading note) · workflow detail including Q11b symptoms · cost estimate · conditional talking points · FAEO pre-fill · calendar and consent status.

> ⚠️ **Rendering dependency.** The template is built on conditional blocks, and ScoreApp documents Dynamic Content for result pages and PDFs but **never for emails**.
> - **Phase 1 (native):** flat notification with all answers, all three scores, the Layer C tier. Talking points read from a static reference.
> - **Phase 2 (webhook):** full conditional rendering. **This is what makes the internal side genuinely useful.**

---

## 9. Email Sequences

Full copy in `content/follow-up-sequences.md`.

> ⚠️ **No sequence fires without `opt_in = true`.** Respondents who don't opt in get their on-screen results and nothing else; any outreach must be individual and manual.

| Layer C | Seq 1 Brief | Seq 1 booking block | Seq 2 Non-booker (day 5) | Seq 3 Nurture (day 14) |
|---|---|---|---|---|
| ACCEPT | Yes | Yes | Yes | No |
| HOLD | Yes | Yes | Yes | No |
| REJECT | Yes | **No** | **No** | Yes — variant by gate |
| `opt_in = false` | **No** | — | **No** | **No** |

**Sequence 3 has four gate-specific variants** (3a workflow is fine · 3b not ready · 3c early stage · 3d access). They must not collapse into one generic email — "your workflow is fine," "you're not ready," and "you can't reach the buyer" are three different conversations, and a generic message gets all three wrong.

---

## 10. ScoreApp Build

**Plan: Business ($99/mo)** — Audiences, multiple result pages, section-level conditional visibility, integration tags, and external redirects all require this tier.

### 10.1 Categories

| Category | Contents | Counts toward total? |
|---|---|---|
| AI Readiness | Layer A values | **Yes** — total score = Layer A |
| Workflow Opportunity | Layer B values | No (`scoring_logic: none`) |
| Diagnostic Fit | Layer C values | No (`scoring_logic: none`, `type: hidden`) |

One answer awards **different point values to different categories** — confirmed supported. Q4 carries 25 in AI Readiness and 8 in Diagnostic Fit on the same option.

### 10.2 Archetype audiences — priority-ordered, first match wins

| # | Audience | Conditions |
|---|---|---|
| 1 | Architect | AI Readiness % ≥ 80 AND Q5 is "real, measurable business results" |
| 2 | Builder | AI Readiness % ≥ 55 AND Q4 is not "No formal strategy yet" AND (Q3 is not "a few experimenting" OR Q5 is not "not really using it yet") |
| 3 | Explorer | AI Readiness % ≥ 30 AND (Q3 is not "a few experimenting" OR Q5 is not "not really using it yet") |
| 4 | Spectator | *(default — all remaining)* |

G1 is the Architect rule's second condition; G2 the Builder rule's second; G3 the De Morgan expansion in rules 2 and 3.

**Not using "Outcome / highest category" routing.** These archetypes are ordinal *levels*, not parallel personality types. Highest-category matching would be conceptually wrong and would inherit ScoreApp's arbitrary tie-breaking (ties resolve to whichever category sits higher in the list).

### 10.3 CTA audience

```
Diagnostic Fit % ≥ 45
  AND Q13  is not "Unlikely — mostly curious right now"           (HG1)
  AND Q1   is not "Individual Contributor"                         (HG2)
  AND Q11a is not "It runs smoothly — I'm mostly here to explore"  (HG3)
  AND (Q10 is not "Less than 5 hours" OR Q8 is not "Just me")      (HG4)
  AND (Q3 is not "a few experimenting"
       OR Q4 is not "No formal strategy yet"
       OR Q5 is not "not really using it yet")                     (HG5)
```

Second audience **Diagnostic Priority** (`≥ 65` + same gates) drives ranking and the CRM tag.

### 10.4 Phasing

**Phase 1 — native.** Layers A and B in full. Archetype routing with all three gates. Layer C as a hidden additive category with as many hard gates as Audience logic supports. Flat internal notification.

**Phase 2 — webhook.** `QUIZ_FINISHED` → Make/Zapier. Layer C recomputed with exact logic; rich internal brief rendered; FAEO pre-fill; CRM write.

Two payload facts shape phase 2:
- **No per-question scores** — only `total_score` and `category_scores` aggregates. Layer C is re-derived from answer *text*, which makes the automation the single source of truth for gate logic.
- **Multi-select arrives as an array of objects**, not bare strings: `"answers": [{"answer": "..."}, {"answer": "..."}]`.

### 10.5 Verified platform facts

| Fact | Status |
|---|---|
| One answer can award different points to different categories | **Confirmed** |
| A category can be excluded from the total score | **Confirmed** (`scoring_logic: none`, `type: hidden`) |
| Audiences support AND/OR across answers, category subscores, and total | **Confirmed** |
| Multi-select scores `Σ(selected) ÷ Σ(all options)`; no cap setting | **Confirmed** |
| Native GDPR consent with timestamp + wording, passed as `opt_in` | **Confirmed** |
| Jump logic cannot branch per-answer on a multi-select | **Confirmed** |
| A public Open API exists (the only place `score_potential` is exposed) | **Confirmed** |

> A note dated 2026-08-19 concluded ScoreApp could only branch result pages on the overall score, and the live build was collapsed to a single dimension as a result. **That was wrong** — "Outcome" means highest-scoring *category*, and Audiences do far more. The correction is what makes this architecture possible.

### 10.6 Still to verify in the account UI

| # | Question | Priority |
|---|---|---|
| 1 | Confirm the multi-select denominator empirically — 6-option checkbox at 2 pts, tick one, expect 20% | **First** |
| 2 | Does an "Other" option with free text exist? (Q7b is the fallback and works regardless) | High |
| 3 | Audience condition nesting — is an AND of OR-groups expressible? Blocks HG4/HG5 | High |
| 4 | Can a result-page section be *hidden by* audience, or only *shown to* it? | Medium |
| 5 | Does an optional scored question left blank leave the denominator? (Mitigated: all scored questions required) | Medium |
| 6 | Merge-tag inventory in notification emails | Medium |
| 7 | Which plan tier enables webhooks | Low |

---

## 11. Validation

Five profiles from the question review, re-derived against this model.

| Mock company | Expected | This model | Correct in v1? |
|---|---|---|---|
| AI-curious sub-25 company, modest workflow, owner-CEO | Spectator, no Diagnostic | Spectator. Layer C **49**; size modifier raises bar to 60 → **REJECT** | ✓ |
| 100-person, fragmented adoption, $100K/yr burden, Ops leader | Prime candidate | Explorer/Builder. Layer B 83, Layer C **89** → **ACCEPT**, top of ranking | ✗ under-ranked |
| AI-mature, measurable ROI, no workflow pain | Not a hot lead | Architect. Layer B 27, Layer C 59 — **HG3 fires** → **REJECT**. SF4 would flag regardless | ✗ flagged "🔥 HOT LEAD" |
| Dept head in 500+ enterprise, severe pain | Intentional exception | Layer C **81**, clears raised 80 bar → **ACCEPT**. SF1 + SF2 + SF3 | ✗ unhandled |
| Strong economics, no leadership support, Director | Acknowledge opportunity, soft CTA | Explorer (G2). Layer B high, Layer C **75** → **ACCEPT** with SF7 + SF2 | ✗ |

**Three of five were mis-routed by v1.**

**One row deserves scrutiny.** The last reaches ACCEPT at 75 rather than HOLD, because strong workflow economics (31/35) and maturity fit (20/20) outweigh a zero on leadership. The review asked for a softer CTA here. Two defences: the criteria doc's minimum bar is "already using, piloting, budgeting for, or actively exploring" — no formal strategy is not the same as resistant — and SF7 puts the missing sponsor in front of the founders before the call. **If founder time gets scarcer, raising Q4's Pillar 2 weight is the first dial to turn.**

**Before launch:** expand to 15 profiles per the question review's recommendation, and answer the quiz as each company would. If an archetype doesn't feel obviously correct to a human reading the answers, move the bands.

---

## 12. Calibration

Every threshold in §4.2, §5.2, §6.5 and §6.6 is a **tuning dial, not a finding**. Pre-launch they are set by judgement against §11. Recalibrate after the first ~50 submissions:

- More than ~60% qualifying → the ACCEPT threshold is too low.
- Archetype distribution heavily skewed to one level → move the Layer A bands.
- Diagnostic calls repeatedly surfacing a disqualifier the quiz missed → that disqualifier needs a question or a gate.
- **Watch the no-executive-sponsor profile specifically.** It reaches ACCEPT on workflow economics alone. If those calls consistently stall on the absence of a sponsor, increase Q4's weight in Pillar 2 or require Q4 ≠ "No formal strategy yet" for ACCEPT.

### Deliberately out of scope

- **Technical feasibility signals** (data access, systems, security). Valuable, but a business leader can't answer them reliably in a quiz, and they're core Diagnostic material.
- **Budget signal.** Asking about money inside a free assessment damages the identity-discovery framing. Stays a call question and a blank in the FAEO pre-fill.
- **Multi-select on Q12.** Richer data, materially more complex weighting, and it would break the 48-variant copy matrix.

---

## 13. Change Log

### v2.0 — 2026-08-21

**Architecture**
- Split one blended score into three layers. v1 mixed company fit, AI maturity, and workflow economics in a single number driving the score, the archetype, *and* the CTA.
- Archetype now driven by Layer A with demotion gates, not by the blended score.
- CTA now driven entirely by Layer C, decoupled from archetype.
- Q1 and Q2 removed from all visible scoring.

**Questions** — 11 scored → 14 scored
- Added Q6 (AI ownership) and Q13 (willingness to act).
- Split v1's Q10 into Q11a (single-select automation level) + Q11b (multi-select symptoms). Weight-neutral.
- Q1 function option moved to the contact form; consent checkbox added.
- Q7 made unscored; Q8 made monotonic; Q12 gained "Customer experience" and had its spread compressed.

**Copy**
- Archetypes renamed Observer / Tinkerer / Catalyst / Architect → **Spectator / Explorer / Builder / Architect**.
- Stage labels retired — the archetype plus two tier labels already do that work.
- 40 → 48 insight variants.
- Added the Positioning Statement 2×2.
- Four gate-specific not-qualified variants replace the single "AI Observer Note."
- Four gate-specific nurture emails replace one generic nurture email.

**Corrected from v1**
- The 2026-08-19 platform finding was wrong (§10.5).
- Q7 "Other" scored 0 while named categories scored 8–10 — choosing the honest answer tanked the score.
- Q8 scored 16+ people below 6–15.
- `score >= 76 → 🔥 HOT LEAD` fired on the blended score and would flag mature, pain-free companies as hot leads.
