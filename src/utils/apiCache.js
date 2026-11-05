/**
 * Tiny localStorage cache for public API lists.
 *
 * The portfolio content API runs on a cold-start dyno, so the first paint can
 * wait several seconds for JSON. Caching the last successful response lets the
 * page render real content immediately, then quietly revalidate in the
 * background. Failures are non-fatal: the app falls back to a live fetch.
 */

const PREFIX = "portfolio:cache:";

export function readCache(key) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const data = parsed?.data;
    if (Array.isArray(data)) return data.length > 0 ? data : null;
    return data && typeof data === "object" ? data : null;
  } catch {
    return null;
  }
}

export function writeCache(key, data) {
  try {
    if (Array.isArray(data) && data.length === 0) return;
    if (data === null || data === undefined) return;
    window.localStorage.setItem(
      PREFIX + key,
      JSON.stringify({ data, savedAt: Date.now() })
    );
  } catch {
    // Storage may be unavailable (private mode, quota). Ignore.
  }
}
