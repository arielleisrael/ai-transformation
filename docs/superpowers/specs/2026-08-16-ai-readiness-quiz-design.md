# AI Readiness Quiz — Design Spec

**Date:** 2026-08-16
**Status:** Approved for implementation
**Supersedes:** `2026-08-13-workflow-audit-lead-magnet-design.md`
**Offering:** AI Workflow ROI Diagnostic → paid implementation engagement ($10,000–$20,000)
**ICP:** Knowledge worker businesses, 50–250 employees

---

## 1. Overview

A B2B lead magnet quiz framed as an **AI Readiness Assessment**. Respondents answer 12 questions across four phases — who they are, their AI story, their biggest workflow challenge, and contact capture. They receive two results immediately: an **AI Readiness Archetype** (their identity on the AI readiness journey) and an **AI Opportunity Score** (0–100, reflecting the overall size of their transformation opportunity). The internal team receives a delayed brief with archetype, score, workflow data, and suggested talking points.

**Core principle:** The quiz feels like a self-discovery tool. The prospect is finding out who they are and where their company stands — not filling out a screener. The word "qualify" never appears. Qualification happens invisibly through a dual scoring system. The archetype result is designed to be shareable with a team, with leadership, and on LinkedIn.

**What this must accomplish:**
1. Give the prospect a memorable identity (archetype) that resonates and that they want to share
2. Show them a score that signals how big their transformation opportunity is
3. Surface a specific workflow challenge that anchors the diagnostic conversation
4. Route qualified prospects to the Calendly booking without any manual screening by Uzziah or Arielle
5. Generate an internal brief with enough context to enter the Diagnostic with a real hypothesis

**The two results work together:**
- The archetype tells the prospect *who they are* on the AI readiness journey
- The score tells them *how big the opportunity* in front of them is
- Together, they create the message: "Here's where you are — and here's what's waiting for you on the other side"

---

## 2. Platform

**ScoreApp** (~$49–99/month)

Chosen for: native scoring engine, instant results pages, email capture, Calendly embed support, delayed internal notifications, score-conditional email sequences, and no custom code required.

**Critical platform verification required before build:**
- [ ] Confirm ScoreApp supports subscore tracking (Q3+Q4+Q5 separately from overall score) for archetype assignment
- [ ] Confirm plan tier supports delayed internal notifications
- [ ] Confirm email pre-fill on results page CTA from Q12 contact fields
- [ ] Confirm score-conditional email routing for the Observer nurture sequence

If ScoreApp does not support subscore tracking, use the fallback scoring weights documented in Section 5.

---

## 3. Quiz Identity

| Field | Value |
|---|---|
| Name | The AI Readiness Assessment |
| Subtitle | "Discover where your company stands on the AI readiness journey — and what's possible from here." |
| Primary CTA text | "Find out your AI Readiness Archetype" |
| Estimated completion time | 4–5 minutes |
| Number of questions | 12 |
| Narrative frame | Identity discovery — not an audit or screener |
| Primary result | AI Readiness Archetype (identity label + full description) |
| Secondary result | AI Opportunity Score (0–100) with stage label |

---

## 4. The Four Archetypes

Archetypes are assigned based on the AI Readiness Subscore (Q3 + Q4 + Q5). Each archetype has a name, a tagline, a full description, and a "next level" statement. The full descriptions are maintained in the AI Readiness Archetypes reference document.

Archetypes are ordered highest to lowest here for reference. Respondents see only their own archetype on the results page.

---

### Level 4 — The AI Architect
**Tagline:** *"You're not using AI — you're building with it."*

You've moved past the question of whether AI matters. It's woven into how your company actually operates — not as a novelty, not as a handful of individual habits, but as infrastructure. Leadership didn't just approve AI adoption; they championed it. And the results are starting to compound: things that used to take days take hours, and your team doesn't ask "should we use AI for this?" They ask "how do we use it best?"

This shows up as broad, coordinated adoption across your organization, an actual strategy with executive buy-in, and a growing track record of AI moving the business needle — not just saving a few hours here and there.

The risk for Architects isn't falling behind. It's not systematizing what's working. The organizations that will define their industries over the next five years are the ones turning AI wins into end-to-end transformation — not just collecting them. You're building something real. The question is whether you're building it fast enough to stay in front.

