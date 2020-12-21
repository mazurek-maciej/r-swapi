import { StatusOfAPICall } from "../../game/models/StatusOfApiCall";
import { Starship } from "../models/Starship";

export interface StarshipState {
  status: StatusOfAPICall;
  leftCard?: Starship;
  rightCard?: Starship;
  error?: string
}