import React from 'react';
import {
  ModalBody, FormGroup, Button, ModalHeader,
  Col, Row, Label
} from 'reactstrap';
import {
  AvForm, AvField, AvGroup, AvInput
} from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { validations, inlineErrorMsgs } from '../validations';
import CountryDropDown from '../country_dropdown/country_dropdown';

const CurrmLeadForm = ({
  handleCurrmLeadClose, handleCurrmLeadSubmit, handleCountryChange
}) => {
  const getTerms = () => (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <Label for="agree">
          I agree to the Wiculty &nbsp;
        <Link className="mx-1" to="/terms-conditions">Terms of Service</Link>
          &nbsp; and &nbsp;
        <Link className="mx-1" to="/terms-conditions">Privacy Policy</Link>
      </Label>
    </>
  )
  return (
    <>
      <ModalHeader toggle={() => handleCurrmLeadClose()}>
        <Row className="modalHeader">
          <Col lg="12">
            <p className="modalLeft">Our Extensive curriculum is here!</p>
          </Col>
          <Col lg="12">
            <p className="modalRight">
            Talk to our expert for insights
            </p>
          </Col>
        </Row>
      </ModalHeader>
      <ModalBody className="suggestACourse">
        <Row>
          <Col lg="12" sm="12">
            <AvForm id="CurrmLead-form" onValidSubmit={handleCurrmLeadSubmit}>
              <AvField
                type="email"
                name="email"
                id="suggestEmail"
                placeholder="Email*"
                autoComplete="email"
                className="form-control"
                errorMessage={inlineErrorMsgs.Email}
                validate={validations.email}
              />

              <div className="d-inline-flex fullWidth">
                <CountryDropDown name="country_code" onSelectCountry={handleCountryChange} />
                <AvField
                  type="text"
                  name="contact_no"
                  id="enquiryTelephoneSuggest"
                  placeholder="Phone Number*"
                  autoComplete="tel-national"
                  className="form-control enquiryTelephoneSuggest"
                  errorMessage={inlineErrorMsgs.Mobile_number}
                  validate={validations.mobile_number}
                />
              </div>
              <AvGroup check>
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <Label check className="order-agree">
                  <AvInput type="checkbox" name="agree" trueValue="User Agreed" required />
                  {getTerms()}
                </Label>
              </AvGroup>

              <FormGroup className="enquiryButtons text-right">
                <Button color="primary" className="loginSubmit">Download</Button>
              </FormGroup>
            </AvForm>
          </Col>
        </Row>
      </ModalBody>
    </>
  )
}

CurrmLeadForm.propTypes = {
  handleCurrmLeadClose: PropTypes.func.isRequired,
  handleCurrmLeadSubmit: PropTypes.func.isRequired,
  handleCountryChange: PropTypes.func.isRequired
};

export default CurrmLeadForm;
