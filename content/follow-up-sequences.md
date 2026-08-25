# Follow-Up Email Sequences — Source of Truth

**Version 2.0 — 2026-08-21.** Updated for three-layer scoring, renamed archetypes, and consent gating.

> **No separate opt-in gates delivery.** Submitting an email address on the results page places the respondent into Sequence 1 by default. Sequences 2 and 3 (nurture/follow-up) require an **Unsubscribe** link in every send; using it stops all future marketing/nurture email to that respondent. The one-time Sequence 1 result-delivery email is not affected by unsubscribe status.

---

## Sequence 1 — Respondent Brief

**Trigger:** respondent submits email on the results page CTA ("Send my Brief")
**Timing:** immediately
**Gate:** none (sends by default, regardless of unsubscribe status — this is the one-time result-delivery email, not marketing/nurture)
**Subject:** Your AI Readiness Brief — {Q7 workflow category}

```
Hi {first_name},

Here's your AI Readiness Brief, based on the assessment you just completed.

YOUR ARCHETYPE: The {archetype}
AI READINESS: {layer_a_score}/100
WORKFLOW OPPORTUNITY: {layer_b_score}/100 — {opportunity_tier}

WHAT THESE TWO NUMBERS MEAN TOGETHER
{Insert the matching cell from the Positioning Statement 2×2 in results-copy.md}

WHAT YOU IDENTIFIED
You flagged {Q7} as your biggest workflow challenge — a process your team
collectively spends {Q10} on each week, which runs today as {Q11a}.
{IF Q11b selections: "You also told us: {Q11b list}."}

Based on your answers, that adds up to an estimated {annual_cost_low}–{annual_cost_high}
in annual labor cost. Treat that as a screening estimate of what the work costs,
not a promise of what's recoverable — the difference is exactly what a Diagnostic
is for.

WHAT THIS MEANS
{Insert the personalized insight paragraph from results-copy.md matching Q7 + Q12}

WHAT TENDS TO HAPPEN NEXT
Organizations in your situation typically find the biggest unlock isn't more
software — it's rethinking how the workflow is structured, then layering in
automation where it makes the most impact. The difference between workflows
that get automated successfully and those that don't usually comes down to
having a clear picture of the process before touching any tools.

{IF Layer C = ACCEPT or HOLD}
WANT TO TALK THROUGH IT?
If you'd like a focused 30-minute conversation about what this could look like
for your specific situation — no pitch, just an honest look at what's possible —
you can book a time here:

[Calendly link]
{END IF}

Otherwise, save this email. It's a useful reference the next time this workflow
comes up in your planning conversations.

— [Your name]
```

> **The booking block is conditional on Layer C, not on archetype.** A qualifying Spectator gets it; a non-qualifying Architect does not. Sending a booking link to someone the results page deliberately withheld it from would undo the qualification logic.

---

## Sequence 2 — Non-Booker Follow-Up

**Trigger:** brief requested, no booking within 5 days
**Timing:** day 5
**Gate:** none (sends by default); respondent must not have unsubscribed from marketing/nurture email **AND** Layer C = ACCEPT or HOLD
**Subject:** Re: Your AI Readiness Brief

```
Hi {first_name},

Checking in on the AI Readiness Assessment you completed last week.

A lot of people find it useful to have a conversation once they've had a chance
to sit with their results — their {archetype} archetype, the two scores, and the
workflow they flagged. If that's where you are — or if you've shared it with
someone else on your team and questions have come up — I'm happy to spend
30 minutes talking through it.

No prep required. Just bring whatever's on your mind.

[Calendly link]

— [Your name]
```

> Never send this to a Layer C REJECT. They were not offered a booking on the results page; following up as though they were is incoherent and reads as a bot.

---

## Sequence 3 — Nurture

**Trigger:** Layer C = **REJECT**
**Timing:** 14 days after submission
**Gate:** none (sends by default); respondent must not have unsubscribed from marketing/nurture email
**Subject:** A follow-up on your AI Readiness Assessment

> **Changed in v2.** The v1 trigger was "AI Observer archetype OR overall score < 35," which under the old build were the same condition. Neither applies now: archetype no longer determines qualification, and there is no single blended score. The trigger is the Layer C decision.

Four variants, keyed to **which gate fired**. Use the first match in this order.

### 3a — Workflow too small or already working (HG3, HG4)

