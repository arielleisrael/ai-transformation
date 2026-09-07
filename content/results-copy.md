# Results Page Copy — Source of Truth

**Version 2.2 — 2026-09-01.** Diagnostic CTA now appears twice per qualified result page — see §CTA Copy.

Archetype hero copy lives in `content/archetypes.md`. Scoring definitions live in `content/quiz-questions.md`. This file holds everything the respondent reads on the results page.

---

## Score Display (Layer 1)

The respondent sees **two** scores. The archetype and AI Readiness Score are the hero; the Workflow Opportunity Score is secondary. This preserves the identity-discovery framing the quiz is built around rather than turning the page into a two-number dashboard.

**Category descriptions (R-05, added 2026-08-24):** each score card carries a one-line plain-language definition, set once in ScoreApp's Categories screen (`Questions & Scoring → Categories`) and inherited automatically by all four result pages — not per-page copy.

| Category | Description shown under the score |
|---|---|
| AI Readiness | "How far AI use has spread through your company — across your team, backed by leadership, and producing real results." |
| Workflow Opportunity | "How much economic value is plausibly sitting in the workflow you described — based on the hours, frequency, and people involved." |

**Why no tier badge.** ScoreApp's "Show score tier" toggle is scorecard-wide, not per-category — turning it on would also badge AI Readiness with the Contained/Meaningful/Significant/Substantial labels built for Workflow Opportunity (see §5.2), which reads oddly against a score whose real "band label" is the archetype name already shown as the page headline. Left off; the definition line above does the explanatory work instead.

### Primary Result: Archetype + AI Readiness Score

The archetype is the hero of the page, displayed before any number. Full copy in `content/archetypes.md`.

| AI Readiness Score (Layer A) | Archetype = result page shown |
|---|---|
| 80–100 | The Architect |
| 55–79 | The Builder |
| 30–54 | The Explorer |
| 0–29 | The Spectator |

Demotion gates G1–G3 apply after banding — see `content/archetypes.md`.

**Sub-headline by archetype** (first line of copy under the archetype reveal):

| Archetype | Sub-headline |
|---|---|
| The Architect | "Your readiness score puts you in the small group of companies that have already crossed the threshold most organizations are still approaching. The workflow you identified isn't a starting point — it's your next strategic lever." |
| The Builder | "Your readiness score reflects a company with real momentum and the raw materials for transformation. What you do with the workflow you identified is what turns momentum into results." |
| The Explorer | "Your readiness score reflects a company that's genuinely learning by doing. The workflow you identified is a good candidate for the first experiment worth turning into infrastructure." |
| The Spectator | "Your readiness score reflects a company still early in its AI journey — which means how you start matters more than how fast. The workflow you identified is a sensible place to look first." |

**Copy note:** suppress the default "Thank you for taking the AI Readiness Assessment" headline. The archetype reveal makes reintroducing the quiz name feel like a reset. Move the email delivery notice ("Your full brief has been sent to…") *below* the score card — logistics should not interrupt the reveal.

### Secondary Result: Workflow Opportunity Score

Measures how much economic value plausibly sits in the workflow they named (Layer B, from Q8–Q12). Displayed below the readiness block, paired with the dollar estimate.

| Score | Tier | Sub-headline |
|---|---|---|
| 80–100 | **Substantial** | "The workflow you described carries substantial trapped value. The combination of hours, frequency, and how it runs today puts it among the strongest automation candidates we see." |
| 60–79 | **Significant** | "The workflow you described represents a significant opportunity. There's enough time, volume, and manual effort here that improving it would show up in your numbers." |
| 35–59 | **Meaningful** | "The workflow you described represents a meaningful opportunity. It may not be the largest prize in your business, but it's real and it compounds." |
| 0–34 | **Contained** | "The workflow you described is fairly contained. That's genuinely good news about this process — and it may mean your bigger opportunity is somewhere you haven't looked yet." |

### The Positioning Statement

Shown beneath both scores. This is the line designed to travel — the thing they screenshot and send to their leadership team.

| | Opportunity **low** (0–59) | Opportunity **high** (60–100) |
|---|---|---|
| **Readiness high** (55–100) | "You're in good shape. This particular workflow isn't your biggest lever — the next question worth asking is where your real constraint actually sits." | "You have strong organizational readiness and a workflow with meaningful improvement potential. That combination is rarer than it sounds." |
| **Readiness low** (0–54) | "Start small. Neither your AI foundation nor this particular workflow is the urgent thing — which means you get to choose your first move deliberately rather than reactively." | "There's a real prize here — and a foundation to build first. Companies in this position often get the most value from fixing one workflow well and letting that become the proof that funds everything after it." |

