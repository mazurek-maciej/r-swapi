import { handleActions } from "redux-actions";
import { StatusOfAPICall } from "../../../services/StatusOfApiCall";
import { ACTION_TYPE, GetStarshipActionFailurePayload, GetStarshipActionPayload, GetStarshipActionSuccessPayload } from "../actions/types";
import { StarshipState } from "./types";


export const initialState: StarshipState = {
  status: StatusOfAPICall.IDLE,
  data: undefined,
  error: undefined
}

export const starshipReducer = handleActions<StarshipState, GetStarshipActionPayload>({
  [ACTION_TYPE.GET_REQUEST]: () => ({
    status: StatusOfAPICall.FETCHING,
    data: undefined,
    error: undefined
  }),
  [ACTION_TYPE.GET_SUCCESS]: (state, action) => ({
    status: StatusOfAPICall.SUCCESS,
    data: (action.payload as GetStarshipActionSuccessPayload).data.results,
    error: undefined
  }),
  [ACTION_TYPE.GET_FAILURE]: (state, action) => ({
    status: StatusOfAPICall.FAILURE,
    data: undefined,
    error: (action.payload as GetStarshipActionFailurePayload).detail
  })
}, {...initialState})