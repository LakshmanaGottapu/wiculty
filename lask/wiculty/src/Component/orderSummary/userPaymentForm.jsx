import React, { useRef, useState } from 'react'
import {
  AvForm, AvField,
  AvGroup, AvInput
} from 'availity-reactstrap-validation';
import {
  FormGroup,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { validations, inlineErrorMsgs } from '../validations';
import CountryDropDown from '../country_dropdown/country_dropdown';
// utils
import { getAutoFillDetails } from '../common/utilFunctions/utilFunction';
import TermsComponent from '../static/termsComponent';
import PrivacyComponent from '../static/privacyComponent';
import authService from '../../services/authService';

const UserPaymentForm = ({ profileDetails, paymentHandler }) => {
  const formEl = useRef();
  const { email, contact_no } = getAutoFillDetails(profileDetails);
  const handleCountryChange = () => { };

  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const toggleTerms = () => setTerms(!terms);
  const togglePrivacy = () => setPrivacy(!privacy);

  const getTerms = () => (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <Label for="agree">
        I agree to the Wiculty
        <Button color="link" onClick={() => toggleTerms()} className="px-2 py-0">
          Terms of Service
        </Button>
        and
        <Button color="link" onClick={() => togglePrivacy()} className="px-2 py-0">
          Privacy Policy
        </Button>
      </Label>
    </>
  )

  const handleOrderConfirm = (event, values) => {
    paymentHandler(event, values)
  }
  const authorised = authService.isAuthenticated();
  return (
    <div>
      <AvForm className="fullWidth" id="CODO-form" onValidSubmit={handleOrderConfirm} ref={formEl}>
        <div className="row">
          <div className="fullWidth col-xl-5 col-lg-6 p-0">
            <AvField
              type="email"
              name="email"
              value={email}
              id="suggestEmail"
              placeholder="Email*"
              autoComplete="email"
              className="form-control"
              errorMessage={inlineErrorMsgs.Email}
              validate={validations.email}
              disabled={email && authorised}
            />
          </div>
          <div className="d-inline-flex fullWidth col-xl-6 col-lg-6 p-0 pl-lg-4">
            <CountryDropDown
              name="country_code"
              onSelectCountry={handleCountryChange}
              disable={contact_no && authorised}
            />
            <AvField
              type="text"
              name="contact_no"
              value={contact_no}
              id="enquiryTelephoneSuggest"
              placeholder="Phone Number*"
              autoComplete="tel-national"
              className="form-control enquiryTelephoneSuggest"
              errorMessage={inlineErrorMsgs.Mobile_number}
              validate={validations.mobile_number}
              disabled={contact_no && authorised}
            />
          </div>
        </div>
        <AvGroup check>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <Label check className="order-agree animated shake-x">
            <AvInput type="checkbox" name="agree" trueValue="User Agreed" required />
            {getTerms()}
          </Label>
        </AvGroup>
        <FormGroup className="mb-1 mt-4">
          <Button
            color="btn btn-primary"
            className="confirm-order"
          >
            {'Confirm your order'}
          </Button>
        </FormGroup>
      </AvForm>

      <Modal isOpen={terms} toggle={toggleTerms} size="lg" className="modal-white" scrollable>
        <ModalHeader toggle={toggleTerms} className="mb-2">Terms of Service</ModalHeader>
        <ModalBody>
          <TermsComponent />
        </ModalBody>
        <ModalFooter className="justify-content-start">
          <Button color="secondary" onClick={toggleTerms}>Okay</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={privacy} toggle={togglePrivacy} size="lg" className="modal-white" scrollable>
        <ModalHeader toggle={togglePrivacy} className="mb-2">Privacy Policy</ModalHeader>
        <ModalBody>
          <PrivacyComponent />
        </ModalBody>
        <ModalFooter className="justify-content-start">
          <Button color="secondary" onClick={togglePrivacy}>Okay</Button>
        </ModalFooter>
      </Modal>

    </div>
  )
}

const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo,
  profileDetails: state.profileDetails
});

UserPaymentForm.propTypes = {
  UserPrefInfo: PropTypes.shape({}).isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  paymentHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps, null)(UserPaymentForm);
