import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the resultPage state domain
 */

const selectResultPageDomain = state => state.get("resultPage", initialState);

const selectReviewSelector = state => state;

const makeToggleModal = () =>
	createSelector(
		selectResultPageDomain,
		resultPage => resultPage.get("ShowModal")
	);

/**
 * Default selector used by ResultPage
 */
const makeSetReviews = () => {
	createSelector(
		selectResultPageDomain,
		resultPage => {
			resultPage.get("reviews");
		}
	);
};

const selectSearchBarDomain = state => state.get("searchBar", initialState);

const makeSelectResultPage = () =>
	createSelector(
		selectResultPageDomain,
		substate => {
			substate.toJS();
		}
	);

const makeSelectSearch = () =>
	createSelector(
		selectSearchBarDomain,
		searchState => searchState.get("currentSearch")
	);

//export default makeSelectResultPage;
export {
	selectResultPageDomain,
	makeToggleModal,
	makeSelectResultPage,
	makeSetReviews,
	makeSelectSearch
};
