import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import DropDown from './dropDownContainer';
import { ERRORMSG } from '../locales/locale';

class CertificationInfo extends Component {
  constructor (props) {
    super(props);
    this.state = { };
  }

  handlePeriodChange (value, key, field) {
    const { handleCertifcateDataChange } = this.props;
    handleCertifcateDataChange(+value, key, field)
  }

  render () {
    const {
      Edit, certificationInfo, handleCertifcateDataChange, handleCancel, handleHighestDegree
    } = this.props;
    return (
      <React.Fragment>
        {certificationInfo.length > 0 && certificationInfo.map(item => (
          <div className="certification-container">
            {Edit && (
              <Row>
                <Col lg={{ size: 11 }} md={{ size: 11 }} xs={{ size: 12 }}>
                  <span role="button" tabIndex={0} onKeyPress={() => {}} className="close-icon" title="Cancel Details" onClick={() => handleCancel(item, 'certification')}>
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
                  {'Course/Certification'}
                </h6>
                <h6 className="fcash">
                  {Edit ? <input type="text" placeholder="Enter your Course" value={item.degree_course_certification} onChange={event => handleCertifcateDataChange(event.target.value, 'degree_course_certification', item)} /> : item.degree_course_certification || '--' }
                </h6>
                {!item.degree_course_certification && <p className="form-errors">{ERRORMSG.COURSE}</p>}
              </Col>
              <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
                <h6>
                  {'Institue Name'}
                </h6>
                <h6 className="fcash">
                  {Edit ? <input type="text" placeholder="Enter your Institute name" value={item.institute_college} onChange={event => handleCertifcateDataChange(event.target.value, 'institute_college', item)} /> : item.institute_college || '--' }
                </h6>
                {!item.institute_college && <p className="form-errors">{ERRORMSG.INSTITUTE}</p>}
              </Col>
            </Row>
            <div className="pdl10 pdt20">Time Period</div>
            <DropDown
              Edit={Edit}
              from_month={item.from_month}
              from_year={item.from_year}
              to_month={item.to_month}
              to_year={item.to_year}
              type="certification"
              item={item}
              pageFlag={false} //eslint-disable-line
              handleHighestDegree={(id, type) => handleHighestDegree(id, type)}
              handlePeriodChange={(value,
                key, field) => this.handlePeriodChange(value, key, field)}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}
CertificationInfo.propTypes = {
  Edit: PropTypes.isRequired,
  certificationInfo: PropTypes.isRequired,
  handleCertifcateDataChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleHighestDegree: PropTypes.func.isRequired
};

export default CertificationInfo;
