import { handleActions } from "redux-actions";
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
  'TEST': (state) => ({
    ...state
  })
}, {...initialState})