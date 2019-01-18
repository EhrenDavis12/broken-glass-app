/*
 *
 * SearchBar reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_CURRENT_SEARCH, START_SEARCH } from './constants';

export const initialState = fromJS({
  currentSearch: "",
}
);

function searchBarReducer(state = initialState, action) {
  console.log(action.search);
  switch (action.type) {
    case SET_CURRENT_SEARCH:
      return state.set('currentSearch', action.search);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default searchBarReducer;