*Next level:* When AI is so embedded in your operations that it's no longer a competitive advantage. It's just how you work.

---

### Level 3 — The AI Catalyst
**Tagline:** *"The spark is there. What happens next is everything."*

Your leadership team gets it. There's genuine commitment to AI, tools are in use across your organization, and parts of your team are seeing real value. You're not just experimenting anymore — you're investing. The "should we do this?" conversation is behind you. You're in the "how do we do this well?" chapter.

This looks like a company where AI adoption is growing but uneven. Some teams are ahead; others haven't found their footing. There's momentum and real energy around AI — but it hasn't yet crystallized into a coordinated transformation with measurable company-level results. The potential is visible. The path isn't always clear.

This is the most dangerous place to be comfortable. You're close enough to transformation that it can feel like you're already there — but far enough that you're not yet capturing the compounding returns. The companies that linger at this level often watch a competitor make the leap and realize too late how quickly the gap grew.

*Next level:* When your energy and commitment crystallize into a coordinated strategy, and AI starts delivering measurable results at the company level, not just the individual level.

---

### Level 2 — The AI Tinkerer
**Tagline:** *"Your team is discovering what AI can do. Some of it is working. Most of it isn't connected yet."*

You've got early adopters who've made AI tools part of how they work and won't stop talking about how useful it is. You've got others who've tried a few things and moved on. And you've got leadership watching carefully, not yet sure how to turn individual wins into something the whole company benefits from.

This looks like AI living in individual habits, not company infrastructure. It shows up in pockets: one person's ChatGPT workflow, one team's AI writing tool, one manager's automation experiment. The results are real, but they're siloed. The ROI doesn't register at the company level because the wins don't connect to each other.

Tinkering is how every transformation starts — and it's also where most companies stall. The AI revolution is accelerating at a pace unlike anything before it. Companies that stay in tinkering mode while competitors move into coordinated transformation will find the gap widening faster than they expected. Individual experiments are not the same thing as competitive advantage.

*Next level:* When leadership gets behind a coordinated approach and your individual experiments start connecting into something the whole company can feel.

---

### Level 1 — The AI Observer
**Tagline:** *"You're paying attention — but less than you'll need."*

You're watching the AI revolution with genuine curiosity and, honestly, some uncertainty about where your company fits. Some of your team may be using AI tools here and there. Leadership is starting to ask the right questions. You haven't made a coordinated move yet — or the moves you've made haven't added up to a strategy.

This looks like a company where AI comes up in conversations but doesn't show up in workflows. Where people talk about the tools but they haven't changed how the work actually gets done. Where the question isn't "are we using AI effectively?" — it's more like "are we sure we need to be?"

You do. The rate at which AI is reshaping the economics of business isn't going to slow — it's going to compound. The organizations that get deliberate about this in the next 12–18 months will have structural advantages that will be very hard to close later. The good news: starting deliberately always beats starting frantically. But starting matters. And it matters now.

*Next level:* When your team begins making deliberate, coordinated experiments and starts building real data about what AI can do specifically for your business.

**Important:** AI Observers do not receive a Diagnostic CTA on the results page regardless of their overall score. A high score + Observer archetype signals a large opportunity the company isn't yet positioned to capture. The results copy should acknowledge the size of the opportunity while being honest that readiness must come first. These respondents enter the nurture sequence.

---

## 5. Scoring System

### Dimension 1 — AI Readiness Subscore (drives archetype)

Pulled from Q3 + Q4 + Q5 only. Maximum: 45 points.

| AI Readiness Subscore | Archetype Assigned |
|---|---|
| 0–10 | The AI Observer |
| 11–22 | The AI Tinkerer |
| 23–34 | The AI Catalyst |
| 35–45 | The AI Architect |

The three questions check each other. A company that claims "AI is infrastructure" (Q3: 15 pts) but "no leadership strategy" (Q4: 2 pts) and "no business impact" (Q5: 5 pts) scores 22 — correctly landing in Tinkerer, not Architect. Self-inconsistent answers self-correct.

---

### Dimension 2 — Overall AI Opportunity Score (prospect-facing 0–100)

All scored questions combined. ScoreApp normalizes raw points to a 0–100 display score.

