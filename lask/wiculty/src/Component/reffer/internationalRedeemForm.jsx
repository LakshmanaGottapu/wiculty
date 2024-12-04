import React from 'react';
import {
  ModalBody, FormGroup, Button, ModalHeader, Col, Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { validations, inlineErrorMsgs } from '../validations'

const InternationalRedeemForm = ({
  isModalOpen, handleClose, handleRedeem, wallet = {}
}) => {
  function handleValidSubmit (event, values) {
    handleRedeem(values)
  }
  const { amount } = wallet;
  return (
    <React.Fragment>
      <ModalBody className="redeem-wallet">
        <Col lg="12">
          <Row>
            <p className="close-icon">
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={() => handleClose()}
              />
            </p>
            <ModalHeader>
              <Row className="modalHeader">
                <Col lg="12">
                  <h3 className="modalCenter">Redeem Wallet Cash</h3>
                </Col>
              </Row>
            </ModalHeader>
            <div className="form">
              <AvForm id="redeem-wallet-form" onValidSubmit={handleValidSubmit}>
                <FormGroup className=" side-fileds">
                  <AvField
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount}
                    placeholder="Redeem Amount*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Redeem_amount}
                    validate={{ ...validations.number, max: { value: amount, errorMessage: 'Redeem amount should be less than wallet cash' } }}
                  />
                </FormGroup>
                <FormGroup className=" side-fileds">
                  <AvField
                    type="email"
                    name="paypal_id"
                    id="paypal_id"
                    placeholder="Paypal Email ID*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Paypal_email}
                    validate={validations.paypal_email}
                  />
                </FormGroup>
                <div className="text-center">
                  <FormGroup>
                    <Button type="submit" className="redeem-submit w-100">
                        Submit
                    </Button>
                  </FormGroup>
                </div>
              </AvForm>
            </div>
          </Row>
        </Col>
      </ModalBody>
    </React.Fragment>
  )
}

InternationalRedeemForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isModalOpen: PropTypes.isRequired,
  handleRedeem: PropTypes.func.isRequired,
  wallet: PropTypes.shape({}).isRequired
}

export default InternationalRedeemForm;
