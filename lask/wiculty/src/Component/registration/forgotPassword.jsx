import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  ModalBody,
  FormGroup,
  Button,
  ModalHeader,
  Col,
  Row
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimesCircle,
  faEye,
  faEyeSlash
} from '@fortawesome/free-regular-svg-icons'
import { AvForm, AvField } from 'availity-reactstrap-validation'

/* component imports */
import messageFn from '../common/message'

import forgotPasswordOtpAction from './fpOtpAction'
import resetPasswordAction from './resetPasswordAction'
import getEnquiryOtpAction from '../common/contactPopup/enquiryOtp'
import resendOtpAction from './resendOtpAction'
import { validations, inlineErrorMsgs } from '../validations'
import { MESSAGES } from '../locales/locale'
import sf from '../common/safeTraverse'

const {
  ERROR: { GENERIC_ERR }, OTP_SENT,
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES
class ForotPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requetOtp: true,
      verifyOtp: false,
      resetPass: false,
      username: '',
      token: '',
      showPassword: false
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
    this.handleValidateOtp = this.handleValidateOtp.bind(this)
    this.handlePasswordReset = this.handlePasswordReset.bind(this)
    this.toggleMarketingForm = this.toggleMarketingForm.bind(this)
  }

  handleResendOtp = () => {
    const { username } = this.state

    const resendOtpValues = {
      username
    }

    const { resendOtp } = this.props
    resendOtp({ resendOtpValues }, (response) => {
      const { data, status } = response || {}
      const { message = GENERIC_ERR } = data
      if (data && status === 200) {
        messageFn(OTP_SENT, SUCCESS)
      } else if (data && status === 206) {
        messageFn(message, ERROR)
      } else {
        messageFn(GENERIC_ERR, ERROR)
      }
    })
  }

  handleValidSubmit (event, values) {
    const getOtpValues = {
      username: values.username,
      source: 'forgot_password'
    }
    this.setState({
      username: values.username
    })
    const { getOtp } = this.props
    getOtp({ getOtpValues }, (response) => {
      const { data, status } = response || {}
      const { message = GENERIC_ERR } = data

      if (status === 200) {
        messageFn(message, SUCCESS)
        this.setState(state => ({
          requetOtp: !state.requetOtp,
          verifyOtp: !state.verifyOtp
        }))
      } else if (status === 206) {
        messageFn(message, ERROR)
      } else {
        messageFn(GENERIC_ERR, ERROR)
      }
    })
  }

  handleValidateOtp (event, values) {
    const { username } = this.state

    const enquiryValues = {
      username,
      otp: values.enquiryOtp,
      source: 'forget_password'
    }

    const { verifyOtp } = this.props
    verifyOtp({ enquiryValues }, (response) => {
      const { data, status } = response || {}
      const { message = GENERIC_ERR } = data
      const token = sf(data, ['data', 'token']) || ''
      if (data && status === 200) {
        messageFn(message, SUCCESS)
        this.setState(state => ({
          resetPass: !state.resetPass,
          verifyOtp: !state.verifyOtp,
          token
        }))
      } else if (data && status === 206) {
        messageFn(message, ERROR)
      } else {
        messageFn(GENERIC_ERR, ERROR)
      }
    })
  }

  handlePasswordReset (event, values) {
    const { token } = this.state
    const { new_password, repeat_password } = values

    const enquiryValues = {
      token,
      new_password,
      repeat_password
    }

    const { resetPassword } = this.props
    resetPassword({ enquiryValues }, (response) => {
      const { data, status } = response || {}
      const { message = GENERIC_ERR } = data
      if (data && status === 200) {
        messageFn(message, SUCCESS)
        this.setState(state => ({
          resetPass: !state.resetPass
        }))
        this.handleClose()
      } else if (data && status === 206) {
        messageFn(message, ERROR)
      } else {
        messageFn(GENERIC_ERR, ERROR)
      }
    })
  }

  toggleMarketingForm () {
    this.setState(state => ({
      verifyOtp: !state.verifyOtp,
      requetOtp: !state.requetOtp
    }))
  }

  togglePassword () {
    this.setState(state => ({
      showPassword: !state.showPassword
    }))
  }

  handleClose () {
    const { handleForgetClose } = this.props
    handleForgetClose()
  }

  render () {
    const {
      requetOtp,
      verifyOtp,
      resetPass,
      isLoading,
      showPassword
    } = this.state
    return (
      <React.Fragment>
        {isLoading && <div className="loading" />}
        <ModalBody className="signUp">
          <Col lg="12">
            <Row>
              <p className="close-icon">
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  onClick={() => this.handleClose()}
                />
              </p>
              <ModalHeader>
                <Row className="modalHeader">
                  <Col lg="7">
                    <p className="modalLeft">FORGOT PASSWORD ?</p>
                  </Col>
                  <Col lg="5">
                    <p className="modalRight">No issues reset it here.</p>
                  </Col>
                </Row>
              </ModalHeader>
              <div className="form mauto">
                {requetOtp && (
                  <AvForm
                    id="forgotpassword-form"
                    onValidSubmit={(event, val) => this.handleValidSubmit(event, val)
                    }
                  >
                    <FormGroup>
                      <AvField
                        type="email"
                        name="username"
                        id="username"
                        placeholder="Email*"
                        autoComplete="off"
                        className="form-control"
                        errorMessage={inlineErrorMsgs.Email}
                        validate={validations.email}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Button type="submit" className="loginSubmit">
                        Submit
                      </Button>
                    </FormGroup>
                  </AvForm>
                )}
                {verifyOtp && (
                  <Row className="infoContainer enquiryOtpContainer">
                    <Col lg="12" className="infoIcon">
                      <AvForm
                        id="forgotpassword-otp"
                        onValidSubmit={(event, val) => this.handleValidateOtp(event, val)
                        }
                        ref={d => (this.form = d)}
                      >
                        <AvField
                          type="number"
                          name="enquiryOtp"
                          id="enquiryOtp"
                          placeholder="OTP"
                          autoComplete="off"
                          className="form-control"
                          errorMessage={inlineErrorMsgs.OTP}
                          validate={validations.OTP}
                        />
                        <Button color="primary col-sm-12">Verify OTP</Button>
                        <Row className="pt-2 mt-2 mt-md-0">
                          <Col lg="5" md="5" xs="5" className="otpLinks alignLeft">
                            <span
                              className="link"
                              role="button"
                              tabIndex={0}
                              onKeyPress={() => {}}
                              onClick={this.toggleMarketingForm}
                            >
                              Cancel
                            </span>
                          </Col>
                          <Col lg="7" md="7" xs="7" className="otpLinks alignRight p-0">
                            <span
                              className="link"
                              role="button"
                              tabIndex={0}
                              onKeyPress={() => {}}
                              onClick={this.handleResendOtp}
                            >
                              Resend OTP
                            </span>
                          </Col>
                        </Row>
                      </AvForm>
                    </Col>
                  </Row>
                )}
                {resetPass && (
                  <Row className="infoContainer enquiryOtpContainer">
                    <Col lg="12" className="infoIcon">
                      <AvForm
                        id="password-reset"
                        className="reset-password-container"
                        onValidSubmit={(event, val) => this.handlePasswordReset(event, val)
                        }
                        ref={d => (this.form = d)}
                      >
                        <AvField
                          type="password"
                          name="new_password"
                          id="newPassword"
                          placeholder="Password"
                          autoComplete="off"
                          className="form-control"
                          errorMessage={inlineErrorMsgs.Password}
                          validate={validations.password}
                        />
                        <AvField
                          type={showPassword ? 'text' : 'password'}
                          name="repeat_password"
                          id="repeatPassword"
                          placeholder="Confirm Password"
                          autoComplete="off"
                          className="form-control"
                          errorMessage={inlineErrorMsgs.Password}
                          validate={validations.reset_password}
                        />
                        <div
                          className="password-show-eye"
                          role="button"
                          tabIndex={0}
                          onKeyPress={() => {}}
                          onClick={() => this.togglePassword()}
                        >
                          {showPassword ? (
                            <FontAwesomeIcon
                              icon={faEye}
                              title="Hide password"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              title="Show password"
                            />
                          )}
                        </div>
                        <Button color="primary col-sm-12">
                          Reset Password
                        </Button>
                        <Row>
                          <Col lg="6" className="otpLinks alignLeft mt-4 mt-md-0">
                            <span
                              className="link"
                              role="button"
                              tabIndex={0}
                              onKeyPress={() => {}}
                              onClick={() => this.handleClose()}
                            >
                              Cancel
                            </span>
                          </Col>
                        </Row>
                      </AvForm>
                    </Col>
                  </Row>
                )}
              </div>
            </Row>
          </Col>
        </ModalBody>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getOtp: (payload, cb) => {
    dispatch(forgotPasswordOtpAction(payload, cb))
  },
  verifyOtp: (payload, cb) => {
    dispatch(getEnquiryOtpAction(payload, cb))
  },
  resetPassword: (payload, cb) => {
    dispatch(resetPasswordAction(payload, cb))
  },
  resendOtp: (payload, cb) => {
    dispatch(resendOtpAction(payload, cb))
  }
})

ForotPassword.propTypes = {
  handleForgetClose: PropTypes.func.isRequired,
  getOtp: PropTypes.func.isRequired,
  verifyOtp: PropTypes.func.isRequired,
  resendOtp: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(ForotPassword)
