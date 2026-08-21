# Workflow Automation Audit — Lead Magnet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch a 12-question "Workflow Automation Audit" quiz on ScoreApp that qualifies B2B leads, scores their automation opportunity (0–100), delivers an instant results page with benchmark data, and emails the internal team a delayed brief with talking points.

**Architecture:** All copy is written and stored in local content files first, then entered into ScoreApp and Calendly. This gives the team a permanent offline record and makes future edits faster. ScoreApp handles scoring, results pages, email capture, and delayed internal notifications natively. Calendly handles calendar booking and its own booking notifications.

**Tech Stack:** ScoreApp (quiz platform), Calendly (scheduling), email client of choice for follow-up sequences (or ScoreApp's built-in email automation)

## Global Constraints

- Quiz title: "The Workflow Automation Audit" — do not change
- Quiz subtitle: "Find out which manual process is costing your team the most — and what's possible if you fix it."
- Score displayed to respondent: 0–100 (ScoreApp normalizes raw 125-point total automatically)
- Blended labor rate for cost calculation: $50/hr (low end), $75/hr (high end)
- Internal brief sent 30 minutes after submission, NOT immediately
- Calendly booking notification sent to team instantly (separate from the 30-min brief)
- The word "qualify" must never appear in any respondent-facing copy
- No mention of your company's offering on the results page
- Q11 and Q12 carry zero scoring weight

---

## Deliverable Files

All content is written to local files before being entered into any platform. Keep these as the source of truth.

| File | Purpose |
|---|---|
| `content/quiz-questions.md` | All 12 questions, answer options, point values |
| `content/results-copy.md` | Tier headlines, 35 insight variants, benchmark stats, CTA copy |
| `content/internal-brief-template.md` | Internal email template, talking points logic, all 5 cost estimates |
| `content/follow-up-sequences.md` | Respondent brief email, nurture sequence (0–40 tier), non-booker follow-up |

---

## Task 1: Platform Setup & Capability Verification

**Files:**
- No files created — this is account setup and capability verification

**Interfaces:**
- Produces: Active ScoreApp account on correct plan, active Calendly account, verified capability checklist

- [ ] **Step 1: Sign up for ScoreApp**

Go to scoreapp.com. Choose the plan that includes all of: delayed notification emails, conditional copy on results pages, Calendly embed on results pages, and contact field pre-fill. As of 2026, the "Grow" plan (~$79/month) covers all of these. Verify each capability is listed before entering payment.

- [ ] **Step 2: Verify delayed notification support**

Inside ScoreApp, navigate to Notifications settings. Confirm you can set a delay (in minutes) before the internal notification email is sent. You need to be able to set exactly 30 minutes. If this is not available on your plan, upgrade before proceeding.

- [ ] **Step 3: Verify conditional results page copy**

Inside ScoreApp, navigate to Results Page settings. Confirm you can show different copy blocks based on the respondent's answer to a specific question (not just based on score tier). You need this for the 35 personalized insight variants (triggered by Q4 + Q9 answers). If conditional copy is limited to score tier only, note this — you will use score tier + a single question (Q4, workflow type) as the primary personalization axis and accept that Q9 (pain type) drives talking points only.

- [ ] **Step 4: Sign up for Calendly**

Go to calendly.com. The free tier supports one event type — sufficient for this use case. Create a "Workflow Strategy Call" event: 30 minutes, your available hours, buffer time of 15 minutes before and after each call. Set the event description to: "A focused 30-minute conversation about your workflow audit results. No pitch — just an honest look at what's possible."

- [ ] **Step 5: Configure Calendly team notifications**

In Calendly, go to Notifications & Cancellations for the Workflow Strategy Call event. Add your team email(s) to receive an instant notification when any booking is made. Include the invitee's name, email, and any answers they provide. (Calendly allows you to add intake questions — add one: "Which workflow did you identify in the audit?" — so you have context before the call.)

- [ ] **Step 6: Verify quiz shell**

Back in ScoreApp, create a new quiz. Set the title to "The Workflow Automation Audit" and the subtitle to "Find out which manual process is costing your team the most — and what's possible if you fix it." Save and confirm the quiz appears in your dashboard in Draft status.

---

## Task 2: Write All Copy Assets

**Files:**
- Create: `content/quiz-questions.md`
- Create: `content/results-copy.md`
- Create: `content/internal-brief-template.md`
- Create: `content/follow-up-sequences.md`

**Interfaces:**
- Produces: Four complete content files used as source-of-truth for all ScoreApp and Calendly configuration in Tasks 3–6

- [ ] **Step 1: Create `content/quiz-questions.md`**

Create the file with this exact content:

```markdown
# Quiz Questions — Source of Truth

## Phase 1: Your Organization

### Q1 — Role
Question text: "What's your role at your company?"
Type: Single choice

| Answer | Points |
|---|---|
| Owner / Founder / CEO | 15 |
| C-Suite or VP | 12 |
| Director / Head of Department | 8 |
| Manager | 4 |
| Individual Contributor | 1 |

### Q2 — Employee Count
Question text: "How many full-time employees does your company have?"
Type: Single choice

| Answer | Points |
|---|---|
| Under 25 | 2 |
| 25–50 | 6 |
| 51–100 | 15 |
| 101–200 | 15 |
| 201–500 | 5 |
| Over 500 | 2 |

### Q3 — Revenue
Question text: "What is your company's approximate annual revenue?"
Type: Single choice

| Answer | Points |
|---|---|
| Under $1M | 2 |
| $1M–$5M | 6 |
| $5M–$20M | 12 |
| $20M–$50M | 12 |
| Over $50M | 5 |

## Phase 2: The Workflow

### Q4 — Workflow Category
Question text: "Think about one workflow that consistently takes more time, effort, or money than it should. Which category fits best?"
Type: Single choice

| Answer | Points |
|---|---|
| Reporting & data aggregation | 10 |
| Document creation & review | 10 |
| Client or customer communications | 9 |
| Research & analysis | 9 |
| Approval & review processes | 8 |
| Employee or client onboarding | 8 |
| Scheduling & coordination | 7 |

### Q5 — People Involved
Question text: "How many people on your team are involved in this workflow?"
Type: Single choice

| Answer | Points |
|---|---|
| Just me | 3 |
| 2–5 people | 8 |
| 6–15 people | 12 |
| 16 or more people | 10 |

### Q6 — Frequency
Question text: "How often does this workflow happen?"
Type: Single choice

| Answer | Points |
|---|---|
| Multiple times per day | 12 |
| Daily | 12 |
| Weekly | 10 |
| Monthly | 6 |
| Quarterly | 2 |

## Phase 3: The Cost

### Q7 — Hours Per Week
Question text: "Roughly how many hours per week does your team collectively spend on this workflow?"
Type: Single choice

| Answer | Points | Hours midpoint | Annual hours | Low cost ($50/hr) | High cost ($75/hr) |
|---|---|---|---|---|---|
| Less than 5 hours | 2 | 3 | 150 | $7,500 | $11,250 |
| 5–10 hours | 6 | 7.5 | 375 | $18,750 | $28,125 |
| 11–20 hours | 10 | 15 | 750 | $37,500 | $56,250 |
| 21–40 hours | 12 | 30 | 1,500 | $75,000 | $112,500 |
| More than 40 hours | 15 | 45 | 2,250 | $112,500 | $168,750 |

### Q8 — Current State
Question text: "How would you describe the current state of this workflow?"
Type: Single choice

| Answer | Points |
|---|---|
| Entirely manual — spreadsheets, email, or paper | 12 |
| Partially automated but still requires significant human effort | 10 |
| We have tools, but they don't talk to each other | 10 |
| It works, but it's complex and prone to bottlenecks | 6 |
| It mostly works fine — I'm just exploring options | 2 |

### Q9 — Primary Cost
Question text: "What does this workflow cost you most?"
Type: Single choice

| Answer | Points |
|---|---|
| Money — the labor cost is significant | 10 |
| Scale — we can't grow without adding headcount | 10 |
| Time — it creates constant bottlenecks | 9 |
| Errors — mistakes happen and they're expensive | 9 |
| Team morale — it's tedious and people hate it | 8 |

## Phase 4: Readiness

### Q10 — Prior Attempts
Question text: "Have you looked for solutions to this problem before?"
Type: Single choice

| Answer | Points |
|---|---|
| Yes — we've looked but haven't found the right fit | 12 |
| Yes — we tried something and it didn't work | 9 |
| No — we haven't explored it yet | 5 |
| We have something in progress | 2 |

### Q11 — Magic Wand (0 points)
Question text: "If you could fix this workflow tomorrow, what would matter most to you?"
Type: Single choice — NO SCORING

| Answer |
|---|
| Getting time back for my team |
| Reducing errors and increasing reliability |
| Cutting labor costs |
| Scaling without hiring more people |
| Better visibility into what's happening |

### Q12 — Contact Capture (0 points)
Question text: "Almost done. Where should we send your results?"
Subtext: "We'll send your personalized Workflow Automation Brief here — your audit results, benchmark data, and a summary of your biggest opportunity."
Type: Contact form — NO SCORING

Fields:
- First name (required)
- Company name (required)
- Email address (required)
```

- [ ] **Step 2: Create `content/results-copy.md`**

Create the file with this exact content:

```markdown
# Results Page Copy — Source of Truth

## Score Display (Layer 1)

### Tier Labels and Headlines

| Score | Tier Label | Page Headline |
|---|---|---|
| 0–40 | Workflow Foundations | "You're building the right foundation" |
| 41–65 | Automation Potential Identified | "A clear opportunity is taking shape" |
| 66–84 | High Automation Opportunity | "Your workflow is ready for a different approach" |
| 85–100 | Ready for Transformation | "This is exactly the kind of opportunity that changes how a team operates" |

### Tier Sub-Headlines (shown beneath headline)

**0–40 — Workflow Foundations:**
"Your audit results show an organization that's laying the groundwork. The workflow you identified may not be the highest-priority automation target right now — but knowing where you stand is a valuable first step."

**41–65 — Automation Potential Identified:**
"Your audit results reveal a real automation opportunity in the making. The workflow you identified has the early signs of a strong candidate — and with the right approach, the path forward is clearer than it might seem."

**66–84 — High Automation Opportunity:**
"Your audit results point to a workflow with strong automation potential. The combination of team involvement, frequency, and cost burden you described puts this in the top tier of opportunities we see."

**85–100 — Ready for Transformation:**
"Your audit results are striking. The workflow you described has every marker of a high-value automation opportunity — and the cost of leaving it manual is compounding every week."

---

## Benchmark Stats (Layer 2)

### Static Benchmark (shown to all respondents)
"Knowledge workers spend an average of 23% of their workweek on tasks that could be partially or fully automated — nearly one full day per person, per week."
Source: McKinsey Global Institute, "The future of work after COVID-19," 2021. Verify this stat before launch at mckinsey.com and update citation if a more recent figure is available.

### Dynamic Benchmark (conditional on Q7 answer)

**If Q7 = "Less than 5 hours":**
"Based on your answers, your team is spending an estimated 150+ hours per year on this workflow — equivalent to roughly $7,500–$11,000 in annual labor cost at average knowledge worker rates."

**If Q7 = "5–10 hours":**
"Based on your answers, your team is spending an estimated 375+ hours per year on this workflow — equivalent to roughly $19,000–$28,000 in annual labor cost at average knowledge worker rates."

**If Q7 = "11–20 hours":**
"Based on your answers, your team is spending an estimated 750+ hours per year on this workflow — equivalent to roughly $38,000–$56,000 in annual labor cost at average knowledge worker rates."

**If Q7 = "21–40 hours":**
"Based on your answers, your team is spending an estimated 1,500+ hours per year on this workflow — equivalent to roughly $75,000–$113,000 in annual labor cost at average knowledge worker rates."

**If Q7 = "More than 40 hours":**
"Based on your answers, your team is spending an estimated 2,250+ hours per year on this workflow — equivalent to roughly $113,000–$169,000 in annual labor cost at average knowledge worker rates."

---

## Personalized Insight Paragraphs (Layer 3)
Triggered by Q4 (workflow type) + Q9 (pain type). 35 variants.
If ScoreApp only supports single-question conditional copy, use Q4 as the primary trigger and omit Q9 differentiation (accept that Q9 drives talking points only).

### Reporting & Data Aggregation

**+ Money (labor cost):**
"Reporting and data aggregation is one of the highest-labor-cost processes in knowledge worker organizations. When a team is spending significant hours manually pulling, cleaning, and formatting data, the dollar figure accumulates faster than most leaders realize. Companies in your situation have reduced reporting time by 70–80% after automation — and redirected that budget toward work that actually grows the business."

**+ Scale (can't grow without headcount):**
"Reporting workflows are a hidden scaling ceiling for growing knowledge worker teams. The more your business grows, the more data you have — and the more manual effort your team spends keeping up with it. Companies at your stage that automate reporting consistently find they can handle 2–3x the data volume without adding headcount."

**+ Time (bottlenecks):**
"Reporting and data aggregation is one of the most time-intensive recurring processes in knowledge worker businesses — and one of the clearest automation opportunities. The bottleneck you're describing isn't a people problem; it's a process problem. Teams that address this typically reclaim 60–80% of the hours currently spent on it."

**+ Errors:**
"Reporting workflows built on manual data handling are one of the leading sources of avoidable errors in knowledge worker organizations. A mistake in a report doesn't just cost time to fix — it costs credibility. Automating the data aggregation layer typically eliminates the most common error sources while making the output more consistent and auditable."

**+ Team morale:**
"Few tasks drain knowledge worker teams faster than manual reporting — it's high-effort, low-reward work that people didn't sign up to do. The pattern you're describing is a retention risk as much as a productivity problem. Teams that automate this almost universally report a morale lift alongside the time savings."

---

### Document Creation & Review

**+ Money (labor cost):**
"Document creation and review is one of the highest-cost manual workflows in knowledge worker businesses — especially when multiple people are involved in drafting, editing, and approving. The labor cost is rarely tracked as a line item, but it's usually significant when you add it up. Automation in this area typically reduces time-to-final-document by 50–70% without sacrificing quality."

**+ Scale:**
"Document-heavy workflows are a well-known scaling bottleneck for knowledge worker teams. As your business grows, so does the volume of documents — and the manual effort to create and review them grows with it. Automating the creation and routing layer is how fast-growing teams keep up without proportionally growing headcount."

**+ Time (bottlenecks):**
"Document creation and review is one of the most reliably slow workflows in knowledge worker businesses — full of back-and-forth, version confusion, and waiting. The bottleneck is usually in the handoffs, not the actual writing. Automation addresses the coordination overhead, which is where most of the time goes."

**+ Errors:**
"Manual document workflows are a significant source of version control errors, missed updates, and inconsistent output — especially when multiple reviewers are involved. Each handoff is an opportunity for something to fall through. Automating the creation and review process typically brings error rates down dramatically while making the audit trail clearer."

**+ Team morale:**
"Document creation and review is one of those tasks that feels endless — templates that aren't quite right, formatting that breaks, feedback loops that drag on. It's the kind of work that quietly frustrates capable people. Teams that automate the repetitive parts of this process find their people spend more time on the thinking and less on the mechanics."

---

### Client or Customer Communications

**+ Money (labor cost):**
"Client and customer communication workflows are a significant and often underestimated labor cost in knowledge worker organizations. When responses, follow-ups, and updates are handled manually, the hours accumulate quickly — especially at scale. Automation in this area handles the high-volume, low-judgment communications so your team focuses on the relationships that require real attention."

**+ Scale:**
"Managing client communications manually is one of the clearest growth limiters for knowledge worker teams. The more clients you have, the more communication volume — and at some point, a manual approach simply can't keep up. Automated communication workflows let you maintain responsiveness and consistency without adding communication overhead proportionally."

**+ Time (bottlenecks):**
"Manual client communication workflows are a constant time drain — writing the same updates, following up on the same requests, tracking the same threads. The time adds up quickly, and it's hard to batch or delegate effectively. Automation handles the repeatable layer so your team can focus on exceptions and the relationships that require judgment."

**+ Errors:**
"Manual client communication workflows are prone to the kinds of errors that damage relationships — missed follow-ups, inconsistent information, delayed responses. When communication is tracked in inboxes and spreadsheets, things fall through. Automated workflows create a reliable, consistent communication layer that rarely drops the ball."

**+ Team morale:**
"Managing client communications manually is the kind of work that wears people down — high volume, low autonomy, constant context-switching. It's often the thing that makes a good job feel overwhelming. Automating the repetitive communication layer gives your team room to do the client work they actually find meaningful."

---

### Research & Analysis

**+ Money (labor cost):**
"Manual research and analysis workflows are one of the most expensive uses of knowledge worker time. When skilled people spend hours gathering, organizing, and synthesizing information that could be automated, the labor cost is hard to justify. Automation in this area typically cuts research time by 60–80%, letting your team spend more time acting on insights and less time producing them."

**+ Scale:**
"Research and analysis workflows are a scaling bottleneck for knowledge worker teams that depend on information to make decisions. As the business grows, so does the information volume — and manual research doesn't scale with it. Automated research pipelines let your team handle significantly more analysis without adding analysts."

**+ Time (bottlenecks):**
"Manual research and analysis is one of the most time-consuming workflows in knowledge worker organizations — gathering from multiple sources, normalizing formats, and producing something usable is a lengthy process. The time between 'we need this information' and 'we have it' is often where decisions slow down. Automation compresses that gap dramatically."

**+ Errors:**
"Manual research workflows introduce errors at every step — copying data between sources, normalizing formats by hand, synthesizing across inconsistent inputs. The output is only as reliable as the process, and manual processes are hard to audit. Automated research pipelines reduce human error in the collection and synthesis phases significantly."

**+ Team morale:**
"Manual research is the kind of knowledge work that rarely feels fulfilling — collecting and organizing information instead of interpreting it and acting on it. Skilled people often find it frustrating to spend their time on the gathering instead of the thinking. Automation handles the collection layer and lets your team focus on the analysis they were hired to do."

---

### Approval & Review Processes

**+ Money (labor cost):**
"Manual approval and review workflows are a significant and often invisible labor cost in knowledge worker organizations. Every person in the chain is spending time reviewing, commenting, forwarding, and following up — and the aggregate cost is rarely counted. Streamlining this workflow can reduce the labor cost of each approval cycle by 40–60%."

**+ Scale:**
"Approval workflows are one of the first processes to break down as knowledge worker organizations grow. More decisions, more reviewers, more bottlenecks — and the manual coordination overhead scales with all of it. Automating the routing, tracking, and escalation layer is how growing teams keep decision velocity up without adding administrative overhead."

**+ Time (bottlenecks):**
"Manual approval and review workflows are a reliable source of organizational slowdown — requests sit in inboxes, reviewers lose track, and nothing moves until someone chases it. The bottleneck is rarely the review itself; it's the coordination around it. Automation handles the routing and follow-up so reviews happen faster and nothing falls through."

**+ Errors:**
"Manual approval workflows are prone to version confusion, missed sign-offs, and undocumented decisions — especially when they happen across email and chat. When something goes wrong, it's hard to trace what was approved, by whom, and when. Automated workflows create a clear, auditable trail that reduces errors and makes compliance simpler."

**+ Team morale:**
"Approval workflows managed manually are a friction point that frustrates everyone involved — requesters waiting for responses, reviewers drowning in queues, and coordinators chasing both. It's the kind of process overhead that makes people feel like they're fighting the system. Automation removes most of that friction."

---

### Employee or Client Onboarding

**+ Money (labor cost):**
"Employee and client onboarding is a high-cost, high-stakes process in knowledge worker organizations — and one of the most repeatable. When it's handled manually, each cycle requires significant coordination time from multiple people. Automating the process typically reduces the per-onboarding labor cost by 50–70% while improving consistency."

**+ Scale:**
"Onboarding workflows are one of the clearest scaling constraints for knowledge worker teams. The more you grow — whether in headcount or client count — the more onboarding cycles you run. Manual onboarding doesn't scale; the effort grows linearly with volume. Automation lets you onboard more without proportionally growing the team running it."

**+ Time (bottlenecks):**
"Manual onboarding workflows are time-intensive for everyone involved — the person being onboarded, the person running it, and everyone looped in for each step. It's also the kind of process where delays have real downstream consequences. Automating the coordination, communication, and documentation layer significantly compresses the onboarding timeline."

**+ Errors:**
"Manual onboarding processes are a common source of inconsistency and error — steps missed, documents not collected, access not provisioned, introductions not made. When each onboarding is run differently by different people, quality varies. Automated workflows ensure every onboarding follows the same steps, every time, without relying on someone to remember."

**+ Team morale:**
"A poorly executed onboarding experience sets the wrong tone — for employees and clients alike. When the process is manual and ad hoc, it often feels disorganized even when the team is trying hard. Automating the repeatable parts of onboarding creates a consistently smooth experience that reflects well on your organization from day one."

---

### Scheduling & Coordination

**+ Money (labor cost):**
"Manual scheduling and coordination is a surprisingly significant labor cost in knowledge worker organizations — the back-and-forth, the rescheduling, the calendar management. It's easy to dismiss as minor overhead, but across a team it adds up to real money. Automation in this area typically eliminates 70–80% of the coordination effort."

**+ Scale:**
"Scheduling and coordination workflows break down quickly as knowledge worker teams grow — more people, more meetings, more back-and-forth to manage. What worked at 20 people becomes a time sink at 100. Automated scheduling handles the coordination layer and scales with your team without adding administrative overhead."

**+ Time (bottlenecks):**
"Manual scheduling and coordination is a constant low-grade time drain for knowledge worker teams — never urgent enough to prioritize, never small enough to ignore. The back-and-forth adds up to hours each week that your team will never get back. Automation handles this entirely, returning that time for work that requires actual human judgment."

**+ Errors:**
"Manual scheduling is a reliable source of avoidable errors — double bookings, missed confirmations, wrong time zones, rescheduling chains that compound. Each error costs time to fix and sometimes credibility to repair. Automated scheduling eliminates the most common error sources and creates a reliable, self-managing system."

**+ Team morale:**
"Scheduling coordination is one of those tasks that knowledge workers find particularly thankless — repetitive, low-judgment, and never quite done. When people with real expertise spend meaningful time on back-and-forth calendar management, it's a waste of ability. Automation handles it completely, so your team can focus on work they were actually hired to do."

---

## CTA Copy (Layer 4)

### Primary CTA
Headline: "Get your Workflow Automation Brief"
Body: "We'll email you a personalized summary of your audit results, your benchmark data, and a plain-English breakdown of what automation could look like for your team."
Button: "Send my Brief"

### Secondary CTA
Headline: "Book a free 30-minute Workflow Strategy Call"
Body: "Talk through your results with our team. No pitch — just a focused conversation about what's possible."
Button: "View available times"

### 0–40 Tier Note (shown instead of secondary CTA for bottom tier)
"Want to revisit this in 6 months as your organization grows? Save this page and check back in — the opportunity window often opens faster than people expect."
```

- [ ] **Step 3: Create `content/internal-brief-template.md`**

Create the file with this exact content:

```markdown
# Internal Brief Email Template — Source of Truth

## Email Subject Line Format
[SCORE/100 · TIER] New Workflow Audit — FIRSTNAME L. at COMPANY

Examples:
- [90/100 · Ready for Transformation] New Workflow Audit — Sarah M. at Clearwater Consulting
- [53/100 · Automation Potential Identified] New Workflow Audit — James T. at Horizon Partners
- [30/100 · Workflow Foundations] New Workflow Audit — Dana R. at Apex Group

## Delay: 30 minutes after submission

## Email Body Template

---
NEW WORKFLOW AUDIT SUBMISSION

Name: {first_name}
Company: {company_name}
Role: {Q1}
Email: {email}
Score: {score} / 100 — {tier_label}
Submitted: {submission_datetime}

---

COMPANY PROFILE
Employees: {Q2}
Revenue: {Q3}
Decision-maker level: {Q1}
{IF Q1 = "Manager" OR "Director / Head of Department": "⚠️ Note: This person likely needs sign-off from a VP or above. Ask early who else is part of the decision."}

---

WORKFLOW IDENTIFIED
Category: {Q4}
Team involved: {Q5}
Frequency: {Q6}
Hours/week: {Q7}
Current state: {Q8}
Primary cost: {Q9}

---

CALCULATED ESTIMATE
Estimated annual labor cost: {annual_cost_range}

Annual cost lookup table (use the Q7 row):
| Q7 Answer | Annual Hours | Cost Range |
|---|---|---|
| Less than 5 hours | 150+ hrs/yr | $7,500–$11,000 |
| 5–10 hours | 375+ hrs/yr | $19,000–$28,000 |
| 11–20 hours | 750+ hrs/yr | $38,000–$56,000 |
| 21–40 hours | 1,500+ hrs/yr | $75,000–$113,000 |
| More than 40 hours | 2,250+ hrs/yr | $113,000–$169,000 |

(Conservative range: $50–$75/hr blended knowledge worker rate × hours midpoint × 50 weeks)

---

BUYING READINESS
Prior solution attempts: {Q10}
If fixed tomorrow, they care most about: {Q11}

---

SUGGESTED TALKING POINTS

{IF Q9 = "Scale — we can't grow without adding headcount"}
→ Lead with the growth ceiling: "What does your team look like in 18 months if this workflow doesn't change?"

{IF Q9 = "Money — the labor cost is significant"}
→ Lead with ROI: "What would you do with $[cost estimate] back in the budget each year?"

{IF Q9 = "Errors — mistakes happen and they're expensive"}
→ Lead with risk: "What's the cost when one of those errors gets through?"

{IF Q9 = "Time — it creates constant bottlenecks"}
→ Lead with velocity: "What decisions or projects are waiting on this process right now?"

{IF Q9 = "Team morale — it's tedious and people hate it"}
→ Lead with retention: "How long has the team been living with this? What's the turnover risk if it doesn't improve?"

{IF Q10 = "Yes — we've looked but haven't found the right fit"}
→ Ask what they evaluated and why it didn't fit before presenting anything. This is your differentiation moment.

{IF Q10 = "Yes — we tried something and it didn't work"}
→ Ask what went wrong specifically. Understanding the failure is more valuable than your pitch.

{IF Q1 = "Manager" OR "Director / Head of Department"}
→ Map the buying committee early: "Who else would need to be part of a conversation like this?"

{IF Q1 = "Owner / Founder / CEO" OR "C-Suite or VP"}
→ They can likely greenlight. Keep the conversation at strategic ROI — not implementation detail.

{IF score >= 85}
→ 🔥 HOT LEAD. This is a same-day outreach. Don't let this one sit.

---

CALENDAR STATUS: {IF booked: "✅ Booked — [date/time]" ELSE: "❌ Did not book as of 30 min post-submission"}
EMAIL REPORT: {IF requested: "✅ Requested" ELSE: "❌ Not requested"}

---
```

- [ ] **Step 4: Create `content/follow-up-sequences.md`**

Create the file with this exact content:

```markdown
# Follow-Up Email Sequences — Source of Truth

---

## Sequence 1: Respondent Brief Email
Trigger: Respondent submits email on results page CTA ("Send my Brief")
Sent by: ScoreApp automation, immediately on email submission
From name: [Your name or company name]
Subject: Your Workflow Automation Brief — {Q4 workflow type}

Body:

Hi {first_name},

Here's your Workflow Automation Brief, based on the audit you just completed.

YOUR SCORE: {score}/100 — {tier_label}

WHAT YOU IDENTIFIED:
You flagged {Q4} as your biggest manual workflow challenge — a process that your team collectively spends {Q7} on each week. Based on your answers, that adds up to an estimated {annual_cost_low}–{annual_cost_high} in annual labor cost.

WHAT THIS MEANS:
{Insert the same personalized insight paragraph from the results page — matched to Q4 + Q9}

WHAT TENDS TO HAPPEN NEXT:
Organizations in your situation typically find that the biggest unlock isn't more software — it's rethinking how the workflow is structured, then layering in automation where it makes the most impact. The difference between workflows that get automated successfully and those that don't usually comes down to having a clear picture of the process before touching any tools.

WANT TO TALK THROUGH IT?
If you'd like a focused 30-minute conversation about what this could look like for your specific situation — no pitch, just an honest look at what's possible — you can book a time here:

[Calendly link]

Otherwise, save this email. It's a useful reference the next time this workflow comes up in your planning conversations.

— [Your name]

---

## Sequence 2: Non-Booker Follow-Up
Trigger: Respondent submitted email but did not book a call within 5 days
Sent by: ScoreApp automation or manual (depending on platform capability) — 5 days after email submission
From name: [Your name]
Subject: Re: Your Workflow Automation Brief

Body:

Hi {first_name},

Checking in on the audit you completed last week.

A lot of people who go through the Workflow Automation Audit find it useful to have a conversation once they've had a chance to sit with the results. If that's where you are — or if you've shared it with someone else on your team and questions have come up — I'm happy to spend 30 minutes talking through it.

No prep required. Just bring whatever's on your mind.

[Calendly link]

— [Your name]

---

## Sequence 3: Nurture Email for 0–40 Tier Leads
Trigger: Score 0–40 on quiz submission
Sent by: ScoreApp automation — 14 days after submission
From name: [Your name or company name]
Subject: A follow-up on your Workflow Automation Audit

Body:

Hi {first_name},

You completed the Workflow Automation Audit a couple of weeks ago and scored in the Workflow Foundations range — which means the timing may not be quite right yet, but the thinking is clearly there.

Most organizations we work with weren't quite ready the first time they looked at this. The ones that ended up moving forward typically revisited the conversation 6–12 months later, when a specific trigger showed up — a key hire, a growth milestone, or a point where the manual process finally became the bottleneck they couldn't ignore.

When that moment comes for your team, the work you did identifying {Q4} as your biggest friction point will still be relevant.

If anything changes in the meantime — or if you'd just like to think out loud about the roadmap — I'm easy to reach.

— [Your name]
```

- [ ] **Step 5: Verify all four files are complete**

Open each file. Confirm no placeholder text (no "TBD", "TODO", "[insert]", or blank sections). Confirm all 35 insight paragraphs are present in `results-copy.md` — count them. Confirm the cost lookup table in the internal brief matches the values in `quiz-questions.md`.

---

## Task 3: Configure Quiz Questions & Scoring in ScoreApp

**Files:**
- Read: `content/quiz-questions.md`

**Interfaces:**
- Consumes: `content/quiz-questions.md` (question text and point values)
- Produces: 12 configured questions in ScoreApp, ready for preview

- [ ] **Step 1: Add Q1 — Role**

In ScoreApp, open your quiz and add Question 1. Select type: Single Choice. Enter the question text and all five answer options exactly as written in `quiz-questions.md`. Assign point values as specified. Do not add any other answers.

- [ ] **Step 2: Add Q2 — Employee Count**

Add Question 2. Single Choice. Enter text and six answer options from `quiz-questions.md` with exact point values. Confirm 51–100 and 101–200 both receive 15 points.

- [ ] **Step 3: Add Q3 — Revenue**

Add Question 3. Single Choice. Enter text and five answer options with point values from `quiz-questions.md`. Confirm $5M–$20M and $20M–$50M both receive 12 points.

- [ ] **Step 4: Add Q4 — Workflow Category**

Add Question 4. Single Choice. Enter text and all seven answer options with point values. Confirm Reporting and Documents both receive 10 pts, Scheduling receives 7 pts.

- [ ] **Step 5: Add Q5 — People Involved**

Add Question 5. Single Choice. Enter text and four answer options with point values. Confirm 6–15 people receives the highest score (12 pts).

- [ ] **Step 6: Add Q6 — Frequency**

Add Question 6. Single Choice. Enter text and five answer options. Confirm "Multiple times per day" and "Daily" both receive 12 pts.

- [ ] **Step 7: Add Q7 — Hours Per Week**

Add Question 7. Single Choice. Enter text and five answer options with point values. Double-check: this question drives the dynamic cost calculation on the results page. The answer text must exactly match what you'll use as the conditional trigger in Task 4.

- [ ] **Step 8: Add Q8 — Current State**

Add Question 8. Single Choice. Enter text and five answer options with point values. Confirm "Entirely manual" receives 12 pts and "Works fine" receives 2 pts.

- [ ] **Step 9: Add Q9 — Primary Cost**

Add Question 9. Single Choice. Enter text and five answer options with point values. Confirm "Money" and "Scale" are tied at 10 pts each.

- [ ] **Step 10: Add Q10 — Prior Attempts**

Add Question 10. Single Choice. Enter text and four answer options with point values. Confirm "Looked but no fit" receives 12 pts (highest).

- [ ] **Step 11: Add Q11 — Magic Wand (no scoring)**

Add Question 11. Single Choice. Set scoring to ZERO for all answers (or disable scoring for this question if ScoreApp supports it). Enter the five answer options exactly as written.

- [ ] **Step 12: Add Q12 — Contact Capture**

Add Question 12. Set type to Contact or Form. Add three fields: First Name (required), Company Name (required), Email Address (required). Enter the question text and subtext exactly as written. Set scoring to ZERO.

- [ ] **Step 13: Preview the full question flow**

Use ScoreApp's preview mode to take the quiz yourself, end to end. Confirm: questions appear in order 1–12, all answer options are present and spelled correctly, Q11 and Q12 do not show point values to the respondent, and Q12 collects all three fields.

- [ ] **Step 14: Verify score normalization**

In preview, answer the highest-scoring option for every question (Q1: Owner/CEO, Q2: 51–100, Q3: $5M–$20M, Q4: Reporting, Q5: 6–15 people, Q6: Daily, Q7: 40+ hrs, Q8: Entirely manual, Q9: Money, Q10: Looked but no fit). Confirm the displayed score is 89–91 (raw 112/125 = 89.6). If the score shows 112 instead of ~90, you need to enable score normalization in ScoreApp settings before proceeding.

---

## Task 4: Configure Results Page in ScoreApp

**Files:**
- Read: `content/results-copy.md`

**Interfaces:**
- Consumes: All copy from `content/results-copy.md`, Q7 answer for conditional benchmark text, Q4+Q9 answers for personalized insight
- Produces: Fully configured results page showing score, tier, benchmark, insight, and both CTAs

- [ ] **Step 1: Configure score display**

In ScoreApp results page settings, enable the score display widget. Set it to show the numeric score prominently (large font). Enable the tier label display below the score.

- [ ] **Step 2: Map score tiers**

Define the four score ranges and their labels:
- 0–40: "Workflow Foundations"
- 41–65: "Automation Potential Identified"
- 66–84: "High Automation Opportunity"
- 85–100: "Ready for Transformation"

- [ ] **Step 3: Enter tier headlines and sub-headlines**

For each tier, enter the headline and sub-headline from `results-copy.md`. Use ScoreApp's conditional content blocks — one block per tier, shown only when the score falls in that range. Copy text exactly; do not paraphrase.

- [ ] **Step 4: Add static benchmark stat**

Add a text block visible to all respondents: the static benchmark sentence from `results-copy.md`. Place it immediately below the tier sub-headline, before the dynamic benchmark stat. Include the source note ("McKinsey Global Institute, 2021") as small text beneath it.

- [ ] **Step 5: Add dynamic benchmark stat (conditional on Q7)**

Add five conditional text blocks, each triggered by the respondent's Q7 answer. Use the exact copy from the "Dynamic Benchmark" section of `results-copy.md`. Each block shows only for its matching Q7 answer. Test that all five conditional blocks are saved correctly before moving on.

- [ ] **Step 6: Add personalized insight (conditional on Q4)**

Add seven conditional content blocks, each triggered by the respondent's Q4 (workflow category) answer. For each workflow type, use the corresponding five-variant copy from `results-copy.md`. If ScoreApp supports two-level conditional logic (Q4 AND Q9), configure all 35 variants. If only single-question logic is supported, configure the 7 Q4-only variants using the "Time (bottlenecks)" variant for each workflow type as the default — it is the most universally relevant.

- [ ] **Step 7: Configure primary CTA — email brief**

Add the email capture CTA block using the copy from `results-copy.md`. Headline: "Get your Workflow Automation Brief." Body copy as specified. Button text: "Send my Brief." Configure the email field to pre-fill from Q12 if ScoreApp supports it (check platform settings). Connect this to the Sequence 1 respondent brief email (configured in Task 6).

- [ ] **Step 8: Configure secondary CTA — Calendly embed**

Add the Calendly embed below the primary CTA. Use your Calendly scheduling link for the Workflow Strategy Call event. Enter the CTA headline ("Book a free 30-minute Workflow Strategy Call") and body copy ("Talk through your results with our team. No pitch — just a focused conversation about what's possible.") above the embed widget.

- [ ] **Step 9: Handle 0–40 tier CTA difference**

For the Workflow Foundations tier (0–40), replace the secondary Calendly CTA with the nurture note from `results-copy.md`: "Want to revisit this in 6 months as your organization grows? Save this page and check back in — the opportunity window often opens faster than people expect." Do not show the calendar embed to this tier.

- [ ] **Step 10: Preview all four tier results pages**

Run four preview completions, one for each tier. Use the following answer sets to hit each tier:

**Tier 0–40 (score ~30):** Manager + Under 25 + Under $1M + Approval processes + Just me + Quarterly + Less than 5 hrs + Works fine + Morale + In progress + [any] + test@test.com
Confirm: "Workflow Foundations" label, no calendar embed, nurture note visible.

**Tier 41–65 (score ~53):** Director + 25–50 + $1M–$5M + Scheduling + 2–5 people + Monthly + 5–10 hrs + Works fine + Morale + Tried didn't work + [any] + test@test.com
Confirm: "Automation Potential Identified" label, both CTAs visible.

**Tier 66–84 (score ~82):** C-Suite + 101–200 + $20–$50M + Documents + 6–15 people + Weekly + 11–20 hrs + Partially automated + Scale + Looked no fit + [any] + test@test.com
Confirm: "High Automation Opportunity" label, correct benchmark stat for 11–20 hrs, both CTAs visible.

**Tier 85–100 (score ~90):** Owner/CEO + 51–100 + $5–$20M + Reporting + 6–15 people + Daily + 21–40 hrs + Entirely manual + Money + Looked no fit + [any] + test@test.com
Confirm: "Ready for Transformation" label, correct benchmark stat for 21–40 hrs, Reporting + Money insight paragraph visible.

---

## Task 5: Configure Internal Brief Email in ScoreApp

**Files:**
- Read: `content/internal-brief-template.md`

**Interfaces:**
- Consumes: Internal brief template, all Q1–Q11 merge fields, score and tier merge fields
- Produces: Automated internal email sent 30 minutes after every submission

- [ ] **Step 1: Create internal notification email**

In ScoreApp, go to Notifications. Create a new notification email. Set recipient to your team email address(es). Set delay to 30 minutes.

- [ ] **Step 2: Configure subject line**

Set the subject to: `[{score}/100 · {tier_label}] New Workflow Audit — {first_name} {last_name_initial}. at {company_name}`

Verify ScoreApp supports all these merge fields. If last name initial is not a native merge field, use first name and company name only: `[{score}/100 · {tier_label}] New Workflow Audit — {first_name} at {company_name}`

- [ ] **Step 3: Build email body**

Enter the internal brief template from `content/internal-brief-template.md` into the ScoreApp notification email body. Map each `{field}` to its corresponding ScoreApp merge field:
- `{first_name}` → Q12 first name
- `{company_name}` → Q12 company name
- `{email}` → Q12 email
- `{Q1}` through `{Q11}` → corresponding question answers
- `{score}` → calculated score
- `{tier_label}` → tier name
- `{submission_datetime}` → submission timestamp

- [ ] **Step 4: Configure conditional decision-maker flag**

In the COMPANY PROFILE section of the email, add a conditional note that appears only when Q1 = "Manager" or "Director / Head of Department":
"⚠️ Note: This person likely needs sign-off from a VP or above. Ask early who else is part of the decision."

If ScoreApp does not support conditional logic in notification emails, add a static note that covers both cases: "Check Q1 — if role is Manager or Director, ask early who else is part of the decision."

- [ ] **Step 5: Add cost estimate lookup**

In the CALCULATED ESTIMATE section, either:
(a) Use conditional logic to show the correct cost range from the Q7 lookup table, OR
(b) Show the full lookup table as a static reference and bold the relevant row based on Q7 — whichever ScoreApp supports.

- [ ] **Step 6: Configure conditional talking points**

Add the talking points section using ScoreApp's conditional logic, triggered by Q9 (pain type), Q10 (prior attempts), Q1 (role), and score range. If ScoreApp does not support multiple conditional blocks in notification emails, use this fallback: show all talking points as a static list and add a note: "The most relevant talking point for this lead is determined by their Q9 answer ({Q9}) and Q10 answer ({Q10})."

- [ ] **Step 7: Add calendar status field**

At the bottom of the email, add the calendar status line. ScoreApp cannot know whether the respondent booked a call at the time the 30-minute brief is sent (Calendly bookings are tracked separately). Use this static text:

"CALENDAR STATUS: Check your Calendly notifications — if a booking confirmation arrived from this email address, they booked. If not, they did not book as of [time of this email]."

"EMAIL REPORT: {IF email CTA was submitted: ✅ Requested ELSE: ❌ Not requested}"

- [ ] **Step 8: Send a test submission**

Complete the quiz with a real email address you control. Use the high-scoring answer set from Task 4 Step 10. Wait 30 minutes. Confirm the internal brief arrives with the correct score, tier, all Q answers populated, and the subject line formatted correctly.

---

## Task 6: Configure Follow-Up Email Sequences

**Files:**
- Read: `content/follow-up-sequences.md`

**Interfaces:**
- Consumes: Three email sequences from `content/follow-up-sequences.md`
- Produces: Three automated emails configured in ScoreApp (or your email tool)

- [ ] **Step 1: Configure Sequence 1 — Respondent Brief Email**

In ScoreApp, create a respondent-facing automated email triggered when someone submits the primary CTA email form on the results page. Set delay to immediate (0 minutes). Enter the subject and body from Sequence 1 in `follow-up-sequences.md`. Map merge fields ({first_name}, {Q4}, {Q7}, {score}, {tier_label}, cost estimates, insight paragraph, Calendly link). Test by submitting a test email on the results page and confirming receipt within 2 minutes.

- [ ] **Step 2: Configure Sequence 2 — Non-Booker Follow-Up**

If ScoreApp supports time-delayed follow-up emails based on a condition (email submitted but no Calendly booking within 5 days), configure this in ScoreApp. If ScoreApp does not support this conditional timing, note it as a manual task: your team checks submissions weekly and sends this email manually to anyone who requested a brief 5+ days ago and has not booked. Enter the subject and body from Sequence 2 in `follow-up-sequences.md`.

- [ ] **Step 3: Configure Sequence 3 — Nurture Email for 0–40 Tier**

In ScoreApp, create an automated email triggered when the respondent's score is in the 0–40 range, sent 14 days after submission. Enter the subject and body from Sequence 3 in `follow-up-sequences.md`. Map {first_name} and {Q4} merge fields. If ScoreApp does not support score-conditional automated emails, this becomes a manual task: your team tags low-scoring submissions and sends this email manually at the 14-day mark.

- [ ] **Step 4: Test Sequence 1**

Submit the quiz with a test email, submit the results page email CTA, and confirm Sequence 1 arrives correctly formatted within 2 minutes. Check that the Calendly link in the email is correct and functional.

---

## Task 7: End-to-End Testing

**Files:**
- Read: `content/quiz-questions.md` (for score verification)

**Interfaces:**
- Consumes: All configured ScoreApp settings and email sequences
- Produces: Verified, fully functional quiz ready for launch

- [ ] **Step 1: Run four complete test submissions**

Use four real email addresses (or email aliases) and the answer sets below. For each: complete the quiz fully, review the results page, request the brief, and wait 35 minutes for the internal email.

**Test A — Hot lead (~90):**
Owner/CEO + 51–100 employees + $5M–$20M + Reporting & data aggregation + 6–15 people + Daily + 21–40 hrs + Entirely manual + Money + Looked but no fit + Scaling without hiring + [test email A]

**Test B — High opportunity (~82):**
C-Suite or VP + 101–200 + $20M–$50M + Document creation & review + 6–15 people + Weekly + 11–20 hrs + Partially automated + Scale + Looked but no fit + Time back for team + [test email B]

**Test C — Warm lead (~53):**
Director + 25–50 + $1M–$5M + Scheduling & coordination + 2–5 people + Monthly + 5–10 hrs + Works fine + Morale + Tried didn't work + Cutting costs + [test email C]

**Test D — Low score (~30):**
Manager + Under 25 + Under $1M + Approval processes + Just me + Quarterly + Less than 5 hrs + Works fine + Morale + In progress + Visibility + [test email D]

- [ ] **Step 2: Verify results pages for all four tests**

For each test, check:
- [ ] Correct score displayed (within 2 points of expected)
- [ ] Correct tier label shown
- [ ] Correct tier headline and sub-headline
- [ ] Static benchmark stat present
- [ ] Dynamic benchmark stat matches Q7 answer
- [ ] Personalized insight paragraph matches Q4 (and Q9 if two-level conditional was configured)
- [ ] Primary email CTA present (pre-filled email if supported)
- [ ] Calendar embed present on Tests A, B, C; nurture note present on Test D; no calendar embed on Test D

- [ ] **Step 3: Verify internal briefs for all four tests**

Wait 35 minutes after each submission, then check the team inbox. For each brief:
- [ ] Subject line shows correct score, tier, name, and company
- [ ] All Q1–Q11 answers populated correctly
- [ ] Cost estimate range matches Q7 answer (use lookup table in brief template to verify)
- [ ] Talking points correspond to Q9 and Q10 answers
- [ ] Decision-maker flag present for Tests C and D (Director and Manager roles)
- [ ] Hot lead flag (🔥) present for Test A only

- [ ] **Step 4: Test Calendly booking flow**

Using Test A's results page, click "View available times" and book a test appointment. Confirm:
- [ ] Calendly booking confirmation email sent to team immediately (before the 30-min brief)
- [ ] Calendly intake question ("Which workflow did you identify?") appears during booking
- [ ] Test appointment appears on the team calendar

- [ ] **Step 5: Verify respondent brief email (Sequence 1)**

Using Test B's results page, submit the email CTA. Confirm the brief email arrives within 2 minutes, the personalized insight paragraph matches Test B's Q4 (Document creation), and the Calendly link is functional.

- [ ] **Step 6: Mobile responsiveness check**

Open the quiz on a mobile phone (or use your browser's mobile emulation). Complete the full quiz. Confirm: all answer options are readable and tappable, Q12 fields are usable on mobile keyboard, and the results page displays correctly at mobile width (score, benchmark, insight, and CTAs all visible without horizontal scrolling).

---

## Task 8: Pre-Launch Checklist

**Files:**
- Read: `content/results-copy.md` (for benchmark citation)

**Interfaces:**
- Produces: Quiz link ready to share publicly

- [ ] **Step 1: Verify benchmark citation**

Open a browser and locate the McKinsey source for the "23% of workweek" stat. Search "McKinsey knowledge worker automation percentage 2021." Confirm the figure and the correct report name. Update `content/results-copy.md` and the static benchmark block in ScoreApp if the figure or citation needs adjustment.

- [ ] **Step 2: Confirm $50/hr blended rate**

Review your typical client profile. Knowledge workers at companies with $5M–$50M revenue and 50–200 employees typically earn $60,000–$100,000/year ($29–$48/hr). At a 1.3x fully-loaded cost multiplier, blended cost is $38–$62/hr. The $50/hr assumption is accurate. If your clients skew higher (e.g., finance, law), adjust to $65/hr low / $90/hr high and update all five dynamic benchmark stats in both `content/results-copy.md` and ScoreApp.

- [ ] **Step 3: Confirm submission storage location**

In ScoreApp, confirm that all submissions are stored in the ScoreApp dashboard with all answers visible. If you need submissions in a CRM or spreadsheet, configure the ScoreApp integration (native integrations with HubSpot, Salesforce, and Google Sheets are available on paid plans). Decide and set up before launch so no submissions are lost.

- [ ] **Step 4: Set quiz status to Published**

In ScoreApp, change the quiz from Draft to Published. Copy the public quiz URL.

- [ ] **Step 5: Test the published URL**

Open the published URL in an incognito browser window. Confirm the quiz loads correctly, the title and subtitle are displayed, and you can complete a full submission. This confirms the live version matches what you tested in Tasks 3–7.

- [ ] **Step 6: Share with one internal team member for a final read-through**

Have someone on your team take the quiz as if they were a prospect. Ask them to flag anything that feels off — confusing questions, awkward copy, or results that don't match their answers. Make any final copy adjustments in ScoreApp and in the corresponding content file.

- [ ] **Step 7: Quiz is live — document the share link**

Record the public quiz URL in a shared location your team can access. This is the link that goes in email signatures, LinkedIn posts, outbound campaigns, and any other distribution channel.

---

## Appendix: Score Calculation Reference

Raw maximum points = 125. ScoreApp displays normalized score (raw ÷ 125 × 100).

| Test Case | Raw pts | Displayed score | Expected tier |
|---|---|---|---|
| All max answers | 112 | ~90 | Ready for Transformation |
| Strong but not perfect | 103 | ~82 | High Automation Opportunity |
| Mid-range | 66 | ~53 | Automation Potential Identified |
| Low fit | 37 | ~30 | Workflow Foundations |

Use this table to sanity-check ScoreApp's score output during testing (Task 7, Step 2).