| Dimension | Questions | Max Points | Approx. Weight |
|---|---|---|---|
| Company Fit | Q1, Q2 | 30 | ~21% |
| AI Readiness | Q3, Q4, Q5 | 45 | ~31% |
| Workflow Opportunity | Q6–Q11 | 71 | ~49% |
| **Total raw** | | **146** | |

Q12 (contact capture): no points.

**Score stage labels (shown on results page alongside archetype):**

| Score | Stage Label | Internal Priority |
|---|---|---|
| 0–35 | Early Stage | Nurture sequence |
| 36–55 | Growth Stage | Warm lead — follow-up within 48 hrs |
| 56–75 | High Opportunity | Strong lead — outreach within 24 hrs |
| 76–100 | Ready for Transformation | Hot lead — same-day priority outreach |

---

### Qualification Routing (Archetype + Score combined)

Both signals are required. Archetype reflects AI readiness; score reflects opportunity size. Neither alone is sufficient.

| Archetype | Minimum Score for Diagnostic CTA |
|---|---|
| AI Architect (Level 4) | ≥ 40 |
| AI Catalyst (Level 3) | ≥ 45 |
| AI Tinkerer (Level 2) | ≥ 55 |
| AI Observer (Level 1) | Nurture only — no Diagnostic CTA |

---

### Fallback Scoring (if ScoreApp cannot track subscore independently)

Increase Q3, Q4, Q5 to 25 points each. New raw maximum: ~176. Weights shift:

| Dimension | Max Points | Approx. Weight |
|---|---|---|
| Company Fit (Q1, Q2) | 30 | ~17% |
| AI Readiness (Q3, Q4, Q5) | 75 | ~43% |
| Workflow Opportunity (Q6–Q11) | 71 | ~40% |

Use overall score thresholds for archetype assignment in this fallback:

| Score (0–100) | Archetype |
|---|---|
| 0–24 | The AI Observer |
| 25–49 | The AI Tinkerer |
| 50–74 | The AI Catalyst |
| 75–100 | The AI Architect |

Note: This fallback creates tighter coupling between workflow pain and archetype assignment. A company with very high workflow pain but low AI readiness may receive a higher archetype than their actual AI maturity warrants. Use subscore tracking if the platform supports it.

---

## 6. The 12 Questions

### Phase 1: About You

**Q1 — "What's your role at your company?"**
*Drives: Company Fit dimension. Signals decision authority for qualification routing and talking points.*

| Answer | Points |
|---|---|
| Owner / Founder / CEO | 15 |
| C-Suite or VP | 12 |
| Director / Head of Department | 8 |
| Manager | 4 |
| Individual Contributor | 1 |

**Q2 — "How big is your team?"**
*Drives: Company Fit dimension. ICP is 50–250 employees; scores peak at 51–200.*

| Answer | Points |
|---|---|
| Under 25 | 2 |
| 25–50 | 6 |
| 51–100 | 15 |
| 101–200 | 15 |
| 201–500 | 5 |
| Over 500 | 2 |

---

### Phase 2: Your AI Story

*Q3, Q4, Q5 together form the AI Readiness Subscore that drives archetype assignment. These three questions check each other — self-inconsistent answers self-correct toward the accurate archetype.*

**Q3 — "How would you describe AI adoption across your company right now?"**
*Signals breadth of adoption — whether AI is individual, team-level, or organizational.*

| Answer | Points |
|---|---|
| A few people are experimenting on their own | 2 |
| Some teams use AI tools regularly | 8 |
| Most of our team uses AI as part of how they work | 13 |
| AI is woven into our operations — it's infrastructure, not just a tool | 15 |

**Q4 — "Where does your leadership stand on AI?"**
*Signals strategic commitment and executive sponsorship — key qualifier per Diagnostic Qualification Criteria.*

| Answer | Points |
|---|---|
| No formal strategy yet — mostly individual decisions | 2 |
| We're starting to discuss it at a leadership level | 6 |
| We have an AI plan and we're actively working on it | 11 |
| AI is a top strategic priority with full executive buy-in | 15 |

**Q5 — "Honestly — is AI actually moving the needle at your company?"**
*Signals whether current AI use is generating ROI or still in exploration mode.*

