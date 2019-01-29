/**
 *
 * RatingBox
 *
 */

import React from 'react';
import RatingBox from "containers/RatingBox/Loadable"
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
margin-bottom: 20px;
margin-left: auto;
margin-right: auto;
overflow-y:auto;
opacity: 1;
background: #72726e;
max-width: 800px;
max-height: 300px;
padding: 10px;
border: solid;
border-radius: 10px;
border-color: black;
color: black;

`;

/* eslint-disable react/prefer-stateless-function */
class RatingBoxes extends React.Component {
  render() {
    const { Reviews } = { ...this.props };
    if (Reviews === null || Reviews.length <= 0) {
      return (<h1>No Reviews</h1>);
    }
    else {
      return (
        <div>
          {Reviews.map((review,i) => (
            <div key={i}>
              {/* <p>Posted: {review.createdAt}</p> */}
              <Container>
                <RatingBox
                  key={review.uuid}
                  Review={review}
                  ReadOnly={true}
                  PayDropDownOptions={null}
                  JobDropDownOptions={null}
                />
              </Container>
            </div>
          ))}
        </div>
      );
    }
  }
}

RatingBoxes.propTypes = {
  Reviews: PropTypes.array,
};

export default RatingBoxes;
