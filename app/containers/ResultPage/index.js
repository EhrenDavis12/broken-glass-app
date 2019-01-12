/**
 *
 * ResultPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SearchBar from "containers/SearchBar/Loadable";
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectResultPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ResultPage extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ResultPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resultPage: makeSelectResultPage(),
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

const withReducer = injectReducer({ key: 'resultPage', reducer });
const withSaga = injectSaga({ key: 'resultPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ResultPage);
