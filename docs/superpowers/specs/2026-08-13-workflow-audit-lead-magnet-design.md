# Workflow Automation Audit — Lead Magnet Design Spec

**Date:** 2026-08-13
**Status:** Approved for implementation planning
**Offering:** AI automation of one critical workflow — $10,000–$20,000
**Target:** Knowledge worker businesses, 50–200 employees

---

## 1. Overview

A B2B lead magnet quiz framed as an **AI Readiness Assessment**. Respondents answer 12 questions across four phases — who they are, their AI story, their biggest workflow challenge, and contact capture. They receive an instant AI Readiness Archetype (identity result, like Myers-Briggs) plus an AI Opportunity Score (0–100). The internal team receives a delayed submission brief with archetype, score, workflow data, and suggested talking points.

**Core principle:** The quiz feels like a self-discovery tool — the prospect is finding out who they are on the AI readiness journey, not filling out a screener. The word "qualify" never appears. Qualification happens invisibly through a dual scoring system. The archetype result is designed to be shareable internally and on LinkedIn.

**Two scoring dimensions run in parallel:**
- **AI Readiness Subscore** (Q3 + Q4 + Q5) → determines archetype identity
- **Overall AI Opportunity Score** (all scored questions, normalized 0–100) → determines qualification routing and the prospect-facing score display

---

## 2. Platform

**ScoreApp** (~$49–99/month)

Chosen for: native scoring engine, instant results pages, email capture, Calendly embed support, delayed internal notifications, and no custom code required. Gets the quiz live in days.

---

## 3. Quiz Identity

| Field | Value |
|---|---|
| Name | The AI Readiness Assessment |
| Subtitle | "Discover where your company stands on the AI readiness journey — and what's possible from here." |
| Estimated completion time | 4–5 minutes |
| Number of questions | 12 |
| Narrative frame | Identity discovery, not an audit or screener |
| Primary result | AI Readiness Archetype (identity label + description) |
| Secondary result | AI Opportunity Score (0–100) |

---

## 4. Scoring System

### Two Dimensions

**Dimension 1 — AI Readiness Subscore** (drives archetype assignment)
Pulled from Q3 + Q4 + Q5 only. Maximum: 45 points.

| AI Readiness Subscore | Archetype |
|---|---|
| 0–10 | The AI Observer |
| 11–22 | The AI Tinkerer |
| 23–34 | The AI Catalyst |
| 35–45 | The AI Architect |

**Dimension 2 — Overall AI Opportunity Score** (prospect-facing 0–100, drives qualification routing)
All scored questions combined. ScoreApp normalizes to a 0–100 display score.

| Dimension | Questions | Max Points | Approx. Weight |
|---|---|---|---|
| Company Fit | Q1, Q2 | 30 | ~21% |
| AI Readiness | Q3, Q4, Q5 | 45 | ~31% |
| Workflow Opportunity | Q6–Q11 | 71 | ~49% |
| **Total raw** | | **146** | |

**Q12 (contact capture):** No points — contact collection only

### Score Tier Labels (prospect-facing)

| Score | Stage Label | Internal Routing |
|---|---|---|
| 0–35 | Early Stage | Nurture sequence |
| 36–55 | Growth Stage | Warm lead — follow-up within 48 hrs |
| 56–75 | High Opportunity | Strong lead — outreach within 24 hrs |
| 76–100 | Ready for Transformation | Hot lead — same-day priority outreach |

### Qualification Routing (Archetype + Score)

| Archetype | Score Threshold for Diagnostic CTA |
|---|---|
| AI Architect (Level 4) | ≥ 40 |
| AI Catalyst (Level 3) | ≥ 45 |
| AI Tinkerer (Level 2) | ≥ 55 |
| AI Observer (Level 1) | Nurture only — no diagnostic CTA regardless of score |

AI Observers are excluded from the diagnostic CTA even if their overall score is high. A high score + Observer archetype signals a large opportunity the company isn't yet positioned to capture. Results copy for this combination should acknowledge the size of the opportunity while explaining why readiness must come first.

