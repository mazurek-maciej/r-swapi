import { ACTION_TYPE } from "./types";

export const scoreLeftPlayer = () => ({
  type: ACTION_TYPE.SCORE_LEFT_PLAYER
})

export const scoreRightPlayer = () => ({
  type: ACTION_TYPE.SCORE_RIGHT_PLAYER
})

export const gameDraw = () => ({
  type: ACTION_TYPE.GAME_DRAW
})