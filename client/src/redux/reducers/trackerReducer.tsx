import { IAddPlace, ILoadPlaces, ILoadSocInteraction } from "../actions/actionInterfaces";
import { StoreState, initialState } from "../store/store";
import { Reducer } from "redux";
import * as types from "../actions/actionTypes"

const trackerReducer: Reducer<StoreState, ILoadPlaces | ILoadSocInteraction> = (
  state: StoreState = initialState,
  action: ILoadPlaces | ILoadSocInteraction
) => {

  switch (action.type) {
    case types.LOAD_PLACES:
      return {
        ...state,
        placeList: action.payload
      };

    case types.LOAD_SOC_INTERACTIONS:
      return {
        ...state,
        socInteractionList: action.payload
      };
      
    default:
      return state;
  }

};

export default trackerReducer;
