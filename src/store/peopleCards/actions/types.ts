import { Action } from "redux-actions";
import { People } from "../../people/models/People";

export enum ACTION_TYPE {
  STORE_LEFT_PEOPLE_CARDS = 'STORE_LEFT_PEOPLE_CARDS',
  STORE_RIGHT_PEOPLE_CARDS = 'STORE_RIGHT_PEOPLE_CARDS',
  STORE_ERROR_PEOPLE_CARDS = 'STORE_ERROR_PEOPLE_CARDS'
}

export interface PeopleCardsAction<Payload> extends Action<Payload> {}

export interface PeopleCardsActionPayload {}

export interface PeopleCardsStoreLeftCardActionPayload extends PeopleCardsActionPayload {
  leftCard: People
}

export interface PeopleCardsStoreRightCardActionPayload extends PeopleCardsActionPayload {
  rightCard: People
}