import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import DropDown from './dropDownContainer';
import { ERRORMSG } from '../locales/locale';

class EducationalInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      educationInfo: []
    };
  }

  getErrorStatus () {
    const {
      educationInfo: {
        current_city, current_ctc, jobs_interested, realocate, employment_type
      }
    } = this.state;

    if (current_city && current_ctc && jobs_interested && realocate && employment_type) {
      return false
    }
    return true
  }

  handlePeriodChange (value, key, field) {
    const { handleEducationDataChange } = this.props;
    handleEducationDataChange(+value, key, field)
  }

  render () {
    const {
      Edit, educationInfo, handleEducationDataChange, handleCancel, handleHighestDegree
    } = this.props;
    return (
      <React.Fragment>
        {educationInfo.length > 0 && educationInfo.map(item => (
          <div className="education-container">
            {Edit && (
              <Row>
                <Col lg={{ size: 11 }} md={{ size: 11 }} xs={{ size: 12 }}>
                  <span className="close-icon" role="button" tabIndex={0} onKeyPress={() => {}} title="Cancel Details" onClick={() => handleCancel(item, 'education')}>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                    />
                  </span>
                </Col>
              </Row>
            )}
            <Row>
              <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
                <h6>
                  {'Degree'}
                </h6>
                <h6 className="fcash">
                  {Edit ? <input type="text" placeholder="Enter your Degree" value={item.degree_course_certification} onChange={event => handleEducationDataChange(event.target.value, 'degree_course_certification', item)} /> : item.degree_course_certification || '--' }
                </h6>
                {Edit && !item.degree_course_certification && <p className="form-errors">{ERRORMSG.DEGREE}</p>}
              </Col>
              <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
                <h6>
                  {'Institue Name'}
                </h6>
                <h6 className="fcash">
                  {Edit ? <input type="text" placeholder="Enter your Institute name" value={item.institute_college} onChange={event => handleEducationDataChange(event.target.value, 'institute_college', item)} /> : item.institute_college || '--' }
                </h6>
                {Edit && !item.institute_college && <p className="form-errors">{ERRORMSG.INSTITUTE}</p>}
              </Col>
            </Row>
            <div className="pdl10 pdt20">Time Period</div>
            <DropDown
              from_month={item.from_month}
              from_year={item.from_year}
              to_month={item.to_month}
              to_year={item.to_year}
              type="education"
              item={item}
              Edit={Edit}
              pageFlag={true} //eslint-disable-line
              handleHighestDegree={(id, type) => handleHighestDegree(id, type)}
              handlePeriodChange={(value,
                key, field) => this.handlePeriodChange(value, key, field)}
            />
          </div>
        ))
        }
      </React.Fragment>
    );
  }
}

EducationalInfo.propTypes = {
  Edit: PropTypes.isRequired,
  educationInfo: PropTypes.isRequired,
  handleEducationDataChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleHighestDegree: PropTypes.func.isRequired
};

export default EducationalInfo;
