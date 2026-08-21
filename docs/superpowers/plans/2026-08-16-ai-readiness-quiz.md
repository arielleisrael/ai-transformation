# AI Readiness Quiz — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch a 12-question AI Readiness Assessment on ScoreApp that assigns prospects a Myers-Briggs-style AI archetype, scores their overall AI transformation opportunity (0–100), and routes qualified prospects to a Diagnostic booking — all without manual screening by Uzziah or Arielle.

**Supersedes:** `2026-08-13-workflow-audit-lead-magnet.md`

**Design spec:** `docs/superpowers/specs/2026-08-16-ai-readiness-quiz-design.md` — read this before starting.

**Architecture:** All copy lives in local content files (already written). Configuration is entered into ScoreApp and Calendly from those files. ScoreApp handles scoring, archetype assignment, results pages, email capture, and delayed internal notifications. Calendly handles scheduling.

**Tech Stack:** ScoreApp (quiz platform), Calendly (scheduling)

---

## Global Constraints

- Quiz title: "The AI Readiness Assessment" — do not change
- Quiz subtitle: "Discover where your company stands on the AI readiness journey — and what's possible from here."
- Two scoring dimensions run in parallel: AI Readiness Subscore (Q3+Q4+Q5, max 45) drives archetype; Overall Score (all questions, normalized 0–100) drives the displayed number and routing
- Raw maximum points: 146. ScoreApp normalizes to 0–100.
- Blended labor rate for cost calculation: $50/hr (low), $75/hr (high)
- Internal brief sent 30 minutes after submission — NOT immediately
- Calendly booking notification sent to team instantly (separate from the 30-min brief)
- The word "qualify" must never appear in any respondent-facing copy
- No mention of the company's offering on the results page
- Q12 carries zero scoring weight
- AI Observers (Level 1 archetype) never receive the Diagnostic CTA, regardless of overall score

---

## Content Files (already written — verify, do not recreate)

| File | Purpose |
|---|---|
| `content/quiz-questions.md` | All 12 questions, answer options, point values, archetype thresholds, routing table |
| `content/results-copy.md` | Archetype descriptions, stage labels, 35 insight variants, benchmark stats, CTA copy |
| `content/internal-brief-template.md` | Internal email template, talking points logic, cost lookup table |
| `content/follow-up-sequences.md` | Respondent brief email, non-booker follow-up, Observer nurture sequence |

---

## Task 1: Platform Setup & Capability Verification

**Before configuring anything else, determine which scoring approach to use.** The dual-dimension scoring system (subscore for archetype, overall for routing) requires ScoreApp to track Q3+Q4+Q5 independently. This capability check gates everything downstream.

- [ ] **Step 1: Sign up for ScoreApp**

Go to scoreapp.com. Choose the plan that includes: delayed notification emails, conditional copy on results pages, Calendly embed on results pages, contact field pre-fill on the results page CTA, and score-conditional email automation. Verify each capability before entering payment. The "Grow" plan (~$79/month) is the expected tier.

- [ ] **Step 2: Verify subscore tracking (CRITICAL — determines scoring approach)**

Inside ScoreApp, investigate whether the platform supports tracking a subset of questions as an independent subscore separate from the overall score. Specifically: can you define "AI Readiness = Q3 + Q4 + Q5" and use that value to trigger archetype assignment, while the overall score (all questions normalized 0–100) is displayed separately?

If **yes** — proceed with the Primary Scoring Approach. Document the exact ScoreApp feature name and location.

If **no** — use the Fallback Scoring Approach. Update the point values for Q3, Q4, Q5 to 25 points each (instead of 15) in both ScoreApp and `content/quiz-questions.md`. Use overall score thresholds for archetype: 0–24 = Observer, 25–49 = Tinkerer, 50–74 = Catalyst, 75–100 = Architect. See spec Section 5 for full fallback details.

Record which approach you are using here before continuing: ___________________

- [ ] **Step 3: Verify delayed notification support**

In ScoreApp Notifications settings, confirm you can set a delay (in minutes) before the internal notification fires. Set it to exactly 30 minutes. If delay is not configurable, upgrade the plan before proceeding.

- [ ] **Step 4: Verify conditional results page copy**

