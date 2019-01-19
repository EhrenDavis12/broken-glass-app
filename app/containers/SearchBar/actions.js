/*
 *
 * SearchBar actions
 *
 */

import { DEFAULT_ACTION, SET_CURRENT_SEARCH } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeCurrentSearch(search){
  return {
    type: SET_CURRENT_SEARCH,
    search
  };
}

export function startSearch(){
  return {
    type:START_SEARCH,
  };
}


