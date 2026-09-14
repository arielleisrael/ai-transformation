# Marketing Agent System (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an end-to-end marketing operations system with three Claude Code scheduled routines (Content Engine, Ad Monitor, Weekly Reporter), three Netlify API proxy functions (GA4, LinkedIn Ads, LinkedIn Publish), and a single Artifact dashboard with shared database for content approval, performance tracking, and reporting.

**Architecture:** Claude Code scheduled routines handle intelligence (drafting content, analyzing ad performance, generating reports). Thin Netlify Functions proxy authenticated API calls to LinkedIn Marketing API and GA4 Data API. A persistent Artifact with built-in database serves as both the shared state store and the founders' dashboard. Gmail MCP sends the weekly digest.

**Tech Stack:** Node.js (Netlify Functions v2, ESM), Google Analytics Data API (REST), LinkedIn Marketing API (REST, v202406), LinkedIn Community Management API (REST), Artifact DB for state, Claude Code scheduled tasks for agent routines, Gmail MCP for email.

## Global Constraints

- Netlify Functions use ESM (`export default`) and Node.js 18+
- All API proxy functions validate `Authorization: Bearer {AGENT_API_KEY}` and return `{ok: true, data}` or `{ok: false, error}`
- LinkedIn API requires header `LinkedIn-Version: 202406` and `X-Restli-Protocol-Version: 2.0.0`
- Artifact DB documents are JSON objects, max 256 KiB, max 5,000 docs per artifact
- Artifact must be theme-aware (light + dark), responsive to 400px, 16px body side padding
- Brand palette: `--brand-green: #0F3D37`, `--brand-slate: #2E3338`, `--brand-blue: #8FA3B5`, `--brand-cream: #F5F2ED`
- Scheduled routine prompts must be fully self-contained — no reference to this conversation
- LinkedIn personal profiles cannot publish via API — only company pages
- The `{DASHBOARD_URL}` placeholder in Tasks 4–6 is replaced with the actual Artifact URL produced by Task 3
- The `{NETLIFY_SITE_URL}` placeholder is `https://reinventops.com`

---

### Task 1: Netlify Functions — Scaffolding + GA4 Data Proxy

**Files:**
- Create: `netlify.toml`
- Create: `package.json`
- Create: `netlify/functions/lib/auth.mjs`
- Create: `netlify/functions/ga4-data.mjs`

**Interfaces:**
- Consumes: Google service account JSON (env var `GA4_SERVICE_ACCOUNT_JSON`), GA4 property ID (env var `GA4_PROPERTY_ID`), shared API key (env var `AGENT_API_KEY`)
- Produces: `GET /.netlify/functions/ga4-data?action=funnel&start=YYYY-MM-DD&end=YYYY-MM-DD&utm_campaign=X` returns `{ok, data}` with GA4 report rows; `action=events&event_name=X` returns event counts by date

- [ ] **Step 1: Create `netlify.toml`**

```toml
[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[build]
  publish = "."
```

This tells Netlify where to find functions and that the static site root is the current directory (the existing `index.html` stays as-is).

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "reinventops-site",
  "private": true,
  "type": "module",
  "engines": { "node": ">=18" },
  "dependencies": {
    "google-auth-library": "^9.0.0"
  }
}
```

Only one dependency: the Google auth library for service account authentication. LinkedIn functions use plain `fetch` (built into Node 18+).

- [ ] **Step 3: Create shared auth module at `netlify/functions/lib/auth.mjs`**

```javascript
export function validateApiKey(req) {
  const header = req.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "");
  return token === process.env.AGENT_API_KEY;
}

export function unauthorized() {
  return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export function badRequest(message) {
  return Response.json({ ok: false, error: message }, { status: 400 });
}

export function serverError(err) {
  console.error(err);
  return Response.json({ ok: false, error: err.message }, { status: 500 });
}

export function ok(data) {
  return Response.json({ ok: true, data });
}
```

- [ ] **Step 4: Create `netlify/functions/ga4-data.mjs`**

```javascript
import { GoogleAuth } from "google-auth-library";
import { validateApiKey, unauthorized, badRequest, serverError, ok } from "./lib/auth.mjs";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const GA4_ENDPOINT = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`;

let authClient;
async function getToken() {
  if (!authClient) {
    authClient = new GoogleAuth({
      credentials: JSON.parse(process.env.GA4_SERVICE_ACCOUNT_JSON),
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });
  }
  const client = await authClient.getClient();
  const { token } = await client.getAccessToken();
  return token;
}

async function runReport(token, body) {
  const res = await fetch(GA4_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GA4 API ${res.status}: ${await res.text()}`);
  return res.json();
}