Confirm you can show different copy blocks on the results page based on a respondent's answer to a specific question. You need this for the 35 personalized insight variants (triggered by Q6 and Q11). If conditional copy is limited to score tier only, note it — you will use Q6 (workflow type) as the single trigger and accept that the 5 Q11 variants collapse to the "Time (bottlenecks)" default per workflow type.

- [ ] **Step 5: Verify results page CTA email pre-fill**

Confirm that the email field on the results page CTA can be pre-filled from the Q12 contact capture field. This prevents respondents from typing their email twice.

- [ ] **Step 6: Set up Calendly**

Go to calendly.com. Create an event type named "AI Workflow ROI Diagnostic." Duration: 30 minutes. Set available hours and buffer time (15 minutes before and after). Block Saturdays and any recurring holy days or commitments. Event description: "A focused 30-minute conversation to examine one workflow from both the business and technical sides — and determine whether there's a real opportunity worth pursuing."

Add one intake question to the Calendly booking form: "Which workflow did you identify in the assessment?" This gives context before the call without requiring manual research.

- [ ] **Step 7: Configure Calendly notifications**

In Calendly, add both Uzziah's and Arielle's email addresses to receive an instant notification when any booking is made. Confirm both are included before proceeding.

- [ ] **Step 8: Create quiz shell in ScoreApp**

Create a new quiz. Set title to "The AI Readiness Assessment" and subtitle as specified in Global Constraints. Save in Draft status. Confirm it appears in your dashboard.

---

## Task 2: Verify Content Files

The four content files are already written. This task confirms they are complete and consistent before you use them as the source of truth for ScoreApp configuration.

- [ ] **Step 1: Verify `content/quiz-questions.md`**

Open the file. Confirm:
- Phase 1 (Q1–Q2), Phase 2 (Q3–Q5), Phase 3 (Q6–Q11), Phase 4 (Q12) are all present
- Q3, Q4, Q5 point values sum to a maximum of 45
- Q6–Q11 point values sum to a maximum of 71
- Q1 + Q2 maximum = 30
- Total raw maximum across all scored questions = 146
- Archetype threshold table is present (0–10 Observer, 11–22 Tinkerer, 23–34 Catalyst, 35–45 Architect)
- Qualification routing table is present (archetype + score thresholds)
- If using Fallback Scoring Approach from Task 1: Q3, Q4, Q5 have been updated to 25 points each

- [ ] **Step 2: Verify `content/results-copy.md`**

Confirm:
- Archetype assignment table is present (Q3+Q4+Q5 → archetype)
- All four archetype stage label sub-headlines are present
- Dynamic benchmark stats exist for all five Q9 answer options
- All 35 personalized insight paragraphs are present (7 workflow types × 5 pain types) — count them
- CTA copy is present for primary CTA, secondary CTA (qualified), and Observer message

- [ ] **Step 3: Verify `content/internal-brief-template.md`**

Confirm:
- Subject line format references archetype, not tier label
- Body references Q3, Q4, Q5 in the AI Readiness Signals section
- Workflow section references Q6–Q11 (not the old Q4–Q9)
- Cost lookup table references Q9 (not Q7)
- Hot lead threshold is ≥ 76 (not 85)

- [ ] **Step 4: Verify `content/follow-up-sequences.md`**

Confirm:
- Sequence 1 subject references Q6 (not Q4)
- Body references Q6 and Q9 merge fields (not Q4 and Q7)
- Sequence 3 (nurture) references Q6 (not Q4)

---

## Task 3: Configure Quiz Questions & Scoring in ScoreApp

**Source:** `content/quiz-questions.md`

**Produces:** 12 configured questions in ScoreApp, ready for preview

### Phase 1: About You

- [ ] **Step 1: Add Q1 — Role**

Question 1, Single Choice. Text: "What's your role at your company?" Five options with points: Owner/Founder/CEO (15), C-Suite or VP (12), Director/Head of Department (8), Manager (4), Individual Contributor (1).

- [ ] **Step 2: Add Q2 — Team Size**

Question 2, Single Choice. Text: "How big is your team?" Six options: Under 25 (2), 25–50 (6), 51–100 (15), 101–200 (15), 201–500 (5), Over 500 (2). Confirm 51–100 and 101–200 are both 15 points.

