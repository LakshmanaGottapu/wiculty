import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import CountryDropDown from '../country_dropdown/country_dropdown';
import getStartedAction from '../registration/getStartedAction';

import sf from '../common/safeTraverse';
import messageFn from '../common/message';

import { getAutoFillDetails, getCountryVals } from '../common/utilFunctions/utilFunction';
import handleDataLayer from '../common/utilFunctions/seoUtil';

import { MESSAGES } from '../locales/locale';
import { validations, inlineErrorMsgs } from '../validations';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class SpecialOffer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      courses: ''
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleCountryChange = (countryLang) => {}

  handleValidSubmit (event, values) {
    const { source, UserPrefInfo, course } = this.props;
    const { phone_code } = getCountryVals(UserPrefInfo);
    const courseName = values.courses || course;
    const getOtpValues = {
      name: values.name,
      email: values.email,
      mobile_code: phone_code,
      contact_no: values.contactNo,
      course_interested: courseName,
      source
    }

    handleDataLayer({
      userProject: 'Wiculty',
      page: 'Home page',
      url: window.location.href,
      course: values.courses
    })

    const { specialOffer, handleClose } = this.props;
    specialOffer({ getOtpValues }, (response) => {
      const { data, status } = response || {};
      if (data && status === 200) {
        handleClose()
        const msg = sf(data, ['data', 'message'])
        messageFn(msg, SUCCESS)
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  render () {
    const {
      isLoading
    } = this.state;
    const {
      courseList, profileDetails, handleClose, isCourseDD
    } = this.props;
    const { email, contact_no } = getAutoFillDetails(profileDetails)
    return (
      <React.Fragment>
        {isLoading && <div className="loading" />}
        <ModalHeader toggle={() => handleClose()}>
          <Row className="modalHeader">
            <Col lg="12">
              <p className="modalLeft">INDEPENDENCE DAY OFFER</p>
            </Col>
            <Col lg="12">
              <p className="modalRight">Book your course now with us</p>
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>
          <div className="form">
            <AvForm id="special-offer" onValidSubmit={this.handleValidSubmit}>
              <FormGroup>
                <AvField
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Email*"
                  autoComplete="off"
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
                  value={contact_no}
                  placeholder="Contact no*"
                  autoComplete="off"
                  className="form-control"
                  errorMessage={inlineErrorMsgs.Mobile_number}
                  validate={validations.mobile_number}
                />
              </div>
              {isCourseDD && (
                <FormGroup>
                  <AvField type="select" name="courses" label="Courses">
                    {courseList.map(courseItem => (
                      <option value={courseItem.unique_title}>
                        {courseItem.display_title}
                      </option>
                    ))}
                  </AvField>
                </FormGroup>
              ) }
              <FormGroup>
                <Button type="submit" className="loginSubmit">Submit</Button>
              </FormGroup>
              <ul className="text-white ul-start">
                <li>
                  Our Course advisor will reach out to you and
                  explain in detail about all the services
                </li>
                <li>
                  Our expert will assist you with a coupon to avail the offer
                </li>
                <li>
                  {'Don\'t worry, we keep it totally professional. We don\'t spam our users'}
                </li>

              </ul>
            </AvForm>
          </div>
        </ModalBody>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  specialOffer: (payload, cb) => {
    dispatch(getStartedAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  signupDetails: state.signupDetails,
  courseList: sf(state, ['homeCourses', 'data', 'data', 'courses']),
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});

SpecialOffer.defaultProps = {
  courseList: [],
  source: 'special_offer',
  isCourseDD: true,
  course: ''
}
SpecialOffer.propTypes = {
  specialOffer: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  courseList: PropTypes.arrayOf(),
  profileDetails: PropTypes.shape({}).isRequired,
  source: PropTypes.string,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  isCourseDD: PropTypes.bool,
  course: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialOffer);