export default async (req) => {
  if (!validateApiKey(req)) return unauthorized();

  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");

  if (!action || !start || !end) return badRequest("Required: action, start, end");

  try {
    const token = await getToken();

    if (action === "funnel") {
      const utmCampaign = url.searchParams.get("utm_campaign");
      const body = {
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }, { name: "sessions" }],
      };
      if (utmCampaign) {
        body.dimensionFilter = {
          filter: {
            fieldName: "sessionCampaignName",
            stringFilter: { matchType: "EXACT", value: utmCampaign },
          },
        };
      }
      return ok(await runReport(token, body));
    }

    if (action === "events") {
      const eventName = url.searchParams.get("event_name");
      const body = {
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "eventCount" }],
      };
      if (eventName) {
        body.dimensionFilter = {
          filter: {
            fieldName: "eventName",
            stringFilter: { matchType: "EXACT", value: eventName },
          },
        };
      }
      return ok(await runReport(token, body));
    }

    return badRequest(`Unknown action: ${action}`);
  } catch (err) {
    return serverError(err);
  }
};
```

- [ ] **Step 5: Run `npm install` and verify directory structure**

```bash
npm install
```

Verify the structure:
```
netlify.toml
package.json
package-lock.json
node_modules/
netlify/functions/lib/auth.mjs
netlify/functions/ga4-data.mjs
index.html  (existing)
```

- [ ] **Step 6: Test locally with Netlify CLI**

```bash
npx netlify dev
```

In another terminal, test with curl (this will fail auth since no env vars are set locally, which confirms the auth check works):

```bash
curl "http://localhost:8888/.netlify/functions/ga4-data?action=funnel&start=2026-09-01&end=2026-09-14"
```

Expected: `{"ok":false,"error":"Unauthorized"}`

- [ ] **Step 7: Commit**

```bash
git add netlify.toml package.json netlify/functions/
git commit -m "feat: add Netlify Functions scaffolding and GA4 data proxy"
```

---

### Task 2: Netlify Functions — LinkedIn API Proxies

**Files:**
- Create: `netlify/functions/lib/linkedin.mjs`
- Create: `netlify/functions/linkedin-ads.mjs`
- Create: `netlify/functions/linkedin-publish.mjs`

**Interfaces:**
- Consumes: `LINKEDIN_ACCESS_TOKEN` (ads, r_ads + rw_ads scopes), `LINKEDIN_PAGE_ACCESS_TOKEN` (publishing, w_organization_social + r_organization_social scopes), `LINKEDIN_AD_ACCOUNT_ID`, `LINKEDIN_ORG_ID`, `AGENT_API_KEY`
- Produces:
  - `linkedin-ads`: `GET ?action=campaigns` → campaign list; `GET ?action=analytics&campaign_id=X&start=D&end=D` → per-creative metrics; `POST {action:"pause_ad",ad_id:X}` → pauses ad; `POST {action:"unpause_ad",ad_id:X}` → unpauses ad
  - `linkedin-publish`: `POST {content:"...",visibility:"PUBLIC"}` → publishes to company page, returns post URN; `GET ?action=verify&post_urn=X` → confirms post exists; `GET ?action=analytics&post_urn=X` → per-post engagement metrics; `GET ?action=page_stats` → company page aggregate analytics

- [ ] **Step 1: Create shared LinkedIn client at `netlify/functions/lib/linkedin.mjs`**

```javascript
const API_BASE = "https://api.linkedin.com/rest";
const API_VERSION = "202406";

export async function linkedinFetch(path, token, options = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "LinkedIn-Version": API_VERSION,
      "X-Restli-Protocol-Version": "2.0.0",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`LinkedIn API ${res.status}: ${text}`);
  return text ? JSON.parse(text) : { status: res.status };
}
```

- [ ] **Step 2: Create `netlify/functions/linkedin-ads.mjs`**

```javascript
import { validateApiKey, unauthorized, badRequest, serverError, ok } from "./lib/auth.mjs";
import { linkedinFetch } from "./lib/linkedin.mjs";

export default async (req) => {
  if (!validateApiKey(req)) return unauthorized();

  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const accountId = process.env.LINKEDIN_AD_ACCOUNT_ID;

  try {
    if (req.method === "GET") {
      const url = new URL(req.url);
      const action = url.searchParams.get("action");

      if (action === "campaigns") {
        const data = await linkedinFetch(
          `/adCampaigns?q=search&search=(account:(values:List(urn:li:sponsoredAccount:${accountId})))&count=50`,
          token
        );
        return ok(data);
      }

      if (action === "analytics") {
        const campaignId = url.searchParams.get("campaign_id");
        const start = url.searchParams.get("start");
        const end = url.searchParams.get("end");
        if (!campaignId || !start || !end) return badRequest("Required: campaign_id, start, end");
        const [sy, sm, sd] = start.split("-").map(Number);
        const [ey, em, ed] = end.split("-").map(Number);
        const data = await linkedinFetch(
          `/adAnalytics?q=analytics&pivot=CREATIVE` +
            `&dateRange=(start:(year:${sy},month:${sm},day:${sd}),end:(year:${ey},month:${em},day:${ed}))` +
            `&campaigns=List(urn:li:sponsoredCampaign:${campaignId})` +
            `&fields=impressions,clicks,costInLocalCurrency,externalWebsiteConversions,dateRange`,
          token
        );
        return ok(data);
      }

      return badRequest(`Unknown GET action: ${action}`);
    }

    if (req.method === "POST") {
      const body = await req.json();
      if (body.action === "pause_ad" || body.action === "unpause_ad") {
        if (!body.ad_id) return badRequest("Required: ad_id");
        const status = body.action === "pause_ad" ? "PAUSED" : "ACTIVE";
        const data = await linkedinFetch(`/adCreatives/${body.ad_id}`, token, {
          method: "POST",
          body: JSON.stringify({ patch: { $set: { status } } }),
        });
        return ok(data);
      }
      return badRequest(`Unknown POST action: ${body.action}`);
    }

    return badRequest("Method not allowed");
  } catch (err) {
    return serverError(err);
  }
};
```

- [ ] **Step 3: Create `netlify/functions/linkedin-publish.mjs`**

```javascript
import { validateApiKey, unauthorized, badRequest, serverError, ok } from "./lib/auth.mjs";
import { linkedinFetch } from "./lib/linkedin.mjs";

