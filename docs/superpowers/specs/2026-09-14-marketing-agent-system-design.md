# ReinventOps Marketing Agent System — Design Spec

**Date:** 2026-09-14
**Status:** Draft
**Scope:** Phase 1 — Core Marketing Operations (Agents 1–3, API layer, dashboard, digest)

---

## 1. Problem

ReinventOps Group runs marketing across three LinkedIn presences (ReinventOps company page, Arielle's "The Efficient Engineer" personal profile, Uzziah's personal profile) plus a LinkedIn ad campaign for the AI Readiness Assessment. Today everything is manual: posts go out late or not at all when things get busy, ad performance is checked sporadically in Campaign Manager and GA4, and there's no systematic reporting for the founders to make decisions together.

The LinkedIn ad campaign launched Aug 31, 2026 ($1,000 test, three creatives: A4/B4/C1, $50/day). After ~2 weeks of data it was paused based on early performance. A simpler campaign is in development: a direct landing page with a CTA to book a call, without the assessment funnel. The assessment will be repositioned as a nurture tool for prospects already in conversation.

## 2. Goals

1. **Reliable content cadence** — 4 posts/week on each active LinkedIn presence (8/week in Phase 1 covering ReinventOps + The Efficient Engineer; 12/week once Uzziah's brand is added in Phase 2), drafted by an agent, published on schedule with minimal manual effort.
2. **Daily ad monitoring** — automated pull of LinkedIn Campaign Manager and GA4 data, with minor adjustments (pause underperforming ads) made automatically and major decisions flagged for human approval.
3. **Weekly reporting** — aggregated funnel metrics, content performance, and actionable recommendations delivered as both a dashboard and an email digest.
4. **Single pane of glass** — one Artifact dashboard where both founders can review drafts, approve content, see ad performance, and act on recommendations.
5. **Minimal manual time** — the system should reduce, not increase, the founders' marketing workload. Target: <15 minutes/week of active input (approving drafts, publishing personal-profile posts, resolving flags).

## 3. Non-Goals (Phase 1)

- Automated publishing to personal LinkedIn profiles (API limitation — not possible)
- Voice Guide Builder skill (Phase 2)
- Uzziah's brand content (Phase 2 — requires his voice docs and the Voice Builder)
- Evergreen content site / blog syndication (Phase 3)
- SEO / backlink automation (Phase 4)
- Outbound sales prospecting / Headhunter agent (Phase 5)

These are documented in the phased roadmap (Section 11) and will each get their own design cycle.

## 4. Architecture

Three layers:

```
┌─────────────────────────────────────────────────┐
│           Intelligence Layer                     │
│     Claude Code Scheduled Routines               │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ Content  │  │   Ad     │  │    Weekly     │  │
│  │ Engine   │  │ Monitor  │  │   Reporter    │  │
│  └────┬─────┘  └────┬─────┘  └──────┬────────┘  │
│       │              │               │           │
└───────┼──────────────┼───────────────┼───────────┘
        │              │               │
        ▼              ▼               ▼
┌─────────────────────────────────────────────────┐
│              API Layer                           │
│         Netlify Functions                        │
│                                                  │
│  ┌──────────────┐ ┌─────────┐ ┌──────────────┐  │
│  │ linkedin-ads │ │ ga4-data│ │linkedin-publi│  │
│  │              │ │         │ │sh            │  │
│  └──────┬───────┘ └────┬────┘ └──────┬───────┘  │
│         │              │             │           │
└─────────┼──────────────┼─────────────┼───────────┘
          │              │             │
          ▼              ▼             ▼
   LinkedIn Marketing  GA4 Data   LinkedIn Pages
        API              API         API
                                      
┌─────────────────────────────────────────────────┐
│         State & Output Layer                     │
│                                                  │
│  ┌──────────────────────────────────────┐        │
│  │        Dashboard Artifact            │        │
│  │   (content queue, ad metrics,        │        │
│  │    funnel view, recommendations)     │        │
│  │                                      │        │
│  │   Artifact Database (shared state)   │        │
│  └──────────────────────────────────────┘        │
│                                                  │
│  ┌──────────────────────────────────────┐        │
│  │   Gmail Digest (weekly email)        │        │
│  └──────────────────────────────────────┘        │
│                                                  │
│  ┌──────────────────────────────────────┐        │
│  │   Push Notifications (approvals,     │        │
│  │   alerts, ready-to-post)             │        │
│  └──────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
```

### Why this split

- **Routines for intelligence:** Claude Code scheduled routines handle everything that requires judgment — drafting content, analyzing performance, generating recommendations. They run on cron with full access to the repo, skills, and tools.
- **Netlify Functions for API access:** Thin authenticated proxies (~50–80 lines each) that hold API credentials in environment variables and return JSON. No business logic. Deployed alongside the existing reinventops.com static site on Netlify.
- **Artifact for state and UI:** The dashboard Artifact's built-in database stores all shared state (draft queue, performance snapshots, config). The Artifact itself is the UI — both founders access it via a bookmarked URL. No separate web app to build.

## 5. Agent 1: Content Engine

**Schedule:** Daily, morning (7:00 AM ET)
**Purpose:** Draft, queue, and publish content across LinkedIn presences

### 5.1 Brands Served (Phase 1)

| Brand | LinkedIn Presence | Publishing Method | Posts/Week |
|---|---|---|---|
| ReinventOps | Company page | Auto-publish via LinkedIn API | 4 |
| The Efficient Engineer (Arielle) | Personal profile | Notification → Arielle pastes | 4 |

Uzziah's brand is Phase 2 (requires his voice docs and the Voice Builder skill).

### 5.2 Campaign Context

The agent carries and applies this strategic context when drafting:

- The AI Readiness Assessment campaign launched Aug 31 at $50/day, ran ~2 weeks, and was paused based on early performance data.
- A simpler campaign is in development: a direct landing page with a CTA to book a call, without the assessment funnel.
- The assessment is being repositioned as a nurture tool for prospects already in conversation, not the front-door lead magnet.
- Content should lead with the direct value proposition of AI transformation services. Assessment insights (archetypes, scoring framework, workflow ROI) are thought leadership fuel, not always a CTA destination.

This context is stored in a config document in the Artifact DB and can be updated by the founders as strategy evolves.

### 5.3 Daily Run Sequence

**Step 1 — Calendar check.** Read the content calendar to determine what's scheduled for today across both brands. The calendar is a collection in the Artifact DB with fields: date, brand, topic, format, status.

**Step 2 — "Ear to the street" scan.** Search recent AI industry news (via web search), LinkedIn trending topics, and notable developments relevant to the ICP (operations/IT leaders at 50–250 employee companies). Write flagged opportunities to the Artifact DB's `news_feed` collection with a brief angle note: "OpenAI released Codex 2.0 — ReinventOps angle: what this means for mid-market ops teams automating developer-adjacent workflows."

**Step 3 — Performance pull.** Read from the Artifact DB which recent posts got engagement. Use this to weight topic/format selection: if list-format posts are outperforming narrative posts 2:1, lean toward lists.

**Step 4 — Draft posts.** For each post due today:

- **ReinventOps:** Consultative, ROI-focused voice. Source material: ICP doc (`docs/Initial_Ideal_Customer_Profile_ICP.md`), archetype framework (`content/archetypes.md`), ROI diagnostic (`docs/AI Workflow ROI Diagnostic Framework.md`), news feed items, content calendar topic. Positions the company as the guide for mid-market AI transformation.
- **The Efficient Engineer (Arielle):** Personal, opinionated, practitioner voice. Source material: captured thoughts (via `/capture` pipeline in content-os), editorial calendar, news feed. Built from Arielle's own words and thinking where possible. Existing style references: published posts, content-os voice guide (`content-os/strategy/`). Voice Guide Builder skill (Phase 2) will sharpen this further.

Each draft is written to the Artifact DB `drafts` collection: `{brand, content, suggested_publish_date, suggested_publish_time, source_material, status: "pending_approval", created_at}`.

**Step 5 — Notify.** Send Arielle a Claude Code push notification: "N new drafts ready for review in your marketing dashboard." (Push notifications for Arielle since she uses Claude Code; email notifications for Uzziah once his brand is added in Phase 2.)

### 5.4 Subsequent Runs — Publishing and Verification

**Step 6 — Check for approved drafts.** Query `drafts` collection for `status: "approved"` where `suggested_publish_date` has passed.

**Step 7 — Publish.**
- ReinventOps: call the `linkedin-publish` Netlify function with the post content. On success, update draft status to `published` with the LinkedIn post URL.
- The Efficient Engineer: send Arielle the final copy in a notification — "Ready to paste on LinkedIn" with the text pre-formatted for copy/paste.

**Step 8 — Verify yesterday's publishes.** At the start of each daily run, before drafting new content, verify posts that were published (or should have been published) on the previous day's run:
- ReinventOps: call the LinkedIn API to confirm the post exists and is live. If it failed or is missing, update status to `publish_failed` and notify.
- The Efficient Engineer: check whether Arielle marked the post as published in the dashboard. If not marked within 24 hours, send a reminder notification. If still unconfirmed after 48 hours, flag in the dashboard as "missed — requeue?"
- If any post failed or wasn't published, offer to requeue for the next available slot.

### 5.5 Content Calendar Seeding

The Content Engine needs an initial content calendar to start. The first run of the system should include a calendar-generation step that creates 2 weeks of scheduled content based on:
- The existing content strategy docs
- The assessment archetype framework (4 archetypes = 4 angles)
- The ICP pain points
- Current AI industry landscape

After initial seeding, the calendar is maintained by the Weekly Reporter (which adds recommendations) and by the founders (who can add/modify entries in the dashboard).

## 6. Agent 2: Ad Monitor

**Schedule:** Daily, morning (7:30 AM ET, after Content Engine)
**Purpose:** Track ad campaign performance and make/recommend adjustments

### 6.1 Daily Run Sequence

**Step 1 — Campaign status check.** Call `linkedin-ads` Netlify function to get all campaigns and their statuses. If no campaigns are active (all paused or completed), log a no-op to the Artifact DB and exit. Total run time: ~5 seconds.

**Step 2 — Pull LinkedIn ad metrics.** For each active campaign, pull per-ad data:
- Impressions, clicks, CTR, spend
- Conversions (configured by the conversion tracking rule in Campaign Manager)
- Cost per click (CPC), cost per conversion

**Step 3 — Pull GA4 funnel data.** Call `ga4-data` Netlify function:
- For assessment campaigns: filter by `utm_campaign` → landing page sessions, `assessment_cta_click` events, ScoreApp assessment completions (tracked via result page loads)
- For direct-booking campaigns: filter by `utm_campaign` → landing page sessions, booking CTA clicks, Calendly booking completions (requires Calendly-to-GA4 integration, flagged as a setup requirement)

**Step 4 — Write daily snapshot.** Store in the Artifact DB `ad_snapshots` collection: `{date, campaign_id, campaign_name, per_ad_metrics: [...], funnel_metrics: {...}, total_spend, budget_remaining}`.

**Step 5 — Evaluate and act.**

| Condition | Threshold | Action | Type |
|---|---|---|---|
| Ad CTR < 0.3% after 1,000+ impressions and another ad is 2x+ better | Configurable | Auto-pause underperformer, log action. Safety: never auto-pause if it would leave fewer than 2 active ads in the campaign. | Minor auto |
| Daily spend pacing > 120% of target | Configurable | Notify: "Campaign X overspending" | Alert |
| No conversions after 3+ days of spend | Fixed | Notify: "Campaign X spent $Y with zero conversions" | Flag |
| One creative > 2x CTR + conversions vs. others | Fixed | Recommend: "Concentrate budget on winning creative" | Flag |
| Campaign at 80%+ of lifetime budget | Fixed | Notify: "Campaign X near budget cap, N days remaining" | Alert |
| Funnel drop-off spike (clicks up, conversions flat/down) | Week-over-week comparison | Notify: "Landing page may have an issue" | Flag |

Thresholds marked "Configurable" are stored in the Artifact DB `config` collection and can be adjusted in the dashboard.

**Step 6 — Update dashboard and notify.** Write any actions taken or flags raised to the Artifact DB. Send a notification only if something happened (action taken, threshold crossed, or campaign milestone). Silent otherwise.

### 6.2 Auto-Action Logging

Every automated action (e.g., pausing an ad) is logged to the `agent_actions` collection: `{timestamp, agent: "ad_monitor", action: "pause_ad", details: {...}, reason: "CTR 0.18% after 1,247 impressions; Ad A4 at 0.52%"}`. This gives the founders a complete audit trail.

## 7. Agent 3: Weekly Reporter

**Schedule:** Friday, 4:00 PM ET
**Purpose:** Aggregate the week's data, update the dashboard, send the email digest

### 7.1 Weekly Run Sequence

**Step 1 — Read the week's data.** Pull all `ad_snapshots` and `content_published` records from the Artifact DB for the current week (Monday–Friday).

**Step 2 — Compute weekly aggregates.**

*Ad funnel (per campaign):*
- Impressions → Clicks → Landing page visits → Conversions → Booked calls
- Cost per step (CPC, cost per conversion, cost per booking)
- Week-over-week trend (% change from previous week)
- Per-creative breakdown (which ad is winning)

*Content performance (per brand):*
- Posts published (count, on-schedule rate)
- Engagement metrics for ReinventOps company page (via LinkedIn API): likes, comments, reposts, impressions
- Personal profile engagement: whatever Arielle/Uzziah have noted in the dashboard (the API cannot pull personal profile analytics)
- Top-performing post of the week

*Pipeline summary:*
- New leads from ads
- Assessment completions
- Calls booked
- Conversion rates at each step

**Step 3 — Generate the report.** A structured weekly report containing:
- Funnel visualization (numbers at each stage with directional indicators ↑↓→)
- Win/loss callouts (specific, actionable: "Ad A4 drove 73% of conversions at half the CPC of B4")
- Content callouts ("Arielle's post on AI workflow audits got 3x average engagement — consider a series")
- Open flags from the Ad Monitor that haven't been decided
- Recommendations for next week: content topics, ad adjustments, budget moves
- Content calendar suggestions for next week (added to `content_calendar` collection)

**Step 4 — Update dashboard Artifact.** Publish the weekly summary view to the dashboard.

**Step 5 — Send email digest.** Via Gmail (using the Gmail MCP tools), send a concise email to both Arielle and Uzziah:
- Subject: "ReinventOps Weekly Marketing Report — Week of [date]"
- Body: the key numbers, top callouts, and action items
- Link to the full dashboard Artifact for details

## 8. Dashboard Artifact

A single persistent Artifact page, bookmarked by both founders.

### 8.1 Sections

| Section | Purpose | Updated By |
|---|---|---|
| **Content Queue** | Draft posts pending approval. Approve/Edit/Reject buttons per draft. Organized by brand, sorted by publish date. | Content Engine |
| **Publishing Log** | Posts published this week. Verification status: confirmed live / pending verification / failed. Links to live posts. | Content Engine |
| **Ad Performance** | Current campaign metrics. Daily trend mini-charts. Active alerts and flags with Acknowledge/Decide buttons. | Ad Monitor |
| **Funnel View** | End-to-end pipeline: impressions → clicks → visits → conversions → bookings. Updated weekly. | Weekly Reporter |
| **Recommendations** | Open items needing founder decisions, ranked by urgency. | All agents |
| **AI News Feed** | "Ear to the street" items flagged as content opportunities. Mark as "use" or "skip." | Content Engine |
| **Agent Log** | Audit trail of all automated actions taken. | All agents |
| **Settings** | Configurable thresholds, content calendar, campaign config, notification preferences. | Founders |

### 8.2 Artifact Database Collections

| Collection | Purpose | Key Fields |
|---|---|---|
| `drafts` | Content draft queue | brand, content, suggested_publish_date, status, created_at, approved_at, published_url |
| `content_calendar` | Editorial schedule | date, brand, topic, format, status |
| `ad_snapshots` | Daily ad performance | date, campaign_id, per_ad_metrics, funnel_metrics, total_spend |
| `content_published` | Published post records | brand, published_date, linkedin_url, engagement_metrics, verified |
| `news_feed` | AI news items for content ideas | date, headline, source, angle, brand_fit, status |
| `agent_actions` | Audit log of automated actions | timestamp, agent, action, details, reason |
| `flags` | Items needing founder decisions | type, urgency, summary, details, status, created_by, resolved_at |
| `config` | System configuration | thresholds, schedules, brand_settings, notification_prefs |
| `weekly_reports` | Historical weekly summaries | week_start, ad_summary, content_summary, funnel_summary, recommendations |

### 8.3 Approval Flow

1. Content Engine writes a draft → `drafts` collection, status `pending_approval`
2. Founder opens dashboard → Content Queue section shows pending drafts
3. Founder clicks **Approve** → status updates to `approved`
4. Founder clicks **Edit** → inline edit, then approve → status updates to `approved` with edited content
5. Founder clicks **Reject** → status updates to `rejected`, Content Engine will generate a replacement on next run
6. On next Content Engine run → approved drafts past their publish time get published

For ad flags, the flow is similar: Ad Monitor writes a flag → Recommendations section shows it → founder decides → Content Engine or Ad Monitor acts on the decision.

## 9. API Layer — Netlify Functions

Three functions deployed to the existing reinventops.com Netlify site.

### 9.1 `linkedin-ads`

**Purpose:** Authenticated proxy to the LinkedIn Marketing API for ad campaign data and management.

**Endpoints:**
- `GET /.netlify/functions/linkedin-ads?action=campaigns` — list campaigns with status
- `GET /.netlify/functions/linkedin-ads?action=analytics&campaign_id=X&start=YYYY-MM-DD&end=YYYY-MM-DD` — per-ad metrics for a campaign and date range
- `POST /.netlify/functions/linkedin-ads` with `{action: "pause_ad", ad_id: X}` — pause a specific ad
- `POST /.netlify/functions/linkedin-ads` with `{action: "unpause_ad", ad_id: X}` — unpause a specific ad

**Auth:** LinkedIn Marketing API access token stored in Netlify environment variable `LINKEDIN_ACCESS_TOKEN`. The token requires `r_ads` and `rw_ads` scopes on an approved LinkedIn developer app associated with the ReinventOps ad account.

**Security:** Each function validates a shared secret (`AGENT_API_KEY` env var) passed via `Authorization: Bearer` header. This prevents unauthorized access while keeping the functions simple.

### 9.2 `ga4-data`

**Purpose:** Authenticated proxy to the Google Analytics 4 Data API.

**Endpoints:**
- `GET /.netlify/functions/ga4-data?action=funnel&start=YYYY-MM-DD&end=YYYY-MM-DD&utm_campaign=X` — funnel metrics (sessions, events, conversions) filtered by UTM campaign
- `GET /.netlify/functions/ga4-data?action=events&start=YYYY-MM-DD&end=YYYY-MM-DD&event_name=X` — specific event counts

**Auth:** Google service account credentials stored in Netlify environment variable `GA4_SERVICE_ACCOUNT_JSON`. The service account needs Viewer access on the GA4 property `G-FLG1S0R8ZH`.

### 9.3 `linkedin-publish`

**Purpose:** Authenticated proxy for publishing posts to the ReinventOps LinkedIn company page.

**Endpoints:**
- `POST /.netlify/functions/linkedin-publish` with `{content: "...", visibility: "PUBLIC"}` — publish a text post to the company page
- `GET /.netlify/functions/linkedin-publish?action=verify&post_id=X` — check if a specific post exists and is live
- `GET /.netlify/functions/linkedin-publish?action=analytics&post_id=X` — get engagement metrics for a post

**Auth:** LinkedIn API access token with `w_organization_social` and `r_organization_social` scopes, stored in `LINKEDIN_PAGE_ACCESS_TOKEN`. This requires a verified LinkedIn developer app with the company page admin's authorization.

### 9.4 Shared Conventions

- All functions are Node.js, deployed via Netlify's built-in functions support (no separate build pipeline)
- All return JSON with a consistent shape: `{ok: true, data: {...}}` or `{ok: false, error: "message"}`
- All validate the `Authorization: Bearer` header against `AGENT_API_KEY`
- All log requests to Netlify's built-in function logs for debugging
- Rate limiting: the LinkedIn Marketing API has a 100-request/day limit for most endpoints. The agents' daily cadence stays well within this. The GA4 API allows 10,000 requests/day per project.

## 10. Integration Setup Requirements

These must be completed before the system can run:

| Requirement | What's Needed | Effort |
|---|---|---|
| **LinkedIn Developer App** | Register at linkedin.com/developers. Request Marketing API Product access (for ad data) and Community Management API access (for company page publishing). Requires review/approval — can take 1–5 business days. | Medium |
| **LinkedIn OAuth tokens** | After app approval, run the OAuth flow to get access tokens with required scopes. Tokens expire (60 days for access, 1 year for refresh). The Netlify function must handle refresh. | Medium |
| **Google service account** | Create in Google Cloud Console. Grant Viewer access on the GA4 property. Download JSON key. Store in Netlify env. | Low |
| **Netlify env vars** | Set `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_PAGE_ACCESS_TOKEN`, `GA4_SERVICE_ACCOUNT_JSON`, `AGENT_API_KEY` in the Netlify site's environment settings. | Low |
| **ReinventOps company page admin** | The LinkedIn developer app must be associated with an account that is an admin of the ReinventOps LinkedIn company page. | Low (if Arielle is already admin) |
| **Calendly-to-GA4 integration** | To track booked calls in the funnel, Calendly booking confirmations need to fire a GA4 event. This can be done via Calendly's webhook → a Netlify function → GA4 Measurement Protocol, or via Zapier/Make. | Medium |
| **Gmail MCP access** | The Weekly Reporter uses the Gmail MCP tools (already connected in this session) to send digest emails. Verify it can send as the desired "from" address. | Low |
| **Content calendar initial seed** | Populate at least 2 weeks of content topics/dates for both brands. Can be done during first system run. | Low |
| **Arielle's existing content as style reference** | Gather 10–20 published LinkedIn posts from The Efficient Engineer as voice training material. Store in `content/voice-references/arielle/`. | Low |

## 11. Phased Roadmap (Beyond Phase 1)

### Phase 2: Voice Builder + Uzziah's Brand
- **Voice Guide Builder** — an interactive Claude Code skill that profiles a person's writing voice through A/B choices ("would you say it this way or that way?"). Produces a structured voice profile (vocabulary preferences, sentence patterns, tone markers, topics to lean into/avoid) that the Content Engine uses when drafting.
- Run the Voice Builder for Arielle first (to improve The Efficient Engineer content), then Uzziah.
- Onboard Uzziah's content docs, example posts, and brand positioning.
- Update Content Engine for 3-brand publishing (12 posts/week).
- **Depends on:** Phase 1 running (Content Engine needs to exist to consume the voice profiles).

### Phase 3: Evergreen Content Site
- Choose platform: Substack (simplest, built-in newsletter), Netlify blog with static site generator (most control, stays in existing stack), or Ghost (middle ground).
- Build a syndication workflow: LinkedIn posts get expanded into longer-form blog/article versions automatically by the Content Engine.
- Newsletter signup capture and delivery.
- **Depends on:** Phase 1 (content pipeline needs to be producing reliably before we add a distribution channel).

### Phase 4: SEO Automation
- Keyword research workflow for content optimization.
- Backlink outreach automation: identify relevant sites, draft pitches, track responses.
- Internal linking strategy across published articles.
- **Depends on:** Phase 3 (needs the evergreen content site to exist for SEO to apply to).

### Phase 5: Headhunter (Agent 4)
- **Company research engine:** Search for companies matching ICP criteria (50–250 employees, knowledge-work industries, US-based). Sources: LinkedIn, Crunchbase, job boards, company websites.
- **Fit scoring model:** Analyze public signals — are they hiring for AI/automation roles (indicates need), do their job descriptions mention manual processes (indicates pain), what's their tech stack, are they growing?
- **Pitch generator:** Create personalized outreach tailored to each company's specific situation and publicly visible needs.
- **Outreach delivery:** Email infrastructure with proper domain warming, CAN-SPAM compliance, opt-out handling. LinkedIn InMail for paid outreach.
- **Response handling:** Conversational agent that classifies responses (interested / not now / not interested / question) and routes appropriately.
- **Pipeline tracking:** CRM-like state machine: researched → qualified → pitched → responded → in conversation → meeting booked.
- **Depends on:** Phase 1 running (needs the brand and content foundation established). This is a major build — its own design spec.

## 12. Success Criteria (Phase 1)

| Metric | Target |
|---|---|
| Content published on schedule | 8 posts/week in Phase 1 (4 per brand × 2 brands), >90% on-time rate |
| Founder time per week | <15 minutes (approve drafts, publish personal posts, review weekly report) |
| Ad monitoring coverage | Daily automated pull, zero days with stale data while a campaign runs |
| Auto-actions logged | 100% of automated ad adjustments logged with reasoning |
| Weekly report delivery | Delivered every Friday without manual intervention |
| Dashboard uptime | Available whenever founders check it |

## 13. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| LinkedIn developer app approval takes too long or is denied | Cannot publish via API or pull ad data programmatically | Start the application immediately. Fall back to browser-based data pulls (fragile but functional) while waiting. |
| LinkedIn API token expiry (60-day access tokens) | Publishing and data pull break silently | Implement refresh-token flow in Netlify function. Ad Monitor alerts on auth failures. |
| Content quality doesn't match founder voice | Posts feel generic, erode brand | Phase 2 Voice Builder will address this. Phase 1 uses existing style references and requires approval on every post. |
| Personal profile posts don't get published | Arielle/Uzziah forget to paste and publish | Verification step with reminders. Track on-time rate in dashboard. |
| GA4 Measurement Protocol or Calendly integration breaks | Funnel data incomplete (missing bookings) | Ad Monitor flags when expected conversion events stop appearing. |
| Artifact DB hits capacity or performance limits | Dashboard becomes slow or unusable | Monitor DB size. Archive old snapshots periodically (keep 90 days rolling). |
