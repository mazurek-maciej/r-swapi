import { PeopleState } from "./people/reducers/types";
import { PeopleCardsState } from "./peopleCards/reducers/types";
import { StarshipState } from "./starships/reducers/types";

export interface RootState {
  people: PeopleState;
  peopleCards: PeopleCardsState;
  starship: StarshipState;
};
