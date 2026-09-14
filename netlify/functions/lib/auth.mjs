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