| Answer | Points |
|---|---|
| We're not really using it yet | 1 |
| We're using AI tools but haven't seen clear business impact | 5 |
| We see productivity gains, but nothing that's changed the company overall | 10 |
| Yes — we can point to real, measurable business results | 15 |

---

### Phase 3: Your Biggest Opportunity

*These six questions identify the specific workflow challenge that will anchor the Diagnostic conversation. Q9 drives the economic estimate shown on the results page and in the internal brief.*

**Q6 — "Think about one workflow that consistently costs more time, effort, or money than it should. Which category fits best?"**
*Anchors benchmark copy, personalized insight paragraph, and internal brief workflow category.*

| Answer | Points |
|---|---|
| Reporting & data aggregation | 10 |
| Document creation & review | 10 |
| Client or customer communications | 9 |
| Research & analysis | 9 |
| Approval & review processes | 8 |
| Employee or client onboarding | 8 |
| Scheduling & coordination | 7 |

**Q7 — "How many people on your team touch this workflow?"**

| Answer | Points |
|---|---|
| Just me | 3 |
| 2–5 people | 8 |
| 6–15 people | 12 |
| 16 or more people | 10 |

**Q8 — "How often does this workflow run?"**

| Answer | Points |
|---|---|
| Multiple times per day | 12 |
| Daily | 12 |
| Weekly | 10 |
| Monthly | 6 |
| Quarterly | 2 |

**Q9 — "How many hours per week does your team collectively spend on this workflow?"**
*Hours midpoint × 50 weeks × $50/hr blended rate = estimated annual labor cost shown on results page and internal brief.*

| Answer | Points | Hours midpoint | Annual hours | Low ($50/hr) | High ($75/hr) |
|---|---|---|---|---|---|
| Less than 5 hours | 2 | 3 | 150 | $7,500 | $11,250 |
| 5–10 hours | 6 | 7.5 | 375 | $18,750 | $28,125 |
| 11–20 hours | 10 | 15 | 750 | $37,500 | $56,250 |
| 21–40 hours | 12 | 30 | 1,500 | $75,000 | $112,500 |
| More than 40 hours | 15 | 45 | 2,250 | $112,500 | $168,750 |

**Q10 — "How would you describe where this workflow stands today?"**

| Answer | Points |
|---|---|
| Entirely manual — spreadsheets, email, or paper | 12 |
| Partially automated but still requires significant human effort | 10 |
| We have tools, but they don't talk to each other | 10 |
| It works, but it's complex and prone to bottlenecks | 6 |
| It mostly works fine — I'm just exploring options | 2 |

**Q11 — "What does this workflow cost your company most?"**
*Determines the primary pain angle used in the Diagnostic call and internal brief talking points.*

| Answer | Points |
|---|---|
| Money — the labor cost is significant | 10 |
| Scale — we can't grow without adding headcount | 10 |
| Time — it creates constant bottlenecks | 9 |
| Errors — mistakes happen and they're expensive | 9 |
| Team morale — it's tedious and people hate it | 8 |

---

### Phase 4: Your Results

**Q12 — "Almost done. Where should we send your results?"** *(0 points)*

Collects three fields on one screen:
- First name (required)
- Company name (required)
- Email address (required)

Framing: *"We'll send your personalized AI Readiness Brief here — your archetype, your score, and a summary of your biggest opportunity."*

Placed last — after 4+ minutes of investment, completion rates at this stage are very high. Email should pre-populate the results page CTA so the respondent doesn't type it again (verify this is supported on chosen ScoreApp plan tier).

---

## 7. Results Page

### Structure (four layers, top to bottom)

#### Layer 1: Archetype + Score

The archetype is the hero. Displayed large and prominently. The score is the supporting number beneath it.

**Display structure:**
```
YOU ARE

[ARCHETYPE NAME]
[Tagline in italics]

[2–3 sentence archetype description — identity + recognition paragraph]

──────────────────────────────────────────

YOUR AI OPPORTUNITY SCORE

[XX] / 100   [Stage Label]

[One dynamic sentence: workflow type + cost type + frequency]
```

The dynamic sentence beneath the score pulls from Q6 (workflow type) + Q11 (cost type) + Q8 (frequency). Example: *"Your results reflect a high-frequency reporting workflow with significant labor cost — one of the most consistently addressable AI transformation opportunities we see."*

