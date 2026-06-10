// Logging helpers for visitor + chat tracking, backed by Cloudflare D1.
// All writes are best-effort: a logging failure must never break the
// user-facing request. Callers wrap these in context.waitUntil() so the
// insert runs after the response has already been returned to the client.

export interface ClientMeta {
  ip: string;
  country: string;
  ua: string;
  referer: string;
}

// Pull request-level identity from Cloudflare's edge headers / cf object.
export function clientMeta(request: Request): ClientMeta {
  const cf = (request as any).cf || {};
  return {
    ip: request.headers.get("CF-Connecting-IP") || "",
    country: cf.country || request.headers.get("CF-IPCountry") || "",
    ua: request.headers.get("User-Agent") || "",
    referer: request.headers.get("Referer") || ""
  };
}

export interface ChatTurn {
  sessionId: string;
  turn: number;
  userMsg: string;
  assistantMsg: string;
  meta: ClientMeta;
}

// Insert one chat turn. No-op if the DB binding is absent (e.g. local dev
// without D1 configured).
export async function logChatTurn(db: D1Database | undefined, t: ChatTurn): Promise<void> {
  if (!db) return;
  try {
    await db
      .prepare(
        "INSERT INTO chat_log (session_id, turn, user_msg, assistant_msg, ip, country, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(t.sessionId, t.turn, t.userMsg, t.assistantMsg, t.meta.ip, t.meta.country, t.meta.ua)
      .run();
  } catch (e) {
    console.error("logChatTurn failed", e);
  }
}

// Insert one login attempt (success or failure).
export async function logLogin(
  db: D1Database | undefined,
  success: boolean,
  meta: ClientMeta
): Promise<void> {
  if (!db) return;
  try {
    await db
      .prepare(
        "INSERT INTO login_log (success, ip, country, user_agent, referer) VALUES (?, ?, ?, ?, ?)"
      )
      .bind(success ? 1 : 0, meta.ip, meta.country, meta.ua, meta.referer)
      .run();
  } catch (e) {
    console.error("logLogin failed", e);
  }
}

// Accumulate assistant text from a teed Anthropic SSE stream. Returns the
// full concatenated reply once the stream ends. Parse failures on individual
// events are ignored (mirrors the client-side parser).
export async function readAssistantText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let acc = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() || "";
    for (const raw of lines) {
      const line = raw.trim();
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const obj = JSON.parse(data);
        if (
          obj.type === "content_block_delta" &&
          obj.delta?.type === "text_delta" &&
          typeof obj.delta.text === "string"
        ) {
          acc += obj.delta.text;
        }
      } catch {
        // ignore individual parse failures
      }
    }
  }
  return acc;
}
