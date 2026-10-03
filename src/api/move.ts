import { setTimeout } from "timers/promises";
import { Desert, Vector } from "./get-map-types";
import { gameApiUrl, token } from "./token";

export interface TransportPayload {
  acceleration?: Vector;
  activateShield?: boolean;
  attack?: {};
  id: string;
}

interface MovePayload {
  transports: TransportPayload[];
}

export async function move(payload: MovePayload): Promise<Desert> {
  while (true) {
    const response = await fetch(gameApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ["X-Auth-Token"]: token,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 429) {
      const retryAfter = Number(response.headers.get("Retry-After"));
      await setTimeout(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1000);
      continue;
    }

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Game API returned HTTP ${response.status}${detail ? `: ${detail}` : ""}`);
    }

    return response.json();
  }
}
