import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import {
  ModalBody, ModalHeader, Col, Row
} from 'reactstrap'

import SignUpForm from './signUpForm'

/* componet actions */
import signinUserAction from '../../Actions/signinAction'
import signupUserAction from '../../Actions/signupAction'
import profileAction from '../profile/profileAction';
import referalDetails from './referalAction'
import globalDataAction from '../../Actions/globalDataAction'
import userPrefAction from '../userPrefInfo/Get_UP_Action';
import authService from '../../services/authService'

import getEnquiryOtpAction from '../common/contactPopup/enquiryOtp'
import messageFn from '../common/message'
import resendOtpAction from './resendOtpAction'
import SignUpOTPForm from './signUpOTPForm';
import { MESSAGES } from '../locales/locale';

const {
  ERROR: { GENERIC_ERR }, OTP_SENT, SINGUP_SUCCESS, VERIFY_OTP,
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class RegestrationSignUpSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showOtp: false,
      showRegister: true,
      username: '',
      password: '',
      showPassword: false,
      isLoading: false,
      mobile_code: '91'
    }
    this.RegisterUser = this.RegisterUser.bind(this)
    this.handleValidateOtp = this.handleValidateOtp.bind(this)
    this.toggleMarketingForm = this.toggleMarketingForm.bind(this)
    this.handleResendOtp = this.handleResendOtp.bind(this)
  }

  toggle = () => {
    this.setState(state => ({ showRegister: !state.showRegister }))
  }

  toggleOtp = () => {
    this.setState(state => ({ showOtp: !state.showOtp }))
  }

  handleCountryChange = (countryLang) => {
    this.setState({ mobile_code: countryLang.phone_code })
  }

  togglePassword = () => {
    this.setState(state => ({
      showPassword: !state.showPassword
    }))
  }

  handleClose = () => {
    const { handleClose } = this.props
    handleClose();
  }

  handleLoginSuccess = (data = {}) => {
    const {
      handleClose,
      getProfileDetails,
      getRefferalDetails,
      fetchUserPref,
      setGlobalDetails
    } = this.props
    authService.signIn(data.data.token)
    setGlobalDetails({ 'privateRoutes': true }, () => {})

    messageFn(SINGUP_SUCCESS, SUCCESS)
    this.setState(state => ({
      isLoading: false,
      showOtp: !state.showOtp
    }))
    handleClose()
    getProfileDetails({}, () => {})
    getRefferalDetails({}, () => {})
    fetchUserPref({}, () => {})
  }

  handleSignIn () {
    const { signinUser } = this.props
    const { username, password } = this.state;
    const values = {
      username,
      password
    }
    signinUser({ values }, (response) => {
      const { data = {}, status } = response || {};
      if (status === 200) {
        this.handleLoginSuccess(data)
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

  RegisterUser (event, values) {
    const { signupUser } = this.props;
    const { mobile_code } = this.state;
    this.setState({
      username: values.email,
      password: values.password,
      isLoading: true
    })
    signupUser({ ...values, mobile_code: `+${mobile_code}` }, (response = {}) => {
      const { data = {}, status } = response;
      if (status === 200) {
        messageFn(OTP_SENT, SUCCESS)
        this.setState(state => ({
          showRegister: !state.showRegister,
          showOtp: !state.showOtp,
          isLoading: false
        }))
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
        this.setState({
          isLoading: false
        })
      }
    })
  }

  handleValidateOtp (event, values) {
    const { username } = this.state

    const enquiryValues = {
      username,
      otp: values.enquiryOtp,
      source: 'on_register'
    }

    const { verifyOtp } = this.props
    verifyOtp({ enquiryValues }, (response = {}) => {
      const { status, data = {} } = response;
      if (status === 200) {
        this.handleSignIn()
      } else {
        const { message = GENERIC_ERR } = data;
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
    resendOtp({ resendOtpValues }, (response = {}) => {
      const { data = {}, status } = response;
      if (data && status === 200) {
        messageFn(OTP_SENT, SUCCESS)
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  toggleMarketingForm () {
    this.setState(state => ({
      showRegister: !state.showRegister,
      showOtp: !state.showOtp
    }))
  }

  render () {
    const {
      isLoading,
      showRegister,
      showOtp,
      showPassword
    } = this.state
    const { callSignIn, refferalCode, autoFillData } = this.props

    return (
      <React.Fragment>
        {isLoading && <div className="loading" />}
        <ModalBody className="signUp">
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
                    <p className="modalLeft">Sign up with wiculty</p>
                  </Col>
                  <Col lg="6">
                    <p className="modalRight">
                      {
                        'flame up  your career charm juice up your learning engine'
                      }
                    </p>
                  </Col>
                </Row>
              </ModalHeader>
              {showRegister && (
                <SignUpForm
                  refferalCode={refferalCode}
                  showPassword={showPassword}
                  RegisterUser={this.RegisterUser}
                  handleCountryChange={this.handleCountryChange}
                  togglePassword={this.togglePassword}
                  callSignIn={callSignIn}
                  autoFillData={autoFillData}
                />
              )}
              {showOtp && (
                <SignUpOTPForm
                  handleValidateOtp={this.handleValidateOtp}
                  toggleMarketingForm={this.toggleMarketingForm}
                  handleResendOtp={this.handleResendOtp}
                />
              )}
            </Row>
          </Col>
        </ModalBody>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signinUser: (payload, cb) => {
    dispatch(signinUserAction(payload, cb))
  },
  getRefferalDetails: (payload, cb) => {
    dispatch(referalDetails(payload, cb))
  },
  fetchUserPref: (payload, cb) => {
    dispatch(userPrefAction(payload, cb));
  },
  setGlobalDetails: (payload, cb) => {
    dispatch(globalDataAction(payload, cb))
  },
  signupUser: (payload, cb) => {
    dispatch(signupUserAction(payload, cb))
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb))
  },
  verifyOtp: (payload, cb) => {
    dispatch(getEnquiryOtpAction(payload, cb))
  },
  resendOtp: (payload, cb) => {
    dispatch(resendOtpAction(payload, cb))
  }
})
const mapStateToProps = state => ({
  signupDetails: state.signupDetails,
  globalDetails: state.globalDetails
})

RegestrationSignUpSection.propTypes = {
  signupUser: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  verifyOtp: PropTypes.func.isRequired,
  resendOtp: PropTypes.func.isRequired,
  callSignIn: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  refferalCode: PropTypes.string.isRequired,
  getRefferalDetails: PropTypes.func.isRequired,
  setGlobalDetails: PropTypes.func.isRequired,
  fetchUserPref: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  autoFillData: PropTypes.shape({}).isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegestrationSignUpSection)
