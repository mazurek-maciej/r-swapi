import { createAction } from "redux-api-middleware";
import { URL_STARSHIPS } from "../../../services/config";
import { StarshipState } from "../reducers/types";
import { ACTION_TYPE, GetStarshipActiondMeta, GetStarshipActionPayload, GetStarshipActionSuccessPayload } from "./types";

const generateGetStarshipsUrl = () => {
  const min = Math.ceil(1);
  const max = Math.floor(10);
  const randomNr = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return `${URL_STARSHIPS}`
}

const handleSuccessResponse = async (res: Response): Promise<GetStarshipActionSuccessPayload> => {
  const data = await res.json();
  return { data };
} 

export const getStarshipAction = () =>
  createAction<StarshipState, GetStarshipActionPayload, GetStarshipActiondMeta>({
    endpoint: URL_STARSHIPS,
    method: 'GET',
    types: [
      {
        type: ACTION_TYPE.GET_REQUEST
      },
      {
        type: ACTION_TYPE.GET_SUCCESS,
        payload: (action, state, res) => handleSuccessResponse(res)
      },
      {
        type: ACTION_TYPE.GET_FAILURE,
        payload: (action, state, res) => res.json()
      }
    ]
  })