The bottom-right cell is the profile that matters most: a large opportunity in a company not yet organized to capture it. Say so honestly rather than implying they're ready when they aren't.

---

## Benchmark Stats (Layer 2)

### Static Benchmark (shown to all respondents)
"McKinsey's latest research finds that more than half of all U.S. work hours — 57% — could already be automated with today's AI technologies. Most companies have barely started."
Source: McKinsey Global Institute, "Agents, robots, and us: Skill partnerships in the age of AI," November 2025.

**R-12 (2026-08-24):** the previous "23% of the workweek, McKinsey 2021" stat could not be verified — no McKinsey report, current or archived, states that figure for knowledge-worker automatable time. It reads as a fabricated citation that shipped unchecked. Replaced with a stat confirmed independently across three sources (Fortune, Lewis Silkin, Diginomica reporting on the same McKinsey Global Institute report): "today's technologies could theoretically automate more than half — 57% — of current US work hours." Note the source scope is *all US work hours*, not knowledge-worker hours specifically, so the copy says "U.S. work hours," not "knowledge workers' workweek" — don't narrow the claim back to knowledge workers without a knowledge-worker-specific source.

> **No monetary estimate on the public result page.** The assessment does not collect enough company-specific compensation, loaded labor rate, role mix, or automatable-percentage data to present a company-specific dollar figure with the confidence ReinventOps requires. The annual-hours estimate above is the only economic figure shown to respondents. A monetary range remains an internal/Diagnostic-stage tool — see `content/follow-up-sequences.md` for where `{annual_cost_low}`/`{annual_cost_high}` are still used, internally, in the respondent-brief email.

### Dynamic Benchmark (conditional on Q10 answer)

**If Q10 = "Less than 5 hours":**
"Based on your answers, your team is spending an estimated 150+ hours per year on this workflow — time that could be redirected toward higher-value work."

**If Q10 = "5–10 hours":**
"Based on your answers, your team is spending an estimated 375+ hours per year on this workflow — time that could be redirected toward higher-value work."

**If Q10 = "11–20 hours":**
"Based on your answers, your team is spending an estimated 750+ hours per year on this workflow — time that could be redirected toward higher-value work."

**If Q10 = "21–40 hours":**
"Based on your answers, your team is spending an estimated 1,500+ hours per year on this workflow — time that could be redirected toward higher-value work."

**If Q10 = "More than 40 hours":**
"Based on your answers, your team is spending an estimated 2,250+ hours per year on this workflow — time that could be redirected toward higher-value work."

---

## Personalized Insight Paragraphs (Layer 3)
Triggered by Q7 (workflow category) + Q12 (primary cost). 8 workflow categories × 6 pain types = **48 variants total.** The "Customer experience" pain type was added in v2 alongside the new Q12 answer option.
If ScoreApp only supports single-question conditional copy, use Q7 as the primary trigger and use the "Time (bottlenecks)" variant for each workflow type as the universal default — it is the most broadly relevant.

### Reporting & Data Aggregation

**+ Money (labor cost is significant):**
"Reporting and data aggregation is one of the highest-labor-cost processes in knowledge worker organizations. When a team is spending significant hours manually pulling, cleaning, and formatting data, the dollar figure accumulates faster than most leaders realize. Companies in your situation have reduced reporting time by 70–80% after automation — and redirected that budget toward work that actually grows the business."

