// Usage-count logging backed by Cloudflare D1. Deliberately minimal: we
// record THAT the site was used (timestamps, anonymous session ids), never
// who used it or what they said — no message content, no IP, no user agent,
// no geo. See README "Tracking / activity log".
//
// All writes are best-effort: a logging failure must never break the
// user-facing request. Callers wrap these in context.waitUntil() so the
// insert runs after the response has already been returned to the client.

// Count one chat turn. sessionId is a random client-generated UUID that
// groups turns into conversations; it carries no identity. No-op if the DB
// binding is absent (e.g. local dev without D1 configured).
export async function logChatTurn(
  db: D1Database | undefined,
  sessionId: string,
  turn: number
): Promise<void> {
  if (!db) return;
  try {
    await db
      .prepare("INSERT INTO chat_log (session_id, turn) VALUES (?, ?)")
      .bind(sessionId, turn)
      .run();
  } catch (e) {
    console.error("logChatTurn failed", e);
  }
}

// Count one login attempt (success or failure).
export async function logLogin(db: D1Database | undefined, success: boolean): Promise<void> {
  if (!db) return;
  try {
    await db.prepare("INSERT INTO login_log (success) VALUES (?)").bind(success ? 1 : 0).run();
  } catch (e) {
    console.error("logLogin failed", e);
  }
}
