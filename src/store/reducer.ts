import { combineReducers } from "redux";
import { peopleReducer } from "./people/reducers";
import { peopleCardsReducer } from "./peopleCards/reducers";
import { starshipReducer } from "./starships/reducers";

import { RootState } from "./state";

export const rootReducer = combineReducers<RootState>({
  people: peopleReducer,
  peopleCards: peopleCardsReducer,
  starship: starshipReducer,
});
