/**
 * Fetch JSON with a timeout and a couple of retries.
 *
 * The content API runs on a cold-start dyno; the first request after a period
 * of inactivity can fail or stall while the dyno boots. Retrying briefly makes
 * the portfolio resilient without showing visitors an error state.
 */
export async function fetchJsonWithRetry(
  url,
  { retries = 2, timeoutMs = 20000, backoffMs = 1200 } = {}
) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) =>
          window.setTimeout(resolve, backoffMs * (attempt + 1))
        );
      }
    } finally {
      window.clearTimeout(timer);
    }
  }

  throw lastError;
}
