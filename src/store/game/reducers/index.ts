import { handleActions } from "redux-actions";
import { ACTION_TYPE } from "../actions/types";
import { GameState } from "./types";

export const initialState: GameState = {
  leftPlayer: {
    id: 1,
    name: 'Dathomirian',
    score: 0
  },
  rightPlayer: {
    id: 2,
    name: 'Wookie',
    score: 0
  },
  winnerId: undefined
}

export const gameReducer = handleActions<GameState>({
  [ACTION_TYPE.SCORE_LEFT_PLAYER]: (state) => ({
    ...state,
    leftPlayer: {
      ...state.leftPlayer,
      score: state.leftPlayer.score + 1
    },
    winnerId: 1,
    isDraw: false
  }),
  [ACTION_TYPE.SCORE_RIGHT_PLAYER]: (state) => ({
    ...state,
    rightPlayer: {
      ...state.rightPlayer,
      score: state.rightPlayer.score + 1
    },
    winnerId: 2,
    isDraw: false
  }),
  [ACTION_TYPE.GAME_DRAW]: (state) => ({
    ...state,
    isDraw: true
  })
}, {...initialState})