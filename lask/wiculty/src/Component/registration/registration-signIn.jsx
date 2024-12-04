import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ModalBody, Button, ModalHeader,
  Col, Row, ModalFooter
} from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

/* component imports */
import messageFn from '../common/message'

/* componet actions */
import signinUserAction from '../../Actions/signinAction'
import profileAction from '../profile/profileAction'
import authService from '../../services/authService'
import getEnquiryOtpAction from '../common/contactPopup/enquiryOtp'
import resendOtpAction from './resendOtpAction'
import referalDetails from './referalAction'
import globalDataAction from '../../Actions/globalDataAction'
import userPrefAction from '../userPrefInfo/Get_UP_Action';
import sessionUpdateAction from '../session_handle/Actions/sessionUpdate';

import { validations, inlineErrorMsgs } from '../validations'
import SignInForm from './signInForm'
import { MESSAGES } from '../locales/locale'

const {
  ERROR: { GENERIC_ERR },
  VERIFY_OTP,
  LOGIN_SUCCESS,
  OTP_SENT,
  OTP_VERIFIED,
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES

class RegestrationSignInSection extends Component {
  constructor (props) {
    super(props)
    this.apiUrl = `${process.env.USER_API_END_POINT}/login`
    this.apiUrl1 = `${process.env.USER_API_END_POINT}/profile`
    this.getUser = this.getUser.bind(this)
    this.state = {
      showOtp: false,
      showLogin: true,
      username: '',
      isLoading: false,
      showRequestOtp: true,
      showVerifyOtp: false,
      showPassword: false,
      isSessionActive: false,
      sessionVals: {},
      device: 'Unknown'
    }
    this.handleValidateOtp = this.handleValidateOtp.bind(this)
    this.toggleMarketingForm = this.toggleMarketingForm.bind(this)
    this.handleResendOtp = this.handleResendOtp.bind(this)
    this.handleRequestOtp = this.handleRequestOtp.bind(this)
  }

  getUser (event, values) {
    const {
      signinUser
    } = this.props
    this.setState({
      username: values.username,
      isLoading: true,
      sessionVals: values
    })
    signinUser({ values }, (response) => {
      const { data = {}, status } = response || {};
      if (status === 200) {
        if (data.data && data.data.isSessionActive) {
          this.setState({
            isSessionActive: true,
            isLoading: false,
            device: data.data.deviceName
          })
        } else {
          this.handleLoginSuccess(data)
        }
      } else if (
        status === 206 &&
        data.message === 'Mobile number not verified!!'
      ) {
        messageFn(VERIFY_OTP, SUCCESS)
        this.setState(state => ({
          isLoading: false,
          showLogin: !state.showLogin,
          showOtp: !state.showOtp
        }))
      } else {
        const { message = GENERIC_ERR } = data || {}
        messageFn(message, ERROR)
        this.setState({
          isLoading: false
        })
      }
    })
  }

  handleLoginSuccess = (data = {}) => {
    const {
      handleClose,
      getProfileDetails,
      getRefferalDetails,
      fetchUserPref,
      history,
      setGlobalDetails
    } = this.props
    authService.signIn(data.data.token)
    setGlobalDetails({ 'privateRoutes': true }, () => {
      const { location: { pathname } } = history;
      history.push(pathname)
    })

    messageFn(LOGIN_SUCCESS, SUCCESS)
    this.setState({
      isLoading: false
    })
    handleClose()
    getProfileDetails({}, () => {})
    getRefferalDetails({}, () => {})
    fetchUserPref({}, () => {})
  }

  UpdateSession = () => {
    const { sessionVals } = this.state;
    const { sessionUpdate } = this.props;
    sessionUpdate({ sessionVals }, (response = {}) => {
      const { data = {}, status } = response;
      if (status === 200) {
        this.handleLoginSuccess(data)
      } else {
        const { message = GENERIC_ERR } = data || {}
        messageFn(message, ERROR)
        this.setState({
          isLoading: false
        })
      }
    })
  }

  togglePassword = () => {
    this.setState(state => ({
      showPassword: !state.showPassword
    }))
  }

  handleClose = () => {
    const { handleClose } = this.props
    handleClose()
  }

  toggleMarketingForm () {
    this.setState(state => ({
      showLogin: !state.showLogin,
      showOtp: !state.showOtp
    }))
  }

  handleValidateOtp (event, values) {
    const { username } = this.state

    const enquiryValues = {
      username,
      otp: values.enquiryOtp,
      source: 'on_register'
    }

    const { verifyOtp } = this.props
    verifyOtp({ enquiryValues }, (response) => {
      const { data, status } = response || {}
      if (data && status === 200) {
        messageFn(OTP_VERIFIED, SUCCESS)
        this.setState(state => ({
          showLogin: !state.showLogin,
          showOtp: !state.showOtp
        }))
      } else {
        const { message = GENERIC_ERR } = data || {}
        messageFn(message, ERROR)
      }
    })
  }

  handleResendOtp () {
    const { username } = this.state

    const resendOtpValues = {
      username
    }

    const { resendOtp } = this.props
    resendOtp({ resendOtpValues }, (response) => {
      const { data = {}, status } = response || {}
      if (data && status === 200) {
        messageFn(OTP_SENT, SUCCESS)
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  handleRequestOtp () {
    const { username } = this.state
    const resendOtpValues = {
      username
    }

    const { resendOtp } = this.props
    resendOtp({ resendOtpValues }, (response = {}) => {
      const { data = {}, status } = response;
      if (data && status === 200) {
        messageFn(OTP_SENT, SUCCESS)
        this.setState({
          showRequestOtp: false,
          showVerifyOtp: true
        })
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  render () {
    const {
      isLoading,
      showLogin,
      showOtp,
      showRequestOtp,
      showVerifyOtp,
      showPassword,
      isSessionActive,
      device
    } = this.state
    const { callSignUp, forgotPassword, autoFillData } = this.props
    return (
      <React.Fragment>
        {isLoading && <div className="loading" />}
        {!isSessionActive ? (
          <ModalBody className="signIn">
            <Col lg="12">
              <Row>
                <div
                  className="close-icon"
                  role="button"
                  tabIndex={0}
                  onKeyPress={() => {}}
                  onClick={this.handleClose}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </div>
                <ModalHeader>
                  <Row className="modalHeader">
                    <Col lg="6">
                      <p className="modalLeft">LOGIN TO WICULTY</p>
                    </Col>
                    <Col lg="6">
                      <p className="modalRight">
                        {'Break open a career path through effcetive learning'}
                      </p>
                    </Col>
                  </Row>
                </ModalHeader>
                {showLogin && (
                  <SignInForm
                    getUser={this.getUser}
                    togglePassword={this.togglePassword}
                    forgotPassword={forgotPassword}
                    callSignUp={callSignUp}
                    showPassword={showPassword}
                    autoFillData={autoFillData}
                  />
                )}
                {showOtp && (
                  <Row className="infoContainer enquiryOtpContainer">
                    <Col lg="12" className="infoIcon loginOtpForm">
                      <AvForm
                        id="signin-otp"
                        onValidSubmit={this.handleValidateOtp}
                        ref={d => (this.form = d)}
                      >
                        {showRequestOtp && (
                          <div isOpen={showRequestOtp}>
                            <p>
                            Mobile number not verified!!. Request an OTP
                            </p>
                            <Button
                              color="primary col-sm-12"
                              onClick={this.handleRequestOtp}
                            >
                            Request OTP
                            </Button>
                          </div>
                        )}
                        {showVerifyOtp && (
                          <div>
                            <p>Enter the OTP to verify</p>
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
                            <Row>
                              <Col lg="6" xs="6" className="otpLinks alignLeft">
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
                              <Col lg="6" xs="6" className="otpLinks alignRight">
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
                          </div>
                        )}
                      </AvForm>
                    </Col>
                  </Row>
                )}
              </Row>
            </Col>
          </ModalBody>
        )
          : (
            <>
              <ModalHeader className="modal-hd-color" toggle={() => this.handleClose()}>
                  Already a session!
              </ModalHeader>
              <ModalBody className="text-white">
                {`You have already an opened session on '${device}' device.
                If you login here, it will close existing session.`}
                <br />
                Still want to open new session, click on Confirm.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.UpdateSession}>Confirm</Button>
                <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
              </ModalFooter>
            </>
          )}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signinUser: (payload, cb) => {
    dispatch(signinUserAction(payload, cb))
  },
  sessionUpdate: (payload, cb) => {
    dispatch(sessionUpdateAction(payload, cb))
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb))
  },
  setGlobalDetails: (payload, cb) => {
    dispatch(globalDataAction(payload, cb))
  },
  verifyOtp: (payload, cb) => {
    dispatch(getEnquiryOtpAction(payload, cb))
  },
  resendOtp: (payload, cb) => {
    dispatch(resendOtpAction(payload, cb))
  },
  getRefferalDetails: (payload, cb) => {
    dispatch(referalDetails(payload, cb))
  },
  fetchUserPref: (payload, cb) => {
    dispatch(userPrefAction(payload, cb));
  }
})
const mapStateToProps = state => ({
  signinDetails: state.signinDetails
})

RegestrationSignInSection.propTypes = {
  signinUser: PropTypes.func.isRequired,
  callSignUp: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  verifyOtp: PropTypes.func.isRequired,
  resendOtp: PropTypes.func.isRequired,
  getRefferalDetails: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  setGlobalDetails: PropTypes.func.isRequired,
  fetchUserPref: PropTypes.func.isRequired,
  sessionUpdate: PropTypes.func.isRequired,
  autoFillData: PropTypes.func.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegestrationSignInSection))
