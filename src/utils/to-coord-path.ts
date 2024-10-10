import type { RicPathfindPath } from "ric-pathfind";
import { Coord } from "../types";

export function toCoordPath(path: RicPathfindPath): Coord[] {
  return path.map(([x, y]) => new Coord(x, y));
}
