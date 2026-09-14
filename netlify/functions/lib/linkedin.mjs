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
  if (text) return JSON.parse(text);
  const id = res.headers.get("x-restli-id");
  return { status: res.status, ...(id ? { id } : {}) };
}