### Phase 2: Your AI Story

*These three questions form the AI Readiness Subscore. If using Primary Scoring Approach, configure them as the subscore group now. If using Fallback Approach, they are scored at 25 points each instead of 15.*

- [ ] **Step 3: Add Q3 — AI Adoption Breadth**

Question 3, Single Choice. Text: "How would you describe AI adoption across your company right now?" Four options: "A few people are experimenting on their own" (2), "Some teams use AI tools regularly" (8), "Most of our team uses AI as part of how they work" (13), "AI is woven into our operations — it's infrastructure, not just a tool" (15). *Fallback: all values × (25/15) — use 3, 13, 22, 25 instead.*

- [ ] **Step 4: Add Q4 — Leadership AI Strategy**

Question 4, Single Choice. Text: "Where does your leadership stand on AI?" Four options: "No formal strategy yet — mostly individual decisions" (2), "We're starting to discuss it at a leadership level" (6), "We have an AI plan and we're actively working on it" (11), "AI is a top strategic priority with full executive buy-in" (15). *Fallback: 3, 10, 18, 25.*

- [ ] **Step 5: Add Q5 — Current AI ROI**

Question 5, Single Choice. Text: "Honestly — is AI actually moving the needle at your company?" Four options: "We're not really using it yet" (1), "We're using AI tools but haven't seen clear business impact" (5), "We see productivity gains, but nothing that's changed the company overall" (10), "Yes — we can point to real, measurable business results" (15). *Fallback: 2, 8, 17, 25.*

- [ ] **Step 6: Configure archetype assignment from AI Readiness Subscore**

**Primary Scoring Approach:** Configure subscore thresholds for archetype: 0–10 = AI Observer, 11–22 = AI Tinkerer, 23–34 = AI Catalyst, 35–45 = AI Architect.

**Fallback Scoring Approach:** Configure overall score thresholds for archetype: 0–24 = AI Observer, 25–49 = AI Tinkerer, 50–74 = AI Catalyst, 75–100 = AI Architect. (These will be applied in Task 4 during results page configuration.)

### Phase 3: Your Biggest Opportunity

- [ ] **Step 7: Add Q6 — Workflow Category**

Question 6, Single Choice. Text: "Think about one workflow that consistently costs more time, effort, or money than it should. Which category fits best?" Seven options: Reporting & data aggregation (10), Document creation & review (10), Client or customer communications (9), Research & analysis (9), Approval & review processes (8), Employee or client onboarding (8), Scheduling & coordination (7). This answer anchors the 35 personalized insight variants in Task 4.

- [ ] **Step 8: Add Q7 — People Involved**

Question 7, Single Choice. Text: "How many people on your team touch this workflow?" Four options: Just me (3), 2–5 people (8), 6–15 people (12), 16 or more people (10).

- [ ] **Step 9: Add Q8 — Frequency**

Question 8, Single Choice. Text: "How often does this workflow run?" Five options: Multiple times per day (12), Daily (12), Weekly (10), Monthly (6), Quarterly (2). Confirm "Multiple times per day" and "Daily" are both 12 points.

- [ ] **Step 10: Add Q9 — Hours Per Week**

Question 9, Single Choice. Text: "How many hours per week does your team collectively spend on this workflow?" Five options with points and economic calculation midpoints:

| Answer | Points | Hours midpoint | Annual range |
|---|---|---|---|
| Less than 5 hours | 2 | 3 hrs | $7,500–$11,250/yr |
| 5–10 hours | 6 | 7.5 hrs | $18,750–$28,125/yr |
| 11–20 hours | 10 | 15 hrs | $37,500–$56,250/yr |
| 21–40 hours | 12 | 30 hrs | $75,000–$112,500/yr |
| More than 40 hours | 15 | 45 hrs | $112,500–$168,750/yr |

This answer drives the dynamic benchmark calculation on the results page. The answer text must exactly match what you use as the conditional trigger in Task 4.

- [ ] **Step 11: Add Q10 — Current State**

Question 10, Single Choice. Text: "How would you describe where this workflow stands today?" Five options: "Entirely manual — spreadsheets, email, or paper" (12), "Partially automated but still requires significant human effort" (10), "We have tools, but they don't talk to each other" (10), "It works, but it's complex and prone to bottlenecks" (6), "It mostly works fine — I'm just exploring options" (2).

