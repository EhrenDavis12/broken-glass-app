/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearchBar from './selectors';
import reducer from './reducer';
import saga from './saga';
import Button from "components/Button/index.js";
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input className='border mr-2' type='text' placeholder={<FormattedMessage {...messages.message} />} /><Button message={<FormattedMessage {...messages.button} />} />
      </div>
    );
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchBar: makeSelectSearchBar(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'searchBar', reducer });
const withSaga = injectSaga({ key: 'searchBar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(SearchBar);
