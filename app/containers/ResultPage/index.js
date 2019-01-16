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

import RatingBar from "components/RatingBar/index";
import RateTag from "components/RateTag/index";
import { Star } from "components/Star/index";
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
        <nav className="nav">
          <a className="nav-link active" href="#">Active</a>
          <a className="nav-link" href="#">Link</a>
          <a className="nav-link" href="#">Link</a>
          <a className="nav-link disabled" href="#">Disabled</a>
        </nav>
        <div className="container">
          <SearchBar />
          <div> Google Maps</div>
          <hr />
          <h1>Store Name!!!</h1>
          <RatingBar />
          <button className="button button-sm button-primary">Rate Yourself</button>

          <form className="border p-2">
            <RateTag Label='Job Types '/>
            <RateTag Label='Pay Types '/>
            <RateTag Label='Average Shift $ '/>
            <RateTag Label='Management '/>
            <RateTag Label='Busy '/>
            <RateTag Label='Customers '/>
            <RateTag Label='Over All '/>
          </form>
        </div>
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
