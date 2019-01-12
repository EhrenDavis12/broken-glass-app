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

import {changeCurrentSearch} from './actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectSearchBar, makeSelectSearch} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Button from "components/Button/index.js";
import TextBox from "components/TextBox/index.js";
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class SearchBar extends React.Component {
  constructor(props){
    super(props);
    //this.state = {searchValue: props.currentSearch}
  }

  componentDidMount(){
    
  }

  TextChange = (event)=>{
    //this.setState({searchValue: event.target.value});
    dispatch(setCurrentSearch(event.target.value));
  }


  render() {
    const {currentSearch, onChangeCurrentSearch} = this.props;
    return (
      <div>
        <TextBox 
          handelInputChange={onChangeCurrentSearch} 
          PlaceHolder={<FormattedMessage {...messages.searchLabel} 
          TextValue={currentSearch}/>} />
        <Button message={<FormattedMessage {...messages.button} />} />
      </div>
    );
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentSearch: PropTypes.string,
  onChangeCurrentSearch: PropTypes.func,
  onClickButton: PropTypes.func,
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
      if(evt !== undefined && evt.preventDefault) evt.preventDefault();
      
    }
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
