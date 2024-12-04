import React from 'react';
import {
  ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';
import { validations, inlineErrorMsgs } from '../validations';
import CountryDropDown from '../country_dropdown/country_dropdown';

const BOGOModal = ({
  handleBOGOClose, handleBOGOSubmit, handleCountryChange
}) => (
  <>
    <ModalHeader toggle={() => handleBOGOClose()}>
      <Row className="modalHeader">
        <Col lg="12">
          <p className="modalLeft">Buy 1 Get 1 Live course FREE!</p>
        </Col>
        <Col lg="12">
          <p className="modalRight">Book your course now with us</p>
        </Col>
      </Row>
    </ModalHeader>
    <ModalBody className="suggestACourse">
      <Row>
        <Col lg="12" sm="12">
          <AvForm id="BOGO-form" onValidSubmit={handleBOGOSubmit}>
            <AvField
              type="email"
              name="email"
              id="suggestEmail"
              placeholder="Email*"
              autoComplete="off"
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
                autoComplete="off"
                className="form-control enquiryTelephoneSuggest"
                errorMessage={inlineErrorMsgs.Mobile_number}
                validate={validations.mobile_number}
              />
            </div>

            <FormGroup className="enquiryButtons text-right">
              <Button color="primary" className="loginSubmit">Submit</Button>
            </FormGroup>
          </AvForm>
        </Col>
      </Row>
    </ModalBody>
  </>
)

BOGOModal.propTypes = {
  handleBOGOClose: PropTypes.func.isRequired,
  handleBOGOSubmit: PropTypes.func.isRequired,
  handleCountryChange: PropTypes.func.isRequired
};

export default BOGOModal;
