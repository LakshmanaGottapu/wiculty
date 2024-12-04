import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimesCircle,
  faEye,
  faEyeSlash
} from '@fortawesome/free-regular-svg-icons'
import { AvForm, AvField } from 'availity-reactstrap-validation'

/* componet imports */
import messageFn from './message'
import authService from '../../services/authService'

/* action imports */
import changePasswordAction from '../../Actions/changePasswordAction'
import { validations, inlineErrorMsgs } from '../validations'
import { MESSAGES } from '../locales/locale'

const {
  ERROR: { GENERIC_ERR }, CHANGE_PASS_SUCCES,
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES

class ChangePassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPassword: false,
      isLoading: false
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  handleValidSubmit (event, values) {
    const { old_password, new_password, repeat_password } = values
    const getOtpValues = {
      old_password,
      new_password,
      repeat_password
    }
    const { changePassword, handleClose } = this.props
    this.setState({
      isLoading: true
    })
    changePassword({ getOtpValues }, (response = {}) => {
      const { data = {}, status } = response
      if (data && status === 200) {
        const { data: { token = '' } } = data
        authService.signIn(token)
        messageFn(CHANGE_PASS_SUCCES, SUCCESS)
        this.setState({
          isLoading: false
        })
        handleClose()
      } else {
        const { message = GENERIC_ERR } = data
        messageFn(message, ERROR)
        this.setState({
          isLoading: false
        })
      }
    })
  }

  togglePassword () {
    this.setState(state => ({
      showPassword: !state.showPassword
    }))
  }

  handleClose () {
    const { handleClose } = this.props
    handleClose()
  }

  render () {
    const {
      isLoading, showPassword
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
                  <Col lg="12">
                    <p className="modalLeft">Change Password </p>
                  </Col>
                  <Col lg="12">
                    <p className="modalRight">Set your new password</p>
                  </Col>
                </Row>
              </ModalHeader>
              <div className="form">
                <AvForm
                  id="contact-form"
                  onValidSubmit={this.handleValidSubmit}
                >
                  <FormGroup>
                    <AvField
                      type="password"
                      name="old_password"
                      id="old_password"
                      placeholder="Old Password*"
                      autoComplete="current-password"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Password}
                      validate={validations.password}
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      type="password"
                      name="new_password"
                      id="new_password"
                      placeholder="New Password*"
                      autoComplete="new-password"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Password}
                      validate={validations.password}
                    />
                  </FormGroup>
                  <FormGroup className="change-password-container">
                    <AvField
                      type={showPassword ? 'text' : 'password'}
                      name="repeat_password"
                      id="repeat_password"
                      placeholder="Confirm Password*"
                      autoComplete="new-password"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Password}
                      validate={validations.reset_password}
                    />
                    <div
                      className="password-show-eye"
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => { }}
                      onClick={() => this.togglePassword()}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEye} title="Hide password" />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          title="Show password"
                        />
                      )}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" className="loginSubmit">
                      Change Password
                    </Button>
                  </FormGroup>
                </AvForm>
              </div>
            </Row>
          </Col>
        </ModalBody>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changePassword: (payload, cb) => {
    dispatch(changePasswordAction(payload, cb))
  }
})

ChangePassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(ChangePassword)
