/*
 *
 * ResultPage actions
 *
 */

import { DEFAULT_ACTION, TOGGLE_MODAL } from './constants';

export function toggleModal(modalToggle){
  return{
    type: TOGGLE_MODAL,
    modalToggle
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
