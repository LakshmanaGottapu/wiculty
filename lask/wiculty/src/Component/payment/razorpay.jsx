
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Row, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleDataLayer from '../common/utilFunctions/seoUtil';
import { getCountryVals } from '../common/utilFunctions/utilFunction';
import authService from '../../services/authService';
import { MESSAGES } from '../locales/locale';
import UserPaymentForm from '../orderSummary/userPaymentForm';
import orderCreateAction from './Actions/orderCreate';
import globalDataAction from '../../Actions/globalDataAction';
import messageFn from '../common/message';
import sf from '../common/safeTraverse';

const axios = require('axios');

const {
  ERROR: { GENERIC_ERR }, ALREADY_BATCH_ENROLL,
  TOASTER_STATUS: { WARNING, ERROR }
} = MESSAGES;

class RazorPayComp extends Component {
  constructor (props) {
    super(props);
    this.details = JSON.parse(localStorage.getItem('details'));
    this.state = {};
    this.paymentHandler = this.paymentHandler.bind(this);
  }

  componentDidMount () {
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    document.head.appendChild(script);
  }

  returnSucess (token) {
    const { history } = this.props;
    authService.signIn(token);
    this.ecommerceData();
    history.push('/payment-success');
  }

  returnFail (token) {
    const { history } = this.props;
    history.push('/payment-fail');
  }

  ecommerceData () {
    const { orderDetails = {} } = this.props;
    const {
      course_id = '',
      display_title = '',
      course_price = '',
      gst = 0.00,
      discount = 0.00,
      amount_paid = 0,
      couponCode = '',
      merchant_order_id = 0
    } = orderDetails || {};
    const appName = process.env.REACT_APP_NAME || '';

    const ecommerce = {
      event: 'transaction',
      ecommerce: {
        purchase: {
          actionField: {
            id: merchant_order_id.toString(), // Transaction ID. Required for purchases and refunds.
            affiliation: appName.toString(),
            revenue: amount_paid.toString(), // Total transaction value (incl. tax and shipping)
            tax: gst.toString(),
            discount: discount.toString(),
            coupon: couponCode.toString()
          },
          products: [{ // List of productFieldObjects.
            name: display_title.toString(), // Name or ID is required.
            id: course_id.toString(),
            price: course_price.toString(),
            brand: appName.toString(),
            category: 'course',
            quantity: 1 // Optional fields may be omitted or set to empty string.
          }]
        }
      }
    }
    handleDataLayer(ecommerce)
  }

  handleUserInfo (values = {}) {
    const { UserPrefInfo } = this.props;
    const { contact_no, email } = values;
    if (UserPrefInfo &&
      Object.keys(UserPrefInfo).length > 0 &&
      UserPrefInfo.constructor === Object) {
      // userpreference info reducer wont have email and contact_no
      return {
        ...UserPrefInfo,
        email,
        contact_no,
        first_name: 'User'
      };
    }
    return {
      first_name: 'User',
      last_name: '',
      email,
      contact_no,
      city: 'Bangalore',
      country: 101
    }
  }

  paymentHandler (event, values) {
    // e.preventDefault();
    const { orderDetails, UserPrefInfo, selectedCourse } = this.props;
    const {
      course_id,
      course_group_id,
      business_unit,
      batch_id,
      currency = {},
      amount_paid,
      discount,
      gst,
      wallet_cash,
      display_title
    } = orderDetails;

    const { id } = currency;
    const { phone_code } = getCountryVals(UserPrefInfo);

    // get user data to create order
    const userInfo = this.handleUserInfo(values);
    const {
      email,
      contact_no,
      country
    } = userInfo;
    const orderPayload = {
      email,
      contact_no,
      mobile_code: phone_code,
      country_id: country,
      course_group_id,
      course_id,
      course: display_title,
      batch_id: batch_id || null,
      business_unit,
      currency_id: id,
      amount_paid,
      discount_price: discount || 0,
      gst_amount: gst || 0,
      wallet_cash: wallet_cash || 0,
      selected_free_course_id: selectedCourse || null
    }

    const { createOrder } = this.props;
    createOrder({ orderPayload }, (resp = {}) => {
      const { status } = resp
      if (status === 206) {
        messageFn(ALREADY_BATCH_ENROLL, WARNING);
      } else if (status === 200) {
        this.orderFinishCheck(resp, userInfo);
      } else {
        messageFn(GENERIC_ERR, ERROR)
      }
    });
  }

  // Check whether order is success or not
  orderFinishCheck (resp, userInfo) {
    const self = this;

    // order information from create order API
    const orderInfo = sf(resp, ['data', 'data']) || {};
    const { order = {}, token, vendorOrder = {} } = orderInfo;
    const { amount_paid, merchant_order_id } = order;
    const { order_id } = vendorOrder;

    // user information to fill in razorpay popup
    const {
      first_name,
      last_name,
      email,
      phone_code,
      contact_no,
      city,
      country
    } = userInfo;
    const name = `${first_name} ${last_name}`;
    const address = `${city}, ${country}`;

    const { setGlobalDetails } = this.props;
    setGlobalDetails({ 'privateRoutes': true }, () => {});

    const options = {
      key: process.env.REACT_APP_RAZOR_PAY_KEY,
      amount: amount_paid * 100,
      name: process.env.REACT_APP_RAZOR_PAY_MERCHANT,
      description: 'Learning Replenished',

      handler (response) {
        const paymentId = response.razorpay_payment_id;
        const url = `${process.env.REACT_APP_USER_API_END_POINT_PAYMENT}finish`;
        // Final API call to check whether payment is succes or not
        axios
          .post(
            url,
            {
              order_id: merchant_order_id, // merchantOrder ID (wiculty order ID)
              payment_id: paymentId
            },
            {
              headers: { Authorization: token }
            }
          )
          .then((responseData) => {
            if (responseData && responseData.data.data.order_id) {
              self.returnSucess(token);
            }
          })
          .catch((error) => {
            if (error) {
              self.returnFail(token);
            }
          });
      },
      order_id, // vendorOrder ID
      prefill: {
        name,
        email,
        contact: `${phone_code} ${contact_no}`
      },
      notes: {
        address,
        order_id: merchant_order_id
      },
      theme: {
        color: '#fd7e14'
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  render () {
    return (
      <Row className="form pb-1">
        <Col>
          <UserPaymentForm paymentHandler={(event, values) => this.paymentHandler(event, values)} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo
});

const mapDispatchToProps = dispatch => ({
  createOrder: (payload, cb) => {
    dispatch(orderCreateAction(payload, cb));
  },
  setGlobalDetails: (payload, cb) => {
    dispatch(globalDataAction(payload, cb))
  }
});

RazorPayComp.propTypes = {
  orderDetails: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  createOrder: PropTypes.func.isRequired,
  setGlobalDetails: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  selectedCourse: PropTypes.number.isRequired
  // userDetails: PropTypes.shape({}).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RazorPayComp));