- [ ] **Step 12: Add Q11 — Primary Cost**

Question 11, Single Choice. Text: "What does this workflow cost your company most?" Five options: "Money — the labor cost is significant" (10), "Scale — we can't grow without adding headcount" (10), "Time — it creates constant bottlenecks" (9), "Errors — mistakes happen and they're expensive" (9), "Team morale — it's tedious and people hate it" (8). This answer drives internal brief talking points.

### Phase 4: Your Results

- [ ] **Step 13: Add Q12 — Contact Capture**

Question 12, Contact/Form type. Text: "Almost done. Where should we send your results?" Subtext: "We'll send your personalized AI Readiness Brief here — your archetype, your score, and a summary of your biggest opportunity." Three required fields: First name, Company name, Email address. Set scoring to zero.

- [ ] **Step 14: Preview the full question flow**

Use ScoreApp's preview mode. Take the quiz end to end. Confirm: questions appear in order 1–12, all answer options present and spelled correctly, Q12 collects all three fields and carries no point values.

- [ ] **Step 15: Verify score normalization and archetype assignment**

Run two preview completions:

**Max-score test** (all highest options):
Q1: Owner/CEO, Q2: 51–100, Q3: AI is infrastructure, Q4: Top strategic priority, Q5: Measurable results, Q6: Reporting, Q7: 6–15 people, Q8: Daily, Q9: 21–40 hrs, Q10: Entirely manual, Q11: Money.
Expected: Raw 143/146 → displayed score ~98. AI Readiness Subscore 45 → AI Architect.

**Observer test** (minimum AI readiness, high workflow pain):
Q1: Owner/CEO, Q2: 101–200, Q3: A few people experimenting, Q4: No strategy, Q5: Not using yet, Q6: Reporting, Q7: 16+ people, Q8: Multiple times/day, Q9: More than 40 hrs, Q10: Entirely manual, Q11: Money.
Expected: Raw ~104/146 → displayed score ~71. AI Readiness Subscore 5 → AI Observer.

Confirm both archetype and score display correctly before proceeding to Task 4.

---

## Task 4: Configure Results Page in ScoreApp

**Source:** `content/results-copy.md`

**Produces:** Fully configured results page showing archetype (primary), score (secondary), benchmark stats, personalized insight, and CTAs — with correct routing for all four archetypes.

- [ ] **Step 1: Configure archetype as the primary results display**

In ScoreApp results page settings, configure the primary display to show the archetype name and tagline. This is the first thing the respondent sees — larger than the score. Set up four conditional blocks, one per archetype:

| Condition | Display |
|---|---|
| AI Architect | Name + tagline + 2–3 sentence identity + recognition description |
| AI Catalyst | Name + tagline + 2–3 sentence identity + recognition description |
| AI Tinkerer | Name + tagline + 2–3 sentence identity + recognition description |
| AI Observer | Name + tagline + 2–3 sentence identity + recognition description |

Use the archetype descriptions from `content/results-copy.md` (or the Archetypes reference artifact). Copy text exactly — do not paraphrase.

- [ ] **Step 2: Configure score as the secondary display**

Below the archetype display, show the numeric score (0–100) and its stage label. Four stage labels: Early Stage (0–35), Growth Stage (36–55), High Opportunity (56–75), Ready for Transformation (76–100).

Add a one-sentence dynamic description beneath the score. This pulls from Q6 (workflow type) + Q11 (cost type) + Q8 (frequency). If ScoreApp supports three-variable conditional copy, configure it. If not, use Q6 + Q11 as the trigger pair and use frequency as static context in the sentence template: "Your results reflect a [Q8 frequency] [Q6 workflow type] workflow with [Q11 cost type] — one of the most consistently addressable AI transformation opportunities we see."

- [ ] **Step 3: Add static benchmark stat**

Add a text block visible to all respondents below the archetype and score: the static benchmark sentence from `content/results-copy.md`. Include the source citation as small text. This block is not conditional.

- [ ] **Step 4: Add dynamic benchmark stat (conditional on Q9)**

