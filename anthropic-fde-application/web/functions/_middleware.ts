// Cloudflare Pages middleware. Gates everything except the login page and login API.
import { getCookie, verifySession } from "./lib/auth";

interface Env {
  SITE_PASSWORD: string;
  SESSION_SECRET: string;
  ANTHROPIC_API_KEY: string;
}

// Paths that are always public. /api/admin/logs self-gates with ADMIN_KEY.
const PUBLIC_PATHS = new Set<string>(["/", "/favicon.ico", "/api/login", "/api/admin/logs"]);
const PUBLIC_PREFIXES = ["/_astro/", "/assets/", "/og/"];

export const onRequest: PagesFunction<Env> = async ({ request, next, env }) => {
  const url = new URL(request.url);
  const path = url.pathname;

  if (PUBLIC_PATHS.has(path) || PUBLIC_PREFIXES.some((p) => path.startsWith(p))) {
    return next();
  }

  const token = getCookie(request, "fde_session");
  const session = await verifySession(token, env.SESSION_SECRET);

  if (session) return next();

  // Unauthenticated.
  if (path.startsWith("/api/")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  return Response.redirect(`${url.origin}/?next=${encodeURIComponent(path)}`, 302);
};
