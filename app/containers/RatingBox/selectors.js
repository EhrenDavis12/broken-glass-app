import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ratingBox state domain
 */

const selectRatingBoxDomain = state =>
  state.get('ratingBox', initialState);

/**
 * Other specific selectors
 */
const setReview = () =>
  createSelector(selectRatingBoxDomain, review => review.get('review'))

/**
 * Default selector used by RatingBox
 */

const makeSelectRatingBox = () =>
  createSelector(selectRatingBoxDomain, substate => substate.toJS());

export default makeSelectRatingBox;
export { selectRatingBoxDomain, setReview };