Add five conditional text blocks, each triggered by the respondent's Q9 (hours/week) answer. Use the exact copy from the Dynamic Benchmark section of `content/results-copy.md`. One block per Q9 answer option. Test that all five save correctly.

- [ ] **Step 5: Add personalized insight paragraph (conditional on Q6 and Q11)**

Add conditional content blocks for the 35 insight paragraphs, triggered by Q6 (workflow type) and Q11 (pain type). Copy from `content/results-copy.md`. If ScoreApp supports two-question conditional logic, configure all 35 variants. If only single-question logic is supported, configure the 7 Q6-only variants using the "Time (bottlenecks)" variant for each workflow type as the universal default.

- [ ] **Step 6: Configure primary CTA — email brief (all respondents)**

Add the email capture CTA block: Headline "Get your AI Readiness Brief," body copy and button text from `content/results-copy.md`. Configure the email field to pre-fill from Q12 if the platform supports it. Connect to Sequence 1 (respondent brief email, configured in Task 6).

- [ ] **Step 7: Configure secondary CTA — Diagnostic booking (qualified respondents only)**

This CTA appears only when the respondent's archetype AND score meet the qualification threshold. Configure conditional display:

| Show Diagnostic CTA when: |
|---|
| Archetype = AI Architect AND Score ≥ 40 |
| Archetype = AI Catalyst AND Score ≥ 45 |
| Archetype = AI Tinkerer AND Score ≥ 55 |
| Archetype = AI Observer → NEVER show Diagnostic CTA |

When shown: Headline "Book a free 30-minute AI Workflow ROI Diagnostic," body copy and button text from `content/results-copy.md`. Embed the Calendly scheduling link for the AI Workflow ROI Diagnostic event.

If ScoreApp cannot support compound conditional logic (archetype AND score), use this fallback: show the Diagnostic CTA for all archetypes except Observer when score ≥ 50, and handle the fine-grained thresholds manually by flagging near-threshold submissions in the internal brief for a manual decision.

- [ ] **Step 8: Configure Observer message (Level 1 archetype only)**

For AI Observer archetype: replace the secondary CTA with the Observer message from `content/results-copy.md`. Do not show the Calendly embed. Do not show the Diagnostic CTA. Show only the primary email CTA and the Observer message.

- [ ] **Step 9: Run five preview completions — one per routing path**

Use these answer sets to verify each path. See Appendix for expected scores.

**Path A — AI Architect, qualified:**
Q1: Owner/CEO, Q2: 51–100, Q3: AI is infrastructure, Q4: Top priority, Q5: Measurable results, Q6: Reporting, Q7: 6–15 people, Q8: Daily, Q9: 21–40 hrs, Q10: Entirely manual, Q11: Money, Q12: test-a@test.com
Expected: AI Architect archetype, score ~98, Diagnostic CTA shown.

**Path B — AI Catalyst, qualified:**
Q1: C-Suite/VP, Q2: 101–200, Q3: Most of team, Q4: Have a plan, Q5: Productivity gains, Q6: Documents, Q7: 6–15 people, Q8: Weekly, Q9: 11–20 hrs, Q10: Partially automated, Q11: Scale, Q12: test-b@test.com
Expected: AI Catalyst archetype, score ~84, Diagnostic CTA shown.

**Path C — AI Tinkerer, qualified (above threshold):**
Q1: Director, Q2: 51–100, Q3: Some teams, Q4: Starting to discuss, Q5: No business impact, Q6: Client comms, Q7: 16+ people, Q8: Daily, Q9: 21–40 hrs, Q10: Tools don't talk, Q11: Time, Q12: test-c@test.com
Expected: AI Tinkerer archetype, score ~71, Diagnostic CTA shown.

**Path D — AI Tinkerer, NOT qualified (below threshold):**
Q1: Manager, Q2: 25–50, Q3: Some teams, Q4: Starting to discuss, Q5: No business impact, Q6: Scheduling, Q7: 2–5 people, Q8: Monthly, Q9: 5–10 hrs, Q10: Works fine, Q11: Morale, Q12: test-d@test.com
Expected: AI Tinkerer archetype, score ~45, NO Diagnostic CTA.

