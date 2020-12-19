import { PeopleState } from "./people/reducers/types";
import { PeopleCardsState } from "./peopleCards/reducers/types";

export interface RootState {
  people: PeopleState;
  peopleCards: PeopleCardsState;
};
