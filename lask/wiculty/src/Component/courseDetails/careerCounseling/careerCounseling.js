import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { FormGroup, Button } from 'reactstrap';

import { validations, inlineErrorMsgs } from '../../validations';
import CountryDropDown from '../../country_dropdown/country_dropdown';
import sendEnquiryAction from '../../common/contactPopup/contactpopupAction';
import { getAutoFillDetails, getCountryVals } from '../../common/utilFunctions/utilFunction';

import messageFn from '../../common/message';
import { MESSAGES } from '../../locales/locale';
import './careerCounselling.scss';

const {
  ERROR: { GENERIC_ERR }, GET_BACK_SOON,
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

function CareerCounseling ({ UserPrefInfo, profileDetails, sendEnquiry }) {
  const formRef = useRef(null);

  function handleValidSubmit (values) {
    const { phone_code } = getCountryVals(UserPrefInfo)
    const enquiryValues = {
      name: values.name,
      email: values.email,
      contact_no: values.mobile,
      mobile_code: phone_code,
      message: values.message,
      source: 'career-counselling-form'
    }
    sendEnquiry({ enquiryValues }, (response = {}) => {
      const { data, status } = response;
      if (data && status === 200) {
        formRef && formRef.current && formRef.current.reset();
        messageFn(GET_BACK_SOON, SUCCESS)
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  function handleCountryChange (countryLang) { }

  const { Name, email, contact_no } = getAutoFillDetails(profileDetails);

  return (
    <div className="career-counselling mt-4 mt-lg-0">
      <div className="card">
        <div className="card-header">
          <h3>
            Free Career Counselling
          </h3>
        </div>
        <div className="card-body">
          <AvForm id="career-counseling" ref={formRef} onValidSubmit={(e, data) => handleValidSubmit(data)}>
            <FormGroup className="side-fileds">
              <AvField
                type="text"
                name="name"
                id="name"
                value={Name}
                placeholder="Name"
                autoComplete="off"
                className="form-control"
                errorMessage="Please enter Name"
                validate={validations.name}
              />
            </FormGroup>
            <FormGroup className="side-fileds">
              <AvField
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email ID*"
                autoComplete="off"
                className="form-control"
                errorMessage={inlineErrorMsgs.Email}
                validate={validations.email}
              />
            </FormGroup>
            <div className="d-flex country-code">
              <FormGroup className="country-code-required">
                <CountryDropDown onSelectCountry={handleCountryChange} />
              </FormGroup>
              <FormGroup className="mobile-input">
                <AvField
                  type="number"
                  name="mobile"
                  id="mobile"
                  value={contact_no}
                  placeholder="Mobile number*"
                  autoComplete="off"
                  className="form-control"
                  errorMessage={inlineErrorMsgs.Mobile_number}
                  validate={validations.mobile_number}
                />
              </FormGroup>
            </div>
            <FormGroup className="side-fileds">
              <AvField
                type="textarea"
                name="message"
                id="message"
                rows="4"
                placeholder="Describe your Training Needs"
                autoComplete="off"
                className="form-control"
              />
            </FormGroup>

            <div>
              <FormGroup className="register-button text-right">
                <Button
                  type="submit"
                  className="btn btn-theme-bordered"
                >
                  {'Submit'}
                </Button>
              </FormGroup>
            </div>
          </AvForm>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  sendEnquiry: (payload, cb) => {
    dispatch(sendEnquiryAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});

CareerCounseling.propTypes = {
  sendEnquiry: PropTypes.func.isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerCounseling);
