/*
 *
 * ResultPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, TOGGLE_MODAL } from './constants';

export const initialState = fromJS({
  ShowModal:false,
});

function resultPageReducer(state = initialState, action) {
  console.log(action.modalToggle)
  switch (action.type) {
    case TOGGLE_MODAL:
      return state.set('ShowModal', action.modalToggle);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default resultPageReducer;
