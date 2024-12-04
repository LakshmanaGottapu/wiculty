import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import sf from '../common/safeTraverse';
import promocodeAction from './promocodeAction';
import { validations, inlineErrorMsgs } from '../validations';
import { ERRORMSG } from '../locales/locale';
import { getCountryVals } from '../common/utilFunctions/utilFunction'

class PromoCode extends Component {
  constructor (props) {
    super(props);
    this.state = {
      orderDetails: {},
      promoCodeinValid: false,
      isLoading: false
    };
    this.handleValidPromoSubmit = this.handleValidPromoSubmit.bind(this);
    this.handleValidDeletePromo = this.handleValidDeletePromo.bind(this);
  }

  static getDerivedStateFromProps (props, state) {
    const { orderSummaryDetails } = props || {}
    const orderDetails = sf(orderSummaryDetails, ['data', 'data']) || {};
    if (Object.keys(orderDetails).length > 0) {
      return {
        orderDetails
      }
    }
    return null
  }

  getCouponPayload (couponCode) {
    const {
      orderDetails,
      UserPrefInfo,
      selectedCourse
      // updatePromoCode
    } = this.props;
    // updatePromoCode(values.promoCode)
    const {
      course_id,
      course_group_id,
      business_unit,
      batch_id,
      currency = {}
    } = orderDetails;

    const { id } = currency;
    const { country } = getCountryVals(UserPrefInfo);

    return {
      batch_id: batch_id || null,
      business_unit,
      country_id: country,
      course_group_id,
      course_id,
      currency_id: id,
      selected_free_course_id: selectedCourse || null,
      couponCode
    }
  }

  handleValidPromoSubmit (event, values) {
    const { applyPromoCode } = this.props;
    this.setState({
      isLoading: true
    })

    // Get coupon Apply API payload
    const couponPayload = this.getCouponPayload(values.promoCode);

    applyPromoCode({ couponPayload }, (resp) => {
      const isCouponValid = sf(resp, ['data', 'msg', 'coupon_status']) || '';
      let promoCodeinValid = false;
      if (!isCouponValid) {
        promoCodeinValid = true;
      }
      this.setState({
        promoCodeinValid,
        isLoading: false
      })
    })
  }

  handleValidDeletePromo () {
    const {
      applyPromoCode
    } = this.props;

    // Get coupon Apply API payload
    const couponPayload = this.getCouponPayload('');

    this.setState({
      isLoading: true
    })
    applyPromoCode({ couponPayload }, (response) => {
      this.setState({
        promoCodeinValid: false,
        isLoading: false
      });
    })
  }

  render () {
    const {
      orderDetails,
      promoCodeinValid,
      isLoading
    } = this.state;
    const orderDetailsMsg = sf(orderDetails, ['msg']) || {};
    const { couponCode = '' } = orderDetailsMsg;
    return (
      <React.Fragment>
        {isLoading && <div className="loading" />}
        <Row className="coupon-box mt-4">
          <p className="col-lg-3 col-md-12 col-xs-12 mb-0 px-3 px-lg-0 d-flex align-items-center">
            PROMO CODE:
          </p>
          <Col lg={{ size: 9 }} md={{ size: 12 }} xs={{ size: 12 }}>
            {!orderDetailsMsg.coupon_status ? (
              <AvForm id="enquiry-form mt-2" className="mt-2" onValidSubmit={this.handleValidPromoSubmit} ref={c => (this.form = c)}>
                <div className="input-group input-group-sm">
                  <AvField
                    type="text"
                    name="promoCode"
                    id="promoCode"
                    placeholder="Enter coupon code"
                    autoComplete="off"
                    className="form-control"
                    onChange={() => this.setState({ promoCodeinValid: false })}
                    errorMessage={inlineErrorMsgs.PromoCode}
                    validate={validations.promoCode}
                    value={couponCode.toUpperCase()}
                    required
                  />
                  <div className="input-group-prepend ml-2 d-flex">
                    <Button className="promoCodeButton text-success bg-white d-flex">Apply</Button>
                  </div>
                </div>
                {promoCodeinValid && <p className="form-errors">{ERRORMSG.INVALID_PROMOCODE}</p>}
              </AvForm>
            ) : (
              <div className="d-flex align-items-center">
                <p className="codeText text-success mb-0">{couponCode.toUpperCase()}</p>
                <Button className="btn bg-white text-secondary border-0" onClick={this.handleValidDeletePromo}>
                  <FontAwesomeIcon icon={faTimesCircle} title="Remove promo" />
                </Button>
              </div>
            )}
          </Col>
        </Row>

      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  applyPromoCode: (payload, cb) => {
    dispatch(promocodeAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  orderSummaryDetails: state.orderSummaryDetails,
  UserPrefInfo: state.UserPrefInfo
});

PromoCode.propTypes = {
  applyPromoCode: PropTypes.func.isRequired,
  orderDetails: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  selectedCourse: PropTypes.number.isRequired,
  userDetails: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PromoCode);