#### Layer 2: Benchmark

Two stats — one static industry benchmark, one dynamic economic estimate.

**Static:**
> "Knowledge workers spend an average of 23% of their workweek on tasks that could be partially or fully automated — nearly one full day per person, per week."
>
> *Source: McKinsey Global Institute — verify figure and update citation before launch.*

**Dynamic (calculated from Q9):**
> "Based on your answers, your team is spending an estimated **[X] hours per year** on this workflow — equivalent to roughly **$[Y]–$[Z] in annual labor cost** at average knowledge worker rates."

Uses the Q9 lookup table. Dollar figures use the conservative $50–$75/hr range so the estimate feels like an understatement. The $10–20K engagement price then implies a 4–15x ROI without stating it.

#### Layer 3: Personalized Insight

3–4 sentences reflecting their specific workflow category and primary pain type back to them — signaling what's possible without mentioning the company or making a sales pitch.

Copy matrix: 7 workflow types × 5 pain types = 35 variants. Full copy in `content/results-copy.md`. Triggered by Q6 + Q11. If ScoreApp only supports single-question conditional copy, use Q6 as the trigger and the "Time (bottlenecks)" variant as the default for each workflow type.

#### Layer 4: CTAs

**Primary CTA (all respondents):**
> **Get your AI Readiness Brief**
> "We'll email you a personalized summary of your archetype, your score, benchmark data, and a plain-English breakdown of what your biggest workflow opportunity could look like."
> [ Email field (pre-filled from Q12) ] [ Send my Brief ]

**Secondary CTA (qualified respondents only — see routing table in Section 5):**
> **Book a free 30-minute AI Workflow ROI Diagnostic**
> "Talk through your results with our team. We'll examine one workflow from both the business and technical sides and determine whether there's a practical opportunity worth pursuing."
> [ View available times ] *(Calendly embed)*

**AI Observer message (Level 1 archetype — replaces secondary CTA):**
> "Your results show a significant opportunity ahead — but capturing it starts with building your AI readiness foundation first. Save this page. When your company is ready to move from awareness to action, this is exactly where the conversation starts."

---

## 8. Internal Brief

Sent **30 minutes after quiz submission**, not immediately. This gives the respondent time to view results and make a booking decision — the brief then reflects what they actually chose to do.

A **separate instant notification** fires the moment any respondent books through Calendly, catching bookings that happen before or after the 30-minute brief window.

**Subject line format:**
`[SCORE/100 · ARCHETYPE] New AI Readiness Assessment — FIRSTNAME L. at COMPANY`

Examples:
- `[90/100 · AI Architect] New AI Readiness Assessment — Sarah M. at Clearwater Consulting`
- `[53/100 · AI Catalyst] New AI Readiness Assessment — James T. at Horizon Partners`
- `[28/100 · AI Observer] New AI Readiness Assessment — Dana R. at Apex Group`

Score and archetype in the subject line allow instant triage without opening.

**Full brief template:** `content/internal-brief-template.md`

### Talking Points Logic (summary)

| Signal | Talking Point |
|---|---|
| Q11 = Scale | Growth ceiling: *"What does the team look like in 18 months if this workflow doesn't change?"* |
| Q11 = Money | ROI: *"What would you do with $[estimate] back in the budget each year?"* |
| Q11 = Errors | Risk: *"What's the cost when one of those errors gets through?"* |
| Q11 = Time | Velocity: *"What decisions or projects are waiting on this process right now?"* |
| Q11 = Morale | Retention: *"How long has the team been living with this? What's the turnover risk if it doesn't improve?"* |
| Q4 = No strategy | Leadership isn't aligned yet. Ask who the internal AI champion is. |
| Q5 = No impact | They're experimenting but not transforming. Lead with: *"What would make AI feel like it's actually working for your business?"* |
| Q1 = Manager or Director | Map the buying committee early: *"Who else would need to be part of a conversation like this?"* |
| Q1 = Owner / CEO | They can likely greenlight. Keep it at strategic ROI — not implementation detail. |
| Score ≥ 76 | 🔥 Hot lead. Same-day outreach. Don't let this one sit. |

