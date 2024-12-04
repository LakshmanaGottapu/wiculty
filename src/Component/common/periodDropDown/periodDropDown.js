import React from 'react';
import PropTypes from 'prop-types';

import './periodDropDown.scss'

const PeriodDropDown = ({
  periods, type, selectedValue, onDataChange, Edit
}) => (
  <select className="period-dropdown" onChange={event => onDataChange(event)} disabled={Edit !== true}>
    <option value="">{`---  ${type}  ---`}</option>
    {periods.map(period => (
      <option selected={period === selectedValue} value={period}>{period}</option>
    ))}
  </select>
)

PeriodDropDown.propTypes = {
  periods: PropTypes.isRequired,
  type: PropTypes.isRequired,
  Edit: PropTypes.isRequired,
  selectedValue: PropTypes.isRequired,
  onDataChange: PropTypes.func.isRequired
};

export default PeriodDropDown;
