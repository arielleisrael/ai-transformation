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
