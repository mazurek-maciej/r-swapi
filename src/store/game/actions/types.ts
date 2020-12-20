import { Action } from "redux";

export enum ACTION_TYPE {
  SCORE_LEFT_PLAYER = 'SCORE_LEFT_PLAYER',
  SCORE_RIGHT_PLAYER = 'SCORE_RIGHT_PLAYER',
  GAME_DRAW = 'GAME_DARW'
}

export interface GameAction<Payload> extends Action<Payload> {}
