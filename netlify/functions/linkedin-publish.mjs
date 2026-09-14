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
