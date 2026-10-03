import { Desert } from "./get-map-types";
import { gameApiUrl, token } from "./token";

export async function getMap(): Promise<Desert> {
  const response = await fetch(gameApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ["X-Auth-Token"]: token,
    },
    body: JSON.stringify({
      transports: [],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Game API returned HTTP ${response.status}${detail ? `: ${detail}` : ""}`);
  }

  return response.json();
}
