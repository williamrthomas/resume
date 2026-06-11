// Read-only usage dashboard. Self-gated by the ADMIN_KEY secret (this path
// is exempted from the site password in _middleware.ts so Bill can reach it
// directly with ?key=...). Disabled (404) if ADMIN_KEY is unset.
//
// Shows anonymous usage counts only — when logins happened and how many chat
// turns/conversations there were. No content, no IPs, no user agents.
//
//   https://fde.williamrthomas.com/api/admin/logs?key=YOUR_ADMIN_KEY
//   add &format=json for the raw rows.

interface Env {
  ADMIN_KEY?: string;
  LOGS_DB?: D1Database;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  // Feature disabled unless an admin key is configured.
  if (!env.ADMIN_KEY) {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "";
  if (!timingSafeEqual(key, env.ADMIN_KEY)) {
    await new Promise((r) => setTimeout(r, 500)); // anti-bruteforce
    return new Response("Unauthorized", { status: 401 });
  }

  if (!env.LOGS_DB) {
    return new Response("LOGS_DB binding not configured", { status: 500 });
  }

  const logins = await env.LOGS_DB.prepare(
    "SELECT ts, success FROM login_log ORDER BY id DESC LIMIT 200"
  ).all();
  // One row per conversation: when it started, when it last saw activity, how many turns.
  const sessions = await env.LOGS_DB.prepare(
    `SELECT session_id, MIN(ts) AS started, MAX(ts) AS last_active, COUNT(*) AS turns
     FROM chat_log GROUP BY session_id ORDER BY MAX(id) DESC LIMIT 200`
  ).all();

  const loginStats = await env.LOGS_DB.prepare(
    "SELECT COUNT(*) AS total, COALESCE(SUM(success), 0) AS ok FROM login_log"
  ).first<{ total: number; ok: number }>();
  const chatStats = await env.LOGS_DB.prepare(
    "SELECT COUNT(*) AS turns, COUNT(DISTINCT session_id) AS sessions FROM chat_log"
  ).first<{ turns: number; sessions: number }>();

  if (url.searchParams.get("format") === "json") {
    return new Response(
      JSON.stringify(
        { loginStats, chatStats, logins: logins.results, sessions: sessions.results },
        null,
        2
      ),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  const loginRows = (logins.results as any[])
    .map(
      (r) => `<tr>
        <td>${esc(r.ts)}</td>
        <td>${r.success ? "✅ success" : "❌ failed"}</td>
      </tr>`
    )
    .join("");

  const sessionRows = (sessions.results as any[])
    .map(
      (r) => `<tr>
        <td>${esc(r.started)}</td>
        <td>${esc(r.last_active)}</td>
        <td class="mono">${esc(String(r.session_id).slice(0, 8))}</td>
        <td>${esc(r.turns)}</td>
      </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>FDE site · usage</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 14px/1.5 -apple-system, system-ui, sans-serif; margin: 0 auto; padding: 2rem; max-width: 760px; }
  h1 { font-size: 1.4rem; } h2 { font-size: 1.1rem; margin-top: 2rem; }
  .note { opacity: .6; font-size: .85rem; }
  .stats { display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 1rem 0; }
  .stat { background: rgba(127,127,127,.1); border-radius: 8px; padding: .75rem 1rem; }
  .stat b { display: block; font-size: 1.5rem; }
  table { width: 100%; border-collapse: collapse; margin-top: .5rem; }
  th, td { text-align: left; padding: .4rem .6rem; border-bottom: 1px solid rgba(127,127,127,.2); vertical-align: top; }
  th { font-size: .75rem; text-transform: uppercase; letter-spacing: .04em; opacity: .7; }
  .mono { font-family: ui-monospace, Menlo, monospace; font-size: .85em; }
  .empty { opacity: .5; font-style: italic; }
</style>
</head><body>
<h1>Usage <span style="opacity:.5;font-size:.8rem">fde.williamrthomas.com</span></h1>
<p class="note">Anonymous counts only — no content, IPs, or user agents are recorded.</p>
<div class="stats">
  <div class="stat"><b>${esc(loginStats?.ok ?? 0)}</b>successful logins</div>
  <div class="stat"><b>${esc(loginStats?.total ?? 0)}</b>login attempts</div>
  <div class="stat"><b>${esc(chatStats?.sessions ?? 0)}</b>chat conversations</div>
  <div class="stat"><b>${esc(chatStats?.turns ?? 0)}</b>chat turns</div>
</div>

<h2>Logins (latest 200)</h2>
<table>
  <thead><tr><th>Time (UTC)</th><th>Result</th></tr></thead>
  <tbody>${loginRows || '<tr><td colspan="2" class="empty">No logins yet</td></tr>'}</tbody>
</table>

<h2>Chat conversations (latest 200)</h2>
<table>
  <thead><tr><th>Started (UTC)</th><th>Last active</th><th>Session</th><th>Turns</th></tr></thead>
  <tbody>${sessionRows || '<tr><td colspan="4" class="empty">No chats yet</td></tr>'}</tbody>
</table>
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
};
