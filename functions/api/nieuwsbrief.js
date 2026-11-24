// Nieuwsbriefinschrijving: zet een e-mailadres in Flodesk.
// Instellen in Cloudflare (Pages > mazruns.be > Settings > Variables and Secrets):
//   FLODESK_API_KEY     de API-sleutel uit Flodesk (Integrations > API keys), als "Secret"
//   FLODESK_SEGMENT_ID  het id van het segment voor Mazruns (staat in de adresbalk als je het segment opent)
// Zolang die ontbreken, antwoordt dit adres 503 en toont de site enkel een bevestiging.

const json = (status, data) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

export async function onRequestPost({ request, env }) {
  if (!env.FLODESK_API_KEY || !env.FLODESK_SEGMENT_ID) return json(503, { ok: false, reason: "niet gekoppeld" });

  let email = "";
  try { email = String((await request.json()).email || "").trim().toLowerCase(); } catch (_) {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return json(400, { ok: false, reason: "ongeldig adres" });

  const r = await fetch("https://api.flodesk.com/v1/subscribers", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa(env.FLODESK_API_KEY + ":"),
      "Content-Type": "application/json",
      "User-Agent": "mazruns.be",
    },
    body: JSON.stringify({
      email,
      segment_ids: [env.FLODESK_SEGMENT_ID],
      double_optin: true,
      optin_ip: request.headers.get("CF-Connecting-IP") || undefined,
    }),
  });
  if (!r.ok) return json(502, { ok: false, reason: "flodesk " + r.status });
  return json(200, { ok: true });
}
