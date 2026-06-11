-- D1 schema for anonymous usage counting (database: fde-williamrthomas-logs).
-- Deliberately minimal: timestamps and anonymous session ids only — no
-- message content, no IP, no user agent, no geo.
--
-- Apply with:
--   wrangler d1 execute fde-williamrthomas-logs --remote --file=./schema.sql
-- (Already applied to the remote DB when this was first set up.)

CREATE TABLE IF NOT EXISTS chat_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  session_id TEXT,
  turn INTEGER
);
CREATE INDEX IF NOT EXISTS idx_chat_log_ts ON chat_log(ts);
CREATE INDEX IF NOT EXISTS idx_chat_log_session ON chat_log(session_id);

CREATE TABLE IF NOT EXISTS login_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  success INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_login_log_ts ON login_log(ts);
