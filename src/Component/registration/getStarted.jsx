import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CountryDropDown from '../country_dropdown/country_dropdown';

import getStartedAction from './getStartedAction';
import messageFn from '../common/message'
import { validations, inlineErrorMsgs } from '../validations';
import { MESSAGES } from '../locales/locale';
import { getCountryVals, filterInstrLedCourse } from '../common/utilFunctions/utilFunction'
import sf from '../common/safeTraverse';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class GetStarted extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleValidSubmit = (event, values) => {
    const { UserPrefInfo } = this.props;
    const { phone_code } = getCountryVals(UserPrefInfo)
    const getOtpValues = {
      contact_no: values.contactNo,
      name: values.name,
      email: values.email,
      city: values.city,
      source: 'get_started',
      mobile_code: phone_code,
      course_interested: values.course
    }
    const { getStarted, handleClose } = this.props;
    getStarted({ getOtpValues }, (response) => {
      const { data = {}, status } = response || {};
      if (data && status === 200) {
        const { data: { message = '' } } = data
        messageFn(message, SUCCESS)
        handleClose()
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  handleCountryChange = (countryLang) => {}

  render () {
    const {
      isLoading
    } = this.state;
    const { handleClose, courseList } = this.props;
    // const cityValidation = { ...validations.name,
    // required: { ...validations.name.required, errorMessage: 'Please enter city name' } }
    return (
      <React.Fragment>
        {isLoading && <div className="loading" />}
        <ModalBody className="signUp">
          <Col lg="12">
            <Row>
              <p className="close-icon">
                <FontAwesomeIcon icon={faTimesCircle} onClick={() => handleClose()} />
              </p>
              <ModalHeader>
                <Row className="modalHeader">
                  <Col lg="6">
                    <h2 className="modalLeft">GET STARTED</h2>
                  </Col>
                  <Col lg="6">
                    <p className="modalRight">
                      Wide open your career path with
                      wiculty’s tuff-twinned courses
                    </p>
                  </Col>
                </Row>
              </ModalHeader>
              <div className="form">
                <AvForm id="getstarted-form" onValidSubmit={this.handleValidSubmit}>
                  <FormGroup>
                    <AvField
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      autoComplete="given-name"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Name}
                      validate={validations.name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email*"
                      autoComplete="email"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Email}
                      validate={validations.email}
                    />
                  </FormGroup>
                  <div className="d-inline-flex fullWidth">
                    <CountryDropDown onSelectCountry={this.handleCountryChange} />
                    <AvField
                      type="number"
                      name="contactNo"
                      id="started_contact_no"
                      placeholder="Contact no*"
                      autoComplete="tel-national"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Mobile_number}
                      validate={validations.mobile_number}
                    />
                  </div>
                  <FormGroup>
                    <AvField
                      type="select"
                      name="course"
                      label="Courses"
                      errorMessage={inlineErrorMsgs.Course_select}
                      required
                    >
                      {courseList.map(courseItem => (
                        <option value={courseItem.unique_title}>
                          {courseItem.display_title}
                        </option>
                      ))}
                    </AvField>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" className="loginSubmit">Submit</Button>
                  </FormGroup>
                  <Row>
                    <p className="termsRedirect">
                      {'Get inspired by our unique training approach that eventually pave a splendid career path'}
                    </p>
                  </Row>
                </AvForm>
              </div>
            </Row>
          </Col>
        </ModalBody>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getStarted: (payload, cb) => {
    dispatch(getStartedAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo,
  courseList: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || [])
});

GetStarted.defaultProps = {
  courseList: []
}

GetStarted.propTypes = {
  handleClose: PropTypes.func.isRequired,
  getStarted: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  courseList: PropTypes.arrayOf()
};

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted);
