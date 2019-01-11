import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchBar state domain
 */

const selectSearchBarDomain = state =>
  state.get('searchBar', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchBar
 */

const makeSelectSearchBar = () =>
  createSelector(selectSearchBarDomain, substate => substate.toJS());

export default makeSelectSearchBar;
export { selectSearchBarDomain };
