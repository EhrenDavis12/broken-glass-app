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
import { Redirect } from 'react-router-dom'

import { changeCurrentSearch } from './actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectSearchBar, makeSelectSearch } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Button from "components/Button/index.js";
import TextBox from "components/TextBox/index.js";
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {searchValue: props.currentSearch}
    this.state = { redirect: false }
  }

  componentDidMount() {
    this.setState({ redirect: false });
  }

  onKeyPress = evt => {
    if (evt.key === 'Enter') {
      this.setState({ redirect: true });
    }
  }
  /*   TextChange = (event) => {
      //this.setState({searchValue: event.target.value});
      dispatch(setCurrentSearch(event.target.value));
    } */


  render() {
    const { currentSearch, onChangeCurrentSearch, onClickButton, onKeyPress } = this.props;
    const { button } = { ...messages };

    if (this.state.redirect) {
      this.setState({redirect:false});
      return (<Redirect to='/results' />)
    }
    return (
      <div>
        <TextBox
          handelInputChange={onChangeCurrentSearch}
          onKeyPress={this.onKeyPress}
          PlaceHolder={<FormattedMessage {...messages.searchLabel}
            TextValue={currentSearch} />} />
        <Button href='/results' handleRoute={onClickButton}>{button.defaultMessage}</Button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentSearch: PropTypes.string,
  onChangeCurrentSearch: PropTypes.func,
  onClickButton: PropTypes.func,
  onKeyPress: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  searchBar: makeSelectSearchBar(),
  currentSearch: makeSelectSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeCurrentSearch: evt => dispatch(changeCurrentSearch(evt.target.value)),
    dispatch,
    onClickButton: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    },

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
