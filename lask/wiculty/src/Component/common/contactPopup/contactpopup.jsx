import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Collapse, CardBody, Card, CardTitle, FormGroup, Button, Row, Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSquareAlt, faHeadset, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { withRouter } from 'react-router-dom';

/* component imports */
import CountryDropDown from '../../country_dropdown/country_dropdown';
import messageFn from '../message'

/* action imports */
import getStartedAction from '../../registration/getStartedAction';
import sendIcon from '../../../img/send.svg';
import { validations, inlineErrorMsgs } from '../../validations';
import { MESSAGES } from '../../locales/locale';
import { getAutoFillDetails, getCountryVals } from '../utilFunctions/utilFunction';
import { getOtherParams } from '../utilFunctions/leadUtils';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class ContactPopUp extends Component {
  constructor (props) {
    super(props);
    const state = {
      isEnquiryOpen: false,
      showIcon: true,
      name: '',
      email: '',
      country: '+91',
      message: ''
    };

    this.state = state;

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.formRef = React.createRef();
  }

  static getDerivedStateFromProps (props, state) {
    const { location = {} } = props;
    const { pathname = '' } = location;
    if (pathname.startsWith('/class-room') || pathname.startsWith('/order-summary')) {
      return {
        isEnquiryOpen: false,
        showIcon: false
      };
    }
    return {
      showIcon: true
    };
  }

  componentDidMount () {
    if (process.env.REACT_APP_ENV !== 'development') {
      setTimeout(() => {
        this.setState({
          isEnquiryOpen: true
        })
      }, 5000);
    }
  }

  handleCountryChange = (countryLang) => { }

  toggle = () => {
    this.setState(state => ({
      isEnquiryOpen: !state.isEnquiryOpen
    }));
  }

  handleValidSubmit (event, values) {
    const { UserPrefInfo } = this.props;
    const { phone_code } = getCountryVals(UserPrefInfo)
    this.setState({
      name: values.name,
      email: values.email,
      message: values.message
    });
    const getOtpValues = {
      name: values.name,
      email: values.email,
      contact_no: values.contactNo,
      mobile_code: phone_code,
      source: 'footer',
      message: values.message,
      otherParams: getOtherParams()
    }
    const { sendEnquiry } = this.props;
    sendEnquiry({ getOtpValues }, (response) => {
      const { data = {}, status } = response || {};
      if (data && status === 200) {
        this.form && this.form.reset();
        const { data: { message = '' } } = data
        messageFn(message, SUCCESS)
        this.setState(state => ({
          isEnquiryOpen: !state.isEnquiryOpen
        }))
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  render () {
    const {
      isEnquiryOpen,
      showIcon
    } = this.state;
    const { profileDetails } = this.props;
    const { Name = '', email = '', contact_no = '' } = getAutoFillDetails(profileDetails)
    return (
      <React.Fragment>
        <div className={`wiculty-query c-p ${!showIcon && 'd-none'}`} role="button" tabIndex={0} onKeyPress={() => { }} onClick={this.toggle}>
          <p className="fwb icons">
            {isEnquiryOpen ? <FontAwesomeIcon icon={faTimes} />
              : <FontAwesomeIcon icon={faHeadset} />}
          </p>
        </div>
        <Card className="contactPopUp">
          <Collapse isOpen={isEnquiryOpen}>
            <CardTitle>
              <p className="contatc-title">
                <img src={sendIcon} alt="close" className="send-icon" />
              </p>
              <p>
                {'Contact Us'}
              </p>
            </CardTitle>
            <CardBody>
              <a href="tel:+918951066177" className="c-inherit">
                <Row className="infoContainer">
                  <Col lg={{ size: 2 }} md={{ size: 2 }} xs={{ size: 2 }} className="infoIcon">
                    <FontAwesomeIcon icon={faPhoneSquareAlt} />
                  </Col>
                  <Col lg={{ size: 10 }} md={{ size: 10 }} xs={{ size: 10 }} className="infoText">
                    <p className="ftb">
                      {'+91 8951066177'}
                    </p>
                    <p>Available 24x7</p>
                  </Col>
                </Row>
              </a>
              <AvForm id="enquiry-form" onValidSubmit={this.handleValidSubmit} ref={c => (this.form = c)}>

                <AvField
                  type="text"
                  name="name"
                  id="enquiryName"
                  value={Name}
                  placeholder="Name"
                  autoComplete="off"
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
                  autoComplete="off"
                  className="form-control"
                  errorMessage={inlineErrorMsgs.Email}
                  validate={validations.email}
                />

                <div className="d-inline-flex">
                  <FormGroup className="enquiryCountryDd">
                    <CountryDropDown onSelectCountry={this.handleCountryChange} DD_Size="sm" />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      type="text"
                      name="contactNo"
                      value={contact_no}
                      placeholder="Phone Number*"
                      autoComplete="off"
                      className="form-control enquiryTelephone"
                      errorMessage={inlineErrorMsgs.Mobile_number}
                      validate={validations.mobile_number}
                    />
                  </FormGroup>
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

                <FormGroup className="enquiryButtons text-right">
                  <Button color="primary col-sm-12">Submit</Button>
                </FormGroup>
              </AvForm>
            </CardBody>
          </Collapse>
        </Card>

      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendEnquiry: (payload, cb) => {
    dispatch(getStartedAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});

ContactPopUp.propTypes = {
  sendEnquiry: PropTypes.func.isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactPopUp));