**Path E — AI Observer, high score (must not get Diagnostic CTA):**
Q1: Owner/CEO, Q2: 101–200, Q3: A few people experimenting, Q4: No strategy, Q5: Not using yet, Q6: Reporting, Q7: 16+ people, Q8: Multiple times/day, Q9: More than 40 hrs, Q10: Entirely manual, Q11: Money, Q12: test-e@test.com
Expected: AI Observer archetype, score ~71, NO Diagnostic CTA, Observer message shown.

For each preview: confirm the archetype name and tagline display correctly, the score and stage label are correct, the benchmark stats match the Q9 answer, the insight paragraph matches Q6 (and Q11 if configured), and the CTA logic is correct.

---

## Task 5: Configure Internal Brief Email in ScoreApp

**Source:** `content/internal-brief-template.md`

**Produces:** Automated internal email sent 30 minutes after every submission, with archetype, AI readiness signals, workflow data, talking points, and booking status.

- [ ] **Step 1: Create internal notification email**

In ScoreApp Notifications, create a new notification email. Set recipient to Uzziah and Arielle's email addresses. Set delay to 30 minutes.

- [ ] **Step 2: Configure subject line**

Set the subject to: `[{score}/100 · {archetype}] New AI Readiness Assessment — {first_name} {last_name_initial}. at {company_name}`

If last name initial is not a native merge field, use: `[{score}/100 · {archetype}] New AI Readiness Assessment — {first_name} at {company_name}`

- [ ] **Step 3: Build email body from template**

Enter the internal brief template from `content/internal-brief-template.md`. Map each `{field}` to its ScoreApp merge field:

| Template field | ScoreApp source |
|---|---|
| `{first_name}` | Q12 first name |
| `{company_name}` | Q12 company name |
| `{email}` | Q12 email |
| `{archetype}` | Archetype assignment result |
| `{score}` | Calculated overall score |
| `{stage_label}` | Score tier label |
| `{Q1}` through `{Q11}` | Corresponding question answers |
| `{submission_datetime}` | Submission timestamp |
| `{Q3+Q4+Q5}` | AI Readiness Subscore (if platform exposes it) |

- [ ] **Step 4: Configure decision-maker flag**

In the COMPANY PROFILE section, add a conditional note that appears when Q1 = "Manager" or "Director / Head of Department":
`⚠️ Note: This person likely needs sign-off from a VP or above. Ask early who else is part of the decision.`

If ScoreApp does not support conditional text in notification emails, add a static note: "If Q1 = Manager or Director, map the buying committee early before going further."

- [ ] **Step 5: Configure cost estimate lookup**

In the CALCULATED ESTIMATE section, either:
(a) Use conditional logic to display the correct cost range based on Q9 answer, OR
(b) Display the full lookup table as a static reference with the Q9 answer shown above it so the reader can find the right row

Use the lookup table from `content/internal-brief-template.md`.

- [ ] **Step 6: Configure talking points**

Add the talking points section using conditional logic triggered by Q11 (primary cost), Q4 (leadership strategy), Q5 (AI ROI), and Q1 (role). If ScoreApp does not support multiple conditional blocks in notification emails, show all talking points as a static list and add a header: "Most relevant talking point is determined by Q11 answer: {Q11}."

- [ ] **Step 7: Configure hot lead flag**

Add a conditional block that displays `🔥 HOT LEAD. Same-day outreach. Don't let this one sit.` when overall score ≥ 76.

- [ ] **Step 8: Add calendar and brief status lines**

At the bottom of the email, add:
`CALENDAR STATUS: Check your Calendly notifications — if a booking confirmation arrived from {email}, they booked. If not, they did not book as of the time this email was sent.`
`EMAIL REPORT: {IF email CTA submitted: ✅ Requested ELSE: ❌ Not requested}`

- [ ] **Step 9: Send test submission and verify**

Complete the quiz using the Path A answer set from Task 4. Wait 30 minutes. Confirm the internal brief arrives with: correct score (~98), AI Architect archetype, all Q1–Q11 answers populated correctly, the 🔥 hot lead flag visible, and the subject line formatted correctly.

---

## Task 6: Configure Follow-Up Email Sequences

**Source:** `content/follow-up-sequences.md`

**Produces:** Three automated emails covering respondent brief delivery, non-booker re-engagement, and Observer/low-score nurture.

