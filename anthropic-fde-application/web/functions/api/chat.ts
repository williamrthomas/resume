// Streaming chat proxy to Anthropic. Cookie-gated by _middleware.ts.
// System prompt is assembled by buildSystemPrompt() from the same content
// that drives the site (tiles, themes, voice/proof excerpts, JD, timeline
// with origin tags, got-it-wrong examples). Single source of truth.

import { buildSystemPrompt } from "../../src/data/system-prompt";
import { logChatTurn } from "../lib/log";

interface Env {
  ANTHROPIC_API_KEY: string;
  // Optional: anonymous usage counting. Absent in local dev without D1 → logging is skipped.
  LOGS_DB?: D1Database;
}

type Msg = { role: "user" | "assistant"; content: string };

// Build once at module init (data is build-time constant; this string never changes
// across requests in the same Worker instance).
const SYSTEM_PROMPT = buildSystemPrompt();

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (!env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: "Server not configured (missing API key)" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  let body: { messages?: Msg[]; sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 64) : "";

  const messages = (body.messages || []).filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.length > 0
  );

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages" }), { status: 400 });
  }

  // Cap context: last 30 messages, last 8k chars total
  const capped = messages.slice(-30);
  let totalChars = 0;
  for (let i = capped.length - 1; i >= 0; i--) {
    totalChars += capped[i].content.length;
    if (totalChars > 8000) {
      capped.splice(0, i + 1);
      break;
    }
  }

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: capped,
      stream: true
    })
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text();
    return new Response(
      JSON.stringify({ error: "Upstream error", status: upstream.status, detail: errText.slice(0, 400) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // Count the turn (timestamp + anonymous session id only — no content).
  const turn = capped.filter((m) => m.role === "user").length;
  waitUntil(logChatTurn(env.LOGS_DB, sessionId, turn));

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    }
  });
};
