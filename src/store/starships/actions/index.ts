import { Dispatch } from "redux";
import { createAction } from "redux-api-middleware";
import { URL_STARSHIPS } from "../../../constants/config";
import { StarshipState } from "../reducers/types";
import { ACTION_TYPE, GetStarshipActiondMeta, GetStarshipActionPayload, GetStarshipActionSuccessPayload } from "./types";
import { ACTION_TYPE as GAME_ACTION_TYPE } from '../../game/actions/types';

const handleSuccessResponse = async (res: Response): Promise<GetStarshipActionSuccessPayload> => {
  const data = await res.json();
  return { data };
} 

export const getStarshipAction = () => {
  const min = Math.ceil(0);
  const max = Math.floor(9);
  const randomLeftNr = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomRightNr = Math.floor(Math.random() * (max - min + 1)) + min;
  return (dispatch: Dispatch) => {
    dispatch(createAction<StarshipState, GetStarshipActionPayload, GetStarshipActiondMeta>({
      endpoint: URL_STARSHIPS,
      method: 'GET',
      types: [
        {
          type: ACTION_TYPE.GET_REQUEST
        },
        {
          type: ACTION_TYPE.GET_SUCCESS,
          payload: (action, state, res) => handleSuccessResponse(res).then(({ data }) => {
            const starships = data.results;
            const leftCard = starships[randomLeftNr]
            const rightCard = starships[randomRightNr]
            const leftCardCrew = parseInt(leftCard.crew)
            const rightCardCrew = parseInt(rightCard.crew)

            if (rightCardCrew === leftCardCrew) {
              dispatch({ type: GAME_ACTION_TYPE.GAME_DRAW })
            } else if (leftCardCrew > rightCardCrew) {
              dispatch({ type: GAME_ACTION_TYPE.SCORE_LEFT_PLAYER })
            } else if (leftCardCrew < rightCardCrew) {
              dispatch({ type: GAME_ACTION_TYPE.SCORE_RIGHT_PLAYER })
            }
  
            return {
              leftCard,
              rightCard
            }
          })
        },
        {
          type: ACTION_TYPE.GET_FAILURE,
          payload: (action, state, res) => res.json()
        }
      ]
    }))
  }
}

export const clearStarshipCardsAction = () => ({
  type: ACTION_TYPE.CLEAR_STARSHIP_CARDS
})