import { combineReducers } from "redux";
import { getPeopleReducer } from "./people/reducers";
import { peopleCardsReducer } from "./peopleCards/reducers";

import { RootState } from "./state";

export const rootReducer = combineReducers<RootState>({
  people: getPeopleReducer,
  peopleCards: peopleCardsReducer
});
