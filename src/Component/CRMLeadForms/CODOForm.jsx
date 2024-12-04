import React, { useRef } from 'react';
import {
  FormGroup, Col, Row, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CountryDropDown from '../country_dropdown/country_dropdown';
// Actions
import CRMleadCaptureAction from '../../Actions/CRMleadcaptureAction';
// utils
import { getCountryVals, getAutoFillDetails } from '../common/utilFunctions/utilFunction';
import handleDataLayer from '../common/utilFunctions/seoUtil';

import { validations, inlineErrorMsgs } from '../validations';
import messageFn from '../common/message'
import { MESSAGES } from '../locales/locale';
import './CRMLead.scss';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

const CODOForm = ({
  sendEnquiry, UserPrefInfo, profileDetails, unique_title
}) => {
  const formEl = useRef(null);
  const { Name, email, contact_no } = getAutoFillDetails(profileDetails);
  const handleCODOSubmit = (event, values) => {
    const { phone_code } = getCountryVals(UserPrefInfo);
    const leadInfo = {
      name: Name || 'User',
      email: values.email,
      contact_no: values.contact_no,
      mobile_code: phone_code,
      course_interested: unique_title,
      source: 'CODO'
    }

    handleDataLayer({
      userProject: 'Wiculty',
      page: 'course details page',
      url: window.location.href,
      course: unique_title,
      source: 'CODO'
    })

    sendEnquiry({ leadInfo }, (response) => {
      const { data = {}, status } = response || {};
      if (data && status === 200) {
        formEl.current.reset()
        const { data: { message = '' } } = data
        messageFn(message, SUCCESS);
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }
  const handleCountryChange = () => {};
  return (
    <div id="CODOForm">
      <Row>
        <Col className="CODOSection_overview mt-4 rounded bg-white">
          <div>
            <h2>
              Hope our Extensive Industry-Woven curriculum tied you with curiosity?
            </h2>
            <p>
              Talk to our Course Expert to get better insights now!
            </p>
          </div>
          <AvForm className="d-sm-flex fullWidth" id="CODO-form" onValidSubmit={handleCODOSubmit} ref={formEl}>
            <div className="fullWidth mr-4">
              <AvField
                type="email"
                name="email"
                value={email}
                id="suggestEmail"
                placeholder="Email*"
                autoComplete="email"
                className="form-control bg-light"
                errorMessage={inlineErrorMsgs.Email}
                validate={validations.email}
              />
            </div>
            <div className="d-inline-flex fullWidth">
              <CountryDropDown name="country_code" onSelectCountry={handleCountryChange} />
              <AvField
                type="text"
                name="contact_no"
                value={contact_no}
                id="enquiryTelephoneSuggest"
                placeholder="Phone Number*"
                autoComplete="tel-national"
                className="form-control enquiryTelephoneSuggest bg-light"
                errorMessage={inlineErrorMsgs.Mobile_number}
                validate={validations.mobile_number}
              />
            </div>

            <FormGroup className="ml-sm-4 text-center text-sm-left">
              <Button color="btn btn-theme btn-md CODO-btn">Enroll Now</Button>
            </FormGroup>
          </AvForm>
        </Col>
      </Row>

    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  sendEnquiry: (payload, cb) => {
    dispatch(CRMleadCaptureAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo,
  profileDetails: state.profileDetails
});

CODOForm.propTypes = {
  sendEnquiry: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  unique_title: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CODOForm);
