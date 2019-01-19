import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchBar state domain
 */

const selectSearchBarDomain = state =>
  state.get('searchBar', initialState);

const makeSelectSearchBar = () =>
  createSelector(selectSearchBarDomain, substate => substate.toJS());

const makeSelectSearch = () =>
  createSelector(selectSearchBarDomain, searchState => searchState.get('currentSearch'))

export default makeSelectSearchBar;
export { makeSelectSearchBar, selectSearchBarDomain, makeSelectSearch};
