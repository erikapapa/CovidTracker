import { Action } from "redux";
import { Place, SocInteractions } from "../../models/models";
import * as types from './actionTypes';

export interface IAddPlace extends Action {
  type: typeof types.ADD_PLACE;
  payload: Place;
};

export interface IEditPlace extends Action {
  type: typeof types.EDIT_PLACE;
  payload: string;
};

export interface IDeletePlace extends Action {
  type: typeof types.DELETE_PLACE;
  payload: string;
};

export interface ILoadPlaces extends Action {
  type: typeof types.LOAD_PLACES,
  payload: Place[];
}

export interface IAddSocialInteractions extends Action {
  type: typeof types.ADD_SOC_INTERACTION;
  payload: SocInteractions;
};

export interface IEdtSocialInteractions extends Action {
  type: typeof types.EDIT_SOC_INTERACTION;
  payload: string;
};

export interface IDeleteSocialInteractions extends Action {
  type: typeof types.DELETE_SOC_INTERACTION;
  payload: string;
};

export interface ILoadSocInteraction extends Action {
  type: typeof types.LOAD_SOC_INTERACTIONS,
  payload: SocInteractions[];
}