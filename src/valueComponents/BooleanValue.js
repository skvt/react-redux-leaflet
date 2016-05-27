import React, { PropTypes } from 'react';

const BooleanValue = ({
  propName, type, required, possibleValues, onValueChange,
}) => (
  <div>
    TODO: BooleanValue for {propName}
  </div>
);

BooleanValue.propTypes = {
  propName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  possibleValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onValueChange: PropTypes.func.isRequired,
};

export default BooleanValue;
