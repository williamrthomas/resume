// HMAC-signed session token + cookie helpers (no third-party deps).
// Used by /api/login to issue, by _middleware to verify.

const enc = new TextEncoder();
const dec = new TextDecoder();

function bufToB64Url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function b64UrlToBuf(b64url: string): ArrayBuffer {
  const pad = "=".repeat((4 - (b64url.length % 4)) % 4);
  const b64 = (b64url + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

async function hmac(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return bufToB64Url(sig);
}

async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  if (a.length !== b.length) return false;
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

export type SessionPayload = { iat: number; exp: number };

export async function issueSession(secret: string, ttlMs = 7 * 24 * 60 * 60 * 1000): Promise<string> {
  const payload: SessionPayload = { iat: Date.now(), exp: Date.now() + ttlMs };
  const payloadStr = bufToB64Url(enc.encode(JSON.stringify(payload)).buffer);
  const sig = await hmac(payloadStr, secret);
  return `${payloadStr}.${sig}`;
}

export async function verifySession(token: string | null, secret: string): Promise<SessionPayload | null> {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const payloadStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmac(payloadStr, secret);
  if (!(await timingSafeEqual(sig, expected))) return null;
  try {
    const payload = JSON.parse(dec.decode(b64UrlToBuf(payloadStr))) as SessionPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getCookie(req: Request, name: string): string | null {
  const cookie = req.headers.get("Cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function sessionCookie(value: string, maxAgeSec: number): string {
  return [
    `fde_session=${value}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${maxAgeSec}`
  ].join("; ");
}

export function clearedCookie(): string {
  return "fde_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0";
}
