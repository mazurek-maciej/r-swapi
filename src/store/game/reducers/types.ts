import { Player } from "../models/Player";

export interface GameState {
  leftPlayer: Player;
  rightPlayer: Player;
  winnerId?: number; 
}