# fde.williamrthomas.com — gated application site

Single-page Astro site for Bill's Anthropic FDE application. Password-gated, includes a Claude-powered chatbot grounded in the same evidence the page renders.

## Stack

- **Astro 4** (static build) + Tailwind + React island for the chatbot
- **Cloudflare Pages** for hosting
- **Cloudflare Pages Functions** for:
  - `/_middleware.ts` — cookie-gates everything except `/`, `/api/login`, and static assets
  - `/api/login` — verifies password, issues HMAC-signed session cookie
  - `/api/logout` — clears the cookie
  - `/api/chat` — streams from Anthropic API (Claude Sonnet 4.6), keyed on a server-side secret; logs each turn to D1
  - `/api/admin/logs` — read-only activity dashboard, gated by the `ADMIN_KEY` secret
- **Cloudflare D1** (`fde-williamrthomas-logs`) for first-party visitor + chat logging (schema in `schema.sql`)

## Local dev

```bash
cd web
npm install
# create a .dev.vars file with secrets for local Pages dev
cat > .dev.vars <<EOF
SITE_PASSWORD=change-me
SESSION_SECRET=$(openssl rand -hex 32)
ANTHROPIC_API_KEY=sk-ant-...
EOF

npm run dev
# Open http://localhost:8788
```

`.dev.vars` is git-ignored. **Never commit it.**

## First-time deploy (Cloudflare Pages)

### 1. Create the Pages project

Easiest: connect this GitHub repo to Cloudflare Pages via the dashboard:
- Dashboard → Workers & Pages → Create application → Pages → Connect to Git
- Build command: `cd web && npm install && npm run build`
- Build output: `web/dist`
- Root directory: leave blank
- Project name: `fde-williamrthomas`

Or via CLI:

```bash
cd web
npm install
npm run build
npx wrangler pages project create fde-williamrthomas --production-branch=main
npx wrangler pages deploy dist --project-name=fde-williamrthomas
```

### 2. Set secrets

In the Cloudflare dashboard: Pages → fde-williamrthomas → Settings → Environment variables → Production → Add variable (mark as encrypted):

| Name | Value |
|---|---|
| `SITE_PASSWORD` | The password you share with interviewers (anything you want — e.g. `harrier-1986`) |
| `SESSION_SECRET` | A long random string. Generate with `openssl rand -hex 32` |
| `ANTHROPIC_API_KEY` | Your Anthropic API key from console.anthropic.com |
| `ADMIN_KEY` | A long random string. Gates `/api/admin/logs`. Generate with `openssl rand -hex 32`. If unset, the dashboard returns 404 (feature off). |

Or via CLI:

```bash
npx wrangler pages secret put SITE_PASSWORD --project-name=fde-williamrthomas
npx wrangler pages secret put SESSION_SECRET --project-name=fde-williamrthomas
npx wrangler pages secret put ANTHROPIC_API_KEY --project-name=fde-williamrthomas
npx wrangler pages secret put ADMIN_KEY --project-name=fde-williamrthomas
```

### 3. Add the custom domain

Dashboard → Pages → fde-williamrthomas → Custom domains → Add `fde.williamrthomas.com`. Cloudflare will guide DNS — add a CNAME record on `williamrthomas.com` pointing `fde` to `fde-williamrthomas.pages.dev`. If `williamrthomas.com` is already on Cloudflare DNS, it auto-fills the record.

## Tracking / activity log

Logins and chatbot conversations are recorded to a Cloudflare D1 database
(`fde-williamrthomas-logs`) so you can see whether anyone has been looking at
the site and what they asked. Writes are best-effort and run *after* the
response is returned (`waitUntil`), so logging never slows down or breaks a
visitor's request. If the `LOGS_DB` binding is absent (e.g. local dev), logging
is silently skipped.

What's captured:
- **Logins** — timestamp, success/failure, IP, country, user agent, referer.
- **Chat turns** — timestamp, session id, turn number, the visitor's question,
  the assistant's reply, IP, country.

### Viewing it

Set the `ADMIN_KEY` secret, then open:

```
https://fde.williamrthomas.com/api/admin/logs?key=YOUR_ADMIN_KEY
```

Add `&format=json` for raw rows. This path bypasses the site password and
self-gates on `ADMIN_KEY` (so you don't have to log in to view it, but it's
404/401 without the key).

You can also query directly:

```bash
wrangler d1 execute fde-williamrthomas-logs --remote \
  --command "SELECT ts, country, user_msg FROM chat_log ORDER BY id DESC LIMIT 20"
```

### Binding setup

The `LOGS_DB` → `fde-williamrthomas-logs` binding is declared in
`wrangler.toml`. If you deploy via `wrangler pages deploy`, that's all you need.
**If you deploy via the dashboard Git integration**, also add the binding under
Pages → Settings → Functions → D1 database bindings (binding name `LOGS_DB`).

The schema lives in `schema.sql` (already applied to the remote DB). To
re-apply or set up a fresh DB:

```bash
wrangler d1 execute fde-williamrthomas-logs --remote --file=./schema.sql
```

## Updating content

All content lives in `src/data/content.ts`. Edit a tile, push, and Pages auto-deploys.

The chatbot's system prompt is in `functions/api/chat.ts` — **keep it in sync with content.ts** when you change metrics or add tiles. (TODO: factor into shared module imported by both.)

## Security notes

- Cookie is HttpOnly + Secure + SameSite=Lax, signed via HMAC-SHA-256, 7-day TTL.
- Password is verified server-side only. Login has a 500ms anti-bruteforce sleep on failure.
- `noindex,nofollow` is set in the layout so it won't be indexed even if leaked.
- API key never leaves the Cloudflare environment. The chat endpoint streams Anthropic responses back through the Worker; the client never sees the key.
- No third-party tracking or analytics. Logins and chat conversations are logged first-party to your own Cloudflare D1 (see "Tracking / activity log"); nothing is sent to anyone but you. The activity dashboard is gated by a dedicated `ADMIN_KEY`, separate from the site password.

## Cost

Bounded by:
- Cloudflare Pages (free)
- Cloudflare Pages Functions (100K requests/day free)
- Anthropic API (pay per token). Claude Sonnet 4.6 is the model. Expect $5–20 over a single interview window if the chatbot gets real use.

You can set a hard spending cap on the Anthropic API key at console.anthropic.com → Plans & Billing.

## Rotating the password

```bash
npx wrangler pages secret put SITE_PASSWORD --project-name=fde-williamrthomas
# enter new password when prompted
```

Existing sessions still work until their 7-day TTL expires — invalidate them by also rotating `SESSION_SECRET`:

```bash
npx wrangler pages secret put SESSION_SECRET --project-name=fde-williamrthomas
```
