import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagManager from 'react-gtm-module';
import { withRouter } from 'react-router-dom';
import {
  Container, Row, Col,
  FormGroup, Button,
  Label
} from 'reactstrap';
import {
  AvForm, AvField,
  AvGroup, AvInput
} from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import CountryDropDown from '../country_dropdown/country_dropdown';
import sendEnquiryAction from '../common/contactPopup/contactpopupAction';
import { IMAGES } from '../locales/images';
import { validations, inlineErrorMsgs } from '../validations';
import SeoContentComp from '../common/seoContentComp';
import messageFn from '../common/message';
import { getAutoFillDetails, getCountryVals } from '../common/utilFunctions/utilFunction';

import { MESSAGES } from '../locales/locale';
import './static.scss';

const {
  ERROR: { GENERIC_ERR }, GET_BACK_SOON,
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

const getTerms = () => (
  <div className="knowlarity-terms">
    <p>
      {`I hereby authorize Wiculty Learninig Solutions Pvt Ltd.. to contact me.
      It will override my registry on the NCPR`}
    </p>
    <p>
      {`By providing contact details you have expressly authorized WLS to contact
      you in futute through calls/ SMS / E-mails and inform
      you about our products`}
    </p>
  </div>
)

class ContactUs extends Component {
  constructor (props) {
    super(props);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {
      name: '',
      email: '',
      message: ''
    };
    window.scroll(0, 0);
  }

  handleCountryChange = (countryLang) => {}

  handleValidSubmit (event, values) {
    const { UserPrefInfo } = this.props;
    const { phone_code } = getCountryVals(UserPrefInfo)
    this.setState({
      name: values.name,
      email: values.email,
      message: values.message
    });
    const enquiryValues = {
      name: values.name,
      email: values.email,
      contact_no: values.contact_no,
      mobile_code: phone_code,
      message: values.message,
      source: 'contactus-form'
    }
    const { sendEnquiry } = this.props;
    sendEnquiry({ enquiryValues }, (response = {}) => {
      const { data, status } = response;
      if (data && status === 200) {
        this.form && this.form.reset();
        messageFn(GET_BACK_SOON, SUCCESS)
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  render () {
    const tagManagerArgs = {
      dataLayer: {
        userProject: 'Wiculty',
        page: 'Contact Us',
        url: window.location.href
      },
      dataLayerName: 'PageDataLayer'
    }

    TagManager.dataLayer(tagManagerArgs);
    const { profileDetails } = this.props;
    const { Name, email, contact_no } = getAutoFillDetails(profileDetails);

    return (
      <div className="contact-us-container">
        <SeoContentComp seoKey="contact-us" />
        <div className="header-section" style={{ background: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5) ), url(${IMAGES.CONTACT_US_BANNER})` }}>
          <div className="banner">
            <h1>CONTACT US</h1>
          </div>
        </div>
        <Container fluid className="mauto">
          <Row className="section-gap justify-content-center">
            <Col lg="3" sm="12">
              <Row className="card p-4 custom-shadow">
                <Col className="contactus-card">
                  <address>
                    <div className="icon-circle">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <h5>Visit Us</h5>
                    <p className="desc">
                      {'3rd Floor, Sigma Tech Park'}
                      <br />
                      {'Gamma Block, Varthur Kodi'}
                      <br />
                      {'Whitefield, Bengaluru'}
                      <br />
                      {'Karnataka - 560066'}
                    </p>
                    <p className="contactus-text">
                      {'Sigma Tech Park, Whitefield, Bengaluru'}
                    </p>
                  </address>
                </Col>
              </Row>
            </Col>
            <Col lg="3" sm="12">
              <Row className="card p-2 custom-shadow pt-3">
                <Col className="contactus-card">
                  <address>
                    <div className="icon-circle">
                      <FontAwesomeIcon icon={faMobileAlt} />
                    </div>
                    <h5>Call Us</h5>
                    <p className="desc mb-0">
                      {`Reach out to our Help Desk for any queries!
                      Get a swift response from Wiculty, tap our frequency now`}
                    </p>
                    <div className="p-0 m-0">
                      <Row>
                        <Col lg="6" md="6" sm="12">
                          <strong>Sales:</strong>
                          <p className="contactus-text">
                            <a className="pl-2" href="tel:+91 8951066177">+91 8951066177</a>
                          </p>
                        </Col>
                        <Col lg="6" md="6" sm="12">
                          <strong>Support:</strong>
                          <p className="contactus-text">
                            <a className="pl-2" href="tel:+91 7013316972">+91 7013316972</a>
                          </p>
                        </Col>
                      </Row>
                      {/* <p className="contactus-text">
                      US:
                        <a className="pl-2" href="tel:+1 408 809 3690">+1 408 809 3690</a>
                      </p> */}
                    </div>
                  </address>
                  {/* <p className="contactus-text">
                    US:
                    <a className="pl-2" href="tel:+1 408 809 3690">+1 408 809 3690</a>
                  </p> */}
                </Col>
              </Row>
            </Col>
            <Col lg="3" sm="12">
              <Row className="card p-2 custom-shadow pt-3">
                <Col className="contactus-card">
                  <address>
                    <div className="icon-circle">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <h5>Email Us</h5>
                    <p className="desc">
                      {'Anything related to learning or business! Just push an email to us at'}
                    </p>
                    <div>
                      <Row>
                        <Col lg="6" md="6" sm="12">
                          <strong>Sales:</strong>
                          <p className="contactus-text">
                            <a href="mailto:sales@wiculty.com">sales@wiculty.com</a>
                          </p>
                        </Col>
                        <Col lg="6" md="6" sm="12">
                          <strong>Support:</strong>
                          <p className="contactus-text">
                            <a href="mailto:support@wiculty.com">support@wiculty.com</a>
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </address>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container fluid className="p-0">
          <div className="section-gap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2280.1311365859747!2d77.74268909229927!3d12.956604224156198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae120a1dc6bae7%3A0x8fa2dad87a54b6a3!2sSigma%20Soft%20Tech%20Park%20Business%20Bay!5e0!3m2!1sen!2sin!4v1579173747491!5m2!1sen!2sin"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen=""
              title="Contact Us"
            />
          </div>
        </Container>
        <Container className="mauto mb-4">
          <Row className="contact-us-form section-gap mb-4 justify-content-center">
            <Col lg="8" md="12" sm="12">
              <h5 className="text-center">Contact us</h5>
              <div className="content-gap">
                <AvForm id="contactus-form" onValidSubmit={this.handleValidSubmit} ref={c => (this.form = c)}>

                  <AvField
                    type="text"
                    name="name"
                    id="enquiryName"
                    value={Name}
                    placeholder="Name"
                    autoComplete="family-name"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Name}
                    validate={validations.name}
                  />

                  <AvField
                    type="email"
                    name="email"
                    id="enquiryEmail"
                    value={email}
                    placeholder="Email*"
                    autoComplete="email"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Email}
                    validate={validations.email}
                  />

                  <div className="d-inline-flex mt-0 fullWidth">
                    <div className="enquiryCountryDd">
                      <CountryDropDown name="country_code" onSelectCountry={this.handleCountryChange} />
                    </div>
                    <AvField
                      type="text"
                      name="contact_no"
                      id="enquiryTelephone"
                      value={contact_no}
                      placeholder="Phone Number*"
                      autoComplete="tel-national"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Mobile_number}
                      validate={validations.mobile_number}
                    />
                  </div>

                  <AvField
                    type="textarea"
                    name="message"
                    id="enquiryMessage"
                    placeholder="Message"
                    autoComplete="off"
                    className="form-control"
                    validate={validations.user_comments}
                  />

                  <AvGroup check>
                    {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                    <Label check className="order-agree animated shake-x">
                      <AvInput type="checkbox" name="agree" trueValue="User Agreed" required />
                      {getTerms()}
                    </Label>
                  </AvGroup>

                  <FormGroup className="enquiryButtons">
                    <Button color="btn btn-theme-bordered col-sm-12">Submit</Button>
                  </FormGroup>
                </AvForm>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendEnquiry: (payload, cb) => {
    dispatch(sendEnquiryAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});

ContactUs.propTypes = {
  sendEnquiry: PropTypes.func.isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactUs));
