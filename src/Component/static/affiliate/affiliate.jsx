import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Button, Container
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountryDropDown from '../../country_dropdown/country_dropdown';
import affiliateAction from './affiliateAction';
import { validations, inlineErrorMsgs } from '../../validations';
import { cluttersQueryJson, joinAffiliateJson, tramContentJson } from '../../staticJson';

// Imports from common things start
import { getAutoFillDetails } from '../../common/utilFunctions/utilFunction';
import { IMAGES } from '../../locales/images';
import SeoContentComp from '../../common/seoContentComp';
import messageFn from '../../common/message';
import { MESSAGES } from '../../locales/locale';
import sf from '../../common/safeTraverse'
// Imports from common things end

import './affiliate.scss';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class Affiliate extends Component {
  constructor (props) {
    super(props);
    this.state = {
      country: '91',
      formOpen: true
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.toggleAffiliateForm = this.toggleAffiliateForm.bind(this);
    window.scroll(0, 0);
  }

  toggle = () => {
    this.setState(state => ({ formOpen: !state.formOpen }));
  }

  handleCountryChange = (countryLang) => {
    this.setState({ country: countryLang.phone_code });
  }

  toggleAffiliateForm () {
    this.toggle();
  }

  handleValidSubmit (event, values) {
    const { country } = this.state;
    const getOtpValues = {
      name: values.name,
      email: values.email,
      contact_no: values.contact_no,
      mobile_code: country,
      message: values.message
    }
    const { signupAffiliates } = this.props;
    signupAffiliates({ getOtpValues }, (response) => {
      const { data = {}, status } = response || {};
      if (data && status === 200) {
        const msg = sf(data, ['data'])
        this.form && this.form.reset();
        messageFn(msg, SUCCESS)
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
        page: 'Affiliate',
        url: window.location.href
      },
      dataLayerName: 'PageDataLayer'
    }

    TagManager.dataLayer(tagManagerArgs);
    const { profileDetails } = this.props;
    const { Name, email, contact_no } = getAutoFillDetails(profileDetails);

    return (
      <React.Fragment>
        <SeoContentComp seoKey="affiliate" />
        <div fluid className="affiliate-conatiner">
          <div className="header-section" style={{ backgroundImage: `url(${IMAGES.AFFILIATE_BANNER})` }}>
            <Row id="tag-line" className="d-none">
              <Col lg="12" md="12" xs="12">
                <h1 className="fcr">
                  {'Wiculty Affiliate Program'}
                </h1>
              </Col>
              <Col lg="12" md="12" xs="12">
                <h3>
                  {'Shout out to pierce the e-learning Market '}
                </h3>
              </Col>
            </Row>
          </div>
          <Container>
            <Row className="section-gap">
              <Col sm="12">
                <h2 className="text-center">
                  {'How does our Affiliate Tram Works?'}
                </h2>
              </Col>
              <Col sm="12">
                <Row className="tram-content content-gap">
                  {tramContentJson.map(tramItem => (
                    <Col className="tram-card" lg="3" md="6" xs="12">
                      <div>
                        <div className={`sprite-img-holder ${tramItem.styleClass}`} />
                        <h5 className="bold">
                          {tramItem.heading}
                        </h5>
                        <p>
                          {tramItem.paragraph}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <Row className="section-gap">
              <div className="join-affiliate-container">
                <Col sm="12">
                  <h2 className="text-center">
                    {'Why to join Wiculty as an affiliate? Skim Now'}
                  </h2>
                </Col>
                <Col sm="12" className="content-gap">
                  <Row className="join-affiliate-cards-container">
                    {joinAffiliateJson.map(affiliateItem => (
                      <Col className="join-affiliate-cards" lg="5" md="5" xs="12">
                        <Row>
                          <Col>
                            <FontAwesomeIcon icon={affiliateItem.icon} />
                            <h5>{affiliateItem.heading}</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-center">
                            <p>
                              {affiliateItem.paragraph}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </div>
            </Row>
            <Row className="section-gap clutters-container">
              <Col sm="12">
                <h2 className="text-center">
                  {'Clearing your question clutters!'}
                </h2>
              </Col>
              <Col sm="12" className="content-gap">
                <ul>
                  {cluttersQueryJson.map(clutterItem => (
                    <li className="mb-4">
                      <Row>
                        <Col sm="12">
                          <h5 className="bold">
                            {clutterItem.question}
                          </h5>
                        </Col>
                        <Col sm="12">
                          <p>
                            {clutterItem.answer}
                          </p>
                        </Col>
                      </Row>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Container>
          <Container fluid className="section-gap p-0">
            <div className="affiliate-form-section bg-section-graident">
              <Row>
                <Col lg="6" md="6" xs="12" className="flex-vertical-center">
                  <div className="affiliate-quote">
                    <h2 className="h1">
                      {'Make Wiculty'}
                      <span className="wicultythemeColor"> Float </span>
                    </h2>
                    <h2 className="h1">
                      {'With the Way You'}
                      <span className="wicultythemeColor"> Promote </span>
                    </h2>
                    <h5 className="h3">
                      {'Get great benefits! Join us right now'}
                    </h5>
                  </div>
                </Col>
                <Col lg="4" md="6" xs="12" className="flex-vertical-center">
                  <div className="affiliateFormHolder w-100">
                    <Row className="affiliateFormHeader">
                      <h2>
                        {'Drop Your'}
                        <span className="wicultythemeColor">
                          {' Enquiry'}
                        </span>
                      </h2>
                    </Row>

                    <AvForm id="affiliatenquiry-form" onValidSubmit={this.handleValidSubmit} ref={c => (this.form = c)}>
                      <AvField
                        type="text"
                        name="name"
                        id="affiliateName"
                        value={Name}
                        placeholder="Name"
                        autoComplete="off"
                        className="form-control"
                        errorMessage={inlineErrorMsgs.Name}
                        validate={validations.name}
                      />

                      <div className="d-inline-flex w-100">
                        <FormGroup className="enquiryCountryDd">
                          <CountryDropDown name="country_code" onSelectCountry={this.handleCountryChange} />
                        </FormGroup>
                        <FormGroup className="w-100">
                          <AvField
                            type="text"
                            name="contact_no"
                            id="enquiryTelephoneSuggest"
                            value={contact_no}
                            placeholder="Phone Number*"
                            autoComplete="tel-national"
                            className="form-control enquiryTelephoneSuggest"
                            errorMessage={inlineErrorMsgs.Mobile_number}
                            validate={validations.mobile_number}
                          />
                        </FormGroup>
                      </div>

                      <AvField
                        type="email"
                        name="email"
                        id="affiliateEmail"
                        value={email}
                        placeholder="Email ID*"
                        autoComplete="email"
                        className="form-control"
                        errorMessage={inlineErrorMsgs.Email}
                        validate={validations.email}
                      />

                      <AvField
                        type="textarea"
                        name="message"
                        id="affiliateQuery"
                        placeholder="Post your query"
                        autoComplete="off"
                        className="form-control"
                        validate={validations.user_comments}
                      />

                      <FormGroup className="enquiryButtons text-center">
                        <Button color="btn btn-sm btn-theme" className="loginSubmit">Submit</Button>
                      </FormGroup>
                    </AvForm>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signupAffiliates: (payload, cb) => {
    dispatch(affiliateAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  profileDetails: state.profileDetails
});

Affiliate.propTypes = {
  signupAffiliates: PropTypes.func.isRequired,
  profileDetails: PropTypes.shape({}).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Affiliate));
