import { StatusOfAPICall } from "../../../services/StatusOfApiCall";

export interface PeopleState {
  status: StatusOfAPICall;
  data?: {};
  error?: string
}