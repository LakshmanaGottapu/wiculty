import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CountryDropDown from '../../country_dropdown/country_dropdown';
import { validations, inlineErrorMsgs } from '../../validations';
import messageFn from '../../common/message';
// redux actions import start
import registerWebinarAction from '../../registration/registerWebinar';
// redux actions import end
import sf from '../../common/safeTraverse';
import { MESSAGES } from '../../locales/locale';
import { getAutoFillDetails, getCountryVals } from '../../common/utilFunctions/utilFunction'

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class TrendingTopicForm extends Component {
  constructor (props) {
    super(props);
    const state = {
      isTrendingOpen: true,
      country: '+91'
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = state;
  }

  handleCountryChange = (countryLang) => {
    this.setState({ country: countryLang.phone_code });
  }

  handleValidSubmit (event, values) {
    const {
      webinarLink, webinarDesc, webinarDate, UserPrefInfo
    } = this.props;
    const { phone_code } = getCountryVals(UserPrefInfo)
    const getOtpValues = {
      ...values,
      mobile_code: phone_code,
      webinar_link: webinarLink,
      webinar_desc: webinarDesc,
      webinar_date: webinarDate,
      source: 'Webinar Leads'
    }
    const { webinarEnroll, handleClose } = this.props;
    webinarEnroll({ getOtpValues }, (response) => {
      const { data = {}, status } = response || {};
      if (data && status === 200) {
        handleClose()
        const msg = sf(data, ['data', 'message'])
        this.setState({ isTrendingOpen: false })
        messageFn(msg, SUCCESS)
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  render () {
    const {
      isTrendingOpen,
      isLoading
    } = this.state;
    const { profileDetails, handleClose } = this.props;
    const { Name, email, contact_no } = getAutoFillDetails(profileDetails);
    return (
      <React.Fragment>
        {isLoading && <div className="loading" />}
        <ModalHeader toggle={() => handleClose()}>
          <Row className="modalHeader">
            <Col lg="12">
              <p className="modalLeft">Enroll to webinar</p>
            </Col>
            <Col lg="12">
              <p className="modalRight">Get better insights on your learning</p>
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>
          <div className="form">
            {isTrendingOpen && (
              <AvForm id="webinar-form" onValidSubmit={this.handleValidSubmit}>
                <FormGroup>
                  <AvField
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Name}
                    validate={validations.name}
                    value={Name}
                  />
                </FormGroup>
                <FormGroup>
                  <AvField
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Email}
                    validate={validations.email}
                    value={email}
                  />
                </FormGroup>
                <div className="d-inline-flex fullWidth">
                  <CountryDropDown onSelectCountry={this.handleCountryChange} />
                  <AvField
                    type="number"
                    name="contact_no"
                    id="started_contact_no"
                    placeholder="Contact no*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Mobile_number}
                    validate={validations.mobile_number}
                    value={contact_no}
                  />
                </div>
                <FormGroup>
                  <Button type="submit" className="loginSubmit">Enroll Now</Button>
                </FormGroup>
              </AvForm>
            )}
          </div>
        </ModalBody>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  webinarEnroll: (payload, cb) => {
    dispatch(registerWebinarAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  signupDetails: state.signupDetails,
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});

TrendingTopicForm.propTypes = {
  webinarEnroll: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  webinarLink: PropTypes.string.isRequired,
  webinarDesc: PropTypes.string.isRequired,
  webinarDate: PropTypes.string.isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingTopicForm);
