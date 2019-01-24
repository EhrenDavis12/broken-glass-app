/*
 *
 * ResultPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, TOGGLE_MODAL, SET_REVIEWS } from './constants';

export const initialState = fromJS({
  ShowModal: false,
  reviews:[{
    uuid: "",
    userId: "",
    shiftPayComment: "",
    shiftPayRating: 0,
    managementComment: "",
    managementRating: 0,
    busyComment: "",
    busyRating: 0,
    customerComment: "",
    customerRating: 0,
    overallComment: "",
    overallRating: 0,
    createdAt: "",
    updatedAt: "",
    CompanyId: "",
    JobTypeId: "",
    PayTypeId: ""
}]
});

function resultPageReducer(state = initialState, action) {

  switch (action.type) {
    case TOGGLE_MODAL:
      return state.set('ShowModal', action.modalToggle);
    case SET_REVIEWS:
      return state.set('reviews', action.reviews);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default resultPageReducer;
