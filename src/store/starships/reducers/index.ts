import { handleActions } from "redux-actions";
import { StatusOfAPICall } from "../../game/models/StatusOfApiCall";
import { ACTION_TYPE, GetStarshipActionFailurePayload, GetStarshipActionPayload, StarshipsBothCardsPayload } from "../actions/types";
import { StarshipState } from "./types";


export const initialState: StarshipState = {
  status: StatusOfAPICall.IDLE,
  leftCard: undefined,
  rightCard: undefined,
  error: undefined
}

export const starshipReducer = handleActions<StarshipState, GetStarshipActionPayload>({
  [ACTION_TYPE.GET_REQUEST]: () => ({
    status: StatusOfAPICall.FETCHING,
    leftCard: undefined,
    rightCard: undefined,
    error: undefined
  }),
  [ACTION_TYPE.GET_SUCCESS]: (state, action) => ({
    status: StatusOfAPICall.SUCCESS,
    leftCard: (action.payload as StarshipsBothCardsPayload).leftCard,
    rightCard: (action.payload as StarshipsBothCardsPayload).rightCard,
    error: undefined
  }),
  [ACTION_TYPE.GET_FAILURE]: (state, action) => ({
    status: StatusOfAPICall.FAILURE,
    leftCard: undefined,
    rightCard: undefined,
    error: (action.payload as GetStarshipActionFailurePayload).detail
  }),
  [ACTION_TYPE.CLEAR_STARSHIP_CARDS]: () => ({
    status: StatusOfAPICall.IDLE,
    leftCard: undefined,
    rightCard: undefined,
    error: undefined
  })
}, {...initialState})