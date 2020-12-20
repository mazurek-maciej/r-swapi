import { Dispatch } from "redux";
import { getPeopleAction } from "../../people/actions";
import { GetPeopleActionSuccessPayload } from "../../people/actions/types";
import { RootState } from "../../state";
import { ACTION_TYPE, PeopleCardsAction, PeopleCardsStoreLeftCardActionPayload, PeopleCardsStoreRightCardActionPayload } from "./types";
import { ACTION_TYPE as GAME_ACTION_TYPE } from '../../game/actions/types';

export const storePeopleCardsAction = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const leftCard = await dispatch(getPeopleAction())
    const rightCard = await dispatch(getPeopleAction())

    if (!leftCard.error && !rightCard.error) {
      const leftCardMass = parseInt((leftCard.payload as GetPeopleActionSuccessPayload).data.mass)
      const rightCardMass = parseInt((rightCard.payload as GetPeopleActionSuccessPayload).data.mass)
      
      if (isNaN(leftCardMass) && isNaN(rightCardMass)) {
        dispatch({ type: GAME_ACTION_TYPE.GAME_DRAW })
      } else if (leftCardMass === rightCardMass) {
        dispatch({ type: GAME_ACTION_TYPE.GAME_DRAW })
      } else if (isNaN(leftCardMass)) {
        dispatch({ type: GAME_ACTION_TYPE.SCORE_RIGHT_PLAYER })
      } else if (isNaN(rightCardMass)) {
        dispatch({ type: GAME_ACTION_TYPE.SCORE_LEFT_PLAYER })
      } else {
        const hasLeftCardBiggerMass = leftCardMass > rightCardMass;
      
        hasLeftCardBiggerMass ? dispatch({ type: GAME_ACTION_TYPE.SCORE_LEFT_PLAYER }) : dispatch({ type: GAME_ACTION_TYPE.SCORE_RIGHT_PLAYER })
      }

      dispatch({
        type: ACTION_TYPE.STORE_LEFT_PEOPLE_CARDS,
        payload: { leftCard: (leftCard.payload as GetPeopleActionSuccessPayload).data }
      }) as PeopleCardsAction<PeopleCardsStoreLeftCardActionPayload>;

      dispatch({
        type: ACTION_TYPE.STORE_RIGHT_PEOPLE_CARDS,
        payload: { rightCard: (rightCard.payload as GetPeopleActionSuccessPayload).data }
      }) as PeopleCardsAction<PeopleCardsStoreRightCardActionPayload>

    } else {
      dispatch({
        type: ACTION_TYPE.STORE_ERROR_PEOPLE_CARDS
      })
    }
  }