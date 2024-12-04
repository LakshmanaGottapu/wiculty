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

const RedeemForm = ({
  handleClose, handleRedeem, wallet = {}
}) => {
  function handleValidSubmit (event, values) {
    handleRedeem(values)
  }
  const { no_special } = validations;
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
                    type="text"
                    name="bank_name"
                    id="bank_name"
                    placeholder="Bank Name*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Bank_name}
                    validate={{
                      pattern: { value: /^([a-zA-Z]+\s)*[a-zA-Z]+$/, errorMessage: 'Only letters and space allowed' },
                      required: true
                    }}
                  />
                </FormGroup>
                <div className=" side-fileds">
                  <FormGroup>
                    <AvField
                      type="text"
                      name="acc_holder_name"
                      id="acc_holder_name"
                      placeholder="Account Holder Name*"
                      autoComplete="off"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Account_holder_name}
                      validate={{
                        pattern: { value: /^([a-zA-Z]+\s)*[a-zA-Z]+$/, errorMessage: 'Only letters and space allowed' },
                        required: true
                      }}
                    />
                  </FormGroup>
                </div>
                <FormGroup className="side-fileds">
                  <AvField
                    type="text"
                    name="bank_address"
                    id="bank_address"
                    placeholder="Bank Location*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Bank_location}
                    validate={{
                      pattern: { value: /^([a-zA-Z]+\s)*[a-zA-Z]+$/, errorMessage: 'Only letters and space allowed' },
                      required: true
                    }}
                  />
                </FormGroup>
                <FormGroup className="side-fileds">
                  <AvField
                    type="text"
                    name="ifsc_code"
                    id="ifsc_code"
                    placeholder=" IFSC Code*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.IFSC_code}
                    validate={{
                      ...no_special,
                      required: { ...no_special.required, value: true }
                    }}
                  />
                </FormGroup>
                <FormGroup className="side-fileds">
                  <AvField
                    type="number"
                    name="account_number"
                    id="account_number"
                    placeholder="Account Number*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.Acc_number}
                    validate={validations.number}
                  />
                </FormGroup>
                <FormGroup className="side-fileds">
                  <AvField
                    type="text"
                    name="pan_number"
                    id="pan_number"
                    placeholder="PAN Number*"
                    autoComplete="off"
                    className="form-control"
                    errorMessage={inlineErrorMsgs.PAN_card_num}
                    validate={{
                      ...no_special,
                      required: { ...no_special.required, value: true }
                    }}
                  />
                </FormGroup>
                <div>
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

RedeemForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleRedeem: PropTypes.func.isRequired,
  wallet: PropTypes.isRequired
}

export default RedeemForm;
