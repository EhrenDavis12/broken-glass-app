/*
 *
 * RatingBox reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_REVIEW } from './constants';

export const initialState = fromJS({
  review:{},
});

function ratingBoxReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEW:
      return state.set('review',action.review);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default ratingBoxReducer;
