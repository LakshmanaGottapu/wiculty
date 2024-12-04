import React from 'react'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import PropTypes from 'prop-types'
import { FormGroup, Button, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { validations, inlineErrorMsgs } from '../validations'
import CountryDropDown from '../country_dropdown/country_dropdown'

const SignUpForm = ({
  RegisterUser,
  showPassword,
  refferalCode,
  handleCountryChange,
  togglePassword,
  callSignIn,
  autoFillData = {}
}) => {
  const { name } = validations;
  const { contact_no, email } = autoFillData;
  return (
    <div className="form">
      <AvForm id="signup-form" onValidSubmit={RegisterUser}>
        <div className="d-inline-flex">
          <FormGroup>
            <AvField
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First Name*"
              autoComplete="given-name"
              className="form-control"
              errorMessage={inlineErrorMsgs.Name}
              validate={{
                ...name,
                required: { ...name.required, value: true }
              }}
            />
          </FormGroup>
          <FormGroup>
            <AvField
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Last Name"
              autoComplete="family-name"
              className="form-control"
              errorMessage={inlineErrorMsgs.Name}
              validate={{
                ...name,
                minLength: { ...name.minLength, value: 1 }
              }}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <AvField
            type="email"
            name="email"
            id="email"
            placeholder="Email Id*"
            value={email}
            autoComplete="email"
            className="form-control"
            errorMessage={inlineErrorMsgs.Email}
            validate={validations.email}
          />
        </FormGroup>
        <div className="d-inline-flex fullWidth">
          <CountryDropDown onSelectCountry={handleCountryChange} />
          <AvField
            type="number"
            name="contact_no"
            id="contact_no"
            placeholder="Contact no*"
            value={contact_no}
            autoComplete="tel-national"
            className="form-control"
            errorMessage={inlineErrorMsgs.Mobile_number}
            validate={validations.mobile_number}
          />
        </div>
        <FormGroup>
          <AvField
            type="text"
            name="referral_code"
            id="referral_code"
            placeholder="Referral Code"
            autoComplete="off"
            className="form-control"
            validate={validations.no_special}
            value={refferalCode}
          />
        </FormGroup>
        <FormGroup className="password-container">
          <AvField
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="Password*"
            autoComplete="new-password"
            className="form-control"
            errorMessage={inlineErrorMsgs.Password}
            validate={validations.password}
          />
          <div
            className="password-show-eye"
            role="button"
            tabIndex={0}
            onKeyPress={() => {}}
            onClick={togglePassword}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} title="Hide password" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} title="Show password" />
            )}
          </div>
        </FormGroup>
        <Row>
          <p className="termsRedirect">
            {'By signing up, you agree to our'}
            <a href="terms-conditions" className="internalPolicy">
              {' Terms of Use '}
            </a>
            {'and'}
            <a href="privacy-policy" className="internalPolicy">
              {' '}
              {' Privacy Policy. '}
            </a>
          </p>
        </Row>
        <FormGroup>
          <Button type="submit" className="loginSubmit">
            Submit
          </Button>
        </FormGroup>
        <Row>
          <p className="termsRedirect">
            {'Already have Wiculty account ?'}
            <span
              className="signUpredirect"
              onClick={callSignIn}
              role="button"
              tabIndex={0}
              onKeyPress={() => {}}
            >
              {' '}
              Log In
            </span>
          </p>
        </Row>
      </AvForm>
    </div>
  )
}
SignUpForm.propTypes = {
  RegisterUser: PropTypes.func.isRequired,
  handleCountryChange: PropTypes.func.isRequired,
  togglePassword: PropTypes.func.isRequired,
  callSignIn: PropTypes.func.isRequired,
  showPassword: PropTypes.isRequired,
  refferalCode: PropTypes.isRequired,
  autoFillData: PropTypes.shape({}).isRequired
}

export default SignUpForm
