import { StatusOfAPICall } from "../../../services/StatusOfApiCall";
import { Starship } from "../models/Starship";

export interface StarshipState {
  status: StatusOfAPICall;
  leftCard?: Starship;
  rightCard?: Starship;
  error?: string
}