```
Hi {first_name},

You completed the AI Readiness Assessment a couple of weeks ago, and the honest
read was that the workflow you described probably isn't where your biggest
opportunity is hiding. That's genuinely good news about that process.

It's worth revisiting when something changes — usually growth, a new system, or
a process that quietly gets more expensive than anyone noticed. The companies we
end up helping most often aren't the ones with the worst workflow; they're the
ones who spotted the right workflow early.

If a process shows up that's costing your team real hours every week, that's the
conversation worth having.

— [Your name]
```

### 3b — Not ready to act (HG1)

```
Hi {first_name},

You completed the AI Readiness Assessment a couple of weeks ago and flagged
{Q7} as a real friction point — but also told us that acting on it isn't on the
table right now.

That's a perfectly reasonable place to be, and we'd rather respect it than keep
pushing. Most organizations we work with weren't ready the first time they looked
at this. The ones that moved forward typically revisited it 6–12 months later,
when a specific trigger showed up — a key hire, a growth milestone, or a point
where the manual process finally became the bottleneck they couldn't ignore.

When that moment comes, the work you did identifying {Q7} will still be relevant.

— [Your name]
```

### 3c — Early stage (HG5)

```
Hi {first_name},

You completed the AI Readiness Assessment a couple of weeks ago and came out as
a {archetype} — which means the timing may not be quite right yet, but the
thinking clearly is.

The good news is that starting deliberately beats starting frantically. You
haven't lost anything by being thoughtful. The companies that make the smartest
moves from here won't be the ones chasing every new AI tool — they'll be the
ones that pick the right business problem and build evidence about where AI
actually creates value.

When your company is ready to move from awareness to action, the workflow you
identified is a sensible place to start.

— [Your name]
```

### 3d — Access or scale (HG2, or score below threshold)

```
Hi {first_name},

You completed the AI Readiness Assessment a couple of weeks ago. One thing worth
saying plainly: the people who'd need to be part of a decision about changing
{Q7} probably weren't in that assessment with you.

That makes the most useful next step a simple one — show them what you found.
A score and an archetype tend to start a better internal conversation than
"we should look at AI" ever does.

If that conversation happens and there's interest, I'm easy to reach.

— [Your name]
```

---

## Routing Summary

| Layer C | Seq 1 (Brief) | Seq 1 booking block | Seq 2 (Non-booker) | Seq 3 (Nurture) |
|---|---|---|---|---|
| ACCEPT | Yes | Yes | Yes, day 5 | No |
| HOLD | Yes | Yes | Yes, day 5 | No |
| REJECT | Yes | **No** | **No** | Yes, day 14 — variant by gate |
| Any, unsubscribed | Yes | Yes/No per Layer C above | **No** | **No** |

---

## Automation vs. Manual

| Sequence | If ScoreApp supports it | If manual |
|---|---|---|
| 1 — Brief | Automated email on results-page CTA submission | Send within 1 hour of submission |
| 2 — Non-booker | Time-delayed conditional email, 5 days, no booking detected | Weekly review; send to anyone 5+ days out with no booking |
| 3 — Nurture | Audience-conditional email, 14-day delay | Tag REJECT submissions; send at the 14-day mark |

Native ScoreApp emails are not documented as supporting conditional blocks, so the four Sequence 3 variants likely need either four separate audience-triggered emails or the phase-2 webhook. **Sequence 3a–3d must not collapse into one generic email** — the whole reason a REJECT gets a different message is that "your workflow is fine," "you're not ready," and "you can't reach the buyer" are three different conversations, and a generic message gets all three wrong.

---

## Changelog

### 2026-08-25
- **Consent gating removed, unsubscribe gating added.** Sequence 1 (result delivery) always sends and is unaffected by unsubscribe status. Sequences 2 and 3 send by default but are suppressed for any respondent who has used the Unsubscribe link. There is no longer a separate marketing-consent checkbox on the contact form.

### v2.0 — 2026-08-21
- ~~**Consent gating added.** No sequence fires without `opt_in = true`.~~ (superseded 2026-08-25, see above)
- **Sequence 3 trigger changed** from archetype/blended-score to Layer C = REJECT, and split into four gate-specific variants.
- **Sequence 1 now carries both scores** plus the Positioning Statement, and its booking block is conditional on Layer C.
- **Sequence 2 explicitly excluded** for REJECT respondents.
- Archetype names updated to Spectator / Explorer / Builder / Architect.
- Question references renumbered: Q6 → Q7, Q9 → Q10, Q11 → Q12; added Q11a and Q11b.
- Labor-cost figure now framed as a screening estimate, not recoverable savings.
