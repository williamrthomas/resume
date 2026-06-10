import { issueSession, sessionCookie } from "../lib/auth";
import { clientMeta, logLogin } from "../lib/log";

interface Env {
  SITE_PASSWORD: string;
  SESSION_SECRET: string;
  // Optional: login logging. Absent in local dev without D1 → logging is skipped.
  LOGS_DB?: D1Database;
}

const TTL_SEC = 7 * 24 * 60 * 60; // 7 days

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (!env.SITE_PASSWORD || !env.SESSION_SECRET) {
    return new Response(JSON.stringify({ error: "Server not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!body.password || body.password !== env.SITE_PASSWORD) {
    waitUntil(logLogin(env.LOGS_DB, false, clientMeta(request)));
    // Tiny anti-bruteforce sleep.
    await new Promise((r) => setTimeout(r, 500));
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  waitUntil(logLogin(env.LOGS_DB, true, clientMeta(request)));

  const token = await issueSession(env.SESSION_SECRET, TTL_SEC * 1000);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": sessionCookie(token, TTL_SEC)
    }
  });
};
