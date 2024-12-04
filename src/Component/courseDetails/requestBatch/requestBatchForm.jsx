import React from 'react';
import {
  ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { validations, inlineErrorMsgs } from '../../validations';
import CountryDropDown from '../../country_dropdown/country_dropdown';

const RequestBatchForm = ({
  handleClose, handleSubmit, handleCountryChange
}) => (
  <>
    <ModalHeader toggle={() => handleClose()}>
      <Row className="modalHeader">
        <Col className="flex-vertical-center" lg="12">
          <FontAwesomeIcon className="fa-icon-size text-info" icon={faCalendarAlt} alt="calendar" />
          <p className="ml-3 modalLeft">Tell Us Your Preferred Starting Date </p>
        </Col>
      </Row>
    </ModalHeader>
    <ModalBody className="suggestACourse">
      <Row>
        <Col lg="12" sm="12">
          <AvForm id="BOGO-form" onValidSubmit={handleSubmit}>
            <AvField
              name="batch_request_date"
              type="date"
              className="form-control"
              errorMessage={inlineErrorMsgs.batch_request}
              required
            />
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

            <FormGroup className="enquiryButtons text-right">
              <Button color="primary" className="loginSubmit">Submit Request</Button>
            </FormGroup>
          </AvForm>
        </Col>
      </Row>
    </ModalBody>
  </>
)

RequestBatchForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCountryChange: PropTypes.func.isRequired
};

export default RequestBatchForm;
