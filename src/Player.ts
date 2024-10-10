import { Coord } from "./types";

export class Player extends Coord {
  constructor(x: number, y: number) {
    super(x, y);

    this.type = 'player'
  }
}
