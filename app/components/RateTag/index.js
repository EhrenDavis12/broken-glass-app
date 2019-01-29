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

  InputType = () => {
    switch (this.props.Type) {
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
          DropDownOptions={this.props.DropDownOptions}
        />)

    }
  };



  render() {

    return (
      <div className='row my-1'>
        <div className="col-md-3">
          <label>{this.props.Label} </label>
        </div>
        <div className='col-sm-4'>
          <RatingBar hidden={this.props.HideRatingBar} Rating={this.props.Rating} ReadOnly={this.props.ReadOnly} onClick={this.props.onClickRating} RatingFor={this.props.RatingFor} />
        </div>
        <div className='col-md-5'>
          {this.InputType()}
          {/* <InputText ReadOnly={this.props.ReadOnly} Text={this.props.Text} /> */}
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