**+ Scale (can't grow without adding headcount):**
"Reporting workflows are a hidden scaling ceiling for growing knowledge worker teams. The more your business grows, the more data you have — and the more manual effort your team spends keeping up with it. Companies at your stage that automate reporting consistently find they can handle 2–3x the data volume without adding headcount."

**+ Time (creates constant bottlenecks):**
"Reporting and data aggregation is one of the most time-intensive recurring processes in knowledge worker businesses — and one of the clearest automation opportunities. The bottleneck you're describing isn't a people problem; it's a process problem. Teams that address this typically reclaim 60–80% of the hours currently spent on it."

**+ Errors (mistakes happen and are expensive):**
"Reporting workflows built on manual data handling are one of the leading sources of avoidable errors in knowledge worker organizations. A mistake in a report doesn't just cost time to fix — it costs credibility. Automating the data aggregation layer typically eliminates the most common error sources while making the output more consistent and auditable."

**+ Customer experience (slow or inconsistent handling costs us business):**
"When reporting is slow, the people waiting on it are often the ones making decisions that affect customers — pricing, staffing, service levels, account reviews. A report that arrives three days late isn't just an internal inconvenience; it's three days of decisions made on stale information. Teams that automate the aggregation layer typically move from retrospective reporting to something closer to real time, which changes what the business can respond to."

**+ Team morale (it's tedious and people hate it):**
"Few tasks drain knowledge worker teams faster than manual reporting — it's high-effort, low-reward work that people didn't sign up to do. The pattern you're describing is a retention risk as much as a productivity problem. Teams that automate this almost universally report a morale lift alongside the time savings."

---

### Document Creation & Review

**+ Money (labor cost is significant):**
"Document creation and review is one of the highest-cost manual workflows in knowledge worker businesses — especially when multiple people are involved in drafting, editing, and approving. The labor cost is rarely tracked as a line item, but it's usually significant when you add it up. Automation in this area typically reduces time-to-final-document by 50–70% without sacrificing quality."

**+ Scale (can't grow without adding headcount):**
"Document-heavy workflows are a well-known scaling bottleneck for knowledge worker teams. As your business grows, so does the volume of documents — and the manual effort to create and review them grows with it. Automating the creation and routing layer is how fast-growing teams keep up without proportionally growing headcount."

**+ Time (creates constant bottlenecks):**
"Document creation and review is one of the most reliably slow workflows in knowledge worker businesses — full of back-and-forth, version confusion, and waiting. The bottleneck is usually in the handoffs, not the actual writing. Automation addresses the coordination overhead, which is where most of the time goes."

**+ Errors (mistakes happen and are expensive):**
"Manual document workflows are a significant source of version control errors, missed updates, and inconsistent output — especially when multiple reviewers are involved. Each handoff is an opportunity for something to fall through. Automating the creation and review process typically brings error rates down dramatically while making the audit trail clearer."

**+ Customer experience (slow or inconsistent handling costs us business):**
"Proposals, contracts, and client-facing documents are often the slowest step between a customer saying yes and the work actually starting. Every day spent in drafting and internal review is a day the customer spends waiting — and waiting is where deals cool and confidence erodes. Automating the assembly and routing layer usually compresses turnaround dramatically, and consistency improves at the same time."

**+ Team morale (it's tedious and people hate it):**
"Document creation and review is one of those tasks that feels endless — templates that aren't quite right, formatting that breaks, feedback loops that drag on. It's the kind of work that quietly frustrates capable people. Teams that automate the repetitive parts of this process find their people spend more time on the thinking and less on the mechanics."

---

### Client or Customer Communications

**+ Money (labor cost is significant):**
"Client and customer communication workflows are a significant and often underestimated labor cost in knowledge worker organizations. When responses, follow-ups, and updates are handled manually, the hours accumulate quickly — especially at scale. Automation in this area handles the high-volume, low-judgment communications so your team focuses on the relationships that require real attention."

**+ Scale (can't grow without adding headcount):**
"Managing client communications manually is one of the clearest growth limiters for knowledge worker teams. The more clients you have, the more communication volume — and at some point, a manual approach simply can't keep up. Automated communication workflows let you maintain responsiveness and consistency without adding communication overhead proportionally."

**+ Time (creates constant bottlenecks):**
"Manual client communication workflows are a constant time drain — writing the same updates, following up on the same requests, tracking the same threads. The time adds up quickly, and it's hard to batch or delegate effectively. Automation handles the repeatable layer so your team can focus on exceptions and the relationships that require judgment."

**+ Errors (mistakes happen and are expensive):**
"Manual client communication workflows are prone to the kinds of errors that damage relationships — missed follow-ups, inconsistent information, delayed responses. When communication is tracked in inboxes and spreadsheets, things fall through. Automated workflows create a reliable, consistent communication layer that rarely drops the ball."

**+ Customer experience (slow or inconsistent handling costs us business):**
"This is the workflow where internal inefficiency is most directly visible to the customer. Slow responses, inconsistent information, and follow-ups that never happen don't stay internal problems — they become the customer's experience of working with you. Automating the high-volume, low-judgment layer of communication is usually what lets a team stay responsive as volume grows, rather than becoming progressively harder to reach."

**+ Team morale (it's tedious and people hate it):**
"Managing client communications manually is the kind of work that wears people down — high volume, low autonomy, constant context-switching. It's often the thing that makes a good job feel overwhelming. Automating the repetitive communication layer gives your team room to do the client work they actually find meaningful."

---

### Research & Analysis

**+ Money (labor cost is significant):**
"Manual research and analysis workflows are one of the most expensive uses of knowledge worker time. When skilled people spend hours gathering, organizing, and synthesizing information that could be automated, the labor cost is hard to justify. Automation in this area typically cuts research time by 60–80%, letting your team spend more time acting on insights and less time producing them."

**+ Scale (can't grow without adding headcount):**
"Research and analysis workflows are a scaling bottleneck for knowledge worker teams that depend on information to make decisions. As the business grows, so does the information volume — and manual research doesn't scale with it. Automated research pipelines let your team handle significantly more analysis without adding analysts."

**+ Time (creates constant bottlenecks):**
"Manual research and analysis is one of the most time-consuming workflows in knowledge worker organizations — gathering from multiple sources, normalizing formats, and producing something usable is a lengthy process. The time between 'we need this information' and 'we have it' is often where decisions slow down. Automation compresses that gap dramatically."

**+ Errors (mistakes happen and are expensive):**
"Manual research workflows introduce errors at every step — copying data between sources, normalizing formats by hand, synthesizing across inconsistent inputs. The output is only as reliable as the process, and manual processes are hard to audit. Automated research pipelines reduce human error in the collection and synthesis phases significantly."

**+ Customer experience (slow or inconsistent handling costs us business):**
"When research is slow, customers feel it as hesitation. Questions that should get a same-day answer take a week, recommendations arrive after the moment has passed, and the expertise your team genuinely has starts to look like uncertainty from the outside. Compressing the gathering and synthesis stages usually shortens the distance between a customer's question and a confident, well-grounded answer."

**+ Team morale (it's tedious and people hate it):**
"Manual research is the kind of knowledge work that rarely feels fulfilling — collecting and organizing information instead of interpreting it and acting on it. Skilled people often find it frustrating to spend their time on the gathering instead of the thinking. Automation handles the collection layer and lets your team focus on the analysis they were hired to do."

---

### Approval & Review Processes

**+ Money (labor cost is significant):**
"Manual approval and review workflows are a significant and often invisible labor cost in knowledge worker organizations. Every person in the chain is spending time reviewing, commenting, forwarding, and following up — and the aggregate cost is rarely counted. Streamlining this workflow can reduce the labor cost of each approval cycle by 40–60%."

**+ Scale (can't grow without adding headcount):**
"Approval workflows are one of the first processes to break down as knowledge worker organizations grow. More decisions, more reviewers, more bottlenecks — and the manual coordination overhead scales with all of it. Automating the routing, tracking, and escalation layer is how growing teams keep decision velocity up without adding administrative overhead."

**+ Time (creates constant bottlenecks):**
"Manual approval and review workflows are a reliable source of organizational slowdown — requests sit in inboxes, reviewers lose track, and nothing moves until someone chases it. The bottleneck is rarely the review itself; it's the coordination around it. Automation handles the routing and follow-up so reviews happen faster and nothing falls through."

**+ Errors (mistakes happen and are expensive):**
"Manual approval workflows are prone to version confusion, missed sign-offs, and undocumented decisions — especially when they happen across email and chat. When something goes wrong, it's hard to trace what was approved, by whom, and when. Automated workflows create a clear, auditable trail that reduces errors and makes compliance simpler."

**+ Customer experience (slow or inconsistent handling costs us business):**
"Approval bottlenecks are almost always felt by someone outside the company — a client waiting on a quote, a candidate waiting on an offer, a customer waiting on a credit or an exception. The work is usually done; it's just sitting in someone's queue. Automating routing, reminders, and escalation typically removes most of that waiting without removing any of the human judgment that actually matters."

**+ Team morale (it's tedious and people hate it):**
"Approval workflows managed manually are a friction point that frustrates everyone involved — requesters waiting for responses, reviewers drowning in queues, and coordinators chasing both. It's the kind of process overhead that makes people feel like they're fighting the system. Automation removes most of that friction."

---

### Employee or Client Onboarding

**+ Money (labor cost is significant):**
"Employee and client onboarding is a high-cost, high-stakes process in knowledge worker organizations — and one of the most repeatable. When it's handled manually, each cycle requires significant coordination time from multiple people. Automating the process typically reduces the per-onboarding labor cost by 50–70% while improving consistency."

**+ Scale (can't grow without adding headcount):**
"Onboarding workflows are one of the clearest scaling constraints for knowledge worker teams. The more you grow — whether in headcount or client count — the more onboarding cycles you run. Manual onboarding doesn't scale; the effort grows linearly with volume. Automation lets you onboard more without proportionally growing the team running it."

**+ Time (creates constant bottlenecks):**
"Manual onboarding workflows are time-intensive for everyone involved — the person being onboarded, the person running it, and everyone looped in for each step. It's also the kind of process where delays have real downstream consequences. Automating the coordination, communication, and documentation layer significantly compresses the onboarding timeline."

**+ Errors (mistakes happen and are expensive):**
"Manual onboarding processes are a common source of inconsistency and error — steps missed, documents not collected, access not provisioned, introductions not made. When each onboarding is run differently by different people, quality varies. Automated workflows ensure every onboarding follows the same steps, every time, without relying on someone to remember."

**+ Customer experience (slow or inconsistent handling costs us business):**
"Onboarding is the first real experience someone has of how your company operates, and a manual process makes that first impression an inconsistent one. Missed steps, repeated requests for information already provided, and unclear next steps all land at the exact moment confidence is being formed. Automating the sequence and the handoffs usually makes onboarding both faster and more consistent — which is what makes it feel professional."

**+ Team morale (it's tedious and people hate it):**
"A poorly executed onboarding experience sets the wrong tone — for employees and clients alike. When the process is manual and ad hoc, it often feels disorganized even when the team is trying hard. Automating the repeatable parts of onboarding creates a consistently smooth experience that reflects well on your organization from day one."

---

### Sales Operations & CRM

**+ Money (labor cost is significant):**
"Sales operations and CRM workflows carry a labor cost that rarely shows up on any report — the hours your team spends on data entry, pipeline updates, account research, and administrative work that doesn't move deals forward. For many sales teams, a significant portion of their time goes to work that isn't actually selling. Automation in this area returns that time to revenue-generating activity, often without replacing a single tool in your stack."

**+ Scale (can't grow without adding headcount):**
"Sales ops and CRM workflows are a well-known growth bottleneck — as pipeline volume grows, so does the administrative overhead that comes with it. More accounts, more data entry, more reporting, more coordination between handoffs. Teams that automate the operational layer consistently find they can scale pipeline volume without proportionally growing the people managing it."

**+ Time (creates constant bottlenecks):**
"Manual sales operations workflows are a constant source of lost selling time — CRM updates that take hours, pipeline reports that require manual assembly, account research that starts from scratch with each new prospect. The result is a team spending meaningful energy on overhead instead of customer-facing work. Automation compresses the operational burden so your sales team can focus on the part of the job only they can do."

**+ Errors (mistakes happen and are expensive):**
"Manual CRM and sales ops workflows are a reliable source of data quality problems — records not updated, activities not logged, pipeline stages not advanced, duplicates accumulating. Bad CRM data produces bad forecasts and surfaces missed opportunities too late. Automating the data capture and update layer keeps records accurate without relying on individual reps to remember every step."

**+ Customer experience (slow or inconsistent handling costs us business):**
"When CRM and sales operations run on manual effort, the cost lands on prospects and customers as slow follow-up, forgotten commitments, and conversations that start from scratch because the context lives in someone's inbox. The team looks disorganized when it's actually just overloaded with admin. Automating capture and updates keeps the record accurate without relying on anyone to remember, which is what makes responsive follow-up sustainable."

**+ Team morale (it's tedious and people hate it):**
"CRM administration and sales ops overhead is one of the most universally dreaded parts of a sales role — high effort, low reward, and it pulls capable people away from what they're actually good at. When the CRM feels like a reporting tool for management rather than something that helps the team sell, adoption suffers and data quality follows. Automation handles the administrative layer so your team can spend their time where it actually matters."

---

### Other / Something Else

*Used when the respondent's workflow doesn't fit one of the seven named categories. Written to stay accurate for any workflow type, while still speaking to the specific pain type they flagged in Q11.*

**+ Money (labor cost is significant):**
"Whatever the workflow, the pattern is a familiar one: when a process depends on manual effort, the labor cost is almost always bigger than it looks on paper — because no one adds up the hours across a full year. The workflow you flagged is a clear example. Automation typically doesn't just save time on a task like this; it frees up a real, countable amount of budget that's currently going toward work a system could handle."

**+ Scale (can't grow without adding headcount):**
"The workflow you described has a common trait: it gets harder, not easier, as your company grows. Manual processes tend to scale linearly with headcount or volume, which means growth quietly creates more of the exact work you're trying to reduce. Automating this kind of process is usually how growing companies keep moving without adding people just to keep up."

**+ Time (creates constant bottlenecks):**
"The workflow you identified fits a pattern we see across almost every function — a process that consistently slows things down, even though no single step looks like the obvious culprit. That's usually a sign the bottleneck is structural, not a people problem. Automating the right part of the process is typically what closes the gap between when work is ready and when it actually gets done."

**+ Errors (mistakes happen and they're expensive):**
"Manual processes — whatever the workflow — tend to produce the same kind of risk: small errors that are easy to miss until they're expensive to fix. The workflow you flagged is a good candidate for a closer look, since consistency is usually the first thing that improves once part of the process is automated. It also tends to make the process easier to audit after the fact."

**+ Customer experience (slow or inconsistent handling costs us business):**
"The workflow you described has a trait worth naming: its inefficiency doesn't stay inside the company. When a process is slow or inconsistent internally, someone outside eventually experiences it as a delay, a mistake, or a mixed message. That's usually the strongest argument for fixing it, because the cost isn't only the hours — it's the impression those hours leave behind."

**+ Team morale (it's tedious and people hate it):**
"Across almost every function, there's usually one process that people quietly dread — repetitive, low-judgment work that doesn't use anyone's real skills. The workflow you described sounds like it may be that process for your team. Automating it is often less about efficiency and more about giving skilled people their time back for the work they actually want to be doing."

---

## CTA Copy (Layer 4)

> **The Diagnostic CTA is driven entirely by the Diagnostic Fit Score (Layer C) — never by the archetype.** An Architect whose workflow runs smoothly sees no booking CTA. A Spectator who clears every hard gate does. Routing logic: `content/quiz-questions.md` §7.4–7.5.
>
> **R-14 (2026-09-01): the CTA now appears in two placements on qualified pages, not one.** The **Opening CTA** sits directly below the score cards — a hook, right at the moment of the reveal. The **Closing CTA** sits near the bottom of the page, in the exact slot the Not-Qualified Note occupies for rejected respondents — so the page structure is symmetric either way: qualified visitors see two CTAs bookending the page content; rejected visitors see the Opening CTA slot replaced by nothing (no CTA at all, per Layer C routing) and the Closing CTA slot replaced by their gate-specific nurture note. Both CTAs link to the same Calendly booking link.

### Primary CTA — all respondents

**Headline:** "Get your AI Readiness Brief"
**Body:** "We'll email you a personalized summary of your archetype, both of your scores, benchmark data, and a plain-English breakdown of what your biggest workflow opportunity could look like."
**Button:** "Send my Brief"

Submitting an email address places the respondent into the results/follow-up flow by default — no separate consent checkbox gates delivery. Every marketing/nurture email carries an Unsubscribe link (see `content/follow-up-sequences.md`).

### Opening CTA — qualified respondents only (Layer C = ACCEPT or HOLD)

**Placement: directly below the AI Readiness and Workflow Opportunity score cards** — the first thing after the reveal, before the positioning statement, benchmark stats, or personalized insight paragraph. Replaces ScoreApp's default post-score placeholder block.

Same Calendly link in both cases; the framing changes with the archetype, because "optimize your next lever" and "make your first deliberate move" are not the same conversation.

**For The Builder and The Architect:**

**Headline:** "Don't stop at the score."
**Body:** "Your results suggest there's a real opportunity inside your business. Now it's time to find out how big it is—and whether it's practical to act on.

On a free call, we'll dig into the workflow you identified, pinpoint where AI could save you meaningful time or money, and help you figure out whether the opportunity is worth pursuing.

**If there's something there, you'll leave knowing where to focus. If there isn't, you'll know that too.**"
**Button:** "Find Out If It's Worth Pursuing →"
**Footer:** "Free · No obligation"

**For The Spectator and The Explorer:**

**Headline:** "Don't stop at the score."
**Body:** "Your results suggest there may be a real opportunity inside your business — and you don't need an AI strategy to find out. You just need one workflow worth examining, and you've already described one.

On a free call, we'll look at that workflow with you, pinpoint where AI could save you meaningful time or money, and help you figure out honestly whether it's worth pursuing.

**If there's something there, you'll leave knowing where to focus. If there isn't, you'll know that too.**"
**Button:** "Find Out If It's Worth Pursuing →"
**Footer:** "Free · No obligation"

> The second variant exists because a qualifying Spectator is not a lesser lead — they're a company with real pain and real intent that hasn't organized around AI yet. Framing the Diagnostic as a prerequisite-free first step is what makes it reachable for them.
>
> **v2.1 (2026-08-24):** Rewrote both variants around the user-supplied "Don't stop at the score" copy — sharper hook, clearer stakes ("worth knowing either way"), and a benefit-driven button label. Kept the archetype split rather than unifying to one CTA, since the two framings (assumed capability vs. no-prerequisites reassurance) are deliberate per §7.6 of the Master Reference and the "never imply the respondent failed" principle applies differently to each audience.

### Closing CTA — qualified respondents only (Layer C = ACCEPT or HOLD)

**Placement: near the bottom of the page**, after the positioning statement, the dynamic cost benchmark, and the personalized workflow insight paragraph — in the same slot the Not-Qualified Note occupies for rejected respondents (§ below).

**v2.3 (2026-09-03): this section now ends in an inline Calendly embed, not a button.** The `Book Your Diagnostic Call →` button was removed; the booking calendar is rendered in place beneath the body copy via a Custom HTML section. The Opening CTA keeps its button. The embed must carry the same Layer C gating as this section — Audience Based, hidden from `Diagnostic Disqualified` — because a rejected respondent rendering a live booking widget defeats the entire point of Layer C.

Written to call back to what the respondent just read (the hours, the cost, the workflow-specific insight) rather than repeat the Opening CTA's pitch — this is the close, not the hook.

**For The Builder and The Architect:**

**Headline:** "Where to go from here"
**Sub-headline:** "You know what this is costing you. The next step is finding out what to do about it."
**Body:** "You've seen the hours, the likely cost of leaving it alone, and where this kind of workflow tends to break down for companies like yours. That's more than most companies ever put in writing about a single process.

The only question left is whether it's worth fixing — and that's exactly what the Diagnostic call answers. Free, 30 minutes, built around the workflow you already named."
**Button:** "Book Your Diagnostic Call →"
**Footer:** "Free · No obligation · 30 minutes"

**For The Spectator and The Explorer:**

**Headline:** "Where to go from here"
**Sub-headline:** "You don't need a mature AI program for this. You need one workflow — and you just described one."
**Body:** "You don't need a strategy or a plan already in motion to make this call worth taking. If there's real money or time sitting in what you found, thirty minutes is enough to know.

And if there isn't, you'll know that too — and you'll have lost nothing but half an hour."
**Button:** "Book Your Diagnostic Call →"
**Footer:** "Free · No obligation · 30 minutes"

> **v2.2 (2026-09-01):** Added as a second CTA placement. The Opening CTA alone left a gap once it moved up next to the score reveal — the bottom of the page, after all the cost and insight detail, still needed a close for qualified respondents, in the same structural slot the Not-Qualified Note fills for everyone else. Headline "Where to go from here" deliberately echoes the Not-Qualified Note's framing (below) so the slot reads as intentional regardless of which content lands in it.
>
> **v2.3 (2026-09-03) keeps this headline and differentiates the other branch instead.** A "Pick a time that works" variant was drafted and rejected: it jumped to the final micro-action, so the sub-headline and body then walked back to argue for it — *do it → here's why → now do it* — and its transactional register clashed with the evidence-led copy around it. "Where to go from here" was written to flow with this sub-headline and body, and it still does; the embed handles the handoff to the calendar by existing. **The Not-Qualified Note takes new, gate-specific headlines instead** (see below). The branches must stay distinguishable because identical headlines would make an audience-gating failure invisible: if the gate misfires and a rejected respondent renders the Closing CTA, a duplicate headline reads as normal in either state.

### Not-Qualified Note — shown instead of the Closing CTA (Layer C = REJECT)

**Headlines — new in v2.3 (2026-09-03).** Until now this section carried a single headline, "Where to go from here", which was live in the build but had never been recorded in this file; only the four bodies were. It duplicated the Closing CTA that occupies the same slot for qualified respondents. Each variant is its own audience-gated section, so a tailored headline costs no more to build than a shared one — and each gate is a genuinely different finding, so they now read as four different answers rather than one generic conclusion (per the UX review's note that this slot should behave as a recommendation, not a generic conclusion). **LOCKED (Arielle's final wording, 2026-09-03):**

Four variants, keyed to *why* they didn't qualify. Use the one matching the gate that fired; if several fired, use the first match in this order.

**HG3 or HG4 — the workflow they named is small or already working:**
**Headline:** "Not this one — and that helps"
"Based on what you described, this particular workflow probably isn't where your biggest opportunity is hiding — and that's genuinely good to know. Save this page. When a process shows up that's costing your team real hours every week, that's the conversation worth having."

**HG1 — not ready to act:**
**Headline:** "The opportunity's real. The timing isn't."
"You flagged a real workflow, and the opportunity in it looks legitimate. But you also told us acting on it isn't on the table right now, and we'd rather say that plainly than pretend a call would change it. Save this page — when the timing shifts, the analysis you just did will still be here."

**HG5 — very early stage:**
**Headline:** "You're early, not behind"
"Your results point to a real opportunity ahead, and capturing it starts with building the foundation first. The good news is that starting deliberately beats starting frantically — you haven't lost anything by being thoughtful. Save this page. When your company is ready to move from awareness to action, this is exactly where the conversation starts."

**HG2 or score below threshold — access or scale:**
**Headline:** "You've done the hard part"
"The people who'd need to be part of a conversation about changing this workflow probably aren't in this assessment yet — so the most useful next step is showing them what you just found. Save this page and send it along."

> **Design principle across all four:** never imply the respondent failed. They completed an honest assessment and received an honest answer. Every variant gives them something to do and a reason to keep the page.

---

## Share Section (Layer 5) — added 2026-08-24 (R-11)

ScoreApp's native "Share" section, placed at the end of each result page (after the not-qualified note, before the footer). Same structure on all four pages; only the archetype name changes.

**Headline:** "Don't keep this to yourself."
**Subhead:** "Send it to your leadership team, your peers, or anyone who should see where your company stands."
**Share message** (pre-filled social/copy-link text): "I just found out my company is a[n] {Archetype} on the AI Readiness Assessment — see where yours stands."
**Card title:** "My {Archetype} score" (e.g. "My Architect score") — deliberately static text per page, not the `{Scorecard Name}` merge tag, since "My " + scorecard name reads awkwardly regardless of the scorecard's exact name.

| Archetype | Share message | Card title |
|---|---|---|
| Architect | "I just found out my company is an Architect on the AI Readiness Assessment — see where yours stands." | My Architect score |
| Builder | "I just found out my company is a Builder on the AI Readiness Assessment — see where yours stands." | My Builder score |
| Explorer | "I just found out my company is an Explorer on the AI Readiness Assessment — see where yours stands." | My Explorer score |
| Spectator | "I just found out my company is a Spectator on the AI Readiness Assessment — see where yours stands." | My Spectator score |

Buttons (native, not custom copy): Copy Link, Facebook, X, LinkedIn, WhatsApp.

**Side fix:** the scorecard's own name was "The AI Readiness Assessment," which combined with ScoreApp's default card-title template ("My {Scorecard Name} score") to read "My The AI Readiness Assessment score." Renamed the scorecard to "AI Readiness Assessment" in Scorecard Settings → General — fixes the grammar everywhere that merge tag is used, independent of the static per-archetype titles above.

---

## Changelog

### v2.3 — 2026-09-03
- **Closing CTA button replaced by an inline Calendly embed** on all four result pages (Custom HTML section, gated to hide from `Diagnostic Disqualified`). The Opening CTA keeps its button.
- **Closing CTA headline unchanged** ("Where to go from here"). A replacement was drafted and rejected on flow grounds — see the note in that section.
- **Not-Qualified Note gains four gate-specific headlines** (below), replacing the single undocumented "Where to go from here" that was live. Distinct headlines across the two mutually-exclusive branches make an audience-gating failure visible instead of invisible.
- **Two body edits made alongside the new headlines (Arielle, 2026-09-03):**
  - HG3/HG4 body: "that's genuinely useful to know" → **"that's genuinely good to know"**, and the headline settled as **"Not this one — and that helps"** rather than the drafted "...and that's useful" — the body already carries the "useful to know" idea, and repeating it in the headline directly above was the same front-running problem that killed the Closing CTA rewrite.
  - **"Your results are worth sharing" removed** from the HG2 opening. The Share section ("Don't keep this to yourself") renders immediately below this note, so the line was doing work the next section already does.
- **Not-Qualified Note headline documented** as "Where to go from here" — live in the build since v2.2 but never recorded here. Now exclusive to that section.

### v2.2 — 2026-09-01
- **CTA split into two placements on qualified result pages.** Opening CTA ("Don't stop at the score.") moved to sit directly below the score cards, replacing ScoreApp's default placeholder block that lived there. New Closing CTA ("Where to go from here") added near the bottom of the page, in the same slot the Not-Qualified Note occupies for rejected respondents — keeps the page symmetric for both outcomes.
- Not-Qualified Note section renamed for accuracy ("shown instead of the Closing CTA," not "the secondary CTA," since there are now two).

### v2.0 — 2026-08-21
- **Two scores now shown** — AI Readiness (hero, drives archetype) and Workflow Opportunity (secondary). Replaces the single blended AI Opportunity Score.
- **Added the Positioning Statement 2×2** — the shareable line, and the only place the low-readiness/high-opportunity combination is addressed honestly.
- **Archetypes renamed** to Spectator / Explorer / Builder / Architect.
- **Stage labels retired.** The archetype and the two tier labels do that work; a third label was redundant.
- **48 insight variants** (was 40) — added "Customer experience" across all 8 workflow categories.
- **CTA decoupled from archetype.** Secondary CTA now has two framings, and the old "AI Observer Note" is replaced by four gate-specific not-qualified variants.
- **Question references renumbered:** Q9 → Q10 (hours), Q6 → Q7 (category), Q11 → Q12 (primary cost).