**Platform note:** Verify whether ScoreApp supports subscore tracking for archetype assignment independent of the overall score. Fallback if not supported: increase Q3, Q4, Q5 to 25 points each (total raw max ~176) so AI readiness questions carry enough weight that overall score and archetype stay directionally aligned.

---

## 5. The 12 Questions

### Phase 1: About You

**Q1 — "What's your role at your company?"**

| Answer | Points |
|---|---|
| Owner / Founder / CEO | 15 |
| C-Suite or VP | 12 |
| Director / Head of Department | 8 |
| Manager | 4 |
| Individual Contributor | 1 |

**Q2 — "How big is your team?"**

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

*Q3, Q4, Q5 drive archetype assignment via AI Readiness Subscore.*

**Q3 — "How would you describe AI adoption across your company right now?"**

| Answer | Points |
|---|---|
| A few people are experimenting on their own | 2 |
| Some teams use AI tools regularly | 8 |
| Most of our team uses AI as part of how they work | 13 |
| AI is woven into our operations — it's infrastructure, not just a tool | 15 |

**Q4 — "Where does your leadership stand on AI?"**

| Answer | Points |
|---|---|
| No formal strategy yet — mostly individual decisions | 2 |
| We're starting to discuss it at a leadership level | 6 |
| We have an AI plan and we're actively working on it | 11 |
| AI is a top strategic priority with full executive buy-in | 15 |

**Q5 — "Honestly — is AI actually moving the needle at your company?"**

| Answer | Points |
|---|---|
| We're not really using it yet | 1 |
| We're using AI tools but haven't seen clear business impact | 5 |
| We see productivity gains, but nothing that's changed the company overall | 10 |
| Yes — we can point to real, measurable business results | 15 |

---

### Phase 3: Your Biggest Opportunity

**Q6 — "Think about one workflow that consistently costs more time, effort, or money than it should. Which category fits best?"**

| Answer | Points |
|---|---|
| Reporting & data aggregation | 10 |
| Document creation & review | 10 |
| Client or customer communications | 9 |
| Research & analysis | 9 |
| Approval & review processes | 8 |
| Employee or client onboarding | 8 |
| Scheduling & coordination | 7 |

*This answer anchors benchmark copy and internal brief workflow category.*

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

| Answer | Points | Hours (midpoint for calculation) |
|---|---|---|
| Less than 5 hours | 2 | 3 |
| 5–10 hours | 6 | 7.5 |
| 11–20 hours | 10 | 15 |
| 21–40 hours | 12 | 30 |
| More than 40 hours | 15 | 45 |

*Hours midpoint × 50 weeks × $50/hr blended rate = estimated annual labor cost shown on results page and internal brief.*

**Q10 — "How would you describe where this workflow stands today?"**

| Answer | Points |
|---|---|
| Entirely manual — spreadsheets, email, or paper | 12 |
| Partially automated but still requires significant human effort | 10 |
| We have tools, but they don't talk to each other | 10 |
| It works, but it's complex and prone to bottlenecks | 6 |
| It mostly works fine — I'm just exploring options | 2 |

**Q11 — "What does this workflow cost your company most?"**

| Answer | Points |
|---|---|
| Money — the labor cost is significant | 10 |
| Scale — we can't grow without adding headcount | 10 |
| Time — it creates constant bottlenecks | 9 |
| Errors — mistakes happen and they're expensive | 9 |
| Team morale — it's tedious and people hate it | 8 |

*This answer determines the primary pain angle used in the sales conversation talking points.*

---

### Phase 4: Your Results

**Q12 — "Almost done. Where should we send your results?"**

Collects three fields on one screen:
- First name
- Company name
- Email address

Framing: *"We'll send your personalized AI Readiness Brief here — your archetype, your score, and a summary of your biggest opportunity."*

Placed last — after 4+ minutes of investment, completion rate at this stage is very high. Email pre-populates the "get your brief" CTA on the results page so the respondent doesn't type it again (ScoreApp native feature — verify on chosen plan tier).

