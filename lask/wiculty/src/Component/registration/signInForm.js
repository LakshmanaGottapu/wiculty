import React from 'react'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import PropTypes from 'prop-types'
import { FormGroup, Button, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { validations, inlineErrorMsgs } from '../validations'

const SignInForm = ({
  showPassword,
  forgotPassword,
  togglePassword,
  callSignUp,
  getUser,
  autoFillData = {}
}) => {
  const { email } = autoFillData;
  return (
    <React.Fragment>
      <AvForm
        id="signin-form"
        onValidSubmit={getUser}
        className="sigInForm form"
      >
        <FormGroup>
          <AvField
            type="email"
            name="username"
            id="username"
            placeholder="Email*"
            autoComplete="email"
            value={email}
            className="form-control"
            errorMessage={inlineErrorMsgs.Email}
            validate={validations.email}
          />
        </FormGroup>
        <FormGroup className="password-container">
          <AvField
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="Password*"
            autoComplete="current-password"
            className="form-control"
            errorMessage={inlineErrorMsgs.Password}
            validate={validations.password}
          />
          <div className="password-show-eye" role="button" tabIndex={0} onKeyPress={() => { }} onClick={togglePassword}>
            {showPassword ? <FontAwesomeIcon icon={faEye} title="Hide password" />
              : <FontAwesomeIcon icon={faEyeSlash} title="Show password" />}
          </div>
        </FormGroup>
        <FormGroup>
          <Button type="submit" className="loginSubmit">Login</Button>
        </FormGroup>
        <Row>
        <a href="javascript:void(0);" onClick={forgotPassword} className="forgotPassword"> {/* eslint-disable-line */}
            {'Forgot Password ?'} {/* eslint-disable-line */}
        </a> {/* eslint-disable-line */}
        </Row>
        <Row>
          <p className="termsRedirect">
            {'By signing up, you agree to our'}
            <a href="terms-conditions" className="internalPolicy">
              {' Terms of Use '}
            </a>
            {'and'}
            <a href="privacy-policy" className="internalPolicy">
              {' Privacy Policy. '}
            </a>
          </p>
        </Row>
        <Row>
          <p className="termsRedirect">
            {'Don`t have Wiculty account ?'}
            <span className="signUpredirect" role="button" tabIndex={0} onKeyPress={() => { }} onClick={() => callSignUp()}>
              {'Sign Up'}
            </span>
          </p>
        </Row>
      </AvForm>
    </React.Fragment>
  )
}
SignInForm.propTypes = {
  getUser: PropTypes.func.isRequired,
  togglePassword: PropTypes.func.isRequired,
  callSignUp: PropTypes.func.isRequired,
  showPassword: PropTypes.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  autoFillData: PropTypes.func.isRequired
}

export default SignInForm
