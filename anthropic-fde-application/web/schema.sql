-- D1 schema for visitor + chat logging (database: fde-williamrthomas-logs).
-- Apply locally with:
--   wrangler d1 execute fde-williamrthomas-logs --remote --file=./schema.sql
-- (Already applied to the remote DB when this was first set up.)

CREATE TABLE IF NOT EXISTS chat_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  session_id TEXT,
  turn INTEGER,
  user_msg TEXT,
  assistant_msg TEXT,
  ip TEXT,
  country TEXT,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_chat_log_ts ON chat_log(ts);
CREATE INDEX IF NOT EXISTS idx_chat_log_session ON chat_log(session_id);

CREATE TABLE IF NOT EXISTS login_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  success INTEGER NOT NULL,
  ip TEXT,
  country TEXT,
  user_agent TEXT,
  referer TEXT
);
CREATE INDEX IF NOT EXISTS idx_login_log_ts ON login_log(ts);