export default async (req) => {
  if (!validateApiKey(req)) return unauthorized();

  const token = process.env.LINKEDIN_PAGE_ACCESS_TOKEN;
  const orgId = process.env.LINKEDIN_ORG_ID;

  try {
    if (req.method === "POST") {
      const body = await req.json();
      if (!body.content) return badRequest("Required: content");
      const data = await linkedinFetch("/posts", token, {
        method: "POST",
        body: JSON.stringify({
          author: `urn:li:organization:${orgId}`,
          commentary: body.content,
          visibility: body.visibility || "PUBLIC",
          distribution: {
            feedDistribution: "MAIN_FEED",
            targetEntities: [],
            thirdPartyDistributionChannels: [],
          },
          lifecycleState: "PUBLISHED",
        }),
      });
      return ok(data);
    }

    if (req.method === "GET") {
      const url = new URL(req.url);
      const action = url.searchParams.get("action");

      if (action === "verify") {
        const postUrn = url.searchParams.get("post_urn");
        if (!postUrn) return badRequest("Required: post_urn");
        const data = await linkedinFetch(`/posts/${encodeURIComponent(postUrn)}`, token);
        return ok(data);
      }

      if (action === "analytics") {
        const postUrn = url.searchParams.get("post_urn");
        if (!postUrn) return badRequest("Required: post_urn");
        const data = await linkedinFetch(
          `/organizationalEntityShareStatistics?q=organizationalEntity` +
            `&organizationalEntity=urn:li:organization:${orgId}` +
            `&shares=List(${encodeURIComponent(postUrn)})`,
          token
        );
        return ok(data);
      }

      if (action === "page_stats") {
        const data = await linkedinFetch(
          `/organizationalEntityShareStatistics?q=organizationalEntity` +
            `&organizationalEntity=urn:li:organization:${orgId}`,
          token
        );
        return ok(data);
      }

      return badRequest(`Unknown GET action: ${action}`);
    }

    return badRequest("Method not allowed");
  } catch (err) {
    return serverError(err);
  }
};
```

- [ ] **Step 4: Test locally**

```bash
npx netlify dev
```

Test auth validation:
```bash
curl "http://localhost:8888/.netlify/functions/linkedin-ads?action=campaigns"
```
Expected: `{"ok":false,"error":"Unauthorized"}`

Test with a fake API key (will fail at LinkedIn API since no real token, but confirms routing works):
```bash
curl -H "Authorization: Bearer test" "http://localhost:8888/.netlify/functions/linkedin-ads?action=campaigns"
```
Expected: `{"ok":false,"error":"LinkedIn API 401: ..."}` (auth passed, LinkedIn rejected)

- [ ] **Step 5: Commit**

```bash
git add netlify/functions/lib/linkedin.mjs netlify/functions/linkedin-ads.mjs netlify/functions/linkedin-publish.mjs
git commit -m "feat: add LinkedIn ads and publish API proxy functions"
```

- [ ] **Step 6: Deploy to Netlify**

Push the branch and trigger a deploy (or use Netlify CLI):

```bash
git push origin HEAD
```

After deploy, set environment variables in Netlify UI (Site settings → Environment variables):
- `AGENT_API_KEY` — generate a random 32-char string
- `GA4_SERVICE_ACCOUNT_JSON` — the Google service account key JSON (after creating it in Google Cloud Console)
- `GA4_PROPERTY_ID` — the numeric GA4 property ID for `G-FLG1S0R8ZH` (find in GA4 Admin → Property Settings)
- `LINKEDIN_ACCESS_TOKEN` — after LinkedIn dev app is approved and OAuth flow is completed
- `LINKEDIN_PAGE_ACCESS_TOKEN` — same, with organization scopes
- `LINKEDIN_AD_ACCOUNT_ID` — from LinkedIn Campaign Manager URL
- `LINKEDIN_ORG_ID` — from the ReinventOps LinkedIn company page URL

The LinkedIn env vars can remain unset until the developer app is approved — the functions will return auth errors until then, and the agents are designed to handle this gracefully.

- [ ] **Step 7: Verify deployed GA4 function** (requires Google service account to be set up)

```bash
curl -H "Authorization: Bearer {AGENT_API_KEY}" \
  "https://reinventops.com/.netlify/functions/ga4-data?action=funnel&start=2026-09-01&end=2026-09-14"
