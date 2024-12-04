import React from 'react';
import PropTypes from 'prop-types'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Row, Col } from 'reactstrap';
import { validations, inlineErrorMsgs } from '../validations';

const SignUpOTP = ({ handleValidateOtp, toggleMarketingForm, handleResendOtp }) => (
  <Row className="infoContainer enquiryOtpContainer">
    <Col lg="12" className="infoIcon d-flex justify-content-center">
      <AvForm
        id="signup-otp"
        onValidSubmit={handleValidateOtp}
      >
        <AvField
          type="text"
          name="enquiryOtp"
          id="enquiryOtp"
          placeholder="OTP"
          autoComplete="one-time-code"
          className="form-control"
          errorMessage={inlineErrorMsgs.OTP}
          validate={validations.OTP}
        />
        <Button color="primary col-sm-12">Verify OTP</Button>
        <Row className="pt-2">
          <Col lg="5" md="5" xs="5" className="otpLinks alignLeft">
            <span
              className="link"
              role="button"
              tabIndex={0}
              onKeyPress={() => { }}
              onClick={toggleMarketingForm}
            >
              Cancel
            </span>
          </Col>
          <Col lg="7" md="7" xs="7" className="otpLinks alignRight p-0">
            <span
              className="link"
              role="button"
              tabIndex={0}
              onKeyPress={() => { }}
              onClick={handleResendOtp}
            >
              Resend OTP
            </span>
          </Col>
        </Row>
      </AvForm>
    </Col>
  </Row>

)

SignUpOTP.propTypes = {
  handleValidateOtp: PropTypes.func.isRequired,
  toggleMarketingForm: PropTypes.func.isRequired,
  handleResendOtp: PropTypes.func.isRequired
}
export default SignUpOTP;
