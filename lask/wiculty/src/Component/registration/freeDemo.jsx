import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CountryDropDown from '../country_dropdown/country_dropdown';
import getStartedAction from './getStartedAction';
import { validations, inlineErrorMsgs } from '../validations';
import sf from '../common/safeTraverse';
import messageFn from '../common/message';
import { getAutoFillDetails, getCountryVals, filterInstrLedCourse } from '../common/utilFunctions/utilFunction';
import handleDataLayer from '../common/utilFunctions/seoUtil';
import { MESSAGES } from '../locales/locale';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class FreeDemo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      courses: ''
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleCountryChange = (countryLang) => {}

  handleValidSubmit (event, values) {
    const { source, UserPrefInfo } = this.props;
    const { phone_code } = getCountryVals(UserPrefInfo)
    const getOtpValues = {
      name: values.name,
      email: values.email,
      mobile_code: phone_code,
      contact_no: values.contact_no,
      course_interested: values.courses,
      source
    }

    handleDataLayer({
      userProject: 'Wiculty',
      page: 'Home page',
      url: window.location.href,
      course: values.courses
    })

    const { freeDemo, handleClose } = this.props;
    freeDemo({ getOtpValues }, (response) => {
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
    const { courseList, profileDetails, handleClose } = this.props;
    const { Name, email, contact_no } = getAutoFillDetails(profileDetails)
    return (
      <React.Fragment>
        {isLoading && <div className="loading" />}
        <ModalHeader toggle={() => handleClose()}>
          <Row className="modalHeader">
            <Col lg="12">
              <p className="modalLeft">Enroll for our free demo right now </p>
            </Col>
            <Col lg="12">
              <p className="modalRight">Get better insights on your learning</p>
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>
          <div className="form">
            <AvForm id="freedemo-form" onValidSubmit={this.handleValidSubmit}>
              <FormGroup>
                <AvField
                  type="text"
                  name="name"
                  id="name"
                  value={Name}
                  placeholder="Name"
                  autoComplete="off"
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
                  value={email}
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
                  name="contact_no"
                  id="started_contact_no"
                  value={contact_no}
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
                  name="courses"
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
                <Button type="submit" className="loginSubmit">Pick our course</Button>
              </FormGroup>
            </AvForm>
          </div>
        </ModalBody>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  freeDemo: (payload, cb) => {
    dispatch(getStartedAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  signupDetails: state.signupDetails,
  courseList: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || []),
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});

FreeDemo.defaultProps = {
  courseList: [],
  source: 'PickAcourse'
}
FreeDemo.propTypes = {
  freeDemo: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  courseList: PropTypes.arrayOf(),
  profileDetails: PropTypes.shape({}).isRequired,
  source: PropTypes.string,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FreeDemo);
