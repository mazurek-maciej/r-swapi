import { Dispatch } from "redux";
import { getPeopleAction } from "../../people/actions";
import { GetPeopleActionSuccessPayload } from "../../people/actions/types";
import { RootState } from "../../state";
import { ACTION_TYPE, PeopleCardsAction, PeopleCardsStoreLeftCardActionPayload, PeopleCardsStoreRightCardActionPayload } from "./types";

export const storePeopleCardsAction = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const leftCard = await dispatch(getPeopleAction())
    const rightCard = await dispatch(getPeopleAction())

    if (leftCard && rightCard) {
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