```

Expected: `{"ok":true,"data":{...}}` with GA4 report data, or a clear error message if the service account isn't configured yet.

---

### Task 3: Dashboard Artifact

**Files:**
- Create: `dashboard/marketing-hub.html` (local file, published as Artifact)

**Interfaces:**
- Consumes: Artifact DB collections written by agents (`drafts`, `ad_snapshots`, `content_published`, `news_feed`, `agent_actions`, `flags`, `config`, `content_calendar`, `weekly_reports`)
- Produces: A persistent Artifact URL (used by Tasks 4–6 as `{DASHBOARD_URL}`); approval status changes in `drafts` and `flags` collections; config updates in `config` collection

- [ ] **Step 1: Create `dashboard/` directory**

```bash
mkdir -p dashboard
```

- [ ] **Step 2: Write the dashboard HTML**

Create `dashboard/marketing-hub.html`. The dashboard is a single-page app with tab navigation, reading from and writing to the Artifact DB. Key requirements:

**Structure:**
- Header with "ReinventOps Marketing Hub" title in brand green
- Tab bar: Content Queue, Publishing Log, Ad Performance, Funnel, Recommendations, AI News, Agent Log, Settings
- Each tab renders a section from DB data
- Empty states show helpful messages (e.g., "No drafts pending — the Content Engine hasn't run yet")

**Content Queue tab (default):**
- Subscribe to `db.collection("drafts").where("status", "==", "pending_approval").orderBy("suggested_publish_date", "asc")` via `onSnapshot`
- Each draft card shows: brand badge (ReinventOps green / Efficient Engineer blue), content preview (first 280 chars), suggested publish date, source material note
- Three action buttons per draft: **Approve** (sets `status: "approved"`, `approved_at: new Date().toISOString()`), **Edit** (opens inline textarea, then approve with edited content), **Reject** (sets `status: "rejected"`)
- Also show recently approved/published drafts below in a collapsed section

**Publishing Log tab:**
- Subscribe to `db.collection("content_published").orderBy("published_date", "desc").limit(20)`
- Each row: brand, date, content preview, verification status badge (confirmed/pending/failed), link to live post

**Ad Performance tab:**
- Subscribe to `db.collection("ad_snapshots").orderBy("date", "desc").limit(14)` (2 weeks)
- Summary cards at top: total spend, total impressions, total clicks, avg CTR, conversions
- Per-day table: date, impressions, clicks, CTR, spend, conversions
- Active flags from `db.collection("flags").where("status", "==", "open")`

**Funnel tab:**
- Read latest `db.doc("weekly_reports/latest")`
- Display stage-by-stage funnel: Impressions → Clicks → Visits → Starts → Completions → Bookings
- Show numbers and conversion rates between stages
- Week-over-week trend arrows

**Recommendations tab:**
- Subscribe to `db.collection("flags").where("status", "==", "open").orderBy("urgency", "desc")`
- Each flag card: urgency badge, summary, details, action buttons (Acknowledge, Decide, Dismiss)

**AI News tab:**
- Subscribe to `db.collection("news_feed").where("status", "==", "new").orderBy("date", "desc").limit(20)`
- Each item: headline, source, angle suggestion, brand fit
- Buttons: **Use** (marks for content calendar), **Skip** (hides)

**Agent Log tab:**
- Subscribe to `db.collection("agent_actions").orderBy("timestamp", "desc").limit(50)`
- Each row: timestamp, agent name, action, reason

**Settings tab:**
- Read `db.doc("config/thresholds")`
- Editable fields: CTR floor (default 0.3%), outperformance ratio (default 2x), min active ads (default 2)
- Read `db.doc("config/campaign_context")`
- Editable textarea for campaign strategic context
- Save button writes updates to the config docs

**DB and theme setup:**
- Declare capabilities: `{db: {}}`
- On load: `const db = await claude.use("db")` — if null, show "Database unavailable" message
- Theme-aware: define light palette on `:root`, override in `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }` and `:root[data-theme="dark"] { ... }`
- Responsive: tabs wrap on narrow screens, cards stack to single column, table scrolls horizontally in `overflow-x: auto` container

Write the complete HTML file with all sections, styles, and JavaScript. The JS should use `onSnapshot` for live-updating sections and `set`/`update` for write actions. Handle `null` DB gracefully.

- [ ] **Step 3: Publish the Artifact**

Use the Artifact tool to publish `dashboard/marketing-hub.html` with:
- `favicon`: "📊"
- `icon`: "dashboard"
- `description`: "Content approval, ad monitoring, and funnel analytics for ReinventOps marketing"
- `capabilities`: `{db: {}}`

Record the returned Artifact URL — this is `{DASHBOARD_URL}` used in Tasks 4–6.

- [ ] **Step 4: Seed initial config documents**

Using the Artifact tool's `write_db` action, seed the config:

**Thresholds** — `config/thresholds`:
```json
{
  "ctr_floor": 0.003,
  "outperformance_ratio": 2.0,
  "min_active_ads": 2,
  "zero_conversion_days": 3,
  "budget_alert_pct": 0.8,
  "spend_pacing_alert_pct": 1.2
}
```

**Campaign context** — `config/campaign_context`:
```json
{
  "current_strategy": "The AI Readiness Assessment campaign launched Aug 31 at $50/day, ran ~2 weeks, and was paused based on early performance. A simpler campaign is in development: direct landing page with CTA to book a call. The assessment is repositioned as a nurture tool for prospects already in conversation. Content should lead with direct value proposition of AI transformation services.",
  "brands": {
    "reinventops": {
      "voice": "Consultative, ROI-focused. Speaks to ops/IT leaders at 50-250 employee companies.",
      "linkedin_type": "company_page",
      "posts_per_week": 4
    },
    "efficient_engineer": {
      "voice": "Personal, opinionated, practitioner perspective. Built from captured thoughts.",
      "linkedin_type": "personal_profile",
      "posts_per_week": 4
    }
  },
  "icp": "Operations and IT leaders at US companies with 50-250 employees in knowledge-work industries"
}
```

- [ ] **Step 5: Verify the dashboard**

Open the Artifact URL. Confirm:
- All 8 tabs render and switch correctly
- Empty states display properly ("No drafts pending", etc.)
- Settings tab shows the seeded config values
- Dark mode works (toggle browser theme)
- Mobile layout works (resize to 400px)

- [ ] **Step 6: Commit**

```bash
git add dashboard/
git commit -m "feat: create marketing dashboard Artifact with DB schema"
```

---

### Task 4: Content Engine Scheduled Routine

**Files:**
- Create scheduled task `content-engine` via `create_scheduled_task`
- Create: `content/voice-references/arielle/README.md`

**Interfaces:**
- Consumes: `{DASHBOARD_URL}` Artifact DB (reads `config`, `content_calendar`, `content_published`, `news_feed`; writes `drafts`, `news_feed`, `content_calendar`)
- Produces: Draft posts in `drafts` collection (status `pending_approval`); news items in `news_feed` collection; published posts in `content_published` collection; push notifications for Arielle

- [ ] **Step 1: Collect voice references for Arielle**

Create `content/voice-references/arielle/README.md`:

```markdown
# Voice References — The Efficient Engineer (Arielle)

This directory contains example LinkedIn posts from Arielle's personal profile,
used by the Content Engine as style and voice references.

Add 10-20 published posts as individual markdown files (YYYY-MM-DD-slug.md).
Posts should represent the range of formats and topics Arielle uses.

Until the Voice Guide Builder skill (Phase 2) is complete, these posts
are the primary signal for the agent to match Arielle's voice.
```

Then gather Arielle's recent LinkedIn posts. Open her LinkedIn profile in the browser, copy 10–20 representative posts, and save each as a markdown file in `content/voice-references/arielle/` with the naming pattern `YYYY-MM-DD-short-slug.md`. Each file should contain the raw post text.

- [ ] **Step 2: Seed a 2-week content calendar**

Using the Artifact `write_db` action on `{DASHBOARD_URL}`, write calendar entries to the `content_calendar` collection. Create 8 entries per week (4 per brand × 2 weeks = 16 entries total).

Example entry (doc id = `2026-09-15-reinventops-1`):
```json
{
  "date": "2026-09-15",
  "brand": "reinventops",
  "topic": "Why mid-market companies stall on AI adoption — the scattered-tool problem",
  "format": "thought_leadership",
  "status": "scheduled",
  "source_material": "ICP doc pain points, archetype framework (Spectator → Explorer gap)"
}
```

Generate topics from:
- The 4 archetypes (Spectator, Explorer, Builder, Architect) — each is a content angle
- ICP pain points from `docs/Initial_Ideal_Customer_Profile_ICP.md`
- The campaign pivot narrative (assessment as nurture tool, direct value prop for new outreach)
- Recent AI industry developments

Distribute: Mon/Tue/Thu/Fri for each brand, alternating formats (thought_leadership, listicle, question_hook, case_study_angle).

- [ ] **Step 3: Create the Content Engine scheduled task**

Use `create_scheduled_task` with:
- `taskId`: `content-engine`
- `title`: `Content Engine — daily content drafting and publishing`
- `description`: `Drafts LinkedIn posts for ReinventOps and The Efficient Engineer, manages approval queue, publishes approved content`
- `cronExpression`: `0 7 * * *` (daily at 7:00 AM local time)
- `prompt`: The full agent prompt (below)

**Content Engine prompt:**

```
You are the Content Engine for ReinventOps Group's marketing system. You run daily at 7 AM ET. Your job is to draft LinkedIn posts, manage the approval queue, and publish approved content.

