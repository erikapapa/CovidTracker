import { Place, SocInteractions } from "../../models/models";

export interface StoreState {
  placeList: Place[];
  socInteractionList: SocInteractions[];
}

export const initialState: StoreState = {
  placeList: [],
  socInteractionList: []
};
