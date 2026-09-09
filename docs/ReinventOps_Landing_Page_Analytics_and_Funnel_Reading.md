# Landing Page Analytics — Setup and How to Read the Funnel

**reinventops.com · written 2026-09-09 · flight Sept 7–26, 2026**

Companion to the [Launch Measurement Plan](ReinventOps_LinkedIn_Launch_Measurement_Plan.md), which defines *what* the campaign is judging. This one covers the mechanics: what is now instrumented, where each number is pulled from, and what a bad number at each stage actually means.

---

## 1. The gap this closes

Before today, reinventops.com carried **only the LinkedIn Insight Tag**. That tag does exactly two things: it fires a page view for LinkedIn's audience/attribution engine, and it fires the "AI Readiness Assessment Completed" conversion on the ScoreApp results page.

What it could not tell you:

- how many people who clicked the ad actually **landed** on the page,
- how many of them **clicked through** to the assessment,
- what **organic** traffic was doing at all.

Which meant the first two drop-offs in the funnel — the two the landing page is actually responsible for — were invisible. The campaign could report a completion cost while giving no way to tell whether a bad number came from the ad, the page, or the quiz.

## 2. What is now in `index.html`

Three changes, all live in the repo and pending deploy:

1. **Google Analytics 4 snippet** in `<head>`, above the Insight Tag. Carries the live Measurement ID `G-FLG1S0R8ZH` in two places — the script `src` and the `gtag('config', …)` call. Both must match.
2. **`id="nav-cta"`** added to the nav bar's assessment link, so all three CTAs can be told apart. The hero and bottom CTAs already had `hero-cta` and `bottom-cta`.
3. **An `assessment_cta_click` event** on every link out to ScoreApp, carrying `cta_location` (which button) and `link_url` (the fully-forwarded URL including the ad ID). It is bound *below* the existing UTM-forwarding block, so the URL it reports is the final one.

The same handler has a second, dormant half: a LinkedIn `lintrk('track')` call gated behind `LI_CTA_CONVERSION_ID`, which is `null`. GA4 records the click either way. See §6 for the decision on whether to switch it on.

**Verified before commit:** all four inline scripts parse; a headless-browser run confirmed each of the three CTAs fires exactly one event, correctly labelled, with `ad=1587859486` present on `link_url` — and that the organic case (no query string) still fires cleanly.

---

## 3. The funnel, and where each number lives

| # | Stage | Metric | Where you pull it |
|---|---|---|---|
| 1 | Ad delivery | Impressions, clicks, CTR, spend — **per ad** | Campaign Manager |
| 2 | **Landing** | Sessions where source/medium = `linkedin / paid_social` | GA4 → Reports → Acquisition → Traffic acquisition |
| 3 | **CTA click** | `assessment_cta_click` count, split by `cta_location` | GA4 → Reports → Engagement → Events |
| 4 | Assessment start | First question answered | ScoreApp analytics |
| 5 | Assessment completion | Results page load | ScoreApp **and** the LinkedIn conversion action (Insight Tag 9893588) |
| 6 | Lead quality → close | ACCEPT/HOLD/REJECT, bookings, PROPOSE | Tracking sheet — per the Measurement Plan, stages 3–5 there |

Rows 2 and 3 are the new ones.

**Splitting rows 2 and 3 by ad:** GA4 dimension **Session manual ad content** = `utm_content` = the AD_ID. The mapping is in [[linkedin_ad_campaign]]:

| AD_ID | Ad |
|---:|---|
| 1587859486 | A-003-03 — scatter / ROI gap |
| 1587859536 | B-005-01 — expensive workflow |
| 1587967236 | C-005 — identity, headline above |
| 1588051936 | C-004 — identity, headline below |
| 1589533716 | D-001 — two scores |

`utm_medium=paid_social` matches GA4's Paid Social rule (`paid.*` + a recognised social source), so LinkedIn ad traffic buckets correctly and will not be mistaken for organic social.

---

## 4. The four drop-offs, and what a bad one means

Reference ranges below are directional. The last line of §7 is the more important caveat.

### 4a. Ad click → landing page session · *expect 70–90% to survive*

Campaign Manager clicks will always exceed GA4 sessions: accidental mobile taps, back-button-before-load, ad blockers, tracking prevention. **Losing 10–30% is normal and not worth investigating.**

- **Losing more than 40%** points at something mechanical — page load time, a redirect, or a broken destination URL on one specific ad. Check whether the loss is concentrated in one `utm_content` value; if it is, that ad's destination URL is the suspect, not the page.

### 4b. Session → CTA click · *this is the landing page's own score*

The ask here is only a click — no form, no email — so this should run well above the 5–15% LinkedIn benchmark for form-fill landing pages.

- **25%+** — the page is doing its job.
- **15–25%** — normal for cold, interruption-driven paid social.
- **Below 10%** — the page is the problem. The most likely causes, in order: the headline promise doesn't match what the ad promised, or the hero CTA is below the fold on mobile.

`cta_location` is the diagnostic that makes this actionable. If **bottom-cta** is carrying the clicks, people needed the full page to be convinced and the hero isn't landing. If **hero-cta** dominates and the bottom CTA is near zero, most visitors decide immediately — and the middle of the page is doing nothing, which is fine but means page-body edits won't move the number.

### 4c. CTA click → assessment start · *expect 70–90%*

This is a hop between two domains and should lose very little.

- **Below 60%** — the fault is on the ScoreApp side, not yours: load time, or the first screen asking for something before it gives anything. This is the drop-off most often missed entirely, because neither tool owns both ends of it. GA4 gives you the numerator and ScoreApp the denominator; you have to put them side by side yourself.

