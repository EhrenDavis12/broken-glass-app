/**
 *
 * RatingBox
 *
 */

import React from 'react';
import Button from 'components/Button/index'
import RateTag from "components/RateTag/index";
import PropTypes from 'prop-types';
// import styled from 'styled-components';


/* eslint-disable react/prefer-stateless-function */
class RatingBox extends React.Component {
  render() {
    const { ReadOnly } = { ...this.props };
    return (
      <div>
        <form className="border p-2">
          {console.log(ReadOnly)}
          <RateTag
            Label='Job Types '
            Text='asdf  asd fkjhfi3eii vjdiasdfe  ihasdff ajklasejffe ekjakf kasdkldjfak jasd kdj klasdlkfjasee'
            Type='DropDown'
            ReadOnly={ReadOnly}
          />
          <RateTag
            Label='Pay Types '
            Text='asdf  asd fkjhfi3eii vjdiasdfe  ihasdff ajklasejffe ekjakf kasdkldjfak jasd kdj klasdlkfjasee'
            Type='DropDown'
            ReadOnly={ReadOnly}
          />
          <RateTag
            Label='Average Shift $ '
            Text='asdf  asd fkjhfi3eii vjdiasdfe  ihasdff ajklasejffe ekjakf kasdkldjfak jasd kdj klasdlkfjasee'
            Type='Text'
            ReadOnly={ReadOnly}
          />
          <RateTag
            Label='Management '
            Text='asdf  asd fkjhfi3eii vjdiasdfe  ihasdff ajklasejffe ekjakf kasdkldjfak jasd kdj klasdlkfjasee'
            Type='Text'
            ReadOnly={ReadOnly}
          />
          <RateTag
            Label='Busy '
            Text='asdf  asd fkjhfi3eii vjdiasdfe  ihasdff ajklasejffe ekjakf kasdkldjfak jasd kdj klasdlkfjasee'
            Type='Text'
            ReadOnly={ReadOnly}
          />
          <RateTag
            Label='Customers '
            Text='asdf  asd fkjhfi3eii vjdiasdfe  ihasdff ajklasejffe ekjakf kasdkldjfak jasd kdj klasdlkfjasee'
            Type='Text'
            ReadOnly={ReadOnly}
          />
          <RateTag
            Label='Over All '
            Text='asdf  asd fkjhfi3eii vjdiasdfe  ihasdff ajklasejffe ekjakf kasdkldjfak jasd kdj klasdlkfjasee'
            Type='Text'
            ReadOnly={ReadOnly}
          />
          <Button ReadOnly={ReadOnly}>Submit</Button>
        </form>
      </div>
    );
  }
}

RatingBox.propTypes = {
  ReadOnly: PropTypes.bool.isRequired,
};

export default RatingBox;
