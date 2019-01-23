/**
 *
 * RateTag
 *
 */

import React from 'react';
import RatingBar from "components/RatingBar/index";
import PropTypes from 'prop-types';
import InputText from "components/InputText/index";
import InputDropdown from "components/InputDropdown/index";
// import styled from 'styled-components';


/* eslint-disable react/prefer-stateless-function */
class RateTag extends React.PureComponent {
  constructor(props) {
    super(props);
    //this.Label = props.Label;
  }

  InputType = ()=>{
    switch(this.props.Type){
    case "Text":
     return (<InputText 
      ReadOnly={this.props.ReadOnly} 
      Text={this.props.Text} 
      RatingFor={this.props.RatingFor} 
      onChangeComment={this.props.onChangeComment}
      />);

     case "DropDown":
     return (<InputDropdown 
      ReadOnly={this.props.ReadOnly} 
      Text={this.props.Text} 
      RatingFor={this.props.RatingFor} 
      onChangeComment={this.props.onChangeComment}
      />)

    }
  };



  render() {

    return (
      <div className='row'>
        <div className="col-sm-2">
          <label>{this.props.Label} </label>
        </div>
        <div className='col-sm-8'>
        {this.InputType()}
        {/* <InputText ReadOnly={this.props.ReadOnly} Text={this.props.Text} /> */}
        </div>
        <div className='col-sm-2'>
          <RatingBar Rating={this.props.Rating} onClick={this.props.onClickRating} RatingFor={this.props.RatingFor}/>
        </div>
        
      </div>
    );
  }
}

RateTag.propTypes = {
  ReadOnly: PropTypes.bool,
  Text: PropTypes.string,
  Type: PropTypes.string,
  Label: PropTypes.string,
};

export default RateTag;
