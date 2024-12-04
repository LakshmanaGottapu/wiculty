import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { FormGroup, Button } from 'reactstrap';
import instructorAction from './b2bAction';
import CountryDropDown from '../country_dropdown/country_dropdown';
import { validations, inlineErrorMsgs } from '../validations';
import { MESSAGES } from '../locales/locale';
import messageFn from '../common/message';
import sf from '../common/safeTraverse';
import { getCountryVals } from '../common/utilFunctions/utilFunction'

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

function B2BForm ({ updateInstructorDetails, UserPrefInfo }) {
  const [B2BInfo, setB2BInfo] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const formEl = useRef(null);

  function RegisterInstructor (event, values) {
    setB2BInfo({
      ...values,
      'source': 'b2b'
    });
    setisLoading(true);
  }

  useEffect(() => {
    if (Object.keys(B2BInfo).length > 0) {
      const { phone_code } = getCountryVals(UserPrefInfo);
      updateInstructorDetails({ ...B2BInfo, 'mobile_code': phone_code }, (resp = {}) => {
        const { data = {}, status } = resp;
        if (data && status === 200) {
          formEl.current.reset()
          const msg = sf(data, ['data', 'message'])
          messageFn(msg, SUCCESS)
          setisLoading(false);
        } else {
          const { message = GENERIC_ERR } = data;
          messageFn(message, ERROR)
          setisLoading(false);
        }
      })
    }
  }, [B2BInfo]);

  function handleCountryChange (countryLang) {}

  return (
    <div className="b2b-form bg-wicultythemeColor">
      {isLoading && <div className="loading" />}
      <h6 className="ftb ft20">Join our Corporate training pool Now</h6>
      <p>Feed in to Lead in !!</p>
      <AvForm id="b2b-form" onValidSubmit={(event, val) => RegisterInstructor(event, val)} ref={formEl}>
        <FormGroup className=" side-fileds">
          <AvField
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            autoComplete="off"
            className="form-control"
            maxLength="20"
            errorMessage={inlineErrorMsgs.Name}
            validate={validations.name}
          />
        </FormGroup>
        <FormGroup className=" side-fileds">
          <AvField
            type="email"
            name="email"
            id="email"
            placeholder="Email ID*"
            autoComplete="off"
            className="form-control"
            errorMessage={inlineErrorMsgs.Email}
            validate={validations.email}
          />
        </FormGroup>
        <div className="d-inline-flex country-code">
          <FormGroup className="country-code-required">
            <CountryDropDown onSelectCountry={countryObj => handleCountryChange(countryObj)} />
          </FormGroup>
          <FormGroup className="mobile-input">
            <AvField
              type="text"
              name="contact_no"
              id="contact_no"
              placeholder="Mobile number*"
              autoComplete="off"
              className="form-control"
              errorMessage={inlineErrorMsgs.Mobile_number}
              validate={validations.mobile_number}
            />
          </FormGroup>
        </div>
        <FormGroup className=" side-fileds">
          <AvField
            type="text"
            name="Company_Name"
            id="Company_Name"
            placeholder="Company Name"
            autoComplete="off"
            className="form-control"
            errorMessage={inlineErrorMsgs.Company_name}
            validate={validations.company}
          />
        </FormGroup>
        <FormGroup className="side-fileds">
          <AvField
            type="textarea"
            name="query"
            id="query"
            placeholder="Query..."
            autoComplete="off"
            className="form-control"
            validate={validations.user_comments}
          />
        </FormGroup>
        <div>
          <FormGroup className="register-button">
            <Button type="submit" style={{ color: '#000', background: '#fff', width: 110 }}>Submit</Button>
          </FormGroup>
        </div>
      </AvForm>
    </div>
  )
}
export const mapDispatchToProps = dispatch => ({
  updateInstructorDetails: (payload, cb) => {
    dispatch(instructorAction(payload, cb));
  }
});
export const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo
});
B2BForm.propTypes = {
  updateInstructorDetails: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(B2BForm);