## Your tools
- Artifact tool (read_db, write_db) on URL: {DASHBOARD_URL}
- WebSearch for "ear to the street" AI news scanning
- WebFetch to call Netlify API functions at {NETLIFY_SITE_URL}
- PushNotification to alert Arielle
- Read tool to access voice references and source material in the repo

## Daily sequence

### Phase 0: Verify yesterday's publishes
1. Query `drafts` collection: where status == "published" AND verified == false AND published_date is yesterday or earlier.
2. For each ReinventOps post: call `{NETLIFY_SITE_URL}/.netlify/functions/linkedin-publish?action=verify&post_urn={post_urn}` with header `Authorization: Bearer {AGENT_API_KEY}`. If the post exists, update the draft doc: verified = true. If it fails, update: verified = false, status = "publish_failed", and send a push notification.
3. For each Efficient Engineer post: check if the draft doc has been marked `manually_published: true` in the dashboard. If not and it's been > 24 hours, send a reminder notification. If > 48 hours, update status to "missed" and write a flag to the `flags` collection.

### Phase 1: Ear to the street
1. WebSearch for: "AI automation business news this week", "artificial intelligence enterprise adoption", "AI workflow automation trends"
2. Review the top 5-10 results. For each item relevant to the ICP (ops/IT leaders at 50-250 employee companies):
   - Write to `news_feed` collection: {date, headline, source_url, angle (1-2 sentences on how ReinventOps or Efficient Engineer could use this), brand_fit: "reinventops" or "efficient_engineer" or "both", status: "new"}
3. Keep this brief — 5 minutes max. Flag only genuinely useful angles, not every AI headline.

### Phase 2: Check content calendar
1. Read today's entries from `content_calendar` collection: where date == today's date AND status == "scheduled"
2. If no entries for today, skip to Phase 4 (publishing).
3. Read the campaign context from `config/campaign_context` to ground your voice.
4. Read recent performance from `content_published` collection (last 20 posts) to see which formats and topics got engagement.

### Phase 3: Draft posts
For each calendar entry due today:

**If brand is "reinventops":**
Read these source files for material:
- docs/Initial_Ideal_Customer_Profile_ICP.md (ICP pain points)
- content/archetypes.md (archetype framework)
- docs/AI Workflow ROI Diagnostic Framework.md (ROI angles)
- Any news_feed items tagged brand_fit "reinventops" or "both"

Write in a consultative, ROI-focused voice. Speak to operations and IT leaders at mid-market companies. Lead with the direct value proposition of AI transformation consulting — not always driving to the assessment. Keep posts 150-250 words. No hashtag stacks. End with a clear CTA or thought-provoking question.

**If brand is "efficient_engineer":**
Read Arielle's voice references from content/voice-references/arielle/ — read at least 5 reference posts to absorb her voice before drafting.
Check the content-os capture inbox if accessible for ripe themes.
Use the calendar topic as a starting point but write in Arielle's personal, opinionated voice. Specific beats generic. One idea per post. 150-250 words.