---

## 9. Post-Submission Flow

```
Respondent completes Q12
        │
        ▼
Results page loads instantly
  • Archetype (hero) + Score (supporting)
  • Benchmark stats + economic estimate
  • Personalized insight paragraph
  • Primary CTA: AI Readiness Brief (email)
  • Secondary CTA: Diagnostic booking (qualified only)
  • Observer message: nurture path (Level 1 only)
        │
        ├──► Respondent books Diagnostic call
        │         │
        │         ▼
        │    Instant Calendly notification to Uzziah + Arielle
        │
        ├──► Respondent requests AI Readiness Brief
        │         │
        │         ▼
        │    Brief email sent to respondent immediately
        │    (ScoreApp automation)
        │         │
        │         └──► If no booking within 5 days:
        │                   Non-booker follow-up email
        │
        └──► 30 minutes after submission
                  │
                  ▼
             Internal brief sent to Uzziah + Arielle
             (calendar status reflects actual booking)
                  │
                  └──► If archetype = AI Observer OR score < 35:
                            Nurture sequence email at 14 days
```

---

## 10. Email Sequences

Three sequences. Full copy in `content/follow-up-sequences.md`.

| Sequence | Trigger | Timing | Purpose |
|---|---|---|---|
| AI Readiness Brief | Respondent submits email on results page | Immediate | Delivers brief; includes Calendly link |
| Non-Booker Follow-Up | Brief requested, no booking within 5 days | Day 5 | Soft re-engagement |
| Observer Nurture | AI Observer archetype OR score < 35 | Day 14 | Long-horizon nurture; no sales pressure |

---

## 11. Pre-Diagnostic Preparation

Before each Diagnostic call:
1. Review the respondent's brief — archetype, score, AI readiness signals (Q3, Q4, Q5), workflow identified
2. Research the company: size, business model, industry AI signals, likely workflows, respondent's role and likely influence
3. Prepare 3–5 business hypotheses for Uzziah to test against the workflow economics and urgency
4. Prepare key technical feasibility questions for Arielle to probe: systems, integrations, data access, constraints
5. Confirm Revenue Pipeline card has company, contact, archetype, score, call date/time, source, and next action

---

## 12. Open Items for Implementation

### Platform (verify before build)
- [ ] Confirm ScoreApp supports independent subscore tracking (Q3+Q4+Q5) for archetype assignment
- [ ] Confirm ScoreApp plan tier supports delayed internal notifications (30 min)
- [ ] Confirm email pre-fill on results page from Q12 contact fields
- [ ] Confirm score-conditional email routing for Observer nurture sequence
- [ ] Confirm Calendly embed is supported on chosen plan tier

### Content (write before launch)
- [ ] Verify benchmark stat: "23% of workweek on automatable tasks" — confirm source and update citation
- [ ] Confirm blended labor rate assumption ($50/hr) is appropriate for ICP; adjust if needed
- [ ] Write dynamic sentence variants for Layer 1 (Q6 × Q11 × Q8 combinations — key variants only)
- [ ] Review 35 personalized insight paragraphs in `content/results-copy.md` for tone alignment with archetype system

### Configuration (before go-live)
- [ ] Configure Calendly: approved Diagnostic availability, excluded dates (Saturdays, holy days, blocked commitments), 30-minute default duration
- [ ] Set up both-founder inclusion on every Diagnostic booking notification
- [ ] Test all qualification routing branches (each archetype × score combination at/below/above threshold)
- [ ] Test Observer path: confirm no Diagnostic CTA appears regardless of score
- [ ] Test internal brief: confirm archetype field populates correctly, Q references are correct
- [ ] Configure Revenue Pipeline card creation/update on qualified submission
- [ ] Define where all submissions are stored for team review (ScoreApp dashboard, CRM, or spreadsheet)

### Launch gate
This quiz is ready to go live when:
- A respondent can move from submission → archetype result → Diagnostic booking without any manual intervention from Uzziah or Arielle
- Both founders receive an instant notification when a Diagnostic is booked
- Both founders receive the 30-minute delayed brief on every submission
- The Observer path and all non-qualified paths deliver the nurture experience with no Diagnostic CTA
- At least one full end-to-end test has been completed for each qualification branch
