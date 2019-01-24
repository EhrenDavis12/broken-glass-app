/*
 *
 * RatingBox actions
 *
 */

import { DEFAULT_ACTION, LOAD_REVIEW } from './constants';

export function loadRating(review) {
  return {
    type: LOAD_REVIEW,
    review
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
