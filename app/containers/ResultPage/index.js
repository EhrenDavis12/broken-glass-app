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
import RatingBox from "containers/RatingBox/Loadable";
import RatingBoxes from "components/RatingBoxes/index";
import Modal from "components/Modal/index";
import RatingBar from "components/RatingBar/index";
import RateTag from "components/RateTag/index";
import SearchBar from "containers/SearchBar/Loadable";
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { toggleModal, setReviews } from "./actions";
import { makeSelectResultPage, makeToggleModal, makeSetReviews } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: null, PayDropDownOptions: null, JobDropDownOptions: null };
  }

  componentDidMount(){
    let api = '/api/v1/jobs'
    fetch(`${process.env.REACT_APP_API_URL}${api}`,
    )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        const stat = [];
        response.forEach(type => {
          console.log(type.id + " " + type.JobTypeDescription);
          stat.push({Id:type.id, Text:type.JobTypeDescription})
        });
        this.setState({ JobDropDownOptions: stat });
      })
      .catch(error => {
        console.log(error);
      });

    api = '/api/v1/pay'
    fetch(`${process.env.REACT_APP_API_URL}${api}`,
    )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {        
        const stat = [];
        response.forEach(type => {
          stat.push({Id:type.id, Text:type.PayTypeDescription})
        });
        this.setState({ PayDropDownOptions: stat });
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadReviews = (store) => {
    let api = '/api/v1/onereview/'
    store = 'HATE';
    if (false) {
      //set the search for all
      api = '/api/v1/allreviews/'
    }
    fetch(`${process.env.REACT_APP_API_URL}${api}${store}`,
    )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        this.setState({ response: response });
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadRatingBox = (response) => {
    if (response === null) {
      return (<></>);
    } else {
      return response.map(review => {
        (<RatingBox {...review} ReadOnly={true} />)
      })
    }
  }

  render() {
    const { resultsPage, showModal, onToggleModal, reviews } = this.props;
    return (
      <div>
        <div className="container">
          <SearchBar />
          <div> Google Maps</div>
          <hr />
          <h1>Store Name!!!</h1>
          <button onClick={this.loadReviews}>API </button>
          <RatingBar />
          <Button
            onClick={this.props.onToggleModal}
            toggle={this.props.showModal}>
            Rate Yourself
          </Button>
          <button className="button button-sm button-primary">Rate Yourself</button>

          <Modal 
            onClick={onToggleModal} 
            ShowModal={showModal}> 
              <RatingBox 
                ReadOnly={false} 
                JobDropDownOptions={this.state.JobDropDownOptions} 
                PayDropDownOptions={this.state.PayDropDownOptions} 
              />
          </Modal>

          <RatingBoxes Reviews={this.state.response} />
        </div>
      </div>
    );
  }
}

ResultPage.propTypes = {
  resultPage: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  onToggleModal: PropTypes.func,
  apiFindOneReview: PropTypes.func,
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
