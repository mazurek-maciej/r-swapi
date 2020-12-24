import { AnyAction } from "redux";
import fetchMock from 'fetch-mock';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { apiMiddleware } from "redux-api-middleware";
import thunk, { ThunkDispatch } from "redux-thunk";
import { clearStarshipsCards, storeStarshipsCards } from ".";
import { configureStore } from "../..";

import { RootState } from "../../state";

import validStarships from '../../../_mocks_/validStarshipsResponse.json'
import { ACTION_TYPE } from "./types";
import { ACTION_TYPE as STARSHIPS_TYPE } from "../../starships/actions/types";
import { ACTION_TYPE as GAME_TYPE } from "../../game/actions/types";

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>

const middlewares = [thunk, apiMiddleware];
const { store: rootStore } = configureStore();
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares)

describe('Starships Cards store actions', () => {
  let store: MockStoreEnhanced<RootState, DispatchExts>
  const URL = 'begin:https://swapi.dev/api/starships';
  const strongerCard = validStarships.results[0];
  const weakerCard = validStarships.results[1];

  beforeEach(() => {
    store = mockStore(rootStore.getState())
  })

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  // it('should store both cards when fetch starships data is successfull', () => {
  //   fetchMock.getOnce(URL, {
  //     body: validStarships
  //   })

  //   const expectedActions = [
  //     { type: STARSHIPS_TYPE.GET_REQUEST },
  //     { type: STARSHIPS_TYPE.GET_SUCCESS, payload: validStarships, meta: undefined },
  //     { type: GAME_TYPE.SCORE_LEFT_PLAYER, meta: undefined },
  //     { type: ACTION_TYPE.STORE_STARSHIPS_CARDS, payload: {
  //       leftCard: strongerCard,
  //       rightCard: weakerCard
  //     }, meta: undefined}
  //   ]

  //   return store.dispatch(storeStarshipsCards()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   })
  // })

  it('should handle STORE_ERROR_STARSHIPS_CARDS when fetch starships data is failure', () => {
    const response = {
      data: 'No data'
    }
    fetchMock.getOnce(URL, {
      body: response,
      status: 404
    })

    const expectedActions = [
      { type: STARSHIPS_TYPE.GET_REQUEST },
      { type: STARSHIPS_TYPE.GET_FAILURE, payload: response, meta: undefined, error: true },
      { type: ACTION_TYPE.STORE_ERROR_STARSHIPS_CARDS }
    ]

    return store.dispatch(storeStarshipsCards()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

  it('should handle CLEAR_STARSHIPS_CARDS', () => {
    const expectedAction = { type: ACTION_TYPE.CLEAR_STARSHIPS_CARDS }

    expect(clearStarshipsCards()).toEqual(expectedAction)
  })
})
