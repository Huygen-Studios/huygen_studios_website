const BASE_URL = "https://api.marblecms.com/v1";

export class MarbleApiError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string, endpoint: string) {
    super(`Marble API error for ${endpoint}: ${status} ${statusText}`);
    this.name = "MarbleApiError";
    this.status = status;
    this.statusText = statusText;
  }
}

export async function marbleFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const apiKey = process.env.MARBLE_API_KEY;
  if (!apiKey) {
    throw new Error("MARBLE_API_KEY environment variable is not defined");
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", apiKey);
  headers.set("Content-Type", "application/json");

  const config: RequestInit = {
    ...options,
    headers,
  };

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;
  const res = await fetch(url, config);

  if (!res.ok) {
    console.error("Marble CMS request failed", {
      endpoint: cleanEndpoint,
      status: res.status,
      statusText: res.statusText,
    });
    throw new MarbleApiError(res.status, res.statusText, cleanEndpoint);
  }

  return res.json() as Promise<T>;
}
