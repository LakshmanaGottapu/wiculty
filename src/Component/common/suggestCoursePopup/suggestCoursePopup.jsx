import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CountryDropDown from '../../country_dropdown/country_dropdown';
import suggestCourseAction from './suggestCourseAction';
import { validations, inlineErrorMsgs } from '../../validations';
import messageFn from '../message'
import { MESSAGES } from '../../locales/locale';
import { getAutoFillDetails, getCountryVals } from '../utilFunctions/utilFunction';
import handleDataLayer from '../utilFunctions/seoUtil';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class SuggestCoursePopup extends Component {
  constructor (props) {
    super(props);
    this.state = {};

    this.formRef = React.createRef();
  }

  handleCountryChange = (countryLang) => {}

  cancel = () => {
    this.form && this.form.reset();
  }

  handleValidSubmit = (event, values) => {
    const { sendEnquiry, handleSuggestClose, UserPrefInfo } = this.props;
    const { phone_code } = getCountryVals(UserPrefInfo)
    const enquiryValues = {
      ...values,
      type: 'suggest course',
      mobile_code: phone_code
    }

    handleDataLayer({
      userProject: 'Wiculty',
      page: 'Home page',
      url: window.location.href,
      course: values.course
    })

    sendEnquiry({ enquiryValues }, (response) => {
      const { data = {}, status } = response || {};
      if (data && status === 200) {
        const { data: { message = '' } } = data
        messageFn(message, SUCCESS)
        handleSuggestClose()
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  render () {
    const { isOpen, profileDetails, handleSuggestClose } = this.props;
    const { Name = '', email = '', contact_no = '' } = getAutoFillDetails(profileDetails)
    return (
      <React.Fragment>
        <Modal
          isOpen={isOpen}
          toggle="true"
          className="modal-dialog-centered"
          data-backdrop="static"
        >
          <ModalHeader toggle={handleSuggestClose}>
            <Row className="modalHeader">
              <Col lg="12">
                <p className="modalLeft">Suggest us a Course! We may add it for you</p>
              </Col>
            </Row>
          </ModalHeader>

          <ModalBody className="suggestACourse">
            <Row>
              <Col lg="12" sm="12">
                <AvForm id="suggestcourse-form" onValidSubmit={this.handleValidSubmit} ref={c => (this.form = c)}>

                  <AvField
                    type="text"
                    name="name"
                    value={Name}
                    id="suggestName"
                    placeholder="Name"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Name}
                    validate={validations.name}
                  />

                  <AvField
                    type="email"
                    name="email"
                    value={email}
                    id="suggestEmail"
                    placeholder="Email*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Email}
                    validate={validations.email}
                  />

                  <div className="d-inline-flex fullWidth">
                    <CountryDropDown name="country_code" onSelectCountry={this.handleCountryChange} />
                    <AvField
                      type="text"
                      name="contact_no"
                      value={contact_no}
                      id="enquiryTelephoneSuggest"
                      placeholder="Phone Number*"
                      autoComplete="off"
                      className="form-control enquiryTelephoneSuggest"
                      errorMessage={inlineErrorMsgs.Mobile_number}
                      validate={validations.mobile_number}
                    />
                  </div>

                  <AvField
                    type="text"
                    name="course"
                    id="suggestCourse"
                    placeholder="Course*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.CourseName}
                    validate={validations.course_name}
                  />

                  <FormGroup className="enquiryButtons text-right">
                    <Button color="primary" className="loginSubmit">Submit</Button>
                  </FormGroup>
                </AvForm>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendEnquiry: (payload, cb) => {
    dispatch(suggestCourseAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});
SuggestCoursePopup.defaultProps = {
  isOpen: false
}

SuggestCoursePopup.propTypes = {
  sendEnquiry: PropTypes.func.isRequired,
  handleSuggestClose: PropTypes.func.isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestCoursePopup);
