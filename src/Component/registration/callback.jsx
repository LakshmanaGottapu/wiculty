import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CountryDropDown from '../country_dropdown/country_dropdown';

import requestCallbackAction from './requestCallback';
import messageFn from '../common/message';
import { validations, inlineErrorMsgs } from '../validations'
import { getAutoFillDetails } from '../common/utilFunctions/utilFunction';

import { MESSAGES } from '../locales/locale';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES

class Callback extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      country: '91'
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleCountryChange = (countryLang) => {
    this.setState({ country: countryLang.phone_code });
  }

  handleValidSubmit (event, values) {
    const { country } = this.state;
    this.setState({
      name: values.name
    });
    const getOtpValues = {
      name: values.name,
      contact_no: `+${country}${values.contactNo}`
    }
    const { signupUser } = this.props;
    signupUser({ getOtpValues }, (response) => {
      const { data, status } = response || {};
      if (data && status === 200) {
        const { handleClose } = this.props;
        messageFn(data.data, SUCCESS);
        handleClose()
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  render () {
    const {
      isLoading
    } = this.state;
    const { handleClose, profileDetails } = this.props
    const { name } = validations;
    const { Name, contact_no } = getAutoFillDetails(profileDetails);
    return (
      <React.Fragment>
        {isLoading && <div className="loading" />}
        <ModalBody className="signUp">
          <Col lg="12">
            <Row>
              <p className="close-icon">
                <FontAwesomeIcon icon={faTimesCircle} onClick={() => handleClose()} />
              </p>
              <ModalHeader>
                <Row className="modalHeader">
                  <Col lg="12">
                    <p className="modalLeft">Request a Call back</p>
                  </Col>
                  <Col lg="12">
                    <p className="modalRight">Our course advisor will reach you shortly through phone call</p>
                  </Col>
                </Row>
              </ModalHeader>
              <div className="form">
                <AvForm id="callback-form" onValidSubmit={this.handleValidSubmit}>
                  <FormGroup>
                    <AvField
                      type="text"
                      name="name"
                      value={Name}
                      id="name"
                      placeholder="Name*"
                      autoComplete="off"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Name}
                      validate={{
                        ...name,
                        required: { ...name.required, value: true }
                      }}
                    />
                  </FormGroup>
                  <div className="d-inline-flex fullWidth">
                    <CountryDropDown onSelectCountry={this.handleCountryChange} />
                    <AvField
                      type="text"
                      name="contactNo"
                      value={contact_no}
                      id="started_contact_no"
                      placeholder="Contact no*"
                      autoComplete="off"
                      className="form-control"
                      validate={{
                        minLength: { value: 6, errorMessage: 'Phone number needs to be minimum 6 charecters' },
                        maxLength: { value: 10, errorMessage: 'Phone number needs to be maximum 10 charecters' }
                      }}
                      required
                    />
                  </div>
                  <FormGroup>
                    <Button type="submit" className="loginSubmit">Call Back</Button>
                  </FormGroup>
                </AvForm>
                <Row>
                  <p className="termsRedirect">
                    {'Get inspired by our unique training approach that eventually pave a splendid career path'}
                  </p>
                </Row>
              </div>
            </Row>
          </Col>
        </ModalBody>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signupUser: (payload, cb) => {
    dispatch(requestCallbackAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  signupDetails: state.signupDetails,
  profileDetails: state.profileDetails
});

Callback.propTypes = {
  signupUser: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  profileDetails: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
