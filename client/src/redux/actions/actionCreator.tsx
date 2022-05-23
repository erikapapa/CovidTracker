import { IAddPlace, IAddSocialInteractions, IDeletePlace, IDeleteSocialInteractions, IEditPlace, IEdtSocialInteractions, ILoadPlaces, ILoadSocInteraction } from './actionInterfaces'
import { Place, SocInteractions } from "../../models/models";
import * as types from './actionTypes';
import { Dispatch } from 'react';
import { getRequest } from '../../services/apiCalls';

export const AddPlaceAction = (place: Place): IAddPlace => {
  return {
    type: types.ADD_PLACE,
    payload: place
  };
};

export const EditPlaceAction = (id: string): IEditPlace => {
  return {
    type: types.EDIT_PLACE,
    payload: id
  };
};

export const DeletePlaceAction = (id: string): IDeletePlace => {
  return {
    type: types.DELETE_PLACE,
    payload: id
  };
};

export const LoadPlaceAction = (places: any[]): ILoadPlaces => {
  return {
    type: types.LOAD_PLACES,
    payload: places
  };
};


export const AddSocIntAction = (socInt: SocInteractions): IAddSocialInteractions => {
  return {
    type: types.ADD_SOC_INTERACTION,
    payload: socInt
  };
};

export const EditSocIntAction = (id: string): IEdtSocialInteractions => {
  return {
    type: types.EDIT_SOC_INTERACTION,
    payload: id
  };
};

export const DeleteSocIntAction = (id: string): IDeleteSocialInteractions => {
  return {
    type: types.DELETE_SOC_INTERACTION,
    payload: id
  };
};

export const LoadSocInteractionAction = (socInt: any[]): ILoadSocInteraction => {
  return {
    type: types.LOAD_SOC_INTERACTIONS,
    payload: socInt
  };
};

export const loadData = (url: string, dispatch: Dispatch<any>, isPlaceExposure: boolean) => {
  getRequest(url).then((result) => {
    if (isPlaceExposure) {
      dispatch(LoadPlaceAction(result))
    }
    else {
      dispatch(LoadSocInteractionAction(result))
    }
  })
}