- [ ] **Step 1: Configure Sequence 1 — Respondent AI Readiness Brief**

In ScoreApp, create an automated respondent-facing email triggered when someone submits their email via the results page primary CTA. Set delay to immediate (0 minutes). Enter subject and body from Sequence 1 in `follow-up-sequences.md`. Map merge fields: `{first_name}`, `{archetype}`, `{stage_label}`, `{score}`, `{Q6}` (workflow type), `{Q9}` (hours/week), cost estimate range, personalized insight paragraph (matched to Q6 + Q11), and Calendly link.

Test by submitting a test email on the results page and confirming receipt within 2 minutes.

- [ ] **Step 2: Configure Sequence 2 — Non-Booker Follow-Up**

If ScoreApp supports time-delayed conditional follow-up (email submitted, no Calendly booking within 5 days), configure it. Enter subject and body from Sequence 2 in `follow-up-sequences.md`.

If ScoreApp does not support this conditional: flag as a manual task. Your team reviews submissions weekly and sends this email to anyone who requested a brief 5+ days ago without booking.

- [ ] **Step 3: Configure Sequence 3 — Observer / Low-Score Nurture**

Create a score-conditional automated email triggered when the respondent is an AI Observer OR when overall score < 35. Set delay to 14 days after submission. Enter subject and body from Sequence 3 in `follow-up-sequences.md`. Map `{first_name}` and `{Q6}` merge fields.

If ScoreApp does not support score-conditional automated emails: flag as a manual task. Tag low-scoring and Observer submissions; send manually at 14 days.

- [ ] **Step 4: Test Sequence 1**

Submit the quiz with a real email address using the Path B answer set. Submit the results page email CTA. Confirm Sequence 1 arrives correctly formatted within 2 minutes, the Calendly link is functional, and the insight paragraph matches the Q6 (Documents) answer.

---

## Task 7: End-to-End Testing

**Produces:** Verified, fully functional quiz across all five routing paths, ready for launch.

Run all five test completions using real email addresses or aliases. Use the answer sets from Task 4, Step 9. For each completion: take the quiz, review the results page, request the brief, and wait 35 minutes for the internal email.

- [ ] **Step 1: Verify results pages (all five paths)**

For each path, confirm:
- [ ] Correct archetype name and tagline displayed
- [ ] Correct score displayed (within 2 points of expected — see Appendix)
- [ ] Correct stage label
- [ ] Stage sub-headline from `results-copy.md` matches
- [ ] Static benchmark stat present
- [ ] Dynamic benchmark stat matches Q9 answer
- [ ] Personalized insight paragraph matches Q6 (and Q11 if two-variable conditional configured)
- [ ] Path A, B, C: Diagnostic CTA and Calendly embed visible
- [ ] Path D: No Diagnostic CTA (score below Tinkerer threshold)
- [ ] Path E: No Diagnostic CTA, Observer message shown (not Calendly embed)
- [ ] Primary email CTA present on all five paths

- [ ] **Step 2: Verify internal briefs (all five paths)**

Wait 35 minutes after each submission, then check the team inbox. For each brief:
- [ ] Subject shows correct score, archetype name, first name, and company
- [ ] AI Readiness Signals section shows Q3, Q4, Q5 answers
- [ ] Workflow section shows Q6–Q11 answers with correct Q numbers
- [ ] Cost estimate range matches Q9 answer
- [ ] Talking points correspond to Q11 answer and other signals
- [ ] Decision-maker flag present on Path D (Manager) — not on Paths A–C or E
- [ ] 🔥 Hot lead flag present on Path A (~98) only

- [ ] **Step 3: Test Calendly booking flow (Path A)**

From Path A's results page, click "View available times" and complete a test booking. Confirm:
- [ ] Instant Calendly booking notification sent to both Uzziah and Arielle
- [ ] Notification arrives before the 30-minute internal brief
- [ ] Intake question ("Which workflow did you identify?") appears during booking
- [ ] Test appointment appears on both team calendars

- [ ] **Step 4: Verify respondent brief email (Sequence 1, Path B)**