---

## 6. Results Page

### Structure (four layers, top to bottom)

#### Layer 1: The Archetype + Score
Archetype name and description displayed prominently as the primary result. Score shown beneath as the supporting metric.

Example:
> **You are The AI Catalyst**
> *"The spark is there. What happens next is everything."*
> [2–3 sentence archetype description]
>
> **Your AI Opportunity Score: 78** · *High Opportunity*

The archetype is assigned from Q3 + Q4 + Q5 (AI Readiness Subscore).
The score and stage label pull from all scored questions (normalized 0–100).
The dynamic sentence beneath the score pulls from: Q6 (workflow type) + Q11 (cost type) + Q8 (frequency).

#### Layer 2: The Benchmark
Two stats — one static industry benchmark, one dynamic calculation.

**Static (sourced from McKinsey/Salesforce knowledge worker research):**
> "Knowledge workers spend an average of 23% of their workweek on tasks that could be partially or fully automated — nearly one full day per person, per week."

**Dynamic (calculated from Q2 × Q7 × $50/hr):**
> "Based on your answers, your team is spending an estimated **[X] hours per year** on this workflow — equivalent to roughly **$[Y] in annual labor cost** at average knowledge worker rates."

The dollar figure uses a conservative blended rate ($50/hr) so it feels like an underestimate to the respondent. The $10–20K offering then implies a 4–5x ROI without stating it.

#### Layer 3: The Personalized Insight
3–4 sentences reflecting their workflow category and pain type back to them, signaling possibility without pitching. No mention of the company or offering.

Copy matrix: 7 workflow types × 5 pain types = 35 variants (manageable to write; most combinations share a template).

