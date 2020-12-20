import { RSAAAction } from "redux-api-middleware";
import { Starship } from "../models/Starship";

export enum ACTION_TYPE {
  GET_REQUEST = 'starship/GET_REQUEST',
  GET_SUCCESS = 'starship/GET_SUCCESS',
  GET_FAILURE = 'starship/GET_FAILURE'
}

export interface GetStarshipAction<State, Payload, Meta> extends RSAAAction<State, Payload, Meta> {}

export interface GetStarshipActionPayload {}

export interface GetStarshipActionSuccessPayload extends GetStarshipActionPayload {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Starship[];
  }
}

export interface GetStarshipActionFailurePayload extends GetStarshipActionPayload {
  detail: string
}

export interface StarshipsBothCardsPayload extends GetStarshipActionPayload {
  leftCard: Starship;
  rightCard: Starship
}

export interface GetStarshipActiondMeta {}
