const BASE_URL = "https://api.marblecms.com/v1";

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
    throw new Error(`Marble API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
