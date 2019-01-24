/*
 *
 * ResultPage actions
 *
 */

import { DEFAULT_ACTION, TOGGLE_MODAL, SET_REVIEWS } from './constants';

export function toggleModal(modalToggle){
  return{
    type: TOGGLE_MODAL,
    modalToggle
  }
}

export function setReviews(reviews){
  return{
    type: SET_REVIEWS,
    reviews
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