### 4d. Assessment start → completion · *expect 50–70% for a 4-minute quiz*

- **Below 40%** — question count or question friction. ScoreApp should show which question people abandon on; that question is the fix.

### The end-to-end number

Ad click → completed assessment. At **15–25%** the whole funnel is healthy. This is also the only number that maps cleanly onto **cost per completed assessment**, which per the Measurement Plan is the judgement unit for ranking concepts A / B / C / D.

---

## 5. Setting up GA4 (~10 minutes, free)

1. **analytics.google.com** → **Admin** (gear, bottom-left) → **Create** → **Property**.
2. Property name `ReinventOps`, time zone **(GMT-05:00) Chicago**, currency **USD**.
3. Platform **Web**. Stream URL `https://reinventops.com`, stream name `reinventops.com`.
4. Copy the **Measurement ID** (`G-` followed by ten characters) from the top right of the stream page.
5. ~~Replace both occurrences of the placeholder in `index.html`.~~ **Done 2026-09-09 — `G-FLG1S0R8ZH`.** Kept here because it is the trap to remember if the ID ever changes: it appears twice on purpose, and replacing only one produces a property that silently records nothing.
6. Deploy, then open reinventops.com and check **GA4 → Reports → Realtime**. You should appear within about 30 seconds.
7. Click a CTA yourself, then check Realtime's event list for `assessment_cta_click`.
8. Once it has fired at least once: **Admin → Key events → Mark as key event**. This is what lets it appear as a conversion in the acquisition reports rather than only in the events list.

**Standard reports lag 24–48 hours.** For the first few days read **Realtime** and **Explore**, not the Reports tab, or you will think the tracking is broken when it is just late.

**The one report worth building:** Explore → **Funnel exploration** → steps `session_start` → `assessment_cta_click`, breakdown dimension **Session manual ad content**. That is §4b split by ad, on one screen.

---

## 6. The LinkedIn CTA conversion — one decision left

The code is written and dormant. Turning it on means: Campaign Manager → **Analyze → Conversion tracking → Create → Website conversion → Event-specific pixel**, name it `Clicked Assessment CTA`, take the Conversion ID, paste it into `LI_CTA_CONVERSION_ID` in `index.html`, redeploy.

**The tradeoff, honestly.** A LinkedIn conversion action only reports against a campaign if it is *attached* to that campaign — and once attached, the headline **Conversions** and **Cost per conversion** columns sum every attached action together. Your completion conversion and this click conversion would be added into one meaningless number, and cost-per-completed-assessment — the metric the whole test is built on — stops being readable at a glance.

**Recommendation: leave it off for the first week.** GA4 already gives you the click number split by AD_ID via `utm_content`, which is the same information. Switch the LinkedIn event on only if week one shows the UTM attribution isn't surviving the hop. If you do switch it on, from that day forward read cost-per-completion from the **Conversions breakdown by conversion action**, never the headline column — and make sure the campaign's **optimization goal** stays on the completion event. Optimising toward the click would push LinkedIn to find cheaper, worse traffic, because a click is an easier event to buy than a finished assessment.

---

## 7. Reading cadence, and the honest caveat about volume

**Daily, first three days:** Realtime only, and only to confirm data is arriving. Do not read rates yet.

**End of week 1:** stages 1–3. This is the first point at which §4a and §4b are worth looking at.

**Weekly after that:** the full table. Per the Measurement Plan, do not re-tune copy or targeting mid-flight on partial data.

**The caveat that governs everything above.** At $1,000 and roughly $34–90 CPM against this narrow audience, the flight buys on the order of 11,000–20,000 impressions. At a 0.4–0.65% CTR that is **roughly 70–130 clicks in total, across all five ads and all twenty days** — which after the drop-offs above lands somewhere around 5–20 completed assessments.

So: **per-ad drop-off rates will be noise.** Twenty-odd clicks per ad cannot separate a 22% CTA rate from a 28% one, and no amount of careful reading changes that. Read stages 2–4 at the **campaign** level. Use the per-ad split only for the concept ranking the Measurement Plan already defines, and only as directional.

What this instrumentation *is* reliably good for at this volume is **finding a stage that is broken**. A 3% CTA click rate, or a 30% survival rate from click to session, is unmissable at n=60 and tells you exactly where to spend the next thousand dollars. A stage that is merely mediocre will not resolve at this sample size — and chasing it is how a launch test turns into a month of guessing.

---

## 8. Known gaps

- [x] **Measurement ID set: `G-FLG1S0R8ZH`** — account "ReinventOps Group", property "reinventops.com", Chicago time, USD. Web stream `reinventops.com` created 2026-09-09 with Enhanced measurement ON (page views, scrolls, outbound clicks). **Still nothing is recorded until the commit is pushed and Netlify deploys.**
- [ ] The site has **no privacy policy**. Adding GA4 makes that a live gap rather than a theoretical one, and the assessment collects email downstream. Not a launch blocker for a US-only B2B audience, but worth a footer link before scaling spend.
- [ ] **`utm_medium=paid_social` and `utm_source=linkedin` are still unchecked** on the QA checklist at account level (only the ad-level `utm_content` is confirmed). If those two are missing, GA4 will bucket the ad traffic as direct or organic social and §4a becomes unreadable. Confirm on the first live click.
- [ ] Stage 4 (assessment start) depends on ScoreApp's own analytics — confirm it reports starts as a distinct number from completions, or §4c cannot be computed.
