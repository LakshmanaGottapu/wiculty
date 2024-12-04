/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import PeriodDropDown from '../common/periodDropDown/periodDropDown'
import getYears from '../common/getYears'
import { months } from '../../Constants/constants';
import { ERRORMSG } from '../locales/locale'
import { validateDateSelection } from '../common/utilFunctions/utilFunction'

const DropDown = ({
  from_month, from_year, to_month, to_year, type, item,
  handleHighestDegree, handlePeriodChange, pageFlag, Edit
}) => (
  <Row>
    <Col className="dropdown-conatiner" lg={{ size: 4 }} md={{ size: 5 }} xs={{ size: 12 }}>
      <PeriodDropDown
        periods={months}
        Edit={Edit}
        type="Month"
        selectedValue={months[from_month - 1]}
        onDataChange={event => handlePeriodChange((months.indexOf(event.target.value) + 1), 'from_month', item)}
      />
      <PeriodDropDown
        periods={getYears()}
        Edit={Edit}
        type="Year"
        selectedValue={from_year} /*eslint-disable-line */
        onDataChange={event => handlePeriodChange(event.target.value, 'from_year', item)}
      />
    </Col>
    <Col lg={{ size: 1 }} md={{ size: 2 }} xs={{ size: 12 }}>
      <div className="fcfc mgt15 mgr50">To</div>
    </Col>
    <Col className="dropdown-conatiner" lg={{ size: 4 }} md={{ size: 5 }} xs={{ size: 12 }}>
      <PeriodDropDown
        periods={months}
        Edit={Edit}
        type="Month"
        selectedValue={months[to_month - 1]}
        onDataChange={event => handlePeriodChange((months.indexOf(event.target.value) + 1), 'to_month', item)}
      />
      <PeriodDropDown
        periods={getYears()}
        Edit={Edit}
        type="Year"
        selectedValue={to_year} /*eslint-disable-line */
        onDataChange={event => handlePeriodChange(event.target.value, 'to_year', item)}
      />
      {Edit && validateDateSelection(from_month, from_year, to_month, to_year) && <p className="form-errors">{ERRORMSG.DATE_CHECK}</p>}
      {Edit && (!to_year || !from_year || !from_month || !to_month) && <p className="form-errors">{ERRORMSG.SELECT_DATE}</p>}
    </Col>
    {pageFlag &&
    (
      <Col lg={{ size: 3 }} md={{ size: 12 }} xs={{ size: 12 }}>
        <label className="highest-degree" for="lfname"> {/*eslint-disable-line */}
          <input type="radio" id="lfname" name={`${type}Degree`} onChange={() => handleHighestDegree(item.id, type)} />
          <span>
            {'This is my Highest Degree'}
          </span>
        </label>
      </Col>
    )}
  </Row>
)
DropDown.propTypes = {
  from_month: PropTypes.isRequired,
  from_year: PropTypes.isRequired,
  to_month: PropTypes.isRequired,
  to_year: PropTypes.isRequired,
  type: PropTypes.isRequired,
  item: PropTypes.isRequired,
  handleHighestDegree: PropTypes.func.isRequired,
  handlePeriodChange: PropTypes.func.isRequired,
  pageFlag: PropTypes.isRequired,
  Edit: PropTypes.isRequired
};
export default DropDown;
