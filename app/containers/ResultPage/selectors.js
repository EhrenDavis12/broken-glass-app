import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the resultPage state domain
 */

const selectResultPageDomain = state =>
  state.get('resultPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ResultPage
 */

const makeSelectResultPage = () =>
  createSelector(selectResultPageDomain, substate => substate.toJS());

export default makeSelectResultPage;
export { selectResultPageDomain };
