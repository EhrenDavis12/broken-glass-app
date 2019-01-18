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

import Button from 'components/Button/index';
import RatingBox from "components/RatingBox/index";
import Modal from "components/Modal/index";
import RatingBar from "components/RatingBar/index";
import RateTag from "components/RateTag/index";
import SearchBar from "containers/SearchBar/Loadable";
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { toggleModal } from "./actions";
import { makeSelectResultPage, makeToggleModal } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ResultPage extends React.Component {


  render() {
    const { showModal, onToggleModal } = this.props;
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
          <Button 
          onClick={this.props.onToggleModal} 
          toggle={this.props.showModal}> 
            Rate Yourself
          </Button>
          <button className="button button-sm button-primary">Rate Yourself</button>
          
          <Modal onClick={onToggleModal} ShowModal={showModal}> <RatingBox ReadOnly={false} /></Modal>
          {/*We will have to decide here as to if they are logged on to loop through them all or just display one.*/}
          <RatingBox ReadOnly={true} />
        </div>
      </div>
    );
  }
}

ResultPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  onToggleModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  resultPage: makeSelectResultPage(),
  showModal: makeToggleModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    onToggleModal: evt => {
      dispatch(toggleModal(evt.target.dataset.toggle === "true" ? false : true))
    },
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
