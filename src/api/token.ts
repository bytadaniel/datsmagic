const token = process.env.DATS_PLAYER_TOKEN?.trim();
const gameApiUrl = process.env.DATS_GAME_API_URL?.trim();

if (!token) {
  throw new Error("DATS_PLAYER_TOKEN is required to run the Node.js player");
}

if (!gameApiUrl) {
  throw new Error("DATS_GAME_API_URL must be the full /play/magcarp/player/move URL");
}

const parsedGameApiUrl = new URL(gameApiUrl);
if (
  !["http:", "https:"].includes(parsedGameApiUrl.protocol) ||
  !parsedGameApiUrl.pathname.endsWith("/play/magcarp/player/move")
) {
  throw new Error("DATS_GAME_API_URL must be the full /play/magcarp/player/move URL");
}

export { token, gameApiUrl };