Example (Reporting + Can't scale):
> "Reporting workflows are one of the highest-leverage automation opportunities for knowledge worker teams. The pattern you're describing — manual aggregation, significant team hours, and a scaling ceiling — is one we see consistently at companies in your stage. Teams that address this tend to reclaim 60–80% of the time currently spent on the process, and redirect that capacity toward higher-value work."

#### Layer 4: The Two CTAs

**Primary:**
> **Get your Workflow Automation Brief**
> "We'll email you a personalized summary of your audit results, your benchmark data, and a plain-English breakdown of what automation could look like for your team."
> [ Email field (pre-filled from Q12) ] [ Send my Brief ]

**Secondary (shown below primary, or after email is submitted):**
> **Book a free 30-minute Workflow Strategy Call**
> "Talk through your results with our team. No pitch — just a focused conversation about what's possible."
> [ View available times ] *(Calendly embed)*

### Archetype Results Copy

See `docs/superpowers/specs/2026-08-13-workflow-audit-lead-magnet-design.md` — Section 3A below, and the AI Readiness Archetypes reference artifact for full descriptions.

| Archetype | Tagline |
|---|---|
| The AI Architect | "You're not using AI — you're building with it." |
| The AI Catalyst | "The spark is there. What happens next is everything." |
| The AI Tinkerer | "Your team is discovering what AI can do. Some of it is working. Most of it isn't connected yet." |
| The AI Observer | "You're paying attention — but less than you'll need." |

### Score Stage Labels

| Score | Stage Label |
|---|---|
| 0–35 | Early Stage |
| 36–55 | Growth Stage |
| 56–75 | High Opportunity |
| 76–100 | Ready for Transformation |

For AI Observers: results page is encouraging but does not push for a diagnostic call regardless of score. Internal brief is still generated and sent. These leads enter a nurture sequence.

---

## 7. Internal Brief (Team Email)

### Timing
Sent **30 minutes after quiz submission** — not immediately. This gives the respondent time to view their results, read the benchmark, and decide whether to book a call. The calendar status in the brief then reflects an actual decision.

A **separate Calendly booking notification** is sent to the team instantly when any respondent books a call — this catches bookings that happen outside the 30-minute window (e.g., respondents who return to the results page after reading the emailed brief).

### Email Format

**Subject:**
`[78/100 · High Opportunity] New Workflow Audit — Sarah M. at Clearwater Consulting`

Score and tier in subject line for instant triage without opening.

**Body:**

---
NEW WORKFLOW AUDIT SUBMISSION

Name: [First name from Q12]
Company: [Company name from Q12]
Role: [Q1 answer]
Email: [Q12]
Score: [X] / 100 — [Tier Label]
Submitted: [Date and time]

---

COMPANY PROFILE
- Employees: [Q2 answer]
- Revenue: [Q3 answer]
- Decision-maker level: [Q1 answer] + flag if Manager/Director: "Note: likely needs sign-off from VP or above"

---

WORKFLOW IDENTIFIED
- Category: [Q4 answer]
- Team involved: [Q5 answer]
- Frequency: [Q6 answer]
- Hours/week: [Q7 answer]
- Current state: [Q8 answer]
- Primary cost: [Q9 answer]

---

CALCULATED ESTIMATE
- Estimated annual labor cost: $[Q7 midpoint × 50 weeks × $50/hr] – $[same × $75/hr]
  (Conservative range based on blended knowledge worker rates)

---

BUYING READINESS
- Prior solution attempts: [Q10 answer]
- If fixed tomorrow, they care most about: [Q11 answer]

---

SUGGESTED TALKING POINTS
[Dynamically generated from answers — see logic below]

---

CALENDAR STATUS: [Booked: date/time] OR [Did not book as of 30 min post-submission]
EMAIL REPORT: [Requested ✓] OR [Not requested]

---

### Talking Points Logic

Talking points are generated from four triggers:

| Trigger | Talking Point Generated |
|---|---|
| Q9 = "Can't scale without headcount" | Lead with the growth ceiling: *"What does your team look like in 18 months if this doesn't change?"* |
| Q9 = "Money / labor cost" | Lead with ROI: *"What would you do with $[estimate] back in the budget?"* |
| Q9 = "Errors" | Lead with risk: *"What's the cost of one bad error in this process?"* |
| Q10 = "Looked but no fit" | *"Ask what they evaluated and why it didn't fit before presenting anything."* |
| Q10 = "Tried, didn't work" | *"Ask what went wrong — this is your competitive differentiation moment."* |
| Q1 = Manager or Director | *"Map the buying committee early: 'Who else would be part of a decision like this?'"* |
| Q1 = Owner/CEO | *"They can greenlight — keep the conversation at strategic ROI, not implementation detail."* |
| Score 85–100 | *"This is a hot lead. Prioritize same-day outreach."* |

---

## 8. Post-Submission Flow Summary

```
Respondent completes Q12
        │
        ▼
Results page loads instantly
  • Score + tier label
  • Benchmark stats
  • Personalized insight paragraph
  • Primary CTA: email brief
  • Secondary CTA: book a call (Calendly embed)
        │
        ├──► Respondent books a call
        │         │
        │         ▼
        │    Calendly sends instant booking
        │    notification to team
        │
        ├──► Respondent requests email brief
        │         │
        │         ▼
        │    Brief email sent to respondent
        │    (ScoreApp automated)
        │
        └──► 30 minutes after submission
                  │
                  ▼
             Internal brief sent to team
             (calendar status reflects
              actual booking decision)
```

---

## 9. Open Items for Implementation

- [ ] Confirm ScoreApp plan tier supports delayed internal notifications (verify in-app)
- [ ] Write the 35 personalized insight copy variants (7 workflows × 5 pain types)
- [ ] Source/verify benchmark stat: "23% of workweek on automatable tasks" (McKinsey 2023 report)
- [ ] Set blended rate assumption ($50/hr) — confirm this feels right for the target market or adjust
- [ ] Verify ScoreApp plan supports email pre-fill on results page CTA from Q12 contact fields
- [ ] Configure Calendly calendar and connect to results page
- [ ] Define nurture email sequence for 0–40 tier leads
- [ ] Define follow-up email sequence triggered when respondent requests brief (but does not book a call)
- [ ] Determine where submissions are stored for team review (ScoreApp dashboard, connected CRM, or spreadsheet)