Submit the email CTA from Path B's results page. Confirm the AI Readiness Brief email arrives within 2 minutes, references the AI Catalyst archetype, shows the correct Q6 (Documents) insight paragraph, and includes a working Calendly link.

- [ ] **Step 5: Mobile responsiveness check**

Open the quiz on a mobile phone (or browser mobile emulation). Complete the full quiz. Confirm all answer options are readable and tappable, Q12 fields are usable on mobile keyboard, and the results page — including archetype display, score, benchmark, insight, and CTAs — displays correctly without horizontal scrolling.

---

## Task 8: Pre-Launch Checklist

- [ ] **Step 1: Verify benchmark citation**

Search "McKinsey knowledge worker automation percentage" and locate the source for the "23% of workweek" figure. Confirm the statistic and correct citation. Update `content/results-copy.md` and the ScoreApp static benchmark block if needed.

- [ ] **Step 2: Confirm blended labor rate assumption**

Review your typical ICP profile. Knowledge workers at 50–250-employee companies typically earn $60K–$100K/year. At a 1.3x fully-loaded cost multiplier, blended rate is ~$38–$62/hr. The $50/hr assumption is accurate. If your clients skew higher (finance, legal, consulting), adjust to $65/hr low / $90/hr high and update all five dynamic benchmark stats in both `content/results-copy.md` and ScoreApp.

- [ ] **Step 3: Confirm submission storage**

In ScoreApp, confirm all submissions are stored with all answers visible. If you need submissions in a CRM or spreadsheet, configure the ScoreApp integration (HubSpot, Salesforce, or Google Sheets available on paid plans) before launch.

- [ ] **Step 4: Internal team read-through**

Have Uzziah or someone else on the team take the quiz as a prospect. Ask them to flag anything that feels off — confusing questions, awkward phrasing, or results that don't feel accurate. Make any final copy adjustments in both ScoreApp and the corresponding content file.

- [ ] **Step 5: Set quiz to Published**

In ScoreApp, change status from Draft to Published. Copy the public quiz URL. Test the published URL in an incognito window — complete a full submission to confirm the live version matches what you tested.

- [ ] **Step 6: Document the share link**

Record the public quiz URL in a shared team location. This is the link that goes in email signatures, LinkedIn posts, outbound campaigns, and any other distribution channel.

---

## Appendix: Score Calculation Reference

Raw maximum: 146 points. ScoreApp displays: raw ÷ 146 × 100 (rounded).

| Test Path | Key answers | Raw pts | Displayed score | Archetype | Routing |
|---|---|---|---|---|---|
| Path A (Architect, qualified) | CEO, 51–100, all max AI, Reporting, 6–15, Daily, 21–40 hrs, Manual, Money | ~143 | ~98 | AI Architect | Diagnostic CTA ✓ |
| Path B (Catalyst, qualified) | C-Suite, 101–200, Most/Plan/Gains, Docs, 6–15, Weekly, 11–20 hrs, Partial, Scale | ~123 | ~84 | AI Catalyst | Diagnostic CTA ✓ |
| Path C (Tinkerer, qualified) | Director, 51–100, Some/Starting/No impact, Comms, 16+, Daily, 21–40 hrs, Tools, Time | ~104 | ~71 | AI Tinkerer | Diagnostic CTA ✓ |
| Path D (Tinkerer, not qualified) | Manager, 25–50, Some/Starting/No impact, Scheduling, 2–5, Monthly, 5–10 hrs, Fine, Morale | ~66 | ~45 | AI Tinkerer | No CTA (< 55) |
| Path E (Observer, high pain) | CEO, 101–200, Few/No strategy/Not using, Reporting, 16+, Multiple/day, 40+ hrs, Manual, Money | ~104 | ~71 | AI Observer | No CTA (Observer) |

Use this table to sanity-check ScoreApp's score output and archetype assignment during Task 4 and Task 7.

**AI Readiness Subscore reference (Primary Scoring Approach):**

| Q3 pts | Q4 pts | Q5 pts | Subscore | Archetype |
|---|---|---|---|---|
| 2 | 2 | 1 | 5 | AI Observer |
| 8 | 6 | 5 | 19 | AI Tinkerer |
| 13 | 11 | 10 | 34 | AI Catalyst |
| 15 | 15 | 15 | 45 | AI Architect |
