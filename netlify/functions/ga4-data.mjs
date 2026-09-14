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
