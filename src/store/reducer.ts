import { combineReducers } from "redux";
import { getPeopleReducer } from "./people/reducers";
import { RootState } from "./state";

export const rootReducer = combineReducers<RootState>({
  people: getPeopleReducer
});