For each draft, write to the `drafts` collection:
{
  brand: "reinventops" or "efficient_engineer",
  content: (the full post text),
  suggested_publish_date: (today's date),
  suggested_publish_time: "09:00",
  source_material: (brief note on what informed this draft),
  calendar_entry_id: (the content_calendar doc id),
  status: "pending_approval",
  created_at: (ISO timestamp)
}

Update the calendar entry: status = "drafted".

### Phase 4: Publish approved content
1. Query `drafts` collection: where status == "approved" AND suggested_publish_date <= today.
2. For each approved ReinventOps draft:
   - Call `{NETLIFY_SITE_URL}/.netlify/functions/linkedin-publish` (POST) with Authorization header and body {content: draft.content, visibility: "PUBLIC"}
   - On success: update draft doc with status = "published", published_date = today, post_urn = (from response), verified = false
   - Write to `content_published` collection: {brand, published_date, post_urn, content_preview (first 100 chars)}
   - On failure: update draft doc with status = "publish_failed", write a flag
3. For each approved Efficient Engineer draft:
   - Send a push notification to Arielle: "Ready to post on LinkedIn (The Efficient Engineer):\n\n{draft content}\n\nCopy and paste this into a new LinkedIn post."
   - Update draft: status = "awaiting_manual_publish", notified_at = now

### Phase 5: Notify
If any new drafts were created in Phase 3, send a push notification:
"📝 {N} new draft(s) ready for review in your Marketing Hub: {DASHBOARD_URL}"

## Important rules
- Never publish to a personal profile via API — it's not possible. Always use the notification flow.
- If the linkedin-publish function returns an auth error, log it as a flag and move on. The LinkedIn API tokens may not be configured yet.
- If no content is due today (no calendar entries, no approved drafts, no publishes to verify), exit quietly after the ear-to-the-street scan.
- Always read the campaign context from config before drafting — the strategy may have changed since the last run.
```

- [ ] **Step 4: Test with a manual run**

Trigger the routine manually:
```bash
# Use the scheduled-tasks tool: run_scheduled_task with taskId "content-engine"
```

Verify:
- News items appear in the `news_feed` collection
- Draft posts appear in the `drafts` collection with status `pending_approval`
- Calendar entries update to status `drafted`
- Push notification received
- Dashboard shows the new drafts in the Content Queue tab

- [ ] **Step 5: Commit voice references**

```bash
git add content/voice-references/
git commit -m "feat: add voice reference collection and content calendar seed"
```

---

### Task 5: Ad Monitor Scheduled Routine

**Files:**
- Create scheduled task `ad-monitor` via `create_scheduled_task`

**Interfaces:**
- Consumes: `{DASHBOARD_URL}` Artifact DB (reads `config/thresholds`, `ad_snapshots`); `{NETLIFY_SITE_URL}` functions (`linkedin-ads`, `ga4-data`)
- Produces: Daily snapshots in `ad_snapshots` collection; flags in `flags` collection; agent actions in `agent_actions` collection; push notifications for alerts

- [ ] **Step 1: Create the Ad Monitor scheduled task**

Use `create_scheduled_task` with:
- `taskId`: `ad-monitor`
- `title`: `Ad Monitor — daily campaign performance check`
- `description`: `Pulls LinkedIn ad and GA4 funnel data, evaluates thresholds, auto-pauses underperformers, flags decisions`
- `cronExpression`: `30 7 * * *` (daily at 7:30 AM, after Content Engine)
- `prompt`: The full agent prompt (below)

**Ad Monitor prompt:**

```
You are the Ad Monitor for ReinventOps Group's marketing system. You run daily at 7:30 AM ET. Your job is to track LinkedIn ad campaign performance, pull GA4 funnel data, flag issues, and make minor automated adjustments.

## Your tools
- Artifact tool (read_db, write_db) on URL: {DASHBOARD_URL}
- WebFetch to call Netlify API functions at {NETLIFY_SITE_URL}
- PushNotification to alert the founders

## Daily sequence

### Step 1: Check campaign status
Call: GET {NETLIFY_SITE_URL}/.netlify/functions/linkedin-ads?action=campaigns
Header: Authorization: Bearer {AGENT_API_KEY}

If the call fails with an auth error (LinkedIn token not configured), log to agent_actions: {timestamp, agent: "ad_monitor", action: "skip", reason: "LinkedIn API not configured yet"} and exit.

Parse the response. If no campaigns have status ACTIVE, log to agent_actions: {timestamp, agent: "ad_monitor", action: "no_op", reason: "No active campaigns"} and exit.

### Step 2: Pull LinkedIn ad metrics
For each active campaign:
Call: GET {NETLIFY_SITE_URL}/.netlify/functions/linkedin-ads?action=analytics&campaign_id={id}&start={yesterday}&end={today}
Header: Authorization: Bearer {AGENT_API_KEY}

Collect per-creative metrics: impressions, clicks, CTR (clicks/impressions), spend (costInLocalCurrency / 10000, as LinkedIn reports in micro-currency), conversions (externalWebsiteConversions).

### Step 3: Pull GA4 funnel data
For each active campaign that has a utm_campaign value:
Call: GET {NETLIFY_SITE_URL}/.netlify/functions/ga4-data?action=funnel&start={yesterday}&end={today}&utm_campaign={value}
Header: Authorization: Bearer {AGENT_API_KEY}

Extract: sessions, assessment_cta_click events, page_view events for result pages.

### Step 4: Write daily snapshot
Write to `ad_snapshots` collection, doc id = today's date + campaign id (e.g., "2026-09-15_campaign123"):
{
  date: "2026-09-15",
  campaign_id: "...",
  campaign_name: "...",
  per_ad_metrics: [{ad_id, impressions, clicks, ctr, spend, conversions}, ...],
  funnel_metrics: {sessions, cta_clicks, completions},
  total_spend: (sum of ad spends),
  budget_remaining: (if available from campaign data)
}

### Step 5: Evaluate thresholds
Read thresholds from Artifact DB: read_db, doc config/thresholds.

For each active campaign, evaluate:

**Auto-pause (minor auto):**
IF an ad's CTR < thresholds.ctr_floor (default 0.003)
AND the ad has 1000+ impressions
AND another ad in the same campaign has CTR > thresholds.outperformance_ratio × this ad's CTR (default 2x)
AND pausing this ad would leave >= thresholds.min_active_ads (default 2) active ads in the campaign
THEN:
- Call POST {NETLIFY_SITE_URL}/.netlify/functions/linkedin-ads with {action: "pause_ad", ad_id: X}
- Log to agent_actions: {timestamp, agent: "ad_monitor", action: "pause_ad", details: {ad_id, campaign_id, ctr, impressions, better_ad_ctr}, reason: "CTR {x}% after {n} impressions; Ad {y} at {z}%"}
- Send push notification: "⏸️ Auto-paused ad {id} in campaign {name} — CTR {x}% vs {z}% for the best performer"

**Alerts and flags:**
- Spend pacing > thresholds.spend_pacing_alert_pct of daily budget → write flag: {type: "alert", urgency: "medium", summary: "Campaign X overspending", details: "Daily spend ${X} vs target ${Y}", status: "open", created_by: "ad_monitor", created_at: now}
- No conversions after thresholds.zero_conversion_days of spend → write flag: {type: "flag", urgency: "high", summary: "Zero conversions after {N} days", details: "Campaign {name} has spent ${X} with no conversions since {date}", status: "open", ...}
- One creative > outperformance_ratio on both CTR and conversions → write flag: {type: "recommendation", urgency: "low", summary: "Concentrate budget on winning creative", details: "Ad {id} outperforming others {ratio}x on CTR and {ratio}x on conversions", status: "open", ...}
- Campaign at > thresholds.budget_alert_pct of lifetime budget → write flag: {type: "alert", urgency: "medium", summary: "Campaign near budget cap", details: "Campaign {name} at {pct}% of budget, {days} days remaining", status: "open", ...}
- Funnel drop-off: if today's clicks are up >20% but completions are flat or down vs 7-day average → write flag: {type: "flag", urgency: "high", summary: "Funnel drop-off detected", details: "Clicks up {pct}% but completions flat — landing page may have an issue", status: "open", ...}

### Step 6: Notify
If any flags were written or auto-actions taken, send a push notification summarizing what happened.
If nothing notable happened, exit silently — no notification.

## Important rules
- If LinkedIn API calls fail, log the failure and skip the LinkedIn-dependent steps. Still pull GA4 data if possible.
- Use the AGENT_API_KEY environment value from the routine's context — it should be set as {AGENT_API_KEY_VALUE} in the prompt (replaced at task creation time).
- When comparing metrics, use cumulative campaign data (since launch) for threshold evaluation, not just today's slice, when the today-only slice has < 100 impressions.
- Log EVERY automated action to agent_actions with a clear reason.
```

- [ ] **Step 2: Test with a manual run**

Trigger manually. Since campaigns may be paused, the expected behavior is:
- Calls linkedin-ads for campaign status
- If API not configured: logs skip and exits (verify in agent_actions)
- If campaigns all paused: logs no-op and exits
- If campaigns active: pulls data, writes snapshot, evaluates thresholds

Check the Artifact DB after the run:
- `agent_actions` collection should have a new entry
- If active campaigns exist: `ad_snapshots` collection should have a new entry

---

### Task 6: Weekly Reporter Scheduled Routine

**Files:**
- Create scheduled task `weekly-reporter` via `create_scheduled_task`

**Interfaces:**
- Consumes: `{DASHBOARD_URL}` Artifact DB (reads `ad_snapshots`, `content_published`, `flags`, `drafts`); Gmail MCP for sending digest
- Produces: Weekly report in `weekly_reports` collection; updated `weekly_reports/latest` doc; email digest to both founders

- [ ] **Step 1: Create the Weekly Reporter scheduled task**

Use `create_scheduled_task` with:
- `taskId`: `weekly-reporter`
- `title`: `Weekly Reporter — Friday marketing digest`
- `description`: `Aggregates the week's ad and content performance, generates the weekly report, sends email digest`
- `cronExpression`: `0 16 * * 5` (Friday at 4:00 PM)
- `prompt`: The full agent prompt (below)

**Weekly Reporter prompt:**

```
You are the Weekly Reporter for ReinventOps Group's marketing system. You run every Friday at 4 PM ET. Your job is to aggregate the week's marketing performance, generate a report, update the dashboard, and send an email digest to both founders.

## Your tools
- Artifact tool (read_db, write_db) on URL: {DASHBOARD_URL}
- Gmail MCP tools (search_threads, send_message) for sending the digest email
- PushNotification for alerting the founders

## Weekly sequence

### Step 1: Gather the week's data
Read from Artifact DB:
- All `ad_snapshots` docs where date >= Monday of this week
- All `content_published` docs where published_date >= Monday of this week
- All `drafts` docs where created_at >= Monday of this week (to calculate on-time rate)
- All `flags` docs where status == "open"
- All `agent_actions` docs where timestamp >= Monday of this week
- The `config/campaign_context` doc for strategic context

### Step 2: Compute aggregates

**Ad performance (skip if no ad_snapshots this week):**
- Total impressions, clicks, spend, conversions across all campaigns
- CTR = total clicks / total impressions
- CPC = total spend / total clicks
- Cost per conversion = total spend / total conversions
- Per-creative breakdown: for each ad, total metrics and rank by CTR and conversions
- Week-over-week: compare totals to the previous week's weekly_report (read `weekly_reports/latest`)
- Funnel: impressions → clicks → sessions → CTA clicks → completions → bookings (from funnel_metrics in snapshots)

**Content performance:**
- Posts published this week: count by brand
- On-time rate: (published on or before suggested_publish_date) / total published
- Posts still pending approval: count
- Posts that failed or were missed: count
- Engagement data: if any content_published docs have engagement_metrics populated, summarize (this depends on whether the Content Engine or user has updated these)
- Top-performing post of the week (by engagement if available, otherwise note that engagement data isn't being tracked yet)

**Pipeline summary:**
- New leads from ads (conversions)
- Assessment completions
- Calls booked (if tracked)
- Lead-to-booking conversion rate

### Step 3: Generate the report

Write a structured report with these sections:

**📊 This Week at a Glance**
- 2-3 bullet highlights (the most important things to know)

**📈 Ad Performance** (skip section if no active campaigns this week)
- Funnel: {impressions} → {clicks} ({CTR}%) → {sessions} → {conversions}
- Total spend: ${amount} | CPC: ${amount} | Cost/conversion: ${amount}
- W/W trend: ↑↓→ for each metric vs last week
- Creative ranking: which ad is winning and by how much
- Flags: any open flags from Ad Monitor

**📝 Content Performance**
- Published: {count} posts ({reinventops_count} ReinventOps, {ee_count} Efficient Engineer)
- On-time rate: {pct}%
- Pending approval: {count} drafts waiting
- Top post: {brief description}
- Missed/failed: {count} (list if any)

**🎯 Pipeline**
- Conversions: {count}
- Calls booked: {count} (or "not tracked yet" if no Calendly integration)

**💡 Recommendations for Next Week**
Based on the data, generate 3-5 specific, actionable recommendations:
- Content topics that should be doubled down on (based on engagement)
- Ad adjustments to consider
- Calendar suggestions for next week
- Any open flags that need decisions

**⚠️ Open Items**
List any unresolved flags from the Recommendations section of the dashboard.

### Step 4: Save to Artifact DB

Write the report to `weekly_reports/{week_start_date}` (e.g., `weekly_reports/2026-09-09`):
{
  week_start: "2026-09-09",
  week_end: "2026-09-13",
  summary_bullets: [...],
  ad_summary: {impressions, clicks, ctr, spend, conversions, cpc, cost_per_conversion, wow_trends},
  content_summary: {published_count, by_brand, on_time_rate, pending, missed},
  pipeline_summary: {conversions, bookings},
  recommendations: [...],
  open_flags_count: N,
  generated_at: (ISO timestamp)
}

Also update `weekly_reports/latest` with the same data (so the dashboard Funnel tab always reads the latest report without querying by date).

Add content calendar suggestions for next week to the `content_calendar` collection if recommendations include content topics.

### Step 5: Send email digest

Use the Gmail send_message tool to send an email:
- To: arielleisrael3@gmail.com (Arielle) — send one email
- Subject: "ReinventOps Weekly Marketing Report — Week of {week_start_date}"
- Body (plain text):

```
ReinventOps Marketing Report
Week of {date} - {date}

{the summary_bullets, one per line}

AD PERFORMANCE
{ad summary section from the report, text-formatted}

CONTENT
{content summary}

RECOMMENDATIONS
{numbered recommendations}

Full dashboard: {DASHBOARD_URL}
```

Ask the user for Uzziah's email address before sending to him — or note that it needs to be configured in settings.

### Step 6: Notify

Send a push notification: "📊 Weekly marketing report is ready. Check your email or the dashboard: {DASHBOARD_URL}"

## Important rules
- If there's no ad data this week (no active campaigns), skip the ad sections entirely — don't show zeros, just say "No active campaigns this week."
- If there's no content data (Content Engine hasn't run yet), note that the system is still being set up.
- The report should be honest about data gaps — if engagement metrics aren't being tracked yet, say so rather than showing zeros.
- Keep the email concise — the dashboard has the details.
- Always end with the dashboard link.
```

- [ ] **Step 2: Test with a manual run**

Trigger manually. Verify:
- Report appears in `weekly_reports` collection
- `weekly_reports/latest` is updated
- Email is sent (check Gmail)
- Push notification received
- Dashboard Funnel tab shows the latest report data

---

### Task 7: Integration Test and Go-Live

**Files:** None created (verification only)

**Interfaces:**
- Consumes: Everything from Tasks 1–6
- Produces: A running, verified system

- [ ] **Step 1: Pre-flight checklist**

Verify each component is operational:

| Component | Check | Status |
|---|---|---|
| GA4 function | `curl -H "Authorization: Bearer {key}" "https://reinventops.com/.netlify/functions/ga4-data?action=funnel&start=2026-09-01&end=2026-09-14"` returns data | |
| LinkedIn Ads function | Same curl — returns data or clear "token not configured" message | |
| LinkedIn Publish function | Returns data or clear "token not configured" message | |
| Dashboard Artifact | Opens in browser, all tabs render, settings show config | |
| Content Engine routine | Listed in scheduled tasks, last manual run succeeded | |
| Ad Monitor routine | Listed in scheduled tasks, last manual run succeeded | |
| Weekly Reporter routine | Listed in scheduled tasks, last manual run succeeded | |

- [ ] **Step 2: End-to-end content flow test**

1. Trigger Content Engine manually → verify drafts appear in dashboard Content Queue
2. Open dashboard → approve one draft for each brand
3. Trigger Content Engine again → verify:
   - ReinventOps draft attempts to publish via API (may fail if LinkedIn not configured — that's OK, verify the attempt was logged)
   - Efficient Engineer draft generates a push notification with the copy to paste
4. Check `agent_actions` for logged publish attempts
5. Check `content_published` for records

- [ ] **Step 3: End-to-end ad monitoring flow test**

1. Trigger Ad Monitor manually
2. If campaigns are paused → verify it logs "no active campaigns" and exits
3. If campaigns are active → verify:
   - `ad_snapshots` has a new entry
   - Thresholds are evaluated (check agent_actions log)
   - Dashboard Ad Performance tab shows the data

- [ ] **Step 4: End-to-end reporting flow test**

1. Ensure there's at least one ad_snapshot and one content_published record in the DB
2. Trigger Weekly Reporter manually
3. Verify:
   - `weekly_reports/latest` is populated
   - Dashboard Funnel tab shows data
   - Email digest arrives in Gmail
   - Push notification received

- [ ] **Step 5: Activate all routines on schedule**

Verify all three scheduled tasks are enabled and running on their cron schedules:
- `content-engine`: `0 7 * * *` (daily 7 AM)
- `ad-monitor`: `30 7 * * *` (daily 7:30 AM)
- `weekly-reporter`: `0 16 * * 5` (Friday 4 PM)

Use `list_scheduled_tasks` to confirm all are active.

- [ ] **Step 6: Monitor first automated runs**

Wait for the next morning's automated runs (or the next Friday for the Weekly Reporter). Check:
- Agent actions are logged
- No error flags in the dashboard
- Notifications arrive
- Content drafts appear in the queue

- [ ] **Step 7: Commit any final adjustments**

```bash
git add -A
git commit -m "feat: complete marketing agent system Phase 1"
```

Create a PR for review:
```bash
gh pr create --title "Marketing Agent System — Phase 1" --body "$(cat <<'EOF'
## Summary
- Three Netlify Functions (GA4 data proxy, LinkedIn ads proxy, LinkedIn publish proxy) for authenticated API access
- Dashboard Artifact with real-time DB for content approval, ad monitoring, funnel analytics, and agent audit log
- Content Engine routine: daily content drafting, approval queue management, publishing, and verification
- Ad Monitor routine: daily campaign performance tracking with auto-pause for underperformers and threshold-based flagging
- Weekly Reporter routine: Friday digest with aggregated metrics, recommendations, and email delivery

## Test plan
- [ ] GA4 function returns data for the live property
- [ ] LinkedIn functions return data (or clear "not configured" error if tokens pending)
- [ ] Dashboard renders all 8 tabs with correct empty states and seeded config
- [ ] Content Engine produces drafts in the approval queue
- [ ] Approved drafts publish to company page (or generate paste-ready notification for personal profiles)
- [ ] Ad Monitor logs snapshots and evaluates thresholds
- [ ] Weekly Reporter generates report and sends email digest
- [ ] All routines run on schedule without manual intervention

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
